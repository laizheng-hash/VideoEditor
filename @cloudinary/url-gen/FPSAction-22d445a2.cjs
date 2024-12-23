'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var FPSRangeAction = require('./FPSRangeAction-cef193a2.cjs');

/**
 * @extends SDK.Action
 * @memberOf Actions.Transcode
 * @description Controls the FPS (Frames Per Second) to ensure that video (even when optimized)
 * is delivered with
 * an expected FPS level (helps with sync to audio).
 *
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_transformation_reference#video_settings|Video settings}
 * @see Visit {@link Actions.Transcode|Transcode} for an example
 */
class FPSAction extends Action.Action {
    constructor(from) {
        super();
        this._actionModel = { actionType: 'fps' };
        this._actionModel.fps = from;
        this.addQualifier(new Qualifier.Qualifier('fps', from));
    }
    static fromJson(actionModel) {
        const { fps } = actionModel;
        let result;
        if (typeof fps === 'object') {
            //@ts-ignore
            result = new FPSRangeAction.FPSRangeAction(fps.from, fps.to);
        }
        else {
            result = new this(fps);
        }
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        return result;
    }
}
var FPSAction$1 = FPSAction;

exports.FPSAction = FPSAction$1;
