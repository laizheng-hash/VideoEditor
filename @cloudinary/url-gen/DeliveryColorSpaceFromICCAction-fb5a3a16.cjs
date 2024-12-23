'use strict';

var Action = require('./Action-0ed405c1.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description Specifies the ICC profile to use for the color space.
 * @memberOf Actions.Delivery
 * @extends SDK.Action
 * @see Visit {@link Actions.Delivery|Delivery} for an example
 */
class DeliveryColorSpaceFromICCAction extends Action.Action {
    /**
     * @param {string} publicId
     */
    constructor(publicId) {
        super();
        this._actionModel = {};
        this._actionModel.actionType = 'colorSpaceFromICC';
        this._actionModel.publicId = publicId;
        const qualifierValue = new QualifierValue.QualifierValue(['icc', publicId]).setDelimiter(':');
        this.addQualifier(new Qualifier.Qualifier('cs', qualifierValue));
    }
    static fromJson(actionModel) {
        const { publicId } = actionModel;
        return new this(publicId);
    }
}

exports.DeliveryColorSpaceFromICCAction = DeliveryColorSpaceFromICCAction;
