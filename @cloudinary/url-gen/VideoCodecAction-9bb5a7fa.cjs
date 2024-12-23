'use strict';

var Action = require('./Action-0ed405c1.cjs');
var VideoCodecType = require('./VideoCodecType-69d56a1b.cjs');
var videoCodec = require('./videoCodec-b8fe49c0.cjs');

/**
 * @extends SDK.Action
 * @memberOf Actions.Transcode
 * @description Converts a video to an animated webp or gif.
 * @see Visit {@link Actions.Transcode|Transcode} for an example
 */
class VideoCodecAction extends Action.Action {
    constructor(videoCodecTypeQualifier) {
        super();
        this._actionModel = { actionType: 'videoCodec' };
        this._actionModel.videoCodec = { videoCodecName: videoCodecTypeQualifier.getType() };
        if (videoCodecTypeQualifier instanceof VideoCodecType.AdvVideoCodecType) {
            if (videoCodecTypeQualifier.getProfile()) {
                this._actionModel.videoCodec = Object.assign({ profile: videoCodecTypeQualifier.getProfile() }, this._actionModel.videoCodec);
            }
            if (videoCodecTypeQualifier.getLevel()) {
                this._actionModel.videoCodec = Object.assign({ level: videoCodecTypeQualifier.getLevel() }, this._actionModel.videoCodec);
            }
        }
        this.addQualifier(videoCodecTypeQualifier);
    }
    static fromJson(actionModel) {
        const { videoCodec: videoCodec$1 } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(videoCodec.VIDEO_CODEC_TO_TRANSFORMATION[videoCodec$1.videoCodecName]);
        //@ts-ignore
        videoCodec$1.profile && new this(videoCodec.VIDEO_CODEC_TO_TRANSFORMATION[videoCodec$1.videoCodecName].profile(videoCodec$1.profile));
        //@ts-ignore
        videoCodec$1.level && new this(videoCodec.VIDEO_CODEC_TO_TRANSFORMATION[videoCodec$1.videoCodecName].level(videoCodec$1.level));
        return result;
    }
}

exports.VideoCodecAction = VideoCodecAction;
