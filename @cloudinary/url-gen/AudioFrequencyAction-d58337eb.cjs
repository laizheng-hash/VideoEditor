'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @extends SDK.Action
 * @memberOf Actions.Transcode
 * @description Controls audio sample frequency.
 *
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/audio_transformations#audio_codec_settings|Audio frequency control}
 * @see Visit {@link Actions.Transcode|Transcode} for an example
 */
class AudioFrequencyAction extends Action.Action {
    constructor(freq) {
        super();
        this._actionModel = { actionType: 'audioFrequency' };
        this.addQualifier(new Qualifier.Qualifier('af', freq));
        this._actionModel.audioFrequencyType = freq;
    }
    static fromJson(actionModel) {
        const { audioFrequencyType } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(audioFrequencyType.replace('freq', ''));
        return result;
    }
}
var AudioFrequencyAction$1 = AudioFrequencyAction;

exports.AudioFrequencyAction = AudioFrequencyAction$1;
