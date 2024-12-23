'use strict';

var Action = require('./Action-0ed405c1.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var prepareColor = require('./prepareColor-c03e99eb.cjs');

/**
 * @description Adds an outline to a transparent image. For examples, see the Image Transformations guide.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class EffectOutline extends Action.Action {
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
        return this.addQualifier(new Qualifier.Qualifier('co', prepareColor.prepareColor(color)));
    }
    prepareQualifiers() {
        this.addQualifier(new Qualifier.Qualifier('e', new QualifierValue.QualifierValue(['outline', this._mode, this._width, this._blurLevel]).setDelimiter(':')));
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

exports.EffectOutline = EffectOutline;
