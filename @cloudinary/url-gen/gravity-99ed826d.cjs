'use strict';

var GravityQualifier = require('./GravityQualifier-3be0186a.cjs');

/**
 * @description The class for the autoGravity builder
 * @memberOf Qualifiers.Gravity
 * @extends {Qualifiers.Gravity.GravityQualifier}
 */
class AutoGravity extends GravityQualifier.GravityQualifier {
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
class FocusOnGravity extends GravityQualifier.GravityQualifier {
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
class CompassGravity extends GravityQualifier.GravityQualifier {
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
class XYCenterGravity extends GravityQualifier.GravityQualifier {
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

exports.AutoGravity = AutoGravity;
exports.CompassGravity = CompassGravity;
exports.FocusOnGravity = FocusOnGravity;
exports.Gravity = Gravity;
exports.autoGravity = autoGravity;
exports.compass = compass;
exports.focusOn = focusOn;
exports.xyCenter = xyCenter;
