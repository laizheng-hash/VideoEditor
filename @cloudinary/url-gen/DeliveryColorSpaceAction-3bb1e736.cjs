'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var colorSpace = require('./colorSpace-e71e2b55.cjs');
var internalConstants = require('./internalConstants-6e675c29.cjs');

/**
 * @description Specifies the color space to use.
 * @memberOf Actions.Delivery
 * @extends SDK.Action
 * @see Visit {@link Actions.Delivery|Delivery} for an example
 */
class DeliveryColorSpaceAction extends Action.Action {
    /**
     * Create a new DeliveryColorSpaceAction
     * @param mode
     */
    constructor(mode) {
        super();
        this._actionModel = {};
        this._actionModel = {
            actionType: 'colorSpace',
            mode: (internalConstants.COLOR_SPACE_MODE_TO_COLOR_SPACE_MODEL_MODE_MAP[mode] || mode)
        };
        this.addQualifier(new Qualifier.Qualifier('cs', colorSpace.ColorSpace[mode] ? colorSpace.ColorSpace[mode]() : mode));
    }
    static fromJson(actionModel) {
        const { mode } = actionModel;
        const colorSpaceMode = internalConstants.COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP[mode] || mode;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        return new this(colorSpaceMode);
    }
}

exports.DeliveryColorSpaceAction = DeliveryColorSpaceAction;
