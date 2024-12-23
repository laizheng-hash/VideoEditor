'use strict';

var LeveledEffectAction = require('./LeveledEffectAction-c6a11f05.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var prepareColor = require('./prepareColor-c03e99eb.cjs');
var internalConstants = require('./internalConstants-6e675c29.cjs');

/**
 * @description Makes the background of the image transparent (or solid white for formats that do not support transparency).
 * @extends LeveledEffectAction
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class MakeTransparentEffectAction extends LeveledEffectAction.LeveledEffectAction {
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
        return this.addQualifier(new Qualifier.Qualifier('co', new QualifierValue.QualifierValue(prepareColor.prepareColor(color))));
    }
    static fromJson(actionModel) {
        const { actionType, tolerance, color } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(internalConstants.ACTION_TYPE_TO_EFFECT_MODE_MAP[actionType], tolerance);
        tolerance && result.tolerance(tolerance);
        color && result.colorToReplace(color);
        return result;
    }
}

exports.MakeTransparentEffectAction = MakeTransparentEffectAction;
