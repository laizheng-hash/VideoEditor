'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');

/**
 * @description Changes the speed of the video playback using the rate() method
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class AccelerationEffectAction extends Action.Action {
    constructor(rate) {
        super();
        this._actionModel = { actionType: 'accelerate' };
        rate && this.rate(rate);
    }
    rate(rate) {
        this._actionModel.rate = rate;
        this._rate = rate;
        return this;
    }
    prepareQualifiers() {
        const qualifierValue = new QualifierValue.QualifierValue(['accelerate', this._rate]).setDelimiter(':');
        this.addQualifier(new Qualifier.Qualifier('e', qualifierValue));
        return this;
    }
    static fromJson(actionModel) {
        const { rate } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        // @ts-ignore
        const result = new this();
        rate && result.rate(rate);
        return result;
    }
}

exports.AccelerationEffectAction = AccelerationEffectAction;
