'use strict';

var Action = require('./Action-0ed405c1.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var prepareColor = require('./prepareColor-c03e99eb.cjs');

/**
 * @description Applies a shadow filter to the asset.
 * @memberOf Actions.Effect
 * @extends SDK.Action
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class ShadowEffectAction extends Action.Action {
    constructor(effectType, strength) {
        super();
        this._actionModel = {};
        this._actionModel.actionType = effectType;
        this.effectType = effectType;
        this.addQualifier(new Qualifier.Qualifier('e', new QualifierValue.QualifierValue(['shadow', strength])));
    }
    /**
     * @description The strength of the shadow. (Range: 0 to 100, Server default: 40)
     * @param {number} strength
     * @return {this}
     */
    strength(strength) {
        this._actionModel.strength = strength;
        return this.addQualifier(new Qualifier.Qualifier('e', new QualifierValue.QualifierValue(['shadow', strength])));
    }
    /**
     * @description The X offset the shadow
     * @param {number | SDK.ExpressionQualifier} x
     * @return {this}
     */
    offsetX(x) {
        this._actionModel.offsetX = x;
        return this.addQualifier(new Qualifier.Qualifier('x', new QualifierValue.QualifierValue(x)));
    }
    /**
     * @description The Y offset the shadow
     * @param {number | SDK.ExpressionQualifier} y
     * @return {this}
     */
    offsetY(y) {
        this._actionModel.offsetY = y;
        return this.addQualifier(new Qualifier.Qualifier('y', new QualifierValue.QualifierValue(y)));
    }
    /**
     * @description The color of the shadow (Server default: gray)
     * @param color
     * @return {this}
     */
    color(color) {
        this._actionModel.color = color;
        return this.addQualifier(new Qualifier.Qualifier('co', new QualifierValue.QualifierValue(prepareColor.prepareColor(color))));
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

exports.ShadowEffectAction = ShadowEffectAction;
