'use strict';

var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var prepareColor = require('./prepareColor-c03e99eb.cjs');
var EffectActionWithLevel = require('./EffectActionWithLevel-69a976c7.cjs');

/**
 * @description Applies a colorizing filter to the asset, use the methods in the class to adjust the filter
 * @extends EffectActionWithLevel
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class ColorizeEffectAction extends EffectActionWithLevel.EffectActionWithLevel {
    /**
     * @description The color to use for colorization. Specify HTML name or RGB hex code. (Server default: gray)
     * @param {string} color HTML name(red, green, etc.) or RGB hex code. (Server default: gray)
     * @return {this}
     */
    color(color) {
        this._actionModel.color = color;
        return this.addQualifier(new Qualifier.Qualifier('co', new QualifierValue.QualifierValue(prepareColor.prepareColor(color))));
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

exports.ColorizeEffectAction = ColorizeEffectAction;
