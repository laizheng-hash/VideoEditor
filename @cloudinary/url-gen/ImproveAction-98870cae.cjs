'use strict';

var Action = require('./Action-0ed405c1.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description Defines how to improve an image by automatically adjusting image colors, contrast and brightness.</br>
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#e_improve|Image improvement effects}
 * @memberOf Actions.Adjust
 */
class ImproveAction extends Action.Action {
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
        const qualifierValue = new QualifierValue.QualifierValue(['improve', this.modeValue, this.blendValue]).setDelimiter(':');
        this.addQualifier(new Qualifier.Qualifier('e', qualifierValue));
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

exports.ImproveAction = ImproveAction;
