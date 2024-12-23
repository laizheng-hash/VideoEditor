'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var toFloatAsString = require('./toFloatAsString-4766ab85.cjs');

/**
 * @description Specifies the dpr.
 * @memberOf Actions.Delivery
 * @extends SDK.Action
 * @see Visit {@link Actions.Delivery|Delivery} for an example
 */
class DeliveryDPRAction extends Action.Action {
    /**
     * Create a new DeliveryDPRAction
     * @param dprValue
     */
    constructor(dprValue) {
        super();
        this._actionModel = { actionType: 'dpr' };
        // toFloatAsString is used to ensure 1 turns into 1.0
        const dprAsFloat = toFloatAsString.toFloatAsString(dprValue);
        this._actionModel.dpr = dprAsFloat;
        this.addQualifier(new Qualifier.Qualifier('dpr', dprAsFloat));
    }
    static fromJson(actionModel) {
        const { dpr } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        return new this(dpr);
    }
}

exports.DeliveryDPRAction = DeliveryDPRAction;
