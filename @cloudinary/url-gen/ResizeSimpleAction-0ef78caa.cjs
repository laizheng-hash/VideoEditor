'use strict';

var Qualifier = require('./Qualifier-6633a22f.cjs');
var Action = require('./Action-0ed405c1.cjs');
var toFloatAsString = require('./toFloatAsString-4766ab85.cjs');
var AspectRatioQualifierValue = require('./AspectRatioQualifierValue-d520bb1a.cjs');
var flag = require('./flag-31bc1b8c.cjs');
var FlagQualifier = require('./FlagQualifier-7b069f22.cjs');
var internalConstants = require('./internalConstants-6e675c29.cjs');

/**
 * @description Defines a resize using width and height.
 * @extends SDK.Action
 * @memberOf Actions.Resize
 * @see Visit {@link Actions.Resize| Resize} for examples
 */
class ResizeSimpleAction extends Action.Action {
    /**
     * @param {string} cropType
     * @param {number | string} cropWidth The required width of a transformed asset.
     * @param {number | string} cropHeight The required height of a transformed asset.
     */
    constructor(cropType, cropWidth, cropHeight) {
        super();
        this._actionModel = { dimensions: {} };
        this._actionModel.actionType = internalConstants.CROP_MODE_TO_ACTION_TYPE_MAP[cropType] || cropType;
        this.addQualifier(new Qualifier.Qualifier('c', cropType));
        cropWidth && this.width(cropWidth);
        cropHeight && this.height(cropHeight);
    }
    /**
     * @description Sets the height of the resize
     * @param {string | number} x The height in pixels (if an integer is specified) or as a percentage (if a float is specified).
     */
    height(x) {
        this._actionModel.dimensions.height = x;
        return this.addQualifier(new Qualifier.Qualifier('h', x));
    }
    /**
     * @description Sets the width of the resize
     * @param {string | number} x The width in pixels (if an integer is specified) or as a percentage (if a float is specified).
     */
    width(x) {
        this._actionModel.dimensions.width = x;
        return this.addQualifier(new Qualifier.Qualifier('w', x));
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
        if (ratio instanceof AspectRatioQualifierValue.AspectRatioQualifierValue) {
            this._actionModel.dimensions.aspectRatio = `${ratio}`;
            return this.addQualifier(new Qualifier.Qualifier('ar', ratio));
        }
        if (typeof ratio === 'number' || typeof ratio === 'string') {
            this._actionModel.dimensions.aspectRatio = toFloatAsString.toFloatAsString(ratio);
            return this.addQualifier(new Qualifier.Qualifier('ar', toFloatAsString.toFloatAsString(ratio)));
        }
        if (ratio instanceof FlagQualifier.FlagQualifier) {
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
        return this.addFlag(flag.relative());
    }
    /**
     * @description Modifies percentage-based width & height parameters of overlays and underlays (e.g., 1.0) to be relative to the overlaid region
     * @return {this}
     */
    regionRelative() {
        this._actionModel.regionRelative = true;
        return this.addFlag(flag.regionRelative());
    }
    static fromJson(actionModel) {
        const { actionType, dimensions, relative, regionRelative } = actionModel;
        const { aspectRatio, width, height } = dimensions;
        const cropMode = internalConstants.ACTION_TYPE_TO_CROP_MODE_MAP[actionType] || actionType;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(cropMode, width, height);
        aspectRatio && result.aspectRatio(aspectRatio === 'ignore_aspect_ratio' ? flag.ignoreInitialAspectRatio() : aspectRatio);
        relative && result.relative();
        regionRelative && result.regionRelative();
        return result;
    }
}

exports.ResizeSimpleAction = ResizeSimpleAction;
