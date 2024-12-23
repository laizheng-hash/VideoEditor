'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var flag = require('./flag-31bc1b8c.cjs');

/**
 * @extends SDK.Action
 * @memberOf Actions.Transcode
 * @description Converts a video to an animated webp or gif.
 * The resulting transformation includes format (f_format) and the animated flag (fl_animated).
 * The flag fl_awebp is added only when an animated webp is requested.
 * @see Visit {@link Actions.Transcode|Transcode} for an example
 */
class ToAnimatedAction extends Action.Action {
    constructor(animatedFormat = '') {
        super();
        this._actionModel = { actionType: 'toAnimated' };
        if (animatedFormat.toString() === 'webp') {
            this.addFlag(flag.animatedWebP());
        }
        this.addFlag(flag.animated());
        if (animatedFormat) {
            this.addQualifier(new Qualifier.Qualifier('f', animatedFormat));
        }
        this._actionModel.animatedFormat = animatedFormat;
    }
    /**
     * @description Sets the time between frames.
     * @param delayValue The time in milliseconds.
     */
    delay(delayValue) {
        this.addQualifier(new Qualifier.Qualifier('dl', delayValue));
        this._actionModel.delay = delayValue;
        return this;
    }
    /**
     * @description Sets the frequency at which the video is sampled.
     * @param sampling As a string (e.g. '2.3s'), samples one frame every 2.3 seconds.<br>As a number (e.g. 20),
     * samples that many equally spaced frames over the duration of the video.
     */
    sampling(sampling) {
        this.addQualifier(new Qualifier.Qualifier('vs', sampling));
        this._actionModel.sampling = sampling;
        return this;
    }
    static fromJson(actionModel) {
        const { animatedFormat, sampling, delay } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(animatedFormat);
        sampling && result.sampling(sampling);
        delay && result.delay(delay);
        return result;
    }
}
var ToAnimatedAction$1 = ToAnimatedAction;

exports.ToAnimatedAction = ToAnimatedAction$1;
