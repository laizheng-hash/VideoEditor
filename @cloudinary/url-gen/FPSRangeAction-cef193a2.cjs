'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');

/**
 * @extends SDK.Action
 * @memberOf Actions.Transcode
 * @description Controls the range of acceptable FPS (Frames Per Second) to ensure that video (even when optimized)
 * is delivered with
 * an expected FPS level (helps with sync to audio).
 *
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_transformation_reference#video_settings|Video settings}
 * @see Visit {@link Actions.Transcode|Transcode} for an example
 */
class FPSRangeAction extends Action.Action {
    constructor(from, to) {
        super();
        this._actionModel = {};
        this.from = from;
        this._actionModel = {
            actionType: 'fps',
            fps: { from }
        };
        if (to != null) {
            this.to = to;
            this._actionModel.fps.to = to;
        }
    }
    prepareQualifiers() {
        let qualifierValue;
        if (this.from && this.to) {
            qualifierValue = new QualifierValue.QualifierValue(`${this.from}-${this.to}`);
        }
        else {
            qualifierValue = new QualifierValue.QualifierValue(`${this.from}-`);
        }
        this.addQualifier(new Qualifier.Qualifier('fps', qualifierValue));
        return this;
    }
}
var FPSRangeAction$1 = FPSRangeAction;

exports.FPSRangeAction = FPSRangeAction$1;
