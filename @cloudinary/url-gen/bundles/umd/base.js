(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.CldUrlGen = {}));
})(this, (function (exports) { 'use strict';

    /******************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise, SuppressedError, Symbol, Iterator */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     *
     * @private
     * @param {any} a
     */
    function isObject$2(a) {
        if (typeof a !== 'object' || a instanceof Array) {
            return false;
        }
        else {
            return true;
        }
    }
    var Config = /** @class */ (function () {
        function Config() {
        }
        Config.prototype.filterOutNonSupportedKeys = function (userProvidedConfig, validKeys) {
            var obj = Object.create({});
            if (isObject$2(userProvidedConfig)) {
                Object.keys(userProvidedConfig).forEach(function (key) {
                    if (validKeys.indexOf(key) >= 0) {
                        obj[key] = userProvidedConfig[key];
                    }
                    else {
                        console.warn('Warning - unsupported key provided to configuration: ', key);
                    }
                });
                return obj;
            }
            else {
                return Object.create({});
            }
        };
        return Config;
    }());

    /**
     * This file is for internal constants only.
     * It is not intended for public use and is not part of the public API
     */
    /**
     * @private
     */
    var ALLOWED_URL_CONFIG = [
        'cname',
        'secureDistribution',
        'privateCdn',
        'signUrl',
        'longUrlSignature',
        'shorten',
        'useRootPath',
        'secure',
        'forceVersion',
        'analytics',
        'queryParams'
    ];
    /**
     * @private
     */
    var ALLOWED_CLOUD_CONFIG = [
        'cloudName',
        'apiKey',
        'apiSecret',
        'authToken'
    ];

    var URLConfig = /** @class */ (function (_super) {
        __extends(URLConfig, _super);
        /**
         * @param {IURLConfig} userURLConfig
         */
        function URLConfig(userURLConfig) {
            var _this = _super.call(this) || this;
            var urlConfig = _this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
            Object.assign(_this, {
                secure: true
            }, urlConfig);
            return _this;
        }
        URLConfig.prototype.extend = function (userURLConfig) {
            var urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
            return new URLConfig(Object.assign({}, this, urlConfig));
        };
        /**
         * @param {string} value Sets the cname
         */
        URLConfig.prototype.setCname = function (value) {
            this.cname = value;
            return this;
        };
        /**
         * @param {string} value Sets the secureDistribution
         */
        URLConfig.prototype.setSecureDistribution = function (value) {
            this.secureDistribution = value;
            return this;
        };
        /**
         * @param {boolean} value Sets whether to use a private CDN (Removes cloudName from URL)
         */
        URLConfig.prototype.setPrivateCdn = function (value) {
            this.privateCdn = value;
            return this;
        };
        /**
         * @param value Sets whether or not to sign the URL
         */
        URLConfig.prototype.setSignUrl = function (value) {
            this.signUrl = value;
            return this;
        };
        /**
         * @param value Sets whether or not to use a long signature
         */
        URLConfig.prototype.setLongUrlSignature = function (value) {
            this.longUrlSignature = value;
            return this;
        };
        /**
         * @param value Sets whether or not to shorten the URL
         */
        URLConfig.prototype.setShorten = function (value) {
            this.shorten = value;
            return this;
        };
        /**
         * @param value Sets whether or not to use a root path
         */
        URLConfig.prototype.setUseRootPath = function (value) {
            this.useRootPath = value;
            return this;
        };
        /**
         * @param value Sets whether or not to deliver the asset through https
         */
        URLConfig.prototype.setSecure = function (value) {
            this.secure = value;
            return this;
        };
        /**
         * @param value Sets whether to force a version in the URL
         */
        URLConfig.prototype.setForceVersion = function (value) {
            this.forceVersion = value;
            return this;
        };
        /**
         * @param params Sets additional params
         */
        URLConfig.prototype.setQueryParams = function (params) {
            this.queryParams = params;
            return this;
        };
        return URLConfig;
    }(Config));

    var CloudConfig = /** @class */ (function (_super) {
        __extends(CloudConfig, _super);
        /**
         * @param {ICloudConfig} userCloudConfig {@link ICloudConfig}
         *
         */
        function CloudConfig(userCloudConfig) {
            var _this = _super.call(this) || this;
            var cloudConfig = _this.filterOutNonSupportedKeys(userCloudConfig, ALLOWED_CLOUD_CONFIG);
            Object.assign(_this, cloudConfig);
            if (!_this.cloudName) {
                throw 'Missing mandatory field cloudName';
            }
            return _this;
        }
        CloudConfig.prototype.extend = function (userCloudConfig) {
            var cloudConfig = this.filterOutNonSupportedKeys(userCloudConfig, ALLOWED_CLOUD_CONFIG);
            return new CloudConfig(Object.assign({}, this, cloudConfig));
        };
        /**
         * @param {string} value Sets the CloudName
         */
        CloudConfig.prototype.setCloudName = function (value) {
            this.cloudName = value;
            return this;
        };
        /**
         * @param {string} value Sets the API Key
         */
        CloudConfig.prototype.setApiKey = function (value) {
            this.apiKey = value;
            return this;
        };
        /**
         * @param {string} value Sets the API Secret
         */
        CloudConfig.prototype.setApiSecret = function (value) {
            this.apiSecret = value;
            return this;
        };
        return CloudConfig;
    }(Config));

    var CloudinaryConfig = /** @class */ (function () {
        function CloudinaryConfig(configurations) {
            if (configurations === void 0) { configurations = {}; }
            this.cloud = new CloudConfig(configurations.cloud);
            this.url = new URLConfig(configurations.url || {});
        }
        /**
         * @description Setter for the cloudConfig
         * @param {ICloudConfig} cld
         */
        CloudinaryConfig.prototype.setCloudConfig = function (cld) {
            this.cloud = new CloudConfig(cld);
            return this;
        };
        /**
         * @description Setter for the urlConfig
         * @param {IURLConfig} url
         */
        CloudinaryConfig.prototype.setURLConfig = function (url) {
            this.url = new URLConfig(url);
            return this;
        };
        CloudinaryConfig.prototype.extend = function (configurations) {
            this.cloud = this.cloud.extend(configurations.cloud || {});
            this.url = this.url.extend(configurations.url || {});
            return this;
        };
        return CloudinaryConfig;
    }());

    /**
     * @summary SDK
     * @memberOf SDK
     */
    class QualifierValue {
        /**
         *
         * @param {QualifierValue | QualifierValue[] | any[] | string | number}qualifierValue
         */
        constructor(qualifierValue) {
            this.values = [];
            this.delimiter = ':'; // {value}{delimiter}{value}...
            if (this.hasValue(qualifierValue)) {
                this.addValue(qualifierValue);
            }
        }
        /**
         * @description Joins the provided values with the provided delimiter
         */
        toString() {
            return this.values.join(this.delimiter);
        }
        /**
         * @description Checks if the provided argument has a value
         * @param {any} v
         * @private
         * @return {boolean}
         */
        hasValue(v) {
            return typeof v !== 'undefined' && v !== null && v !== '';
        }
        /**
         * @desc Adds a value for the this qualifier instance
         * @param {any} value
         * @return {this}
         */
        addValue(value) {
            // Append value or array of values
            if (Array.isArray(value)) {
                this.values = this.values.concat(value);
            }
            else {
                this.values.push(value);
            }
            // Remove falsy values
            this.values = this.values.filter((v) => this.hasValue(v));
            return this;
        }
        /**
         * @description Sets the delimiter for this instance
         * @param delimiter
         */
        setDelimiter(delimiter) {
            this.delimiter = delimiter;
            return this;
        }
    }

    class UnsupportedError extends Error {
        constructor(message = 'Unsupported') {
            super(message);
        }
    }
    /**
     * Creates a new UnsupportedError
     * @param message
     */
    function createUnsupportedError(message) {
        return new UnsupportedError(message);
    }

    /**
     * Returns the action's model
     */
    function qualifierToJson() {
        return this._qualifierModel || { error: createUnsupportedError(`unsupported qualifier ${this.constructor.name}`) };
    }

    class QualifierModel {
        constructor() {
            this._qualifierModel = {};
        }
        toJson() {
            return qualifierToJson.apply(this);
        }
    }

    /**
     * @summary SDK
     * @memberOf SDK
     */
    class Qualifier extends QualifierModel {
        constructor(key, qualifierValue) {
            super();
            this.delimiter = '_'; // {key}{delimiter}{qualifierValue}
            this.key = key;
            if (qualifierValue instanceof QualifierValue) {
                this.qualifierValue = qualifierValue;
            }
            else {
                this.qualifierValue = new QualifierValue();
                this.qualifierValue.addValue(qualifierValue);
            }
        }
        toString() {
            const { key, delimiter, qualifierValue } = this;
            return `${key}${delimiter}${qualifierValue.toString()}`;
        }
        addValue(value) {
            this.qualifierValue.addValue(value);
            return this;
        }
    }

    /**
     * @memberOf Qualifiers.Flag
     * @extends {SDK.Qualifier}
     * @description the FlagQualifier class
     */
    class FlagQualifier extends Qualifier {
        constructor(flagType, flagValue) {
            let qualifierValue;
            if (flagValue) {
                qualifierValue = new QualifierValue([flagType, `${flagValue}`]).setDelimiter(':');
            }
            else {
                qualifierValue = flagType;
            }
            super('fl', qualifierValue);
            this.flagValue = flagValue;
        }
        toString() {
            return super.toString().replace(/\./g, '%2E');
        }
        getFlagValue() {
            return this.flagValue;
        }
    }

    /**
     * Sort a map by key
     * @private
     * @param map <string, any>
     * @Return array of map's values sorted by key
     */
    function mapToSortedArray(map, flags) {
        const array = Array.from(map.entries());
        // objects from the Array.from() method above are stored in array of arrays:
        // [[qualifierKey, QualifierObj], [qualifierKey, QualifierObj]]
        // Flags is an array of FlagQualifierObj
        // We need to convert it to the same form: [flagQualifier] =>  ['fl', flagQualifier]
        flags.forEach((flag) => {
            array.push(['fl', flag]); // push ['fl', flagQualifier]
        });
        return array.sort().map((v) => v[1]);
    }

    /**
     * Returns the action's model
     */
    function actionToJson() {
        var _a, _b, _c;
        const actionModelIsNotEmpty = this._actionModel && Object.keys(this._actionModel).length;
        const sourceTransformationError = (_c = (_b = (_a = this._actionModel) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.transformation) === null || _c === void 0 ? void 0 : _c.error;
        // Should return error when there is unsupported transformation inside
        if (sourceTransformationError && sourceTransformationError instanceof Error) {
            return { error: sourceTransformationError };
        }
        if (actionModelIsNotEmpty) {
            return this._actionModel;
        }
        return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
    }

    class ActionModel {
        constructor() {
            this._actionModel = {};
        }
        toJson() {
            return actionToJson.apply(this);
        }
    }

    /**
     * @summary SDK
     * @memberOf SDK
     * @description Defines the category of transformation to perform.
     */
    class Action extends ActionModel {
        constructor() {
            super(...arguments);
            // We're using map, to overwrite existing keys. for example:
            // addParam(w_100).addQualifier(w_200) should result in w_200. and not w_100,w_200
            this.qualifiers = new Map();
            // Unlike regular qualifiers, there can be multiple flags in each url component /fl_1,fl_2/
            // If the falgs are added to the qualifiers map, only a single flag could exist in a component (it's a map)
            // So flags are stored separately until the very end because of that reason
            this.flags = [];
            this.delimiter = ','; // {qualifier}{delimiter}{qualifier} for example: `${'w_100'}${','}${'c_fill'}`
            this.actionTag = ''; // A custom name tag to identify this action in the future
        }
        prepareQualifiers() { }
        /**
         * @description Returns the custom name tag that was given to this action
         * @return {string}
         */
        getActionTag() {
            return this.actionTag;
        }
        /**
         * @description Sets the custom name tag for this action
         * @return {this}
         */
        setActionTag(tag) {
            this.actionTag = tag;
            return this;
        }
        /**
         * @description Calls toString() on all child qualifiers (implicitly by using .join()).
         * @return {string}
         */
        toString() {
            this.prepareQualifiers();
            return mapToSortedArray(this.qualifiers, this.flags).join(this.delimiter);
        }
        /**
         * @description Adds the parameter to the action.
         * @param {SDK.Qualifier} qualifier
         * @return {this}
         */
        addQualifier(qualifier) {
            // if string, find the key and value
            if (typeof qualifier === 'string') {
                const [key, value] = qualifier.toLowerCase().split('_');
                if (key === 'fl') {
                    // if string qualifier is a flag, store it in the flags arrays
                    this.flags.push(new FlagQualifier(value));
                }
                else {
                    // if the string qualifier is not a flag, create a new qualifier from it
                    this.qualifiers.set(key, new Qualifier(key, value));
                }
            }
            else {
                // if a qualifier object, insert to the qualifiers map
                this.qualifiers.set(qualifier.key, qualifier);
            }
            return this;
        }
        /**
         * @description Adds a flag to the current action.
         * @param {Qualifiers.Flag} flag
         * @return {this}
         */
        addFlag(flag) {
            if (typeof flag === 'string') {
                this.flags.push(new FlagQualifier(flag));
            }
            else {
                if (flag instanceof FlagQualifier) {
                    this.flags.push(flag);
                }
            }
            return this;
        }
        addValueToQualifier(qualifierKey, qualifierValue) {
            this.qualifiers.get(qualifierKey).addValue(qualifierValue);
            return this;
        }
    }

    /**
     * Returns RGB or Color
     * @private
     * @param color
     */
    function prepareColor(color) {
        if (color) {
            return color.match(/^#/) ? `rgb:${color.substr(1)}` : color;
        }
        else {
            return color;
        }
    }

    /**
     * @extends SDK.Action
     * @description A class for background transformations.
     */
    class BackgroundColor extends Action {
        constructor(color) {
            super();
            this._actionModel = {};
            this.addQualifier(new Qualifier('b', new QualifierValue(prepareColor(color)).setDelimiter('_')));
            this._actionModel.color = color;
            this._actionModel.actionType = 'backgroundColor';
        }
        static fromJson(actionModel) {
            const { color } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(color);
            return result;
        }
    }

    /**
     * @summary SDK
     * @memberOf SDK
     * @description Defines an action that's a string literal, no validations or manipulations are performed
     */
    class RawAction {
        constructor(raw) {
            this.raw = raw;
        }
        toString() {
            return this.raw;
        }
        toJson() {
            return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
        }
    }

    /**
     * Validates obj is an instance of IErrorObject
     * @param obj
     */
    function isErrorObject(obj) {
        const errorObj = obj;
        return ('error' in errorObj) && !!errorObj.error;
    }

    /**
     * @description Defines flags that you can use to alter the default transformation behavior.
     * @namespace Flag
     * @memberOf Qualifiers
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description Used when delivering a video file as an image format that supports animation, such as animated WebP.
     * Plays all frames rather than just delivering the first one as a static image.
     * Use this flag in addition to the flag or parameter controlling the delivery format,
     * for example f_auto or fl_awebp.

     * Note: When delivering a video in GIF format, it is delivered as an animated GIF by default and this flag is not
     * necessary. To deliver a single frame of a video in GIF format, use the page parameter.
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function animated() {
        return new FlagQualifier('animated');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description When converting animated images to WebP format, generate an animated WebP from all the frames in the
     * original
     * animated file instead of only from the first still frame.
     *
     * Note that animated WebPs are not supported in all browsers and versions.
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function animatedWebP() {
        return new FlagQualifier('awebp');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description Trims pixels according to a clipping path included in the original image
     * (e.g., manually created using PhotoShop).
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function clip$1() {
        return new FlagQualifier('clip');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description Trims pixels according to a clipping path included in the original image (e.g., manually created
     * using PhotoShop)
     * using an evenodd clipping rule.
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function clipEvenOdd() {
        return new FlagQualifier('clip_evenodd');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description * Allows specifying only either width or height so the value of the second axis remains as is, and is not
     * recalculated to maintain the aspect ratio of the original image.
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function ignoreInitialAspectRatio$1() {
        return new FlagQualifier('ignore_aspect_ratio');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description Automatically use lossy compression when delivering animated GIF files.
     *
     * This flag can also be used as a conditional flag for delivering PNG files: it tells Cloudinary to deliver the
     * image in PNG format (as requested) unless there is no transparency channel - in which case deliver in JPEG
     * format.
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function lossy() {
        return new FlagQualifier('lossy');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description Used internally by Position within an Overlay, this flag will tile the overlay across your image.
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#fl_no_overflow|Overflow in overlays}
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function noOverflow() {
        return new FlagQualifier('no_overflow');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description When used with automatic fetch_format (f_auto): ensures that images with a transparency channel will be
     * delivered in PNG format.
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function preserveTransparency() {
        return new FlagQualifier('preserve_transparency');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description Generates a JPG image using the progressive (interlaced) JPG format.
     *
     * This format allows the browser to quickly show a low-quality rendering of the image until the full-quality
     * image is loaded.
     *
     * @param {string} mode? The mode to determine a specific progressive outcome as follows:
     * * semi - A smart optimization of the decoding time, compression level and progressive rendering
     *          (less iterations). This is the default mode when using q_auto.
     * * steep - Delivers a preview very quickly, and in a single later phase improves the image to
     *           the required resolution.
     * * none  - Use this to deliver a non-progressive image. This is the default mode when setting
     *           a specific value for quality.
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function progressive(mode) {
        return new FlagQualifier('progressive', mode);
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the overlaid region
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function regionRelative() {
        return new FlagQualifier('region_relative');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the containing image instead of the added layer.
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function relative() {
        return new FlagQualifier('relative');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Flag
     * @description Used internally by Position within an Overlay, this flag will tile the overlay across your image.
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/layers#automatic_tiling|Tiling overlay}
     * @return {Qualifiers.Flag.FlagQualifier}
     */
    function tiled() {
        return new FlagQualifier('tiled');
    }

    /**
     * @memberOf Qualifiers.Format
     * @extends {SDK.QualifierValue}
     */
    class FormatQualifier extends QualifierValue {
        constructor(val) {
            super(val);
            this.val = val;
        }
        getValue() {
            return this.val;
        }
    }

    /**
     * Flip keys and values for given object
     * @param obj
     */
    function objectFlip(obj) {
        const result = {};
        Object.keys(obj).forEach((key) => {
            result[obj[key]] = key;
        });
        return result;
    }

    /**
     * This file is for internal constants only.
     * It is not intended for public use and is not part of the public API
     */
    const CONDITIONAL_OPERATORS = {
        "=": "eq",
        "!=": "ne",
        "<": "lt",
        ">": "gt",
        "<=": "lte",
        ">=": "gte",
        "&&": "and",
        "||": "or",
        "*": "mul",
        "/": "div",
        "+": "add",
        "-": "sub",
        "^": "pow"
    };
    const RESERVED_NAMES = {
        "aspect_ratio": "ar",
        "aspectRatio": "ar",
        "current_page": "cp",
        "currentPage": "cp",
        "duration": "du",
        "face_count": "fc",
        "faceCount": "fc",
        "height": "h",
        "initial_aspect_ratio": "iar",
        "initial_height": "ih",
        "initial_width": "iw",
        "initialAspectRatio": "iar",
        "initialHeight": "ih",
        "initialWidth": "iw",
        "initial_duration": "idu",
        "initialDuration": "idu",
        "page_count": "pc",
        "page_x": "px",
        "page_y": "py",
        "pageCount": "pc",
        "pageX": "px",
        "pageY": "py",
        "tags": "tags",
        "width": "w",
        "trimmed_aspect_ratio": "tar",
        "current_public_id": "cpi",
        "initial_density": "idn",
        "page_names": "pgnames"
    };
    const ACTION_TYPE_TO_CROP_MODE_MAP = {
        limitFit: 'limit',
        limitFill: 'lfill',
        minimumFit: 'mfit',
        thumbnail: 'thumb',
        limitPad: 'lpad',
        minimumPad: 'mpad',
        autoPad: 'auto_pad'
    };
    const ACTION_TYPE_TO_DELIVERY_MODE_MAP = {
        colorSpace: 'cs',
        dpr: 'dpr',
        density: 'dn',
        defaultImage: 'd',
        format: 'f',
        quality: 'q'
    };
    const ACTION_TYPE_TO_EFFECT_MODE_MAP = {
        redEye: 'redeye',
        advancedRedEye: 'adv_redeye',
        oilPaint: 'oil_paint',
        unsharpMask: 'unsharp_mask',
        makeTransparent: 'make_transparent',
        generativeRestore: 'gen_restore',
        upscale: 'upscale'
    };
    const ACTION_TYPE_TO_QUALITY_MODE_MAP = {
        autoBest: 'auto:best',
        autoEco: 'auto:eco',
        autoGood: 'auto:good',
        autoLow: 'auto:low',
        jpegminiHigh: 'jpegmini:1',
        jpegminiMedium: 'jpegmini:2',
        jpegminiBest: 'jpegmini:0'
    };
    const ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP = {
        fullHd: 'full_hd',
        fullHdWifi: 'full_hd_wifi',
        fullHdLean: 'full_hd_lean',
        hdLean: 'hd_lean'
    };
    const CHROMA_VALUE_TO_CHROMA_MODEL_ENUM = {
        444: "CHROMA_444",
        420: "CHROMA_420"
    };
    const COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP = {
        'noCmyk': 'no_cmyk',
        'keepCmyk': 'keep_cmyk',
        'tinySrgb': 'tinysrgb',
        'srgbTrueColor': 'srgb:truecolor'
    };
    const ACTION_TYPE_TO_BLEND_MODE_MAP = {
        'antiRemoval': 'anti_removal'
    };
    const CHROMA_MODEL_ENUM_TO_CHROMA_VALUE = objectFlip(CHROMA_VALUE_TO_CHROMA_MODEL_ENUM);
    const COLOR_SPACE_MODE_TO_COLOR_SPACE_MODEL_MODE_MAP = objectFlip(COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP);
    const CROP_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_CROP_MODE_MAP);
    const DELIVERY_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_DELIVERY_MODE_MAP);
    const EFFECT_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_EFFECT_MODE_MAP);
    objectFlip(ACTION_TYPE_TO_QUALITY_MODE_MAP);
    const STREAMING_PROFILE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP);

    /**
     * @description Qualifies the delivery of an asset.
     * @memberOf Actions.Delivery
     * @extends SDK.Action
     */
    class DeliveryAction extends Action {
        /**
         * @param {string} deliveryKey A generic Delivery Action Key (such as q, f, dn, etc.)
         * @param {string} deliveryType A Format Qualifiers for the action, such as Quality.auto()
         * @param {string} modelProperty internal model property of the action, for example quality uses `level` while dpr uses `density`
         * @see Visit {@link Actions.Delivery|Delivery} for an example
         */
        constructor(deliveryKey, deliveryType, modelProperty) {
            super();
            this._actionModel = {};
            let deliveryTypeValue;
            if (deliveryType instanceof FormatQualifier) {
                deliveryTypeValue = deliveryType.getValue();
            }
            else {
                deliveryTypeValue = deliveryType;
            }
            this._actionModel.actionType = DELIVERY_MODE_TO_ACTION_TYPE_MAP[deliveryKey];
            this._actionModel[modelProperty] = deliveryTypeValue;
            this.addQualifier(new Qualifier(deliveryKey, deliveryType));
        }
    }

    /**
     * @description Contains functions to select the mode when using a progressive format.
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/transformation_reference#fl_progressive|Progressive modes}
     * @memberOf Qualifiers
     * @namespace Progressive
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {format} from "@cloudinary/url-gen/actions/delivery";
     * import {jpg} from "@cloudinary/url-gen/qualifiers/format";
     * import {steep} from "@cloudinary/url-gen/qualifiers/progressive";
     *
     * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.delivery(format(jpg()).progressive(steep()))
     */
    class ProgressiveQualifier extends FlagQualifier {
        constructor(mode) {
            super('progressive', mode);
        }
    }

    /**
     * @memberOf Actions.Delivery
     * @extends {Actions.Delivery.DeliveryAction}
     * @see Visit {@link Actions.Delivery|Delivery} for an example
     */
    class DeliveryFormatAction extends DeliveryAction {
        constructor(deliveryKey, deliveryType) {
            super(deliveryKey, deliveryType, 'formatType');
        }
        /**
         * @description Uses lossy compression when delivering animated GIF files.
         * @return {this}
         */
        lossy() {
            this._actionModel.lossy = true;
            this.addFlag(lossy());
            return this;
        }
        /**
         * @description Uses progressive compression when delivering JPG file format.
         * @return {this}
         */
        progressive(mode) {
            if (mode instanceof ProgressiveQualifier) {
                this._actionModel.progressive = { mode: mode.getFlagValue() };
                this.addFlag(mode);
            }
            else {
                this._actionModel.progressive = { mode: mode };
                this.addFlag(progressive(mode));
            }
            return this;
        }
        /**
         * @description Ensures that images with a transparency channel are delivered in PNG format.
         */
        preserveTransparency() {
            this._actionModel.preserveTransparency = true;
            this.addFlag(preserveTransparency());
            return this;
        }
        static fromJson(actionModel) {
            const { formatType, lossy, progressive, preserveTransparency } = actionModel;
            let result;
            if (formatType) {
                result = new this('f', formatType);
            }
            else {
                result = new this('f');
            }
            if (progressive) {
                if (progressive.mode) {
                    result.progressive(progressive.mode);
                }
                else {
                    result.progressive();
                }
            }
            lossy && result.lossy();
            preserveTransparency && result.preserveTransparency();
            return result;
        }
    }

    /**
     * @summary SDK
     * @description - Defines how to transform an asset
     * @memberOf SDK
     */
    class Transformation$1 {
        constructor() {
            this.actions = [];
        }
        /**
         * @param {SDK.Action | string} action
         * @return {this}
         */
        addAction(action) {
            let actionToAdd;
            if (typeof action === 'string') {
                if (action.indexOf('/') >= 0) {
                    throw 'addAction cannot accept a string with a forward slash in it - /, use .addTransformation() instead';
                }
                else {
                    actionToAdd = new RawAction(action);
                }
            }
            else {
                actionToAdd = action;
            }
            this.actions.push(actionToAdd);
            return this;
        }
        /**
         * @description Allows the injection of a raw transformation as a string into the transformation, or a Transformation instance that was previously created
         * @param {string | SDK.Transformation} tx
         * @example
         * import {Transformation} from "@cloudinary/url-gen";
         *
         * const transformation = new Transformation();
         * transformation.addTransformation('w_100/w_200/w_300');
         * @return {this}
         */
        addTransformation(tx) {
            if (tx instanceof Transformation$1) {
                // Concat the new actions into the existing actions
                this.actions = this.actions.concat(tx.actions);
            }
            else {
                this.actions.push(new RawAction(tx));
            }
            return this;
        }
        /**
         * @return {string}
         */
        toString() {
            return this.actions
                .map((action) => {
                return action.toString();
            })
                .filter((a) => a)
                .join('/');
        }
        /**
         * @description Delivers an animated GIF.
         * @param {AnimatedAction} animatedAction
         * @return {this}
         */
        animated(animatedAction) {
            return this.addAction(animatedAction);
        }
        /**
         * @description Adds a border around the image.
         * @param {Border} borderAction
         * @return {this}
         */
        border(borderAction) {
            return this.addAction(borderAction);
        }
        /**
         * @description Adjusts the shape of the delivered image. </br>
         * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Shape changes and distortion effects}
         * @param {IReshape} reshapeAction
         * @return {this}
         */
        reshape(reshapeAction) {
            return this.addAction(reshapeAction);
        }
        /**
         * @description Resize the asset using provided resize action
         * @param {ResizeSimpleAction} resizeAction
         * @return {this}
         */
        resize(resizeAction) {
            return this.addAction(resizeAction);
        }
        /**
         * @desc An alias to Action Delivery.quality
         * @param {string|number} quality
         * @return {this}
         */
        quality(quality) {
            this.addAction(new DeliveryFormatAction('q', quality));
            return this;
        }
        /**
         * @desc An alias to Action Delivery.format
         * @param {string} format
         * @return {this}
         */
        format(format) {
            this.addAction(new DeliveryFormatAction('f', format));
            return this;
        }
        /**
         * @description Rounds the specified corners of an image.
         * @param roundCornersAction
         * @return {this}
         */
        roundCorners(roundCornersAction) {
            return this.addAction(roundCornersAction);
        }
        /**
         * @description Adds an overlay over the base image.
         * @param {LayerAction} overlayAction
         * @return {this}
         */
        overlay(overlayAction) {
            return this.addAction(overlayAction);
        }
        /**
         * @description Adds an underlay under the base image.
         * @param {LayerAction} underlayAction
         * @return {this}
         */
        underlay(underlayAction) {
            underlayAction.setLayerType('u');
            return this.addAction(underlayAction);
        }
        /**
         * @description Defines an new user variable.
         * @param {VariableAction} variableAction
         * @return {this}
         */
        addVariable(variableAction) {
            return this.addAction(variableAction);
        }
        /**
         * @description Specifies a condition to be met before applying a transformation.
         * @param {ConditionalAction} conditionAction
         * @return {this}
         */
        conditional(conditionAction) {
            return this.addAction(conditionAction);
        }
        /**
         * @description Applies a filter or an effect on an asset.
         * @param {SimpleEffectAction} effectAction
         * @return {this}
         */
        effect(effectAction) {
            return this.addAction(effectAction);
        }
        /**
         * @description Applies adjustment effect on an asset.
         * @param action
         * @return {this}
         */
        adjust(action) {
            return this.addAction(action);
        }
        /**
         * @description Rotates the asset by the given angle.
         * @param {RotateAction} rotateAction
         * @return {this}
         */
        rotate(rotateAction) {
            return this.addAction(rotateAction);
        }
        /**
         * @description Applies a pre-defined named transformation of the given name.
         * @param {NamedTransformation} namedTransformation
         * @return {this}
         */
        namedTransformation(namedTransformation) {
            return this.addAction(namedTransformation);
        }
        /**
         * @description Applies delivery action.
         * @param deliveryAction
         * @return {this}
         */
        delivery(deliveryAction) {
            return this.addAction(deliveryAction);
        }
        /**
         * @description Sets the color of the background.
         * @param {Qualifiers.Color} color
         * @return {this}
         */
        backgroundColor(color) {
            return this.addAction(new BackgroundColor(color));
        }
        /**
         * @description Adds a layer in a Photoshop document.
         * @param action
         * @return {this}
         */
        psdTools(action) {
            return this.addAction(action);
        }
        /**
         * @description Extracts an image or a page using an index, a range, or a name from a layered media asset.
         * @param action
         * @return {this}
         */
        extract(action) {
            return this.addAction(action);
        }
        /**
         * @description Adds a flag as a separate action.
         * @param {Qualifiers.Flag | string} flagQualifier
         * @return {this}
         */
        addFlag(flagQualifier) {
            const action = new Action();
            let flagToAdd = flagQualifier;
            if (typeof flagQualifier === 'string') {
                flagToAdd = new FlagQualifier(flagQualifier);
            }
            action.addQualifier(flagToAdd);
            return this.addAction(action);
        }
        /**
         * @description Inject a custom function into the image transformation pipeline.
         * @return {this}
         */
        customFunction(customFunction) {
            return this.addAction(customFunction);
        }
        /**
         * Transcodes the video (or audio) to another format.
         * @param {Action} action
         * @return {this}
         */
        transcode(action) {
            return this.addAction(action);
        }
        /**
         * Applies the specified video edit action.
         *
         * @param {videoEditType} action
         * @return {this}
         */
        videoEdit(action) {
            return this.addAction(action);
        }
        toJson() {
            const actions = [];
            for (const action of this.actions) {
                const json = action.toJson();
                if (isErrorObject(json)) {
                    // Fail early and return an IErrorObject
                    return json;
                }
                actions.push(json);
            }
            return { actions };
        }
    }

    /**
     * @summary SDK
     * @extends {SDK.Transformation}
     * @memberOf SDK
     */
    class ImageTransformation extends Transformation$1 {
    }

    /**
     * @summary SDK
     * @extends {SDK.Transformation}
     * @memberOf SDK
     */
    class VideoTransformation extends Transformation$1 {
    }

    /**
     *
     * @private
     * @description An isomorphic Base64 function, provides browser and server support.
     * @param {string} input - A string to encode with base64
     */
    function base64Encode$1(input) {
        // Browser
        let encodedResult = '';
        if (typeof window !== 'undefined') {
            // encodeURI the input to support unicode characters
            // Since the URI might be encoded already, we try to decode it once before
            encodedResult = btoa(encodeURI(decodeURI(input)));
        }
        else {
            // NodeJS support
            encodedResult = global.Buffer.from(input).toString('base64');
        }
        return encodedResult
            .replace(/\+/g, '-') // Convert '+' to '-'
            .replace(/\//g, '_'); // Convert '/' to '_';
    }

    /**
     * @description
     * Returns a string representing the float value of the input, if the input was a number-like.
     * Examples:
     * - '1.0' -> '1.0'
     * - 1 -> '1.0'
     * - '5' -> '5.0'
     * - 'auto' -> 'auto'
     * @private
     * @param {string|number} value
     * @return {string}
     */
    function toFloatAsString(value) {
        // Turn the input to string
        // The Function will return `returnValue` value if the input is not a number-like expression
        const returnValue = value.toString();
        // if the string contains letters, return the input
        if (returnValue.match(/[A-Z]/gi)) {
            return returnValue;
        }
        // If the leading digit is 0, and we have more than 1 digit, it's not a number.
        // 00, 00000, 0x15 etc.
        if (returnValue.length > 1 && returnValue[0] === '0') {
            return returnValue;
        }
        // Final sanity check, parse the number as a float and check if its NaN
        const isNumberLike = !isNaN(parseFloat(returnValue)) && returnValue.indexOf(':') === -1;
        // If it's a number-like, but the input does not contain a decimal - add it.
        if (isNumberLike && returnValue.indexOf('.') === -1) {
            return `${returnValue}.0`;
        }
        else {
            // If the input already contains a decimal, just return the value
            return returnValue;
        }
    }

    /**
     * @memberOf Qualifiers.AspectRatio
     * @extends {SDK.QualifierValue}
     */
    class AspectRatioQualifierValue extends QualifierValue {
    }

    /**
     * @description Defines a resize using width and height.
     * @extends SDK.Action
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizeSimpleAction extends Action {
        /**
         * @param {string} cropType
         * @param {number | string} cropWidth The required width of a transformed asset.
         * @param {number | string} cropHeight The required height of a transformed asset.
         */
        constructor(cropType, cropWidth, cropHeight) {
            super();
            this._actionModel = { dimensions: {} };
            this._actionModel.actionType = CROP_MODE_TO_ACTION_TYPE_MAP[cropType] || cropType;
            this.addQualifier(new Qualifier('c', cropType));
            cropWidth && this.width(cropWidth);
            cropHeight && this.height(cropHeight);
        }
        /**
         * @description Sets the height of the resize
         * @param {string | number} x The height in pixels (if an integer is specified) or as a percentage (if a float is specified).
         */
        height(x) {
            this._actionModel.dimensions.height = x;
            return this.addQualifier(new Qualifier('h', x));
        }
        /**
         * @description Sets the width of the resize
         * @param {string | number} x The width in pixels (if an integer is specified) or as a percentage (if a float is specified).
         */
        width(x) {
            this._actionModel.dimensions.width = x;
            return this.addQualifier(new Qualifier('w', x));
        }
        /**
         * @description Sets the aspect ratio of the asset.
         * For a list of supported types see {@link Qualifiers.AspectRatio|
          * AspectRatio values}
         * @param {AspectRatioType|number|string} ratio The new aspect ratio, specified as a percentage or ratio.
         * @return {this}
         */
        aspectRatio(ratio) {
            // toFloatAsString is used to ensure 1 turns into 1.0
            if (ratio instanceof AspectRatioQualifierValue) {
                this._actionModel.dimensions.aspectRatio = `${ratio}`;
                return this.addQualifier(new Qualifier('ar', ratio));
            }
            if (typeof ratio === 'number' || typeof ratio === 'string') {
                this._actionModel.dimensions.aspectRatio = toFloatAsString(ratio);
                return this.addQualifier(new Qualifier('ar', toFloatAsString(ratio)));
            }
            if (ratio instanceof FlagQualifier) {
                this._actionModel.dimensions.aspectRatio = `${ratio.qualifierValue}`;
                return this.addFlag(ratio);
            }
        }
        /**
         * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the containing image instead of the added layer.
         * @return {this}
         */
        relative() {
            this._actionModel.relative = true;
            return this.addFlag(relative());
        }
        /**
         * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the overlaid region
         * @return {this}
         */
        regionRelative() {
            this._actionModel.regionRelative = true;
            return this.addFlag(regionRelative());
        }
        static fromJson(actionModel) {
            const { actionType, dimensions, relative, regionRelative } = actionModel;
            const { aspectRatio, width, height } = dimensions;
            const cropMode = ACTION_TYPE_TO_CROP_MODE_MAP[actionType] || actionType;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(cropMode, width, height);
            aspectRatio && result.aspectRatio(aspectRatio === 'ignore_aspect_ratio' ? ignoreInitialAspectRatio$1() : aspectRatio);
            relative && result.relative();
            regionRelative && result.regionRelative();
            return result;
        }
    }

    /**
     * @memberOf Gravity.GravityQualifier
     * @extends {SDK.Qualifier}
     */
    class GravityQualifier extends Qualifier {
        /**
         * @param value, an array containing (GravityObject | AutoGravity | string) or a string;
         */
        constructor(value) {
            super('g', new QualifierValue(value));
        }
    }

    /**
     * @description The class for the autoGravity builder
     * @memberOf Qualifiers.Gravity
     * @extends {Qualifiers.Gravity.GravityQualifier}
     */
    class AutoGravity extends GravityQualifier {
        constructor() {
            // Required due to https://github.com/microsoft/TypeScript/issues/13029
            /* istanbul ignore next */
            super('auto');
        }
        /**
         * @description Autofocuses on objects, allowing their priority within the algorithm to be configured.
         * @param {AutoFocus} AutoFocusObjects
         */
        autoFocus(...AutoFocusObjects) {
            this.addValue(AutoFocusObjects);
            return this;
        }
    }

    /**
     * @description The class for the FocusOn builder
     * @memberOf Qualifiers.Gravity
     * @extends {Qualifiers.Gravity.GravityQualifier}
     */
    class FocusOnGravity extends GravityQualifier {
        constructor(FocusOnObjects) {
            // Required due to https://github.com/microsoft/TypeScript/issues/13029
            /* istanbul ignore next */
            super(FocusOnObjects);
        }
        /**
         * @description Specifies the gravity to use if none of the other gravity objects are found.
         * @param {Qualifiers.Gravity.AutoGravity} val
         */
        fallbackGravity(val) {
            /*
             *  FocusOnGravity(this) is already a qualifier, with a key and a value g_{obj1}
             *  fallBackGravity also attempts to add a value, to reach the result of g_{obj1}:auto:{obj2}
             *  Since AutoGravity is a Qualifier, it also comes with its own g_ key, which needs to be removed.
             *  To solve it, we take only the value from the qualifier, instead of the whole thing
             */
            this.addValue(val.qualifierValue);
            return this;
        }
    }

    /**
     * @description The class for the CompassGravity builder
     * @memberOf Qualifiers.Gravity
     * @extends {Qualifiers.Gravity.GravityQualifier}
     */
    class CompassGravity extends GravityQualifier {
        constructor(dir) {
            // Required due to https://github.com/microsoft/TypeScript/issues/13029
            /* istanbul ignore next */
            super(dir);
        }
    }

    /**
     * @description The class for the XYCenter Gravity builder
     * @memberOf Qualifiers.Gravity
     * @extends {Qualifiers.Gravity.GravityQualifier}
     */
    class XYCenterGravity extends GravityQualifier {
        constructor() {
            // Required due to https://github.com/microsoft/TypeScript/issues/13029
            /* istanbul ignore next */
            super('xy_center');
        }
    }

    /**
     * @description Defines the gravity based on directional values from a compass.
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/resizing_and_cropping#control_gravity|Control gravity for images}
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/video_resizing_and_cropping#control_gravity|Control gravity for videos}
     * @param {Qualifiers.Compass | string} direction A compass Values
     * @memberOf Qualifiers.Gravity
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {compass} from "@cloudinary/url-gen/qualifiers/gravity";
     * import {north} from "@cloudinary/url-gen/qualifiers/compass";
     * import {crop} from "@cloudinary/url-gen/actions/resize";
     *
     * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.resize(crop().width(300).gravity(compass(north())))
     * @return {CompassGravity}
     */
    function compass(direction) {
        return new CompassGravity(direction);
    }
    /**
     * @summary qualifier
     * @description Specifies what to focus on, for example: faces, objects, eyes, etc.
     * @param {...Qualifier.FocusOn} args One or more objects to focus on
     * @memberOf Qualifiers.Gravity
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
     * import {crop} from "@cloudinary/url-gen/actions/resize";
     * import {cat} from "@cloudinary/url-gen/qualifiers/focusOn";
     *
     * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.resize(crop().width(300).gravity(focusOn(cat())))
     * @return {FocusOnGravity}
     */
    function focusOn(...args) {
        const res = [...args];
        return new FocusOnGravity(res);
    }
    /**
     * @summary qualifier
     * @description Automatically identifies the most interesting regions in the asset, can be qualified further by including what to focus on.
     * @memberOf Qualifiers.Gravity
     * @return {Qualifiers.Gravity.AutoGravity}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {autoGravity} from "@cloudinary/url-gen/qualifiers/gravity";
     * import {crop} from "@cloudinary/url-gen/actions/resize";
     *
     * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.resize(crop().width(300).gravity(autoGravity()))
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {autoGravity} from "@cloudinary/url-gen/qualifiers/gravity";
     * import {crop} from "@cloudinary/url-gen/actions/resize";
     * import {cat} from "@cloudinary/url-gen/qualifiers/focusOn";
     * import {AutoFocus} from "@cloudinary/url-gen/qualifiers/autoFocus";
     *
     * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.resize(crop().width(300).gravity(autoGravity().autoFocus(AutoFocus.focusOn(cat()))))
     */
    function autoGravity() {
        return new AutoGravity();
    }
    /**
     * @summary qualifier
     * @description Set the center of gravity to the given x & y coordinates.
     * @memberOf Qualifiers.Gravity
     * @return {XYCenterGravity}
     */
    function xyCenter() {
        return new XYCenterGravity();
    }
    /**
     * @description A qualifier that determines which part of an asset to focus on, and thus which part of the asset to keep, </br>
     *              when any part of the asset is cropped. For overlays, this setting determines where to place the overlay.
     * @namespace Gravity
     * @memberOf Qualifiers
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {compass} from "@cloudinary/url-gen/qualifiers/gravity";
     * import {north} from "@cloudinary/url-gen/qualifiers/compass";
     * import {crop} from "@cloudinary/url-gen/actions/resize";
     *
     * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.resize(crop().width(300).gravity(compass(north())))
     *
     * // Expand every function separately to see its own example
     */
    const Gravity = {
        compass: compass,
        autoGravity: autoGravity,
        focusOn: focusOn,
        xyCenter
    };

    /**
     * @memberOf Qualifiers.FocusOn
     * @extends {SDK.QualifierValue}
     */
    class FocusOnValue extends QualifierValue {
        constructor(name) {
            super();
            this.name = name;
        }
        toString() {
            return this.name;
        }
    }

    /**
     * @summary qualifier
     * @memberOf Qualifiers.FocusOn
     * @description Detect all text elements in an image using the {@link https://cloudinary.com/documentation/ocr_text_detection_and_extraction_addon|OCR Text Detection and Extraction add-on} and use the detected bounding box coordinates as the basis of the transformation.
     * @return {Qualifiers.FocusOn.FocusOnValue} FocusOnValue
     */
    function ocr$1() {
        return new FocusOnValue('ocr_text');
    }

    /**
     * true if gravity starts with 'auto' or 'auto:'
     * @param gravity
     */
    function isIAutoGravityString(gravity) {
        return gravity && `${gravity}`.split(':')[0] === 'auto';
    }
    /**
     * Validate that given val is an ICompassGravity
     * @param gravity
     */
    function isCompassGravity(gravity) {
        //const gravityString = `${(typeof gravity === "string" ? gravity : gravity.qualifierValue)}`;
        const gravityValue = getGravityValue(gravity);
        return ['north', 'center', 'east', 'west', 'south', 'north_west', 'south_east', 'south_west', 'north_east'].includes(gravityValue);
    }
    /**
     * Get the value of given gravity
     * @param gravity
     */
    function getGravityValue(gravity) {
        return `${gravity}`.replace('g_', '');
    }
    /**
     * Creates a compassGravity model
     * @param gravity
     */
    function createCompassGravityModel(gravity) {
        return {
            compass: getGravityValue(gravity),
            gravityType: 'direction'
        };
    }
    /**
     * Validate that given gravity is an instance of ocr gravity
     * @param gravity
     */
    function isOcrGravity(gravity) {
        return getGravityValue(gravity) === 'ocr_text';
    }
    /**
     * Creates an ocr gravity model
     */
    function createOcrGravityModel() {
        return {
            gravityType: 'ocr'
        };
    }
    /**
     * Validate that given gravity is an instance of AutoGravity
     * @param gravity
     */
    function isAutoGravity(gravity) {
        return `${gravity.qualifierValue}`.split(':')[0] === 'auto';
    }
    /**
     * Create an instance of IAutoGravityObjectModel
     * @param gravity
     */
    function createIAutoFocusObject(gravity) {
        const gravityString = gravity.toString();
        const values = gravityString.split('_');
        const result = {
            object: values[0]
        };
        if (values.length > 1) {
            if (values[1] === 'avoid') {
                result.avoid = true;
            }
            else {
                result.weight = +values[1];
            }
        }
        return result;
    }
    /**
     * Creates an auto gravity model from given AutoGravity
     * @param gravity
     */
    function createAutoGravityModel(gravity) {
        let values;
        const gravityQualifier = gravity === 'auto' ? new AutoGravity() : gravity;
        if (`${gravity}`.startsWith('auto:')) {
            values = `${gravity}`.split(':').filter((v) => v !== 'auto');
        }
        else {
            values = gravityQualifier.qualifierValue.values.filter((v) => v !== 'auto');
        }
        const autoFocus = values.map(createIAutoFocusObject);
        return {
            gravityType: 'auto',
            autoFocus
        };
    }
    /**
     * Create IFocusOnGravityModel from FocusOnGravity
     * @param gravity
     */
    function createFocusOnGravityModel(gravity) {
        const hasAutoGravity = `${gravity}`.split(':').includes('auto');
        const values = gravity.qualifierValue.values;
        const focusOnValues = hasAutoGravity ? values.slice(0, values.length - 1) : values;
        const result = {
            gravityType: 'object',
            focusOnObjects: focusOnValues.map((v) => `${v}`)
        };
        if (hasAutoGravity) {
            // Remove the first 'auto' value by slicing it, because it's added by autoGravity()
            const autoFocusObjects = values[values.length - 1].values.slice(1);
            const autoGravityInstance = autoGravity().autoFocus(...autoFocusObjects);
            result.fallbackGravity = createAutoGravityModel(autoGravityInstance);
        }
        return result;
    }
    /**
     * Creates a FocusOnGravity from given string
     * @param gravity
     */
    function createFocusOnGravity(gravity) {
        const values = gravity.split(':');
        const focusOnValues = values.map((g) => new FocusOnValue(g));
        return new FocusOnGravity(focusOnValues);
    }
    /**
     * Create a model of given gravity
     * @param gravity
     */
    function createGravityModel(gravity) {
        if (isCompassGravity(gravity)) {
            return createCompassGravityModel(gravity);
        }
        if (isOcrGravity(gravity)) {
            return createOcrGravityModel();
        }
        if (isIAutoGravityString(gravity) || isAutoGravity(gravity)) {
            return createAutoGravityModel(gravity);
        }
        return createFocusOnGravityModel(typeof gravity === 'string' ? createFocusOnGravity(gravity) : gravity);
    }

    /**
     * @summary qualifier
     * @namespace AutoFocus
     * @memberOf Qualifiers
     * @see Visit {@link Qualifiers.Gravity|Gravity} for an example
     */
    /**
     * @memberOf Qualifiers.AutoFocus
     * @extends {SDK.QualifierValue}
     * @see Visit {@link Qualifiers.Gravity|Gravity} for an example
     */
    class AutoFocus extends QualifierValue {
        constructor(focusOn, weight) {
            super();
            this._weight = weight;
            this.focusOn = focusOn;
            this.shouldAvoid = false;
        }
        /**
         * @summary qualifier
         * @description Specifies the object to focus on automatically
         * Accepts an AutoFocusObject (which is just a wrapper for a FocusOn object, but with extra method: avoid, weight)
         * @param {Qualifiers.FocusOn} obj The object to focus on.
         * @param {number} weight
         */
        static focusOn(obj, weight) {
            return new AutoFocus(obj, weight);
        }
        shouldAddWeight() {
            return typeof this._weight === 'number' || typeof this._weight === 'string' || this.shouldAvoid;
        }
        /**
         * @summary qualifier
         * @desc Get the name of the of the object
         */
        getName() {
            return this.focusOn.name;
        }
        /**
         * @summary qualifier
         * @desc Get the weight for the object
         */
        getWeight() {
            if (this.shouldAvoid) {
                return 'avoid';
            }
            else {
                return this._weight;
            }
        }
        /**
         * @summary qualifier
         * @desc Return the string representation of this QualifierValue
         */
        toString() {
            // Future proofing, in case we'd like to support some custom string in the future, or if data is coming from a DB
            if (this.shouldAddWeight()) {
                return `${this.getName()}_${this.getWeight()}`;
            }
            else {
                return `${this.getName()}`;
            }
        }
        /**
         * @summary qualifier
         * @description Sets the importance level of the object within the automatic gravity algorithm
         * @param {numebr} w The focus weight for the object
         * @return {this}
         */
        weight(w) {
            this._weight = w;
            return this;
        }
        /**
         * @summary qualifier
         * @description Attempts to avoid the detected object in the image
         * @return {this}
         */
        avoid() {
            this.shouldAvoid = true;
            return this;
        }
    }

    /**
     * @memberOf Qualifiers.Compass
     * @extends {SDK.QualifierValue}
     */
    class CompassQualifier extends QualifierValue {
        constructor(val) {
            super();
            this.val = val;
        }
        toString() {
            return this.val;
        }
    }

    /**
     * Validates that gravityModel is an ICompassGravityModel
     * @param gravityModel
     */
    function isCompassGravityModel(gravityModel) {
        return gravityModel.gravityType === 'direction';
    }
    /**
     * Validates that gravityModel is an IOcrGravityModel
     * @param gravityModel
     */
    function isOcrGravityModel(gravityModel) {
        return gravityModel.gravityType === 'ocr';
    }
    /**
     * Validates that gravityModel is an IAutoGravityModel
     * @param gravityModel
     */
    function isAutoGravityModel(gravityModel) {
        return gravityModel.gravityType === 'auto';
    }
    /**
     * Create AutoFocus from IAutoGravityObjectModel
     * @param autoGravityObjectModel
     */
    function createAutoFocusFromModel(autoGravityObjectModel) {
        const { object, weight, avoid } = autoGravityObjectModel;
        const autoFocus = new AutoFocus(new FocusOnValue(object));
        (weight || weight === 0) && autoFocus.weight(weight);
        avoid && autoFocus.avoid();
        return autoFocus;
    }
    /**
     * Create AutoGravity from IAutoGravityModel
     * @param gravityModel
     */
    function createAutoGravityFromModel(gravityModel) {
        const autoFocusModel = gravityModel.autoFocus || [];
        const autoFocus = autoFocusModel.map(createAutoFocusFromModel);
        return autoGravity().autoFocus(...autoFocus);
    }
    /**
     * Create FocusOnGravity from given IFocusOnGravityModel
     * @param gravityModel
     */
    function createFocusOnGravityFromModel(gravityModel) {
        const focusOnObjects = (gravityModel.focusOnObjects || []).map((str) => new FocusOnValue(str));
        const result = focusOn(...focusOnObjects);
        if (gravityModel.fallbackGravity) {
            const autoGravity = createAutoGravityFromModel(gravityModel.fallbackGravity);
            result.fallbackGravity(autoGravity);
        }
        return result;
    }
    /**
     * Create gravity instance from given gravity model
     * @param gravityModel
     */
    function createGravityFromModel(gravityModel) {
        if (isCompassGravityModel(gravityModel)) {
            return new CompassGravity(new CompassQualifier(gravityModel.compass));
        }
        if (isOcrGravityModel(gravityModel)) {
            return focusOn(ocr$1());
        }
        if (isAutoGravityModel(gravityModel)) {
            return createAutoGravityFromModel(gravityModel);
        }
        return createFocusOnGravityFromModel(gravityModel);
    }

    /**
     * @description Defines an advanced resize.
     * @extends Actions.Resize.ResizeSimpleAction
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizeAdvancedAction extends ResizeSimpleAction {
        /**
         * @description Which part of the original image to include.
         * @param {Qualifiers.Gravity} gravity
         */
        gravity(gravity) {
            this._actionModel.gravity = createGravityModel(gravity);
            const gravityQualifier = typeof gravity === "string" ? new Qualifier('g', gravity) : gravity;
            return this.addQualifier(gravityQualifier);
        }
        static fromJson(actionModel) {
            const result = super.fromJson.apply(this, [actionModel]);
            if (actionModel.gravity) {
                result.gravity(createGravityFromModel(actionModel.gravity));
            }
            return result;
        }
    }

    /**
     * @description Defines the visual appearance of the background.
     * @memberOf Qualifiers.Background
     * @extends {SDK.Qualifier}
     */
    class BackgroundQualifier extends Qualifier {
        constructor(backgroundValue) {
            // The qualifier key for this qualifier
            super('b');
            // Such as color (b_red)
            if (backgroundValue) {
                this.addValue(backgroundValue);
            }
        }
    }

    const DEFAULT_INTENSITY = 100;
    const DEFAULT_BRIGHTNESS = 0;
    /**
     * @description A class for blurred background transformations.
     * @memberOf Qualifiers.Background
     * @extends {Qualifiers.Background.BackgroundQualifier}
     */
    class BlurredBackgroundAction extends BackgroundQualifier {
        /**
         * @description Sets the intensity of the blur.
         * @param {number} value - The intensity of the blur.
         */
        intensity(value) {
            this.intensityLevel = value;
            return this;
        }
        /**
         * @description Sets the brightness of the background.
         * @param {number} value - The brightness of the background.
         */
        brightness(value) {
            this.brightnessLevel = value;
            return this;
        }
        /**
         * @description
         * Stringify the qualifier
         * BackgroundQualifiers don't have a value, but instead override the toString() function
         */
        toString() {
            // b_blurred:{intensity}:{brightness}
            const intensity = this.intensityLevel !== undefined ? `:${this.intensityLevel}` : '';
            const brightness = this.brightnessLevel !== undefined
                ? this.intensityLevel !== undefined
                    ? `:${this.brightnessLevel}`
                    : `:${DEFAULT_INTENSITY}:${this.brightnessLevel}`
                : '';
            return `b_blurred${intensity}${brightness}`;
        }
    }
    var BlurredBackgroundAction$1 = BlurredBackgroundAction;

    /**
     * @description Defines the background color to use when resizing with padding.
     * @memberOf Qualifiers.Background
     * @extends {Qualifiers.Background.BackgroundQualifier}
     */
    class BaseCommonBackground extends BackgroundQualifier {
        constructor() {
            super();
            this._palette = [];
        }
        /**
         * @description Selects the strongest contrasting color to use for padding.
         * @return {this}
         */
        contrast() {
            this._contrast = true;
            return this;
        }
        /**
         * @description Defines the custom colors to use when resizing using content-aware padding.
         * @param {...string} colors One or more colors - Example: palette('green', 'red', blue')
         * @return {this}
         */
        palette(...colors) {
            this._palette = colors.map((color) => {
                return prepareColor(color);
            });
            return this;
        }
    }

    /**
     * @description Automatically determines the color to use for padding, if needed when resizing an asset. Selects the
     * predominant color from the border of the image.
     * @memberOf Qualifiers.Background
     * @extends {Qualifiers.Background.BaseCommonBackground}
     */
    class BackgroundAutoBorderQualifier extends BaseCommonBackground {
        /**
         * @description
         * Stringify the qualifier
         * BackgroundQualifiers don't have a value, but instead override the toString() function.
         */
        toString() {
            return `
    b_auto:border
    ${this._contrast ? '_contrast' : ''}
    ${this._palette.length ? `:palette_${this._palette.join('_')}` : ''}
    `.replace(/\s+/g, '');
        }
    }

    /**
     * @description Defines the gradient fade effect to use for the background when resizing with padding.
     * @memberOf Qualifiers.Background
     * @extends {Qualifiers.Background.BaseCommonBackground}
     */
    class BaseGradientBackground extends BaseCommonBackground {
        /**
         *
         * @description Sets the number of predominant colors to use (2 or 4).
         * @param {number} num
         * @return {this}
         */
        gradientColors(num) {
            this._gradientColors = num;
            return this;
        }
        /**
         * @description Sets the direction for a background gradient fade effect.
         * @param {Qualifiers.GradientDirection | GradientDirectionType | string} direction Use one of these functions
         * provided by {@link Qualifiers.GradientDirection|GradientDirection}
         * @return {this}
         */
        gradientDirection(direction) {
            this._gradientDirection = direction;
            return this;
        }
    }

    /**
     * @description Specifies that the gradient fade effect, used for the background when resizing with padding, uses the
     * predominant colors in the border pixels of the image.
     * @memberOf Qualifiers.Background
     * @extends {Qualifiers.Background.BaseGradientBackground}
     */
    class BackgroundBorderGradientQualifier extends BaseGradientBackground {
        /**
         * @description
         * Stringify the qualifier
         * BackgroundQualifiers don't have a value, but instead override the toString() function.
         */
        toString() {
            return `
    b_auto:border_gradient
    ${this._contrast ? '_contrast' : ''}
    ${this._gradientColors ? `:${this._gradientColors}` : ''}
    ${this._gradientDirection ? `:${this._gradientDirection}` : ''}
    ${this._palette.length ? `:palette_${this._palette.join('_')}` : ''}
    `.replace(/\s+/g, '');
        }
    }

    /**
     * @description Specifies that the gradient fade effect, used for the background when resizing with padding, uses the
     * predominant colors in the whole of the image.
     * @memberOf Qualifiers.Background
     * @extends {Qualifiers.Background.BaseGradientBackground}
     */
    class BackgroundPredominantGradientQualifier extends BaseGradientBackground {
        /**
         * @description
         * Stringify the qualifier
         * BackgroundQualifiers don't have a value, but instead override the toString() function.
         */
        toString() {
            return `
    b_auto:predominant_gradient
    ${this._contrast ? '_contrast' : ''}
    ${this._gradientColors ? `:${this._gradientColors}` : ''}
    ${this._gradientDirection ? `:${this._gradientDirection}` : ''}
    ${this._palette.length ? `:palette_${this._palette.join('_')}` : ''}
    `.replace(/\s+/g, '');
        }
    }

    /**
     * @description Automatically determines the color to use for padding, if needed when resizing an asset. Selects the
     * predominant color from the whole image.
     * @memberOf Qualifiers.Background
     * @extends {Qualifiers.Background.BaseCommonBackground}
     */
    class BackgroundAutoPredominantQualifier extends BaseCommonBackground {
        /**
         * @description
         * Stringify the qualifier
         * BackgroundQualifiers don't have a value, but instead override the toString() function.
         */
        toString() {
            return `
    b_auto:predominant
    ${this._contrast ? '_contrast' : ''}
    ${this._palette.length ? `:palette_${this._palette.join('_')}` : ''}
    `.replace(/\s+/g, '');
        }
    }

    /**
     * @description Automatically fills the padded area using generative AI to extend the image seamlessly.
     * Optionally include a prompt to guide the image generation.
     * @memberOf Qualifiers.Background
     */
    class BackgroundGenerativeFillQualifier extends BackgroundQualifier {
        constructor() {
            super("gen_fill");
            this._backgroundType = 'generativeFill';
        }
        prompt(prompt) {
            this._prompt = prompt;
            return this;
        }
        getPrompt() {
            return this._prompt;
        }
        getBackgroundType() {
            return this._backgroundType;
        }
        /**
         * @description
         * Override the toString() function to explicitly stringify the qualifier.
         */
        toString() {
            return `b_gen_fill${this._prompt ? `:prompt_${this._prompt}` : ''}`;
        }
    }

    /**
     * Get the value of given background
     * @param background
     */
    function getBackgroundValue(background) {
        return `${background}`.replace('b_', '');
    }
    /**
     * Create an IAutoBackgroundModel from given background
     */
    function createAutoBackgroundModel() {
        return { backgroundType: 'auto' };
    }
    /**
     * Create an IBlurredBackgroundModel from given background
     * @param background
     */
    function createBlurredBackgroundModel(background) {
        const { intensityLevel, brightnessLevel } = background;
        const result = {
            backgroundType: 'blurred'
        };
        if (intensityLevel || intensityLevel === 0) {
            result.intensity = intensityLevel;
        }
        if (brightnessLevel || brightnessLevel === 0) {
            result.brightness = brightnessLevel;
        }
        return result;
    }
    /**
     * Create an IContrastPaletteBackgroundModel from given background
     * @param background
     */
    function createContrastPaletteBackgroundModel(background) {
        const contrast = background._contrast;
        const palette = background._palette;
        const result = {
            backgroundType: ''
        };
        if (contrast) {
            result.contrast = true;
        }
        if (palette) {
            result.palette = palette;
        }
        return result;
    }
    /**
     * Create an IBorderBackgroundModel from given background
     * @param background
     */
    function createBorderBackgroundModel(background) {
        return Object.assign(Object.assign({}, createContrastPaletteBackgroundModel(background)), { backgroundType: 'border' });
    }
    /**
     * Create an IBaseGradientBackgroundModel from given background
     * @param background
     */
    function createBaseGradientBackgroundModel(background) {
        const gradientColors = background._gradientColors;
        const gradientDirection = `${background._gradientDirection}`;
        const result = createContrastPaletteBackgroundModel(background);
        if (gradientColors) {
            result.gradientColors = gradientColors;
        }
        if (gradientDirection) {
            result.gradientDirection = gradientDirection;
        }
        return result;
    }
    /**
     * Create an IBorderGradientBackgroundModel from given background
     * @param background
     */
    function createBorderGradientBackgroundModel(background) {
        return Object.assign(Object.assign({}, createBaseGradientBackgroundModel(background)), { backgroundType: 'borderGradient' });
    }
    /**
     * Create an IColorBackgroundModel from given background
     * @param background
     */
    function createColorBackgroundModel(background) {
        return {
            backgroundType: 'color',
            color: getBackgroundValue(background)
        };
    }
    /**
     * Create an IPredominantBackgroundModel from given background
     * @param background
     */
    function createPredominantBackgroundModel(background) {
        return Object.assign(Object.assign({}, createContrastPaletteBackgroundModel(background)), { backgroundType: 'predominant' });
    }
    /**
     * Create an IPredominantGradientBackgroundModel from given background
     * @param background
     */
    function createPredominantGradientBackgroundModel(background) {
        return Object.assign(Object.assign({}, createBaseGradientBackgroundModel(background)), { backgroundType: 'predominantGradient' });
    }
    /**
     * Create an IGenerativeFillBackgroundModel from given background
     * @param urlValue
     */
    function createGenerativeFillBackgroundModel(background) {
        return Object.assign({ backgroundType: background.getBackgroundType() }, (background.getPrompt() ? { prompt: background.getPrompt() } : {}));
    }
    /**
     * Create an IBackgroundModel from given background
     * @param background
     */
    function createBackgroundModel(background) {
        if (getBackgroundValue(background) === 'auto') {
            return createAutoBackgroundModel();
        }
        if (background instanceof BlurredBackgroundAction$1) {
            return createBlurredBackgroundModel(background);
        }
        if (background instanceof BackgroundAutoBorderQualifier) {
            return createBorderBackgroundModel(background);
        }
        if (background instanceof BackgroundBorderGradientQualifier) {
            return createBorderGradientBackgroundModel(background);
        }
        if (background instanceof BackgroundAutoPredominantQualifier) {
            return createPredominantBackgroundModel(background);
        }
        if (background instanceof BackgroundPredominantGradientQualifier) {
            return createPredominantGradientBackgroundModel(background);
        }
        if (background instanceof BackgroundGenerativeFillQualifier) {
            return createGenerativeFillBackgroundModel(background);
        }
        return createColorBackgroundModel(background);
    }

    /**
     * @description Contains functions to select the text decoration to be used with text.
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
     * @memberOf Qualifiers
     * @namespace TextDecoration
     * @see To be used with {@link Qualifiers.TextStyle|Text Style}
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.TextDecoration
     */
    function normal$2() {
        return '';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.TextDecoration
     */
    function underline() {
        return 'underline';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.TextDecoration
     */
    function strikethrough() {
        return 'strikethrough';
    }
    const TextDecoration = { normal: normal$2, underline, strikethrough };

    /**
     * @description Contains functions to select the alignment of the text.
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
     * @memberOf Qualifiers
     * @namespace TextAlignment
     * @see To be used with {@link Qualifiers.TextStyle|Text Style}
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.TextAlignment
     */
    function left() {
        return 'left';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.TextAlignment
     */
    function right() {
        return 'right';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.TextAlignment
     */
    function center() {
        return 'center';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.TextAlignment
     */
    function start() {
        return 'start';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.TextAlignment
     */
    function end() {
        return 'end';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.TextAlignment
     */
    function justify() {
        return 'justify';
    }
    const TextAlignment = { left, right, center, end, justify, start };

    /**
     * @description Contains function to set the outline stroke.
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
     * @memberOf Qualifiers
     * @namespace TextAlignment
     * @see To be used with {@link Qualifiers.TextStyle|Text Style}
     */
    /**
     * @summary qualifier Adding a Border-like qualifier to the same action.
     * @memberOf Qualifiers.Stroke
     * @param {number|string|ExpressionQualifier} width The width in pixels.
     * @param {number|string|SystemColors} color The color of the border.
     */
    function solid$1(width, color) {
        return `bo_${width}px_solid_${color}`;
    }
    const Stroke = { solid: solid$1 };

    /**
     * @description Qualifiers for applying an ordered dither filter to the image.
     * @namespace StreamingProfile
     * @memberOf Qualifiers
     * @see Visit {@link Actions
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.StreamingProfile
     * @return {string}
     */
    function fullHd() {
        return 'full_hd';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.StreamingProfile
     * @return {string}
     */
    function hd() {
        return 'hd';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.StreamingProfile
     * @return {string}
     */
    function sd() {
        return 'sd';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.StreamingProfile
     * @return {string}
     */
    function fullHdWifi() {
        return 'full_hd_wifi';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.StreamingProfile
     * @return {string}
     */
    function fullHdLean() {
        return 'full_hd_lean';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.StreamingProfile
     * @return {string}
     */
    function hdLean() {
        return 'hd_lean';
    }
    const StreamingProfile = {
        hd,
        sd,
        hdLean,
        fullHd,
        fullHdLean,
        fullHdWifi
    };

    /**
     * @description Contains functions to select the type of color-blind condition to simulate.
     * <b>Learn more</b>: {@link https://cloudinary.com/blog/open_your_eyes_to_color_accessibility|Blog: Open your Eyes to Color Accessibility}
     * @memberOf Qualifiers
     * @namespace SimulateColorBlindValues
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.SimulateColorBlindValues
     * @return {string}
     */
    function deuteranopia() {
        return 'deuteranopia';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.SimulateColorBlindValues
     * @return {string}
     */
    function protanopia() {
        return 'protanopia';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.SimulateColorBlindValues
     * @return {string}
     */
    function tritanopia() {
        return 'tritanopia';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.SimulateColorBlindValues
     * @return {string}
     */
    function tritanomaly() {
        return 'tritanomaly';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.SimulateColorBlindValues
     * @return {string}
     */
    function deuteranomaly() {
        return 'deuteranomaly';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.SimulateColorBlindValues
     * @return {string}
     */
    function coneMonochromacy() {
        return 'cone_monochromacy';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.SimulateColorBlindValues
     * @return {string}
     */
    function rodMonochromacy() {
        return 'rod_monochromacy';
    }
    const SimulateColorBlind = {
        coneMonochromacy,
        deuteranomaly,
        deuteranopia,
        protanopia,
        rodMonochromacy,
        tritanomaly,
        tritanopia
    };

    /**
     * @description Acts as a marker for inputs passed into Rotate.mode()
     * @memberOf Qualifiers.RotationMode
     * @extends SDK.QualifierValue
     */
    class RotationModeQualifierValue extends QualifierValue {
        constructor(val) {
            super();
            this.val = val;
        }
        toString() {
            return this.val;
        }
    }

    /**
     * @description Contains functions to select the rotation mode.
     * </br><b>Learn more</b>: {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#rotating_images|Rotating images}
     * </br><b>Learn more</b>: {@link https://cloudinary.com/documentation/video_effects_and_enhancements#rotating_videos|Rotating videos}
     * @memberOf Qualifiers
     * @namespace RotationMode
     * @see Visit {@link Actions.Rotate|Rotate Action} for an example
     */
    /**
     * @summary qualifier
     * @description Rotate image 90 degrees clockwise only if the requested aspect ratio does not match the image's aspect ratio.
     * @memberOf Qualifiers.RotationMode
     * @return {Qualifiers.RotationMode.RotationModeQualifierValue}
     */
    function autoRight() {
        return new RotationModeQualifierValue('auto_right');
    }
    /**
     * @summary qualifier
     * @description Rotate image 90 degrees counterclockwise only if the requested aspect ratio does not match the image's aspect ratio.
     * @memberOf Qualifiers.RotationMode
     * @return {Qualifiers.RotationMode.RotationModeQualifierValue}
     */
    function autoLeft() {
        return new RotationModeQualifierValue('auto_left');
    }
    /**
     * @summary qualifier
     * @description Vertical mirror flip of the image.
     * @memberOf Qualifiers.RotationMode
     * @return {Qualifiers.RotationMode.RotationModeQualifierValue}
     */
    function verticalFlip() {
        return new RotationModeQualifierValue('vflip');
    }
    /**
     * @summary qualifier
     * @description Horizontal mirror flip of the image.
     * @memberOf Qualifiers.RotationMode
     * @return {Qualifiers.RotationMode.RotationModeQualifierValue}
     */
    function horizontalFlip() {
        return new RotationModeQualifierValue('hflip');
    }
    /**
     * @summary qualifier
     * @description By default, the image is automatically rotated according to the EXIF data stored by the camera when the image
     *                           was taken. Set the angle to 'ignore' if you do not want the image to be automatically rotated.
     * @memberOf Qualifiers.RotationMode
     * @return {Qualifiers.RotationMode.RotationModeQualifierValue}
     */
    function ignore() {
        return new RotationModeQualifierValue('ignore');
    }
    const RotationMode = { autoLeft, autoRight, horizontalFlip, ignore, verticalFlip };

    /**
     * @memberOf Qualifiers.Region
     */
    class NamedRegion extends Action {
        constructor(type) {
            super();
            this.regionType = type;
            this._actionModel.regionType = type;
        }
    }

    /**
     * @memberOf Qualifiers.Region
     */
    class CustomRegion extends NamedRegion {
        constructor() {
            super('custom');
        }
        /**
         * @description The x position in pixels.
         * @param {number | string} x
         */
        x(x) {
            this._actionModel.x = x;
            this.addQualifier(new Qualifier('x', x));
            return this;
        }
        /**
         * @description The y position in pixels.
         * @param {number | string} y
         */
        y(y) {
            this._actionModel.y = y;
            this.addQualifier(new Qualifier('y', y));
            return this;
        }
        /**
         * @description The width of the region in pixels.
         * @param {number | string} width
         */
        width(width) {
            this._actionModel.width = width;
            this.addQualifier(new Qualifier('w', width));
            return this;
        }
        /**
         * @description The height of the region in pixels.
         * @param {number | string} height
         */
        height(height) {
            this._actionModel.height = height;
            this.addQualifier(new Qualifier('h', height));
            return this;
        }
        static fromJson(model) {
            const customRegion = new CustomRegion();
            if (model.width) {
                customRegion.width(model.width);
            }
            if (model.height) {
                customRegion.height(model.height);
            }
            if (model.x) {
                customRegion.x(model.x);
            }
            if (model.y) {
                customRegion.y(model.y);
            }
            return customRegion;
        }
    }

    /**
     * @memberOf Qualifiers.Region
     */
    class RectangleRegion extends Action {
        /**
         * Rectangle defines a region where action will be applied
         *
         * @param {number} x The x position in pixels
         * @param {number} y The y position in pixels
         * @param {number} width The width in pixels
         * @param {number} height The height in pixels
         */
        constructor(x, y, width, height) {
            super();
            this.addQualifier(new Qualifier("x", x));
            this.addQualifier(new Qualifier("y", y));
            this.addQualifier(new Qualifier("w", width));
            this.addQualifier(new Qualifier("h", height));
            this._actionModel = {
                x,
                y,
                width,
                height,
            };
        }
        toString() {
            const { x, y, width, height } = this._actionModel;
            return `(x_${x};y_${y};w_${width};h_${height})`;
        }
    }

    /**
     * @summary qualifier
     * @memberOf Qualifiers.Region
     * @return {Qualifiers.Region.CustomRegion}
     */
    function custom() {
        return new CustomRegion();
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Region
     * @return {Qualifiers.Region.NamedRegion}
     */
    function faces() {
        return new NamedRegion("faces");
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Region
     * @return {Qualifiers.Region.NamedRegion}
     */
    function ocr() {
        return new NamedRegion("ocr_text");
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Region
     * @return {Qualifiers.Region.RectangleRegion}
     */
    function rectangle(x, y, width, height) {
        return new RectangleRegion(x, y, width, height);
    }
    /**
     * @description Contains functions to select the type of region, used with Effect.blur() and Effect.pixelate().
     * <b>See also</b>: {@link Actions.Effect.BlurAction|Blur Action}
     * <b>See also</b>: {@link Actions.Effect.Pixelate|Blur Action}
     * <b>See also</b>: {@link Actions.Effect|Possible effects}
     * @namespace Region
     * @memberOf Qualifiers
     */
    const Region = { ocr, faces, custom, rectangle };

    /**
     * @memberOf Qualifiers
     * @namespace Quality
     * @see Visit {@link Actions.Delivery.quality|Delivery Quality} for an example
     */
    /**
     * @summary qualifier
     * @description Quality auto
     * @memberOf Qualifiers.Quality
     * @return {string}
     */
    function auto$6() { return 'auto'; }
    /**
     * @summary qualifier
     * @description Quality best
     * @memberOf Qualifiers.Quality
     * @return {string}
     */
    function autoBest() { return 'auto:best'; }
    /**
     * @summary qualifier
     * @description Quality eco
     * @memberOf Qualifiers.Quality
     * @return {string}
     */
    function autoEco() { return 'auto:eco'; }
    /**
     * @summary qualifier
     * @description Quality good
     * @memberOf Qualifiers.Quality
     * @return {string}
     */
    function autoGood() { return 'auto:good'; }
    /**
     * @summary qualifier
     * @description Quality low
     * @memberOf Qualifiers.Quality
     * @return {string}
     */
    function autoLow() { return 'auto:low'; }
    /**
     * @summary qualifier
     * @description Quality jpegmini
     * @memberOf Qualifiers.Quality
     * @return {string}
     */
    function jpegmini() { return 'jpegmini'; }
    /**
     * @summary qualifier
     * @description Quality jpegmini best
     * @memberOf Qualifiers.Quality
     * @return {string}
     */
    function jpegminiBest() { return 'jpegmini:0'; }
    /**
     * @summary qualifier
     * @description Quality jpegmini high
     * @memberOf Qualifiers.Quality
     * @return {string}
     */
    function jpegminiHigh() { return 'jpegmini:1'; }
    /**
     * @summary qualifier
     * @quality
     * @description Quality jpegmini medium
     * @memberOf Qualifiers.Quality
     * @return {string}
     */
    function jpegminiMedium() { return 'jpegmini:2'; }
    const Quality = { auto: auto$6, autoBest, autoEco, autoGood, autoLow, jpegmini, jpegminiBest, jpegminiHigh, jpegminiMedium };

    /**
     * @description
     * Defines the position of a layer: overlay or underlay.</br>
     * Even though Position is technically an action qualifier, it implements exactly the same functionality as an action.</br>
     * This is true because Position is compounded of multiple qualifiers</br>
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/layers|Applying overlays to images} | {@link https://cloudinary.com/documentation/video_layers|Applying overlays to videos}
     *
     * @extends {SDK.Actions}
     */
    class PositionQualifier extends Action {
        constructor() {
            super();
            this._actionModel = {};
        }
        gravity(gravityQualifier) {
            this.addQualifier(gravityQualifier);
            this._actionModel.gravity = createGravityModel(gravityQualifier);
            return this;
        }
        /**
         * @description Tiles the overlay across your image.
         * <b>Learn more:</b> {@link https://cloudinary.com/documentation/layers#automatic_tiling|Tiling overlay}
         */
        tiled() {
            this.addFlag(tiled());
            this._actionModel.tiled = true;
            return this;
        }
        /**
         * TODO - This should accept a boolean value
         * @description Prevents an image or text overlay from extending a delivered image canvas beyond the dimensions of the base image
         * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#fl_no_overflow|Overflow in overlays}
         */
        allowOverflow(bool = true) {
            if (bool === false) {
                this.addFlag(noOverflow());
            }
            this._actionModel.allowOverflow = bool;
            return this;
        }
        /**
         * @description Set the X Offset
         * @param {number | string} offsetX
         * @return {this}
         */
        offsetX(offsetX) {
            this.addQualifier(new Qualifier('x', offsetX));
            this._actionModel.offsetX = offsetX;
            return this;
        }
        /**
         * @description Set the Y Offset
         * @param {number | string} offsetY
         * @return {this}
         */
        offsetY(offsetY) {
            this.addQualifier(new Qualifier('y', offsetY));
            this._actionModel.offsetY = offsetY;
            return this;
        }
    }

    /**
     * @description Contains functions to select the type of improvement to perform when using Adjust.improve().
     * @namespace Outline
     * @memberOf Qualifiers
     * @see Visit {@link Actions.Effect|Effect Action} for an example
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Outline
     */
    function fill$1() {
        return 'fill';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Outline
     */
    function inner() {
        return 'inner';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Outline
     */
    function innerFill() {
        return 'inner_fill';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Outline
     */
    function outer() {
        return 'outer';
    }
    const OutlineMode = {
        outer,
        inner,
        innerFill,
        fill: fill$1
    };

    /**
     * @description Defines the available modes to use with the improve effect.
     * @namespace ImproveMode
     * @memberOf Qualifiers
     * @see To be used with an {@link Actions.Adjust.ImproveAction|Adjust Improve}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen/instance/Cloudinary";
     * import {outdoor} from "@cloudinary/url-gen/qualifiers/improveMode";
     * import {improve} from "@cloudinary/url-gen/actions/adjust";
     *
     * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.adjust(improve().mode(outdoor()));
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ImproveMode
     * @description Use this mode to get better results on outdoor images.
     * @return string
     */
    function outdoor() {
        return 'outdoor';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ImproveMode
     * @description Use this mode to get better results on images with indoor lighting and shadows.
     * @return string
     */
    function indoor() {
        return 'indoor';
    }
    const ImproveMode = {
        indoor,
        outdoor
    };

    /**
     * @memberOf Qualifiers.GradientDirection
     * @extends {SDK.QualifierValue}
     */
    class GradientDirectionQualifierValue extends QualifierValue {
    }

    /**
     * @description Defines the direction for a background gradient fade effect.
     * @memberOf Qualifiers
     * @namespace GradientDirection
     */
    /**
     * @summary qualifier
     * @description Blend the colors horizontally.
     * @memberOf Qualifiers.GradientDirection
     * @return {Qualifiers.GradientDirection.GradientDirectionQualifierValue}
     */
    function horizontal() {
        return new GradientDirectionQualifierValue('horizontal');
    }
    /**
     * @summary qualifier
     * @description Blend the colors vertically.
     * @memberOf Qualifiers.GradientDirection
     * @return {Qualifiers.GradientDirection.GradientDirectionQualifierValue}
     */
    function vertical() {
        return new GradientDirectionQualifierValue('vertical');
    }
    /**
     * @summary qualifier
     * @description Blend the colors diagonally from top-left to bottom-right.
     * @memberOf Qualifiers.GradientDirection
     * @return {Qualifiers.GradientDirection.GradientDirectionQualifierValue}
     */
    function diagonalDesc() {
        return new GradientDirectionQualifierValue('diagonal_desc');
    }
    /**
     * @summary qualifier
     * @description Blend the colors diagonally from bottom-left to top-right.
     * @memberOf Qualifiers.GradientDirection
     * @return {Qualifiers.GradientDirection.GradientDirectionQualifierValue}
     */
    function diagonalAsc() {
        return new GradientDirectionQualifierValue('diagonal_asc');
    }
    const GradientDirection = {
        horizontal,
        vertical,
        diagonalDesc,
        diagonalAsc
    };

    /**
     * @description Contains functions to select the asset format, can be used to convert images and videos to other formats.
     * @memberOf Qualifiers
     * @namespace Format
     * @see Visit {@link Actions.Delivery.format|Delivery Format} for an example
     */
    /**
     * @summary qualifier
     * @description Image format heic.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function heic() { return new FormatQualifier('heic'); }
    /**
     * @summary qualifier
     * @description Image format flif.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function flif() { return new FormatQualifier('flif'); }
    /**
     * @summary qualifier
     * @description Image format ai.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function ai() { return new FormatQualifier('ai'); }
    /**
     * @summary qualifier
     * @description Image format wdp.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function wdp() { return new FormatQualifier('wdp'); }
    /**
     * @summary qualifier
     * @description Image format svg.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function svg() { return new FormatQualifier('svg'); }
    /**
     * @summary qualifier
     * @description Image format webp.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function webp$1() { return new FormatQualifier('webp'); }
    /**
     * @summary qualifier
     * @description Image format psd.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function psd() { return new FormatQualifier('psd'); }
    /**
     * @summary qualifier
     * @description Image format jp2.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function jp2() { return new FormatQualifier('jp2'); }
    /**
     * @summary qualifier
     * @description Image format jpc.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function jpc() { return new FormatQualifier('jpc'); }
    /**
     * @summary qualifier
     * @description Image format eps.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function eps() { return new FormatQualifier('eps'); }
    /**
     * @summary qualifier
     * @description Image format tiff.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function tiff() { return new FormatQualifier('tiff'); }
    /**
     * @summary qualifier
     * @description Image format pdf.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function pdf() { return new FormatQualifier('pdf'); }
    /**
     * @summary qualifier
     * @description Image format ico.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function ico() { return new FormatQualifier('ico'); }
    /**
     * @summary qualifier
     * @description Image format bmp.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function bmp() { return new FormatQualifier('bmp'); }
    /**
     * @summary qualifier
     * @description Image format png.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function png$1() { return new FormatQualifier('png'); }
    /**
     * @summary qualifier
     * @description Image format gif.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function gif$1() { return new FormatQualifier('gif'); }
    /**
     * @summary qualifier
     * @description Image format auto.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function auto$5() { return new FormatQualifier('auto'); }
    /**
     * @summary qualifier
     * @description Image format jpg.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function jpg() { return new FormatQualifier('jpg'); }
    /**
     * @summary qualifier
     * @description Image format djvu.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function djvu() { return new FormatQualifier('djvu'); }
    /**
     * @summary qualifier
     * @description Image format ps.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function ps() { return new FormatQualifier('ps'); }
    /**
     * @summary qualifier
     * @description Image format ept.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function ept() { return new FormatQualifier('ept'); }
    /**
     * @summary qualifier
     * @description Image format eps3.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function eps3() { return new FormatQualifier('eps3'); }
    /**
     * @summary qualifier
     * @description Image format fxb.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function fxb() { return new FormatQualifier('fxb'); }
    /**
     * @summary qualifier
     * @description Image format gltf.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function gltf() { return new FormatQualifier('gltf'); }
    /**
     * @summary qualifier
     * @description Image format heif.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function heif() { return new FormatQualifier('heif'); }
    /**
     * @summary qualifier
     * @description Image format indd.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function indd() { return new FormatQualifier('indd'); }
    /**
     * @summary qualifier
     * @description Image format jpe.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function jpe() { return new FormatQualifier('jpe'); }
    /**
     * @summary qualifier
     * @description Image format jpeg.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function jpeg() { return new FormatQualifier('jpeg'); }
    /**
     * @summary qualifier
     * @description Image format jxr.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function jxr() { return new FormatQualifier('jxr'); }
    /**
     * @summary qualifier
     * @description Image format hdp.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function hdp() { return new FormatQualifier('hdp'); }
    /**
     * @summary qualifier
     * @description Image format spd.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function spd() { return new FormatQualifier('spd'); }
    /**
     * @summary qualifier
     * @description Image format arw.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function arw() { return new FormatQualifier('arw'); }
    /**
     * @summary qualifier
     * @description Image format cr2.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function cr2() { return new FormatQualifier('cr2'); }
    /**
     * @summary qualifier
     * @description Image format tga.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function tga() { return new FormatQualifier('tga'); }
    /**
     * @summary qualifier
     * @description Image format tif.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function tif() { return new FormatQualifier('tif'); }
    /**
     * @summary qualifier
     * @description Image format avif.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function avif() { return new FormatQualifier('avif'); }
    /**
     * @summary qualifier
     * @description format usdz.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function usdz() { return new FormatQualifier('usdz'); }
    /**
     * @summary qualifier
     * @description Image format 3g2.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function video3g2() { return new FormatQualifier('3g2'); }
    /**
     * @summary qualifier
     * @description Image format 3gp.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function video3gp() { return new FormatQualifier('3gp'); }
    /**
     * @summary qualifier
     * @description Image format avi.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoAvi() { return new FormatQualifier('avi'); }
    /**
     * @summary qualifier
     * @description Image format flv.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoFlv() { return new FormatQualifier('flv'); }
    /**
     * @summary qualifier
     * @description Image format m3u8.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoM3u8() { return new FormatQualifier('m3u8'); }
    /**
     * @summary qualifier
     * @description Image format ts.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoTs() { return new FormatQualifier('ts'); }
    /**
     * @summary qualifier
     * @description Image format mov.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoMov() { return new FormatQualifier('mov'); }
    /**
     * @summary qualifier
     * @description Image format mkv.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoMkv() { return new FormatQualifier('mkv'); }
    /**
     * @summary qualifier
     * @description Image format mp4.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoMp4() { return new FormatQualifier('mp4'); }
    /**
     * @summary qualifier
     * @description Image format mpeg.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoMpeg() { return new FormatQualifier('mpeg'); }
    /**
     * @summary qualifier
     * @description Image format mpd.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoMpd() { return new FormatQualifier('mpd'); }
    /**
     * @summary qualifier
     * @description Image format mxf.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoMxf() { return new FormatQualifier('mxf'); }
    /**
     * @summary qualifier
     * @description Image format ogv.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoOgv() { return new FormatQualifier('ogv'); }
    /**
     * @summary qualifier
     * @description Image format webm.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoWebm() { return new FormatQualifier('webm'); }
    /**
     * @summary qualifier
     * @description Image format wmv.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoWmv() { return new FormatQualifier('wmv'); }
    /**
     * @summary qualifier
     * @description Image format m2ts.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoM2ts() { return new FormatQualifier('m2ts'); }
    /**
     * @summary qualifier
     * @description Image format mts.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function videoMts() { return new FormatQualifier('mts'); }
    /**
     * @summary qualifier
     * @description Audio format aac.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function audioAac() { return new FormatQualifier('aac'); }
    /**
     * @summary qualifier
     * @description Audio format aiff.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function audioAiff() { return new FormatQualifier('aiff'); }
    /**
     * @summary qualifier
     * @description Audio format amr.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function audioAmr() { return new FormatQualifier('amr'); }
    /**
     * @summary qualifier
     * @description Audio format flac.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function audioFlac() { return new FormatQualifier('flac'); }
    /**
     * @summary qualifier
     * @description Audio format m4a.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function audioM4a() { return new FormatQualifier('m4a'); }
    /**
     * @summary qualifier
     * @description Audio format mp3.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function audioMp3() { return new FormatQualifier('mp3'); }
    /**
     * @summary qualifier
     * @description Audio format ogg.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function audioOgg() { return new FormatQualifier('ogg'); }
    /**
     * @summary qualifier
     * @description Audio format opus.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function audioOpus() { return new FormatQualifier('opus'); }
    /**
     * @summary qualifier
     * @description Audio format wav.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function audioWav() { return new FormatQualifier('wav'); }
    /**
     * @summary qualifier
     * @description Image format glb.
     * @memberOf Qualifiers.Format
     * @return {Qualifiers.Format.FormatQualifier}
     */
    function glb() { return new FormatQualifier('glb'); }
    const Format = { usdz, jp2, ai, auto: auto$5, bmp, eps, flif, gif: gif$1, heic, ico, jpc, jpg, pdf, png: png$1, psd, svg, tiff, wdp, webp: webp$1, arw, audioAac, audioAiff, audioAmr, audioFlac, audioM4a, audioMp3, audioOgg, audioOpus, audioWav, avif, cr2, djvu, eps3, ept, fxb, gltf, hdp, heif, indd, jpe, jpeg, jxr, ps, spd, tga, tif, video3g2, video3gp, videoAvi, videoFlv, videoM2ts, videoM3u8, videoMkv, videoMov, videoMp4, videoMpd, videoMpeg, videoMts, videoMxf, videoOgv, videoTs, videoWebm, videoWmv, glb };

    /**
     * @description Contains functions to select the font weight.
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
     * @memberOf Qualifiers
     * @namespace FontWeight
     * @see To be used with {@link Qualifiers.TextStyle|Text Style}
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.FontWeight
     */
    function thin() {
        return 'thin';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.FontWeight
     */
    function light() {
        return 'light';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.FontWeight
     */
    function normal$1() {
        return 'normal';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.FontWeight
     */
    function bold() {
        return 'bold';
    }
    const FontWeight = { bold, light, normal: normal$1, thin };

    /**
     * @description Contains functions to select the style of the text.
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
     * @memberOf Qualifiers
     * @namespace FontStyle
     * @see To be used with {@link Qualifiers.TextStyle|Text Style}
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.FontStyle
     */
    function normal() {
        return 'normal';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.FontStyle
     */
    function italic() {
        return 'italic';
    }
    const FontStyle = { normal, italic };

    /**
     * @description Contains functions to select the font hinting setting.
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
     * @memberOf Qualifiers
     * @namespace FontHinting
     * @see To be used with {@link Qualifiers.TextStyle|Text Style}
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.FontHinting
     */
    function none$1() {
        return '';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.FontHinting
     */
    function slight() {
        return 'slight';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.FontHinting
     */
    function medium() {
        return 'medium';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.FontHinting
     */
    function full() {
        return 'full';
    }
    const FontHinting = { full, none: none$1, medium, slight };

    /**
     * @namespace Expression
     * @memberOf Qualifiers.Expression
     * @extends {SDK.QualifierValue}
     */
    class ExpressionQualifier extends QualifierValue {
        constructor(value) {
            super();
            this.value = value;
        }
        toString() {
            return this.value;
        }
    }

    /**
     * @description
     * Used for variable or conditional expressions
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/user_defined_variables#arithmetic_expressions|Arithmetic expressions }
     * @namespace Expression
     * @memberOf Qualifiers
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Expression
     * @return {Qualifiers.Expression.ExpressionQualifier}
     */
    function expression(exp) {
        // Prepare the CONDITIONAL_OPERATORS object to be used in a regex
        // Properly escape |, +, ^ and *
        // This step also adds a regex space ( \s ) around each operator, since these are only replaced when wrapped with spaces
        // $foo * $bar is replaced to $foo_mul_$bar
        // $foo*bar is treated AS-IS.
        const reservedOperatorList = Object.keys(CONDITIONAL_OPERATORS).map((key) => {
            return `\\s${key.replace(/(\*|\+|\^|\|)/g, '\\$1')}\\s`;
        });
        // reservedOperatorList is now an array of values, joining with | creates the regex list
        const regexSafeOperatorList = reservedOperatorList.join('|');
        const operatorsReplaceRE = new RegExp(`(${regexSafeOperatorList})`, "g");
        // First, we replace all the operators
        // Notice how we pad the matched operators with `_`, this is following the step above.
        // This turns $foo * $bar into $foo_mul_$bar (notice how the spaces were replaced with an underscore
        const stringWithOperators = exp.toString()
            .replace(operatorsReplaceRE, (match) => {
            // match contains spaces around the expression, we need to trim it as the original list
            // does not contain spaces.
            return `_${CONDITIONAL_OPERATORS[match.trim()]}_`;
        });
        // Handle reserved names (width, height, etc.)
        const ReservedNames = Object.keys(RESERVED_NAMES);
        const regexSafeReservedNameList = ReservedNames.join('|');
        // Gather all statements that begin with a dollar sign, underscore or a space
        // Gather all RESERVED NAMES
        // $foo_bar is matched
        // height is matched
        const reservedNamesRE = new RegExp(`(\\$_*[^_ ]+)|${regexSafeReservedNameList}`, "g");
        // Since this regex captures both user variables and our reserved keywords, we need to add some logic in the replacer
        const stringWithVariables = stringWithOperators.replace(reservedNamesRE, (match) => {
            // Do not do anything to user variables (anything starting with $)
            if (match.startsWith('$')) {
                return match;
            }
            else {
                return RESERVED_NAMES[match] || match;
            }
        });
        // Serialize remaining spaces with an underscore
        const finalExpressionString = stringWithVariables.replace(/\s/g, '_');
        return new ExpressionQualifier(finalExpressionString);
    }
    // as a namespace
    const Expression$1 = {
        expression
    };

    /**
     * @description Qualifiers for applying an ordered dither filter to the image.
     * @namespace Dither
     * @memberOf Qualifiers
     * @see Visit {@link Actions.Effect.dither|Dither Effect} for an example
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function threshold1x1Nondither() {
        return 0;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function checkerboard2x1Dither() {
        return 1;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function ordered2x2Dispersed() {
        return 2;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function ordered3x3Dispersed() {
        return 3;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function ordered4x4Dispersed() {
        return 4;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function ordered8x8Dispersed() {
        return 5;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function halftone4x4Angled() {
        return 6;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function halftone6x6Angled() {
        return 7;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function halftone8x8Angled() {
        return 8;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function halftone4x4Orthogonal() {
        return 9;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function halftone6x6Orthogonal() {
        return 10;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function halftone8x8Orthogonal() {
        return 11;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function halftone16x16Orthogonal() {
        return 12;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function circles5x5Black() {
        return 13;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function circles5x5White() {
        return 14;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function circles6x6Black() {
        return 15;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function circles6x6White() {
        return 16;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function circles7x7Black() {
        return 17;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.Dither
     */
    function circles7x7White() {
        return 18;
    }
    const Dither = {
        checkerboard2x1Dither,
        circles5x5Black,
        circles5x5White,
        circles6x6Black,
        circles6x6White,
        circles7x7Black,
        circles7x7White,
        halftone4x4Angled,
        halftone4x4Orthogonal,
        halftone6x6Angled,
        halftone6x6Orthogonal,
        halftone8x8Angled,
        halftone8x8Orthogonal,
        halftone16x16Orthogonal,
        ordered2x2Dispersed,
        ordered3x3Dispersed,
        ordered4x4Dispersed,
        ordered8x8Dispersed,
        threshold1x1Nondither
    };

    /**
     * @description Contains functions to select the color space mode.
     * @namespace ColorSpace
     * @memberOf Qualifiers
     * @see Visit {@link Actions.Delivery.colorSpace|Delivery Color Space} for an example
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ColorSpace
     */
    function srgb() {
        return 'srgb';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ColorSpace
     */
    function trueColor() {
        return 'srgb:truecolor';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ColorSpace
     */
    function tinySrgb() {
        return 'tinysrgb';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ColorSpace
     */
    function cmyk() {
        return 'cmyk';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ColorSpace
     */
    function noCmyk() {
        return 'no_cmyk';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ColorSpace
     */
    function keepCmyk() {
        return 'keep_cmyk';
    }
    const ColorSpace = {
        cmyk,
        keepCmyk,
        noCmyk,
        srgb,
        tinySrgb,
        trueColor
    };

    /**
     * @memberOf Qualifiers
     * @description This namespace contains all the colors used in the SDK
     * @namespace Color
     * @example
     * // Reference only, do NOT use within your code for tree-shaking reasons
     * // SDK functions that require color accept a string (like 'red') or a hex value, like 'ffffff'
     * import {Color} from '@cloudinary/url-gen/qualifiers/color'
     * console.log(Color.RED);
     */
    const Color = {
        SNOW: 'snow',
        SNOW1: 'snow1',
        SNOW2: 'snow2',
        ROSYBROWN1: 'rosybrown1',
        ROSYBROWN2: 'rosybrown2',
        SNOW3: 'snow3',
        LIGHTCORAL: 'lightcoral',
        INDIANRED1: 'indianred1',
        ROSYBROWN3: 'rosybrown3',
        INDIANRED2: 'indianred2',
        ROSYBROWN: 'rosybrown',
        BROWN1: 'brown1',
        FIREBRICK1: 'firebrick1',
        BROWN2: 'brown2',
        INDIANRED: 'indianred',
        INDIANRED3: 'indianred3',
        FIREBRICK2: 'firebrick2',
        SNOW4: 'snow4',
        BROWN3: 'brown3',
        RED: 'red',
        RED1: 'red1',
        ROSYBROWN4: 'rosybrown4',
        FIREBRICK3: 'firebrick3',
        RED2: 'red2',
        FIREBRICK: 'firebrick',
        BROWN: 'brown',
        RED3: 'red3',
        INDIANRED4: 'indianred4',
        BROWN4: 'brown4',
        FIREBRICK4: 'firebrick4',
        DARKRED: 'darkred',
        RED4: 'red4',
        LIGHTPINK1: 'lightpink1',
        LIGHTPINK3: 'lightpink3',
        LIGHTPINK4: 'lightpink4',
        LIGHTPINK2: 'lightpink2',
        LIGHTPINK: 'lightpink',
        PINK: 'pink',
        CRIMSON: 'crimson',
        PINK1: 'pink1',
        PINK2: 'pink2',
        PINK3: 'pink3',
        PINK4: 'pink4',
        PALEVIOLETRED4: 'palevioletred4',
        PALEVIOLETRED: 'palevioletred',
        PALEVIOLETRED2: 'palevioletred2',
        PALEVIOLETRED1: 'palevioletred1',
        PALEVIOLETRED3: 'palevioletred3',
        LAVENDERBLUSH: 'lavenderblush',
        LAVENDERBLUSH1: 'lavenderblush1',
        LAVENDERBLUSH3: 'lavenderblush3',
        LAVENDERBLUSH2: 'lavenderblush2',
        LAVENDERBLUSH4: 'lavenderblush4',
        MAROON: 'maroon',
        HOTPINK3: 'hotpink3',
        VIOLETRED3: 'violetred3',
        VIOLETRED1: 'violetred1',
        VIOLETRED2: 'violetred2',
        VIOLETRED4: 'violetred4',
        HOTPINK2: 'hotpink2',
        HOTPINK1: 'hotpink1',
        HOTPINK4: 'hotpink4',
        HOTPINK: 'hotpink',
        DEEPPINK: 'deeppink',
        DEEPPINK1: 'deeppink1',
        DEEPPINK2: 'deeppink2',
        DEEPPINK3: 'deeppink3',
        DEEPPINK4: 'deeppink4',
        MAROON1: 'maroon1',
        MAROON2: 'maroon2',
        MAROON3: 'maroon3',
        MAROON4: 'maroon4',
        MEDIUMVIOLETRED: 'mediumvioletred',
        VIOLETRED: 'violetred',
        ORCHID2: 'orchid2',
        ORCHID: 'orchid',
        ORCHID1: 'orchid1',
        ORCHID3: 'orchid3',
        ORCHID4: 'orchid4',
        THISTLE1: 'thistle1',
        THISTLE2: 'thistle2',
        PLUM1: 'plum1',
        PLUM2: 'plum2',
        THISTLE: 'thistle',
        THISTLE3: 'thistle3',
        PLUM: 'plum',
        VIOLET: 'violet',
        PLUM3: 'plum3',
        THISTLE4: 'thistle4',
        FUCHSIA: 'fuchsia',
        MAGENTA: 'magenta',
        MAGENTA1: 'magenta1',
        PLUM4: 'plum4',
        MAGENTA2: 'magenta2',
        MAGENTA3: 'magenta3',
        DARKMAGENTA: 'darkmagenta',
        MAGENTA4: 'magenta4',
        PURPLE: 'purple',
        MEDIUMORCHID: 'mediumorchid',
        MEDIUMORCHID1: 'mediumorchid1',
        MEDIUMORCHID2: 'mediumorchid2',
        MEDIUMORCHID3: 'mediumorchid3',
        MEDIUMORCHID4: 'mediumorchid4',
        DARKVIOLET: 'darkviolet',
        DARKORCHID: 'darkorchid',
        DARKORCHID1: 'darkorchid1',
        DARKORCHID3: 'darkorchid3',
        DARKORCHID2: 'darkorchid2',
        DARKORCHID4: 'darkorchid4',
        INDIGO: 'indigo',
        BLUEVIOLET: 'blueviolet',
        PURPLE2: 'purple2',
        PURPLE3: 'purple3',
        PURPLE4: 'purple4',
        PURPLE1: 'purple1',
        MEDIUMPURPLE: 'mediumpurple',
        MEDIUMPURPLE1: 'mediumpurple1',
        MEDIUMPURPLE2: 'mediumpurple2',
        MEDIUMPURPLE3: 'mediumpurple3',
        MEDIUMPURPLE4: 'mediumpurple4',
        DARKSLATEBLUE: 'darkslateblue',
        LIGHTSLATEBLUE: 'lightslateblue',
        MEDIUMSLATEBLUE: 'mediumslateblue',
        SLATEBLUE: 'slateblue',
        SLATEBLUE1: 'slateblue1',
        SLATEBLUE2: 'slateblue2',
        SLATEBLUE3: 'slateblue3',
        SLATEBLUE4: 'slateblue4',
        GHOSTWHITE: 'ghostwhite',
        LAVENDER: 'lavender',
        BLUE: 'blue',
        BLUE1: 'blue1',
        BLUE2: 'blue2',
        BLUE3: 'blue3',
        MEDIUMBLUE: 'mediumblue',
        BLUE4: 'blue4',
        DARKBLUE: 'darkblue',
        MIDNIGHTBLUE: 'midnightblue',
        NAVY: 'navy',
        NAVYBLUE: 'navyblue',
        ROYALBLUE: 'royalblue',
        ROYALBLUE1: 'royalblue1',
        ROYALBLUE2: 'royalblue2',
        ROYALBLUE3: 'royalblue3',
        ROYALBLUE4: 'royalblue4',
        CORNFLOWERBLUE: 'cornflowerblue',
        LIGHTSTEELBLUE: 'lightsteelblue',
        LIGHTSTEELBLUE1: 'lightsteelblue1',
        LIGHTSTEELBLUE2: 'lightsteelblue2',
        LIGHTSTEELBLUE3: 'lightsteelblue3',
        LIGHTSTEELBLUE4: 'lightsteelblue4',
        SLATEGRAY4: 'slategray4',
        SLATEGRAY1: 'slategray1',
        SLATEGRAY2: 'slategray2',
        SLATEGRAY3: 'slategray3',
        LIGHTSLATEGRAY: 'lightslategray',
        LIGHTSLATEGREY: 'lightslategrey',
        SLATEGRAY: 'slategray',
        SLATEGREY: 'slategrey',
        DODGERBLUE: 'dodgerblue',
        DODGERBLUE1: 'dodgerblue1',
        DODGERBLUE2: 'dodgerblue2',
        DODGERBLUE4: 'dodgerblue4',
        DODGERBLUE3: 'dodgerblue3',
        ALICEBLUE: 'aliceblue',
        STEELBLUE4: 'steelblue4',
        STEELBLUE: 'steelblue',
        STEELBLUE1: 'steelblue1',
        STEELBLUE2: 'steelblue2',
        STEELBLUE3: 'steelblue3',
        SKYBLUE4: 'skyblue4',
        SKYBLUE1: 'skyblue1',
        SKYBLUE2: 'skyblue2',
        SKYBLUE3: 'skyblue3',
        LIGHTSKYBLUE: 'lightskyblue',
        LIGHTSKYBLUE4: 'lightskyblue4',
        LIGHTSKYBLUE1: 'lightskyblue1',
        LIGHTSKYBLUE2: 'lightskyblue2',
        LIGHTSKYBLUE3: 'lightskyblue3',
        SKYBLUE: 'skyblue',
        LIGHTBLUE3: 'lightblue3',
        DEEPSKYBLUE: 'deepskyblue',
        DEEPSKYBLUE1: 'deepskyblue1',
        DEEPSKYBLUE2: 'deepskyblue2',
        DEEPSKYBLUE4: 'deepskyblue4',
        DEEPSKYBLUE3: 'deepskyblue3',
        LIGHTBLUE1: 'lightblue1',
        LIGHTBLUE2: 'lightblue2',
        LIGHTBLUE: 'lightblue',
        LIGHTBLUE4: 'lightblue4',
        POWDERBLUE: 'powderblue',
        CADETBLUE1: 'cadetblue1',
        CADETBLUE2: 'cadetblue2',
        CADETBLUE3: 'cadetblue3',
        CADETBLUE4: 'cadetblue4',
        TURQUOISE1: 'turquoise1',
        TURQUOISE2: 'turquoise2',
        TURQUOISE3: 'turquoise3',
        TURQUOISE4: 'turquoise4',
        CADETBLUE: 'cadetblue',
        DARKTURQUOISE: 'darkturquoise',
        AZURE: 'azure',
        AZURE1: 'azure1',
        LIGHTCYAN1: 'lightcyan1',
        LIGHTCYAN: 'lightcyan',
        AZURE2: 'azure2',
        LIGHTCYAN2: 'lightcyan2',
        PALETURQUOISE1: 'paleturquoise1',
        PALETURQUOISE: 'paleturquoise',
        PALETURQUOISE2: 'paleturquoise2',
        DARKSLATEGRAY1: 'darkslategray1',
        AZURE3: 'azure3',
        LIGHTCYAN3: 'lightcyan3',
        DARKSLATEGRAY2: 'darkslategray2',
        PALETURQUOISE3: 'paleturquoise3',
        DARKSLATEGRAY3: 'darkslategray3',
        AZURE4: 'azure4',
        LIGHTCYAN4: 'lightcyan4',
        AQUA: 'aqua',
        CYAN: 'cyan',
        CYAN1: 'cyan1',
        PALETURQUOISE4: 'paleturquoise4',
        CYAN2: 'cyan2',
        DARKSLATEGRAY4: 'darkslategray4',
        CYAN3: 'cyan3',
        CYAN4: 'cyan4',
        DARKCYAN: 'darkcyan',
        TEAL: 'teal',
        DARKSLATEGRAY: 'darkslategray',
        DARKSLATEGREY: 'darkslategrey',
        MEDIUMTURQUOISE: 'mediumturquoise',
        LIGHTSEAGREEN: 'lightseagreen',
        TURQUOISE: 'turquoise',
        AQUAMARINE4: 'aquamarine4',
        AQUAMARINE: 'aquamarine',
        AQUAMARINE1: 'aquamarine1',
        AQUAMARINE2: 'aquamarine2',
        AQUAMARINE3: 'aquamarine3',
        MEDIUMAQUAMARINE: 'mediumaquamarine',
        MEDIUMSPRINGGREEN: 'mediumspringgreen',
        MINTCREAM: 'mintcream',
        SPRINGGREEN: 'springgreen',
        SPRINGGREEN1: 'springgreen1',
        SPRINGGREEN2: 'springgreen2',
        SPRINGGREEN3: 'springgreen3',
        SPRINGGREEN4: 'springgreen4',
        MEDIUMSEAGREEN: 'mediumseagreen',
        SEAGREEN: 'seagreen',
        SEAGREEN3: 'seagreen3',
        SEAGREEN1: 'seagreen1',
        SEAGREEN4: 'seagreen4',
        SEAGREEN2: 'seagreen2',
        MEDIUMFORESTGREEN: 'mediumforestgreen',
        HONEYDEW: 'honeydew',
        HONEYDEW1: 'honeydew1',
        HONEYDEW2: 'honeydew2',
        DARKSEAGREEN1: 'darkseagreen1',
        DARKSEAGREEN2: 'darkseagreen2',
        PALEGREEN1: 'palegreen1',
        PALEGREEN: 'palegreen',
        HONEYDEW3: 'honeydew3',
        LIGHTGREEN: 'lightgreen',
        PALEGREEN2: 'palegreen2',
        DARKSEAGREEN3: 'darkseagreen3',
        DARKSEAGREEN: 'darkseagreen',
        PALEGREEN3: 'palegreen3',
        HONEYDEW4: 'honeydew4',
        GREEN1: 'green1',
        LIME: 'lime',
        LIMEGREEN: 'limegreen',
        DARKSEAGREEN4: 'darkseagreen4',
        GREEN2: 'green2',
        PALEGREEN4: 'palegreen4',
        GREEN3: 'green3',
        FORESTGREEN: 'forestgreen',
        GREEN4: 'green4',
        GREEN: 'green',
        DARKGREEN: 'darkgreen',
        LAWNGREEN: 'lawngreen',
        CHARTREUSE: 'chartreuse',
        CHARTREUSE1: 'chartreuse1',
        CHARTREUSE2: 'chartreuse2',
        CHARTREUSE3: 'chartreuse3',
        CHARTREUSE4: 'chartreuse4',
        GREENYELLOW: 'greenyellow',
        DARKOLIVEGREEN3: 'darkolivegreen3',
        DARKOLIVEGREEN1: 'darkolivegreen1',
        DARKOLIVEGREEN2: 'darkolivegreen2',
        DARKOLIVEGREEN4: 'darkolivegreen4',
        DARKOLIVEGREEN: 'darkolivegreen',
        OLIVEDRAB: 'olivedrab',
        OLIVEDRAB1: 'olivedrab1',
        OLIVEDRAB2: 'olivedrab2',
        OLIVEDRAB3: 'olivedrab3',
        YELLOWGREEN: 'yellowgreen',
        OLIVEDRAB4: 'olivedrab4',
        IVORY: 'ivory',
        IVORY1: 'ivory1',
        LIGHTYELLOW: 'lightyellow',
        LIGHTYELLOW1: 'lightyellow1',
        BEIGE: 'beige',
        IVORY2: 'ivory2',
        LIGHTGOLDENRODYELLOW: 'lightgoldenrodyellow',
        LIGHTYELLOW2: 'lightyellow2',
        IVORY3: 'ivory3',
        LIGHTYELLOW3: 'lightyellow3',
        IVORY4: 'ivory4',
        LIGHTYELLOW4: 'lightyellow4',
        YELLOW: 'yellow',
        YELLOW1: 'yellow1',
        YELLOW2: 'yellow2',
        YELLOW3: 'yellow3',
        YELLOW4: 'yellow4',
        OLIVE: 'olive',
        DARKKHAKI: 'darkkhaki',
        KHAKI2: 'khaki2',
        LEMONCHIFFON4: 'lemonchiffon4',
        KHAKI1: 'khaki1',
        KHAKI3: 'khaki3',
        KHAKI4: 'khaki4',
        PALEGOLDENROD: 'palegoldenrod',
        LEMONCHIFFON: 'lemonchiffon',
        LEMONCHIFFON1: 'lemonchiffon1',
        KHAKI: 'khaki',
        LEMONCHIFFON3: 'lemonchiffon3',
        LEMONCHIFFON2: 'lemonchiffon2',
        MEDIUMGOLDENROD: 'mediumgoldenrod',
        CORNSILK4: 'cornsilk4',
        GOLD: 'gold',
        GOLD1: 'gold1',
        GOLD2: 'gold2',
        GOLD3: 'gold3',
        GOLD4: 'gold4',
        LIGHTGOLDENROD: 'lightgoldenrod',
        LIGHTGOLDENROD4: 'lightgoldenrod4',
        LIGHTGOLDENROD1: 'lightgoldenrod1',
        LIGHTGOLDENROD3: 'lightgoldenrod3',
        LIGHTGOLDENROD2: 'lightgoldenrod2',
        CORNSILK3: 'cornsilk3',
        CORNSILK2: 'cornsilk2',
        CORNSILK: 'cornsilk',
        CORNSILK1: 'cornsilk1',
        GOLDENROD: 'goldenrod',
        GOLDENROD1: 'goldenrod1',
        GOLDENROD2: 'goldenrod2',
        GOLDENROD3: 'goldenrod3',
        GOLDENROD4: 'goldenrod4',
        DARKGOLDENROD: 'darkgoldenrod',
        DARKGOLDENROD1: 'darkgoldenrod1',
        DARKGOLDENROD2: 'darkgoldenrod2',
        DARKGOLDENROD3: 'darkgoldenrod3',
        DARKGOLDENROD4: 'darkgoldenrod4',
        FLORALWHITE: 'floralwhite',
        WHEAT2: 'wheat2',
        OLDLACE: 'oldlace',
        WHEAT: 'wheat',
        WHEAT1: 'wheat1',
        WHEAT3: 'wheat3',
        ORANGE: 'orange',
        ORANGE1: 'orange1',
        ORANGE2: 'orange2',
        ORANGE3: 'orange3',
        ORANGE4: 'orange4',
        WHEAT4: 'wheat4',
        MOCCASIN: 'moccasin',
        PAPAYAWHIP: 'papayawhip',
        NAVAJOWHITE3: 'navajowhite3',
        BLANCHEDALMOND: 'blanchedalmond',
        NAVAJOWHITE: 'navajowhite',
        NAVAJOWHITE1: 'navajowhite1',
        NAVAJOWHITE2: 'navajowhite2',
        NAVAJOWHITE4: 'navajowhite4',
        ANTIQUEWHITE4: 'antiquewhite4',
        ANTIQUEWHITE: 'antiquewhite',
        TAN: 'tan',
        BISQUE4: 'bisque4',
        BURLYWOOD: 'burlywood',
        ANTIQUEWHITE2: 'antiquewhite2',
        BURLYWOOD1: 'burlywood1',
        BURLYWOOD3: 'burlywood3',
        BURLYWOOD2: 'burlywood2',
        ANTIQUEWHITE1: 'antiquewhite1',
        BURLYWOOD4: 'burlywood4',
        ANTIQUEWHITE3: 'antiquewhite3',
        DARKORANGE: 'darkorange',
        BISQUE2: 'bisque2',
        BISQUE: 'bisque',
        BISQUE1: 'bisque1',
        BISQUE3: 'bisque3',
        DARKORANGE1: 'darkorange1',
        LINEN: 'linen',
        DARKORANGE2: 'darkorange2',
        DARKORANGE3: 'darkorange3',
        DARKORANGE4: 'darkorange4',
        PERU: 'peru',
        TAN1: 'tan1',
        TAN2: 'tan2',
        TAN3: 'tan3',
        TAN4: 'tan4',
        PEACHPUFF: 'peachpuff',
        PEACHPUFF1: 'peachpuff1',
        PEACHPUFF4: 'peachpuff4',
        PEACHPUFF2: 'peachpuff2',
        PEACHPUFF3: 'peachpuff3',
        SANDYBROWN: 'sandybrown',
        SEASHELL4: 'seashell4',
        SEASHELL2: 'seashell2',
        SEASHELL3: 'seashell3',
        CHOCOLATE: 'chocolate',
        CHOCOLATE1: 'chocolate1',
        CHOCOLATE2: 'chocolate2',
        CHOCOLATE3: 'chocolate3',
        CHOCOLATE4: 'chocolate4',
        SADDLEBROWN: 'saddlebrown',
        SEASHELL: 'seashell',
        SEASHELL1: 'seashell1',
        SIENNA4: 'sienna4',
        SIENNA: 'sienna',
        SIENNA1: 'sienna1',
        SIENNA2: 'sienna2',
        SIENNA3: 'sienna3',
        LIGHTSALMON3: 'lightsalmon3',
        LIGHTSALMON: 'lightsalmon',
        LIGHTSALMON1: 'lightsalmon1',
        LIGHTSALMON4: 'lightsalmon4',
        LIGHTSALMON2: 'lightsalmon2',
        CORAL: 'coral',
        ORANGERED: 'orangered',
        ORANGERED1: 'orangered1',
        ORANGERED2: 'orangered2',
        ORANGERED3: 'orangered3',
        ORANGERED4: 'orangered4',
        DARKSALMON: 'darksalmon',
        SALMON1: 'salmon1',
        SALMON2: 'salmon2',
        SALMON3: 'salmon3',
        SALMON4: 'salmon4',
        CORAL1: 'coral1',
        CORAL2: 'coral2',
        CORAL3: 'coral3',
        CORAL4: 'coral4',
        TOMATO4: 'tomato4',
        TOMATO: 'tomato',
        TOMATO1: 'tomato1',
        TOMATO2: 'tomato2',
        TOMATO3: 'tomato3',
        MISTYROSE4: 'mistyrose4',
        MISTYROSE2: 'mistyrose2',
        MISTYROSE: 'mistyrose',
        MISTYROSE1: 'mistyrose1',
        SALMON: 'salmon',
        MISTYROSE3: 'mistyrose3',
        WHITE: 'white',
        GRAY100: 'gray100',
        GREY100: 'grey100',
        GRAY99: 'gray99',
        GREY99: 'grey99',
        GRAY98: 'gray98',
        GREY98: 'grey98',
        GRAY97: 'gray97',
        GREY97: 'grey97',
        GRAY96: 'gray96',
        GREY96: 'grey96',
        WHITESMOKE: 'whitesmoke',
        GRAY95: 'gray95',
        GREY95: 'grey95',
        GRAY94: 'gray94',
        GREY94: 'grey94',
        GRAY93: 'gray93',
        GREY93: 'grey93',
        GRAY92: 'gray92',
        GREY92: 'grey92',
        GRAY91: 'gray91',
        GREY91: 'grey91',
        GRAY90: 'gray90',
        GREY90: 'grey90',
        GRAY89: 'gray89',
        GREY89: 'grey89',
        GRAY88: 'gray88',
        GREY88: 'grey88',
        GRAY87: 'gray87',
        GREY87: 'grey87',
        GAINSBORO: 'gainsboro',
        GRAY86: 'gray86',
        GREY86: 'grey86',
        GRAY85: 'gray85',
        GREY85: 'grey85',
        GRAY84: 'gray84',
        GREY84: 'grey84',
        GRAY83: 'gray83',
        GREY83: 'grey83',
        LIGHTGRAY: 'lightgray',
        LIGHTGREY: 'lightgrey',
        GRAY82: 'gray82',
        GREY82: 'grey82',
        GRAY81: 'gray81',
        GREY81: 'grey81',
        GRAY80: 'gray80',
        GREY80: 'grey80',
        GRAY79: 'gray79',
        GREY79: 'grey79',
        GRAY78: 'gray78',
        GREY78: 'grey78',
        GRAY77: 'gray77',
        GREY77: 'grey77',
        GRAY76: 'gray76',
        GREY76: 'grey76',
        SILVER: 'silver',
        GRAY75: 'gray75',
        GREY75: 'grey75',
        GRAY74: 'gray74',
        GREY74: 'grey74',
        GRAY73: 'gray73',
        GREY73: 'grey73',
        GRAY72: 'gray72',
        GREY72: 'grey72',
        GRAY71: 'gray71',
        GREY71: 'grey71',
        GRAY70: 'gray70',
        GREY70: 'grey70',
        GRAY69: 'gray69',
        GREY69: 'grey69',
        GRAY68: 'gray68',
        GREY68: 'grey68',
        GRAY67: 'gray67',
        GREY67: 'grey67',
        DARKGRAY: 'darkgray',
        DARKGREY: 'darkgrey',
        GRAY66: 'gray66',
        GREY66: 'grey66',
        GRAY65: 'gray65',
        GREY65: 'grey65',
        GRAY64: 'gray64',
        GREY64: 'grey64',
        GRAY63: 'gray63',
        GREY63: 'grey63',
        GRAY62: 'gray62',
        GREY62: 'grey62',
        GRAY61: 'gray61',
        GREY61: 'grey61',
        GRAY60: 'gray60',
        GREY60: 'grey60',
        GRAY59: 'gray59',
        GREY59: 'grey59',
        GRAY58: 'gray58',
        GREY58: 'grey58',
        GRAY57: 'gray57',
        GREY57: 'grey57',
        GRAY56: 'gray56',
        GREY56: 'grey56',
        GRAY55: 'gray55',
        GREY55: 'grey55',
        GRAY54: 'gray54',
        GREY54: 'grey54',
        GRAY53: 'gray53',
        GREY53: 'grey53',
        GRAY52: 'gray52',
        GREY52: 'grey52',
        GRAY51: 'gray51',
        GREY51: 'grey51',
        FRACTAL: 'fractal',
        GRAY50: 'gray50',
        GREY50: 'grey50',
        GRAY: 'gray',
        GREY: 'grey',
        GRAY49: 'gray49',
        GREY49: 'grey49',
        GRAY48: 'gray48',
        GREY48: 'grey48',
        GRAY47: 'gray47',
        GREY47: 'grey47',
        GRAY46: 'gray46',
        GREY46: 'grey46',
        GRAY45: 'gray45',
        GREY45: 'grey45',
        GRAY44: 'gray44',
        GREY44: 'grey44',
        GRAY43: 'gray43',
        GREY43: 'grey43',
        GRAY42: 'gray42',
        GREY42: 'grey42',
        DIMGRAY: 'dimgray',
        DIMGREY: 'dimgrey',
        GRAY41: 'gray41',
        GREY41: 'grey41',
        GRAY40: 'gray40',
        GREY40: 'grey40',
        GRAY39: 'gray39',
        GREY39: 'grey39',
        GRAY38: 'gray38',
        GREY38: 'grey38',
        GRAY37: 'gray37',
        GREY37: 'grey37',
        GRAY36: 'gray36',
        GREY36: 'grey36',
        GRAY35: 'gray35',
        GREY35: 'grey35',
        GRAY34: 'gray34',
        GREY34: 'grey34',
        GRAY33: 'gray33',
        GREY33: 'grey33',
        GRAY32: 'gray32',
        GREY32: 'grey32',
        GRAY31: 'gray31',
        GREY31: 'grey31',
        GRAY30: 'gray30',
        GREY30: 'grey30',
        GRAY29: 'gray29',
        GREY29: 'grey29',
        GRAY28: 'gray28',
        GREY28: 'grey28',
        GRAY27: 'gray27',
        GREY27: 'grey27',
        GRAY26: 'gray26',
        GREY26: 'grey26',
        GRAY25: 'gray25',
        GREY25: 'grey25',
        GRAY24: 'gray24',
        GREY24: 'grey24',
        GRAY23: 'gray23',
        GREY23: 'grey23',
        GRAY22: 'gray22',
        GREY22: 'grey22',
        GRAY21: 'gray21',
        GREY21: 'grey21',
        GRAY20: 'gray20',
        GREY20: 'grey20',
        GRAY19: 'gray19',
        GREY19: 'grey19',
        GRAY18: 'gray18',
        GREY18: 'grey18',
        GRAY17: 'gray17',
        GREY17: 'grey17',
        GRAY16: 'gray16',
        GREY16: 'grey16',
        GRAY15: 'gray15',
        GREY15: 'grey15',
        GRAY14: 'gray14',
        GREY14: 'grey14',
        GRAY13: 'gray13',
        GREY13: 'grey13',
        GRAY12: 'gray12',
        GREY12: 'grey12',
        GRAY11: 'gray11',
        GREY11: 'grey11',
        GRAY10: 'gray10',
        GREY10: 'grey10',
        GRAY9: 'gray9',
        GREY9: 'grey9',
        GRAY8: 'gray8',
        GREY8: 'grey8',
        GRAY7: 'gray7',
        GREY7: 'grey7',
        GRAY6: 'gray6',
        GREY6: 'grey6',
        GRAY5: 'gray5',
        GREY5: 'grey5',
        GRAY4: 'gray4',
        GREY4: 'grey4',
        GRAY3: 'gray3',
        GREY3: 'grey3',
        GRAY2: 'gray2',
        GREY2: 'grey2',
        GRAY1: 'gray1',
        GREY1: 'grey1',
        BLACK: 'black',
        GRAY0: 'gray0',
        GREY0: 'grey0',
        OPAQUE: 'opaque',
        NONE: 'none',
        TRANSPARENT: 'transparent'
    };

    /**
     * @description Defines the background color to use instead of transparent background areas or when resizing with padding.
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#setting_background_color|Setting background for images} | {@link https://cloudinary.com/documentation/video_effects_and_enhancements#background_color|Setting background for videos}
     *
     * @namespace Background
     * @memberOf Qualifiers
     */
    /**
     * @summary qualifier
     * @description Selects the predominant color while taking only the image border pixels into account.
     * @memberOf Qualifiers.Background
     * @return {BackgroundAutoBorderQualifier}
     */
    function border() {
        return new BackgroundAutoBorderQualifier();
    }
    /**
     * @summary qualifier
     * @description Automatically determines the color to use for padding, if needed when resizing an asset.
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#content_aware_padding|Content-aware padding}
     * @memberOf Qualifiers.Background
     * @return {Qualifiers.Background.BackgroundQualifier}
     */
    function auto$4() {
        return new BackgroundQualifier('auto');
    }
    /**
     * @summary qualifier
     * @description Applies a padding gradient fade effect using the predominant colors in the border of the image.
     * @memberOf Qualifiers.Background
     * @return {BackgroundBorderGradientQualifier}
     */
    function borderGradient() {
        return new BackgroundBorderGradientQualifier();
    }
    /**
     * @summary qualifier
     * @description Applies a padding gradient fade effect using the predominant colors in the image.
     * @memberOf Qualifiers.Background
     * @return {BackgroundPredominantGradientQualifier}
     */
    function predominantGradient() {
        return new BackgroundPredominantGradientQualifier();
    }
    /**
     * @summary qualifier
     * @description Selects the predominant color while taking all pixels in the image into account
     * @memberOf Qualifiers.Background
     * @return {BackgroundAutoPredominantQualifier}
     */
    function predominant() {
        return new BackgroundAutoPredominantQualifier();
    }
    /**
     * @summary qualifier
     * @description Selects the predominant color while taking all pixels in the image into account.
     * @memberOf Qualifiers.Background
     * @return {Qualifiers.Background.BackgroundQualifier}
     */
    function color(colorStr) {
        return new BackgroundQualifier(prepareColor(colorStr));
    }
    /**
     * @summary qualifier
     * @description Selects the predominant color while taking all pixels in the image into account.
     * @memberOf Qualifiers.Background
     * @return {BlurredBackgroundAction}
     */
    function blurred() {
        return new BlurredBackgroundAction$1();
    }
    /**
     * @summary qualifier
     * @description A qualifier that automatically fills the padded area using generative AI to extend the image seamlessly.
     * @memberOf Qualifiers.Background
     * @return {BackgroundGenerativeFillQualifier}
     */
    function generativeFill() {
        return new BackgroundGenerativeFillQualifier();
    }
    const Background = {
        auto: auto$4,
        border,
        borderGradient,
        predominantGradient,
        predominant,
        color,
        blurred,
        generativeFill
    };

    /**
     * @description Controls the audio sampling frequency.
     * @namespace AudioFrequency
     * @memberOf Qualifiers
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    /**
     * @summary qualifier
     * @description Preserves the original audio frequency of the video when used with vc_auto.
     * @memberOf Qualifiers.AudioFrequency
     */
    function ORIGINAL() {
        return 'iaf';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ192000() {
        return 192000;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ176400() {
        return 176400;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ96000() {
        return 96000;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ88200() {
        return 88200;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ48000() {
        return 48000;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ8000() {
        return 8000;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ11025() {
        return 11025;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ16000() {
        return 16000;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ22050() {
        return 22050;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ32000() {
        return 32000;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ37800() {
        return 37800;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ44056() {
        return 44056;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ44100() {
        return 44100;
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioFrequency
     */
    function FREQ47250() {
        return 47250;
    }
    const AudioFrequency = {
        FREQ8000,
        FREQ11025,
        FREQ16000,
        FREQ22050,
        FREQ32000,
        FREQ37800,
        FREQ44056,
        FREQ44100,
        FREQ47250,
        FREQ48000,
        FREQ88200,
        FREQ96000,
        FREQ176400,
        FREQ192000,
        ORIGINAL
    };

    /**
     * @description Contains functions to select an audio codec.
     * @memberOf Qualifiers
     * @namespace AudioCodec
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    /**
     * @summary qualifier
     * @description Removes the audio channel from the video, effectively muting it.
     * @memberOf Qualifiers.AudioCodec
     */
    function none() {
        return 'none';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioCodec
     */
    function aac() {
        return 'aac';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioCodec
     */
    function vorbis() {
        return 'vorbis';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioCodec
     */
    function mp3() {
        return 'mp3';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AudioCodec
     */
    function opus() {
        return 'opus';
    }
    const AudioCodec = {
        aac,
        mp3,
        opus,
        none,
        vorbis
    };

    /**
     * @description 1 by 1 aspect ration.
     * @memberOf Qualifiers.AspectRatio
     * @return {string}
     */
    function ar1X1() {
        return new AspectRatioQualifierValue('1:1');
    }
    /**
     * @summary qualifier
     * @description 5 by 4 aspect ration.
     * @memberOf Qualifiers.AspectRatio
     * @return {string}
     */
    function ar5X4() {
        return new AspectRatioQualifierValue('5:4');
    }
    /**
     * @summary qualifier
     * @description 4 by 3 aspect ration.
     * @memberOf Qualifiers.AspectRatio
     * @return {string}
     */
    function ar4X3() {
        return new AspectRatioQualifierValue('4:3');
    }
    /**
     * @summary qualifier
     * @description 3 by 2 aspect ration.
     * @memberOf Qualifiers.AspectRatio
     * @return {string}
     */
    function ar3X2() {
        return new AspectRatioQualifierValue('3:2');
    }
    /**
     * @summary qualifier
     * @description 16 by 9 aspect ration.
     * @memberOf Qualifiers.AspectRatio
     * @return {string}
     */
    function ar16X9() {
        return new AspectRatioQualifierValue('16:9');
    }
    /**
     * @summary qualifier
     * @description 3 by 1 aspect ration.
     * @memberOf Qualifiers.AspectRatio
     * @return {string}
     */
    function ar3X1() {
        return new AspectRatioQualifierValue('3:1');
    }
    /**
     * @summary qualifier
     * @description ignores aspect ratio.
     * @memberOf Qualifiers.AspectRatio
     * @return {IgnoreAspectRatioQualifier}
     */
    function ignoreInitialAspectRatio() {
        return ignoreInitialAspectRatio$1();
    }
    /**
     * @summary qualifier
     * @description A list of all most commonly used aspect ratios. including an ‘ignore aspect ratio’ option which direct the BE to not stick to the original aspect ratio.
     * This is used in the context of resize actions
     * @namespace AspectRatio
     * @memberOf Qualifiers
     * @see Visit {@link Actions.Resize|Resize} for an example
     */
    const AspectRatio = {
        ar1X1,
        ar5X4,
        ar3X1,
        ar3X2,
        ar4X3,
        ar16X9,
        ignoreInitialAspectRatio
    };

    /**
     * @description Contains methods to specify the type of artistic filter </br>
     * Learn more: {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#artistic_filter_effects|Artistic Filter}
     * @namespace ArtisticFilter
     * @memberOf Qualifiers
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function alDente() {
        return 'al_dente';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function athena() {
        return 'athena';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function audrey() {
        return 'audrey';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function aurora() {
        return 'aurora';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function daguerre() {
        return 'daguerre';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function eucalyptus() {
        return 'eucalyptus';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function fes() {
        return 'fes';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function frost() {
        return 'frost';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function hairspray() {
        return 'hairspray';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function hokusai() {
        return 'hokusai';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function incognito() {
        return 'incognito';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function linen() {
        return 'linen';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function peacock() {
        return 'peacock';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function primavera() {
        return 'primavera';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function quartz() {
        return 'quartz';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function redRock() {
        return 'red_rock';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function refresh() {
        return 'refresh';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function sizzle() {
        return 'sizzle';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function sonnet() {
        return 'sonnet';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function ukulele() {
        return 'ukulele';
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ArtisticFilter
     */
    function zorro() {
        return 'zorro';
    }
    const ArtisticFilter = {
        alDente,
        athena,
        audrey,
        aurora,
        daguerre,
        eucalyptus,
        hairspray,
        hokusai,
        peacock,
        primavera,
        quartz,
        incognito,
        redRock,
        sizzle,
        fes,
        linen,
        refresh,
        sonnet,
        ukulele,
        frost,
        zorro
    };

    /**
     * @memberOf Qualifiers.AnimatedFormat
     * @extends {SDK.QualifierValue}
     */
    class AnimatedFormatQualifierValue extends QualifierValue {
    }

    /**
     * @description Contains methods to specify the animated format
     * @namespace AnimatedFormat
     * @memberOf Qualifiers
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    /**
     * @description Automatically sets the animated format
     * @summary qualifier
     * @memberOf Qualifiers.AnimatedFormat
     * @return {Qualifiers.AnimatedFormatQualifierValue}
     */
    function auto$3() {
        return new AnimatedFormatQualifierValue('auto');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AnimatedFormat
     * @return {Qualifiers.AnimatedFormatQualifierValue}
     */
    function gif() {
        return new AnimatedFormatQualifierValue('gif');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AnimatedFormat
     * @return {Qualifiers.AnimatedFormatQualifierValue}
     */
    function webp() {
        return new AnimatedFormatQualifierValue('webp');
    }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.AnimatedFormat
     * @return {Qualifiers.AnimatedFormatQualifierValue}
     */
    function png() {
        return new AnimatedFormatQualifierValue('png');
    }
    const AnimatedFormat = { auto: auto$3, gif, webp, png };

    /**
     * @summary qualifier
     * @memberOf Qualifiers.ChromeSubSampling
     */
    function chroma444() { return 444; }
    /**
     * @summary qualifier
     * @memberOf Qualifiers.ChromeSubSampling
     */
    function chroma420() { return 420; }
    /**
     * @description Contains functions to select the chroma subsampling setting.
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/image_optimization#toggle_chroma_subsampling|Toggling chroma subsampling}
     * @memberOf Qualifiers
     * @namespace ChromeSubSampling
     * @see To be used in {@link Actions.Delivery|Delivery} action (Quality)
     * @see To be used in {@link Actions.Delivery.DeliveryQualityAction|Quality Action} class
     */
    const ChromaSubSampling = {
        chroma444,
        chroma420
    };

    /**
     * @description Contains functions to select the device pixel ratio.
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/resizing_and_cropping#set_device_pixel_ratio_dpr|Set Device Pixel Ratio}
     * @memberOf Qualifiers
     * @namespace DPR
     * @see Visit {@link Actions.Delivery.dpr|Delivery DPR} for an example
     */
    /**
     * @summary qualifier
     * @memberOf Qualifiers.DPR
     */
    function auto$2() {
        return 'auto';
    }
    const Dpr = {
        auto: auto$2
    };

    /**
     * @memberOf Qualifiers.Source
     * @extends {QualifierModel}
     * @description An abstract class extended by all Source objects
     */
    class BaseSource extends QualifierModel {
        /**
         * @description Utility function to encode an asset publicID in an overlay
         * @protected
         * @example
         * encodeAssetPublicID('foo/bar'); // -> foo:bar
         */
        encodeAssetPublicID(publicID) {
            return publicID.replace(/\//g, ':');
        }
        /**
         * @description
         * Apply a transformation on the image source of the layer
         * @param {SDK.ImageTransformation} t An image transformation to apply to the layer
         * @returns {this}
         */
        transformation(t) {
            this._qualifierModel.transformation = t.toJson();
            this._transformation = t;
            return this;
        }
        /**
         * @description Returns the Transformation of the source
         * @return {SDK.Transformation}
         */
        getTransformation() {
            return this._transformation;
        }
    }

    /**
     * @memberOf Qualifiers.Source
     * @extends {Qualifiers.Source.BaseSource}
     * @description Defines how to manipulate a video layer, is an instance of a {@link VideoTransformation|VideoTransformation}
     * <div class="panel panel-primary">
     *   <div class="panel-heading">Notice</div>
     *   <div class="panel-body">
     *     This class is used as a Qualifier for the asset.overlay() and asset.underlay() methods.</br>
     *     You can find regular images and videos transformations below:
     *   </div>
     *   <ul>
     *     <li>{@link SDK.ImageTransformation| Image Transformations}</li>
     *     <li>{@link SDK.VideoTransformation| Video Transformations}
     *   </ul>
     * </div>
     */
    class VideoSource extends BaseSource {
        constructor(publicID) {
            super();
            this._publicID = publicID;
            this._qualifierModel = {
                publicId: publicID,
                sourceType: 'video'
            };
        }
        /**
         * @description
         * Returns the opening string of the layer,
         * This method is used internally within {@link SDK.LayerAction|LayerAction}
         * @returns {string}
         */
        getOpenSourceString(layerType) {
            const encodedPublicID = this.encodeAssetPublicID(this._publicID);
            return `${layerType}_video:${encodedPublicID}`;
        }
        static fromJson(qualifierModel, transformationFromJson) {
            const { publicId, transformation } = qualifierModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [qualifierModel])
            // This allows the inheriting classes to determine the class to be created
            // @ts-ignore
            const result = new this(publicId);
            if (transformation) {
                result.transformation(transformationFromJson(transformation));
            }
            return result;
        }
    }

    /**
     * @memberOf Qualifiers.Source
     * @extends {Qualifiers.Source.BaseSource}
     * @description Defines how to manipulate an image layer
     * <div class="panel panel-warning">
     *   <div class="panel-heading">Notice</div>
     *   <div class="panel-body">
     *     This class is used as a Qualifier for the asset.overlay() and asset.underlay() methods.</br>
     *     You can find regular images and videos transformations below:
     *   </div>
     *   <ul>
     *     <li>{@link SDK.ImageTransformation| Image Transformations}</li>
     *     <li>{@link SDK.VideoTransformation| Video Transformations}
     *   </ul>
     * </div>
     */
    class ImageSource extends BaseSource {
        constructor(publicID) {
            super();
            this._publicID = publicID;
            this._qualifierModel = {
                publicId: publicID,
                sourceType: 'image'
            };
        }
        /**
         * @description
         * Returns the opening string of the layer,
         * This method is used internally within {@link SDK.LayerAction|LayerAction}
         * @returns {string}
         */
        getOpenSourceString(layerType) {
            const encodedPublicID = this.encodeAssetPublicID(this._publicID);
            if (this._format) {
                return `${layerType}_${encodedPublicID}.${this._format.toString()}`;
            }
            else {
                return `${layerType}_${encodedPublicID}`;
            }
        }
        /**
         * @description
         * Apply a format for the image source of the layer
         * @param {FormatQualifier} format A to apply to the layered image, see more {@link Qualifiers.Format|here}
         * @returns {this}
         */
        format(format) {
            this._format = format;
            return this;
        }
        toJson() {
            const result = super.toJson();
            if (result.publicId && this._format) {
                result.publicId = `${result.publicId}.${this._format.toString()}`;
            }
            return result;
        }
        static fromJson(qualifierModel, transformationFromJson) {
            const { publicId, transformation } = qualifierModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [qualifierModel])
            // This allows the inheriting classes to determine the class to be created
            // @ts-ignore
            const result = new this(publicId);
            if (transformation) {
                result.transformation(transformationFromJson(transformation));
            }
            return result;
        }
    }

    /**
     *
     * @description - Replace (,) and (/) in a string to its URL encoded equivalence
     * @param {string} str
     * @private
     */
    function serializeCloudinaryCharacters(str = '') {
        return str
            .replace(/,/g, '%2C')
            .replace(/\//g, '%2F');
    }

    /**
     * Validate that obj is an ISolidStrokeModel
     * @param obj
     */
    function isISolidStrokeModel(obj) {
        return typeof obj === 'object' && obj.width != null && obj.color != null;
    }

    /**
     * @summary qualifier
     * @description Specifies how to style your layered text, controls the font, font size, line spacing and more.
     * </br><b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
     * </br><b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
     * @see {@link Actions.Overlay| The overlay action}
     * @see {@link Actions.Underlay| The underlay action}
     * @memberOf Qualifiers
     */
    class TextStyle extends QualifierModel {
        /**
         * @param {string} fontFamily The font family
         * @param {number | string} fontSize The font size
         */
        constructor(fontFamily, fontSize) {
            super();
            if (!fontFamily || !fontSize) {
                throw `You must provide a fontFamily and fontSize to a TextStyle`;
            }
            this._qualifierModel.fontFamily = fontFamily;
            this._qualifierModel.fontSize = fontSize;
        }
        /**
         * @param {number} spacing The spacing between multiple lines in pixels.
         */
        lineSpacing(spacing) {
            this._qualifierModel.lineSpacing = spacing;
            return this;
        }
        /**
         * @param spacing The spacing between the letters, in pixels.
         */
        letterSpacing(spacing) {
            this._qualifierModel.letterSpacing = spacing;
            return this;
        }
        /**
         * The antialias setting to apply to the text. When this parameter is not specified, the default antialiasing for the subsystem and target device are applied.
         * @param {FontAntialiasType|string} antiAlias
         */
        fontAntialias(antiAlias) {
            this._qualifierModel.fontAntialias = antiAlias;
            return this;
        }
        /**
         * The name of any universally available font or a custom font, specified as the public ID of a raw, authenticated font in your account.
         * For details on custom fonts, see {@link https://cloudinary.com/documentation/layers#custom_fonts|Using custom fonts for text overlays}.
         * @param {string} fontFamilyName
         */
        fontFamily(fontFamilyName) {
            this._qualifierModel.fontFamily = fontFamilyName;
            return this;
        }
        /**
         * @param {number} fontSize The font size
         */
        fontSize(fontSize) {
            this._qualifierModel.fontSize = fontSize;
            return this;
        }
        /**
         * @param {FontWeightType|string} fontWeight The font weight
         */
        fontWeight(fontWeight) {
            this._qualifierModel.fontWeight = fontWeight;
            return this;
        }
        /**
         *
         * @param {string} fontStyle The font style.
         */
        fontStyle(fontStyle) {
            this._qualifierModel.fontStyle = fontStyle;
            return this;
        }
        /**
         * @param {string} fontHinting The outline hinting style to apply to the text. When this parameter is not specified, the default hint style for the font and target device are applied.
         */
        fontHinting(fontHinting) {
            this._qualifierModel.fontHinting = fontHinting;
            return this;
        }
        /**
         *
         * @param {TextDecorationType|string} textDecoration The font decoration type.
         */
        textDecoration(textDecoration) {
            this._qualifierModel.textDecoration = textDecoration;
            return this;
        }
        /**
         * @param {TextAlignmentType|string} textAlignment The text alignment
         */
        textAlignment(textAlignment) {
            this._qualifierModel.textAlignment = textAlignment;
            return this;
        }
        /**
         * @description Whether to include an outline stroke. Set the color and weight of the stroke
         */
        stroke(textStroke) {
            if (textStroke) {
                const strokeStyle = textStroke.split('_');
                this._qualifierModel.stroke = {
                    width: +(strokeStyle[1].replace('px', '')),
                    color: strokeStyle[strokeStyle.length - 1]
                };
            }
            else {
                this._qualifierModel.stroke = true;
            }
            return this;
        }
        toString() {
            const { stroke } = this._qualifierModel;
            let strokeStr = '';
            if (stroke) {
                strokeStr = isISolidStrokeModel(stroke) ? `stroke_${solid$1(stroke.width, stroke.color)}` : 'stroke';
            }
            return [
                `${serializeCloudinaryCharacters(this._qualifierModel.fontFamily)}_${this._qualifierModel.fontSize}`,
                this._qualifierModel.fontWeight !== normal$1() && this._qualifierModel.fontWeight,
                this._qualifierModel.fontStyle !== normal() && this._qualifierModel.fontStyle,
                this._qualifierModel.textDecoration !== normal$2() && this._qualifierModel.textDecoration,
                this._qualifierModel.textAlignment,
                strokeStr,
                this._qualifierModel.letterSpacing && `letter_spacing_${this._qualifierModel.letterSpacing}`,
                this._qualifierModel.lineSpacing && `line_spacing_${this._qualifierModel.lineSpacing}`,
                this._qualifierModel.fontAntialias && `antialias_${this._qualifierModel.fontAntialias}`,
                this._qualifierModel.fontHinting && `hinting_${this._qualifierModel.fontHinting}`
            ].filter((a) => a).join('_');
        }
    }

    /**
     * @memberOf Qualifiers.Source
     * @extends {Qualifiers.Source.BaseSource}
     * @description Defines the common interface for all text-based sources
     */
    class BaseTextSource extends BaseSource {
        constructor(text, textStyle) {
            super();
            this.type = 'text';
            this.text = text;
            this._textStyle = textStyle;
            this._qualifierModel.sourceType = 'text';
            this._qualifierModel.text = text;
            if (textStyle instanceof TextStyle) {
                this._qualifierModel.textStyle = textStyle.toJson();
            }
        }
        encodeText(text) {
            return serializeCloudinaryCharacters(text);
        }
        textColor(color) {
            this._textColor = color;
            this._qualifierModel.textColor = color;
            return this;
        }
        backgroundColor(bgColor) {
            this._backgroundColor = bgColor;
            this._qualifierModel.backgroundColor = bgColor;
            return this;
        }
        textFit(textFit) {
            this._textFit = textFit;
            return this;
        }
        /**
         * @description
         * Returns the opening string of the layer,
         * This method is used internally within {@link SDK.LayerAction|LayerAction}
         * @returns {string}
         */
        getOpenSourceString(layerType) {
            const layerParam = [
                this.type,
                this._textStyle && this._textStyle.toString(),
                this.encodeText(this.text)
            ].filter((a) => a).join(':');
            const tmpAction = new Action();
            tmpAction.addQualifier(new Qualifier(layerType, layerParam));
            this._textColor && tmpAction.addQualifier(new Qualifier('co', prepareColor(this._textColor)));
            this._backgroundColor && tmpAction.addQualifier(new Qualifier('b', prepareColor(this._backgroundColor)));
            this._textFit && tmpAction.addQualifier(this._textFit);
            return tmpAction.toString();
        }
    }

    /**
     * @memberOf Qualifiers.Source
     * @extends {Qualifiers.Source.SubtitlesSource}
     * @description Defines how to manipulate a Subtitles layer
     */
    class SubtitlesSource extends BaseTextSource {
        constructor(fileName) {
            super(fileName);
            this.type = 'subtitles'; // used within TextSource for l/u_subtitles:
            this._qualifierModel = {
                sourceType: 'subtitles',
                publicId: fileName
            };
        }
        /**
         * @description Set the textStyle for the subtitles layer
         * @param {TextStyle} textStyle
         */
        textStyle(textStyle) {
            this._textStyle = textStyle;
            this._qualifierModel.textStyle = textStyle.toJson();
            return this;
        }
        /**
         *
         * @description Used within getOpenSourceString of TextSource, this function overwrites the default encoding behaviour
         * Subtitle file names require a different encoding than texts
         * @param text
         * @example
         * encodeText('foo/bar'); // -> foo:bar
         */
        encodeText(text) {
            return text.replace(/\//g, ':');
        }
    }

    /**
     * @memberOf Qualifiers.Source
     * @extends {Qualifiers.Source.BaseSource}
     * @description Defines how to manipulate a Fetch layer
     * <div class="panel panel-warning">
     *   <div class="panel-heading">Notice</div>
     *   <div class="panel-body">
     *     This class is used as a Qualifier for the asset.overlay() and asset.underlay() methods.</br>
     *     You can find regular images and videos transformations below:
     *   </div>
      *   <ul>
     *     <li>{@link SDK.ImageTransformation| Image Transformations}</li>
     *     <li>{@link SDK.VideoTransformation| Video Transformations}</li>
     *   </ul>
     * </div>
     *
     * {@link https://cloudinary.com/documentation/fetch_remote_images|Learn more about fetching from a remote URL}
     */
    class FetchSource extends BaseSource {
        constructor(remoteURL) {
            super();
            this._qualifierModel = {
                sourceType: 'fetch',
                url: remoteURL
            };
            this._remoteURL = remoteURL;
        }
        /**
         * @description
         * Returns the opening string of the layer,
         * This method is used internally within {@link SDK.LayerAction|LayerAction}
         * @returns {string}
         */
        getOpenSourceString(layerType) {
            if (this._format) {
                return `${layerType}_fetch:${base64Encode$1(this._remoteURL)}.${this._format.toString()}`;
            }
            else {
                return `${layerType}_fetch:${base64Encode$1(this._remoteURL)}`;
            }
        }
        /**
         * @description
         * Apply a format for the image source of the layer
         * @param {FormatQualifier} format A to apply to the layered image, see more {@link Qualifiers.Format|here}
         * @returns {this}
         */
        format(format) {
            this._qualifierModel.format = format.toString();
            this._format = format;
            return this;
        }
        static fromJson(qualifierModel, transformationFromJson) {
            const { url, transformation, format } = qualifierModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [qualifierModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(url);
            if (transformation) {
                result.transformation(transformationFromJson(transformation));
            }
            if (format) {
                result.format(new FormatQualifier(format));
            }
            return result;
        }
    }

    /**
     * Create TextStyle from ITextStyleModel
     * @param textStyleModel
     */
    function createTextStyleFromModel(textStyleModel) {
        const { fontFamily, fontSize, fontWeight, fontStyle, fontAntialias, fontHinting, textDecoration, textAlignment, stroke, letterSpacing, lineSpacing, } = textStyleModel;
        const result = new TextStyle(fontFamily, fontSize);
        if (fontWeight) {
            result.fontWeight(fontWeight);
        }
        if (fontStyle) {
            result.fontStyle(fontStyle);
        }
        if (fontAntialias) {
            result.fontAntialias(fontAntialias);
        }
        if (fontHinting) {
            result.fontHinting(fontHinting);
        }
        if (textDecoration) {
            result.textDecoration(textDecoration);
        }
        if (textAlignment) {
            result.textAlignment(textAlignment);
        }
        if (stroke) {
            result.stroke();
            if (typeof stroke !== "boolean") {
                result.stroke(solid$1(stroke.width, stroke.color));
            }
        }
        if (letterSpacing) {
            result.letterSpacing(letterSpacing);
        }
        if (lineSpacing) {
            result.lineSpacing(lineSpacing);
        }
        return result;
    }

    /**
     * @memberOf Qualifiers.Source
     * @extends {Qualifiers.Source.BaseTextSource}
     * @description Defines how to manipulate a text layer
     */
    class TextSource extends BaseTextSource {
        constructor(fileName, textStyle) {
            /* istanbul ignore next */
            super(fileName, textStyle);
        }
        static fromJson(qualifierModel, transformationFromJson) {
            const { text, textStyle, textColor, backgroundColor, transformation } = qualifierModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [qualifierModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(text, textStyle ? createTextStyleFromModel(textStyle) : undefined);
            if (transformation) {
                result.transformation(transformationFromJson(transformation));
            }
            if (textColor) {
                result.textColor(textColor);
            }
            if (backgroundColor) {
                result.backgroundColor(backgroundColor);
            }
            return result;
        }
    }

    /**
     * @memberOf Qualifiers.Source
     * @extends {Qualifiers.Source.AudioSource}
     * @description Defines how to manipulate a Subtitles layer
     */
    class AudioSource extends BaseSource {
        constructor(publicId) {
            super();
            this._qualifierModel = {
                sourceType: 'audio',
                publicId
            };
        }
        /**
         * @description
         * Returns the opening string of the layer,
         * This method is used internally within {@link SDK.LayerAction|LayerAction}
         * @returns {string}
         */
        getOpenSourceString(layerType) {
            const encodedPublicID = this.encodeAssetPublicID(this._qualifierModel.publicId);
            return `${layerType}_audio:${encodedPublicID}`;
        }
        static fromJson(qualifierModel, transformationFromJson) {
            const { publicId, transformation } = qualifierModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [qualifierModel])
            // This allows the inheriting classes to determine the class to be created
            // @ts-ignore
            const result = new this(publicId);
            if (transformation) {
                result.transformation(transformationFromJson(transformation));
            }
            return result;
        }
    }

    /**
     * @description This namespace contains different sources that can be used in overlays and underlays
     * @memberOf Qualifiers
     * @namespace Source
     * @see {@link Actions.Overlay| The overlay action}
     * @see {@link Actions.Underlay| The underlay action}
     */
    /**
     * @summary qualifier
     * @description Returns an instance of an ImageSource
     * @memberOf Qualifiers.Source
     * @param {string} publicID The publicID of the image to be used as a layer
     * @return {Qualifiers.Source.ImageSource}
     */
    function image(publicID) {
        return new ImageSource(publicID);
    }
    /**
     * @summary qualifier
     * @description Returns an instance of a TextSource
     * @memberOf Qualifiers.Source
     * @param {string} text The text to display.
     * @param {TextStyle | string} textStyle The textStyle to use with the text in the layer
     * @return {Qualifiers.Source.TextSource}
     */
    function text(text, textStyle) {
        return new TextSource(text, textStyle);
    }
    /**
     * @summary qualifier
     * @description Returns an instance of a VideoSource
     * @memberOf Qualifiers.Source
     * @param {string} publicID The publicID of the video to be used as a layer
     * @return {Qualifiers.Source.VideoSource}
     */
    function video(publicID) {
        return new VideoSource(publicID);
    }
    /**
     * @summary qualifier
     * @description Returns an instance of a AudioSource
     * @memberOf Qualifiers.Source
     * @param {string} publicID The publicID of the audio to be used as a layer
     * @return {Qualifiers.Source.AudioSource}
     */
    function audio(publicID) {
        return new AudioSource(publicID);
    }
    /**
     * @summary qualifier
     * @description Returns an instance of an VideoSource
     * @memberOf Qualifiers.Source
     * @param {string} fileName The publicID of the video to be used as a layer
     * @return {Qualifiers.Source.VideoSource}
     */
    function subtitles(fileName) {
        return new SubtitlesSource(fileName);
    }
    /**
     * @summary qualifier
     * @description Returns an instance of a FetchSource
     * @memberOf Qualifiers.Source
     * @param {string} remoteURL The URL of the remote asset to fetch as a layer
     * @return {Qualifiers.Source.FetchSource}
     */
    function fetch(remoteURL) {
        return new FetchSource(remoteURL);
    }
    const Source = { image, text, video, subtitles, fetch, audio };

    /**
     * @description Defines how the background gradient fade effect is applied.
     * @memberOf Qualifiers
     * @namespace GradientFade
     */
    /**
     * @summary qualifier
     * @description Instructs the gradient fade to be applied symmetrically (to opposite edges of the image).
     * @memberOf Qualifiers.GradientFade
     * @return {string}
     */
    function symmetric() {
        return 'symmetric';
    }
    /**
     * @summary qualifier
     * @description Instructs the gradient fade to be applied symmetrically (to opposite edges of the image) including background padding.
     * @memberOf Qualifiers.GradientFade
     * @return {string}
     */
    function symmetricPad() {
        return 'symmetric_pad';
    }
    const GradientFade = {
        symmetric,
        symmetricPad
    };

    /**
     * Create BackgroundQualifier from IBlurredBackgroundModel
     * @param backgroundModel
     */
    function createBlurredBackground(backgroundModel) {
        const { brightness, intensity } = backgroundModel;
        const result = Background.blurred();
        result.brightness(brightness !== null && brightness !== void 0 ? brightness : DEFAULT_BRIGHTNESS);
        result.intensity(intensity !== null && intensity !== void 0 ? intensity : DEFAULT_INTENSITY);
        return result;
    }
    /**
     * Create a gradientBackground from given model
     * @param background
     * @param backgroundModel
     */
    function createGradientBackground(background, backgroundModel) {
        const { gradientColors, gradientDirection, contrast, palette } = backgroundModel;
        if (contrast) {
            background.contrast();
        }
        if (palette) {
            background.palette(...palette);
        }
        if (gradientColors) {
            background.gradientColors(+gradientColors);
        }
        if (gradientDirection) {
            background.gradientDirection(gradientDirection);
        }
        return background;
    }
    /**
     * Crete a background with contrast and palette from given model
     * @param background
     * @param backgroundModel
     */
    function createContrastPaletteBackground(background, backgroundModel) {
        const { contrast, palette } = backgroundModel;
        if (contrast) {
            background.contrast();
        }
        if (palette) {
            background.palette(...palette);
        }
        return background;
    }
    /**
     * Create a Generative Fill background from given model
     * @param background
     * @param backgroundModel
     */
    function createGenerativeFillBackground(background, backgroundModel) {
        const { prompt } = backgroundModel;
        if (prompt) {
            background.prompt(prompt);
        }
        return background;
    }
    /**
     * Create BackgroundQualifier from IBackgroundModel
     * @param backgroundModel
     */
    function createBackgroundFromModel(backgroundModel) {
        const { backgroundType } = backgroundModel;
        switch (backgroundType) {
            case 'auto':
                return auto$4();
            case 'blurred':
                return createBlurredBackground(backgroundModel);
            case 'border':
                return createContrastPaletteBackground(border(), backgroundModel);
            case 'borderGradient':
                return createGradientBackground(borderGradient(), backgroundModel);
            case 'predominant':
                return createContrastPaletteBackground(predominant(), backgroundModel);
            case 'predominantGradient':
                return createGradientBackground(predominantGradient(), backgroundModel);
            case 'generativeFill':
                return createGenerativeFillBackground(generativeFill(), backgroundModel);
            default:
                return color(backgroundModel.color);
        }
    }

    /**
     * @description Defines an advanced resize with padding.
     * @extends Actions.Resize.ResizeAdvancedAction
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizePadAction extends ResizeAdvancedAction {
        /**
         * @description Sets the background.
         * @param {Qualifiers.Background} backgroundQualifier Defines the background color to use instead of
         * transparent background areas or when resizing with padding.
         */
        background(backgroundQualifier) {
            this._actionModel.background = createBackgroundModel(backgroundQualifier);
            return this.addQualifier(backgroundQualifier);
        }
        /**
         * @description Horizontal position for custom-coordinates based padding.
         * @param {number} x The x position.
         */
        offsetX(x) {
            this._actionModel.x = x;
            return this.addQualifier(new Qualifier('x', x));
        }
        /**
         * @description Vertical position for custom-coordinates based padding
         * @param {number} y The y position.
         */
        offsetY(y) {
            this._actionModel.y = y;
            return this.addQualifier(new Qualifier('y', y));
        }
        static fromJson(actionModel) {
            const result = super.fromJson.apply(this, [actionModel]);
            actionModel.background && result.background(createBackgroundFromModel(actionModel.background));
            actionModel.x && result.offsetX(actionModel.x);
            actionModel.y && result.offsetY(actionModel.y);
            actionModel.zoom && result.zoom(actionModel.zoom);
            return result;
        }
    }

    /**
     * @description Defines a scaling resize action.
     * @extends Actions.Resize.ResizeSimpleAction
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizeScaleAction extends ResizeSimpleAction {
        /**
         * @description Changes the aspect ratio of an image while retaining all important content and avoiding unnatural
         * distortions.
         * @return {this}
         */
        liquidRescaling() {
            return this.addQualifier(new GravityQualifier('liquid'));
        }
    }

    /**
     * @description Defines a thumbnail resize action.
     * @extends Actions.Resize.ResizeAdvancedAction
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ThumbResizeAction extends ResizeAdvancedAction {
        /**
         * @description Controls how much of the original image surrounding the face to keep when using either the 'crop' or 'thumb' cropping modes with face detection.
         * @param {number | string} z The zoom factor. (Default: 1.0)
         */
        zoom(z) {
            this._actionModel.zoom = z;
            return this.addQualifier(new Qualifier('z', z));
        }
        static fromJson(actionModel) {
            const result = super.fromJson.apply(this, [actionModel]);
            actionModel.zoom && result.zoom(actionModel.zoom);
            return result;
        }
    }

    /**
     * @description Defines how to crop an asset
     * @extends Actions.Resize.ResizeAdvancedAction
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizeCropAction extends ResizeAdvancedAction {
        /**
         * @description Horizontal position for custom-coordinates based cropping.
         * @param {number} x The x position.
         */
        x(x) {
            this._actionModel.x = x;
            return this.addQualifier(new Qualifier('x', x));
        }
        /**
         * @description Vertical position for custom-coordinates based cropping
         * @param {number} y The y position.
         */
        y(y) {
            this._actionModel.y = y;
            return this.addQualifier(new Qualifier('y', y));
        }
        /**
         * @description Controls how much of the original image surrounding the face to keep when using either the 'crop' or 'thumb' cropping modes with face detection.
         * @param {number | string} z The zoom factor. (Default: 1.0)
         */
        zoom(z) {
            this._actionModel.zoom = z;
            return this.addQualifier(new Qualifier('z', z));
        }
        static fromJson(actionModel) {
            const result = super.fromJson.apply(this, [actionModel]);
            actionModel.x && result.x(actionModel.x);
            actionModel.y && result.y(actionModel.y);
            actionModel.zoom && result.zoom(actionModel.zoom);
            return result;
        }
    }

    /**
     * @description Defines how to crop-fill an asset
     * @extends Actions.Resize.ResizeAdvancedAction
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizeFillAction extends ResizeAdvancedAction {
        /**
         * @description Absolute X position when used with Gravity.xyCenter {@link Qualifiers.Gravity.GravityQualifier}}
         * @param {number} x The x position.
         */
        x(x) {
            this._actionModel.x = x;
            return this.addQualifier(new Qualifier('x', x));
        }
        /**
         * @description Absolute Y position when used with Gravity.xyCenter {@link Qualifiers.Gravity.GravityQualifier}}
         * @param {number} y The y position.
         */
        y(y) {
            this._actionModel.y = y;
            return this.addQualifier(new Qualifier('y', y));
        }
        static fromJson(actionModel) {
            const result = super.fromJson.apply(this, [actionModel]);
            actionModel.x && result.x(actionModel.x);
            actionModel.y && result.y(actionModel.y);
            return result;
        }
    }

    /**
     * @description Defines a limit fitting resize action.
     * @extends Actions.Resize.ResizeSimpleAction
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizeLimitFitAction extends ResizeSimpleAction {
    }

    /**
     * @description Defines how to crop-limit-fill an asset
     * @extends Actions.Resize.ResizeFillAction
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizeLimitFillAction extends ResizeFillAction {
    }

    /**
     * @description Defines an advanced resize with limit padding.
     * @extends Actions.Resize.ResizePadAction
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizeLimitPadAction extends ResizePadAction {
    }

    /**
     * @description Defines an advanced resize with minimum padding.
     * @extends Actions.Resize.ResizePadAction
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizeMinimumPadAction extends ResizePadAction {
    }

    /**
     * @description Tries to prevent a "bad crop" by first attempting to use the auto cropping mode, but adding some padding if the algorithm determines that more of the original image needs to be included in the final image.
     * @extends Actions.Resize.autoPad
     * @memberOf Actions.Resize
     * @see Visit {@link Actions.Resize| Resize} for examples
     */
    class ResizeAutoPadAction extends ResizeSimpleAction {
        constructor(cropType, cropWidth, cropHeight) {
            super(cropType, cropWidth, cropHeight);
            this.addQualifier(new Qualifier('g', 'auto'));
        }
        /**
         * @description Sets the background.
         * @param {Qualifiers.Background} backgroundQualifier Defines the background color to use instead of
         * transparent background areas or when resizing with padding.
         */
        background(backgroundQualifier) {
            this._actionModel.background = createBackgroundModel(backgroundQualifier);
            return this.addQualifier(backgroundQualifier);
        }
        gravity(gravity) {
            // Only `auto` gravity is allowed (and required) for `c_auto_pad` and it's already added automatically in the constructor.
            // Although, this method is needed to exist because it is being shown in autogenerated SDK code snippet.
            return this;
        }
        static fromJson(actionModel) {
            const result = super.fromJson.apply(this, [actionModel]);
            actionModel.background && result.background(createBackgroundFromModel(actionModel.background));
            return result;
        }
    }

    /**
     * @description Determines how to crop, scale, and/or zoom the delivered asset according to the requested dimensions.
     * @memberOf Actions
     * @namespace Resize
     * @see Learn more about Gravity and Focus {@link Qualifiers.Gravity| here }
     * @example
     * <caption> <h4>Scaling an image</h4> </caption>
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {scale, fit, pad, crop} from '@cloudinary/url-gen/actions/resize';
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     *
     * image.resize( scale(100, 100) );
     * // All resize actions have a similar interface.
     * // image.resize( fit(100, 100)) );
     * // image.resize( pad(100, 100)) );
     * // image.resize( crop(100, 100)) );
     * // However, Some actions have additional arguments exposed as builder methods.
     * // See the documentation for each method for more information
     *
     *
     * // Alternative syntax, using builder methods
     * image.resize(
     *  scale()
     *    .width(100)
     *    .height(100)
     * );
     * image.toString()
     *
     * @example
     * <caption> <h4>Cropping with automatic focus(Gravity)</h4> </caption>
     * import {Cloudinary} from "@cloudinary/url-gen";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     *
     * import {scale} from '@cloudinary/url-gen/actions/resize';
     * import {autoGravity} from '@cloudinary/url-gen/qualifiers/gravity';
     *
     * image.resize( crop(100, 100).gravity(autoGravity()) );
     *
     * // Alternative syntax, using builder methods
     * image.resize(
     *  scale()
     *    .width(100)
     *    .height(100)
     *    .gravity(autoGravity())
     * );
     * image.toString()
     */
    /**
     * @summary action
     * @description
     * Changes the size of the image exactly to the given width and height without necessarily retaining the original aspect ratio:<br/>
     * all original image parts are visible but might be stretched or shrunk.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ScaleAction}
     */
    function scale(width, height) {
        return new ResizeScaleAction('scale', width, height);
    }
    /**
     * @summary action
     * @description
     * Scales your image based on automatically calculated areas of interest within each specific photo.
     *
     * For details, see the Imagga Crop and Scale {@link  https://cloudinary.com/documentation/imagga_crop_and_scale_addon#smartly_scale_images|add-on documentation}.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizeSimpleAction}
     */
    function imaggaScale(width, height) {
        return new ResizeSimpleAction('imagga_scale', width, height);
    }
    /**
     * @summary action
     * @description
     * Crops your image based on automatically calculated areas of interest within each specific photo.
     *
     * For details, see the Imagga Crop and Scale {@link  https://cloudinary.com/documentation/imagga_crop_and_scale_addon#smartly_crop_images|add-on documentation}.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizeSimpleAction}
     */
    function imaggaCrop(width, height) {
        return new ResizeSimpleAction('imagga_crop', width, height);
    }
    /**
     * @summary action
     * @description Extracts a region of the given width and height out of the original image.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizeCropAction}
     */
    function crop(width, height) {
        return new ResizeCropAction('crop', width, height);
    }
    /**
     * @summary action
     * @description
     * Creates an image with the exact given width and height without distorting the image.<br/>
     * This option first scales up or down as much as needed to at least fill both of the given dimensions.<br/><br/>
     * If the requested aspect ratio is different than the original, cropping will occur on the dimension that exceeds the requested size after scaling.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizeFillAction}
     */
    function fill(width, height) {
        return new ResizeFillAction('fill', width, height);
    }
    /**
     * @summary action
     * @description
     * The image is resized so that it takes up as much space as possible within a bounding box defined by the given width and height parameters.</br>
     * The original aspect ratio is retained and all of the original image is visible.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizeSimpleAction}
     */
    function fit(width, height) {
        return new ResizeSimpleAction('fit', width, height);
    }
    /**
     * @summary action
     * @description
     * Resizes the asset to fill the given width and height while retaining the original aspect ratio.
     *
     * If the proportions of the original asset do not match the given width and height, padding is added to the asset
     * to reach the required size.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizePadAction}
     */
    function pad(width, height) {
        return new ResizePadAction('pad', width, height);
    }
    /**
     * @summary action
     * @description
     * Creates an asset with the exact given width and height without distorting the asset, but only if the original
     * asset is larger than the specified resolution limits.
     *
     * The asset is scaled down to fill the given width and height without distorting the asset, and then the dimension
     * that exceeds the request is cropped. If the original dimensions are both smaller than the requested size, it is
     * not resized at all.
     *
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizeLimitFillAction}
     */
    function limitFill(width, height) {
        return new ResizeLimitFillAction('lfill', width, height);
    }
    /**
     * @summary action
     * @description
     * Resizes the asset so that it takes up as much space as possible within a bounding box defined by the given
     * width and height parameters, but only if the original asset is larger than the given limit (width and height).
     *
     * The asset is scaled down, the original aspect ratio is retained and all of the original asset is visible.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizeSimpleAction}
     */
    function limitFit(width, height) {
        return new ResizeLimitFitAction('limit', width, height);
    }
    /**
     * @summary action
     * @description
     * Resizes the asset to fill the given width and height while retaining the original aspect ratio, but only if the
     * original asset is smaller than the given minimum (width and height).
     *
     * The asset is scaled up.  If the proportions of the original asset do not match the given width and height,
     * padding is added to the asset to reach the required size.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizePadAction}
     */
    function minimumPad(width, height) {
        return new ResizeMinimumPadAction('mpad', width, height);
    }
    /**
     * @summary action
     * @description
     * Resizes the asset so that it takes up as much space as possible within a bounding box defined by the given
     * width and height parameters, but only if the original asset is smaller than the given minimum (width and height).
     *
     * The asset is scaled up, the original aspect ratio is retained and all of the original asset is visible.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizeSimpleAction}
     */
    function minimumFit(width, height) {
        return new ResizeSimpleAction('mfit', width, height);
    }
    /**
     * @summary action
     * @memberOf Actions.Resize
     * @description
     * Tries to prevent a "bad crop" by first attempting to use the fill mode, but adding padding if it is determined
     * that more of the original image needs to be included in the final image.
     *
     * Especially useful if the aspect ratio of the delivered image is considerably different from the original's
     * aspect ratio.
     *
     * Only supported in conjunction with Automatic cropping.
     *
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizePadAction}
     */
    function fillPad(width, height) {
        return new ResizePadAction('fill_pad', width, height);
    }
    /**
     * @summary action
     * @description
     * The thumb cropping mode is specifically used for creating image thumbnails from either face or custom coordinates,</br>
     * and must always be accompanied by the gravity parameter set to one of the face detection or custom values.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ThumbResizeAction}
     */
    function thumbnail(width, height) {
        return new ThumbResizeAction('thumb', width, height);
    }
    /**
     * @summary action
     * @description
     * Automatically determines the best crop based on the gravity and specified dimensions.
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ThumbResizeAction}
     */
    function auto$1(width, height) {
        return new ResizeAdvancedAction('auto', width, height);
    }
    /**
     * @summary action
     * @description
     * Resizes the asset to fill the given width and height while retaining the original aspect ratio, but only if the
     * original asset is larger than the given limit (width and height).
     *
     * The asset is scaled down.  If the proportions of the original asset do not match the given width and height,
     * padding is added to the asset to reach the required size.
     *
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizePadAction}
     */
    function limitPad(width, height) {
        return new ResizeLimitPadAction('lpad', width, height);
    }
    /**
     * @summary action
     * @description
     * Tries to prevent a "bad crop" by first attempting to use the auto cropping mode, but adding some padding
     * if the algorithm determines that more of the original image needs to be included in the final image.
     *
     * @memberOf Actions.Resize
     * @param {number|string} width The required width of a transformed asset.
     * @param {number|string} height The required height of a transformed asset.
     * @return {Actions.Resize.ResizeAutoPadAction}
     */
    function autoPad(width, height) {
        return new ResizeAutoPadAction('auto_pad', width, height);
    }
    const Resize = {
        imaggaScale,
        imaggaCrop,
        crop,
        fill,
        scale,
        minimumPad,
        fit,
        pad,
        limitFit,
        thumbnail,
        limitFill,
        minimumFit,
        limitPad,
        fillPad,
        auto: auto$1,
        autoPad
    };

    /**
     * @description A class to round one or more corners of an image or video.
     * @extends SDK.Action
     * @memberOf Actions.RoundCorners
     * @see Visit {@link Actions.RoundCorners|RoundCorners} for an example
     */
    class RoundCornersAction extends Action {
        constructor() {
            super();
            this._actionModel = {};
            this._actionModel.actionType = 'roundCorners';
        }
        /**
         * @param {number} a
         * @param {number} b
         * @param {number} c
         * @param {number} d
         * @return {RoundCornersAction}
         */
        radius(a, b, c, d) {
            const qualifierValue = new QualifierValue();
            // In case a === 0, check typeof
            a !== undefined && qualifierValue.addValue(a);
            b !== undefined && qualifierValue.addValue(b);
            c !== undefined && qualifierValue.addValue(c);
            d !== undefined && qualifierValue.addValue(d);
            const definedRadiuses = [a, b, c, d].filter((r) => r !== undefined);
            this._radius = definedRadiuses;
            this._actionModel.radius = definedRadiuses;
            this.addQualifier(new Qualifier('r').addValue(qualifierValue));
            return this;
        }
        /**
         * @description Applies maximum rounding to the corners of the asset. An asset with square dimensions becomes a circle.
         */
        max() {
            this._radius = 'max';
            this._actionModel.radius = 'max';
            return this.addQualifier(new Qualifier('r', 'max'));
        }
        getRadius() {
            return this._radius;
        }
        static fromJson(actionModel) {
            const { radius } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this();
            if (Array.isArray(radius)) {
                result.radius(radius[0], radius[1], radius[2], radius[3]);
            }
            if (radius === 'max') {
                result.max();
            }
            return result;
        }
    }
    var RoundCornersAction$1 = RoundCornersAction;

    /**
     * @description Adds a solid border around an image or video.
     *
     *  <b>Learn more:</b>
     * {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#borders|Adding image borders}
     * @memberOf Actions
     * @namespace Border
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {solid} from "@cloudinary/url-gen/actions/border";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.border(
     *  solid(15, 'green'),
     *  // Or alternatively
     *  solid().width(15).color('green')
     * );
     *
     */
    /**
     * @memberOf Actions.Border
     * @see Actions.Border
     * @example
     * // Used through a builder function Border.solid(), and not by creating a new instance
     * import {Cloudinary} from "@cloudinary/url-gen";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.border(
     *  Border.solid(15, 'green'),
     *  // Or alternatively
     *  Border.solid().width(15).color('green')
     * );
     */
    class BorderAction extends Action {
        /**
         * @description Adds a border of the specified type around an image or video.
         * @param {'solid'} borderType The type of border (currently only 'solid' is supported). Use values in {@link Qualifiers.Border|Border Values}.
         * @param {string} color The color of the border.
         * @param {number} borderWidth The width in pixels.
         */
        constructor(borderType, color, borderWidth) {
            super();
            this._actionModel = {};
            this.borderType = borderType;
            this.borderColor = prepareColor(color);
            this.borderWidth = borderWidth;
            this._actionModel = {
                color: prepareColor(color),
                width: borderWidth,
                actionType: 'border',
            };
        }
        /**
         * @description Sets the width of the border
         * @param {number | string} borderWidth The width in pixels.
         */
        width(borderWidth) {
            this.borderWidth = borderWidth;
            this._actionModel.width = borderWidth;
            return this;
        }
        /**
         * @description Sets the color of the border.
         * @param {string} borderColor The color of the border.
         */
        color(borderColor) {
            this.borderColor = prepareColor(borderColor);
            this._actionModel.color = prepareColor(borderColor);
            return this;
        }
        /**
         * @description Rounds the specified corners of an image.
         * @param {RoundCornersAction} roundCorners
         * @return {this}
         */
        roundCorners(roundCorners) {
            this._roundCorners = roundCorners;
            this._actionModel.radius = roundCorners.getRadius();
            return this;
        }
        /**
         * @description Sets the style of the border.
         * @param {number | string} width The width in pixels.
         * @param {string} color The color of the border, e.g 'green', 'yellow'.
         * @return {this}
         */
        solid(width, color) {
            this.borderType = 'solid';
            this.borderColor = prepareColor(color);
            this.borderWidth = width;
            this._actionModel.color = prepareColor(color);
            this._actionModel.width = width;
            return this;
        }
        prepareQualifiers() {
            const qualifierValue = new QualifierValue([`${this.borderWidth}px`, this.borderType, `${this.borderColor}`]).setDelimiter('_');
            this.addQualifier(new Qualifier('bo', qualifierValue));
            if (this._roundCorners) {
                this.addQualifier(this._roundCorners.qualifiers.get('r'));
            }
        }
        static fromJson(actionModel) {
            const { width, color, radius } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this('solid', color, width);
            if (radius) {
                const roundCornersAction = (() => {
                    if (radius === 'max') {
                        return new RoundCornersAction$1().max();
                    }
                    if (Array.isArray(radius)) {
                        return new RoundCornersAction$1().radius(...radius);
                    }
                    return undefined;
                })();
                if (roundCornersAction) {
                    result.roundCorners(roundCornersAction);
                }
            }
            return result;
        }
    }
    /**
     * @summary action
     * @memberOf Actions.Border
     * @description Sets the style of the border.
     * @param {number | string} width The width in pixels.
     * @param {string} color The color of the border, e.g 'green', 'yellow'.
     * @return {Actions.Border.BorderAction}
     */
    function solid(width, color) {
        return new BorderAction('solid', color, width);
    }
    /**
     * @summary action
     * @memberOf Actions.Border
     * @description Sets the radius of the border.
     * @param {Actions.RoundCorners.RoundCornersAction} roundCorners RoundCorners action.
     * @return {Actions.Border.BorderAction}
     */
    function roundCorners(roundCorners) {
        const borderActionInstance = new BorderAction('solid', 'transparent', 0);
        borderActionInstance.roundCorners(roundCorners);
        return borderActionInstance;
    }
    const Border = {
        solid,
        roundCorners,
    };

    /**
     * @description Round one or more corners of an image or video.
     *
     * <b>Learn more:</b>
     * {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#rounding_corners_and_creating_circular_images|Rounded images}
     * {@link https://cloudinary.com/documentation/video_effects_and_enhancements#rounding|Rounded videos}
     * @memberOf Actions
     * @namespace RoundCorners
     * @example
     * <caption>Round corners by a radius</caption>
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {byRadius, max} from "@cloudinary/url-gen/actions/roundCorners";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * // By a radius
     * image.roundCorners(byRadius(10));
     * // Or just the maximum possible
     * image.roundCorners(max());
     * image.toString();
     */
    /**
     * @summary action
     * @description Generates an asset with a circular crop using the 'max' radius value.
     * @memberOf Actions.RoundCorners
     * @return {Actions.RoundCorners.RoundCornersAction}
     */
    function max() {
        return new RoundCornersAction$1().max();
    }
    /**
     * @summary action
     * @description Rounds the specified corners of an image or a video by specifying 1-4 pixel values as follows:
     *
     * * 1 value: All four corners are rounded equally according to the specified value.
     * * 2 values: 1st value => top-left & bottom-right. 2nd value => top-right & bottom-left.
     * * 3 values: 1st value => top-left. 2nd value => top-right & bottom-left. 3rd value => bottom-right.
     * * 4 values: Each corner specified separately, in clockwise order, starting with top-left.
     *
     * @param {number} a
     * @param {number} b
     * @param {number} c
     * @param {number} d
     * @memberOf Actions.RoundCorners
     * @return {Actions.RoundCorners.RoundCornersAction}
     */
    function byRadius(a, b, c, d) {
        return new RoundCornersAction$1().radius(a, b, c, d);
    }
    const RoundCorners = { byRadius, max };

    /**
     * @description The Action class of the blur Builder.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class BlurAction extends Action {
        constructor(strength) {
            super();
            this._actionModel = {};
            this._strength = strength;
            this._actionModel.actionType = 'blur';
            this._actionModel.strength = strength;
        }
        /**
         * @description Specifies the region to blur.
         * @param {NamedRegion} blurRegion
         */
        region(blurRegion) {
            this._region = blurRegion;
            this._actionModel.region = blurRegion.toJson();
            return this;
        }
        /**
         * @description Sets the strength of the blur effect.
         * @param {number | string} strength
         */
        strength(strength) {
            this._strength = strength;
            this._actionModel.strength = strength;
            return this;
        }
        prepareQualifiers() {
            /*
             * Blur with region is a unique object in this codebase.
             * On top of Blur being an Action with Qualifiers,
             * it also accepts a Qualifier called Region.
             *
             * This Qualifier is in itself composite of qualifiers (such as height, or width).
             * The existence of Region changes the output of Blur in non traditional ways
             * which forced this relatively ad-hoc implementation.
             *
             * Aside from all of that, all of the Qualifiers in the component should be alphabetized
             * This happens naturally in the Action class,
             * however since we're dealing with two levels of qualifiers (Blur and Region),
             * these need to be merged.
             *
             * This function will merge the Region qualifiers with Blur
             * and add all needed implicit qualifiers (like g_ocr_text).
             * We're not using the full Gravity Qualifier here to prevent the code import for such a simplistic case
             */
            const strength = this._strength ? `:${this._strength}` : '';
            if ('_region' in this) {
                const qualifiers = this._region.qualifiers;
                // Copy qualifiers from the region "action" to the blur action
                qualifiers.forEach((q) => this.addQualifier(q));
                if (this._region.regionType === 'custom') {
                    this.addQualifier(new Qualifier('e', `blur_region${strength}`));
                }
                if (this._region.regionType === 'ocr_text') {
                    this.addQualifier(new Qualifier('e', `blur_region${strength}`));
                    this.addQualifier(new Qualifier('g', `ocr_text`));
                }
                if (this._region.regionType === 'faces') {
                    this.addQualifier(new Qualifier('e', `blur_faces${strength}`));
                }
            }
            else {
                this.addQualifier(new Qualifier('e', `blur${strength}`));
            }
        }
        static fromJson(actionModel) {
            const { strength, region } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(strength);
            strength && result.strength(strength);
            if (region && region.regionType === 'faces') {
                result.region(faces());
            }
            if (region && region.regionType === 'ocr_text') {
                result.region(ocr());
            }
            if (region && region.regionType === 'custom') {
                result.region(CustomRegion.fromJson(region));
            }
            return result;
        }
    }

    /**
     * @description Changes the speed of the video playback using the rate() method
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class AccelerationEffectAction extends Action {
        constructor(rate) {
            super();
            this._actionModel = { actionType: 'accelerate' };
            rate && this.rate(rate);
        }
        rate(rate) {
            this._actionModel.rate = rate;
            this._rate = rate;
            return this;
        }
        prepareQualifiers() {
            const qualifierValue = new QualifierValue(['accelerate', this._rate]).setDelimiter(':');
            this.addQualifier(new Qualifier('e', qualifierValue));
            return this;
        }
        static fromJson(actionModel) {
            const { rate } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            // @ts-ignore
            const result = new this();
            rate && result.rate(rate);
            return result;
        }
    }

    /**
     * @description A class that defines a simple effect of the type e_{effectName}
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class SimpleEffectAction extends Action {
        constructor(effectType, level) {
            super();
            this._actionModel = {};
            this._actionModel.actionType = EFFECT_MODE_TO_ACTION_TYPE_MAP[effectType] || effectType;
            const qualifierEffect = this.createEffectQualifier(effectType, level);
            this.addQualifier(qualifierEffect);
        }
        createEffectQualifier(effectType, level) {
            let qualifierValue;
            if (level) {
                qualifierValue = new QualifierValue([effectType, `${level}`]).setDelimiter(':');
            }
            else {
                qualifierValue = new QualifierValue(effectType);
            }
            return new Qualifier('e', qualifierValue);
        }
        static fromJson(actionModel) {
            const { actionType, level, strength } = actionModel;
            const effectType = ACTION_TYPE_TO_EFFECT_MODE_MAP[actionType] || actionType;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            // @ts-ignore
            const result = new this(effectType, level ? level : strength);
            return result;
        }
    }

    /**
     * @description A base class for effects with a level, the extending class needs to implement a method that calls setLevel()
     * @extends {Actions.Effect.SimpleEffectAction}
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class LeveledEffectAction extends SimpleEffectAction {
        constructor(effectType, level) {
            super(effectType, level);
            this.LEVEL_NAME = 'level';
            this._actionModel = {};
            this.effectType = effectType;
            this._actionModel.actionType = EFFECT_MODE_TO_ACTION_TYPE_MAP[effectType] || effectType;
            if (level) {
                this.setLevel(level);
            }
        }
        /**
         *
         * @description Sets the effect level for the action
         * @param {string | number} level - The strength of the effect
         * @protected
         */
        setLevel(level) {
            this._actionModel[this.LEVEL_NAME] = level;
            const qualifierEffect = this.createEffectQualifier(this.effectType, level);
            this.addQualifier(qualifierEffect);
            return this;
        }
    }

    /**
     * @description Delivers a video or animated GIF that contains additional loops of the video/GIF.
     * @extends LeveledEffectAction
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class LoopEffectAction extends LeveledEffectAction {
        additionalIterations(value) {
            this._actionModel.iterations = value;
            const qualifierEffect = this.createEffectQualifier(this.effectType, value);
            this.addQualifier(qualifierEffect);
            return this;
        }
        static fromJson(actionModel) {
            const { actionType, iterations } = (actionModel);
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(actionType, iterations);
            return result;
        }
    }

    /**
     * @description Applies a cartoon effect to an image.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class CartoonifyEffect extends Action {
        constructor(effectName, strength) {
            // We don't pass level in the constructor, we'll build it in the prepareParam
            super();
            this._actionModel = {};
            this.cartoonifyStrength = strength;
            this.effectName = effectName;
            this._actionModel.actionType = effectName;
        }
        /**
         * @description Sets the thickness of the lines.
         * @param {number} lineStrength The thickness of the lines. (Range: 0 to 100, Server default: 50)
         * @return {this}
         */
        lineStrength(lineStrength) {
            this.cartoonifyStrength = lineStrength;
            this._actionModel.lineStrength = lineStrength;
            return this;
        }
        /**
         * @description Achieves a black and white cartoon effect.
         * @return {this}
         */
        blackwhite() {
            this._actionModel.blackAndWhite = true;
            this.colorReduction = 'bw';
            return this;
        }
        /**
         * @description
         * Sets the decrease in the number of colors and corresponding saturation boost of the remaining colors. <br/>
         * Higher reduction values result in a less realistic look.
         * @param {number } level The decrease in the number of colors and corresponding saturation boost of the remaining colors. (Range: 0 to 100, Server default: automatically adjusts according to the line_strength value). Set to 'bw' for a black and white cartoon effect.
         * @return {this}
         */
        colorReductionLevel(level) {
            this._actionModel.colorReductionLevel = level;
            this.colorReduction = level;
            return this;
        }
        prepareQualifiers() {
            this.addQualifier(new Qualifier('e', new QualifierValue([this.effectName, this.cartoonifyStrength, this.colorReduction])));
            return;
        }
        static fromJson(actionModel) {
            const { actionType, lineStrength, blackAndWhite, colorReductionLevel } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(actionType, lineStrength);
            blackAndWhite && result.blackwhite();
            colorReductionLevel && result.colorReductionLevel(colorReductionLevel);
            lineStrength && result.lineStrength(lineStrength);
            return result;
        }
    }

    /**
     * @description Adds an outline to a transparent image. For examples, see the Image Transformations guide.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class EffectOutline extends Action {
        constructor() {
            super();
            this._actionModel = {};
            this._actionModel.actionType = 'outline';
        }
        /**
         * @description
         * How to apply the outline effect which can be one of the following values:
         * inner, inner_fill, outer, fill.
         * @param {OutlineModeType|string} mode  The type of outline effect. Use the constants defined in Outline.
         * @return {this}
         */
        mode(mode) {
            this._actionModel.mode = mode;
            this._mode = mode;
            return this;
        }
        /**
         * The thickness of the outline in pixels. (Range: 1 to 100, Server default: 5)
         * @param {number} width
         * @return {this}
         */
        width(width) {
            this._actionModel.width = width;
            this._width = width;
            return this;
        }
        /**
         * @description
         * The level of blur of the outline.
         * Range: 0 to 2000, Server default: 0
         * @param {number | string} lvl
         * @return {this}
         */
        blurLevel(lvl) {
            this._actionModel.blurLevel = lvl;
            this._blurLevel = lvl;
            return this;
        }
        /**
         * @param {string | Qualifiers.Color} color One of the SDK Color values, string, or rgba: '#fff'
         * @return {this}
         */
        color(color) {
            this._actionModel.color = color;
            return this.addQualifier(new Qualifier('co', prepareColor(color)));
        }
        prepareQualifiers() {
            this.addQualifier(new Qualifier('e', new QualifierValue(['outline', this._mode, this._width, this._blurLevel]).setDelimiter(':')));
        }
        static fromJson(actionModel) {
            const { actionType, mode, color, blurLevel, width } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this();
            mode && result.mode(mode);
            color && result.color(color);
            blurLevel && result.blurLevel(blurLevel);
            width && result.width(width);
            return result;
        }
    }

    /**
     * @description Makes the background of the image transparent (or solid white for formats that do not support transparency).
     * @extends LeveledEffectAction
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class MakeTransparentEffectAction extends LeveledEffectAction {
        constructor() {
            super(...arguments);
            this._actionModel = { actionType: 'makeTransparent' };
        }
        /**
         * @description Sets the tolerance used to accommodate variance in the background color.
         * @param {number | string} value The tolerance used to accommodate variance in the background color. (Range: 0 to 100, Server default: 10)
         */
        tolerance(value) {
            this._actionModel.tolerance = value;
            const qualifierEffect = this.createEffectQualifier(this.effectType, value);
            this.addQualifier(qualifierEffect);
            return this;
        }
        /**
         * @description Sets the color to make transparent.
         * @param {string} color The HTML name of the color (red, green, etc.) or RGB hex code.
         * @return {this}
         */
        colorToReplace(color) {
            this._actionModel.color = color;
            return this.addQualifier(new Qualifier('co', new QualifierValue(prepareColor(color))));
        }
        static fromJson(actionModel) {
            const { actionType, tolerance, color } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(ACTION_TYPE_TO_EFFECT_MODE_MAP[actionType], tolerance);
            tolerance && result.tolerance(tolerance);
            color && result.colorToReplace(color);
            return result;
        }
    }

    /**
     * @description Vectorizes the image.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class VectorizeEffectAction extends Action {
        constructor() {
            super();
            this._actionModel = {};
            this._actionModel.actionType = 'vectorize';
        }
        /**
         * @description The number of colors. (Range: 2 to 30, Server default: 10)
         * @param {number | string} num
         * @return {this}
         */
        numOfColors(num) {
            this._actionModel.numOfColors = num;
            this._numOfColors = num;
            return this;
        }
        /**
         * @description The level of detail. Specify either a percentage of the original image (Range: 0.0 to 1.0) or an absolute number of pixels (Range: 0 to 1000). (Server default: 300)
         * @param {number | string} num
         * @return {this}
         */
        detailsLevel(num) {
            this._actionModel.detailLevel = num;
            this._detailsLevel = num;
            return this;
        }
        /**
         * @description The size of speckles to suppress. Specify either a percentage of the original image (Range: 0.0 to 1.0) or an absolute number of pixels (Range: 0 to 100, Server default: 2)
         * @param {number | string} num
         * @return {this}
         */
        despeckleLevel(num) {
            this._actionModel.despeckleLevel = num;
            this._despeckleLevel = num;
            return this;
        }
        /**
         * @description The corner threshold. Specify 100 for no smoothing (polygon corners), 0 for completely smooth corners. (Range: 0 to 100, Default: 25)
         * @param {number | string} num
         * @return {this}
         */
        cornersLevel(num) {
            this._actionModel.cornersLevel = num;
            this._cornersLevel = num;
            return this;
        }
        /**
         * @description The optimization value. Specify 100 for least optimization and the largest file. (Range: 0 to 100, Server default: 100).
         * @param {number} num
         * @return {this}
         */
        paths(num) {
            this._actionModel.paths = num;
            this._paths = num;
            return this;
        }
        prepareQualifiers() {
            let str = 'vectorize';
            if (this._numOfColors) {
                str += `:${new QualifierValue(`colors:${this._numOfColors}`).toString()}`;
            }
            if (this._detailsLevel) {
                str += `:${new QualifierValue(`detail:${this._detailsLevel}`).toString()}`;
            }
            if (this._despeckleLevel) {
                str += `:${new QualifierValue(`despeckle:${this._despeckleLevel}`).toString()}`;
            }
            if (this._paths) {
                str += `:${new QualifierValue(`paths:${this._paths}`).toString()}`;
            }
            if (this._cornersLevel) {
                str += `:${new QualifierValue(`corners:${this._cornersLevel}`).toString()}`;
            }
            this.addQualifier(new Qualifier('e', str));
        }
        static fromJson(actionModel) {
            const { actionType, paths, cornersLevel, despeckleLevel, detailLevel, numOfColors } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this();
            paths && result.paths(paths);
            cornersLevel && result.cornersLevel(cornersLevel);
            despeckleLevel && result.despeckleLevel(despeckleLevel);
            detailLevel && result.detailsLevel(detailLevel);
            numOfColors && result.numOfColors(numOfColors);
            return result;
        }
    }

    /**
     * @description Simulates the way an image would appear to someone with the specified color blind condition
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class SimulateColorBlindEffectAction extends Action {
        constructor() {
            super();
            this._actionModel = {};
            this._actionModel.actionType = 'simulateColorblind';
            this.addQualifier(new Qualifier('e', `simulate_colorblind`));
        }
        setQualifier(val) {
            const strToAppend = `:${val}`;
            if (val) {
                this.addQualifier(new Qualifier('e', `simulate_colorblind${strToAppend}`));
            }
            return this;
        }
        /**
         * @description Sets the color blind condition to simulate.
         * @param {Qualifiers.simulateColorBlindValues | SimulateColorBlindType | string} cond
         * @return {this}
         */
        condition(cond) {
            this._actionModel.condition = cond;
            return this.setQualifier(cond);
        }
        static fromJson(actionModel) {
            const { actionType, condition } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this();
            condition && result.condition(condition);
            return result;
        }
    }

    /**
     * @description A class that provides a built in level() method that sets the level of the effect
     * @extends {Actions.Effect.LeveledEffectAction}
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class EffectActionWithLevel extends LeveledEffectAction {
        level(value) {
            this._actionModel.level = value;
            return this.setLevel(value);
        }
    }

    /**
     * @description Applies stripes to the image to help people with common color-blind conditions to differentiate between colors that are similar for them.
     *              You can replace colors using the xray() method.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class AssistColorBlindEffectAction extends Action {
        constructor() {
            super();
            this._actionModel = {};
            this._actionModel.actionType = 'assistColorblind';
            this.addQualifier(new Qualifier('e', new QualifierValue('assist_colorblind')));
        }
        /**
         * @description Replaces problematic colors with colors that are easier to differentiate.
         * @return {this}
         */
        xray() {
            this._actionModel.type = 'xray';
            return this.addQualifier(new Qualifier('e', new QualifierValue(['assist_colorblind', 'xray']).setDelimiter(':')));
        }
        /**
         * @description Applies stripes of the specified intensity to help people with common color blind conditions to differentiate between colors that are similar for them.
         * @param {number | string} strength The intensity of the stripes. (Range: 1 to 100, Server default: 10)
         * @return {this}
         */
        stripesStrength(strength) {
            this._actionModel.type = 'stripes';
            this._actionModel.stripesStrength = strength;
            return this.addQualifier(new Qualifier('e', new QualifierValue(['assist_colorblind', strength]).setDelimiter(':')));
        }
        static fromJson(actionModel) {
            const { actionType, type, stripesStrength } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this();
            if (type === 'xray') {
                result.xray();
            }
            if (type === 'stripes') {
                stripesStrength && result.stripesStrength(stripesStrength);
            }
            return result;
        }
    }

    /**
     * @description Applies a gradient fade effect from one edge of the image.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class GradientFadeEffectAction extends Action {
        constructor() {
            super(...arguments);
            this._actionModel = { actionType: 'gradientFade' };
        }
        /**
         * @description Sets the strength of the fade effect.
         * @param {number} strength The strength of the fade effect. (Range: 0 to 100, Server default: 20)
         */
        strength(strength) {
            this._actionModel.strength = strength;
            this._strength = strength;
            return this;
        }
        /**
         * @description Sets the mode of gradient fade.
         * @param {string | Qualifiers.GradientFade} type The mode of gradient fade.
         */
        type(type) {
            this._actionModel.type = type;
            this._type = type;
            return this;
        }
        /**
         * @description Sets the x dimension of the start point.
         * @param {number | string} x The x dimension of the start point.
         */
        horizontalStartPoint(x) {
            this._actionModel.horizontalStartPoint = x;
            return this.addQualifier(new Qualifier('x', x));
        }
        /**
         * @description Sets the y dimension of the start point.
         * @param {number | string} y The y dimension of the start point.
         */
        verticalStartPoint(y) {
            this._actionModel.verticalStartPoint = y;
            return this.addQualifier(new Qualifier('y', y));
        }
        prepareQualifiers() {
            let str = 'gradient_fade';
            if (this._type) {
                str += `:${this._type}`;
            }
            if (this._strength) {
                str += `:${this._strength}`;
            }
            this.addQualifier(new Qualifier('e', str));
        }
        static fromJson(actionModel) {
            const { actionType, verticalStartPoint, horizontalStartPoint, type, strength } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this();
            verticalStartPoint && result.verticalStartPoint(verticalStartPoint);
            horizontalStartPoint && result.horizontalStartPoint(horizontalStartPoint);
            type && result.type(type);
            strength && result.strength(strength);
            return result;
        }
    }

    /**
     * @description Fade out at the end of the video, use the length() method to set the time in ms for the fade to occur. (Server default: 2000)
     * @extends LeveledEffectAction
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class FadeOutEffectAction extends Action {
        constructor(duration) {
            super();
            this._actionModel = { actionType: 'fadeOut' };
            this.addQualifier(new Qualifier('e', new QualifierValue(['fade', `-${duration}`]).setDelimiter(':')));
            duration && (this._actionModel.length = duration);
        }
        /**
         *
         * @description Sets the duration level for the action
         * @param {string | number} duration - The duration of the effect
         */
        duration(duration) {
            this._actionModel.length = duration;
            return this.addQualifier(new Qualifier('e', new QualifierValue(['fade', `-${duration}`]).setDelimiter(':')));
        }
        static fromJson(actionModel) {
            const { length } = actionModel;
            if (length === undefined) {
                return new this(1000);
            }
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(length);
            return result;
        }
    }

    /**
     * @description Applies a colorizing filter to the asset, use the methods in the class to adjust the filter
     * @extends EffectActionWithLevel
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class ColorizeEffectAction extends EffectActionWithLevel {
        /**
         * @description The color to use for colorization. Specify HTML name or RGB hex code. (Server default: gray)
         * @param {string} color HTML name(red, green, etc.) or RGB hex code. (Server default: gray)
         * @return {this}
         */
        color(color) {
            this._actionModel.color = color;
            return this.addQualifier(new Qualifier('co', new QualifierValue(prepareColor(color))));
        }
        static fromJson(actionModel) {
            const { actionType, level, color } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(actionType, level);
            color && result.color(color);
            return result;
        }
    }

    /**
     * @description Applies a shadow filter to the asset.
     * @memberOf Actions.Effect
     * @extends SDK.Action
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class ShadowEffectAction extends Action {
        constructor(effectType, strength) {
            super();
            this._actionModel = {};
            this._actionModel.actionType = effectType;
            this.effectType = effectType;
            this.addQualifier(new Qualifier('e', new QualifierValue(['shadow', strength])));
        }
        /**
         * @description The strength of the shadow. (Range: 0 to 100, Server default: 40)
         * @param {number} strength
         * @return {this}
         */
        strength(strength) {
            this._actionModel.strength = strength;
            return this.addQualifier(new Qualifier('e', new QualifierValue(['shadow', strength])));
        }
        /**
         * @description The X offset the shadow
         * @param {number | SDK.ExpressionQualifier} x
         * @return {this}
         */
        offsetX(x) {
            this._actionModel.offsetX = x;
            return this.addQualifier(new Qualifier('x', new QualifierValue(x)));
        }
        /**
         * @description The Y offset the shadow
         * @param {number | SDK.ExpressionQualifier} y
         * @return {this}
         */
        offsetY(y) {
            this._actionModel.offsetY = y;
            return this.addQualifier(new Qualifier('y', new QualifierValue(y)));
        }
        /**
         * @description The color of the shadow (Server default: gray)
         * @param color
         * @return {this}
         */
        color(color) {
            this._actionModel.color = color;
            return this.addQualifier(new Qualifier('co', new QualifierValue(prepareColor(color))));
        }
        static fromJson(actionModel) {
            const { actionType, strength, offsetX, offsetY, color } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(actionType, strength);
            offsetX && result.offsetX(offsetX);
            offsetY && result.offsetY(offsetY);
            color && result.color(color);
            return result;
        }
    }

    /**
     * @description - This Action, while belonging to Effect, acts as a modified overlay.
     *                The class implements the Builder pattern, where strength() and preserveColor()
     *                are applied to the instance, and toString() is responsible to combining them into the right result.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class StyleTransfer extends Action {
        /**
         * The Image Source used to create the style transfer,
         * Use the Image Source builder to quickly create a source:
         * </br>Import: {@link Qualifiers.Source|import Sources from '@cloudinary/url-gen/qualifiers/sources';}
         * </br>Create: `Source.image('dog')`
         * @param {ImageSource} imageSource
         */
        constructor(imageSource) {
            super();
            this.imageSource = imageSource;
        }
        /**
         * Determines the strength in which the styleTransfer is applied.
         * @param {number} [effectStrength] - The strength level, 1-100, default: 100
         * @return {this}
         */
        strength(effectStrength = null) {
            this.effectStrength = effectStrength;
            return this;
        }
        /**
         * More aggressively preserves the colors of the the target photo,
         * Can be used with `strength()` to enhance this behaviour
         * @param {boolean} bool
         * @return {this}
         */
        preserveColor(bool = true) {
            this.preserve = bool;
            return this;
        }
        /**
         * The `build` phase of the Action, used internally to concat all the options received into a single string.
         * The result of this method is the toString() of the imageLayer provided in the constructor.
         * @return {string}
         */
        toString() {
            const NAME = 'style_transfer';
            const PRES = this.preserve ? 'preserve_color' : null;
            const STRENGTH = this.effectStrength;
            // Create the style effect
            const styleEffect = new Qualifier('e', new QualifierValue([NAME, PRES, STRENGTH]));
            // Handle the source for publicID,
            const sourceOpenString = this.imageSource.getOpenSourceString('l');
            // Handle source transformation
            const imgTx = this.imageSource.getTransformation();
            const sourceTransformation = imgTx ? imgTx.toString() : '';
            return [
                sourceOpenString,
                sourceTransformation,
                `${styleEffect},fl_layer_apply`
            ].filter((a) => a).join('/');
        }
    }

    /**
     * @description Applies an ordered dither filter to the image.
     * @extends LeveledEffectAction
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class DitherEffectAction extends LeveledEffectAction {
        constructor() {
            super(...arguments);
            this._actionModel = { actionType: 'dither' };
        }
        /**
         *
         * @param {Qualifiers.Dither} ditherType - The dither type applied to the image
         * @return {this}
         */
        type(ditherType) {
            this._actionModel.type = ditherType;
            const qualifierEffect = this.createEffectQualifier(this.effectType, ditherType);
            this.addQualifier(qualifierEffect);
            return this;
        }
        static fromJson(actionModel) {
            const { actionType, type } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(actionType);
            type && result.type(type);
            return result;
        }
    }

    /**
     * @description Removes small motion shifts from the video. with a maximum extent of movement in the horizontal and vertical direction of 32 pixels
     * @extends LeveledEffectAction
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class DeshakeEffectAction extends LeveledEffectAction {
        constructor() {
            super(...arguments);
            this._actionModel = { actionType: 'deshake' };
        }
        /**
         * The maximum number of pixels in the horizontal and vertical direction that will be addressed. (Possible values: 16, 32, 48, 64. Server default: 16)
         * @param value Possible values: 16, 32, 48, 64.  Server default: 16.
         */
        shakeStrength(value) {
            this._actionModel.pixels = value;
            const qualifierEffect = this.createEffectQualifier(this.effectType, value);
            this.addQualifier(qualifierEffect);
            return this;
        }
        static fromJson(actionModel) {
            const { actionType, pixels } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(actionType, pixels);
            return result;
        }
    }

    /**
     * @description The Action class of the pixelate Builder
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class Pixelate extends Action {
        constructor(squareSize) {
            super();
            this._actionModel = {};
            this._squareSize = squareSize;
            this._actionModel.actionType = 'pixelate';
            this._actionModel.squareSize = squareSize;
        }
        /**
         * @description Specifies the region to piexlate.
         * @param {NamedRegion} pixelateRegion
         */
        region(pixelateRegion) {
            this._region = pixelateRegion;
            this._actionModel.region = { regionType: this._region.regionType };
            return this;
        }
        /**
         * @description Sets the squareSize of the pixelate effect.
         * @param {number | string} squareSize
         */
        squareSize(squareSize) {
            this._squareSize = squareSize;
            this._actionModel.squareSize = squareSize;
            return this;
        }
        prepareQualifiers() {
            /*
             * pixelate with region is a unique object in this codebase.
             * On top of pixelate being an Action with Qualifiers,
             * it also accepts a Qualifier called Region.
             *
             * This Qualifier is in itself composite of qualifiers (such as height, or width).
             * The existence of Region changes the output of pixelate in non traditional ways
             * which forced this relatively ad-hoc implementation.
             *
             * Aside from all of that, all of the Qualifiers in the component should be alphabetized
             * This happens naturally in the Action class,
             * however since we're dealing with two levels of qualifiers (pixelate and Region),
             * these need to be merged.
             *
             * This function will merge the Region qualifiers with pixelate
             * and add all needed implicit qualifiers (like g_ocr_text).
             * We're not using the full Gravity Qualifier here to prevent the code import for such a simplistic case
             */
            const str = this._squareSize ? `:${this._squareSize}` : '';
            if ('_region' in this) {
                const qualifiers = this._region.qualifiers;
                // Copy qualifiers from the region "action" to the pixelate action
                qualifiers.forEach((q) => this.addQualifier(q));
                if (this._region.regionType === 'custom') {
                    this.addQualifier(new Qualifier('e', `pixelate_region${str}`));
                }
                if (this._region.regionType === 'ocr_text') {
                    this.addQualifier(new Qualifier('e', `pixelate_region${str}`));
                    this.addQualifier(new Qualifier('g', `ocr_text`));
                }
                if (this._region.regionType === 'faces') {
                    this.addQualifier(new Qualifier('e', `pixelate_faces${str}`));
                }
            }
            else {
                this.addQualifier(new Qualifier('e', `pixelate${str}`));
            }
        }
        static fromJson(actionModel) {
            const { region, squareSize } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(squareSize);
            squareSize && result.squareSize(squareSize);
            if (region && region.regionType === 'faces') {
                result.region(faces());
            }
            if (region && region.regionType === 'custom') {
                result.region(custom());
            }
            return result;
        }
    }

    /**
     * @description A class for all effects that include a strength method
     * @extends {Actions.Effect.LeveledEffectAction}
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class EffectActionWithStrength extends LeveledEffectAction {
        constructor() {
            super(...arguments);
            this.LEVEL_NAME = 'strength';
        }
        strength(value) {
            return this.setLevel(value);
        }
    }

    /**
     * @description Converts the image to black and white.
     * @extends LeveledEffectAction
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class BlackwhiteEffectAction extends LeveledEffectAction {
        threshold(value) {
            return this.setLevel(value);
        }
    }

    /**
     * @description Fade out at the end of the video, use the length() method to set the time in ms for the fade to occur. (Server default: 2000)
     * @extends Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class FadeInEffectAction extends Action {
        constructor(duration) {
            super();
            this._actionModel = { actionType: 'fadeIn' };
            this.addQualifier(new Qualifier('e', new QualifierValue(['fade', `${duration}`]).setDelimiter(':')));
            duration && (this._actionModel.length = duration);
        }
        /**
         *
         * @description Sets the duration level for the action
         * @param {string | number} duration - The duration of the effect
         */
        duration(duration) {
            this._actionModel.length = duration;
            return this.addQualifier(new Qualifier('e', new QualifierValue(['fade', `${duration}`]).setDelimiter(':')));
        }
        static fromJson(actionModel) {
            const { length } = actionModel;
            if (length === undefined) {
                return new this(1000);
            }
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(length);
            return result;
        }
    }

    /**
     * @description A class that defines how to remove the background of an asset
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class RemoveBackgroundAction extends Action {
        constructor() {
            super();
            this.overwriteQualifier();
        }
        /**
         * @description Everytime this method is called, it will overwrite the e_bgremoval qualifier with new values
         * @private
         */
        overwriteQualifier() {
            const value = ['bgremoval', this._screen ? 'screen' : '', (this._colorToRemove || '').replace('#', '')];
            return this.addQualifier(new Qualifier('e', new QualifierValue(value)));
        }
        /**
         * @description The strength of the shadow. (Range: 0 to 100, Server default: 40)
         * @param {number} useScreen Boolean, defaults to true
         * @return {this}
         */
        screen(useScreen = true) {
            this._screen = useScreen;
            return this.overwriteQualifier();
        }
        /**
         * @description The color to remove from the background
         * @param {SystemColors} color
         * @return {this}
         */
        colorToRemove(color) {
            this._colorToRemove = color;
            return this.overwriteQualifier();
        }
    }

    /**
     * @description Changes the main background color to the one specified, as if a 'theme change' was applied (e.g. dark mode vs light mode).
     * @extends SDK.Action
     * @memberOf {Actions.Effect}
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class ThemeEffect extends Action {
        constructor(color) {
            super();
            this.effectName = 'theme';
            this.color = color;
        }
        /**
         * @description The sensitivity to photographic elements of an image.
         *              A value of 0 treats the whole image as non-photographic.
         *              A value of 200 treats the whole image as photographic, so no theme change is applied.
         * @param {number} photosensitivity
         * @return {this}
         */
        photosensitivity(photosensitivity) {
            this._photosensitivity = photosensitivity;
            return this;
        }
        prepareQualifiers() {
            const sensitivity = this._photosensitivity ? `:photosensitivity_${this._photosensitivity}` : '';
            // Replace # in hex colors (#fff -> fff)
            const val = `${this.effectName}:color_${this.color.replace('#', '')}${sensitivity}`;
            this.addQualifier(new Qualifier('e', new QualifierValue(val)));
            return;
        }
    }

    /**
     * @description A class that defines how to remove the background of an asset
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class BackgroundRemoval extends Action {
        constructor() {
            super();
            this._actionModel.actionType = "backgroundRemoval";
        }
        fineEdges(value = true) {
            this._fineEdges = value;
            this._actionModel.fineEdges = this._fineEdges;
            return this;
        }
        hints(...values) {
            if (values.length === 1 && Array.isArray(values[0])) {
                // Handle the case of a single array argument
                this._hints = values[0];
            }
            else if (values.length) {
                this._hints = values;
            }
            if (this._hints) {
                this._actionModel.hints = this._hints;
            }
            return this;
        }
        prepareQualifiers() {
            var _a;
            let str = "background_removal";
            const params = [];
            if (this._fineEdges !== undefined) {
                params.push(new QualifierValue(`fineedges_${this._fineEdges ? "y" : "n"}`).toString());
            }
            if ((_a = this._hints) === null || _a === void 0 ? void 0 : _a.length) {
                params.push(new QualifierValue(`hints_(${this._hints.join(";")})`).toString());
            }
            if (params.length > 0) {
                str += `:${params.join(";")}`;
            }
            this.addQualifier(new Qualifier("e", str));
        }
        static fromJson(actionModel) {
            const { fineEdges, hints } = actionModel;
            const result = new this();
            if (fineEdges !== undefined) {
                result.fineEdges(fineEdges);
            }
            if (hints === null || hints === void 0 ? void 0 : hints.length) {
                result.hints(hints);
            }
            return result;
        }
    }

    /**
     * @description Adds a shadow to the object in an image.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class DropShadow extends Action {
        constructor() {
            super();
            this._actionModel = {};
            this._actionModel.actionType = 'dropshadow';
        }
        /**
         * @description
         * The direction the light is coming from to cause the shadow effect. (Range: 0 to 360, Server default: 215)
         * @param {number} azimuth
         * @return {this}
         */
        azimuth(azimuth) {
            this._actionModel.azimuth = azimuth;
            this._azimuth = azimuth;
            return this;
        }
        /**
         * @description
         * The height of the light source above the 'ground' to cause the shadow effect. (Range: 0 to 90, Server default: 45)
         * @param {number} elevation
         * @return {this}
         */
        elevation(elevation) {
            this._actionModel.elevation = elevation;
            this._elevation = elevation;
            return this;
        }
        /**
         * @description
         * The spread of the light source. A small number means 'point' light. A larger number means 'area' light. (Range: 0 to 100, Server default: 50)
         * @param {number} spread
         * @return {this}
         */
        spread(spread) {
            this._actionModel.spread = spread;
            this._spread = spread;
            return this;
        }
        prepareQualifiers() {
            const paramNames = ['azimuth', 'elevation', 'spread'];
            const paramValues = [this._azimuth, this._elevation, this._spread];
            const paramString = paramValues.map((value, index) => value !== undefined ? `${paramNames[index]}_${value}` : '').filter(Boolean).join(';');
            this.addQualifier(new Qualifier('e', new QualifierValue(['dropshadow', paramString]).setDelimiter(':')));
        }
        static fromJson(actionModel) {
            const { azimuth, elevation, spread } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this();
            azimuth && result.azimuth(azimuth);
            elevation && result.elevation(elevation);
            spread && result.spread(spread);
            return result;
        }
    }

    /**
     * @description A class that defines how to remove objects from an asset using Generative AI
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class GenerativeRemove extends Action {
        constructor() {
            super();
            this._prompts = [];
            this._regions = [];
            this._detectMultiple = false;
            this._removeShadow = false;
            this._actionModel.actionType = "generativeRemove";
        }
        prompt(...value) {
            this._prompts = value;
            if (this._prompts.length > 0) {
                this._actionModel.prompts = this._prompts;
            }
            return this;
        }
        region(...value) {
            this._regions = value;
            if (this._regions.length > 0) {
                this._actionModel.regions = this._regions.map((region) => region.toJson());
            }
            return this;
        }
        detectMultiple(value = true) {
            this._detectMultiple = value;
            if (this._detectMultiple) {
                this._actionModel.detectMultiple = this._detectMultiple;
            }
            return this;
        }
        removeShadow(value = true) {
            this._removeShadow = value;
            if (this._removeShadow) {
                this._actionModel.removeShadow = this._removeShadow;
            }
            return this;
        }
        prepareQualifiers() {
            const qualifierValue = new QualifierValue().setDelimiter(";");
            switch (true) {
                case this._prompts.length > 0: {
                    qualifierValue.addValue(this.preparePromptValue());
                    break;
                }
                case this._regions.length > 0: {
                    qualifierValue.addValue(this.prepareRegionValue());
                    break;
                }
            }
            if (this._detectMultiple) {
                qualifierValue.addValue("multiple_true");
            }
            if (this._removeShadow) {
                qualifierValue.addValue("remove-shadow_true");
            }
            this.addQualifier(new Qualifier("e", `gen_remove:${qualifierValue.toString()}`));
        }
        preparePromptValue() {
            const prompts = this._prompts;
            const qualifierValue = new QualifierValue().setDelimiter(";");
            if (prompts.length === 1) {
                qualifierValue.addValue(`prompt_${prompts[0]}`);
            }
            else {
                qualifierValue.addValue(`prompt_(${prompts.join(";")})`);
            }
            return qualifierValue;
        }
        prepareRegionValue() {
            const regions = this._regions;
            const qualifierValue = new QualifierValue();
            if (regions.length === 1) {
                const singleRegion = regions[0].toString();
                qualifierValue.addValue(`region_${singleRegion}`);
            }
            else {
                const regionList = regions.map((region) => region.toString());
                qualifierValue.addValue(`region_(${regionList.join(";")})`);
            }
            return qualifierValue;
        }
        static fromJson(actionModel) {
            const { prompts, regions, detectMultiple, removeShadow } = actionModel;
            const result = new this();
            if (regions) {
                result.region(...regions.map(({ x, y, width, height }) => new RectangleRegion(x, y, width, height)));
            }
            if (prompts) {
                result.prompt(...prompts);
            }
            if (detectMultiple) {
                result.detectMultiple(detectMultiple);
            }
            if (removeShadow) {
                result.removeShadow(removeShadow);
            }
            return result;
        }
    }

    /**
     * @description Uses generative AI to replace parts of your image with something else.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class GenerativeReplace extends Action {
        constructor() {
            super();
            this._preserveGeometry = false;
            this._detectMultiple = false;
            this._actionModel.actionType = "generativeReplace";
        }
        from(value) {
            this._from = value;
            this._actionModel.from = value;
            return this;
        }
        to(value) {
            this._to = value;
            this._actionModel.to = value;
            return this;
        }
        preserveGeometry(value = true) {
            this._preserveGeometry = value;
            if (value) {
                this._actionModel.preserveGeometry = true;
            }
            return this;
        }
        detectMultiple(value = true) {
            this._detectMultiple = value;
            if (this._detectMultiple) {
                this._actionModel.detectMultiple = this._detectMultiple;
            }
            return this;
        }
        prepareQualifiers() {
            let str = `gen_replace:from_${this._from};to_${this._to}`;
            if (this._preserveGeometry) {
                str += `;preserve-geometry_true`;
            }
            if (this._detectMultiple) {
                str += `;multiple_true`;
            }
            this.addQualifier(new Qualifier("e", str));
        }
        static fromJson(actionModel) {
            const { from, to, preserveGeometry, detectMultiple } = actionModel;
            const result = new this();
            result.from(from);
            result.to(to);
            if (preserveGeometry) {
                result.preserveGeometry();
            }
            if (detectMultiple) {
                result.detectMultiple();
            }
            return result;
        }
    }

    /**
     * @description A class that defines how to recolor objects in an asset using Generative AI
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class GenerativeRecolor extends Action {
        constructor(prompts, color) {
            super();
            this._prompts = [];
            this._detectMultiple = false;
            // Alias method to be backwards compatible
            this.multiple = this.detectMultiple.bind(this);
            this._prompts = Array.isArray(prompts) ? prompts : [prompts];
            this._toColor = color;
            this._actionModel.actionType = "generativeRecolor";
            this._actionModel.prompts = this._prompts;
            this._actionModel.toColor = this._toColor;
        }
        detectMultiple(value = true) {
            this._detectMultiple = value;
            if (this._detectMultiple) {
                this._actionModel.detectMultiple = this._detectMultiple;
            }
            return this;
        }
        prepareQualifiers() {
            const qualifierValue = new QualifierValue().setDelimiter(";");
            if (this._prompts.length) {
                qualifierValue.addValue(this.preparePromptValue());
            }
            if (this._toColor) {
                const formattedColor = this._toColor.match(/^#/)
                    ? this._toColor.substr(1)
                    : this._toColor;
                qualifierValue.addValue(`to-color_${formattedColor}`);
            }
            if (this._detectMultiple) {
                qualifierValue.addValue("multiple_true");
            }
            this.addQualifier(new Qualifier("e", `gen_recolor:${qualifierValue.toString()}`));
        }
        preparePromptValue() {
            const prompts = this._prompts;
            const qualifierValue = new QualifierValue().setDelimiter(";");
            if (prompts.length === 1) {
                qualifierValue.addValue(`prompt_${prompts[0]}`);
            }
            else {
                qualifierValue.addValue(`prompt_(${prompts.join(";")})`);
            }
            return qualifierValue;
        }
        static fromJson(actionModel) {
            const { prompts, detectMultiple, toColor } = actionModel;
            const result = new this(prompts, toColor);
            if (detectMultiple) {
                result.detectMultiple(detectMultiple);
            }
            return result;
        }
    }

    /**
     * @description Uses generative AI to replace background of your image with something else.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class GenerativeBackgroundReplace extends Action {
        constructor() {
            super();
            this._actionModel.actionType = "generativeBackgroundReplace";
        }
        prompt(value) {
            this._prompt = value;
            this._actionModel.prompt = value;
            return this;
        }
        prepareQualifiers() {
            if (!this._prompt) {
                this.addQualifier(new Qualifier("e", "gen_background_replace"));
            }
            else {
                this.addQualifier(new Qualifier("e", `gen_background_replace:prompt_${this._prompt}`));
            }
        }
        static fromJson(actionModel) {
            const { prompt } = actionModel;
            const result = new this();
            return result.prompt(prompt);
        }
    }

    /**
     * @description Extracts an area or multiple areas of an image, described in natural language.
     * @extends SDK.Action
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class Extract extends Action {
        constructor(prompts) {
            super();
            this._prompts = [];
            this._detectMultiple = false;
            this._invert = false;
            this._actionModel.actionType = "extract";
            this._prompts = Array.isArray(prompts) ? prompts : [prompts];
            this._actionModel.prompts = this._prompts;
        }
        detectMultiple(value = false) {
            this._detectMultiple = value;
            if (this._detectMultiple) {
                this._actionModel.detectMultiple = this._detectMultiple;
            }
            return this;
        }
        mode(mode) {
            this._mode = mode;
            this._actionModel.mode = this._mode;
            return this;
        }
        invert(value = false) {
            this._invert = value;
            if (this._invert) {
                this._actionModel.invert = this._invert;
            }
            return this;
        }
        prepareQualifiers() {
            const qualifierValue = new QualifierValue().setDelimiter(";");
            if (this._prompts.length) {
                qualifierValue.addValue(this.preparePromptValue());
            }
            if (this._detectMultiple) {
                qualifierValue.addValue("multiple_true");
            }
            if (this._mode) {
                qualifierValue.addValue(`mode_${this._mode}`);
            }
            if (this._invert) {
                qualifierValue.addValue("invert_true");
            }
            this.addQualifier(new Qualifier("e", `extract:${qualifierValue.toString()}`));
        }
        preparePromptValue() {
            const prompts = this._prompts;
            const qualifierValue = new QualifierValue().setDelimiter(";");
            if (prompts.length === 1) {
                qualifierValue.addValue(`prompt_${prompts[0]}`);
            }
            else {
                qualifierValue.addValue(`prompt_(${prompts.join(";")})`);
            }
            return qualifierValue;
        }
        static fromJson(actionModel) {
            const { prompts, detectMultiple, mode, invert } = actionModel;
            const result = new this(prompts);
            if (detectMultiple) {
                result.detectMultiple(detectMultiple);
            }
            if (mode) {
                result.mode(mode);
            }
            if (invert) {
                result.invert(invert);
            }
            return result;
        }
    }

    /**
     * @summary action
     * @description Applies a blurring filter to the asset.
     * @memberOf Actions.Effect
     * @param {number} blurLevel The strength of the blur. (Range: 1 to 2000, Server default: 100)
     * @return {Actions.Effect.BlurAction}
     */
    function blur(blurLevel) {
        return new BlurAction(blurLevel);
    }
    /**
     * @summary action
     * @description Converts the image to gray-scale (multiple shades of gray).
     * @memberOf Actions.Effect
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function grayscale() {
        return new SimpleEffectAction("grayscale");
    }
    /**
     * @summary action
     * @description Changes the color scheme of the image to sepia.
     * @memberOf Actions.Effect
     * @param {number} level The level of sepia to apply. (Range: 1 to 100, Server default: 80)
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function sepia(level) {
        return new EffectActionWithLevel("sepia", level);
    }
    /**
     * @summary action
     * @description Applies a shadow filter to the asset.
     * @memberOf Actions.Effect
     * @param shadowLevel
     * @return {Actions.Effect.ShadowEffectAction}
     */
    function shadow(shadowLevel) {
        return new ShadowEffectAction("shadow", shadowLevel);
    }
    /**
     * @summary action
     * @description Applies a colorizing filter to the asset.
     * @memberOf Actions.Effect
     * @param {number} colorizeLevel The strength of the color. (Range: 0 to 100, Server default: 100)
     * @return {Actions.Effect.ColorizeEffectAction}
     */
    function colorize(colorizeLevel) {
        return new ColorizeEffectAction("colorize", colorizeLevel);
    }
    /**
     * @summary action
     * @description Applies an oilPaint filter to the asset.
     * @memberOf Actions.Effect
     * @param {number} oilPaintLevel The strength of the effect. (Range: 0 to 100, Server default: 30)
     * @return {Actions.Effect.EffectActionWithStrength}
     */
    function oilPaint(oilPaintLevel) {
        return new EffectActionWithStrength("oil_paint", oilPaintLevel);
    }
    /**
     * @summary action
     * @description Applies an artistic filter to the asset.
     * @memberOf Actions.Effect
     * @param {ArtisticFilterType | string} artisticFilterType
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function artisticFilter(artisticFilterType) {
        return new SimpleEffectAction("art", artisticFilterType);
    }
    /**
     * @summary action
     * @description Applies a cartoonify effect to the asset.
     * @memberOf Actions.Effect
     * @param cartoonifyLevel The thickness of the lines. (Range: 0 to 100, Server default: 50)
     * @return {Actions.Effect.CartoonifyEffect}
     */
    function cartoonify(cartoonifyLevel) {
        return new CartoonifyEffect("cartoonify", cartoonifyLevel);
    }
    /**
     * @summary action
     * @description Adds an outline to a transparent image. For examples, see the Image Transformations guide.
     * @memberOf Actions.Effect
     * @return {Actions.Effect.EffectOutline}
     */
    function outline() {
        return new EffectOutline();
    }
    /**
     * @summary action
     * @description Applies a complex deep learning neural network algorithm that extracts artistic styles from a source image and applies them to the content of a target photograph.<br/>
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/neural_artwork_style_transfer_addon|Neural Artwork Style Transfer}
     * @memberOf Actions.Effect
     * @param {ImageSource} imageSource `import {image} from '@cloudinary/url-gen/qualifiers/sources`
     * @return {Actions.Effect.StyleTransfer}
     */
    function styleTransfer(imageSource) {
        return new StyleTransfer(imageSource);
    }
    /**
     * @summary action
     * @description
     * Causes a video clip to play forwards and then backwards.
     * Use in conjunction with trimming parameters ('duration', 'start_offset', or 'end_offset') and the 'loop' effect to deliver a classic (short, repeating) boomerang clip.<br/>
     * For details and examples, see 'Create a boomerang video clip' in the Video Transformations guide.
     * @memberOf Actions.Effect
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function boomerang() {
        return new SimpleEffectAction("boomerang");
    }
    /**
     * @summary action
     * @description
     * Removes red eyes with the Advanced Facial Attribute Detection add-on.
     * For details, see the Advanced Facial Attribute Detection add-on documentation.
     * @memberOf Actions.Effect
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function advancedRedEye() {
        return new SimpleEffectAction("adv_redeye");
    }
    /**
     * @summary action
     * @description Converts the image to black and white.
     * @memberOf Actions.Effect
     * @param {number | string} level The balance between black (100) and white (0). (Range: 0 to 100, Server default: 50)
     * @return {Actions.Effect.BlackwhiteEffectAction}
     */
    function blackwhite(level) {
        return new BlackwhiteEffectAction("blackwhite", level);
    }
    /**
     * @summary action
     * @description Negates the image colors (negative).
     * @memberOf Actions.Effect
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function negate() {
        return new SimpleEffectAction("negate");
    }
    /**
     * @summary action
     * @description Removes red eyes in the image.
     * @memberOf Actions.Effect
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function redEye() {
        return new SimpleEffectAction("redeye");
    }
    /**
     * @summary action
     * @description Plays the video or audio file in reverse.
     * @memberOf Actions.Effect
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function reverse() {
        return new SimpleEffectAction("reverse");
    }
    /**
     * @summary action
     * @description Changes the speed of the video playback.
     * @memberOf Actions.Effect
     * @param {number} speedIncreasePercent The percentage change of speed. Positive numbers speed up the playback, negative numbers slow down the playback (Range: -50 to 100, Server default: 0)
     * @return {Actions.Effect.AccelerationEffectAction}
     */
    function accelerate(speedIncreasePercent) {
        return new AccelerationEffectAction(speedIncreasePercent);
    }
    /**
     * @summary action
     * @description
     * Fade in at the beginning of the video.
     * For details and examples, see 'Fade in and out' in the Video Transformations guide.
     * @memberOf Actions.Effect
     * @param {number} fadeLength The time in ms for the fade to occur. (Server default: 2000)
     * @return {Actions.Effect.FadeInEffectAction}
     */
    function fadeIn(fadeLength) {
        return new FadeInEffectAction(fadeLength);
    }
    /**
     * @summary action
     * @description
     * Fade out at the end of the video.
     * For details and examples, see 'Fade in and out' in the Video Transformations guide.
     * @memberOf Actions.Effect
     * @param {number} fadeLength The time in ms for the fade to occur. (Server default: 2000)
     * @return {Actions.Effect.FadeoutEffectAction}
     */
    function fadeOut(fadeLength) {
        return new FadeOutEffectAction(fadeLength);
    }
    /**
     * @summary action
     * @description
     * Delivers a video or animated GIF that contains additional loops of the video/GIF.
     * The total number of iterations is the number of additional loops plus one. <br/>
     * For animated GIFs only, you can also specify the loop effect without a numeric value to instruct it to loop the GIF infinitely.
     * @memberOf Actions.Effect
     * @param {number} additionalLoops The additional number of times to play the video or animated GIF.
     * @return {Actions.Effect.LoopEffectAction}
     */
    function loop(additionalLoops) {
        return new LoopEffectAction("loop", additionalLoops);
    }
    /**
     * @summary action
     * @description
     * Makes the background of the image transparent (or solid white for formats that do not support transparency).
     * The background is determined as all pixels that resemble the pixels on the edges of the image.
     *
     * @memberOf Actions.Effect
     * @param {number} tolerance The tolerance used to accommodate variance in the background color. (Range: 0 to 100, Server default: 10)
     * @return {Actions.Effect.MakeTransparentEffectAction}
     */
    function makeTransparent(tolerance) {
        return new MakeTransparentEffectAction("make_transparent", tolerance);
    }
    /**
     * @summary action
     * @description Adds visual noise to the video, visible as a random flicker of "dots" or "snow".
     * @memberOf Actions.Effect
     * @param {number} percentage The percent of noise to apply. (Range: 0 to 100 Server default: 0)
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function noise(percentage) {
        return new EffectActionWithLevel("noise", percentage);
    }
    /**
     * @summary action
     * @description Applies a vignette effect.
     * @memberOf Actions.Effect
     * @param {number} strength The strength of the vignette. (Range: 0 to 100, Server default: 20)
     * @return {Actions.Effect.EffectActionWithStrength}
     */
    function vignette(strength) {
        return new EffectActionWithStrength("vignette", strength);
    }
    /**
     * @summary action
     * @description
     * Applies an ordered dither filter to the image.
     * Use the constants defined in {@link Qualifiers.Dither|@cloudinary/url-gen/qualifiers/dither} for ditherType.
     * @memberOf Actions.Effect
     * @param {Qualifiers.Dither} ditherType - The dither type applied to the image
     * @return {Actions.Effect.DitherEffectAction}
     */
    function dither(ditherType) {
        return new DitherEffectAction("ordered_dither", ditherType);
    }
    /**
     * @summary action
     * @description
     * Vectorizes the image.
     * Notes:
     * To deliver the image as a vector image, make sure to change the format (or URL extension) to a vector format, such as SVG.</br>
     * However, you can also deliver in a raster format if you just want to get the 'vectorized' graphic effect.</br>
     * Large images are scaled down to 1000 pixels in the largest dimension before vectorization.
     *
     * @memberOf Actions.Effect
     * @return {Actions.Effect.VectorizeEffectAction}
     */
    function vectorize() {
        return new VectorizeEffectAction();
    }
    /**
     * @summary action
     * @description
     * Applies a gradient fade effect from one edge of the image.
     * Use .x() or .y() to indicate from which edge to fade and how much of the image should be faded.
     * Values of x and y can be specified as a percentage (Range: 0.0 to 1.0), or in pixels (integer values). <br/>
     * Positive values fade from the top (y) or left (x). Negative values fade from the bottom (y) or right (x). <br/>
     * By default, the gradient is applied to the top 50% of the image (y = 0.5).<br/>
     * Only one direction can be specified but the fade can be applied symmetrically using the mode parameter. </br>
     * To apply different amounts of fade to multiple edges, use chained fade effects.
     *
     * @memberOf Actions.Effect
     * @return {Actions.Effect.GradientFadeEffectAction}
     */
    function gradientFade() {
        return new GradientFadeEffectAction();
    }
    /**
     * @summary action
     * @description
     * Applies stripes to the image to help people with common color-blind conditions to differentiate between colors that are similar for them.</br>
     * You can replace colors using the xRay() method of the \Cloudinary\Transformation\AssistColorBlind class.
     * @memberOf Actions.Effect
     * @return {Actions.Effect.AssistColorBlindEffectAction}
     */
    function assistColorBlind() {
        return new AssistColorBlindEffectAction();
    }
    /**
     * @summary action
     * @description
     * Simulates the way an image would appear to someone with the specified color blind condition. </br>
     * For a list of supported color blind conditions see {@link Qualifiers.SimulateColorBlindValues| types of color blindness} for possible values
     * @memberOf Actions.Effect
     * @return {Actions.Effect.SimulateColorBlindEffectAction}
     */
    function simulateColorBlind() {
        return new SimulateColorBlindEffectAction();
    }
    /**
     * @summary action
     * @description Removes small motion shifts from the video. with a maximum extent of movement in the horizontal and vertical direction of 32 pixels
     * @memberOf Actions.Effect
     * @return {Actions.Effect.DeshakeEffectAction}
     */
    function deshake(pixels) {
        return new DeshakeEffectAction("deshake", pixels);
    }
    /**
     * @summary action
     * @description Supports the concatenation of videos with a custom transition by including a transition video as an
     * additional layer and specifying the transition effect
     * @memberOf Actions.Effect
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function transition() {
        return new SimpleEffectAction("transition");
    }
    /**
     * @summary action
     * @description Applies a pixelatering filter to the asset.
     * @memberOf Actions.Effect
     * @param {number} squareSize The squareSize in the pixelation. (Range: 1 to 2000, Server default: 100)
     * @return {Actions.Effect.Pixelate}
     */
    function pixelate(squareSize) {
        return new Pixelate(squareSize);
    }
    /**
     * @summary action
     * @description Makes the background of an image transparent (or solid white for JPGs).</br>
     *              Use when the background is a uniform color.
     *              {@link https://cloudinary.com/documentation/transformation_reference#e_bgremoval|Background Removal}
     *
     * @memberOf Actions.Effect
     * @return {Actions.Effect.RemoveBackgroundAction}
     */
    function removeBackground() {
        return new RemoveBackgroundAction();
    }
    /**
     * @summary action
     * @description Uses the Cloudinary AI Background Removal add-on to make the background of an image transparent.</br>
     *              When combined with other transformations, this effect must be specified in the first component.
     *              {@link https://cloudinary.com/documentation/transformation_reference#e_background_removal|Background Removal}
     *
     * @memberOf Actions.Effect
     * @return {Actions.Effect.BackgroundRemoval}
     */
    function backgroundRemoval() {
        return new BackgroundRemoval();
    }
    /**
     * @summary action
     * @description Adds a shadow to the object in an image.
     *              {@link https://cloudinary.com/documentation/transformation_reference#e_dropshadow|Drop Shadow}
     *
     * @memberOf Actions.Effect
     * @return {Actions.Effect.DropShadow}
     */
    function dropShadow() {
        return new DropShadow();
    }
    /**
     * @summary action
     * @description Remove objects from an asset using Generative AI
     *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_remove|Generative Remove}
     *
     * @memberOf Actions.Effect
     * @return {Actions.Effect.GenerativeRemove}
     */
    function generativeRemove() {
        return new GenerativeRemove();
    }
    /**
     * @summary action
     * @description Uses generative AI to replace parts of your image with something else.
     *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_replace|Generative Replace}
     *
     * @memberOf Actions.Effect
     * @return {Actions.Effect.GenerativeReplace}
     */
    function generativeReplace() {
        return new GenerativeReplace();
    }
    /**
     * @summary action
     * @description Uses generative AI to replace background of your image with something else.
     *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_background_replace|Generative Background Replace}
     *
     * @memberOf Actions.Effect
     * @return {Actions.Effect.GenerativeBackgroundReplace}
     */
    function generativeBackgroundReplace() {
        return new GenerativeBackgroundReplace();
    }
    /**
     * @summary action
     * @description Extracts an area or multiple areas of an image, described in natural language.
     *              {@link https://cloudinary.com/documentation/transformation_reference#e_extract|Extract}
     *
     * @memberOf Actions.Effect
     * @return {Actions.Effect.Extract}
     */
    function extract(prompts) {
        return new Extract(prompts);
    }
    /**
     * @summary action
     * @description Uses generative AI to recolor objects from your image.
     *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_recolor|Generative Recolor}
     * @param {string | string[]} prompts
     * @param {SystemColors} color
     * @memberOf Actions.Effect
     * @return {Actions.Effect.GenerativeRecolor}
     */
    function generativeRecolor(prompts, color) {
        return new GenerativeRecolor(prompts, color);
    }
    /**
     * @summary action
     * @description
     * Uses generative AI to restore details in poor quality images
     * or images that may have become degraded through repeated processing and compression.
     * @memberOf Actions.Effect
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function generativeRestore() {
        return new SimpleEffectAction("gen_restore");
    }
    /**
     * @summary action
     * @description
     * Uses AI-based prediction to add fine detail while upscaling small images.
     * This 'super-resolution' feature scales each dimension by four, multiplying the total number of pixels by 16.
     * @memberOf Actions.Effect
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function upscale() {
        return new SimpleEffectAction("upscale");
    }
    /**
     *
     * @description Changes the main background color to the one specified, as if a 'theme change' was applied (e.g. dark mode vs light mode).
     * @param {SystemColors} color
     * @return {Actions.Effect.ThemeEffect}
     */
    function theme(color) {
        return new ThemeEffect(color);
    }
    /**
     *
     * @description Uses AI to analyze an image and make adjustments to enhance the appeal of the image.
     * @return {Actions.Effect.Enhance}
     */
    function enhance() {
        return new SimpleEffectAction("enhance");
    }
    /**
     * @description Defines effects that you can apply to transform your assets.
     * @memberOf Actions
     * @namespace Effect
     * @example
     * <caption>An <b>extreme</b> example of using many effects on the same asset</caption>
     * import {Cloudinary} from "@cloudinary/url-gen";
     * // Import everything, or just the action you need for tree-shaking purposes
     * import {Effect, sepia} from "@cloudinary/url-gen/actions/effect";
     * import {ArtisticFilter, alDente} from "@cloudinary/url-gen/qualifiers/artisticFilter";
     * import {ShakeStrength, pixels16} from "@cloudinary/url-gen/qualifiers/shakeStrength";
     * import {cat, dog} from "@cloudinary/url-gen/qualifiers/ForegroundObject";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     *
     * image.effect(Effect.advancedRedEye())
     * .effect(Effect.accelerate())
     * .effect(Effect.accelerate(100))
     * .effect(Effect.accelerate().rate(5))
     * .effect(Effect.boomerang())
     * .effect(Effect.blackwhite())
     * .effect(Effect.blackwhite(10))
     * .effect(Effect.blackwhite().threshold(20))
     * .effect(Effect.fadeIn(100))
     * .effect(Effect.fadeIn().duration(5))
     * .effect(Effect.fadeOut(100))
     * .effect(Effect.fadeOut().duration(5))
     * .effect(Effect.grayscale())
     * .effect(Effect.loop())
     * .effect(Effect.loop(100))
     * .effect(Effect.loop().additionalIterations(5))
     * .effect(Effect.makeTransparent())
     * .effect(Effect.makeTransparent(100))
     * .effect(Effect.makeTransparent().tolerance(5))
     * .effect(Effect.makeTransparent().tolerance(5).colorToReplace('red'))
     * .effect(Effect.noise())
     * .effect(Effect.noise(100))
     * .effect(Effect.noise().level(5))
     * .effect(Effect.negate())
     * .effect(Effect.reverse())
     * .effect(Effect.redEye())
     * .effect(Effect.sepia())
     * .effect(Effect.sepia(100))
     * .effect(Effect.sepia().level(5))
     * .effect(Effect.vignette())
     * .effect(Effect.vignette(100))
     * .effect(Effect.vignette().strength(5))
     * .effect(Effect.deshake())
     * .effect(Effect.deshake(10))
     * .effect(Effect.artisticFilter(alDente())
     * .effect(Effect.deshake().shakeStrength(pixels16()))
     * .effect(Effect.backgroundRemoval().fineEdges(true).hints(cat(), dog())
     * .effect(Effect.generativeRemove().prompt("red car").detectMultiple())
     * .effect(Effect.generativeRemove().region({x: 20, y: 200, width: 100, height: 100}))
     * .effect(Effect.generativeReplace().from("ceiling").to("sunny sky").preserveGeometry(true))
     */
    const Effect = {
        pixelate: pixelate,
        deshake: deshake,
        boomerang: boomerang,
        advancedRedEye: advancedRedEye,
        blackwhite,
        negate: negate,
        redEye: redEye,
        reverse: reverse,
        accelerate: accelerate,
        fadeIn: fadeIn,
        fadeOut: fadeOut,
        loop: loop,
        makeTransparent: makeTransparent,
        noise: noise,
        vignette: vignette,
        blur: blur,
        grayscale: grayscale,
        sepia: sepia,
        shadow: shadow,
        colorize: colorize,
        oilPaint: oilPaint,
        artisticFilter: artisticFilter,
        cartoonify: cartoonify,
        outline: outline,
        styleTransfer: styleTransfer,
        gradientFade: gradientFade,
        vectorize: vectorize,
        assistColorBlind: assistColorBlind,
        simulateColorBlind: simulateColorBlind,
        transition: transition,
        dither: dither,
        removeBackground,
        backgroundRemoval,
        dropShadow,
        generativeRemove,
        generativeReplace,
        generativeBackgroundReplace,
        generativeRecolor,
        generativeRestore,
        upscale,
        theme,
        enhance,
        extract
    };

    const QUALIFIER_KEY = 'a';
    /**
     * @description Rotates or flips an image or video.
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#rotating_images|Rotating images}
     * {@link https://cloudinary.com/documentation/video_effects_and_enhancements#rotating_videos|Rotating videos}
     * @extends SDK.Action
     * @memberOf Actions.Rotate
     * @see Visit {@link Actions.Rotate|Rotate} for an example
     */
    class RotateAction extends Action {
        constructor(angle) {
            super();
            this._actionModel = {};
            this.addQualifier(new Qualifier(QUALIFIER_KEY, angle));
            if (angle) {
                this._actionModel.actionType = 'rotateByAngle';
                this._actionModel.angle = angle;
            }
        }
        /**
         * @description Rotates an asset using a defined mode.
         * @param {Qualifiers.RotationMode | RotationModeType | string} rotationMode
         * For a list of supported rotation modes see {@link Qualifiers.RotationMode| types of rotation modes} for
         * possible values
         * @return {this}
         */
        mode(rotationMode) {
            this._actionModel.actionType = 'rotateByMode';
            this._actionModel.mode = rotationMode;
            return this.addValueToQualifier(QUALIFIER_KEY, rotationMode);
        }
        /**
         * @description Rotates an asset by the specified degrees.
         * @param {number} degrees rotation in degrees e.g 90, 45, 33
         * @return {this}
         */
        angle(degrees) {
            this._actionModel.actionType = 'rotateByAngle';
            this._actionModel.angle = degrees;
            return this.addValueToQualifier(QUALIFIER_KEY, degrees);
        }
        static fromJson(actionModel) {
            const { angle, mode } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = mode ? new this().mode(mode) : new this(angle);
            return result;
        }
    }
    var RotateAction$1 = RotateAction;

    /**
     * Rotates or flips an image or video by the specified number of degrees, or automatically (images only) according to its orientation or available metadata.
     * @memberOf Actions
     * @namespace Rotate
     *
     * @example
     * <caption>Rotate by mode</caption>
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {mode, byAngle} from "@cloudinary/url-gen/actions/rotate";
     * import {autoLeft} from "@cloudinary/url-gen/qualifiers/rotationMode";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     *
     * // Rotate by mode
     * image.rotate(mode(autoLeft());
     *
     * // Rotate by angle
     * image.rotate(byAngle(90));
     *
     * image.toString();
     */
    /**
     * @summary action
     * @description Rotate an image by using a rotationMode
     * @param {RotationModeType|string} rotationMode
     * For a list of supported rotation modes see {@link Qualifiers.RotationMode| types of rotation modes} for
     * possible values
     * @memberOf Actions.Rotate
     * @return {Actions.Rotate.RotateAction}
     */
    function mode(rotationMode) {
        return new RotateAction$1().mode(rotationMode);
    }
    /**
     * @summary action
     * @description Rotate an image by the given degrees.
     * @param {number} angle Given degrees. (Range: 0 to 360, Default: 0).
     * @return {Actions.Rotate.RotateAction}
     * @memberOf Actions.Rotate
     */
    function byAngle(angle) {
        return new RotateAction$1(angle);
    }
    const Rotate = { byAngle, mode };

    /**
     * @description Adjusts the fill light and blends the result with the original image.
     * @memberOf Actions.Adjust
     * @extends SDK.Action
     */
    class FillLightAction extends Action {
        constructor() {
            super();
        }
        /**
         * @description Sets the level of adjustment
         * @param {number} lvl How much to blend the adjusted fill light, where 0 means only use the original and 100 means only use the adjusted fill light result. (Range: 0 to 100, Server default: 100)
         */
        blend(blend) {
            this.lvl = blend;
            return this;
        }
        /**
         * @description Sets the level of the bias
         * @param {number} biasLvl The bias to apply to the fill light effect (Range: -100 to 100, Server default: 0).
         */
        bias(biasLvl) {
            this.biasLvl = biasLvl;
            return this;
        }
        prepareQualifiers() {
            const qualifierValue = new QualifierValue(['fill_light', this.lvl, this.biasLvl]).setDelimiter(':');
            this.addQualifier(new Qualifier('e', qualifierValue));
            return this;
        }
    }

    /**
     * @extends SDK.Action
     * @description Converts the colors of every pixel in an image based on the supplied color matrix, in which the value of each color channel is calculated based on the values from all other channels (e.g. a 3x3 matrix for RGB, a 4x4 matrix for RGBA or CMYK, etc).<br/>
     * For every pixel in the image, take each color channel and adjust its value by the specified values of the matrix to get a new value.
     * @memberOf Actions.Adjust
     */
    class RecolorAction extends Action {
        constructor(recolorMatrix) {
            super();
            this.matrix = recolorMatrix;
            // Turn the matrix into a flat array of values
            // the values are ordered by row
            // [...row1, ...row2, ...row3, ..., row(n) ]
            const flat = [];
            for (let row = 0; row < recolorMatrix.length; row++) {
                for (let col = 0; col < recolorMatrix[row].length; col++) {
                    flat.push(recolorMatrix[row][col].toString());
                }
            }
            const qualifierValue = new QualifierValue(['recolor', ...flat]).setDelimiter(':');
            this.addQualifier(new Qualifier('e', qualifierValue));
        }
    }

    /**
     * @description OpacityAction class, used to define the opacity of an asset
     * @memberOf Actions.Adjust
     * @extends SDK.Action
     */
    class OpacityAdjustAction extends Action {
        constructor(level) {
            super();
            this._actionModel = { actionType: 'opacity' };
            this.level = level;
            this._actionModel.level = level;
            this.addQualifier(new Qualifier('o', level));
        }
        static fromJson(actionModel) {
            const { level } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            return new this(level);
        }
    }

    /**
     * @description Creates the 3D_lut layer transformation
     * @memberOf Actions.Adjust
     * @extends SDK.Action
     */
    class By3dLutAction extends Action {
        constructor(publicId) {
            super();
            this.publicId = publicId;
        }
        /**
         * Returns a string representation of the action
         * @return {string}
         */
        toString() {
            return `l_lut:${this.publicId}/fl_layer_apply`;
        }
    }

    /**
     * @description Defines how to improve an image by automatically adjusting image colors, contrast and brightness.</br>
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#e_improve|Image improvement effects}
     * @memberOf Actions.Adjust
     */
    class ImproveAction extends Action {
        constructor() {
            super();
            this._actionModel = { actionType: 'improve' };
        }
        /**
         *
         * @description The improve mode.
         * @param {Qualifiers.ImproveMode | string} value
         */
        mode(value) {
            this.modeValue = value;
            this._actionModel.mode = value;
            return this;
        }
        /**
         * @description How much to blend the improved result with the original image, where 0 means only use the original and 100 means only use the improved result. (Range: 0 to 100, Server default: 100)
         * @param {number} value
         */
        blend(value) {
            this.blendValue = value;
            this._actionModel.blend = value;
            return this;
        }
        prepareQualifiers() {
            const qualifierValue = new QualifierValue(['improve', this.modeValue, this.blendValue]).setDelimiter(':');
            this.addQualifier(new Qualifier('e', qualifierValue));
            return this;
        }
        static fromJson(actionModel) {
            const { mode, blend } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this();
            mode && result.mode(mode);
            blend && result.blend(blend);
            return result;
        }
    }

    /**
     * @description
     * Maps an input color and those similar to the input color to corresponding shades of a specified output color, taking luminosity and chroma into account, in order to recolor objects in your image in a natural way.</br>
     * More highly saturated input colors usually give the best results. It is recommended to avoid input colors approaching white, black, or gray.</br>
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#replace_color_effect|Replace color examples}
     * @memberOf Actions.Adjust
     */
    class ReplaceColorAction extends Action {
        /**
         * @description Sets the target output color.
         * @param {string} toColor - The HTML name or RGB/A hex code of the target output color.
         */
        constructor(toColor) {
            super();
            this.targetColor = toColor;
        }
        /**
         * @description Sets the tolerance threshold.
         * @param {number} toleranceLevel - The tolerance threshold (a radius in the LAB color space) from the input color, </br>
         *                                  representing the span of colors that should be replaced with a correspondingly adjusted version of the target output color. </br>
         *                                  Larger values result in replacing more colors within the image. </br>
         *                                  The more saturated the original input color, the more a change in value will impact the result (Server default: 50).
         * @return {this}
         */
        tolerance(toleranceLevel) {
            this.toleranceLevel = toleranceLevel;
            return this;
        }
        /**
         * @description Sets the base input color to map.
         * @param {string} baseColor - The HTML name or RGB/A hex code of the base input color to map (Server default: the most prominent high-saturation color in the image).
         * @return {this}
         */
        fromColor(baseColor) {
            this.baseColor = baseColor;
            return this;
        }
        prepareQualifiers() {
            // Target color and base color might not exist at this point (optional qualifiers)
            // If they exist, ensure that any # for RGB are removed from the resulting string
            const targetColor = this.targetColor && this.targetColor.toString().replace('#', '');
            const baseColor = this.baseColor && this.baseColor.toString().replace('#', '');
            const qualifierValue = new QualifierValue(['replace_color', targetColor, this.toleranceLevel, baseColor]);
            this.addQualifier(new Qualifier('e', qualifierValue));
            return this;
        }
    }

    /**
     * @description A class for all effects that include a blendPercentage method
     * @extends {Actions.Effect.LeveledEffectAction}
     * @memberOf Actions.Effect
     * @see Visit {@link Actions.Effect|Effect} for an example
     */
    class EffectActionWithBlend extends LeveledEffectAction {
        blend(value) {
            return this.setLevel(value);
        }
    }

    /**
     * Enhances an image to its best visual quality with the Viesus Automatic Image Enhancement add-on.</br>
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/viesus_automatic_image_enhancement_addon|Viesus Automatic Image Enhancement.}
     * @memberOf Actions.Adjust
     */
    class ViesusCorrectAdjustAction extends Action {
        /**
         * @description Enhances the image without correcting for red eye.
         */
        noRedEye() {
            this._noRedEye = true;
            return this;
        }
        /**
         * @description Applies saturation to the skin tones in the image.
         * @param level The saturation level. (Range: -100 to 100, Server default: 50).
         */
        skinSaturation(level) {
            this._skinSaturation = true;
            if (level) {
                this._skinSaturationLevel = level;
            }
            return this;
        }
        prepareQualifiers() {
            let value = 'viesus_correct';
            if (this._noRedEye) {
                value += ':no_redeye';
            }
            if (this._skinSaturation) {
                value += ':skin_saturation';
                if (typeof this._skinSaturationLevel !== 'undefined') {
                    value += `_${this._skinSaturationLevel}`;
                }
            }
            this.addQualifier(new Qualifier('e', value));
        }
    }

    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description Blends an image with one or more tint colors at a specified intensity. </br>
     *              You can optionally equalize colors before tinting and specify gradient blend positioning per color.</br>
     *              <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#tint|Tint effect examples}
     * @param {string} value The full tint effect value, provided as a string.
     * @return {Actions.Effect.SimpleEffectAction}
     */
    function tint(value = '') {
        return new SimpleEffectAction('tint', value);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description Adjusts the image or video brightness.
     * @param {number} level The level of brightness. (Range: -99 to 100, Server default: 80)
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function brightness(level) {
        return new EffectActionWithLevel('brightness', level);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description
     * Enhances an image to its best visual quality with the Viesus Automatic Image Enhancement add-on.</br>
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/viesus_automatic_image_enhancement_addon|Viesus Automatic Image Enhancement.}
     * @return {Actions.Adjust.ViesusCorrectAdjustAction}
     */
    function viesusCorrect() {
        return new ViesusCorrectAdjustAction();
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description Adjusts the image's red channel.
     * @param {number} level The level of red. (Range: -100 to 100, Server default: 0)
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function red(level) {
        return new EffectActionWithLevel('red', level);
    }
    /**
     * @summary action
     * @description Applies a sharpening filter to the image.
     * @memberOf Actions.Adjust
     * @param {number} strength The strength of the filter. (Range: 1 to 2000, Server default: 100)
     * @return {Actions.Effect.EffectActionWithStrength}
     */
    function sharpen(strength) {
        return new EffectActionWithStrength('sharpen', strength);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description Adjusts the color saturation.
     * @param {number} level The level of color saturation (Range: -100 to 100, Server default: 80).
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function saturation(level) {
        return new EffectActionWithLevel('saturation', level);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description Adjusts the image or video contrast.
     * @param {number} level The level of contrast. (Range: -100 to 100, Server default: 0)
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function contrast(level) {
        return new EffectActionWithLevel('contrast', level);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description
     * Adjusts the gamma level
     * @param {number} level The level of gamma (Range: -50 to 150, Server default: 0).
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function gamma(level) {
        return new EffectActionWithLevel('gamma', level);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description Adjusts the image's blue channel.
     * @param {number} level - The level of blue. (Range: -100 to 100, Server default: 0)
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function blue(level) {
        return new EffectActionWithLevel('blue', level);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description
     * Adjusts image brightness modulation in HSB to prevent artifacts in some images.
     * @param {number} level The level of modulation. (Range: -99 to 100, Server default: 80)
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function brightnessHSB(level) {
        return new EffectActionWithLevel('brightness_hsb', level);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description  Causes all semi-transparent pixels in an image to be either fully transparent or fully opaque.
     *
     * Each pixel with an opacity lower than the specified threshold value is set to an opacity of 0%. Each pixel with
     * an opacity greater than the specified threshold is set to an opacity of 100%. For example, setting
     * opacity_threshold:0 makes all pixels non-transparent, while opacity_threshold:100 makes all semi-transparent
     * pixels fully transparent. Note: This effect can be a useful solution when PhotoShop PSD files are delivered in a
     * format supporting partial transparency, such as PNG, and the results without this effect are not as expected.
     *
     * @param {number} level The level of the threshold. (Range: 1 to 100, Server default: 50)
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function opacityThreshold(level) {
        return new EffectActionWithLevel('opacity_threshold', level);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description
     * Adjusts the color balance and blends the result with the original image.
     * @param {number} blend How much to blend the adjusted color result, where 0 means only use the original and 100 means only use the adjusted color result. </br>
     *                                  (Range: 0 to 100, Server default: 100)
     * @return {Actions.Effect.EffectActionWithBlendPercentage}
     */
    function autoColor(blend) {
        return new EffectActionWithBlend('auto_color', blend);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description
     * Adjusts the brightness and blends the result with the original image.
     * @param {number} blend How much to blend the adjusted brightness, where 0 means only use the original
     *                 and 100 means only use the adjusted brightness result.
     *                 (Range: 0 to 100, Server default: 100)
     * @return {Actions.Effect.EffectActionWithBlendPercentage}
     */
    function autoBrightness(blend) {
        return new EffectActionWithBlend('auto_brightness', blend);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description
     * Adjusts the image's hue.
     * @param {number} level The level of hue. (Range: -100 to 100, Server default: 80)
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function hue(level) {
        return new EffectActionWithLevel('hue', level);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description Adjusts the image's green channel.
     * @param {number} level The level of green. (Range: -100 to 100, Server default: 0)
     * @return {Actions.Effect.EffectActionWithLevel}
     */
    function green(level) {
        return new EffectActionWithLevel('green', level);
    }
    /**
     * @summary action
     * @description Applies an unsharp mask filter to the image.
     * @memberOf Actions.Adjust
     * @param {number} strength The strength of the filter. (Range: 1 to 2000, Server default: 100)
     * @return {Actions.Effect.EffectActionWithStrength}
     */
    function unsharpMask(strength) {
        return new EffectActionWithStrength('unsharp_mask', strength);
    }
    /**
     * @summary action
     * @description Applies a vibrance filter on the image.
     * @memberOf Actions.Adjust
     * @param {number} strength The strength of the vibrance. (Range: -100 to 100, Server default: 20)
     * @return {Actions.Effect.EffectActionWithStrength}
     */
    function vibrance(strength) {
        return new EffectActionWithStrength('vibrance', strength);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description
     * Adjusts the contrast and blends the result with the original image.
     * @param {number} blend How much to blend the adjusted contrast, where 0 means only use the original
     *                 and 100 means only use the adjusted contrast result.
     *                (Range: 0 to 100, Server default: 100)
     * @return {Actions.Effect.EffectActionWithBlendPercentage}
     */
    function autoContrast(blend) {
        return new EffectActionWithBlend('auto_contrast', blend);
    }
    /**
     * @summary action
     * @description Adjusts the opacity of the image and makes it semi-transparent.
     * @memberOf Actions.Adjust
     * @param {number} level
     * @return {Actions.Adjust.OpacityAdjustAction}
     */
    function opacity(level) {
        return new OpacityAdjustAction(level);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description Adjusts the image colors, contrast and brightness.
     * @return {Actions.Adjust.ImproveAction}
     */
    function improve() {
        return new ImproveAction();
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description
     * Maps an input color and those similar to the input color to corresponding shades of a specified output color, taking luminosity and chroma into account, in order to recolor an object in a natural way.</br>
     * More highly saturated input colors usually give the best results. It is recommended to avoid input colors approaching white, black, or gray.
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#replace_color_effect|Replace color examples}
     * @param {string} toColor
     * @return {Actions.Adjust.ReplaceColorAction}
     */
    function replaceColor(toColor) {
        return new ReplaceColorAction(toColor);
    }
    /**
     * @summary action
     * @memberOf Actions.Adjust
     * @description Converts the colors of every pixel in an image based on the supplied color matrix, in which the value of each color channel is calculated based on the values from all other channels (e.g. a 3x3 matrix for RGB, a 4x4 matrix for RGBA or CMYK, etc).</br>
     * For every pixel in the image, take each color channel and adjust its value by the specified values of the matrix to get a new value.
     * @param {number[][]} matrix
     * @return {Actions.Adjust.RecolorAction}
     */
    function recolor(matrix) {
        return new RecolorAction(matrix);
    }
    /**
     * @summary action
     * @description Adjusts the fill light and blends the result with the original image.
     * @memberOf Actions.Adjust
     * @return {Actions.Adjust.FillLightAction}
     */
    function fillLight() {
        return new FillLightAction();
    }
    /**
     * @summary action
     * @description
     * Applies a look-up table (LUT) file to the image.</br>
     * The 3dl file should be pre-uploaded as a raw file
     *
     * @param {string} publicId The public ID of the LUT file.
     * @memberOf Actions.Adjust
     * @return {Actions.Adjust.By3dLutAction}
     */
    function by3dLut(publicId) {
        return new By3dLutAction(publicId);
    }
    const Adjust = { brightness, viesusCorrect, opacity, red, sharpen, improve, saturation,
        contrast, gamma, green, blue, brightnessHSB, hue, autoBrightness, autoColor,
        autoContrast, vibrance, unsharpMask, opacityThreshold, replaceColor, recolor, fillLight, by3dLut, tint };

    /**
     * @description
     * Defines the mode of blending to use when overlaying an image.
     * Even though BlendMode is technically an actionQualifier, it implements exactly the same functionality as an action.
     * This is true because Position is actually compounded of multiple qualifiers
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#blending_and_masking_layers|Overlay blending effects}
     *
     * @memberOf Qualifiers.BlendMode
     * @extends SDK.Action
     */
    class BlendModeQualifier extends Action {
        constructor(blendMode, level) {
            super();
            this.addQualifier(new Qualifier('e', new QualifierValue([blendMode, level])));
        }
    }

    /**
     * Validates that given obj is an IImageSourceModel
     * @param obj
     */
    function isIImageSourceModel(obj) {
        return obj && obj.sourceType === 'image';
    }

    /**
     * Validates that given obj is an IFetchSourceModel
     * @param obj
     */
    function isIFetchSourceModel(obj) {
        return obj && obj.sourceType === 'fetch';
    }

    /**
     * Validates that given obj is an IImageSourceModel
     * @param obj
     */
    function isITextSourceModel(obj) {
        return obj && obj.sourceType === 'text';
    }

    /**
     * Validates that given obj is an IImageSourceModel
     * @param obj
     */
    function isIAudioSourceModel(obj) {
        return obj && obj.sourceType === 'audio';
    }

    /**
     * Create Source from given model json
     * @param source
     * @param transformationFromJson
     */
    function createSourceFromModel(source, transformationFromJson) {
        if (isITextSourceModel(source)) {
            return TextSource.fromJson(source, transformationFromJson);
        }
        else if (isIImageSourceModel(source)) {
            return ImageSource.fromJson(source, transformationFromJson);
        }
        else if (isIFetchSourceModel(source)) {
            return FetchSource.fromJson(source, transformationFromJson);
        }
        else if (isIAudioSourceModel(source)) {
            return AudioSource.fromJson(source, transformationFromJson);
        }
        else {
            return VideoSource.fromJson(source, transformationFromJson);
        }
    }

    /**
     * Create Position from given IPositionModel
     * @param position
     */
    function createPositionFromModel(position) {
        const { offsetX, offsetY, tiled, allowOverflow, gravity } = position;
        const result = new PositionQualifier();
        if (offsetX) {
            result.offsetX(offsetX);
        }
        if (offsetY) {
            result.offsetY(offsetY);
        }
        if (tiled) {
            result.tiled();
        }
        if (allowOverflow != null) {
            result.allowOverflow(allowOverflow);
        }
        if (gravity) {
            result.gravity(createGravityFromModel(gravity));
        }
        return result;
    }

    /**
     * @description Defines a video range using startOffset, endOffset, duration.
     * @namespace TimelinePosition
     * @memberOf Qualifiers
     */
    /**
     * TimelinePosition
     * @memberOf Qualifiers.TimelinePosition
     */
    class TimelinePosition extends Action {
        constructor() {
            super();
            this._actionModel = {};
        }
        /**
         * @param {string | number} startOffset
         */
        startOffset(startOffset) {
            const startOffsetQualifier = new Qualifier('so', startOffset);
            this.addQualifier(startOffsetQualifier);
            this._actionModel.startOffset = startOffsetQualifier.qualifierValue.toString();
            return this;
        }
        /**
         * @param {string | number} endOffset
         */
        endOffset(endOffset) {
            const endOffsetQualifier = new Qualifier('eo', endOffset);
            this.addQualifier(endOffsetQualifier);
            this._actionModel.endOffset = endOffsetQualifier.qualifierValue.toString();
            return this;
        }
        /**
         * @param {string | number} duration
         */
        duration(duration) {
            const durationQualifier = new Qualifier('du', duration);
            this.addQualifier(durationQualifier);
            this._actionModel.duration = durationQualifier.qualifierValue.toString();
            return this;
        }
    }

    /**
     * Create TimelinePosition from given ITimelinePositionModel
     * @param timelinePosition
     */
    function createTimelinePositionFromModel(timelinePosition) {
        const { startOffset, endOffset, duration } = timelinePosition;
        const result = new TimelinePosition();
        if (startOffset) {
            result.startOffset(startOffset);
        }
        if (endOffset) {
            result.endOffset(endOffset);
        }
        if (duration) {
            result.duration(duration);
        }
        return result;
    }

    /**
     * @extends SDK.Action
     * @memberOf SDK
     * @description
     * A generic Layer action that can add a Video, Text or Image layer.<br>
     * This class can represent an overlay or an underlay.
     */
    class LayerAction extends Action {
        /**
         * @description Creates a LayerAction to be used with overlays and underlays
         * @param {ImageSource | TextSource | VideoSource} layerSource The Source used for the layer, use the builders provided {@link Qualifiers.Source|here}
         */
        constructor(layerSource) {
            super();
            this.source = layerSource;
            this._actionModel = {
                actionType: 'overlay',
                source: layerSource.toJson()
            };
        }
        /**
         * @description Sets the layerType to 'u' (underlay) or 'l' (overlay).
         * @param {'u' | 'l'} type
         * @return {this}
         */
        setLayerType(type) {
            this.layerType = type;
            this._actionModel.actionType = type === 'u' ? 'underlay' : 'overlay';
            return this;
        }
        /**
         * @description Sets the timeline position of the video layer
         * @param {Qualifiers.TimelinePosition} timelinePosition
         * @return {this}
         */
        timeline(timelinePosition) {
            this._timelinePosition = timelinePosition;
            this._actionModel.timelinePosition = timelinePosition.toJson();
            return this;
        }
        /**
         * @description Sets the position of the layer
         * @param {Qualifiers.Position} position
         * @return {this}
         */
        position(position) {
            this._position = position;
            this._actionModel.position = position.toJson();
            return this;
        }
        /**
         * @description Specifies how to blend the image overlay with the base overlay
         * @param {Qualifiers.BlendMode|BlendModeType} blendMode
         * @return {this}
         */
        blendMode(blendMode) {
            this._blendMode = blendMode;
            const [mode, level] = `${blendMode}`.replace('e_', '').split(":");
            if (mode === 'anti_removal') {
                this._actionModel.blendMode = level ? { blendModeType: 'antiRemoval', level: level } : { blendModeType: 'antiRemoval' };
            }
            else {
                this._actionModel.blendMode = { blendModeType: mode };
            }
            return this;
        }
        /**
         * @private
         * @description
         * Closes a layer (layers are built in three stages -> /Open/Transform/Close).
         * @return {SDK.Action}
         */
        closeLayer() {
            var _a, _b, _c, _d;
            const bit = new Action().addFlag(new FlagQualifier('layer_apply'));
            (_a = this._position) === null || _a === void 0 ? void 0 : _a.qualifiers.forEach((qualifier) => {
                bit.addQualifier(qualifier);
            });
            // Flags are stored separately from qualifiers, we need to add those as well
            (_b = this._position) === null || _b === void 0 ? void 0 : _b.flags.forEach((flag) => {
                bit.addFlag(flag);
            });
            if (typeof this._blendMode === "string") {
                bit.addQualifier(new Qualifier('e', this._blendMode));
            }
            else {
                (_c = this._blendMode) === null || _c === void 0 ? void 0 : _c.qualifiers.forEach((qualifier) => {
                    bit.addQualifier(qualifier);
                });
            }
            (_d = this._timelinePosition) === null || _d === void 0 ? void 0 : _d.qualifiers.forEach((qualifier) => {
                bit.addQualifier(qualifier);
            });
            return bit;
        }
        /**
         * @private
         * @description
         * Opens a layer (layers are built in three stages -> /Open/Transform/Close).
         * @return string
         */
        openLayer() {
            return `${this.source.getOpenSourceString(this.layerType)}`;
        }
        /**
         * @description
         * Serializes the Layer to a string
         * @return {string}
         */
        toString() {
            return [
                this.openLayer(),
                this.source.getTransformation() && this.source.getTransformation().toString(),
                this.closeLayer()
            ].filter((a) => a).join('/');
        }
        static fromJson(actionModel, transformationFromJson) {
            const { source, actionType, position, timelinePosition, blendMode } = actionModel;
            const sourceInstance = createSourceFromModel(source, transformationFromJson);
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(sourceInstance);
            const layerType = actionType === 'overlay' ? 'l' : 'u';
            result.setLayerType(layerType);
            if (position) {
                result.position(createPositionFromModel(position));
            }
            if (timelinePosition) {
                result.timeline(createTimelinePositionFromModel(timelinePosition));
            }
            if (blendMode) {
                const blendModeType = ACTION_TYPE_TO_BLEND_MODE_MAP[blendMode.blendModeType] || blendMode.blendModeType;
                if (blendMode === null || blendMode === void 0 ? void 0 : blendMode.level) {
                    result.blendMode(new BlendModeQualifier(blendModeType, blendMode.level));
                }
                else {
                    result.blendMode(new BlendModeQualifier(blendModeType));
                }
            }
            return result;
        }
    }

    /**
     * @description Adds a video, text or an image layer as an overlay over the base layer. </br>
     * @memberOf Actions
     * @namespace Overlay
     * @see Visit {@link Qualifiers.TextStyle|TextStyle} for advanced text options
     * @see {@link Actions.Underlay| The underlay action}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const myVideo = yourCldInstance.video('dog');
     *
     * import {source} from "@cloudinary/url-gen/actions/overlay"
     * import {image, video, text} from "@cloudinary/url-gen/qualifiers/source"
     * import {TextStyle} from '@cloudinary/url-gen/qualifiers/textStyle
     *
     * myVideo.overlay(
     *       source(image('myImage'))
     *     )
     *
     * myVideo.overlay(
     *       source(video('myVideo'))
     *     )
     *
     * myVideo.overlay(
     *       source(text('My text'), 'arial_15')
     *     )
     *
     * // Or a text with more complex options
     * myVideo.overlay(
     *       source(text('My text'), new TextStyle('arial', 50))
     *     )
     */
    /**
     * @summary action
     * @memberOf Actions.Overlay
     * @description Adds a layer for an asset
     * @param {Qualifiers.Source.ImageSource | Qualifiers.Source.TextSource | Qualifiers.Source.VideoSource} source
     *        The Source used for the layer, use the functions provided {@link Qualifiers.Source|here} to easily create these objects
     * @return {SDK.LayerAction}
     */
    function source$1(source) {
        return new LayerAction(source)
            .setLayerType('l');
    }
    const Overlay = { source: source$1 };

    /**
     * @memberOf Actions
     * @namespace Underlay
     * @description Adds an image or a text layer as an underlay under the base layer. </br>
     * @see Visit {@link Qualifiers.TextStyle|TextStyle} for advanced text options
     * @see {@link Actions.Overlay| The overlay action}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const myVideo = yourCldInstance.video('dog');
     *
     * import {source} from "@cloudinary/url-gen/actions/underlay"
     * import {image, video, text} from "@cloudinary/url-gen/qualifiers/source"
     * import {TextStyle} from '@cloudinary/url-gen/qualifiers/textStyle
     *
     * myVideo.underlay(
     *       source(image('myImage'))
     *     )
     *
     * myVideo.underlay(
     *       source(video('myVideo'))
     *     )
     *
     * myVideo.underlay(
     *       source(text('My text'), 'arial_15')
     *     )
     *
     * // Or a text with more complex options
     * myVideo.underlay(
     *       source(text('My text'), new TextStyle('arial', 50))
     *     )
     */
    /**
     * @summary action
     * @description Adds a layer for an asset
     * @param {Qualifiers.Source.ImageSource | Qualifiers.Source.TextSource} source
     *        The Source used for the layer, use the functions provided {@link Qualifiers.Source|here} to easily create these objects
     * @memberOf Actions.Underlay
     * @return {SDK.LayerAction}
     */
    function source(source) {
        return new LayerAction(source)
            .setLayerType('u');
    }
    const Underlay = { source };

    /**
     * @description Applies a pre-defined named transformation of the given name, used with a builder from {@link Actions.NamedTransformation|Named Transformation}
     * @extends SDK.Action
     * @memberOf Actions.NamedTransformation
     * @see Visit {@link Actions.NamedTransformation|Named Transformation} for an example
     */
    class NamedTransformationAction extends Action {
        /**
         *
         * @param {string} name The name of the named transformation
         */
        constructor(name) {
            super();
            this.addQualifier(new Qualifier('t', name));
        }
    }

    /**
     * Applies a pre-defined named transformation of the given name.
     * @memberOf Actions
     * @namespace NamedTransformation
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {name} from "@cloudinary/url-gen/actions/namedTransformation";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.namedTransformation(
     *  name('my_named_transformation'),
     * );
     */
    /**
     * @summary action
     * @description Applies a pre-defined named transformation of the given name.
     * @param {string} name Transformation name
     * @memberOf Actions.NamedTransformation
     * @return {Actions.NamedTransformation.NamedTransformationAction}
     */
    function name(name) {
        return new NamedTransformationAction(name);
    }
    const NamedTransformation = { name };

    /**
     * @description Controls the quality of the delivered image or video.
     * @memberOf Actions.Delivery
     * @extends {Actions.Delivery.DeliveryAction}
     * @see Visit {@link Actions.Delivery|Delivery} for an example
     */
    class DeliveryQualityAction extends DeliveryAction {
        /**
         * @param {Qualifiers.Quality} qualityValue a Quality value
         */
        constructor(qualityValue) {
            super('q', qualityValue.toString(), 'level');
        }
        /**
         * Selet the Chroma sub sampling</br>
         * <b>Learn more</b>: {@link https://cloudinary.com/documentation/image_optimization#toggle_chroma_subsampling|Toggling chroma subsampling}
         * @param {420 | 444 | number} type The chroma sub sampling type
         */
        chromaSubSampling(type) {
            this._actionModel.chromaSubSampling = CHROMA_VALUE_TO_CHROMA_MODEL_ENUM[type];
            const qualityWithSubSampling = new QualifierValue([this._actionModel.level, type]);
            qualityWithSubSampling.setDelimiter(':');
            // We either have chroma or quantization, but not both
            return this.addQualifier(new Qualifier('q', qualityWithSubSampling));
        }
        /**
         * Controls the final quality by setting a maximum quantization percentage
         * @param {number} val
         */
        quantization(val) {
            this._actionModel.quantization = val;
            const qualityWithQuantization = new QualifierValue([this._actionModel.level, `qmax_${val}`]).setDelimiter(':');
            // We either have chroma or quantization, but not both
            return this.addQualifier(new Qualifier('q', qualityWithQuantization));
        }
        static fromJson(actionModel) {
            const { level, chromaSubSampling, quantization } = actionModel;
            const levelType = ACTION_TYPE_TO_QUALITY_MODE_MAP[level] || level;
            const result = new this(levelType);
            if (chromaSubSampling) {
                //Turn strings like 'CHROMA_420' to 420
                const chromaValue = CHROMA_MODEL_ENUM_TO_CHROMA_VALUE[chromaSubSampling.toUpperCase()];
                chromaValue && result.chromaSubSampling(+chromaValue);
            }
            quantization && result.quantization(quantization);
            return result;
        }
    }

    /**
     * @description Specifies the ICC profile to use for the color space.
     * @memberOf Actions.Delivery
     * @extends SDK.Action
     * @see Visit {@link Actions.Delivery|Delivery} for an example
     */
    class DeliveryColorSpaceFromICCAction extends Action {
        /**
         * @param {string} publicId
         */
        constructor(publicId) {
            super();
            this._actionModel = {};
            this._actionModel.actionType = 'colorSpaceFromICC';
            this._actionModel.publicId = publicId;
            const qualifierValue = new QualifierValue(['icc', publicId]).setDelimiter(':');
            this.addQualifier(new Qualifier('cs', qualifierValue));
        }
        static fromJson(actionModel) {
            const { publicId } = actionModel;
            return new this(publicId);
        }
    }

    /**
     * @description Specifies the color space to use.
     * @memberOf Actions.Delivery
     * @extends SDK.Action
     * @see Visit {@link Actions.Delivery|Delivery} for an example
     */
    class DeliveryColorSpaceAction extends Action {
        /**
         * Create a new DeliveryColorSpaceAction
         * @param mode
         */
        constructor(mode) {
            super();
            this._actionModel = {};
            this._actionModel = {
                actionType: 'colorSpace',
                mode: (COLOR_SPACE_MODE_TO_COLOR_SPACE_MODEL_MODE_MAP[mode] || mode)
            };
            this.addQualifier(new Qualifier('cs', ColorSpace[mode] ? ColorSpace[mode]() : mode));
        }
        static fromJson(actionModel) {
            const { mode } = actionModel;
            const colorSpaceMode = COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP[mode] || mode;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            return new this(colorSpaceMode);
        }
    }

    /**
     * @description Specifies the dpr.
     * @memberOf Actions.Delivery
     * @extends SDK.Action
     * @see Visit {@link Actions.Delivery|Delivery} for an example
     */
    class DeliveryDPRAction extends Action {
        /**
         * Create a new DeliveryDPRAction
         * @param dprValue
         */
        constructor(dprValue) {
            super();
            this._actionModel = { actionType: 'dpr' };
            // toFloatAsString is used to ensure 1 turns into 1.0
            const dprAsFloat = toFloatAsString(dprValue);
            this._actionModel.dpr = dprAsFloat;
            this.addQualifier(new Qualifier('dpr', dprAsFloat));
        }
        static fromJson(actionModel) {
            const { dpr } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            return new this(dpr);
        }
    }

    /**
     * @description Defines transformations for delivering your assets without changing the visual or audio experience for the end user.
     * @memberOf Actions
     * @namespace Delivery
     * @example
     * See the examples under every method
     */
    /**
     * @summary action
     * @description Defines the format of the delivered asset.
     *
     * <b>Learn more:</b>
     * {@link https://cloudinary.com/documentation/image_transformations#image_format_support|Image formats}
     * {@link https://cloudinary.com/documentation/video_manipulation_and_delivery#transcoding_video_to_other_formats|Video formats}
     *
     * @memberOf Actions.Delivery
     * @param {string} format The file format. For a list of supported format types see {@link Qualifiers.Format| format types} for
     * possible values
     * @return {Actions.Delivery.DeliveryFormat}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {format} from "@cloudinary/url-gen/actions/delivery";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.delivery(
     *  format('jpg'),
     * );
     *
     */
    function format(format) {
        return new DeliveryFormatAction('f', format);
    }
    /**
     * @summary action
     * @description Deliver the image in the specified device pixel ratio.
     * @memberOf Actions.Delivery
     * @param {string} dpr The DPR (Device Pixel Ratio). Any positive float value.
     * @return {Actions.Delivery.DeliveryAction}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {dpr} from "@cloudinary/url-gen/actions/delivery";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.delivery(
     *  dpr('2.0'),
     * );
     */
    function dpr(dpr) {
        return new DeliveryDPRAction(dpr);
    }
    /**
     * @summary action
     * @description Controls the quality of the delivered image or video.
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/image_optimization#how_to_optimize_image_quality|Image quality}
     *  {@link https://cloudinary.com/documentation/video_optimization#how_to_optimize_video_quality|Video quality}
     * @memberOf Actions.Delivery
     * @param {QualityTypes | string | number | Qualifiers.Quality} qualityType For a list of supported quality types see
     * {@link Qualifiers.Quality| quality types} for
     * possible values.
     * @return {Actions.Delivery.DeliveryQualityAction}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {quality} from "@cloudinary/url-gen/actions/delivery";
     * import {quality} from "@cloudinary/url-gen/qualifiers/quantity";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.delivery(
     *  quality('auto'),
     * );
     */
    function quality(qualityType) {
        return new DeliveryQualityAction(qualityType);
    }
    /**
     * @summary action
     * @description Controls the density to use when delivering an image or when converting a vector file such as a PDF or EPS
     * document to a web image delivery format.
     * @memberOf Actions.Delivery
     * @param {number | string} value The density in dpi.
     * @return {Actions.Delivery.DeliveryAction}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {density} from "@cloudinary/url-gen/actions/delivery";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.delivery(
     *  density(150),
     * );
     */
    function density(value) {
        return new DeliveryAction('dn', value, 'density');
    }
    /**
     * @summary action
     * @description Default images can be used in the case that a requested image does not exist.
     * @memberOf Actions.Delivery
     * @param {string} publicIdWithExtension Default image public ID
     * @return {Actions.Delivery.DeliveryAction}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {defaultImage} from "@cloudinary/url-gen/actions/delivery";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.delivery(
     *  defaultImage('sample'),
     * );
     */
    function defaultImage(publicIdWithExtension) {
        return new DeliveryAction('d', publicIdWithExtension, 'defaultImage');
    }
    /**
     * @summary action
     * @description Controls the color space used for the delivered image.
     * @memberOf Actions.Delivery
     * @param {string | Qualifiers.ColorSpace} mode The color space.
     * @return {Actions.Delivery.DeliveryAction}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {colorSpace} from "@cloudinary/url-gen/actions/delivery";
     * import {trueColor} from "@cloudinary/url-gen/qualifiers/colorSpace";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.delivery(
     *  colorSpace(trueColor()),
     * );
     */
    function colorSpace(mode) {
        return new DeliveryColorSpaceAction(mode);
    }
    /**
     * @summary action
     * @description Specifies the ICC profile to use for the color space.
     * The ICC file must be uploaded to your account as a raw, authenticated file.
     * @memberOf Actions.Delivery
     * @param {string} publicId The public ID (including the file extension) of the ICC profile that defines the
     * color space.
     * @return {Actions.Delivery.DeliveryColorSpaceFromICC}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {colorSpaceFromICC} from "@cloudinary/url-gen/actions/delivery";
     * import {trueColor} from "@cloudinary/url-gen/qualifiers/colorSpace";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.delivery(
     *  colorSpaceFromICC('sample.icc'),
     * );
     */
    function colorSpaceFromICC(publicId) {
        return new DeliveryColorSpaceFromICCAction(publicId);
    }
    const Delivery = {
        format,
        dpr,
        density,
        defaultImage,
        colorSpace,
        colorSpaceFromICC,
        quality
    };

    /**
     * @memberOf Actions.CustomFunction
     * @see Visit {@link Actions.CustomFunction|Custom functions} for an example
     */
    class CustomFunctionAction extends Action {
        /**
         *
         * @param {string} fn The custom function to use, can be a URL or a publicID
         */
        constructor(fn) {
            super();
            this.fn = fn;
        }
        encodeCustomFunctionString(fn) {
            const encodedSource = base64Encode$1(fn);
            return encodedSource;
        }
        /**
         * Use a WASM as a custom function,
         * Used with the builders of `remote` and `wasm` from {@link Actions.CustomFunction|Custom functions}
         */
        asWasm() {
            this.mode = 'wasm';
            return this;
        }
        /**
         * Use a remote URL as a custom function
         * Used with the builders of `remote` and `wasm` from {@link Actions.CustomFunction|Custom functions}
         */
        asRemote() {
            this.mode = 'remote';
            return this;
        }
        prepareQualifiers() {
            this.encodedFn = this.fn;
            if (this.mode === 'remote') {
                this.encodedFn = this.encodeCustomFunctionString(this.fn);
            }
            return this.addQualifier(new Qualifier('fn', new QualifierValue([this.pre, this.mode, this.encodedFn])));
        }
        toString() {
            return super.toString()
                .replace(/\//g, ':');
        }
    }
    var CustomFunctionAction$1 = CustomFunctionAction;

    class RemoteAction extends CustomFunctionAction$1 {
        constructor(fn) {
            /* istanbul ignore next */
            // Required due to https://github.com/microsoft/TypeScript/issues/13029
            super(fn);
        }
        preprocess() {
            this.pre = 'pre';
            return this;
        }
    }
    var RemoteAction$1 = RemoteAction;

    /**
     * Calls a custom function. </br>
     * Learn more: {@link https://cloudinary.com/documentation/custom_functions|Custom functions}
     * @memberOf Actions
     * @namespace CustomFunction
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {remote, wasm} from "@cloudinary/url-gen/actions/customFunction";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.customFunction(
     *  remote('http://example.com')
     * );
     *
     * image.customFunction(
     *  wasm('myPublicID'); // publicID from Cloudinary
     * );
     */
    /**
     * @summary action
     * @description - Calls a custom function. </br>
     * For more information about remote custom functions see {@link https://cloudinary.com/documentation/custom_functions#remote_functions|the documentation}
     * @param {string} path - Specifies the URL of the remote custom function.
     * @memberOf Actions.CustomFunction
     * @return {Actions.CustomFunctionAction}
     */
    function remote(path) {
        return new RemoteAction$1(path)
            .asRemote();
    }
    /**
     * @summary action
     * @description - Calls a custom function.  </br>
     * For more information about wasm custom functions see {@link https://cloudinary.com/documentation/custom_functions#webassembly_functions|the documentation}
     * @param {string} publicID - Specifies the publicID of the custom function stored in Cloudinary
     * @memberOf Actions.CustomFunction
     * @return {Actions.CustomFunctionAction}
     */
    function wasm(publicID) {
        return new CustomFunctionAction$1(publicID)
            .asWasm();
    }
    const CustomFunction = { remote, wasm };

    /**
     * @description Class for shortening a video to the specified range.
     * @extends SDK.Action
     * @memberOf Actions.VideoEdit
     * @see Visit {@link Actions.VideoEdit|VideoEdit} for an example
     */
    class TrimAction extends Action {
        constructor() {
            super();
            this._actionModel = {
                actionType: 'trimVideo'
            };
        }
        /**
         *
         * @description Support Percentages in values (30% -> 30p)
         * @param {string|number} val
         * @private
         * @return {string}
         */
        parseVal(val) {
            return typeof val === 'number' ? val : val.replace('%', 'p');
        }
        /**
         * @description Sets the starting position of the part of the video to keep when trimming videos.
         *
         * @param {string|number} offset The starting position of the part of the video to keep. This can be specified as a
         *                           float representing the time in seconds or a string representing the percentage of the
         *                           video length (for example, "30%" or "30p").
         * @return {this}
         */
        startOffset(offset) {
            this._actionModel.startOffset = getAuto(offset) || +offset;
            return this.addQualifier(new Qualifier('so', this.parseVal(offset)));
        }
        /**
         * @description Sets the end position of the part of the video to keep when trimming videos.
         *
         * @param {string|number} offset The end position of the part of the video to keep. This can be specified as a
         *                         float representing the time in seconds or a string representing the percentage of the
         *                         video length (for example, "30%" or "30p").
         * @return {this}
         */
        endOffset(offset) {
            this._actionModel.endOffset = getAuto(offset) || +offset;
            return this.addQualifier(new Qualifier('eo', this.parseVal(offset)));
        }
        /**
         * @description Sets the duration of the video to keep.
         *
         * @param {string|number} duration The length of the part of the video to keep. This can be specified as a float
         *                        representing the time in seconds or a string representing the percentage of the
         *                        video length (for example, "30%" or "30p").
         * @return {this}
         */
        duration(duration) {
            this._actionModel.duration = duration;
            return this.addQualifier(new Qualifier('du', this.parseVal(duration)));
        }
        static fromJson(actionModel) {
            const { duration, startOffset, endOffset } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this();
            if (duration != null) {
                result.duration(duration);
            }
            if (startOffset != null) {
                result.startOffset(startOffset);
            }
            if (endOffset != null) {
                result.endOffset(endOffset);
            }
            return result;
        }
    }
    /**
     * Helper function that either gets 'auto' or return null
     */
    const getAuto = (value) => value === 'auto' ? value : null;
    var TrimAction$1 = TrimAction;

    /**
     * @description Class for Concatenating another video.
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_trimming_and_concatenating#concatenating_media|Concatenating videos}
     * @extends SDK.Action
     * @memberOf Actions.VideoEdit
     * @see Visit {@link Actions.VideoEdit|VideoEdit} for an example
     */
    class ConcatenateAction extends Action {
        /**
         *
         * @param {Qualifiers.Source.VideoSource | Qualifiers.Source.ImageSource | Qualifiers.Source.FetchSource} source
         *         the Source to concatenate
         */
        constructor(source) {
            super();
            this._actionModel = {
                actionType: 'concatenate',
                source: source.toJson()
            };
            this.concatSource = source;
        }
        /**
         * @description Sets the transition between a video and a concatenated source
         * @param {Qualifiers.Transition.VideoSource} source The source to concatenate.
         * @return {this}
         */
        transition(source) {
            this._actionModel.transition = source.toJson();
            this._transition = source;
            return this;
        }
        /**
         * @description Prepend the concatenated video - Adds the video before the original
         * @return {this}
         */
        prepend() {
            this._actionModel.prepend = true;
            this._prepend = true;
            return this;
        }
        /**
         * The duration in seconds
         * @param {number} sec
         * @return {this}
         */
        duration(sec) {
            this._actionModel.duration = sec;
            this._duration = sec;
            return this;
        }
        /**
         * @description Get the transitionString for the toString() method
         * @return {string}
         */
        getTransitionString() {
            const transTx = this._transition.getTransformation();
            return [
                `e_transition,${this._transition.getOpenSourceString('l')}`,
                transTx && transTx.toString(),
                'fl_layer_apply'
            ].filter((a) => a).join('/');
        }
        /**
         * @description Get the string representation of the Concatenation action
         */
        toString() {
            /*
             *
             * The toString() method is composed of several steps due to the complex nature of the concatenate transformation.
             *
             * First, we calculate the open and close parts of the top-level transformation:
             *   - {open}/{sourceTransformation}/{close}
             *
             * Unlike a regular overlay, there are multiple 'bits' appended to the open and close parts of the tx.
             * - duration (du_) might be prepended on the opening of the layer (du_5,l_sample)
             * - fl_splice is also added, but only if a transition is not needed.
             *
             * once we've calculated the open and close parts, we now need to deal with the Transition.
             * the transition is an inner transformation on the source with a special effect (e_transition) appended to it.
             *
             * To calculate the transition string, we need to take the transformation from the source(assuming it has one)
             */
            // Calculate the open part
            const open = [
                this._duration && `du_${this._duration}`,
                !this._transition && `fl_splice`,
                `${this.concatSource.getOpenSourceString('l')}`
            ].filter((a) => a).join(',');
            // Calculate the open part
            const close = [
                'fl_layer_apply',
                this._prepend && 'so_0'
            ].filter((a) => a).join(',');
            // Calculate the Transition part
            let concatSourceTx;
            if (this.concatSource.getTransformation()) {
                concatSourceTx = this.concatSource.getTransformation();
            }
            else {
                concatSourceTx = new Transformation$1();
            }
            if (this._transition) {
                concatSourceTx.addTransformation(this.getTransitionString());
            }
            // Put it all together, the transition is already part of the concatSourceTx
            return [
                open,
                concatSourceTx.toString(),
                close
            ].filter((a) => a).join('/');
        }
        static fromJson(actionModel, transformationFromJson) {
            const { source, transition, prepend, duration } = actionModel;
            const sourceInstance = createSourceFromModel(source, transformationFromJson);
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(sourceInstance);
            if (transition) {
                result.transition(VideoSource.fromJson(transition, transformationFromJson));
            }
            if (prepend) {
                result.prepend();
            }
            if (duration) {
                result.duration(duration);
            }
            return result;
        }
    }
    var ConcatenateAction$1 = ConcatenateAction;

    /**
     * @description Class to Controls the volume of an audio or video file.
     * @extends SDK.Action
     * @memberOf Actions.VideoEdit
     * @see Visit {@link Actions.VideoEdit|VideoEdit} for an example
     */
    class VolumeAction extends Action {
        constructor(volumeValue) {
            super();
            let volumeValueModel = { mode: 'mute' };
            if (volumeValue !== 'mute') {
                volumeValueModel = {
                    mode: (`${volumeValue}`.endsWith('db') ? 'decibels' : 'percent'),
                    value: +(`${volumeValue}`.replace('db', ''))
                };
            }
            this._actionModel = {
                actionType: 'volume',
                volumeValue: volumeValueModel
            };
            const qualifierValue = new QualifierValue(['volume', volumeValue]).setDelimiter(':');
            this.addQualifier(new Qualifier('e', qualifierValue));
        }
        static fromJson(actionModel) {
            const { volumeValue } = actionModel;
            const { mode } = volumeValue;
            const value = mode === 'mute' ? mode : volumeValue.value;
            const suffix = (mode === 'mute' || mode === "percent") ? '' : 'db';
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            return new this(`${value}${suffix}`);
        }
    }
    var VolumeAction$1 = VolumeAction;

    /**
     * @description Class for creating a preview of a video
     * @memberOf Actions.VideoEdit
     * @extends SDK.Action
     * @see Visit {@link Actions.VideoEdit|VideoEdit} for an example
     */
    class PreviewAction extends Action {
        constructor() {
            super();
            this._actionModel = {
                actionType: 'preview'
            };
        }
        /**
         * @description Control the duration of the video segments
         * @param {string|number} minSegDuration The duration of a video segment
         * @return {this}
         */
        minimumSegmentDuration(minSegDuration) {
            this._actionModel.minimumSegmentDuration = +minSegDuration;
            this._minSeg = minSegDuration;
            return this;
        }
        /**
         * @description Control the number of the video segments
         * @param {string|number} maxSeg The number of the video segments.
         * @return {this}
         */
        maximumSegments(maxSeg) {
            this._actionModel.maximumSegments = +maxSeg;
            this._maxSeg = maxSeg;
            return this;
        }
        /**
         * @description control the length of the generated preview
         * @param {string|number} duration The duration in seconds such as 1.2, or 5.0
         * @return {this}
         */
        duration(duration) {
            this._actionModel.duration = +duration;
            this._duration = duration;
            return this;
        }
        toString() {
            return [
                'e_preview',
                this._duration && `duration_${toFloatAsString(this._duration)}`,
                this._maxSeg && `max_seg_${this._maxSeg}`,
                this._minSeg && `min_seg_dur_${toFloatAsString(this._minSeg)}`
            ].filter((a) => a).join(':');
        }
        static fromJson(actionModel) {
            const { duration, maximumSegments, minimumSegmentDuration } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this();
            if (duration != null) {
                result.duration(duration);
            }
            if (maximumSegments != null) {
                result.maximumSegments(maximumSegments);
            }
            if (minimumSegmentDuration != null) {
                result.minimumSegmentDuration(minimumSegmentDuration);
            }
            return result;
        }
    }

    /**
     * @summary action
     * @description Methods for editing a video.
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/video_manipulation_and_delivery|Video manipulation}
     * @memberOf Actions
     * @namespace VideoEdit
     * @example
     * See the examples under every method
     */
    /**
     * @summary action
     * @description Concatenates another video.
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_trimming_and_concatenating#concatenating_media|Concatenating videos}
     *
     * @memberOf Actions.VideoEdit
     * @param {VideoSource} source The source to concatenate.
     * @return {Actions.VideoEdit.ConcatenateAction}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {concatenate} from "@cloudinary/url-gen/actions/videoEdit";
     * import {videoSource as concatVideoSource} from "@cloudinary/url-gen/qualifiers/concatenate";
     * import {videoSource as tVideoSource} from "@cloudinary/url-gen/qualifiers/transition.js";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.videoEdit( concatenate(concatVideoSource('butterfly'))
     *  .transition(tVideoSource('myTransition'))
     *  .duration(5)
     * )
     */
    function concatenate(source) {
        return new ConcatenateAction$1(source);
    }
    /**
     * @summary action
     * @description Trims a video (and discards the rest).
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_trimming_and_concatenating#trimming_videos|
      * Trimming videos}
     *
     * @memberOf Actions.VideoEdit
     * @return {Actions.VideoEdit.TrimAction}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {trim} from "@cloudinary/url-gen/actions/videoEdit";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.videoEdit( trim()
     *  .startOffset(3)
     *  .endOffset(4)
     *  .duration(10)
     * )
     */
    function trim() {
        return new TrimAction$1();
    }
    /**
     * @summary action
     * @description Increases or decreases the volume by a percentage of the current volume.
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/audio_transformations#adjust_the_audio_volume|
      * Adjust the audio volume}
     *
     * @memberOf Actions.VideoEdit
     * @param {string | number} volumeValue The value of volume. The percentage change of volume (Range: -100 to 400).
     * For a list of supported types see {@link Qualifiers.Volume| Volume values}
     * @return {Actions.VideoEdit.VolumeAction}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {volume} from "@cloudinary/url-gen/actions/videoEdit";
     * import {mute} from '@cloudinary/url-gen/qualifiers/volume';
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.videoEdit( volume(10) ) // as percent
     * video.videoEdit( volume('5db') ) // as decibels
     * video.videoEdit( volume(mute()) ) // if you prefer silence..
     */
    function volume(volumeValue) {
        return new VolumeAction$1(volumeValue);
    }
    /**
     * @summary action
     * @description A video preview is a short excerpt from a video that can be used to engage your audience and help them select the video content that interests them.
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_effects_and_enhancements#ai_based_video_preview|
      * Create a video preview}
     *
     * @memberOf Actions.VideoEdit
     * @return {Actions.VideoEdit.PreviewAction}
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {preview} from "@cloudinary/url-gen/actions/videoEdit";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.videoEdit( preview()
     *  .duration(5)
     *  .minimumSegmentDuration(1)
     *  .maximumSegments(10)
     * )
     */
    function preview() {
        return new PreviewAction();
    }
    const VideoEdit = { concatenate, trim, volume, preview };

    /**
     * @extends SDK.Action
     * @memberOf Actions.Transcode
     * @description  Defines the video bitrate in bits per second.
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_optimization#bitrate_control|Bitrate control}
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    class BitRateAction extends Action {
        constructor(bitRate) {
            super();
            this.isConstant = false;
            this._actionModel = { actionType: 'bitRate' };
            this.bitRate = bitRate;
            this._actionModel.bitRate = bitRate;
        }
        /**
         * @description video plays with a constant bitrate (CBR).
         */
        constant() {
            this.isConstant = true;
            this._actionModel.constant = true;
            return this;
        }
        prepareQualifiers() {
            let qualifierValue;
            if (this.isConstant) {
                qualifierValue = new QualifierValue([this.bitRate, 'constant']).setDelimiter(':');
            }
            else {
                qualifierValue = new QualifierValue(this.bitRate);
            }
            this.addQualifier(new Qualifier('br', qualifierValue));
            return this;
        }
        static fromJson(actionModel) {
            const { bitRate, constant } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(bitRate);
            constant && result.constant();
            return result;
        }
    }
    var BitRateAction$1 = BitRateAction;

    /**
     * @extends SDK.Action
     * @memberOf Actions.Transcode
     * @description Controls the audio codec or removes the audio channel.
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/audio_transformations#audio_frequency_control|Audio codec settings}
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    class AudioCodecAction extends Action {
        constructor(codec) {
            super();
            this._actionModel = { actionType: 'audioCodec' };
            this.addQualifier(new Qualifier('ac', codec));
            this._actionModel.audioCodec = codec;
        }
        static fromJson(actionModel) {
            const { audioCodec } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(audioCodec);
            return result;
        }
    }
    var AudioCodecAction$1 = AudioCodecAction;

    /**
     * @extends SDK.Action
     * @memberOf Actions.Transcode
     * @description Controls audio sample frequency.
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/audio_transformations#audio_codec_settings|Audio frequency control}
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    class AudioFrequencyAction extends Action {
        constructor(freq) {
            super();
            this._actionModel = { actionType: 'audioFrequency' };
            this.addQualifier(new Qualifier('af', freq));
            this._actionModel.audioFrequencyType = freq;
        }
        static fromJson(actionModel) {
            const { audioFrequencyType } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(audioFrequencyType.replace('freq', ''));
            return result;
        }
    }
    var AudioFrequencyAction$1 = AudioFrequencyAction;

    /**
     * @extends SDK.Action
     * @memberOf Actions.Transcode
     * @description Controls the range of acceptable FPS (Frames Per Second) to ensure that video (even when optimized)
     * is delivered with
     * an expected FPS level (helps with sync to audio).
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_transformation_reference#video_settings|Video settings}
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    class FPSRangeAction extends Action {
        constructor(from, to) {
            super();
            this._actionModel = {};
            this.from = from;
            this._actionModel = {
                actionType: 'fps',
                fps: { from }
            };
            if (to != null) {
                this.to = to;
                this._actionModel.fps.to = to;
            }
        }
        prepareQualifiers() {
            let qualifierValue;
            if (this.from && this.to) {
                qualifierValue = new QualifierValue(`${this.from}-${this.to}`);
            }
            else {
                qualifierValue = new QualifierValue(`${this.from}-`);
            }
            this.addQualifier(new Qualifier('fps', qualifierValue));
            return this;
        }
    }
    var FPSRangeAction$1 = FPSRangeAction;

    /**
     * @extends SDK.Action
     * @memberOf Actions.Transcode
     * @description Controls the FPS (Frames Per Second) to ensure that video (even when optimized)
     * is delivered with
     * an expected FPS level (helps with sync to audio).
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_transformation_reference#video_settings|Video settings}
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    class FPSAction extends Action {
        constructor(from) {
            super();
            this._actionModel = { actionType: 'fps' };
            this._actionModel.fps = from;
            this.addQualifier(new Qualifier('fps', from));
        }
        static fromJson(actionModel) {
            const { fps } = actionModel;
            let result;
            if (typeof fps === 'object') {
                //@ts-ignore
                result = new FPSRangeAction$1(fps.from, fps.to);
            }
            else {
                result = new this(fps);
            }
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            return result;
        }
    }
    var FPSAction$1 = FPSAction;

    /**
     * @extends SDK.Action
     * @memberOf Actions.Transcode
     * @description Controls the keyframe interval of the delivered video.
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    class KeyframeIntervalsAction extends Action {
        constructor(interval) {
            super();
            this._actionModel = { actionType: 'keyframeInterval' };
            this._actionModel.interval = interval;
            this.addQualifier(new Qualifier('ki', toFloatAsString(interval)));
        }
        static fromJson(actionModel) {
            const { interval } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(interval);
            return result;
        }
    }
    var KeyframeIntervalsAction$1 = KeyframeIntervalsAction;

    /**
     * @extends SDK.Action
     * @memberOf Actions.Transcode
     * @description The predefined streaming profiles.
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/adaptive_bitrate_streaming#predefined_streaming_profiles|Predefined streaming profiles}
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    class StreamingProfileAction extends Action {
        constructor(profile) {
            super();
            this._actionModel = { actionType: 'streamingProfile' };
            this.addQualifier(new Qualifier('sp', profile));
            this._actionModel.profile = STREAMING_PROFILE_TO_ACTION_TYPE_MAP[profile] || profile;
        }
        static fromJson(actionModel) {
            const { profile } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const profileType = ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP[profile] || profile;
            const result = new this(profileType);
            return result;
        }
    }
    var StreamingProfileAction$1 = StreamingProfileAction;

    /**
     * @extends SDK.Action
     * @memberOf Actions.Transcode
     * @description Converts a video to an animated webp or gif.
     * The resulting transformation includes format (f_format) and the animated flag (fl_animated).
     * The flag fl_awebp is added only when an animated webp is requested.
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    class ToAnimatedAction extends Action {
        constructor(animatedFormat = '') {
            super();
            this._actionModel = { actionType: 'toAnimated' };
            if (animatedFormat.toString() === 'webp') {
                this.addFlag(animatedWebP());
            }
            this.addFlag(animated());
            if (animatedFormat) {
                this.addQualifier(new Qualifier('f', animatedFormat));
            }
            this._actionModel.animatedFormat = animatedFormat;
        }
        /**
         * @description Sets the time between frames.
         * @param delayValue The time in milliseconds.
         */
        delay(delayValue) {
            this.addQualifier(new Qualifier('dl', delayValue));
            this._actionModel.delay = delayValue;
            return this;
        }
        /**
         * @description Sets the frequency at which the video is sampled.
         * @param sampling As a string (e.g. '2.3s'), samples one frame every 2.3 seconds.<br>As a number (e.g. 20),
         * samples that many equally spaced frames over the duration of the video.
         */
        sampling(sampling) {
            this.addQualifier(new Qualifier('vs', sampling));
            this._actionModel.sampling = sampling;
            return this;
        }
        static fromJson(actionModel) {
            const { animatedFormat, sampling, delay } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(animatedFormat);
            sampling && result.sampling(sampling);
            delay && result.delay(delay);
            return result;
        }
    }
    var ToAnimatedAction$1 = ToAnimatedAction;

    /**
     * @description A VideoCodec class, this class has no methods, and just sets the codec type (vp9, vp8, etc.)
     * @memberOf Qualifiers.VideoCodec
     */
    class VideoCodecType extends Qualifier {
        constructor(type) {
            super('vc');
            this._type = type;
            this.addValue(type);
        }
        getType() {
            return this._type;
        }
    }
    /**
     * @description An Advanced VideoCodec class with Profile and Level methods
     * @memberOf Qualifiers.VideoCodec
     */
    class AdvVideoCodecType extends Qualifier {
        constructor(type) {
            super('vc');
            this._type = type;
        }
        getType() {
            return this._type;
        }
        /**
         * @description Specifies the profile to use with the h264 codec.
         * @param {Qualifiers.VideoCodecProfile | string} profile Sets the profile of the video codec
         * @example new AdvVideoCodecType('h264').profile(VideoCodecProfile.baseline())
         * @return this;
         */
        profile(profile) {
            this._prof = profile;
            return this;
        }
        getProfile() {
            return this._prof;
        }
        /**
         * @description Specifies the level to use with the h264 codec and specified profile.
         * @param {Qualifiers.VideoCodecLevel | number | string} lvl
         * @example new AdvVideoCodecType('h264').profile(VideoCodecLevel.baseline())
         * @return this;
         */
        level(lvl) {
            this._lvl = lvl;
            return this;
        }
        getLevel() {
            return this._lvl;
        }
        /**
         * @description returns a toString representation of this qualifier
         * @return string;
         */
        toString() {
            return `vc_${this._type}:${this._prof}:${this._lvl}`;
        }
    }

    /**
     * @description Determines the video codec to use.
     * @memberOf Qualifiers
     * @namespace VideoCodec
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    /**
     * @summary qualifier
     * @description Auto video codec.
     * @memberOf Qualifiers.VideoCodec
     * @returns {Qualifiers.VideoCodec.VideoCodecType}
     */
    function auto() {
        return new VideoCodecType('auto');
    }
    /**
     * @summary qualifier
     * @description Video codec h264.
     * @memberOf Qualifiers.VideoCodec
     * @returns {Qualifiers.VideoCodec.AdvVideoCodecType}
     */
    function h264() {
        return new AdvVideoCodecType('h264');
    }
    /**
     * @summary qualifier
     * @description h265 video codec.
     * @memberOf Qualifiers.VideoCodec
     * @returns {Qualifiers.VideoCodec.VideoCodecType}
     */
    function h265() {
        return new VideoCodecType('h265');
    }
    /**
     * @summary qualifier
     * @description Video codec proRes (Apple ProRes 422 HQ).
     * @memberOf Qualifiers.VideoCodec
     * @returns {Qualifiers.VideoCodec.VideoCodecType}
     */
    function proRes() {
        return new VideoCodecType('prores');
    }
    /**
     * @summary qualifier
     * @description Video codec theora.
     * @memberOf Qualifiers.VideoCodec
     * @returns {Qualifiers.VideoCodec.VideoCodecType}
     */
    function theora() {
        return new VideoCodecType('theora');
    }
    /**
     * @summary qualifier
     * @description Video codec vp8.
     * @memberOf Qualifiers.VideoCodec
     * @returns {Qualifiers.VideoCodec.VideoCodecType}
     */
    function vp8() {
        return new VideoCodecType('vp8');
    }
    /**
     * @summary qualifier
     * @description Video codec vp9.
     * @memberOf Qualifiers.VideoCodec
     * @returns {Qualifiers.VideoCodec.VideoCodecType}
     */
    function vp9() {
        return new VideoCodecType('vp9');
    }
    const VIDEO_CODEC_TO_TRANSFORMATION = {
        'auto': auto(),
        'h264': h264(),
        'h265': h265(),
        'prores': proRes(),
        'theora': theora(),
        'vp8': vp8(),
        'vp9': vp9()
    };

    /**
     * @extends SDK.Action
     * @memberOf Actions.Transcode
     * @description Converts a video to an animated webp or gif.
     * @see Visit {@link Actions.Transcode|Transcode} for an example
     */
    class VideoCodecAction extends Action {
        constructor(videoCodecTypeQualifier) {
            super();
            this._actionModel = { actionType: 'videoCodec' };
            this._actionModel.videoCodec = { videoCodecName: videoCodecTypeQualifier.getType() };
            if (videoCodecTypeQualifier instanceof AdvVideoCodecType) {
                if (videoCodecTypeQualifier.getProfile()) {
                    this._actionModel.videoCodec = Object.assign({ profile: videoCodecTypeQualifier.getProfile() }, this._actionModel.videoCodec);
                }
                if (videoCodecTypeQualifier.getLevel()) {
                    this._actionModel.videoCodec = Object.assign({ level: videoCodecTypeQualifier.getLevel() }, this._actionModel.videoCodec);
                }
            }
            this.addQualifier(videoCodecTypeQualifier);
        }
        static fromJson(actionModel) {
            const { videoCodec } = actionModel;
            // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
            // This allows the inheriting classes to determine the class to be created
            const result = new this(VIDEO_CODEC_TO_TRANSFORMATION[videoCodec.videoCodecName]);
            //@ts-ignore
            videoCodec.profile && new this(VIDEO_CODEC_TO_TRANSFORMATION[videoCodec.videoCodecName].profile(videoCodec.profile));
            //@ts-ignore
            videoCodec.level && new this(VIDEO_CODEC_TO_TRANSFORMATION[videoCodec.videoCodecName].level(videoCodec.level));
            return result;
        }
    }

    /**
     * @description Defines how to transcode a video to another format
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/video_manipulation_and_delivery#transcoding_video_to_other_formats|Transcoding video to other formats}
     * @memberOf Actions
     * @namespace Transcode
     * @example
     * // See examples under each method
     */
    /**
     * @summary action
     * @memberOf Actions.Transcode
     * @description Sets the audio sample frequency.
     *
     * <b>Learn more</b>: {@link https://cloudinary.com/documentation/audio_transformations#audio_frequency_control|Audio frequency control}
     * @param {AudioFrequencyType|string|number} freq The audio frequency.
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen/instance/Cloudinary";
     * import {FREQ11025} from '@cloudinary/url-gen/qualifiers/audioFrequency'
     * import {audioFrequency} from '@cloudinary/url-gen/actions/transcode'
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.transcode(audioFrequency(FREQ11025()))
     * @return {Actions.Transcode.AudioFrequencyAction}
     *
     */
    function audioFrequency(freq) {
        return new AudioFrequencyAction$1(freq);
    }
    /**
     * @summary action
     * @memberOf Actions.Transcode
     * @description Sets the audio codec or removes the audio channel.
     * @param {AudioCodecType | string} codec The audio codec or "none".
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen/instance/Cloudinary";
     * import {aac} from '@cloudinary/url-gen/qualifiers/audioCodec'
     * import {audioCodec} from '@cloudinary/url-gen/actions/transcode'
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.transcode( audioCodec( aac() ) );
     * @return {Actions.Transcode.AudioCodecAction}
     */
    function audioCodec(codec) {
        return new AudioCodecAction$1(codec);
    }
    /**
     * @summary action
     * @memberOf Actions.Transcode
     * @description Controls the video bitrate.
     * Supported codecs: h264, h265 (MPEG-4); vp8, vp9 (WebM).
     *
     * <b>Learn more:</b>
     * {@link https://cloudinary.com/documentation/video_optimization#bitrate_control|Bitrate control}
     *
     * @param {string|number}  bitRate The number of bits used to represent the video data per second. By default the video
     *                             uses a variable bitrate (VBR), with this value indicating the maximum bitrate.
     *                             The value can be an integer e.g. 120000, or a string supporting "k" and "m"
     *                             (kilobits and megabits respectively) e.g. 250k or 2m.
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen/instance/Cloudinary";
     * import {bitRate} from '@cloudinary/url-gen/actions/transcode'
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.transcode( bitRate(500).constant() );
     * @return {Actions.Transcode.BitRateAction}
     */
    function bitRate(bitRate) {
        return new BitRateAction$1(bitRate);
    }
    /**
     * @summary action
     * @memberOf Actions.Transcode
     * @param {number} from frame rate
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen/instance/Cloudinary";
     * import {fps} from '@cloudinary/url-gen/actions/transcode'
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.transcode( fps(15) );
     * @return {Actions.Transcode.FPSAction}
     */
    function fps(from) {
        return new FPSAction$1(from);
    }
    /**
     * @summary action
     * @memberOf Actions.Transcode
     * @description Controls the range of acceptable FPS (Frames Per Second) to ensure that video (even when optimized) is
     * delivered with an expected FPS level (helps with sync to audio).
     * @param {number} from frame rate
     * @param {number} to frame rate
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen/instance/Cloudinary";
     * import {fpsRange} from '@cloudinary/url-gen/actions/transcode'
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.transcode( fpsRange( 20, 25 ) );
     * @return {Actions.Transcode.FPSRangeAction}
     */
    function fpsRange(from, to) {
        return new FPSRangeAction$1(from, to);
    }
    /**
     * @summary action
     * @memberOf Actions.Transcode
     * @description Sets the keyframe interval of the delivered video.
     * @param {number | string} interval The keyframe interval in seconds.
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen/instance/Cloudinary";
     * import {keyframeInterval} from '@cloudinary/url-gen/actions/transcode'
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.transcode( keyframeInterval( 0.5 ) );
     * @return {Actions.Transcode.KeyframeIntervalsAction}
     */
    function keyframeInterval(interval) {
        return new KeyframeIntervalsAction$1(interval);
    }
    /**
     * @summary action
     * @memberOf Actions.Transcode
     * @description Sets the streaming profile to apply to an HLS or MPEG-DASH adaptive bitrate streaming video.
     * The value can be one of the pre-defined streaming profiles or a custom-defined one.
     * You can use the streaming profiles methods of StreamingProfilesTrait to get a list of the available streaming
     * profiles or to create new custom profiles.
     * @param {string} profile The streaming profile.
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen/instance/Cloudinary";
     * import {fullHd} from "@cloudinary/url-gen/qualifiers/streamingProfile";
     * import {streamingProfile} from '@cloudinary/url-gen/actions/transcode'
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.transcode( streamingProfile( fullHd() ) );
     * @return {Actions.Transcode.StreamingProfileAction}
     */
    function streamingProfile(profile) {
        return new StreamingProfileAction$1(profile);
    }
    /**
     * @summary action
     * @memberOf Actions.Transcode
     * @description Converts a video to animated image.
     * @param {string | AnimatedFormatType} animatedFormat The streaming profile.
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen/instance/Cloudinary";
     * import {gif} from '@cloudinary/url-gen/qualifiers/animatedFormat'
     * import {toAnimated} from '@cloudinary/url-gen/actions/transcode'
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.transcode( toAnimated( gif() ) );
     * @return {Actions.Transcode.ToAnimatedAction}
     */
    function toAnimated(animatedFormat = '') {
        return new ToAnimatedAction$1(animatedFormat);
    }
    /**
     * @summary action
     * @memberOf Actions.Transcode
     * @description Controls the video codec.
     * @param {Qualifiers.VideoCodec.VideoCodecType | Qualifiers.VideoCodec.AdvVideoCodecType} videoCodecType CodecType
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {vp9} from '@cloudinary/url-gen/qualifiers/videoCodec'
     * import {videoCodec} from '@cloudinary/url-gen/actions/transcode'
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const video = yourCldInstance.video('dog');
     *
     * video.transcode( videoCodec( vp9() ) );
     * @return {Actions.Transcode.VideoCodecAction}
     */
    function videoCodec(videoCodecType) {
        return new VideoCodecAction(videoCodecType);
    }
    const Transcode = { bitRate, audioCodec, audioFrequency, fps, fpsRange, keyframeInterval, streamingProfile, toAnimated, videoCodec };

    /**
     * @description  Defines the clipping path to use when trimming pixels.
     * @extends SDK.Action
     * @memberOf Actions.PSDTools
     * @see Visit {@link Actions.PSDTools| PSDTools} for an example
     */
    class ClipAction extends Action {
        constructor() {
            super();
            this.isEvenOdd = false;
        }
        /**
         * @description The name of the path to clip by
         * @param {string} path
         * @return {this}
         */
        byName(path) {
            this.path = path;
            return this;
        }
        /**
         * @description The index of the path to clip by
         * @param {number} path
         * @return {this}
         */
        byIndex(path) {
            this.path = path;
            return this;
        }
        /**
         * @description Trims pixels according to a clipping path included in the original image using an evenodd clipping rule.
         * @return {this}
         */
        evenOdd() {
            this.isEvenOdd = true;
            return this;
        }
        prepareQualifiers() {
            let qualifierValue;
            if (typeof this.path === 'string') {
                qualifierValue = new QualifierValue(['name', this.path]).setDelimiter(':');
            }
            else {
                qualifierValue = new QualifierValue(this.path);
            }
            //handles flag
            if (this.isEvenOdd) {
                this.addFlag(clipEvenOdd());
            }
            else {
                this.addFlag(clip$1());
            }
            this.addQualifier(new Qualifier('pg', qualifierValue));
            return this;
        }
    }

    /**
     * @description Represents a layer in a Photoshop document.
     * </br><b>Learn more:</b> {@link https://cloudinary.com/documentation/paged_and_layered_media#deliver_selected_layers_of_a_psd_image|Deliver selected layers of a PSD image}
     * @extends SDK.Action
     * @memberOf Actions.PSDTools
     * @see Visit {@link Actions.PSDTools| PSDTools} for an example
     */
    class GetLayerAction extends Action {
        constructor() {
            super();
            this.qualifierValue = new QualifierValue();
            this.qualifierValue.delimiter = ';';
        }
        /**
         * @description deliver an image containing only specified layer of a Photoshop image from The layer index
         * @param {string|number} from the index of the layer
         */
        byIndex(from) {
            this.qualifierValue.addValue(from);
            return this;
        }
        /**
         * @description deliver an image containing only specified range of layers of a Photoshop image
         * @param {string|number} from The layer number
         * @param {string|number} to The layer number
         */
        byRange(from, to) {
            const range = new QualifierValue(from);
            range.addValue(to);
            range.delimiter = '-';
            this.qualifierValue.addValue(range);
            return this;
        }
        /**
         * @description deliver an image containing only specified layer by name of a Photoshop image
         * @param {string|number} name The layer by name
         */
        byName(name) {
            this.name = name;
            this.qualifierValue.addValue(name);
            return this;
        }
        prepareQualifiers() {
            let qualifierValue = this.qualifierValue;
            if (this.name) {
                qualifierValue = new QualifierValue(['name', this.qualifierValue]).setDelimiter(':');
            }
            this.addQualifier(new Qualifier('pg', qualifierValue));
            return this;
        }
    }

    /**
     * @description Represents an embedded smart object in a Photoshop document.
     * </br><b>Learn more:</b> {@link https://cloudinary.com/documentation/paged_and_layered_media#extract_the_original_content_of_an_embedded_object|Extract the original content of an embedded Photoshop object}
     * @extends SDK.Action
     * @memberOf Actions.PSDTools
     * @see Visit {@link Actions.PSDTools| PSDTools} for an example
     */
    class SmartObjectAction extends Action {
        constructor() {
            super();
            this.qualifierValue = new QualifierValue();
            this.useName = false;
            this.qualifierValue.delimiter = ';';
        }
        /**
         * @description Creates a new instance using the specified number.
         * @param index The number.
         */
        byIndex(index) {
            this.smartObjectValue = index;
            this.qualifierValue.addValue(index);
            return this;
        }
        /**
         * @description Creates an instance using the name.
         * @param {string} layerName The name of the layer
         */
        byLayerName(layerName) {
            this.useName = true;
            this.qualifierValue.addValue(layerName);
            return this;
        }
        prepareQualifiers() {
            let qualifierValue;
            if (this.useName) {
                qualifierValue = new QualifierValue(['embedded:name', this.qualifierValue]);
            }
            else {
                qualifierValue = new QualifierValue(['embedded', this.qualifierValue]);
            }
            this.addQualifier(new Qualifier('pg', qualifierValue));
        }
    }

    /**
     * @namespace PSDTools
     * @description Represents a layer in a Photoshop document.
     * </br><b>Learn more:</b> {@link https://cloudinary.com/documentation/paged_and_layered_media#deliver_selected_layers_of_a_psd_image|Deliver selected layers of a PSD image}
     * @memberOf Actions
     * @example
     * // See examples under each method
     */
    /**
     * @summary action
     * @description Trims the pixels of a PSD image according to a Photoshop clipping path that is stored in the image's metadata.
     * @memberOf Actions.PSDTools
     * @return {Actions.PSDTools.ClipAction}
     * @example
     * import {Cloudinary} from '@cloudinary/url-gen';
     * import {clip} from '@cloudinary/url-gen/actions/psdTools';
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     *
     * image.psdTools(
     *  clip()
     *    .byName('foo') // either name, or number
     *    .byNumber(2)   // either name, or number
     *    .evenOdd()     // Use the evenodd clipping rule
     * );
     */
    function clip() {
        return new ClipAction();
    }
    /**
     * @summary action
     * @description Delivers an image containing only specified layers of a Photoshop image.
     *
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/paged_and_layered_media#deliver_selected_layers_of_a_psd_image|Deliver selected layers of a PSD image}
     * @memberOf Actions.PSDTools
     * @return {Actions.PSDTools.GetLayerAction}
     * @example
     * import {Cloudinary} from '@cloudinary/url-gen';
     * import {getLayer} from '@cloudinary/url-gen/actions/psdTools';
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     *
     * image.psdTools(
     *  getLayer()
     *    .byName('foo') // One of the three
     *    .byIndex(2)    // One of the three
     *    .byRange(1, 3) // One of the three
     * );
     */
    function getLayer() {
        return new GetLayerAction();
    }
    /**
     * @summary action
     * @description Extracts the original content of an embedded object of a Photoshop image.
     * @memberOf Actions.PSDTools
     * @return {Actions.PSDTools.SmartObjectAction}
     * @example
     * import {Cloudinary} from '@cloudinary/url-gen';
     * import {smartObject} from '@cloudinary/url-gen/actions/psdTools';
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     *
     * image.psdTools(
     *  smartObject()
     *    .byLayerName('foo') // either name, or number
     *    .byIndex(2)         // either name, or number
     * );
     */
    function smartObject() {
        return new SmartObjectAction();
    }
    const PSDTools = { clip, getLayer, smartObject };

    /**
     * @description Delivers an animated GIF that contains additional loops of the GIF.
     * The total number of iterations is the number of additional loops plus one.
     * You can also specify the loop effect without a numeric value to instruct it to loop the GIF infinitely.
     *
     * @memberOf Actions
     * @namespace Animated
     * @example
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {animated} from "@cloudinary/url-gen/actions/animated";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.animated(edit().delay(200).loop(3)));
     */
    /**
     * @memberOf Actions.Animated
     * @see Actions.Animated
     * @example
     * // Used through a builder function Animated.edit(), and not by creating a new instance
     * import {Cloudinary} from "@cloudinary/url-gen";
     * import {edit} from "@cloudinary/url-gen/actions/animated";
     *
     * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
     * const image = yourCldInstance.image('woman');
     * image.animated(edit().delay(200).loop(3)));
     */
    class AnimatedAction extends Action {
        constructor() {
            super();
        }
        /**
         * @description Controls the time delay between the frames of an animated image, in milliseconds.
         * @param {number} delayValue The delay in milliseconds
         * @return {this}
         */
        delay(delayValue) {
            this.addQualifier(new Qualifier('dl', delayValue));
            return this;
        }
        /**
         * @description Delivers an animated GIF that contains additional loops of the GIF.
         * @param {number} additionalLoops The additional number of times to play the animated GIF.
         * @return {this}
         */
        loop(additionalLoops) {
            const qualifierValue = new QualifierValue(['loop', additionalLoops]).setDelimiter(':');
            this.addQualifier(new Qualifier('e', qualifierValue));
            return this;
        }
    }
    /**
     * @summary action
     * @memberOf Actions.Animated
     * @description Delivers an animated GIF.
     * @return {Actions.Animated.AnimatedAction}
     */
    function edit() {
        return new AnimatedAction();
    }
    const Animated = {
        edit
    };

    /**
     *
     * @param publicID
     */
    function isUrl(publicID) {
        return publicID.match(/^https?:\//);
    }

    /**
     *
     * @param publicID
     */
    function isFileName(publicID) {
        return publicID.indexOf('/') < 0;
    }

    /**
     *
     * @param publicID
     */
    function publicIDContainsVersion(publicID) {
        return publicID.match(/^v[0-9]+/);
    }

    /**
     * Create the URL prefix for Cloudinary resources.
     * Available use cases
     * http://res.cloudinary.com/{cloudName}
     * https://res.cloudinary.com/{cloudName}
     * https://{cloudName}-res.cloudinary.com/
     * http://{domain}/${cloudName}
     * https://{domain}/${cloudName}
     * https://{domain}
     * @private
     *
     * @param {string} cloudName
     * @param {IURLConfig} urlConfig
     */
    function getUrlPrefix(cloudName, urlConfig) {
        var secure = urlConfig.secure;
        var privateCDN = urlConfig.privateCdn;
        var cname = urlConfig.cname;
        var secureDistribution = urlConfig.secureDistribution;
        if (!secure && !cname) {
            return "http://res.cloudinary.com/".concat(cloudName);
        }
        if (secure && !secureDistribution && privateCDN) {
            return "https://".concat(cloudName, "-res.cloudinary.com");
        }
        if (secure && !secureDistribution) {
            return "https://res.cloudinary.com/".concat(cloudName);
        }
        if (secure && secureDistribution && privateCDN) {
            return "https://".concat(secureDistribution);
        }
        if (secure && secureDistribution) {
            return "https://".concat(secureDistribution, "/").concat(cloudName);
        }
        if (!secure && cname) {
            return "http://".concat(cname, "/").concat(cloudName);
        }
        else {
            return 'ERROR';
        }
    }
    /**
     * @private
     * @param assetType
     */
    function handleAssetType(assetType) {
        //default to image
        if (!assetType) {
            return 'image';
        }
        return assetType;
    }
    /**
     * @private
     * @param deliveryType
     */
    function handleDeliveryType(deliveryType) {
        //default to upload
        if (!deliveryType) {
            return 'upload';
        }
        return deliveryType;
    }
    /**
     *
     * @param {string} publicID
     * @param {number} version
     * @param {boolean} forceVersion
     */
    function getUrlVersion(publicID, version, forceVersion) {
        var shouldForceVersion = forceVersion !== false;
        if (version) {
            return "v".concat(version);
        }
        // In all these conditions we never force a version
        if (publicIDContainsVersion(publicID) || isUrl(publicID) || isFileName(publicID)) {
            return '';
        }
        return shouldForceVersion ? 'v1' : '';
    }

    /**
     * @private
     * @description Adds left padding to a string with the desired substring the provided number of times
     * @example stringPad(foo, 3, 'a'') // -> aaafoo
     * @param {string} value
     * @param {number} _targetLength
     * @param {string} _padString
     */
    function stringPad(value, _targetLength, _padString) {
        var targetLength = _targetLength >> 0; //truncate if number or convert non-number to 0;
        var padString = String((typeof _padString !== 'undefined' ? _padString : ' '));
        if (value.length > targetLength) {
            return String(value);
        }
        else {
            targetLength = targetLength - value.length;
            if (targetLength > padString.length) {
                padString += repeatStringNumTimes(padString, targetLength / padString.length);
            }
            return padString.slice(0, targetLength) + String(value);
        }
    }
    /**
     * @description Repeat a string multiple times, cross-browser-safe alternative to string.repeat()
     * @param string
     * @param _times
     */
    function repeatStringNumTimes(string, _times) {
        var times = _times;
        var repeatedString = "";
        while (times > 0) {
            repeatedString += string;
            times--;
        }
        return repeatedString;
    }

    /**
     * This file maps sequences of 6 bit binary digits to a character in base64.
     * 000000 -> A
     * 110011 -> Z
     * 111111 -> /
     */
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
    var base64Map = {};
    var num = 0;
    chars.split('').forEach(function (char) {
        var key = num.toString(2);
        key = stringPad(key, 6, '0');
        base64Map[key] = char;
        num++;
    });

    /**
     * @private
     * @description Reverses the version positions, x.y.z turns to z.y.x
     *              Example: 1.2.3 -> 03.02.01
     * @param {string} semVer Input can be either x.y.z or x.y
     * @return {string} in the form of zz.yy.xx (
     */
    function reverseVersion(semVer) {
        if (semVer.split('.').length < 2) {
            throw new Error('invalid semVer, must have at least two segments');
        }
        // Split by '.', reverse, create new array
        return semVer.split('.').reverse().join('.');
    }

    /**
     * @private
     * @description Pads each segment with '0' so they have length of 2
     * @param {string} semVer Input can be either x.y.z or x.y
     * @return {string} in the form of xx.yy.zz (
     */
    function padVersion(semVer) {
        if (semVer.split('.').length < 2) {
            throw new Error('invalid semVer, must have at least two segments');
        }
        // Split by '.', reverse, create new array with padded values and concat it together
        return semVer.split('.').map(function (segment) {
            // try to cast to number
            var asNumber = +segment;
            if (isNaN(asNumber) || asNumber < 0) {
                throw 'Invalid version number provided';
            }
            return stringPad(segment, 2, '0');
        }).join('.');
    }

    /**
     * @private
     * @description Encodes a semVer-like version string
     * @param {string} semVer Input can be either x.y.z or x.y
     * @return {string} A string built from 3 characters of the base64 table that encode the semVer
     */
    function encodeVersion(semVer) {
        var strResult = '';
        // support x.y or x.y.z by using 'parts' as a variable
        var parts = semVer.split('.').length;
        var paddedStringLength = parts * 6; // we pad to either 12 or 18 characters
        // reverse (but don't mirror) the version. 1.5.15 -> 15.5.1
        var reversedSemver = reverseVersion(semVer);
        // Pad to two spaces, 15.5.1 -> 15.05.01
        var paddedSemver = padVersion(reversedSemver);
        // turn 15.05.01 to a string '150501' then to a number 150501
        var num = parseInt(paddedSemver.split('.').join(''));
        // Represent as binary, add left padding to 12 or 18 characters.
        // 150,501 -> 100100101111100101
        var paddedBinary = num.toString(2);
        paddedBinary = stringPad(paddedBinary, paddedStringLength, '0');
        // Stop in case an invalid version number was provided
        // paddedBinary must be built from sections of 6 bits
        if (paddedBinary.length % 6 !== 0) {
            throw 'Version must be smaller than 43.21.26)';
        }
        // turn every 6 bits into a character using the base64Map
        paddedBinary.match(/.{1,6}/g).forEach(function (bitString) {
            // console.log(bitString);
            strResult += base64Map[bitString];
        });
        return strResult;
    }

    /**
     * @private
     * @description Gets the analyticsOptions from options- should include sdkSemver, techVersion, sdkCode, and feature
     * @param {ITrackedPropertiesThroughAnalytics} options
     * @returns {IAnalyticsOptions}
     */
    function getAnalyticsOptions(options) {
        var analyticsOptions = {
            sdkSemver: options.sdkSemver,
            techVersion: options.techVersion,
            sdkCode: options.sdkCode,
            product: options.product,
            feature: '0',
            osType: options.osType,
            osVersion: options.osVersion,
        };
        if (options.accessibility) {
            analyticsOptions.feature = 'D';
        }
        if (options.lazyload) {
            analyticsOptions.feature = 'C';
        }
        if (options.responsive) {
            analyticsOptions.feature = 'A';
        }
        if (options.placeholder) {
            analyticsOptions.feature = 'B';
        }
        return analyticsOptions;
    }

    var packageVersion = '1.21.0';

    /**
     * @private
     * @description Encodes a semVer-like version string for OS
     * @param {string} semVer Input is x.y
     * @return {string} A string built from 2 characters of the base64 table that encode the semVer
     */
    function encodeOSVersion(semVer) {
        var _a = semVer.split('.'), major = _a[0], minor = _a[1];
        //convert to binary
        var binaryMajorVersion = parseInt(major).toString(2);
        var binaryMinorVersion = parseInt(minor).toString(2);
        //pad to 6
        var paddedMajor = binaryMajorVersion.padStart(6, '0');
        var paddedMinor = binaryMinorVersion.padStart(6, '0');
        return base64Map[paddedMajor] + base64Map[paddedMinor];
    }

    /**
     * @private
     * @description Try to get the node version out of process, if browser just return 0.0.0
     */
    function getNodeVersion() {
        var failedVersion = '0.0.0';
        if (typeof window !== 'undefined') {
            return failedVersion;
        }
        else {
            // node env
            try {
                return process.versions.node || failedVersion;
            }
            catch (e) {
                return failedVersion;
            }
        }
    }
    /**
     * @private
     * @description Ensure that all values ITrackedPropertiesThroughAnalytics are populated.
     * Accept a partial map of values and returns the complete interface of ITrackedPropertiesThroughAnalytics
     * @param {ITrackedPropertiesThroughAnalytics} trackedAnalytics
     * @param {ITrackedPropertiesThroughAnalytics} trackedAnalytics
     */
    function ensureShapeOfTrackedProperties(trackedAnalytics) {
        // try to get the process version from node, but if we're on the client return 0.0.0
        var defaults = {
            techVersion: getNodeVersion(),
            sdkCode: 'T',
            sdkSemver: packageVersion.split('-')[0],
            product: 'A',
            osType: 'Z',
            osVersion: '0.0',
            responsive: false,
            placeholder: false,
            lazyload: false,
            accessibility: false
        };
        if (!trackedAnalytics) {
            return defaults;
        }
        else {
            return __assign(__assign({}, defaults), trackedAnalytics);
        }
    }
    /**
     * @private
     * @description Creates the complete SDK signature by using all the values provided by ITrackedPropertiesThroughAnalytics
     *              Creation of the signature
     *              - Set the AlgoVersion of the encoding, this is an internal letter that represents the version
     *                of our encoding algorithm, it will allow us to perform breaking changes if we'll need them.
     *              - Take the constant SDK code (Arbitrary letter chosen for each SDK, for Base that letter is 'T')
     *                this is used to tell apart which SDK is being tracked.
     *              - Take the {major.minor} versions of the node version (techVersion) (14.2, 16.2 etc.)
     *              - Take the full semver of the SDK you wish to track
     *              - Take the features used(lazy, placeholder etc.) and turn them to a letter (for example accessibility -> D)
     *              - Before appending the string, the Versions must be encoded, see the function `encodeVersion` for more details
     *              - Append all the variables to a single string
     *              - In any case of an error, return the single letter 'E'
     *
     * @return {string} sdkAnalyticsSignature
     */
    function getSDKAnalyticsSignature(_trackedAnalytics) {
        var trackedAnalytics = ensureShapeOfTrackedProperties(_trackedAnalytics);
        var analyticsOptions = getAnalyticsOptions(trackedAnalytics);
        try {
            var twoPartVersion = removePatchFromSemver(analyticsOptions.techVersion);
            var encodedSDKVersion = encodeVersion(analyticsOptions.sdkSemver);
            var encodedTechVersion = encodeVersion(twoPartVersion);
            var encodedOSVersion = encodeOSVersion(analyticsOptions.osVersion);
            var featureCode = analyticsOptions.feature;
            var SDKCode = analyticsOptions.sdkCode;
            var product = analyticsOptions.product, osType = analyticsOptions.osType;
            var algoVersion = 'D'; // The algo version is determined here, it should not be an argument
            return "".concat(algoVersion).concat(product).concat(SDKCode).concat(encodedSDKVersion).concat(encodedTechVersion).concat(osType).concat(encodedOSVersion).concat(featureCode);
        }
        catch (e) {
            // Either SDK or Node versions were unparsable
            return 'E';
        }
    }
    /**
     * @private
     * @description Removes patch version from the semver if it exists
     *              Turns x.y.z OR x.y into x.y
     * @param {'x.y.z' | 'x.y' | string} semVerStr
     */
    function removePatchFromSemver(semVerStr) {
        var parts = semVerStr.split('.');
        return "".concat(parts[0], ".").concat(parts[1]);
    }

    /**
     * This const contains all the valid combination of asset/delivery for URL shortening purposes
     * It's exported because it's used in a test, but it's not really shared enough to belong in a separate file
     */
    var SEO_TYPES = {
        "image/upload": "images",
        "image/private": "private_images",
        "image/authenticated": "authenticated_images",
        "raw/upload": "files",
        "video/upload": "videos"
    };
    /**
     * @description Cloudinary file without a transformation
     * @summary SDK
     * @memberOf SDK
     */
    var CloudinaryFile = /** @class */ (function () {
        function CloudinaryFile(publicID, cloudConfig, urlConfig) {
            if (cloudConfig === void 0) { cloudConfig = {}; }
            this.setPublicID(publicID);
            this.setCloudConfig(cloudConfig);
            this.setURLConfig(urlConfig);
        }
        /**
         * @description Sets the URL Config for this asset
         * @param urlConfig
         * @return {this}
         */
        CloudinaryFile.prototype.setURLConfig = function (urlConfig) {
            this.urlConfig = new URLConfig(urlConfig);
            return this;
        };
        /**
         * @description Sets the Cloud Config for this asset
         * @param urlConfig
         * @return {this}
         */
        CloudinaryFile.prototype.setCloudConfig = function (cloudConfig) {
            this.cloudName = cloudConfig.cloudName;
            this.apiKey = cloudConfig.apiKey;
            this.apiSecret = cloudConfig.apiSecret;
            this.authToken = cloudConfig.authToken;
            return this;
        };
        /**
         * @description Sets the public ID of the asset.
         * @param {string} publicID The public ID of the asset.
         * @return {this}
         */
        CloudinaryFile.prototype.setPublicID = function (publicID) {
            // PublicID must be a string!
            this.publicID = publicID ? publicID.toString() : '';
            return this;
        };
        /**
         * @description Sets the delivery type of the asset.
         * @param {DELIVERY_TYPE | string} newType The type of the asset.
         * @return {this}
         */
        CloudinaryFile.prototype.setDeliveryType = function (newType) {
            this.deliveryType = newType;
            return this;
        };
        /**
         * @description Sets the URL SEO suffix of the asset.
         * @param {string} newSuffix The SEO suffix.
         * @return {this}
         */
        CloudinaryFile.prototype.setSuffix = function (newSuffix) {
            this.suffix = newSuffix;
            return this;
        };
        /**
         * @description Sets the signature of the asset.
         * @param {string} signature The signature.
         * @return {this}
         */
        CloudinaryFile.prototype.setSignature = function (signature) {
            this.signature = signature;
            return this;
        };
        /**
         * @description Sets the version of the asset.
         * @param {string} newVersion The version of the asset.
         * @return {this}
         */
        CloudinaryFile.prototype.setVersion = function (newVersion) {
            if (newVersion) {
                this.version = newVersion;
            }
            return this;
        };
        /**
         * @description Sets the asset type.
         * @param {string} newType The type of the asset.
         * @return {this}
         */
        CloudinaryFile.prototype.setAssetType = function (newType) {
            if (newType) {
                this.assetType = newType;
            }
            return this;
        };
        CloudinaryFile.prototype.sign = function () {
            return this;
        };
        /**
         * @description Serializes to URL string
         * @param overwriteOptions
         */
        CloudinaryFile.prototype.toURL = function (overwriteOptions) {
            if (overwriteOptions === void 0) { overwriteOptions = {}; }
            return this.createCloudinaryURL(null, overwriteOptions.trackedAnalytics);
        };
        /**
         * @description Validate various options before attempting to create a URL
         * The function will throw in case a violation
         * @throws Validation errors
         */
        CloudinaryFile.prototype.validateAssetForURLCreation = function () {
            if (typeof this.cloudName === 'undefined') {
                throw 'You must supply a cloudName when initializing the asset';
            }
            var suffixContainsDot = this.suffix && this.suffix.indexOf('.') >= 0;
            var suffixContainsSlash = this.suffix && this.suffix.indexOf('/') >= 0;
            if (suffixContainsDot || suffixContainsSlash) {
                throw '`suffix`` should not include . or /';
            }
        };
        /**
         * @description return an SEO friendly name for a combination of asset/delivery, some examples:
         * * image/upload -> images
         * * video/upload -> videos
         * If no match is found, return `{asset}/{delivery}`
         */
        CloudinaryFile.prototype.getResourceType = function () {
            var assetType = handleAssetType(this.assetType);
            var deliveryType = handleDeliveryType(this.deliveryType);
            var hasSuffix = !!this.suffix;
            var regularSEOType = "".concat(assetType, "/").concat(deliveryType);
            var shortSEOType = SEO_TYPES["".concat(assetType, "/").concat(deliveryType)];
            var useRootPath = this.urlConfig.useRootPath;
            var shorten = this.urlConfig.shorten;
            // Quick exit incase of useRootPath
            if (useRootPath) {
                if (regularSEOType === 'image/upload') {
                    return ''; // For image/upload we're done, just return nothing
                }
                else {
                    throw new Error("useRootPath can only be used with assetType: 'image' and deliveryType: 'upload'. Provided: ".concat(regularSEOType, " instead"));
                }
            }
            if (shorten && regularSEOType === 'image/upload') {
                return 'iu';
            }
            if (hasSuffix) {
                if (shortSEOType) {
                    return shortSEOType;
                }
                else {
                    throw new Error("URL Suffix only supported for ".concat(Object.keys(SEO_TYPES).join(', '), ", Provided: ").concat(regularSEOType, " instead"));
                }
            }
            // If all else fails, return the regular image/upload combination (asset/delivery)
            return regularSEOType;
        };
        CloudinaryFile.prototype.getSignature = function () {
            if (this.signature) {
                return "s--".concat(this.signature, "--");
            }
            else {
                return '';
            }
        };
        /**
         *
         * @description Creates a fully qualified CloudinaryURL
         * @return {string} CloudinaryURL
         * @throws Validation Errors
         */
        CloudinaryFile.prototype.createCloudinaryURL = function (transformation, trackedAnalytics) {
            // In accordance with the existing implementation, if no publicID exists we should return nothing.
            if (!this.publicID) {
                return '';
            }
            // Throws if some options are mis-configured
            // See the function for more information on when it throws
            this.validateAssetForURLCreation();
            var prefix = getUrlPrefix(this.cloudName, this.urlConfig);
            var transformationString = transformation ? transformation.toString() : '';
            var version = getUrlVersion(this.publicID, this.version, this.urlConfig.forceVersion);
            var publicID = this.publicID;
            if (typeof transformation === 'string') {
                var url = [prefix, this.getResourceType(), this.getSignature(), transformationString, version, publicID.replace(/,/g, '%2C'), this.suffix]
                    .filter(function (a) { return a; })
                    .join('/');
                return url;
            }
            else {
                // Avoid applying encodeURI on entire string in case where we have transformations with comma (i.e. f_auto,q_auto)
                // Since encodeURI does not encode commas we replace commas *only* on the publicID
                var safeURL = [
                    encodeURI(prefix),
                    this.getResourceType(),
                    this.getSignature(),
                    encodeURI(transformationString),
                    version,
                    encodeURI(publicID).replace(/,/g, '%2C'),
                    this.suffix && encodeURI(this.suffix)
                ]
                    .filter(function (a) { return a; })
                    .join('/')
                    .replace(/\?/g, '%3F')
                    .replace(/=/g, '%3D');
                var shouldAddAnalytics = this.urlConfig.analytics !== false && !(publicID.includes('?'));
                var queryParamsString = '';
                if (typeof (this.urlConfig.queryParams) === 'object') {
                    try {
                        var queryParams = new URLSearchParams(this.urlConfig.queryParams);
                        if (shouldAddAnalytics) {
                            queryParams.set("_a", getSDKAnalyticsSignature(trackedAnalytics));
                        }
                        queryParamsString = queryParams.toString();
                    }
                    catch (err) {
                        console.error('Error: URLSearchParams is not available so the queryParams object cannot be parsed, please try passing as an already parsed string');
                    }
                }
                else {
                    queryParamsString = this.urlConfig.queryParams || '';
                    if (shouldAddAnalytics) {
                        queryParamsString += "".concat((queryParamsString.length > 0 ? '&' : ''), "_a=").concat(getSDKAnalyticsSignature(trackedAnalytics));
                    }
                }
                if (queryParamsString) {
                    return "".concat(safeURL, "?").concat(queryParamsString);
                }
                else {
                    return safeURL;
                }
            }
        };
        return CloudinaryFile;
    }());

    /**
     * @desc Cloudinary Transformable interface, extended by any class that needs a Transformation Interface
     * @summary SDK
     * @memberOf SDK
     */
    var CloudinaryTransformable = /** @class */ (function (_super) {
        __extends(CloudinaryTransformable, _super);
        function CloudinaryTransformable(publicID, cloudConfig, urlConfig, transformation) {
            var _this = 
            /* istanbul ignore next */
            _super.call(this, publicID, cloudConfig, urlConfig) || this;
            _this.transformation = transformation;
            return _this;
        }
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Animated} animated
         * @return {this}
         */
        CloudinaryTransformable.prototype.animated = function (animated) {
            this.transformation.animated(animated);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Border} border
         * @return {this}
         */
        CloudinaryTransformable.prototype.border = function (border) {
            this.transformation.border(border);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Reshape} reshape
         * @return {this}
         */
        CloudinaryTransformable.prototype.reshape = function (reshape) {
            this.transformation.reshape(reshape);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Resize} resize
         * @return {this}
         */
        CloudinaryTransformable.prototype.resize = function (resize) {
            this.transformation.resize(resize);
            return this;
        };
        /**
         * @desc An alias to Action Delivery.quality
         * @param {string|number} quality
         * @return {this}
         */
        CloudinaryTransformable.prototype.quality = function (quality) {
            this.addAction(new DeliveryFormatAction('q', quality));
            return this;
        };
        /**
         * @desc An alias to Action Delivery.format
         * @param {string} format
         * @return {this}
         */
        CloudinaryTransformable.prototype.format = function (format) {
            this.addAction(new DeliveryFormatAction('f', format));
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.RoundCorners} roundCorners
         * @return {this}
         */
        CloudinaryTransformable.prototype.roundCorners = function (roundCorners) {
            this.transformation.roundCorners(roundCorners);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @return {this}
         */
        CloudinaryTransformable.prototype.overlay = function (overlayAction) {
            this.transformation.overlay(overlayAction);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Variable} variableAction
         * @return {this}
         */
        CloudinaryTransformable.prototype.addVariable = function (variableAction) {
            this.transformation.addVariable(variableAction);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Condition} conditionalAction
         * @return {this}
         */
        CloudinaryTransformable.prototype.conditional = function (conditionalAction) {
            this.transformation.conditional(conditionalAction);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Effect} effect
         * @return {this}
         */
        CloudinaryTransformable.prototype.effect = function (effect) {
            this.transformation.effect(effect);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Adjust} action
         * @return {this}
         */
        CloudinaryTransformable.prototype.adjust = function (action) {
            this.transformation.adjust(action);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Rotate} rotate
         * @return {this}
         */
        CloudinaryTransformable.prototype.rotate = function (rotate) {
            this.transformation.rotate(rotate);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.NamedTransformation} namedTransformation
         * @return {this}
         */
        CloudinaryTransformable.prototype.namedTransformation = function (namedTransformation) {
            this.transformation.namedTransformation(namedTransformation);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Delivery} deliveryAction
         * @return {this}
         */
        CloudinaryTransformable.prototype.delivery = function (deliveryAction) {
            this.transformation.delivery(deliveryAction);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Qualifiers.color} color
         * @return {this}
         */
        CloudinaryTransformable.prototype.backgroundColor = function (color) {
            this.transformation.backgroundColor(color);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.PSDTools} action
         * @return {this}
         */
        CloudinaryTransformable.prototype.psdTools = function (action) {
            this.transformation.psdTools(action);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Extract} action
         * @return {this}
         */
        CloudinaryTransformable.prototype.extract = function (action) {
            this.transformation.extract(action);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Qualifiers.Flag | string} flagQualifier
         * @return {this}
         */
        CloudinaryTransformable.prototype.addFlag = function (flagQualifier) {
            this.transformation.addFlag(flagQualifier);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.CustomFunction} customFunction
         * @return {this}
         */
        CloudinaryTransformable.prototype.customFunction = function (customFunction) {
            this.transformation.customFunction(customFunction);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {SDK.Action | string} action
         * @return {this}
         */
        CloudinaryTransformable.prototype.addAction = function (action) {
            this.transformation.addAction(action);
            return this;
        };
        /**
         * @description Extend your transformation with another transformation
         * @param { string | SDK.Transformation } tx
         */
        CloudinaryTransformable.prototype.addTransformation = function (tx) {
            this.transformation.addTransformation(tx);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @return {string}
         */
        CloudinaryTransformable.prototype.toString = function () {
            return this.transformation.toString();
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @return {this}
         */
        CloudinaryTransformable.prototype.underlay = function (underlayAction) {
            this.transformation.underlay(underlayAction);
            return this;
        };
        CloudinaryTransformable.prototype.toURL = function (overwriteOptions) {
            if (overwriteOptions === void 0) { overwriteOptions = {}; }
            return this.createCloudinaryURL(this.transformation, overwriteOptions === null || overwriteOptions === void 0 ? void 0 : overwriteOptions.trackedAnalytics);
        };
        return CloudinaryTransformable;
    }(CloudinaryFile));

    /**
     * @desc Cloudinary image asset, with image-related transformations
     * @summary SDK
     * @memberOf SDK
     */
    var CloudinaryImage = /** @class */ (function (_super) {
        __extends(CloudinaryImage, _super);
        function CloudinaryImage(publicID, cloudConfig, urlConfig) {
            /* istanbul ignore next */
            return _super.call(this, publicID, cloudConfig, urlConfig, new ImageTransformation()) || this;
        }
        return CloudinaryImage;
    }(CloudinaryTransformable));

    /**
     * @desc Cloudinary video asset, with video-related transformations
     * @summary SDK
     * @memberOf SDK
     */
    var CloudinaryVideo = /** @class */ (function (_super) {
        __extends(CloudinaryVideo, _super);
        function CloudinaryVideo(publicID, cloudConfig, urlConfig) {
            var _this = 
            /* istanbul ignore next */
            _super.call(this, publicID, cloudConfig, urlConfig, new VideoTransformation()) || this;
            _this.assetType = 'video';
            return _this;
        }
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Transcode} action
         * @return {this}
         */
        CloudinaryVideo.prototype.transcode = function (action) {
            this.transformation.transcode(action);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.VideoEdit} action
         * @return {this}
         */
        CloudinaryVideo.prototype.videoEdit = function (action) {
            this.transformation.videoEdit(action);
            return this;
        };
        return CloudinaryVideo;
    }(CloudinaryTransformable));

    /* eslint-disable */
    // @ts-nocheck
    // This file is a direct copy from lodash.clonedeep
    // Lodash.clonedeep has problems with the module exports, thus a copy was the shortest and cleanest solution
    /**
     * lodash (Custom Build) <https://lodash.com/>
     * Build: `lodash modularize exports="npm" -o ./`
     * Copyright jQuery Foundation and other contributors <https://jquery.org/>
     * Released under MIT license <https://lodash.com/license>
     * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
     * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
     */
    /** Used as the size to enable large array optimizations. */
    var LARGE_ARRAY_SIZE = 200;
    /** Used to stand-in for `undefined` hash values. */
    var HASH_UNDEFINED = '__lodash_hash_undefined__';
    /** Used as references for constious `Number` constants. */
    var MAX_SAFE_INTEGER = 9007199254740991;
    /** `Object#toString` result references. */
    var argsTag = '[object Arguments]', arrayTag = '[object Array]', boolTag = '[object Boolean]', dateTag = '[object Date]', errorTag = '[object Error]', funcTag = '[object Function]', genTag = '[object GeneratorFunction]', mapTag = '[object Map]', numberTag = '[object Number]', objectTag = '[object Object]', promiseTag = '[object Promise]', regexpTag = '[object RegExp]', setTag = '[object Set]', stringTag = '[object String]', symbolTag = '[object Symbol]', weakMapTag = '[object WeakMap]';
    var arrayBufferTag = '[object ArrayBuffer]', dataViewTag = '[object DataView]', float32Tag = '[object Float32Array]', float64Tag = '[object Float64Array]', int8Tag = '[object Int8Array]', int16Tag = '[object Int16Array]', int32Tag = '[object Int32Array]', uint8Tag = '[object Uint8Array]', uint8ClampedTag = '[object Uint8ClampedArray]', uint16Tag = '[object Uint16Array]', uint32Tag = '[object Uint32Array]';
    /**
     * Used to match `RegExp`
     * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
     */
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    /** Used to match `RegExp` flags from their coerced string values. */
    var reFlags = /\w*$/;
    /** Used to detect host constructors (Safari). */
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    /** Used to detect unsigned integer values. */
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    /** Used to identify `toStringTag` values supported by `_.clone`. */
    var cloneableTags = {};
    cloneableTags[argsTag] = cloneableTags[arrayTag] =
        cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
            cloneableTags[boolTag] = cloneableTags[dateTag] =
                cloneableTags[float32Tag] = cloneableTags[float64Tag] =
                    cloneableTags[int8Tag] = cloneableTags[int16Tag] =
                        cloneableTags[int32Tag] = cloneableTags[mapTag] =
                            cloneableTags[numberTag] = cloneableTags[objectTag] =
                                cloneableTags[regexpTag] = cloneableTags[setTag] =
                                    cloneableTags[stringTag] = cloneableTags[symbolTag] =
                                        cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
                                            cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
    cloneableTags[errorTag] = cloneableTags[funcTag] =
        cloneableTags[weakMapTag] = false;
    /** Detect free constiable `global` from Node.js. */
    var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;
    /** Detect free constiable `self`. */
    var freeSelf = typeof self == 'object' && self && self.Object === Object && self;
    /** Used as a reference to the global object. */
    var root = freeGlobal || freeSelf || Function('return this')();
    /** Detect free constiable `exports`. */
    var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;
    /** Detect free constiable `module`. */
    var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;
    /** Detect the popular CommonJS extension `module.exports`. */
    var moduleExports = freeModule && freeModule.exports === freeExports;
    /**
     * Adds the key-value `pair` to `map`.
     *
     * @private
     * @param {Object} map The map to modify.
     * @param {Array} pair The key-value pair to add.
     * @returns {Object} Returns `map`.
     */
    function addMapEntry(map, pair) {
        // Don't return `map.set` because it's not chainable in IE 11.
        map.set(pair[0], pair[1]);
        return map;
    }
    /**
     * Adds `value` to `set`.
     *
     * @private
     * @param {Object} set The set to modify.
     * @param {*} value The value to add.
     * @returns {Object} Returns `set`.
     */
    function addSetEntry(set, value) {
        // Don't return `set.add` because it's not chainable in IE 11.
        set.add(value);
        return set;
    }
    /**
     * A specialized version of `_.forEach` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns `array`.
     */
    function arrayEach(array, iteratee) {
        var index = -1, length = array ? array.length : 0;
        while (++index < length) {
            if (iteratee(array[index], index, array) === false) {
                break;
            }
        }
        return array;
    }
    /**
     * Appends the elements of `values` to `array`.
     *
     * @private
     * @param {Array} array The array to modify.
     * @param {Array} values The values to append.
     * @returns {Array} Returns `array`.
     */
    function arrayPush(array, values) {
        var index = -1, length = values.length, offset = array.length;
        while (++index < length) {
            array[offset + index] = values[index];
        }
        return array;
    }
    /**
     * A specialized version of `_.reduce` for arrays without support for
     * iteratee shorthands.
     *
     * @private
     * @param {Array} [array] The array to iterate over.
     * @param {Function} iteratee The function invoked per iteration.
     * @param {*} [accumulator] The initial value.
     * @param {boolean} [initAccum] Specify using the first element of `array` as
     *  the initial value.
     * @returns {*} Returns the accumulated value.
     */
    function arrayReduce(array, iteratee, accumulator, initAccum) {
        var index = -1, length = array ? array.length : 0;
        if (initAccum && length) {
            accumulator = array[++index];
        }
        while (++index < length) {
            accumulator = iteratee(accumulator, array[index], index, array);
        }
        return accumulator;
    }
    /**
     * The base implementation of `_.times` without support for iteratee shorthands
     * or max array length checks.
     *
     * @private
     * @param {number} n The number of times to invoke `iteratee`.
     * @param {Function} iteratee The function invoked per iteration.
     * @returns {Array} Returns the array of results.
     */
    function baseTimes(n, iteratee) {
        var index = -1, result = Array(n);
        while (++index < n) {
            result[index] = iteratee(index);
        }
        return result;
    }
    /**
     * Gets the value at `key` of `object`.
     *
     * @private
     * @param {Object} [object] The object to query.
     * @param {string} key The key of the property to get.
     * @returns {*} Returns the property value.
     */
    function getValue(object, key) {
        return object == null ? undefined : object[key];
    }
    /**
     * Checks if `value` is a host object in IE < 9.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
     */
    function isHostObject(value) {
        // Many host objects are `Object` objects that can coerce to strings
        // despite having improperly defined `toString` methods.
        var result = false;
        if (value != null && typeof value.toString != 'function') {
            try {
                result = !!("".concat(value));
            }
            catch (e) {
            }
        }
        return result;
    }
    /**
     * Converts `map` to its key-value pairs.
     *
     * @private
     * @param {Object} map The map to convert.
     * @returns {Array} Returns the key-value pairs.
     */
    function mapToArray(map) {
        var index = -1, result = Array(map.size);
        map.forEach(function (value, key) {
            result[++index] = [key, value];
        });
        return result;
    }
    /**
     * Creates a unary function that invokes `func` with its argument transformed.
     *
     * @private
     * @param {Function} func The function to wrap.
     * @param {Function} transform The argument transform.
     * @returns {Function} Returns the new function.
     */
    function overArg(func, transform) {
        return function (arg) {
            return func(transform(arg));
        };
    }
    /**
     * Converts `set` to an array of its values.
     *
     * @private
     * @param {Object} set The set to convert.
     * @returns {Array} Returns the values.
     */
    function setToArray(set) {
        var index = -1, result = Array(set.size);
        set.forEach(function (value) {
            result[++index] = value;
        });
        return result;
    }
    /** Used for built-in method references. */
    var arrayProto = Array.prototype, funcProto = Function.prototype, objectProto = Object.prototype;
    /** Used to detect overreaching core-js shims. */
    var coreJsData = root['__core-js_shared__'];
    /** Used to detect methods masquerading as native. */
    var maskSrcKey = (function () {
        var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
        return uid ? ("Symbol(src)_1.".concat(uid)) : '';
    }());
    /** Used to resolve the decompiled source of functions. */
    var funcToString = funcProto.toString;
    /** Used to check objects for own properties. */
    var hasOwnProperty = objectProto.hasOwnProperty;
    /**
     * Used to resolve the
     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
     * of values.
     */
    var objectToString = objectProto.toString;
    /** Used to detect if a method is native. */
    var reIsNative = RegExp("^".concat(funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
        .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?'), "$"));
    /** Built-in value references. */
    var Buffer = moduleExports ? root.Buffer : undefined, Symbol = root.Symbol, Uint8Array = root.Uint8Array, getPrototype = overArg(Object.getPrototypeOf, Object), objectCreate = Object.create, propertyIsEnumerable = objectProto.propertyIsEnumerable, splice = arrayProto.splice;
    /* Built-in method references for those with the same name as other `lodash` methods. */
    var nativeGetSymbols = Object.getOwnPropertySymbols, nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined, nativeKeys = overArg(Object.keys, Object);
    /* Built-in method references that are verified to be native. */
    var DataView = getNative(root, 'DataView'), Map$1 = getNative(root, 'Map'), Promise$1 = getNative(root, 'Promise'), Set = getNative(root, 'Set'), WeakMap = getNative(root, 'WeakMap'), nativeCreate = getNative(Object, 'create');
    /** Used to detect maps, sets, and weakmaps. */
    var dataViewCtorString = toSource(DataView), mapCtorString = toSource(Map$1), promiseCtorString = toSource(Promise$1), setCtorString = toSource(Set), weakMapCtorString = toSource(WeakMap);
    /** Used to convert symbols to primitives and strings. */
    var symbolProto = Symbol ? Symbol.prototype : undefined, symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
    /**
     * Creates a hash object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Hash(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    /**
     * Removes all key-value entries from the hash.
     *
     * @private
     * @name clear
     * @memberOf Hash
     */
    function hashClear() {
        this.__data__ = nativeCreate ? nativeCreate(null) : {};
    }
    /**
     * Removes `key` and its value from the hash.
     *
     * @private
     * @name delete
     * @memberOf Hash
     * @param {Object} hash The hash to modify.
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function hashDelete(key) {
        return this.has(key) && delete this.__data__[key];
    }
    /**
     * Gets the hash value for `key`.
     *
     * @private
     * @name get
     * @memberOf Hash
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function hashGet(key) {
        var data = this.__data__;
        if (nativeCreate) {
            var result = data[key];
            return result === HASH_UNDEFINED ? undefined : result;
        }
        return hasOwnProperty.call(data, key) ? data[key] : undefined;
    }
    /**
     * Checks if a hash value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Hash
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function hashHas(key) {
        var data = this.__data__;
        return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
    }
    /**
     * Sets the hash `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Hash
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the hash instance.
     */
    function hashSet(key, value) {
        var data = this.__data__;
        data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
        return this;
    }
    // Add methods to `Hash`.
    Hash.prototype.clear = hashClear;
    Hash.prototype.delete = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    /**
     * Creates an list cache object.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function ListCache(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    /**
     * Removes all key-value entries from the list cache.
     *
     * @private
     * @name clear
     * @memberOf ListCache
     */
    function listCacheClear() {
        this.__data__ = [];
    }
    /**
     * Removes `key` and its value from the list cache.
     *
     * @private
     * @name delete
     * @memberOf ListCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function listCacheDelete(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
            return false;
        }
        var lastIndex = data.length - 1;
        if (index == lastIndex) {
            data.pop();
        }
        else {
            splice.call(data, index, 1);
        }
        return true;
    }
    /**
     * Gets the list cache value for `key`.
     *
     * @private
     * @name get
     * @memberOf ListCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function listCacheGet(key) {
        var data = this.__data__, index = assocIndexOf(data, key);
        return index < 0 ? undefined : data[index][1];
    }
    /**
     * Checks if a list cache value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf ListCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function listCacheHas(key) {
        return assocIndexOf(this.__data__, key) > -1;
    }
    /**
     * Sets the list cache `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf ListCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the list cache instance.
     */
    function listCacheSet(key, value) {
        var data = this.__data__, index = assocIndexOf(data, key);
        if (index < 0) {
            data.push([key, value]);
        }
        else {
            data[index][1] = value;
        }
        return this;
    }
    // Add methods to `ListCache`.
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype.delete = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    /**
     * Creates a map cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function MapCache(entries) {
        var index = -1, length = entries ? entries.length : 0;
        this.clear();
        while (++index < length) {
            var entry = entries[index];
            this.set(entry[0], entry[1]);
        }
    }
    /**
     * Removes all key-value entries from the map.
     *
     * @private
     * @name clear
     * @memberOf MapCache
     */
    function mapCacheClear() {
        this.__data__ = {
            'hash': new Hash,
            'map': new (Map$1 || ListCache),
            'string': new Hash
        };
    }
    /**
     * Removes `key` and its value from the map.
     *
     * @private
     * @name delete
     * @memberOf MapCache
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function mapCacheDelete(key) {
        return getMapData(this, key).delete(key);
    }
    /**
     * Gets the map value for `key`.
     *
     * @private
     * @name get
     * @memberOf MapCache
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function mapCacheGet(key) {
        return getMapData(this, key).get(key);
    }
    /**
     * Checks if a map value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf MapCache
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function mapCacheHas(key) {
        return getMapData(this, key).has(key);
    }
    /**
     * Sets the map `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf MapCache
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the map cache instance.
     */
    function mapCacheSet(key, value) {
        getMapData(this, key).set(key, value);
        return this;
    }
    // Add methods to `MapCache`.
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype.delete = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    /**
     * Creates a stack cache object to store key-value pairs.
     *
     * @private
     * @constructor
     * @param {Array} [entries] The key-value pairs to cache.
     */
    function Stack(entries) {
        this.__data__ = new ListCache(entries);
    }
    /**
     * Removes all key-value entries from the stack.
     *
     * @private
     * @name clear
     * @memberOf Stack
     */
    function stackClear() {
        this.__data__ = new ListCache;
    }
    /**
     * Removes `key` and its value from the stack.
     *
     * @private
     * @name delete
     * @memberOf Stack
     * @param {string} key The key of the value to remove.
     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
     */
    function stackDelete(key) {
        return this.__data__.delete(key);
    }
    /**
     * Gets the stack value for `key`.
     *
     * @private
     * @name get
     * @memberOf Stack
     * @param {string} key The key of the value to get.
     * @returns {*} Returns the entry value.
     */
    function stackGet(key) {
        return this.__data__.get(key);
    }
    /**
     * Checks if a stack value for `key` exists.
     *
     * @private
     * @name has
     * @memberOf Stack
     * @param {string} key The key of the entry to check.
     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
     */
    function stackHas(key) {
        return this.__data__.has(key);
    }
    /**
     * Sets the stack `key` to `value`.
     *
     * @private
     * @name set
     * @memberOf Stack
     * @param {string} key The key of the value to set.
     * @param {*} value The value to set.
     * @returns {Object} Returns the stack cache instance.
     */
    function stackSet(key, value) {
        var cache = this.__data__;
        if (cache instanceof ListCache) {
            var pairs = cache.__data__;
            if (!Map$1 || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
                pairs.push([key, value]);
                return this;
            }
            cache = this.__data__ = new MapCache(pairs);
        }
        cache.set(key, value);
        return this;
    }
    // Add methods to `Stack`.
    Stack.prototype.clear = stackClear;
    Stack.prototype.delete = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    /**
     * Creates an array of the enumerable property names of the array-like `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @param {boolean} inherited Specify returning inherited property names.
     * @returns {Array} Returns the array of property names.
     */
    function arrayLikeKeys(value, inherited) {
        // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
        // Safari 9 makes `arguments.length` enumerable in strict mode.
        var result = (isArray(value) || isArguments(value))
            ? baseTimes(value.length, String)
            : [];
        var length = result.length, skipIndexes = !!length;
        for (var key in value) {
            if ((inherited || hasOwnProperty.call(value, key)) &&
                !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
                result.push(key);
            }
        }
        return result;
    }
    /**
     * Assigns `value` to `key` of `object` if the existing value is not equivalent
     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * for equality comparisons.
     *
     * @private
     * @param {Object} object The object to modify.
     * @param {string} key The key of the property to assign.
     * @param {*} value The value to assign.
     */
    function assignValue(object, key, value) {
        var objValue = object[key];
        if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
            (value === undefined && !(key in object))) {
            object[key] = value;
        }
    }
    /**
     * Gets the index at which the `key` is found in `array` of key-value pairs.
     *
     * @private
     * @param {Array} array The array to inspect.
     * @param {*} key The key to search for.
     * @returns {number} Returns the index of the matched value, else `-1`.
     */
    function assocIndexOf(array, key) {
        var length = array.length;
        while (length--) {
            if (eq(array[length][0], key)) {
                return length;
            }
        }
        return -1;
    }
    /**
     * The base implementation of `_.assign` without support for multiple sources
     * or `customizer` functions.
     *
     * @private
     * @param {Object} object The destination object.
     * @param {Object} source The source object.
     * @returns {Object} Returns `object`.
     */
    function baseAssign(object, source) {
        return object && copyObject(source, keys(source), object);
    }
    /**
     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
     * traversed objects.
     *
     * @private
     * @param {*} value The value to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @param {boolean} [isFull] Specify a clone including symbols.
     * @param {Function} [customizer] The function to customize cloning.
     * @param {string} [key] The key of `value`.
     * @param {Object} [object] The parent object of `value`.
     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
     * @returns {*} Returns the cloned value.
     */
    function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
        var result;
        if (customizer) {
            result = object ? customizer(value, key, object, stack) : customizer(value);
        }
        if (result !== undefined) {
            return result;
        }
        if (!isObject$1(value)) {
            return value;
        }
        var isArr = isArray(value);
        if (isArr) {
            result = initCloneArray(value);
            if (!isDeep) {
                return copyArray(value, result);
            }
        }
        else {
            var tag = getTag(value), isFunc = tag == funcTag || tag == genTag;
            if (isBuffer(value)) {
                return cloneBuffer(value, isDeep);
            }
            if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
                if (isHostObject(value)) {
                    return object ? value : {};
                }
                result = initCloneObject(isFunc ? {} : value);
                if (!isDeep) {
                    return copySymbols(value, baseAssign(result, value));
                }
            }
            else {
                if (!cloneableTags[tag]) {
                    return object ? value : {};
                }
                result = initCloneByTag(value, tag, baseClone, isDeep);
            }
        }
        // Check for circular references and return its corresponding clone.
        stack || (stack = new Stack);
        var stacked = stack.get(value);
        if (stacked) {
            return stacked;
        }
        stack.set(value, result);
        if (!isArr) {
            var props = isFull ? getAllKeys(value) : keys(value);
        }
        arrayEach(props || value, function (subValue, key) {
            if (props) {
                key = subValue;
                subValue = value[key];
            }
            // Recursively populate clone (susceptible to call stack limits).
            assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
        });
        return result;
    }
    /**
     * The base implementation of `_.create` without support for assigning
     * properties to the created object.
     *
     * @private
     * @param {Object} prototype The object to inherit from.
     * @returns {Object} Returns the new object.
     */
    function baseCreate(proto) {
        return isObject$1(proto) ? objectCreate(proto) : {};
    }
    /**
     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
     * symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {Function} keysFunc The function to get the keys of `object`.
     * @param {Function} symbolsFunc The function to get the symbols of `object`.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
        var result = keysFunc(object);
        return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    /**
     * The base implementation of `getTag`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    function baseGetTag(value) {
        return objectToString.call(value);
    }
    /**
     * The base implementation of `_.isNative` without bad shim checks.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a native function,
     *  else `false`.
     */
    function baseIsNative(value) {
        if (!isObject$1(value) || isMasked(value)) {
            return false;
        }
        var pattern = (isFunction$1(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
        return pattern.test(toSource(value));
    }
    /**
     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     */
    function baseKeys(object) {
        if (!isPrototype(object)) {
            return nativeKeys(object);
        }
        var result = [];
        for (var key in Object(object)) {
            if (hasOwnProperty.call(object, key) && key != 'constructor') {
                result.push(key);
            }
        }
        return result;
    }
    /**
     * Creates a clone of  `buffer`.
     *
     * @private
     * @param {Buffer} buffer The buffer to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Buffer} Returns the cloned buffer.
     */
    function cloneBuffer(buffer, isDeep) {
        if (isDeep) {
            return buffer.slice();
        }
        var result = new buffer.constructor(buffer.length);
        buffer.copy(result);
        return result;
    }
    /**
     * Creates a clone of `arrayBuffer`.
     *
     * @private
     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
     * @returns {ArrayBuffer} Returns the cloned array buffer.
     */
    function cloneArrayBuffer(arrayBuffer) {
        var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
        new Uint8Array(result).set(new Uint8Array(arrayBuffer));
        return result;
    }
    /**
     * Creates a clone of `dataView`.
     *
     * @private
     * @param {Object} dataView The data view to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned data view.
     */
    function cloneDataView(dataView, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
        return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
    }
    /**
     * Creates a clone of `map`.
     *
     * @private
     * @param {Object} map The map to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned map.
     */
    function cloneMap(map, isDeep, cloneFunc) {
        var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
        return arrayReduce(array, addMapEntry, new map.constructor);
    }
    /**
     * Creates a clone of `regexp`.
     *
     * @private
     * @param {Object} regexp The regexp to clone.
     * @returns {Object} Returns the cloned regexp.
     */
    function cloneRegExp(regexp) {
        var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
        result.lastIndex = regexp.lastIndex;
        return result;
    }
    /**
     * Creates a clone of `set`.
     *
     * @private
     * @param {Object} set The set to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned set.
     */
    function cloneSet(set, isDeep, cloneFunc) {
        var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
        return arrayReduce(array, addSetEntry, new set.constructor);
    }
    /**
     * Creates a clone of the `symbol` object.
     *
     * @private
     * @param {Object} symbol The symbol object to clone.
     * @returns {Object} Returns the cloned symbol object.
     */
    function cloneSymbol(symbol) {
        return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
    }
    /**
     * Creates a clone of `typedArray`.
     *
     * @private
     * @param {Object} typedArray The typed array to clone.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the cloned typed array.
     */
    function cloneTypedArray(typedArray, isDeep) {
        var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
        return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
    }
    /**
     * Copies the values of `source` to `array`.
     *
     * @private
     * @param {Array} source The array to copy values from.
     * @param {Array} [array=[]] The array to copy values to.
     * @returns {Array} Returns `array`.
     */
    function copyArray(source, array) {
        var index = -1, length = source.length;
        array || (array = Array(length));
        while (++index < length) {
            array[index] = source[index];
        }
        return array;
    }
    /**
     * Copies properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy properties from.
     * @param {Array} props The property identifiers to copy.
     * @param {Object} [object={}] The object to copy properties to.
     * @param {Function} [customizer] The function to customize copied values.
     * @returns {Object} Returns `object`.
     */
    function copyObject(source, props, object, customizer) {
        object || (object = {});
        var index = -1, length = props.length;
        while (++index < length) {
            var key = props[index];
            var newValue = customizer
                ? customizer(object[key], source[key], key, object, source)
                : undefined;
            assignValue(object, key, newValue === undefined ? source[key] : newValue);
        }
        return object;
    }
    /**
     * Copies own symbol properties of `source` to `object`.
     *
     * @private
     * @param {Object} source The object to copy symbols from.
     * @param {Object} [object={}] The object to copy symbols to.
     * @returns {Object} Returns `object`.
     */
    function copySymbols(source, object) {
        return copyObject(source, getSymbols(source), object);
    }
    /**
     * Creates an array of own enumerable property names and symbols of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names and symbols.
     */
    function getAllKeys(object) {
        return baseGetAllKeys(object, keys, getSymbols);
    }
    /**
     * Gets the data for `map`.
     *
     * @private
     * @param {Object} map The map to query.
     * @param {string} key The reference key.
     * @returns {*} Returns the map data.
     */
    function getMapData(map, key) {
        var data = map.__data__;
        return isKeyable(key)
            ? data[typeof key == 'string' ? 'string' : 'hash']
            : data.map;
    }
    /**
     * Gets the native function at `key` of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @param {string} key The key of the method to get.
     * @returns {*} Returns the function if it's native, else `undefined`.
     */
    function getNative(object, key) {
        var value = getValue(object, key);
        return baseIsNative(value) ? value : undefined;
    }
    /**
     * Creates an array of the own enumerable symbol properties of `object`.
     *
     * @private
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of symbols.
     */
    var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;
    /**
     * Gets the `toStringTag` of `value`.
     *
     * @private
     * @param {*} value The value to query.
     * @returns {string} Returns the `toStringTag`.
     */
    var getTag = baseGetTag;
    // Fallback for data views, maps, sets, and weak maps in IE 11,
    // for data views in Edge < 14, and promises in Node.js.
    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
        (Map$1 && getTag(new Map$1) != mapTag) ||
        (Promise$1 && getTag(Promise$1.resolve()) != promiseTag) ||
        (Set && getTag(new Set) != setTag) ||
        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
        getTag = function (value) {
            var result = objectToString.call(value), Ctor = result == objectTag ? value.constructor : undefined, ctorString = Ctor ? toSource(Ctor) : undefined;
            if (ctorString) {
                switch (ctorString) {
                    case dataViewCtorString:
                        return dataViewTag;
                    case mapCtorString:
                        return mapTag;
                    case promiseCtorString:
                        return promiseTag;
                    case setCtorString:
                        return setTag;
                    case weakMapCtorString:
                        return weakMapTag;
                }
            }
            return result;
        };
    }
    /**
     * Initializes an array clone.
     *
     * @private
     * @param {Array} array The array to clone.
     * @returns {Array} Returns the initialized clone.
     */
    function initCloneArray(array) {
        var length = array.length, result = array.constructor(length);
        // Add properties assigned by `RegExp#exec`.
        if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
            result.index = array.index;
            result.input = array.input;
        }
        return result;
    }
    /**
     * Initializes an object clone.
     *
     * @private
     * @param {Object} object The object to clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneObject(object) {
        return (typeof object.constructor == 'function' && !isPrototype(object))
            ? baseCreate(getPrototype(object))
            : {};
    }
    /**
     * Initializes an object clone based on its `toStringTag`.
     *
     * **Note:** This function only supports cloning values with tags of
     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
     *
     * @private
     * @param {Object} object The object to clone.
     * @param {string} tag The `toStringTag` of the object to clone.
     * @param {Function} cloneFunc The function to clone values.
     * @param {boolean} [isDeep] Specify a deep clone.
     * @returns {Object} Returns the initialized clone.
     */
    function initCloneByTag(object, tag, cloneFunc, isDeep) {
        var Ctor = object.constructor;
        switch (tag) {
            case arrayBufferTag:
                return cloneArrayBuffer(object);
            case boolTag:
            case dateTag:
                return new Ctor(+object);
            case dataViewTag:
                return cloneDataView(object, isDeep);
            case float32Tag:
            case float64Tag:
            case int8Tag:
            case int16Tag:
            case int32Tag:
            case uint8Tag:
            case uint8ClampedTag:
            case uint16Tag:
            case uint32Tag:
                return cloneTypedArray(object, isDeep);
            case mapTag:
                return cloneMap(object, isDeep, cloneFunc);
            case numberTag:
            case stringTag:
                return new Ctor(object);
            case regexpTag:
                return cloneRegExp(object);
            case setTag:
                return cloneSet(object, isDeep, cloneFunc);
            case symbolTag:
                return cloneSymbol(object);
        }
    }
    /**
     * Checks if `value` is a valid array-like index.
     *
     * @private
     * @param {*} value The value to check.
     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
     */
    function isIndex(value, length) {
        length = length == null ? MAX_SAFE_INTEGER : length;
        return !!length &&
            (typeof value == 'number' || reIsUint.test(value)) &&
            (value > -1 && value % 1 == 0 && value < length);
    }
    /**
     * Checks if `value` is suitable for use as unique object key.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
     */
    function isKeyable(value) {
        var type = typeof value;
        return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
            ? (value !== '__proto__')
            : (value === null);
    }
    /**
     * Checks if `func` has its source masked.
     *
     * @private
     * @param {Function} func The function to check.
     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
     */
    function isMasked(func) {
        return !!maskSrcKey && (maskSrcKey in func);
    }
    /**
     * Checks if `value` is likely a prototype object.
     *
     * @private
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
     */
    function isPrototype(value) {
        var Ctor = value && value.constructor, proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
        return value === proto;
    }
    /**
     * Converts `func` to its source code.
     *
     * @private
     * @param {Function} func The function to process.
     * @returns {string} Returns the source code.
     */
    function toSource(func) {
        if (func != null) {
            try {
                return funcToString.call(func);
            }
            catch (e) {
            }
            try {
                return ("".concat(func));
            }
            catch (e) {
            }
        }
        return '';
    }
    /**
     * This method is like `_.clone` except that it recursively clones `value`.
     *
     * @static
     * @memberOf _
     * @since 1.0.0
     * @category Lang
     * @param {*} value The value to recursively clone.
     * @returns {*} Returns the deep cloned value.
     * @see _.clone
     * @example
     *
     * var objects = [{ 'a': 1 }, { 'b': 2 }];
     *
     * var deep = _.cloneDeep(objects);
     * console.log(deep[0] === objects[0]);
     * // => false
     */
    function cloneDeep(value) {
        return baseClone(value, true, true);
    }
    /**
     * Performs a
     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
     * comparison between two values to determine if they are equivalent.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to compare.
     * @param {*} other The other value to compare.
     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
     * @example
     *
     * var object = { 'a': 1 };
     * var other = { 'a': 1 };
     *
     * _.eq(object, object);
     * // => true
     *
     * _.eq(object, other);
     * // => false
     *
     * _.eq('a', 'a');
     * // => true
     *
     * _.eq('a', Object('a'));
     * // => false
     *
     * _.eq(NaN, NaN);
     * // => true
     */
    function eq(value, other) {
        return value === other || (value !== value && other !== other);
    }
    /**
     * Checks if `value` is likely an `arguments` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
     *  else `false`.
     * @example
     *
     * _.isArguments(function() { return arguments; }());
     * // => true
     *
     * _.isArguments([1, 2, 3]);
     * // => false
     */
    function isArguments(value) {
        // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
        return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
            (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
    }
    /**
     * Checks if `value` is classified as an `Array` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
     * @example
     *
     * _.isArray([1, 2, 3]);
     * // => true
     *
     * _.isArray(document.body.children);
     * // => false
     *
     * _.isArray('abc');
     * // => false
     *
     * _.isArray(_.noop);
     * // => false
     */
    var isArray = Array.isArray;
    /**
     * Checks if `value` is array-like. A value is considered array-like if it's
     * not a function and has a `value.length` that's an integer greater than or
     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
     * @example
     *
     * _.isArrayLike([1, 2, 3]);
     * // => true
     *
     * _.isArrayLike(document.body.children);
     * // => true
     *
     * _.isArrayLike('abc');
     * // => true
     *
     * _.isArrayLike(_.noop);
     * // => false
     */
    function isArrayLike(value) {
        return value != null && isLength(value.length) && !isFunction$1(value);
    }
    /**
     * This method is like `_.isArrayLike` except that it also checks if `value`
     * is an object.
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an array-like object,
     *  else `false`.
     * @example
     *
     * _.isArrayLikeObject([1, 2, 3]);
     * // => true
     *
     * _.isArrayLikeObject(document.body.children);
     * // => true
     *
     * _.isArrayLikeObject('abc');
     * // => false
     *
     * _.isArrayLikeObject(_.noop);
     * // => false
     */
    function isArrayLikeObject(value) {
        return isObjectLike(value) && isArrayLike(value);
    }
    /**
     * Checks if `value` is a buffer.
     *
     * @static
     * @memberOf _
     * @since 4.3.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
     * @example
     *
     * _.isBuffer(new Buffer(2));
     * // => true
     *
     * _.isBuffer(new Uint8Array(2));
     * // => false
     */
    var isBuffer = nativeIsBuffer || stubFalse;
    /**
     * Checks if `value` is classified as a `Function` object.
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
     * @example
     *
     * _.isFunction(_);
     * // => true
     *
     * _.isFunction(/abc/);
     * // => false
     */
    function isFunction$1(value) {
        // The use of `Object#toString` avoids issues with the `typeof` operator
        // in Safari 8-9 which returns 'object' for typed array and other constructors.
        var tag = isObject$1(value) ? objectToString.call(value) : '';
        return tag == funcTag || tag == genTag;
    }
    /**
     * Checks if `value` is a valid array-like length.
     *
     * **Note:** This method is loosely based on
     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
     * @example
     *
     * _.isLength(3);
     * // => true
     *
     * _.isLength(Number.MIN_VALUE);
     * // => false
     *
     * _.isLength(Infinity);
     * // => false
     *
     * _.isLength('3');
     * // => false
     */
    function isLength(value) {
        return typeof value == 'number' &&
            value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    /**
     * Checks if `value` is the
     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
     *
     * @static
     * @memberOf _
     * @since 0.1.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
     * @example
     *
     * _.isObject({});
     * // => true
     *
     * _.isObject([1, 2, 3]);
     * // => true
     *
     * _.isObject(_.noop);
     * // => true
     *
     * _.isObject(null);
     * // => false
     */
    function isObject$1(value) {
        var type = typeof value;
        return !!value && (type == 'object' || type == 'function');
    }
    /**
     * Checks if `value` is object-like. A value is object-like if it's not `null`
     * and has a `typeof` result of "object".
     *
     * @static
     * @memberOf _
     * @since 4.0.0
     * @category Lang
     * @param {*} value The value to check.
     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
     * @example
     *
     * _.isObjectLike({});
     * // => true
     *
     * _.isObjectLike([1, 2, 3]);
     * // => true
     *
     * _.isObjectLike(_.noop);
     * // => false
     *
     * _.isObjectLike(null);
     * // => false
     */
    function isObjectLike(value) {
        return !!value && typeof value == 'object';
    }
    /**
     * Creates an array of the own enumerable property names of `object`.
     *
     * **Note:** Non-object values are coerced to objects. See the
     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
     * for more details.
     *
     * @static
     * @since 0.1.0
     * @memberOf _
     * @category Object
     * @param {Object} object The object to query.
     * @returns {Array} Returns the array of property names.
     * @example
     *
     * function Foo() {
     *   this.a = 1;
     *   this.b = 2;
     * }
     *
     * Foo.prototype.c = 3;
     *
     * _.keys(new Foo);
     * // => ['a', 'b'] (iteration order is not guaranteed)
     *
     * _.keys('hi');
     * // => ['0', '1']
     */
    function keys(object) {
        return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    /**
     * This method returns a new empty array.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {Array} Returns the new empty array.
     * @example
     *
     * var arrays = _.times(2, _.stubArray);
     *
     * console.log(arrays);
     * // => [[], []]
     *
     * console.log(arrays[0] === arrays[1]);
     * // => false
     */
    function stubArray() {
        return [];
    }
    /**
     * This method returns `false`.
     *
     * @static
     * @memberOf _
     * @since 4.13.0
     * @category Util
     * @returns {boolean} Returns `false`.
     * @example
     *
     * _.times(2, _.stubFalse);
     * // => [false, false]
     */
    function stubFalse() {
        return false;
    }

    /**
     * @desc Cloudinary media asset, with all possible transformations
     * @summary SDK
     * @memberOf SDK
     */
    var CloudinaryMedia = /** @class */ (function (_super) {
        __extends(CloudinaryMedia, _super);
        function CloudinaryMedia(publicID, cloudConfig, urlConfig) {
            /* istanbul ignore next */
            return _super.call(this, publicID, cloudConfig, urlConfig, new Transformation$1()) || this;
        }
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.Transcode} action
         * @return {this}
         */
        CloudinaryMedia.prototype.transcode = function (action) {
            this.transformation.transcode(action);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @param {Actions.VideoEdit} action
         * @return {this}
         */
        CloudinaryMedia.prototype.videoEdit = function (action) {
            this.transformation.videoEdit(action);
            return this;
        };
        /**
         * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
         * @return {this}
         */
        CloudinaryMedia.prototype.underlay = function (underlayAction) {
            this.transformation.underlay(underlayAction);
            return this;
        };
        CloudinaryMedia.prototype.clone = function () {
            return cloneDeep(this);
        };
        return CloudinaryMedia;
    }(CloudinaryTransformable));

    var Cloudinary = /** @class */ (function () {
        function Cloudinary(cloudinaryConfig) {
            if (cloudinaryConfig) {
                this.cloudinaryConfig = cloudinaryConfig;
            }
        }
        Cloudinary.prototype.image = function (publicID) {
            return new CloudinaryImage(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
        };
        Cloudinary.prototype.video = function (publicID) {
            return new CloudinaryVideo(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
        };
        Cloudinary.prototype.setConfig = function (cloudinaryConfig) {
            this.cloudinaryConfig = cloudinaryConfig;
            return this;
        };
        Cloudinary.prototype.getConfig = function () {
            return this.cloudinaryConfig;
        };
        Cloudinary.prototype.extendConfig = function () {
            // Future implementation
        };
        return Cloudinary;
    }());

    /**
     *
     * @param a
     */
    function isObject(a) {
        return typeof a === 'object' && a !== null;
    }

    /**
     *
     * @private
     * @description An isomorphic Base64 function, provides browser and server support.
     * @param {string} input - A string to encode with base64
     */
    function base64Encode(input) {
        // Browser
        var encodedResult = '';
        if (typeof window !== 'undefined') {
            // encodeURI the input to support unicode characters
            // Since the URI might be encoded already, we try to decode it once before
            encodedResult = btoa(encodeURI(decodeURI(input)));
        }
        else {
            // NodeJS support
            encodedResult = global.Buffer.from(input).toString('base64');
        }
        return encodedResult
            .replace(/\+/g, '-') // Convert '+' to '-'
            .replace(/\//g, '_'); // Convert '/' to '_';
    }

    var LEGACY_CONDITIONAL_OPERATORS = {
        "=": 'eq',
        "!=": 'ne',
        "<": 'lt',
        ">": 'gt',
        "<=": 'lte',
        ">=": 'gte',
        "&&": 'and',
        "||": 'or',
        "*": "mul",
        "/": "div",
        "+": "add",
        "-": "sub",
        "^": "pow"
    };
    var OLD_AKAMAI_SHARED_CDN = "cloudinary-a.akamaihd.net";
    var AKAMAI_SHARED_CDN = "res.cloudinary.com";
    var SHARED_CDN = AKAMAI_SHARED_CDN;
    var LEGACY_PREDEFINED_VARS = {
        "aspect_ratio": "ar",
        "aspectRatio": "ar",
        "current_page": "cp",
        "currentPage": "cp",
        "duration": "du",
        "face_count": "fc",
        "faceCount": "fc",
        "height": "h",
        "initial_aspect_ratio": "iar",
        "initial_height": "ih",
        "initial_width": "iw",
        "initialAspectRatio": "iar",
        "initialHeight": "ih",
        "initialWidth": "iw",
        "initial_duration": "idu",
        "initialDuration": "idu",
        "page_count": "pc",
        "page_x": "px",
        "page_y": "py",
        "pageCount": "pc",
        "pageX": "px",
        "pageY": "py",
        "tags": "tags",
        "width": "w"
    };
    var NUMBER_PATTERN = "([0-9]*)\\.([0-9]+)|([0-9]+)";
    var OFFSET_ANY_PATTERN = "(".concat(NUMBER_PATTERN, ")([%pP])?");
    var RANGE_VALUE_RE = RegExp("^".concat(OFFSET_ANY_PATTERN, "$"));
    var OFFSET_ANY_PATTERN_RE = RegExp("(".concat(OFFSET_ANY_PATTERN, ")\\.\\.(").concat(OFFSET_ANY_PATTERN, ")"));
    var LAYER_KEYWORD_PARAMS = {
        font_weight: "normal",
        font_style: "normal",
        text_decoration: "none",
        text_align: '',
        stroke: "none"
    };

    // Based on CGI::unescape. In addition does not escape / :
    // smart_escape = (string)->
    //  encodeURIComponent(string).replace(/%3A/g, ":").replace(/%2F/g, "/")
    function smartEscape(string, unsafe) {
        if (unsafe === void 0) { unsafe = /([^a-zA-Z0-9_.\-\/:]+)/g; }
        return string.replace(unsafe, function (match) {
            return match.split("").map(function (c) {
                return "%" + c.charCodeAt(0).toString(16).toUpperCase();
            }).join("");
        });
    }

    /**
     * Converts string to snake case
     * @param {string} str
     */
    var snakeCase = function (str) { return str.replace(/[A-Z]/g, function (letter) { return "_".concat(letter.toLowerCase()); }); };

    var Layer = /** @class */ (function () {
        /**
         * Layer
         * @constructor Layer
         * @param {Object} options - layer parameters
         */
        function Layer(options) {
            var _this = this;
            this.options = {};
            if (options != null) {
                ["resourceType", "type", "publicId", "format"].forEach(function (key) {
                    var ref;
                    // @ts-ignore
                    return _this.options[key] = (ref = options[key]) != null ? ref : options[snakeCase(key)];
                });
            }
        }
        Layer.prototype.resourceType = function (value) {
            this.options.resourceType = value;
            return this;
        };
        Layer.prototype.type = function (value) {
            this.options.type = value;
            return this;
        };
        Layer.prototype.publicId = function (value) {
            this.options.publicId = value;
            return this;
        };
        /**
         * Get the public ID, formatted for layer parameter
         * @function Layer#getPublicId
         * @return {String} public ID
         */
        Layer.prototype.getPublicId = function () {
            var ref;
            return (ref = this.options.publicId) != null ? ref.replace(/\//g, ":") : void 0;
        };
        /**
         * Get the public ID, with format if present
         * @function Layer#getFullPublicId
         * @return {String} public ID
         */
        Layer.prototype.getFullPublicId = function () {
            if (this.options.format != null) {
                return this.getPublicId() + "." + this.options.format;
            }
            else {
                return this.getPublicId();
            }
        };
        Layer.prototype.format = function (value) {
            this.options.format = value;
            return this;
        };
        /**
         * generate the string representation of the layer
         * @function Layer#toString
         */
        Layer.prototype.toString = function () {
            var components = [];
            if (this.options.publicId == null) {
                throw "Must supply publicId";
            }
            if (!(this.options.resourceType === "image")) {
                components.push(this.options.resourceType);
            }
            if (!(this.options.type === "upload")) {
                components.push(this.options.type);
            }
            components.push(this.getFullPublicId());
            return components.filter(function (x) { return !!x; }).join(":");
        };
        Layer.prototype.clone = function () {
            return new Layer(this.options);
        };
        return Layer;
    }());

    function isEmpty(value) {
        return value === undefined ||
            value === null ||
            (typeof value === "object" && Object.keys(value).length === 0) ||
            (typeof value === "string" && value.trim().length === 0);
    }

    /**
     * Return true is value is a number or a string representation of a number.
     * @function Util.isNumberLike
     * @param {*} value
     * @returns {boolean} true if value is a number
     * @example
     *    Util.isNumber(0) // true
     *    Util.isNumber("1.3") // true
     *    Util.isNumber("") // false
     *    Util.isNumber(undefined) // false
     */
    var isNumberLike = function (value) {
        return (value != null) && !isNaN(parseFloat(value));
    };

    var TextLayer = /** @class */ (function (_super) {
        __extends(TextLayer, _super);
        /**
         * @constructor TextLayer
         * @param {Object} options - layer parameters
         */
        function TextLayer(options) {
            var _this = this;
            var keys;
            _this = _super.call(this, options) || this;
            keys = ["resourceType", "resourceType", "fontFamily", "fontSize", "fontWeight", "fontStyle", "textDecoration", "textAlign", "stroke", "letterSpacing", "lineSpacing", "fontHinting", "fontAntialiasing", "text"];
            if (options != null) {
                keys.forEach(function (key) {
                    var ref;
                    // @ts-ignore
                    return _this.options[key] = (ref = options[key]) != null ? ref : options[snakeCase(key)];
                });
            }
            _this.options.resourceType = "text";
            return _this;
        }
        //@ts-ignore
        TextLayer.prototype.resourceType = function (resourceType) {
            throw "Cannot modify resourceType for text layers";
        };
        //@ts-ignore
        TextLayer.prototype.type = function (type) {
            throw "Cannot modify type for text layers";
        };
        TextLayer.prototype.format = function (format) {
            throw "Cannot modify format for text layers";
        };
        TextLayer.prototype.fontFamily = function (fontFamily) {
            this.options.fontFamily = fontFamily;
            return this;
        };
        TextLayer.prototype.fontSize = function (fontSize) {
            this.options.fontSize = fontSize;
            return this;
        };
        TextLayer.prototype.fontWeight = function (fontWeight) {
            this.options.fontWeight = fontWeight;
            return this;
        };
        TextLayer.prototype.fontStyle = function (fontStyle) {
            this.options.fontStyle = fontStyle;
            return this;
        };
        TextLayer.prototype.textDecoration = function (textDecoration) {
            this.options.textDecoration = textDecoration;
            return this;
        };
        TextLayer.prototype.textAlign = function (textAlign) {
            this.options.textAlign = textAlign;
            return this;
        };
        TextLayer.prototype.stroke = function (stroke) {
            this.options.stroke = stroke;
            return this;
        };
        TextLayer.prototype.letterSpacing = function (letterSpacing) {
            this.options.letterSpacing = letterSpacing;
            return this;
        };
        TextLayer.prototype.lineSpacing = function (lineSpacing) {
            this.options.lineSpacing = lineSpacing;
            return this;
        };
        TextLayer.prototype.fontHinting = function (fontHinting) {
            this.options.fontHinting = fontHinting;
            return this;
        };
        TextLayer.prototype.fontAntialiasing = function (fontAntialiasing) {
            this.options.fontAntialiasing = fontAntialiasing;
            return this;
        };
        TextLayer.prototype.text = function (text) {
            this.options.text = text;
            return this;
        };
        /**
         * generate the string representation of the layer
         * @function TextLayer#toString
         * @return {String}
         */
        TextLayer.prototype.toString = function () {
            var components, hasPublicId, hasStyle, publicId, re, res, start, style, text, textSource;
            style = this.textStyleIdentifier();
            if (this.options.publicId != null) {
                publicId = this.getFullPublicId();
            }
            if (this.options.text != null) {
                hasPublicId = !isEmpty(publicId);
                hasStyle = !isEmpty(style);
                if (hasPublicId && hasStyle || !hasPublicId && !hasStyle) {
                    throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay, but not both!";
                }
                re = /\$\([a-zA-Z]\w*\)/g;
                start = 0;
                //        textSource = text.replace(new RegExp("[,/]", 'g'), (c)-> "%#{c.charCodeAt(0).toString(16).toUpperCase()}")
                textSource = smartEscape(this.options.text, /[,\/]/g);
                text = "";
                while (res = re.exec(textSource)) {
                    text += smartEscape(textSource.slice(start, res.index));
                    text += res[0];
                    start = res.index + res[0].length;
                }
                text += smartEscape(textSource.slice(start));
            }
            components = [this.options.resourceType, style, publicId, text];
            return (components).filter(function (x) { return !!x; }).join(":");
        };
        TextLayer.prototype.textStyleIdentifier = function () {
            var components;
            components = [];
            if (this.options.fontWeight !== "normal") {
                components.push(this.options.fontWeight);
            }
            if (this.options.fontStyle !== "normal") {
                components.push(this.options.fontStyle);
            }
            if (this.options.textDecoration !== "none") {
                components.push(this.options.textDecoration);
            }
            components.push(this.options.textAlign);
            if (this.options.stroke !== "none") {
                components.push(this.options.stroke);
            }
            if (!(isEmpty(this.options.letterSpacing) && !isNumberLike(this.options.letterSpacing))) {
                components.push("letter_spacing_" + this.options.letterSpacing);
            }
            if (!(isEmpty(this.options.lineSpacing) && !isNumberLike(this.options.lineSpacing))) {
                components.push("line_spacing_" + this.options.lineSpacing);
            }
            if (!(isEmpty(this.options.fontAntialiasing))) {
                components.push("antialias_" + this.options.fontAntialiasing);
            }
            if (!(isEmpty(this.options.fontHinting))) {
                components.push("hinting_" + this.options.fontHinting);
            }
            if (!isEmpty(components.filter(function (x) { return !!x; }))) {
                if (isEmpty(this.options.fontFamily)) {
                    throw "Must supply fontFamily. ".concat(components);
                }
                if (isEmpty(this.options.fontSize) && !isNumberLike(this.options.fontSize)) {
                    throw "Must supply fontSize.";
                }
            }
            components.unshift(this.options.fontFamily, this.options.fontSize);
            components = components.filter(function (x) { return !!x; }).join("_");
            return components;
        };
        return TextLayer;
    }(Layer));

    /**
     * Parse layer options
     * @private
     * @param {object|*} layer The layer to parse.
     * @return {string} layer transformation string
     */
    function textStyle(layer) {
        var keywords = [];
        var style = "";
        Object.keys(LAYER_KEYWORD_PARAMS).forEach(function (attr) {
            var default_value = LAYER_KEYWORD_PARAMS[attr];
            var attr_value = layer[attr] || default_value;
            if (attr_value !== default_value) {
                keywords.push(attr_value);
            }
        });
        Object.keys(layer).forEach(function (attr) {
            if (attr === "letter_spacing" || attr === "line_spacing") {
                keywords.push("".concat(attr, "_").concat(layer[attr]));
            }
            if (attr === "font_hinting") {
                keywords.push("".concat(attr.split("_").pop(), "_").concat(layer[attr]));
            }
            if (attr === "font_antialiasing") {
                keywords.push("antialias_".concat(layer[attr]));
            }
        });
        if (layer.hasOwnProperty("font_size" ) || !keywords || keywords.length === 0) {
            if (!layer.font_size)
                throw "Must supply font_size for text in overlay/underlay";
            if (!layer.font_family)
                throw "Must supply font_family for text in overlay/underlay";
            keywords.unshift(layer.font_size);
            keywords.unshift(layer.font_family);
            style = keywords.filter(function (a) { return a; }).join("_");
        }
        return style;
    }
    function processLayer(layer) {
        if (layer instanceof TextLayer || layer instanceof Layer) {
            return layer.toString();
        }
        var result = '';
        if (isObject(layer)) {
            if (layer.resource_type === "fetch" || (layer.url != null)) {
                result = "fetch:".concat(base64Encode(layer.url));
            }
            else {
                var public_id = layer.public_id;
                var format = layer.format;
                var resource_type = layer.resource_type || "image";
                var type = layer.type || "upload";
                var text = layer.text;
                var style = null;
                var components = [];
                var noPublicId = !public_id || public_id.length === 0;
                if (!noPublicId) {
                    public_id = public_id.replace(new RegExp("/", 'g'), ":");
                    if (format != null) {
                        public_id = "".concat(public_id, ".").concat(format);
                    }
                }
                if ((!text || text.length === 0) && resource_type !== "text") {
                    if (noPublicId) {
                        throw "Must supply public_id for resource_type layer_parameter";
                    }
                    if (resource_type === "subtitles") {
                        style = textStyle(layer);
                    }
                }
                else {
                    resource_type = "text";
                    type = null;
                    // type is ignored for text layers
                    style = textStyle(layer);
                    if (text && text.length >= 0) {
                        var noStyle = !style;
                        if (!(noPublicId || noStyle) || (noPublicId && noStyle)) {
                            throw "Must supply either style parameters or a public_id when providing text parameter in a text overlay/underlay";
                        }
                        var re = /\$\([a-zA-Z]\w*\)/g;
                        var start = 0;
                        var textSource = smartEscape(decodeURIComponent(text), /[,\/]/g);
                        text = "";
                        for (var res = re.exec(textSource); res; res = re.exec(textSource)) {
                            text += smartEscape(textSource.slice(start, res.index));
                            text += res[0];
                            start = res.index + res[0].length;
                        }
                        text += encodeURIComponent(textSource.slice(start));
                    }
                }
                if (resource_type !== "image") {
                    components.push(resource_type);
                }
                if (type !== "upload") {
                    components.push(type);
                }
                components.push(style);
                components.push(public_id);
                components.push(text);
                result = components.filter(function (a) { return a; }).join(":");
            }
        }
        else if (/^fetch:.+/.test(layer)) {
            result = "fetch:".concat(base64Encode(layer.substr(6)));
        }
        else {
            result = layer;
        }
        return result;
    }

    /**
     * Normalize an offset value
     * @param {String} expression a decimal value which may have a 'p' or '%' postfix. E.g. '35%', '0.4p'
     * @return {Object|String} a normalized String of the input value if possible otherwise the value itself
     */
    function legacyNormalizeExpression(expression) {
        if (typeof expression !== 'string' || expression.length === 0 || expression.match(/^!.+!$/)) {
            if (expression) {
                return expression.toString();
            }
            else {
                return expression;
            }
        }
        expression = String(expression);
        var operators = "\\|\\||>=|<=|&&|!=|>|=|<|/|-|\\+|\\*|\\^";
        // operators
        var operatorsPattern = "((" + operators + ")(?=[ _]))";
        var operatorsReplaceRE = new RegExp(operatorsPattern, "g");
        expression = expression.replace(operatorsReplaceRE, function (match) {
            return LEGACY_CONDITIONAL_OPERATORS[match];
        });
        // predefined variables
        var predefinedVarsPattern = "(" + Object.keys(LEGACY_PREDEFINED_VARS).join("|") + ")";
        var userVariablePattern = '(\\$_*[^_ ]+)';
        var variablesReplaceRE = new RegExp("".concat(userVariablePattern, "|").concat(predefinedVarsPattern), "g");
        // @ts-ignore
        expression = expression.replace(variablesReplaceRE, function (match) { return (LEGACY_PREDEFINED_VARS[match] || match); });
        return expression.replace(/[ _]+/g, '_');
    }

    /**
     * Parse "if" parameter
     * Translates the condition if provided.
     * @private
     * @return {string} "if_" + ifValue
     */
    function process_if(ifValue) {
        return ifValue ? "if_" + legacyNormalizeExpression(ifValue) : ifValue;
    }

    /**
     *
     * @param arg
     */
    function toArray(arg) {
        switch (true) {
            case arg == null:
                return [];
            case Array.isArray(arg):
                return arg;
            default:
                return [arg];
        }
    }

    /**
     * Parse radius options
     * @private
     * @param {Array<string|number>|string|number} _radius The radius to parse
     * @return {string} radius transformation string
     */
    function processRadius(_radius) {
        var radius = _radius;
        if (!radius) {
            return radius;
        }
        if (!Array.isArray(radius)) {
            radius = [radius];
        }
        if (radius.length === 0 || radius.length > 4) {
            throw new Error("Radius array should contain between 1 and 4 values");
        }
        if (radius.findIndex(function (x) { return x === null; }) >= 0) {
            throw new Error("Corner: Cannot be null");
        }
        return radius.map(legacyNormalizeExpression).join(':');
    }

    /**
     * Parse custom_function options
     * @private
     * @param {object|*} customFunction a custom function object containing function_type and source values
     * @return {string|*} custom_function transformation string
     */
    function processCustomFunction$1(customFunction) {
        if (!isObject(customFunction)) {
            return customFunction;
        }
        if (customFunction.function_type === "remote") {
            var encodedSource = base64Encode(customFunction.source)
                .replace(/\+/g, '-') // Convert '+' to '-'
                .replace(/\//g, '_') // Convert '/' to '_'
                .replace(/=+$/, ''); // Remove ending '='
            return [customFunction.function_type, encodedSource].join(":");
        }
        return [customFunction.function_type, customFunction.source].join(":");
    }

    /**
     * Parse custom_pre_function options
     * @private
     * @param {object|*} customPreFunction a custom function object containing function_type and source values
     * @return {string|*} custom_pre_function transformation string
     */
    function processCustomPreFunction(customPreFunction) {
        var result = processCustomFunction$1(customPreFunction);
        return typeof result === 'string' ? "pre:".concat(result) : null;
    }

    /**
     * Split a range into the start and end values
     * @param range
     */
    function splitRange(range) {
        switch (range && range.constructor) {
            case String:
                if (!OFFSET_ANY_PATTERN_RE.test(range)) {
                    return range;
                }
                return range.split("..");
            case Array:
                return [[range], range[range.length - 1]];
            default:
                return [null, null];
        }
    }

    /**
     *
     * @param value
     */
    function normRangeValues(value) {
        var offset = String(value).match(RANGE_VALUE_RE);
        if (offset) {
            var modifier = offset[5] ? 'p' : '';
            return "".concat(offset[1] || offset[4]).concat(modifier);
        }
        else {
            return value;
        }
    }

    /**
     * A video codec parameter can be either a String or a Hash.
     * @param {Object} param <code>vc_<codec>[ : <profile> : [<level>]]</code>
     *                       or <code>{ codec: 'h264', profile: 'basic', level: '3.1' }</code>
     * @return {String} <code><codec> : <profile> : [<level>]]</code> if a Hash was provided
     *                   or the param if a String was provided.
     *                   Returns null if param is not a Hash or String
     */
    function processVideoParams(param) {
        switch (param && param.constructor) {
            case Object: {
                var video = "";
                if ('codec' in param) {
                    video = param.codec;
                    if ('profile' in param) {
                        video += ":" + param.profile;
                        if ('level' in param) {
                            video += ":" + param.level;
                        }
                    }
                }
                return video;
            }
            case String:
                return param;
            default:
                return null;
        }
    }

    /**
     * Represents a transformation expression.
     * @param {string} expressionStr - An expression in string format.
     * @class Expression
     *
     */
    var Expression = /** @class */ (function () {
        function Expression(expressionStr) {
            /**
             * @protected
             * @inner Expression-expressions
             */
            this.expressions = [];
            if (expressionStr != null) {
                this.expressions.push(Expression.normalize(expressionStr));
            }
        }
        /**
         * Convenience constructor method
         * @function Expression.new
         */
        Expression.new = function (expressionStr) {
            return new this(expressionStr);
        };
        /**
         * Normalize a string expression
         * @function Cloudinary#normalize
         * @param {string} expression a expression, e.g. "w gt 100", "width_gt_100", "width > 100"
         * @return {string} the normalized form of the value expression, e.g. "w_gt_100"
         */
        Expression.normalize = function (expression) {
            var operators, operatorsPattern, operatorsReplaceRE, predefinedVarsPattern, predefinedVarsReplaceRE;
            if (expression == null) {
                return expression;
            }
            expression = String(expression);
            operators = "\\|\\||>=|<=|&&|!=|>|=|<|/|-|\\+|\\*|\\^";
            // operators
            operatorsPattern = "((" + operators + ")(?=[ _]))";
            operatorsReplaceRE = new RegExp(operatorsPattern, "g");
            // @ts-ignore
            expression = expression.replace(operatorsReplaceRE, function (match) { return OPERATORS[match]; });
            // predefined variables
            predefinedVarsPattern = "(" + Object.keys(PREDEFINED_VARS).join("|") + ")";
            predefinedVarsReplaceRE = new RegExp(predefinedVarsPattern, "g");
            // @ts-ignore
            expression = expression.replace(predefinedVarsReplaceRE, function (match, p1, offset) { return (expression[offset - 1] === '$' ? match : PREDEFINED_VARS[match]); });
            return expression.replace(/[ _]+/g, '_');
        };
        /**
         * Serialize the expression
         * @return {string} the expression as a string
         */
        Expression.prototype.serialize = function () {
            return Expression.normalize(this.expressions.join("_"));
        };
        Expression.prototype.toString = function () {
            return this.serialize();
        };
        /**
         * Get the parent transformation of this expression
         * @return Transformation
         */
        Expression.prototype.getParent = function () {
            return this.parent;
        };
        /**
         * Set the parent transformation of this expression
         * @param {Transformation} the parent transformation
         * @return {Expression} this expression
         */
        Expression.prototype.setParent = function (parent) {
            this.parent = parent;
            return this;
        };
        /**
         * Add a expression
         * @function Expression#predicate
         * @internal
         */
        Expression.prototype.predicate = function (name, operator, value) {
            // @ts-ignore
            if (OPERATORS[operator] != null) {
                // @ts-ignore
                operator = OPERATORS[operator];
            }
            this.expressions.push("".concat(name, "_").concat(operator, "_").concat(value));
            return this;
        };
        /**
         * @function Expression#and
         */
        Expression.prototype.and = function () {
            this.expressions.push("and");
            return this;
        };
        /**
         * @function Expression#or
         */
        Expression.prototype.or = function () {
            this.expressions.push("or");
            return this;
        };
        /**
         * Conclude expression
         * @function Expression#then
         * @return {Transformation} the transformation this expression is defined for
         */
        Expression.prototype.then = function () {
            return this.getParent().if(this.toString());
        };
        /**
         * @function Expression#height
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Expression} this expression
         */
        Expression.prototype.height = function (operator, value) {
            return this.predicate("h", operator, value);
        };
        /**
         * @function Expression#width
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Expression} this expression
         */
        Expression.prototype.width = function (operator, value) {
            return this.predicate("w", operator, value);
        };
        /**
         * @function Expression#aspectRatio
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Expression} this expression
         */
        Expression.prototype.aspectRatio = function (operator, value) {
            return this.predicate("ar", operator, value);
        };
        /**
         * @function Expression#pages
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Expression} this expression
         */
        Expression.prototype.pageCount = function (operator, value) {
            return this.predicate("pc", operator, value);
        };
        /**
         * @function Expression#faces
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Expression} this expression
         */
        Expression.prototype.faceCount = function (operator, value) {
            return this.predicate("fc", operator, value);
        };
        Expression.prototype.value = function (value) {
            this.expressions.push(value);
            return this;
        };
        /**
         */
        Expression.variable = function (name, value) {
            return new this(name).value(value);
        };
        /**
         * @returns Expression a new expression with the predefined variable "width"
         * @function Expression.width
         */
        Expression.width = function () {
            return new this("width");
        };
        /**
         * @returns Expression a new expression with the predefined variable "height"
         * @function Expression.height
         */
        Expression.height = function () {
            return new this("height");
        };
        /**
         * @returns Expression a new expression with the predefined variable "initialWidth"
         * @function Expression.initialWidth
         */
        Expression.initialWidth = function () {
            return new this("initialWidth");
        };
        /**
         * @returns Expression a new expression with the predefined variable "initialHeight"
         * @function Expression.initialHeight
         */
        Expression.initialHeight = function () {
            return new this("initialHeight");
        };
        /**
         * @returns Expression a new expression with the predefined variable "aspectRatio"
         * @function Expression.aspectRatio
         */
        Expression.aspectRatio = function () {
            return new this("aspectRatio");
        };
        /**
         * @returns Expression a new expression with the predefined variable "initialAspectRatio"
         * @function Expression.initialAspectRatio
         */
        Expression.initialAspectRatio = function () {
            return new this("initialAspectRatio");
        };
        /**
         * @returns Expression a new expression with the predefined variable "pageCount"
         * @function Expression.pageCount
         */
        Expression.pageCount = function () {
            return new this("pageCount");
        };
        /**
         * @returns Expression new expression with the predefined variable "faceCount"
         * @function Expression.faceCount
         */
        Expression.faceCount = function () {
            return new this("faceCount");
        };
        /**
         * @returns Expression a new expression with the predefined variable "currentPage"
         * @function Expression.currentPage
         */
        Expression.currentPage = function () {
            return new this("currentPage");
        };
        /**
         * @returns Expression a new expression with the predefined variable "tags"
         * @function Expression.tags
         */
        Expression.tags = function () {
            return new this("tags");
        };
        /**
         * @returns Expression a new expression with the predefined variable "pageX"
         * @function Expression.pageX
         */
        Expression.pageX = function () {
            return new this("pageX");
        };
        /**
         * @returns Expression a new expression with the predefined variable "pageY"
         * @function Expression.pageY
         */
        Expression.pageY = function () {
            return new this("pageY");
        };
        return Expression;
    }());
    /**
     * @internal
     */
    var OPERATORS = {
        "=": 'eq',
        "!=": 'ne',
        "<": 'lt',
        ">": 'gt',
        "<=": 'lte',
        ">=": 'gte',
        "&&": 'and',
        "||": 'or',
        "*": "mul",
        "/": "div",
        "+": "add",
        "-": "sub",
        "^": "pow",
    };
    /**
     * @internal
     */
    var PREDEFINED_VARS = {
        "aspect_ratio": "ar",
        "aspectRatio": "ar",
        "current_page": "cp",
        "currentPage": "cp",
        "preview:duration": "preview:duration",
        "duration": "du",
        "face_count": "fc",
        "faceCount": "fc",
        "height": "h",
        "initial_aspect_ratio": "iar",
        "initial_duration": "idu",
        "initial_height": "ih",
        "initial_width": "iw",
        "initialAspectRatio": "iar",
        "initialDuration": "idu",
        "initialHeight": "ih",
        "initialWidth": "iw",
        "page_count": "pc",
        "page_x": "px",
        "page_y": "py",
        "pageCount": "pc",
        "pageX": "px",
        "pageY": "py",
        "tags": "tags",
        "width": "w"
    };

    /**
     * Represents a transformation condition.
     * @param {string} conditionStr - a condition in string format
     * @class Condition
     * @example
     * // normally this class is not instantiated directly
     * var tr = cloudinary.Transformation.new()
     *    .if().width( ">", 1000).and().aspectRatio("<", "3:4").then()
     *      .width(1000)
     *      .crop("scale")
     *    .else()
     *      .width(500)
     *      .crop("scale")
     *
     * var tr = cloudinary.Transformation.new()
     *    .if("w > 1000 and aspectRatio < 3:4")
     *      .width(1000)
     *      .crop("scale")
     *    .else()
     *      .width(500)
     *      .crop("scale")
     *
     */
    var Condition = /** @class */ (function (_super) {
        __extends(Condition, _super);
        function Condition(conditionStr) {
            return _super.call(this, conditionStr) || this;
        }
        /**
         * @function Condition#height
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Condition} this condition
         */
        Condition.prototype.height = function (operator, value) {
            return this.predicate("h", operator, value);
        };
        /**
         * @function Condition#width
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Condition} this condition
         */
        Condition.prototype.width = function (operator, value) {
            return this.predicate("w", operator, value);
        };
        /**
         * @function Condition#aspectRatio
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Condition} this condition
         */
        Condition.prototype.aspectRatio = function (operator, value) {
            return this.predicate("ar", operator, value);
        };
        /**
         * @function Condition#pages
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Condition} this condition
         */
        Condition.prototype.pageCount = function (operator, value) {
            return this.predicate("pc", operator, value);
        };
        /**
         * @function Condition#faces
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Condition} this condition
         */
        Condition.prototype.faceCount = function (operator, value) {
            return this.predicate("fc", operator, value);
        };
        /**
         * @function Condition#duration
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Condition} this condition
         */
        Condition.prototype.duration = function (operator, value) {
            return this.predicate("du", operator, value);
        };
        /**
         * @function Condition#initialDuration
         * @param {string} operator the comparison operator (e.g. "<", "lt")
         * @param {string|number} value the right hand side value
         * @return {Condition} this condition
         */
        Condition.prototype.initialDuration = function (operator, value) {
            return this.predicate("idu", operator, value);
        };
        return Condition;
    }(Expression));

    var CONFIG_PARAMS = [
        "api_key",
        "api_secret",
        "callback",
        "cdn_subdomain",
        "cloud_name",
        "cname",
        "private_cdn",
        "protocol",
        "resource_type",
        "responsive",
        "responsive_class",
        "responsive_use_breakpoints",
        "responsive_width",
        "round_dpr",
        "secure",
        "secure_cdn_subdomain",
        "secure_distribution",
        "shorten",
        "type",
        "upload_preset",
        "url_suffix",
        "use_root_path",
        "version",
        "externalLibraries",
        "max_timeout_ms"
    ];

    /**
     * Create a copy of the source object with all keys in camelCase
     * @function Util.withCamelCaseKeys
     * @return {Object} a new object
     * @param source
     */
    var withCamelCaseKeys = function (source) {
        return convertKeys(source, camelCase);
    };
    /**
     * Convert string to camelCase
     * @function Util.camelCase
     * @param {string} source - the string to convert
     * @return {string} in camelCase format
     */
    var camelCase = function (source) {
        var words = source.match(reWords);
        words = words.map(function (word) { return word.charAt(0).toLocaleUpperCase() + word.slice(1).toLocaleLowerCase(); });
        words[0] = words[0].toLocaleLowerCase();
        return words.join('');
    };
    /**
     * Creates a new object from source, with the keys transformed using the converter.
     * @param {object} source
     * @param {function|null} converter
     * @returns {object}
     */
    var convertKeys = function (source, converter) {
        var result, value;
        result = {};
        for (var key in source) {
            value = source[key];
            if (converter) {
                key = converter(key);
            }
            if (!isEmpty(key)) {
                // @ts-ignore
                result[key] = value;
            }
        }
        return result;
    };
    var reWords = (function () {
        var lower, upper;
        upper = '[A-Z]';
        lower = '[a-z]+';
        return RegExp(upper + '+(?=' + upper + lower + ')|' + upper + '?' + lower + '|' + upper + '+|[0-9]+', 'g');
    })();
    function identity(x) {
        return x;
    }
    function contains(a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    }
    function difference(arr1, arr2) {
        return arr1.filter(function (x) { return !arr2.includes(x); });
    }

    var SubtitlesLayer = /** @class */ (function (_super) {
        __extends(SubtitlesLayer, _super);
        /**
         * Represent a subtitles layer
         * @constructor SubtitlesLayer
         * @param {Object} options - layer parameters
         */
        function SubtitlesLayer(options) {
            var _this = _super.call(this, options) || this;
            _this.options.resourceType = "subtitles";
            return _this;
        }
        return SubtitlesLayer;
    }(TextLayer));

    /**
     * Sort a map by key
     * @private
     * @param map <string, any>
     * @Return array of map's values sorted by key
     */
    /**
     * Checks if `value` is a string.
     * @private
     * @param {*} value The value to check.
     * @return {boolean} `true` if `value` is a string, else `false`.
     */
    function isString(value) {
        return (typeof value === 'string' || value instanceof String);
    }

    var FetchLayer = /** @class */ (function (_super) {
        __extends(FetchLayer, _super);
        /**
         * @class FetchLayer
         * @classdesc Creates an image layer using a remote URL.
         * @param {Object|string} options - layer parameters or a url
         * @param {string} options.url the url of the image to fetch
         */
        function FetchLayer(options) {
            var _this = _super.call(this, options) || this;
            if (isString(options)) {
                _this.options.url = options;
            }
            else if (options != null ? options.url : void 0) {
                _this.options.url = options.url;
            }
            return _this;
        }
        FetchLayer.prototype.url = function (url) {
            this.options.url = url;
            return this;
        };
        /**
         * generate the string representation of the layer
         * @function FetchLayer#toString
         * @return {String}
         */
        FetchLayer.prototype.toString = function () {
            return "fetch:".concat(base64Encode(this.options.url));
        };
        return FetchLayer;
    }(Layer));

    /**
     * Simple Is Function check
     *
     * @param variableToCheck
     * @returns {boolean}
     */
    function isFunction(variableToCheck) {
        return variableToCheck instanceof Function;
    }

    /**
     * A list of keys used by the url() function.
     * @private
     */
    var URL_KEYS = [
        'accessibility',
        'api_secret',
        'auth_token',
        'cdn_subdomain',
        'cloud_name',
        'cname',
        'format',
        'placeholder',
        'private_cdn',
        'resource_type',
        'secure',
        'secure_cdn_subdomain',
        'secure_distribution',
        'shorten',
        'sign_url',
        'signature',
        'ssl_detected',
        'type',
        'url_suffix',
        'use_root_path',
        'version'
    ];
    /**
     * Assign key, value to target, when value is not null.<br>
     *   This function mutates the target!
     * @param {object} target the object to assign the values to
     * @param {object} sources one or more objects to get values from
     * @returns {object} the target after the assignment
     */
    function assignNotNull(target) {
        var sources = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            sources[_i - 1] = arguments[_i];
        }
        sources.forEach(function (source) {
            Object.keys(source).forEach(function (key) {
                // @ts-ignore
                if (source[key] != null) {
                    // @ts-ignore
                    target[key] = source[key];
                }
            });
        });
        return target;
    }
    /**
     * Return true if all items in list are strings
     * @function Util.allString
     * @param {Array} list - an array of items
     */
    var allStrings = function (list) {
        return list.length && list.every(isString);
    };
    /**
     * Transformation parameters
     * Depends on 'util', 'transformation'
     */
    var Param = /** @class */ (function () {
        /**
         * Represents a single parameter.
         * @class Param
         * @param {string} name - The name of the parameter in snake_case
         * @param {string} shortName - The name of the serialized form of the parameter.
         *                         If a value is not provided, the parameter will not be serialized.
         * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
         * @ignore
         */
        function Param(name, shortName, process) {
            if (process === void 0) { process = identity; }
            /**
             * The name of the parameter in snake_case
             * @member {string} Param#name
             */
            this.name = name;
            /**
             * The name of the serialized form of the parameter
             * @member {string} Param#shortName
             */
            this.shortName = shortName;
            /**
             * Manipulate origValue when value is called
             * @member {function} Param#process
             */
            this.process = process;
        }
        /**
         * Set a (unprocessed) value for this parameter
         * @function Param#set
         * @param {*} origValue - the value of the parameter
         * @return {Param} self for chaining
         */
        Param.prototype.set = function (origValue) {
            this.origValue = origValue;
            return this;
        };
        /**
         * Generate the serialized form of the parameter
         * @function Param#serialize
         * @return {string} the serialized form of the parameter
         */
        Param.prototype.serialize = function () {
            var val, valid;
            val = this.value();
            valid = Array.isArray(val) || isObject(val) || isString(val) ? !isEmpty(val) : val != null;
            if ((this.shortName != null) && valid) {
                return "".concat(this.shortName, "_").concat(val);
            }
            else {
                return '';
            }
        };
        /**
         * Return the processed value of the parameter
         * @function Param#value
         */
        Param.prototype.value = function () {
            return this.process(this.origValue);
        };
        Param.norm_color = function (value) {
            return value != null ? value.replace(/^#/, 'rgb:') : void 0;
        };
        Param.build_array = function (arg) {
            if (arg == null) {
                return [];
            }
            else if (Array.isArray(arg)) {
                return arg;
            }
            else {
                return [arg];
            }
        };
        /**
         * Covert value to video codec string.
         *
         * If the parameter is an object,
         * @param {(string|Object)} param - the video codec as either a String or a Hash
         * @return {string} the video codec string in the format codec:profile:level
         * @example
         * vc_[ :profile : [level]]
         * or
         { codec: 'h264', profile: 'basic', level: '3.1' }
         * @ignore
         */
        Param.process_video_params = function (param) {
            var video;
            switch (param.constructor) {
                case Object:
                    video = "";
                    if ('codec' in param) {
                        video = param.codec;
                        if ('profile' in param) {
                            video += ":" + param.profile;
                            if ('level' in param) {
                                video += ":" + param.level;
                            }
                        }
                    }
                    return video;
                case String:
                    return param;
                default:
                    return null;
            }
        };
        return Param;
    }());
    var ArrayParam = /** @class */ (function (_super) {
        __extends(ArrayParam, _super);
        /**
         * A parameter that represents an array.
         * @param {string} name - The name of the parameter in snake_case.
         * @param {string} shortName - The name of the serialized form of the parameter
         *                         If a value is not provided, the parameter will not be serialized.
         * @param {string} [sep='.'] - The separator to use when joining the array elements together
         * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
         * @class ArrayParam
         * @extends Param
         * @ignore
         */
        function ArrayParam(name, shortName, sep, process) {
            if (sep === void 0) { sep = '.'; }
            if (process === void 0) { process = undefined; }
            var _this = _super.call(this, name, shortName, process) || this;
            _this.sep = sep;
            return _this;
        }
        ArrayParam.prototype.serialize = function () {
            if (this.shortName != null) {
                var arrayValue = this.value();
                if (isEmpty(arrayValue)) {
                    return '';
                }
                else if (isString(arrayValue)) {
                    return "".concat(this.shortName, "_").concat(arrayValue);
                }
                else {
                    var flat = arrayValue.map(function (t) { return isFunction(t.serialize) ? t.serialize() : t; }).join(this.sep);
                    return "".concat(this.shortName, "_").concat(flat);
                }
            }
            else {
                return '';
            }
        };
        ArrayParam.prototype.value = function () {
            var _this = this;
            if (Array.isArray(this.origValue)) {
                return this.origValue.map(function (v) { return _this.process(v); });
            }
            else {
                return this.process(this.origValue);
            }
        };
        ArrayParam.prototype.set = function (origValue) {
            if ((origValue == null) || Array.isArray(origValue)) {
                return _super.prototype.set.call(this, origValue);
            }
            else {
                return _super.prototype.set.call(this, [origValue]);
            }
        };
        return ArrayParam;
    }(Param));
    var TransformationParam = /** @class */ (function (_super) {
        __extends(TransformationParam, _super);
        /**
         * A parameter that represents a transformation
         * @param {string} name - The name of the parameter in snake_case
         * @param {string} [shortName='t'] - The name of the serialized form of the parameter
         * @param {string} [sep='.'] - The separator to use when joining the array elements together
         * @param {function} [process=Util.identity ] - Manipulate origValue when value is called
         * @class TransformationParam
         * @extends Param
         * @ignore
         */
        function TransformationParam(name, shortName, sep, process) {
            if (shortName === void 0) { shortName = "t"; }
            if (sep === void 0) { sep = '.'; }
            if (process === void 0) { process = undefined; }
            var _this = _super.call(this, name, shortName, process) || this;
            _this.sep = sep;
            return _this;
        }
        /**
         * Generate string representations of the transformation.
         * @returns {*} Returns either the transformation as a string, or an array of string representations.
         */
        TransformationParam.prototype.serialize = function () {
            var _this = this;
            var result = '';
            var val = this.value();
            if (isEmpty(val)) {
                return result;
            }
            // val is an array of strings so join them
            if (allStrings(val)) {
                var joined = val.join(this.sep); // creates t1.t2.t3 in case multiple named transformations were configured
                if (!isEmpty(joined)) {
                    // in case options.transformation was not set with an empty string (val != ['']);
                    result = "".concat(this.shortName, "_").concat(joined);
                }
            }
            else { // Convert val to an array of strings
                result = val.map(function (t) {
                    if (isString(t) && !isEmpty(t)) {
                        return "".concat(_this.shortName, "_").concat(t);
                    }
                    if (isFunction(t.serialize)) {
                        return t.serialize();
                    }
                    if (isObject(t) && !isEmpty(t)) {
                        return new Transformation(t).serialize();
                    }
                    return undefined;
                }).filter(function (t) { return t; });
            }
            return result;
        };
        TransformationParam.prototype.set = function (origValue1) {
            this.origValue = origValue1;
            if (Array.isArray(this.origValue)) {
                return _super.prototype.set.call(this, this.origValue);
            }
            else {
                return _super.prototype.set.call(this, [this.origValue]);
            }
        };
        return TransformationParam;
    }(Param));
    var number_pattern = "([0-9]*)\\.([0-9]+)|([0-9]+)";
    var offset_any_pattern = "(" + number_pattern + ")([%pP])?";
    var RangeParam = /** @class */ (function (_super) {
        __extends(RangeParam, _super);
        /**
         * A parameter that represents a range
         * @param {string} name - The name of the parameter in snake_case
         * @param {string} shortName - The name of the serialized form of the parameter
         *                         If a value is not provided, the parameter will not be serialized.
         * @param {function} [process=norm_range_value ] - Manipulate origValue when value is called
         * @class RangeParam
         * @extends Param
         * @ignore
         */
        function RangeParam(name, shortName, process) {
            if (process === void 0) { process = RangeParam.norm_range_value; }
            return _super.call(this, name, shortName, process) || this;
        }
        RangeParam.norm_range_value = function (value) {
            var offset = String(value).match(new RegExp('^' + offset_any_pattern + '$'));
            if (offset) {
                var modifier = offset[5] != null ? 'p' : '';
                value = (offset[1] || offset[4]) + modifier;
            }
            return value;
        };
        return RangeParam;
    }(Param));
    var RawParam = /** @class */ (function (_super) {
        __extends(RawParam, _super);
        function RawParam(name, shortName, process) {
            if (process === void 0) { process = identity; }
            return _super.call(this, name, shortName, process) || this;
        }
        RawParam.prototype.serialize = function () {
            return this.value();
        };
        return RawParam;
    }(Param));
    var LayerParam = /** @class */ (function (_super) {
        __extends(LayerParam, _super);
        function LayerParam() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        // Parse layer options
        // @return [string] layer transformation string
        // @private
        LayerParam.prototype.value = function () {
            if (this.origValue == null) {
                return '';
            }
            var result;
            if (this.origValue instanceof Layer) {
                result = this.origValue;
            }
            else if (isObject(this.origValue)) {
                var layerOptions = withCamelCaseKeys(this.origValue);
                // @ts-ignore
                if (layerOptions.resourceType === "text" || (layerOptions.text != null)) {
                    result = new TextLayer(layerOptions);
                }
                else { // @ts-ignore
                    if (layerOptions.resourceType === "subtitles") {
                        result = new SubtitlesLayer(layerOptions);
                    }
                    else { // @ts-ignore
                        if (layerOptions.resourceType === "fetch" || (layerOptions.url != null)) {
                            result = new FetchLayer(layerOptions);
                        }
                        else {
                            result = new Layer(layerOptions);
                        }
                    }
                }
            }
            else if (isString(this.origValue)) {
                if (/^fetch:.+/.test(this.origValue)) {
                    result = new FetchLayer(this.origValue.substr(6));
                }
                else {
                    result = this.origValue;
                }
            }
            else {
                result = '';
            }
            return result.toString();
        };
        LayerParam.textStyle = function (layer) {
            return (new TextLayer(layer)).textStyleIdentifier();
        };
        return LayerParam;
    }(Param));
    /**
     * TransformationBase
     * Depends on 'configuration', 'parameters','util'
     * @internal
     */
    var TransformationBase = /** @class */ (function () {
        /**
         * The base class for transformations.
         * Members of this class are documented as belonging to the {@link Transformation} class for convenience.
         * @class TransformationBase
         */
        function TransformationBase(options) {
            var _this = this;
            /** @private */
            /** @private */
            var parent;
            var trans;
            parent = void 0;
            trans = {};
            /**
             * Return an options object that can be used to create an identical Transformation
             * @function Transformation#toOptions
             * @return {Object} Returns a plain object representing this transformation
             */
            this.toOptions = function (withChain) {
                var opt = {};
                if (withChain == null) {
                    withChain = true;
                }
                // @ts-ignore
                Object.keys(trans).forEach(function (key) { return opt[key] = trans[key].origValue; });
                assignNotNull(opt, _this.otherOptions);
                if (withChain && !isEmpty(_this.chained)) {
                    var list = _this.chained.map(function (tr) { return tr.toOptions(); });
                    list.push(opt);
                    opt = {};
                    assignNotNull(opt, _this.otherOptions);
                    // @ts-ignore
                    opt.transformation = list;
                }
                return opt;
            };
            /**
             * Set a parent for this object for chaining purposes.
             *
             * @function Transformation#setParent
             * @param {Object} object - the parent to be assigned to
             * @returns {Transformation} Returns this instance for chaining purposes.
             */
            this.setParent = function (object) {
                parent = object;
                if (object != null) {
                    // @ts-ignore
                    _this.fromOptions(typeof object.toOptions === "function" ? object.toOptions() : void 0);
                }
                return _this;
            };
            /**
             * Returns the parent of this object in the chain
             * @function Transformation#getParent
             * @protected
             * @return {Object} Returns the parent of this object if there is any
             */
            this.getParent = function () {
                return parent;
            };
            // Helper methods to create parameter methods
            // These methods are defined here because they access `trans` which is
            // a private member of `TransformationBase`
            /** @protected */
            this.param = function (value, name, abbr, defaultValue, process) {
                if (process == null) {
                    if (isFunction(defaultValue)) {
                        process = defaultValue;
                    }
                    else {
                        process = identity;
                    }
                }
                // @ts-ignore
                trans[name] = new Param(name, abbr, process).set(value);
                return _this;
            };
            /** @protected */
            this.rawParam = function (value, name, abbr, defaultValue, process) {
                process = lastArgCallback(arguments);
                // @ts-ignore
                trans[name] = new RawParam(name, abbr, process).set(value);
                return this;
            };
            /** @protected */
            this.rangeParam = function (value, name, abbr, defaultValue, process) {
                process = lastArgCallback(arguments);
                // @ts-ignore
                trans[name] = new RangeParam(name, abbr, process).set(value);
                return this;
            };
            /** @protected */
            this.arrayParam = function (value, name, abbr, sep, defaultValue, process) {
                if (sep === void 0) { sep = ":"; }
                if (defaultValue === void 0) { defaultValue = []; }
                if (process === void 0) { process = undefined; }
                process = lastArgCallback(arguments);
                // @ts-ignore
                trans[name] = new ArrayParam(name, abbr, sep, process).set(value);
                return this;
            };
            /** @protected */
            this.transformationParam = function (value, name, abbr, sep, defaultValue, process) {
                if (sep === void 0) { sep = "."; }
                if (defaultValue === void 0) { defaultValue = undefined; }
                if (process === void 0) { process = undefined; }
                process = lastArgCallback(arguments);
                // @ts-ignore
                trans[name] = new TransformationParam(name, abbr, sep, process).set(value);
                return this;
            };
            this.layerParam = function (value, name, abbr) {
                // @ts-ignore
                trans[name] = new LayerParam(name, abbr).set(value);
                return this;
            };
            // End Helper methods
            /**
             * Get the value associated with the given name.
             * Get the value associated with the given name.
             * @function Transformation#getValue
             * @param {string} name - the name of the parameter
             * @return {*} the processed value associated with the given name
             * @description Use {@link get}.origValue for the value originally provided for the parameter
             */
            this.getValue = function (name) {
                // @ts-ignore
                var value = trans[name] && trans[name].value();
                return value != null ? value : this.otherOptions[name];
            };
            /**
             * Get the parameter object for the given parameter name
             * @function Transformation#get
             * @param {string} name the name of the transformation parameter
             * @returns {Param} the param object for the given name, or undefined
             */
            this.get = function (name) {
                // @ts-ignore
                return trans[name];
            };
            /**
             * Remove a transformation option from the transformation.
             * @function Transformation#remove
             * @param {string} name - the name of the option to remove
             * @return {*} Returns the option that was removed or null if no option by that name was found. The type of the
             *              returned value depends on the value.
             */
            this.remove = function (name) {
                var temp;
                switch (false) {
                    // @ts-ignore
                    case trans[name] == null:
                        // @ts-ignore
                        temp = trans[name];
                        // @ts-ignore
                        delete trans[name];
                        return temp.origValue;
                    case this.otherOptions[name] == null:
                        temp = this.otherOptions[name];
                        delete this.otherOptions[name];
                        return temp;
                    default:
                        return null;
                }
            };
            /**
             * Return an array of all the keys (option names) in the transformation.
             * @return {Array<string>} the keys in snakeCase format
             */
            this.keys = function () {
                var key;
                return ((function () {
                    var results;
                    results = [];
                    for (key in trans) {
                        if (key != null) {
                            results.push(key.match(VAR_NAME_RE) ? key : snakeCase(key));
                        }
                    }
                    return results;
                })()).sort();
            };
            /**
             * Returns a plain object representation of the transformation. Values are processed.
             * @function Transformation#toPlainObject
             * @return {Object} the transformation options as plain object
             */
            this.toPlainObject = function () {
                var hash, key, list;
                hash = {};
                for (key in trans) {
                    // @ts-ignore
                    hash[key] = trans[key].value();
                    // @ts-ignore
                    if (isObject(hash[key])) {
                        // @ts-ignore
                        hash[key] = cloneDeep(hash[key]);
                    }
                }
                if (!isEmpty(this.chained)) {
                    list = this.chained.map(function (tr) { return tr.toPlainObject(); });
                    list.push(hash);
                    hash = {
                        transformation: list
                    };
                }
                return hash;
            };
            /**
             * Complete the current transformation and chain to a new one.
             * In the URL, transformations are chained together by slashes.
             * @function Transformation#chain
             * @return {Transformation} Returns this transformation for chaining
             * @example
             * var tr = cloudinary.Transformation.new();
             * tr.width(10).crop('fit').chain().angle(15).serialize()
             * // produces "c_fit,w_10/a_15"
             */
            this.chain = function () {
                var names, tr;
                names = Object.getOwnPropertyNames(trans);
                if (names.length !== 0) {
                    tr = new this.constructor(this.toOptions(false));
                    this.resetTransformations();
                    this.chained.push(tr);
                }
                return this;
            };
            this.resetTransformations = function () {
                trans = {};
                return this;
            };
            this.otherOptions = {};
            this.chained = [];
            this.fromOptions(options);
        }
        /**
         * Merge the provided options with own's options
         * @param {Object} [options={}] key-value list of options
         * @returns {Transformation} Returns this instance for chaining
         */
        TransformationBase.prototype.fromOptions = function (options) {
            if (options === void 0) { options = {}; }
            if (options instanceof TransformationBase) {
                this.fromTransformation(options);
            }
            else {
                if (isString(options) || Array.isArray(options)) {
                    options = {
                        transformation: options
                    };
                }
                options = cloneDeep(options);
                // Handling of "if" statements precedes other options as it creates a chained transformation
                // @ts-ignore
                if (options["if"]) {
                    // @ts-ignore
                    this.set("if", options["if"]);
                    // @ts-ignore
                    delete options["if"];
                }
                for (var key in options) {
                    // @ts-ignore
                    var opt = options[key];
                    if (opt != null) {
                        if (key.match(VAR_NAME_RE)) {
                            if (key !== '$attr') {
                                this.set('variable', key, opt);
                            }
                        }
                        else {
                            this.set(key, opt);
                        }
                    }
                }
            }
            return this;
        };
        TransformationBase.prototype.fromTransformation = function (other) {
            var _this = this;
            if (other instanceof TransformationBase) {
                other.keys().forEach(function (key) {
                    return _this.set(key, other.get(key).origValue);
                });
            }
            return this;
        };
        /**
         * Set a parameter.
         * The parameter name `key` is converted to
         * @param {string} key - the name of the parameter
         * @param {*} values - the value of the parameter
         * @returns {Transformation} Returns this instance for chaining
         */
        TransformationBase.prototype.set = function (key) {
            var values = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                values[_i - 1] = arguments[_i];
            }
            var camelKey;
            camelKey = camelCase(key);
            if (contains(methods, camelKey)) {
                // @ts-ignore
                this[camelKey].apply(this, values);
            }
            else {
                this.otherOptions[key] = values[0];
            }
            return this;
        };
        TransformationBase.prototype.hasLayer = function () {
            return this.getValue("overlay") || this.getValue("underlay");
        };
        /**
         * Generate a string representation of the transformation.
         * @function Transformation#serialize
         * @return {string} Returns the transformation as a string
         */
        TransformationBase.prototype.serialize = function () {
            var ifParam, j, len, paramList, ref, ref1, ref2, ref3, ref4, resultArray, t, transformationList, transformationString, transformations, value, variables, vars;
            resultArray = this.chained.map(function (tr) { return tr.serialize(); });
            paramList = this.keys();
            transformations = (ref = this.get("transformation")) != null ? ref.serialize() : void 0;
            ifParam = (ref1 = this.get("if")) != null ? ref1.serialize() : void 0;
            variables = processVar((ref2 = this.get("variables")) != null ? ref2.value() : void 0);
            paramList = difference(paramList, ["transformation", "if", "variables"]);
            vars = [];
            transformationList = [];
            for (j = 0, len = paramList.length; j < len; j++) {
                t = paramList[j];
                if (t.match(VAR_NAME_RE)) {
                    vars.push(t + "_" + Expression.normalize((ref3 = this.get(t)) != null ? ref3.value() : void 0));
                }
                else {
                    transformationList.push((ref4 = this.get(t)) != null ? ref4.serialize() : void 0);
                }
            }
            switch (false) {
                case !isString(transformations):
                    transformationList.push(transformations);
                    break;
                case !Array.isArray(transformations):
                    resultArray = resultArray.concat(transformations);
            }
            transformationList = (function () {
                var k, len1, results;
                results = [];
                for (k = 0, len1 = transformationList.length; k < len1; k++) {
                    value = transformationList[k];
                    if (Array.isArray(value) && !isEmpty(value) || !Array.isArray(value) && value) {
                        results.push(value);
                    }
                }
                return results;
            })();
            transformationList = vars.sort().concat(variables).concat(transformationList.sort());
            if (ifParam === "if_end") {
                transformationList.push(ifParam);
            }
            else if (!isEmpty(ifParam)) {
                transformationList.unshift(ifParam);
            }
            transformationString = (transformationList).filter(function (x) { return !!x; }).join(param_separator);
            if (!isEmpty(transformationString)) {
                resultArray.push(transformationString);
            }
            return (resultArray).filter(function (x) { return !!x; }).join(trans_separator);
        };
        /**
         * Provide a list of all the valid transformation option names
         * @function Transformation#listNames
         * @private
         * @return {Array<string>} a array of all the valid option names
         */
        TransformationBase.listNames = function () {
            return methods;
        };
        /**
         * Returns the attributes for an HTML tag.
         * @function Cloudinary.toHtmlAttributes
         * @return PlainObject
         */
        TransformationBase.prototype.toHtmlAttributes = function () {
            var _this = this;
            var attrName, height, options, ref2, ref3, value, width;
            options = {};
            var snakeCaseKey;
            Object.keys(this.otherOptions).forEach(function (key) {
                value = _this.otherOptions[key];
                snakeCaseKey = snakeCase(key);
                if (!contains(PARAM_NAMES, snakeCaseKey) && !contains(URL_KEYS, snakeCaseKey)) {
                    attrName = /^html_/.test(key) ? key.slice(5) : key;
                    options[attrName] = value;
                }
            });
            // convert all "html_key" to "key" with the same value
            this.keys().forEach(function (key) {
                if (/^html_/.test(key)) {
                    options[camelCase(key.slice(5))] = _this.getValue(key);
                }
            });
            if (!(this.hasLayer() || this.getValue("angle") || contains(["fit", "limit", "lfill"], this.getValue("crop")))) {
                width = (ref2 = this.get("width")) != null ? ref2.origValue : void 0;
                height = (ref3 = this.get("height")) != null ? ref3.origValue : void 0;
                if (parseFloat(width) >= 1.0) {
                    if (options.width == null) {
                        options.width = width;
                    }
                }
                if (parseFloat(height) >= 1.0) {
                    if (options.height == null) {
                        options.height = height;
                    }
                }
            }
            return options;
        };
        TransformationBase.isValidParamName = function (name) {
            return methods.indexOf(camelCase(name)) >= 0;
        };
        /**
         * Delegate to the parent (up the call chain) to produce HTML
         * @function Transformation#toHtml
         * @return {string} HTML representation of the parent if possible.
         * @example
         * tag = cloudinary.ImageTag.new("sample", {cloud_name: "demo"})
         * // ImageTag {name: "img", publicId: "sample"}
         * tag.toHtml()
         * // <img src="http://res.cloudinary.com/demo/image/upload/sample">
         * tag.transformation().crop("fit").width(300).toHtml()
         * // <img src="http://res.cloudinary.com/demo/image/upload/c_fit,w_300/sample">
         */
        TransformationBase.prototype.toHtml = function () {
            var ref;
            return (ref = this.getParent()) != null ? typeof ref.toHtml === "function" ? ref.toHtml() : void 0 : void 0;
        };
        TransformationBase.prototype.toString = function () {
            return this.serialize();
        };
        TransformationBase.prototype.clone = function () {
            return new TransformationBase(this.toOptions(true));
        };
        return TransformationBase;
    }());
    var VAR_NAME_RE = /^\$[a-zA-Z0-9]+$/;
    var trans_separator = '/';
    var param_separator = ',';
    function lastArgCallback(args) {
        var callback;
        callback = args != null ? args[args.length - 1] : void 0;
        if (isFunction(callback)) {
            return callback;
        }
        else {
            return void 0;
        }
    }
    function processVar(varArray) {
        var _a;
        var j, len, name, results, v;
        if (Array.isArray(varArray)) {
            results = [];
            for (j = 0, len = varArray.length; j < len; j++) {
                _a = varArray[j], name = _a[0], v = _a[1];
                results.push("".concat(name, "_").concat(Expression.normalize(v)));
            }
            return results;
        }
        else {
            return varArray;
        }
    }
    // @ts-ignore
    function processCustomFunction(_a) {
        var function_type = _a.function_type, source = _a.source;
        if (function_type === 'remote') {
            return [function_type, btoa(source)].join(":");
        }
        else if (function_type === 'wasm') {
            return [function_type, source].join(":");
        }
    }
    /**
     * Transformation Class methods.
     * This is a list of the parameters defined in Transformation.
     * Values are camelCased.
     * @const Transformation.methods
     * @private
     * @ignore
     * @type {Array<string>}
     */
    /**
     * Parameters that are filtered out before passing the options to an HTML tag.
     *
     * The list of parameters is a combination of `Transformation::methods` and `Configuration::CONFIG_PARAMS`
     * @const {Array<string>} Transformation.PARAM_NAMES
     * @private
     * @ignore
     * @see toHtmlAttributes
     */
    var Transformation = /** @class */ (function (_super) {
        __extends(Transformation, _super);
        /**
         * Represents a single transformation.
         * @class Transformation
         * @example
         * t = new cloudinary.Transformation();
         * t.angle(20).crop("scale").width("auto");
         *
         * // or
         *
         * t = new cloudinary.Transformation( {angle: 20, crop: "scale", width: "auto"});
         * @see <a href="https://cloudinary.com/documentation/image_transformation_reference"
         *  target="_blank">Available image transformations</a>
         * @see <a href="https://cloudinary.com/documentation/video_transformation_reference"
         *  target="_blank">Available video transformations</a>
         */
        function Transformation(options) {
            return _super.call(this, options) || this;
        }
        /**
         * Convenience constructor
         * @param {Object} options
         * @return {Transformation}
         * @example cl = cloudinary.Transformation.new( {angle: 20, crop: "scale", width: "auto"})
         */
        Transformation.new = function (options) {
            return new Transformation(options);
        };
        /*
          Transformation Parameters
        */
        Transformation.prototype.angle = function (value) {
            this.arrayParam(value, "angle", "a", ".", Expression.normalize);
            return this;
        };
        Transformation.prototype.audioCodec = function (value) {
            this.param(value, "audio_codec", "ac");
            return this;
        };
        Transformation.prototype.audioFrequency = function (value) {
            this.param(value, "audio_frequency", "af");
            return this;
        };
        Transformation.prototype.aspectRatio = function (value) {
            this.param(value, "aspect_ratio", "ar", Expression.normalize);
            return this;
        };
        Transformation.prototype.background = function (value) {
            this.param(value, "background", "b", Param.norm_color);
            return this;
        };
        Transformation.prototype.bitRate = function (value) {
            this.param(value, "bit_rate", "br");
            return this;
        };
        Transformation.prototype.border = function (value) {
            return this.param(value, "border", "bo", function (border) {
                if (isObject(border)) {
                    border = Object.assign({}, {
                        color: "black",
                        width: 2
                    }, border);
                    return "".concat(border.width, "px_solid_").concat(Param.norm_color(border.color));
                }
                else {
                    return border;
                }
            });
        };
        Transformation.prototype.color = function (value) {
            this.param(value, "color", "co", Param.norm_color);
            return this;
        };
        Transformation.prototype.colorSpace = function (value) {
            this.param(value, "color_space", "cs");
            return this;
        };
        Transformation.prototype.crop = function (value) {
            this.param(value, "crop", "c");
            return this;
        };
        Transformation.prototype.customFunction = function (value) {
            return this.param(value, "custom_function", "fn", function () {
                return processCustomFunction(value);
            });
        };
        Transformation.prototype.customPreFunction = function (value) {
            if (this.get('custom_function')) {
                return;
            }
            return this.rawParam(value, "custom_function", "", function () {
                value = processCustomFunction(value);
                return value ? "fn_pre:".concat(value) : value;
            });
        };
        Transformation.prototype.defaultImage = function (value) {
            this.param(value, "default_image", "d");
            return this;
        };
        Transformation.prototype.delay = function (value) {
            this.param(value, "delay", "dl");
            return this;
        };
        Transformation.prototype.density = function (value) {
            this.param(value, "density", "dn");
            return this;
        };
        Transformation.prototype.duration = function (value) {
            this.rangeParam(value, "duration", "du");
            return this;
        };
        Transformation.prototype.dpr = function (value) {
            return this.param(value, "dpr", "dpr", function (dpr) {
                dpr = dpr.toString();
                if (dpr != null ? dpr.match(/^\d+$/) : void 0) {
                    return dpr + ".0";
                }
                else {
                    return Expression.normalize(dpr);
                }
            });
        };
        Transformation.prototype.effect = function (value) {
            this.arrayParam(value, "effect", "e", ":", Expression.normalize);
            return this;
        };
        Transformation.prototype.else = function () {
            return this.if('else');
        };
        Transformation.prototype.endIf = function () {
            return this.if('end');
        };
        Transformation.prototype.endOffset = function (value) {
            this.rangeParam(value, "end_offset", "eo");
            return this;
        };
        Transformation.prototype.fallbackContent = function (value) {
            this.param(value, "fallback_content");
            return this;
        };
        Transformation.prototype.fetchFormat = function (value) {
            this.param(value, "fetch_format", "f");
            return this;
        };
        Transformation.prototype.format = function (value) {
            this.param(value, "format");
            return this;
        };
        Transformation.prototype.flags = function (value) {
            this.arrayParam(value, "flags", "fl", ".");
            return this;
        };
        Transformation.prototype.gravity = function (value) {
            this.param(value, "gravity", "g");
            return this;
        };
        Transformation.prototype.fps = function (value) {
            return this.param(value, "fps", "fps", function (fps) {
                if (isString(fps)) {
                    return fps;
                }
                else if (Array.isArray(fps)) {
                    return fps.join("-");
                }
                else {
                    return fps;
                }
            });
        };
        Transformation.prototype.height = function (value) {
            var _this = this;
            return this.param(value, "height", "h", function () {
                if (_this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay")) {
                    return Expression.normalize(value);
                }
                else {
                    return null;
                }
            });
        };
        Transformation.prototype.htmlHeight = function (value) {
            this.param(value, "html_height");
            return this;
        };
        Transformation.prototype.htmlWidth = function (value) {
            this.param(value, "html_width");
            return this;
        };
        Transformation.prototype.if = function (value) {
            if (value === void 0) { value = ""; }
            var i, ifVal, j, trIf, trRest;
            switch (value) {
                case "else":
                    this.chain();
                    return this.param(value, "if", "if");
                case "end":
                    this.chain();
                    for (i = j = this.chained.length - 1; j >= 0; i = j += -1) {
                        ifVal = this.chained[i].getValue("if");
                        if (ifVal === "end") {
                            break;
                        }
                        else if (ifVal != null) {
                            trIf = Transformation.new().if(ifVal);
                            this.chained[i].remove("if");
                            trRest = this.chained[i];
                            this.chained[i] = Transformation.new().transformation([trIf, trRest]);
                            if (ifVal !== "else") {
                                break;
                            }
                        }
                    }
                    return this.param(value, "if", "if");
                case "":
                    return Condition.new().setParent(this);
                default:
                    return this.param(value, "if", "if", function (value) {
                        return Condition.new(value).toString();
                    });
            }
        };
        Transformation.prototype.keyframeInterval = function (value) {
            this.param(value, "keyframe_interval", "ki");
            return this;
        };
        Transformation.prototype.ocr = function (value) {
            this.param(value, "ocr", "ocr");
            return this;
        };
        Transformation.prototype.offset = function (value) {
            var _a;
            var end_o, start_o;
            _a = (isFunction(value != null ? value.split : void 0)) ? value.split('..') : Array.isArray(value) ? value : [null, null], start_o = _a[0], end_o = _a[1];
            if (start_o != null) {
                this.startOffset(start_o);
            }
            if (end_o != null) {
                return this.endOffset(end_o);
            }
        };
        Transformation.prototype.opacity = function (value) {
            this.param(value, "opacity", "o", Expression.normalize);
            return this;
        };
        Transformation.prototype.overlay = function (value) {
            this.layerParam(value, "overlay", "l");
            return this;
        };
        Transformation.prototype.page = function (value) {
            this.param(value, "page", "pg");
            return this;
        };
        Transformation.prototype.poster = function (value) {
            this.param(value, "poster");
            return this;
        };
        Transformation.prototype.prefix = function (value) {
            this.param(value, "prefix", "p");
            return this;
        };
        Transformation.prototype.quality = function (value) {
            this.param(value, "quality", "q", Expression.normalize);
            return this;
        };
        Transformation.prototype.radius = function (value) {
            this.arrayParam(value, "radius", "r", ":", Expression.normalize);
            return this;
        };
        Transformation.prototype.rawTransformation = function (value) {
            this.rawParam(value, "raw_transformation");
            return this;
        };
        Transformation.prototype.size = function (value) {
            var _a;
            var height, width;
            if (isFunction(value != null ? value.split : void 0)) {
                _a = value.split('x'), width = _a[0], height = _a[1];
                this.width(width);
                return this.height(height);
            }
        };
        Transformation.prototype.sourceTypes = function (value) {
            this.param(value, "source_types");
            return this;
        };
        Transformation.prototype.sourceTransformation = function (value) {
            return this.param(value, "source_transformation");
        };
        Transformation.prototype.startOffset = function (value) {
            this.rangeParam(value, "start_offset", "so");
            return this;
        };
        Transformation.prototype.streamingProfile = function (value) {
            this.param(value, "streaming_profile", "sp");
            return this;
        };
        Transformation.prototype.transformation = function (value) {
            this.transformationParam(value, "transformation", "t");
            return this;
        };
        Transformation.prototype.underlay = function (value) {
            this.layerParam(value, "underlay", "u");
            return this;
        };
        Transformation.prototype.variable = function (name, value) {
            this.param(value, name, name);
            return this;
        };
        Transformation.prototype.variables = function (values) {
            this.arrayParam(values, "variables");
            return this;
        };
        Transformation.prototype.videoCodec = function (value) {
            this.param(value, "video_codec", "vc", Param.process_video_params);
            return this;
        };
        Transformation.prototype.videoSampling = function (value) {
            this.param(value, "video_sampling", "vs");
            return this;
        };
        Transformation.prototype.width = function (value) {
            var _this = this;
            this.param(value, "width", "w", function () {
                if (_this.getValue("crop") || _this.getValue("overlay") || _this.getValue("underlay")) {
                    return Expression.normalize(value);
                }
                else {
                    return null;
                }
            });
            return this;
        };
        Transformation.prototype.x = function (value) {
            this.param(value, "x", "x", Expression.normalize);
            return this;
        };
        Transformation.prototype.y = function (value) {
            this.param(value, "y", "y", Expression.normalize);
            return this;
        };
        Transformation.prototype.zoom = function (value) {
            this.param(value, "zoom", "z", Expression.normalize);
            return this;
        };
        return Transformation;
    }(TransformationBase));
    /**
     * Transformation Class methods.
     * This is a list of the parameters defined in Transformation.
     * Values are camelCased.
     */
    var methods = [
        "angle",
        "audioCodec",
        "audioFrequency",
        "aspectRatio",
        "background",
        "bitRate",
        "border",
        "color",
        "colorSpace",
        "crop",
        "customFunction",
        "customPreFunction",
        "defaultImage",
        "delay",
        "density",
        "duration",
        "dpr",
        "effect",
        "else",
        "endIf",
        "endOffset",
        "fallbackContent",
        "fetchFormat",
        "format",
        "flags",
        "gravity",
        "fps",
        "height",
        "htmlHeight",
        "htmlWidth",
        "if",
        "keyframeInterval",
        "ocr",
        "offset",
        "opacity",
        "overlay",
        "page",
        "poster",
        "prefix",
        "quality",
        "radius",
        "rawTransformation",
        "size",
        "sourceTypes",
        "sourceTransformation",
        "startOffset",
        "streamingProfile",
        "transformation",
        "underlay",
        "variable",
        "variables",
        "videoCodec",
        "videoSampling",
        "width",
        "x",
        "y",
        "zoom"
    ];
    /**
     * Parameters that are filtered out before passing the options to an HTML tag.
     *
     * The list of parameters is a combination of `Transformation::methods` and `Configuration::CONFIG_PARAMS`
     */
    var PARAM_NAMES = methods.map(snakeCase).concat(CONFIG_PARAMS);

    /**
     * Process DPR value. If input is 1 returns 1.0
     * @param value
     */
    function processDpr(value) {
        var dpr = value.toString();
        if (dpr != null ? dpr.match(/^\d+$/) : void 0) {
            return dpr + ".0";
        }
        else {
            return Expression.normalize(dpr);
        }
    }

    /**
     * Things dropped
     * - responsive_width
     * - config().dpr
     * - SSL Detected
     * - Provisioning API
     * - Magical configuration auto-mapping (everything has to be explicit)
     * - Signatures
     * - Secure is default true
     * @param transformationOptions
     */
    function generateTransformationString(transformationOptions) {
        if (typeof transformationOptions === 'string') {
            return transformationOptions;
        }
        if (transformationOptions instanceof Transformation) {
            return transformationOptions.toString();
        }
        if (Array.isArray(transformationOptions)) {
            return transformationOptions
                .map(function (singleTransformation) {
                return generateTransformationString(singleTransformation);
            }).filter(function (a) { return a; }).join('/');
        }
        // let responsive_width = consumeOption(transformationOptions, "responsive_width", config().responsive_width);
        var width;
        var height;
        var size = transformationOptions.size;
        var hasLayer = transformationOptions.overlay || transformationOptions.underlay;
        var crop = transformationOptions.crop;
        var angle = toArray(transformationOptions.angle).join(".");
        var background = (transformationOptions.background || '').replace(/^#/, "rgb:");
        var color = (transformationOptions.color || '').replace(/^#/, "rgb:");
        var flags = (toArray(transformationOptions.flags || [])).join('.');
        var dpr = transformationOptions.dpr === undefined ? transformationOptions.dpr : processDpr(transformationOptions.dpr);
        var overlay = processLayer(transformationOptions.overlay);
        var radius = processRadius(transformationOptions.radius);
        var underlay = processLayer(transformationOptions.underlay);
        var ifValue = process_if(transformationOptions.if);
        var custom_function = processCustomFunction$1(transformationOptions.custom_function);
        var custom_pre_function = processCustomPreFunction(transformationOptions.custom_pre_function);
        // These will change down the line, heads up!
        var fps = transformationOptions.fps;
        var namedTransformations = [];
        var childTransformations = toArray(transformationOptions.transformation || []);
        var effect = transformationOptions.effect;
        // TODO, Do we need this?
        var no_html_sizes = hasLayer || angle || crop === "fit" || crop === "limit";
        if (size) {
            var _a = size.split("x"), sizeWidth = _a[0], sizeHeight = _a[1];
            width = sizeWidth;
            height = sizeHeight;
        }
        else {
            width = transformationOptions.width;
            height = transformationOptions.height;
        }
        if (width && (width.toString().indexOf("auto") === 0 || no_html_sizes || parseFloat(width.toString()) < 1)) {
            delete transformationOptions.width;
        }
        if (height && (no_html_sizes || parseFloat(height.toString()) < 1)) {
            delete transformationOptions.height;
        }
        // Is any child transformation an object?
        var isAnyChildAnObject = childTransformations.some(function (transformation) { return typeof transformation === 'object'; });
        // If array of objects, or array of strings?
        if (isAnyChildAnObject) {
            childTransformations = childTransformations.map(function (transformation) {
                if (isObject(transformation)) {
                    return generateTransformationString(transformation);
                }
                else {
                    return generateTransformationString({ transformation: transformation });
                }
            }).filter(function (a) { return a; });
        }
        else {
            namedTransformations = childTransformations.join(".");
            childTransformations = []; // Reset child transfomrations
        }
        if (Array.isArray(effect)) {
            effect = effect.join(":");
        }
        else if (isObject(effect)) {
            effect = Object.entries(effect).map(function (_a) {
                var key = _a[0], value = _a[1];
                return "".concat(key, ":").concat(value);
            });
        }
        var border = transformationOptions.border;
        if (isObject(border)) {
            border = "".concat(border.width != null ? border.width : 2, "px_solid_").concat((border.color != null ? border.color : "black").replace(/^#/, 'rgb:'));
        }
        else {
            // @ts-ignore
            if (/^\d+$/.exec(border)) { // fallback to html border attributes
                transformationOptions.border = border;
                border = void 0;
            }
        }
        if (Array.isArray(fps)) {
            fps = fps.join('-');
        }
        // ocr(value) {
        //   return this.param(value, "ocr", "ocr");
        // }
        var urlParams = {
            a: legacyNormalizeExpression(angle),
            ar: legacyNormalizeExpression(transformationOptions.aspect_ratio),
            b: background,
            bo: border,
            c: crop,
            co: color,
            dpr: legacyNormalizeExpression(dpr),
            e: legacyNormalizeExpression(effect),
            fl: flags,
            fn: custom_function || custom_pre_function,
            fps: fps,
            h: legacyNormalizeExpression(height),
            ki: legacyNormalizeExpression(transformationOptions.keyframe_interval),
            l: overlay,
            o: legacyNormalizeExpression(transformationOptions.opacity),
            q: legacyNormalizeExpression(transformationOptions.quality),
            r: radius,
            t: namedTransformations,
            u: underlay,
            w: legacyNormalizeExpression(width),
            x: legacyNormalizeExpression(transformationOptions.x),
            y: legacyNormalizeExpression(transformationOptions.y),
            z: legacyNormalizeExpression(transformationOptions.zoom),
            ac: transformationOptions.audio_codec,
            af: transformationOptions.audio_frequency,
            br: transformationOptions.bit_rate,
            cs: transformationOptions.color_space,
            d: transformationOptions.default_image,
            dl: transformationOptions.delay,
            dn: transformationOptions.density,
            du: normRangeValues(transformationOptions.duration),
            eo: normRangeValues(transformationOptions.end_offset || isNumberLike(transformationOptions.end_offset) ? transformationOptions.end_offset : splitRange(transformationOptions.offset)[1]),
            f: transformationOptions.fetch_format,
            g: transformationOptions.gravity,
            pg: transformationOptions.page,
            p: transformationOptions.prefix,
            so: normRangeValues(transformationOptions.start_offset || isNumberLike(transformationOptions.start_offset) ? transformationOptions.start_offset : splitRange(transformationOptions.offset)[0]),
            sp: transformationOptions.streaming_profile,
            vc: processVideoParams(transformationOptions.video_codec),
            vs: transformationOptions.video_sampling
        };
        // We can accept variables in here transformationOptions, or in here transformationOptions.variables
        var variables = Object.entries(transformationOptions)
            .filter(function (_a) {
            var key = _a[0]; _a[1];
            return key.startsWith('$');
        })
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            // delete transformationOptions[key]; // Delete the variables, so we don't add them twice
            return "".concat(key, "_").concat(legacyNormalizeExpression(value));
        }).sort().concat(
        // @ts-ignore
        (transformationOptions.variables || []).map(function (_a) {
            var name = _a[0], value = _a[1];
            return "".concat(name, "_").concat(legacyNormalizeExpression(value));
        })).join(',');
        // Clean up!
        var urlImageTransfomrations = Object.entries(urlParams)
            .filter(function (_a) {
            _a[0]; var value = _a[1];
            if (typeof value === 'undefined' || value === null) {
                return false;
            }
            if (typeof value === 'string' && value.length === 0) {
                return false;
            }
            if (Array.isArray(value) && value.length === 0) {
                return false;
            }
            return true;
        })
            .map(function (_a) {
            var key = _a[0], value = _a[1];
            return "".concat(key, "_").concat(value);
        })
            .sort()
            .join(',');
        var finalTransformationString = [
            ifValue,
            variables,
            urlImageTransfomrations,
            transformationOptions.raw_transformation
        ].filter(function (a) { return a; }).join(",");
        if (finalTransformationString) {
            childTransformations.push(finalTransformationString);
        }
        // console.log(childTransformations);
        return childTransformations.join("/");
    }
    var transformationStringFromObject = generateTransformationString;

    function finalize_resource_type(resource_type, type, url_suffix, use_root_path, shorten) {
        if (type == null) {
            type = 'upload';
        }
        if (url_suffix != null) {
            if (resource_type === 'image' && type === 'upload') {
                resource_type = "images";
                type = null;
            }
            else if (resource_type === 'image' && type === 'private') {
                resource_type = 'private_images';
                type = null;
            }
            else if (resource_type === 'image' && type === 'authenticated') {
                resource_type = 'authenticated_images';
                type = null;
            }
            else if (resource_type === 'raw' && type === 'upload') {
                resource_type = 'files';
                type = null;
            }
            else if (resource_type === 'video' && type === 'upload') {
                resource_type = 'videos';
                type = null;
            }
            else {
                throw new Error("URL Suffix only supported for image/upload, image/private, image/authenticated, video/upload and raw/upload");
            }
        }
        if (use_root_path) {
            if ((resource_type === 'image' && type === 'upload') || (resource_type === 'images' && (type == null))) {
                resource_type = null;
                type = null;
            }
            else {
                throw new Error("Root path only supported for image/upload");
            }
        }
        if (shorten && resource_type === 'image' && type === 'upload') {
            resource_type = 'iu';
            type = null;
        }
        return [resource_type, type];
    }

    function finalize_source(source, format, url_suffix) {
        var source_to_sign;
        source = source.replace(/([^:])\/\//g, '$1/');
        if (source.match(/^https?:\//i)) {
            source = smartEscape(source);
            source_to_sign = source;
        }
        else {
            source = encodeURIComponent(decodeURIComponent(source)).replace(/%3A/g, ":").replace(/%2F/g, "/");
            source_to_sign = source;
            if (url_suffix) {
                if (url_suffix.match(/[\.\/]/)) {
                    throw new Error('url_suffix should not include . or /');
                }
                source = source + '/' + url_suffix;
            }
            if (format != null) {
                source = source + '.' + format;
                source_to_sign = source_to_sign + '.' + format;
            }
        }
        return [source, source_to_sign];
    }

    function unsigned_url_prefix(source, cloud_name, private_cdn, cdn_subdomain, secure_cdn_subdomain, cname, secure, secure_distribution) {
        var prefix;
        if (cloud_name.indexOf("/") === 0) {
            return '/res' + cloud_name;
        }
        var shared_domain = !private_cdn;
        if (secure) {
            if ((secure_distribution == null) || secure_distribution === OLD_AKAMAI_SHARED_CDN) {
                secure_distribution = private_cdn ? cloud_name + "-res.cloudinary.com" : SHARED_CDN;
            }
            if (shared_domain == null) {
                shared_domain = secure_distribution === SHARED_CDN;
            }
            prefix = 'https://' + secure_distribution;
        }
        else if (cname) {
            // let subdomain = cdn_subdomain ? 'a' + ((crc32(source) % 5) + 1) + '.' : '';
            prefix = 'http://' + cname;
        }
        else {
            var cdn_part = private_cdn ? cloud_name + '-' : '';
            var host = [cdn_part, 'res', '.cloudinary.com'].join('');
            prefix = 'http://' + host;
        }
        if (shared_domain) {
            prefix += '/' + cloud_name;
        }
        return prefix;
    }

    function createCloudinaryLegacyURL(public_id, transformationOptions) {
        var _a, _b;
        // Path format
        if (transformationOptions.type === "fetch") {
            if (transformationOptions.fetch_format == null) {
                transformationOptions.fetch_format = transformationOptions.format;
            }
        }
        var source_to_sign;
        var type = transformationOptions.type;
        var resource_type = transformationOptions.resource_type || 'image';
        var version = transformationOptions.version;
        var force_version = typeof transformationOptions.force_version === 'boolean' ? transformationOptions.force_version : true;
        !!transformationOptions.long_url_signature;
        var format = transformationOptions.format;
        var cloud_name = transformationOptions.cloud_name;
        if (!cloud_name) {
            throw "cloud_name must be provided in the configuration";
        }
        var private_cdn = transformationOptions.private_cdn;
        var secure_distribution = transformationOptions.secure_distribution;
        var secure = transformationOptions.secure;
        var cdn_subdomain = transformationOptions.cdn_subdomain;
        var secure_cdn_subdomain = transformationOptions.secure_cdn_subdomain;
        var cname = transformationOptions.cname;
        var shorten = transformationOptions.shorten;
        var sign_url = transformationOptions.sign_url;
        transformationOptions.api_secret;
        var url_suffix = transformationOptions.url_suffix;
        var use_root_path = transformationOptions.use_root_path;
        var auth_token = transformationOptions.auth_token;
        var preloaded = /^(image|raw)\/([a-z0-9_]+)\/v(\d+)\/([^#]+)$/.exec(public_id);
        if (preloaded) {
            resource_type = preloaded[1];
            type = preloaded[2];
            version = preloaded[3];
            public_id = preloaded[4];
        }
        var original_source = public_id;
        if (public_id == null) {
            return original_source;
        }
        public_id = public_id.toString();
        if (type === null && public_id.match(/^https?:\//i)) {
            return original_source;
        }
        _a = finalize_resource_type(resource_type, type, url_suffix, use_root_path, shorten), resource_type = _a[0], type = _a[1];
        _b = finalize_source(public_id, format, url_suffix), public_id = _b[0], source_to_sign = _b[1];
        if (version == null && force_version && source_to_sign.indexOf("/") >= 0 && !source_to_sign.match(/^v[0-9]+/) && !source_to_sign.match(/^https?:\//)) {
            version = 1;
        }
        if (version != null) {
            version = "v".concat(version);
        }
        else {
            version = null;
        }
        var transformation = generateTransformationString(cloneDeep(transformationOptions)).replace(/([^:])\/\//g, '$1/');
        if (sign_url && !auth_token) {
            var to_sign = [transformation, source_to_sign].filter(function (part) {
                return (part != null) && part !== '';
            }).join('/');
            try {
                for (var i = 0; to_sign !== decodeURIComponent(to_sign) && i < 10; i++) {
                    to_sign = decodeURIComponent(to_sign);
                }
                // eslint-disable-next-line no-empty
            }
            catch (error) {
            }
            // No support for Auth Token
            // const shasum = crypto.createHash(long_url_signature ? 'sha256' : 'sha1');
            // shasum.update(utf8_encode(to_sign + api_secret), 'binary');
            // signature = shasum.digest('base64').replace(/\//g, '_').replace(/\+/g, '-').substring(0, long_url_signature ? 32 : 8);
            // signature = `s--${signature}--`;
        }
        var prefix = unsigned_url_prefix(public_id, cloud_name, private_cdn, cdn_subdomain, secure_cdn_subdomain, cname, secure, secure_distribution);
        var resultUrl = [prefix, resource_type, type, transformation, version, public_id].filter(function (part) {
            return (part != null) && part !== '';
        }).join('/').replace(' ', '%20');
        return resultUrl;
    }

    var actions = /*#__PURE__*/Object.freeze({
        __proto__: null,
        Resize: Resize,
        Border: Border,
        RoundCorners: RoundCorners,
        Effect: Effect,
        Rotate: Rotate,
        Adjust: Adjust,
        Overlay: Overlay,
        Underlay: Underlay,
        NamedTransformation: NamedTransformation,
        Delivery: Delivery,
        CustomFunction: CustomFunction,
        VideoEdit: VideoEdit,
        Transcode: Transcode,
        PSDTools: PSDTools,
        Animated: Animated
    });

    var qualifiers = /*#__PURE__*/Object.freeze({
        __proto__: null,
        TextDecoration: TextDecoration,
        TextAlignment: TextAlignment,
        Stroke: Stroke,
        StreamingProfile: StreamingProfile,
        SimulateColorBlind: SimulateColorBlind,
        RotationMode: RotationMode,
        Region: Region,
        Quality: Quality,
        Position: PositionQualifier,
        OutlineMode: OutlineMode,
        ImproveMode: ImproveMode,
        GradientDirection: GradientDirection,
        Format: Format,
        FontWeight: FontWeight,
        FontStyle: FontStyle,
        FontHinting: FontHinting,
        Expression: Expression$1,
        Dither: Dither,
        ColorSpace: ColorSpace,
        Color: Color,
        Background: Background,
        AudioFrequency: AudioFrequency,
        AudioCodec: AudioCodec,
        AspectRatio: AspectRatio,
        ArtisticFilter: ArtisticFilter,
        AnimatedFormat: AnimatedFormat,
        Gravity: Gravity,
        ChromaSubSampling: ChromaSubSampling,
        Dpr: Dpr,
        Source: Source,
        GradientFade: GradientFade
    });

    exports.Actions = actions;
    exports.CloudConfig = CloudConfig;
    exports.Cloudinary = Cloudinary;
    exports.CloudinaryConfig = CloudinaryConfig;
    exports.CloudinaryFile = CloudinaryFile;
    exports.CloudinaryImage = CloudinaryImage;
    exports.CloudinaryMedia = CloudinaryMedia;
    exports.CloudinaryVideo = CloudinaryVideo;
    exports.ImageTransformation = ImageTransformation;
    exports.Qualifiers = qualifiers;
    exports.Transformation = Transformation$1;
    exports.URLConfig = URLConfig;
    exports.VideoTransformation = VideoTransformation;
    exports.createCloudinaryLegacyURL = createCloudinaryLegacyURL;
    exports.transformationStringFromObject = transformationStringFromObject;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
