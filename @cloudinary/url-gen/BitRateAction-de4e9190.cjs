'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');

/**
 * @extends SDK.Action
 * @memberOf Actions.Transcode
 * @description  Defines the video bitrate in bits per second.
 *
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_optimization#bitrate_control|Bitrate control}
 * @see Visit {@link Actions.Transcode|Transcode} for an example
 */
class BitRateAction extends Action.Action {
    constructor(bitRate) {
        super();
        this.isConstant = false;
        this._actionModel = { actionType: 'bitRate' };
        this.bitRate = bitRate;
        this._actionModel.bitRate = bitRate;
    }
    /**
     * @description video plays with a constant bitrate (CBR).
     */
    constant() {
        this.isConstant = true;
        this._actionModel.constant = true;
        return this;
    }
    prepareQualifiers() {
        let qualifierValue;
        if (this.isConstant) {
            qualifierValue = new QualifierValue.QualifierValue([this.bitRate, 'constant']).setDelimiter(':');
        }
        else {
            qualifierValue = new QualifierValue.QualifierValue(this.bitRate);
        }
        this.addQualifier(new Qualifier.Qualifier('br', qualifierValue));
        return this;
    }
    static fromJson(actionModel) {
        const { bitRate, constant } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(bitRate);
        constant && result.constant();
        return result;
    }
}
var BitRateAction$1 = BitRateAction;

exports.BitRateAction = BitRateAction$1;
