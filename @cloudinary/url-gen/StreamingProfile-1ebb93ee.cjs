'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var internalConstants = require('./internalConstants-6e675c29.cjs');

/**
 * @extends SDK.Action
 * @memberOf Actions.Transcode
 * @description The predefined streaming profiles.
 *
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/adaptive_bitrate_streaming#predefined_streaming_profiles|Predefined streaming profiles}
 * @see Visit {@link Actions.Transcode|Transcode} for an example
 */
class StreamingProfileAction extends Action.Action {
    constructor(profile) {
        super();
        this._actionModel = { actionType: 'streamingProfile' };
        this.addQualifier(new Qualifier.Qualifier('sp', profile));
        this._actionModel.profile = internalConstants.STREAMING_PROFILE_TO_ACTION_TYPE_MAP[profile] || profile;
    }
    static fromJson(actionModel) {
        const { profile } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const profileType = internalConstants.ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP[profile] || profile;
        const result = new this(profileType);
        return result;
    }
}
var StreamingProfileAction$1 = StreamingProfileAction;

exports.StreamingProfileAction = StreamingProfileAction$1;
