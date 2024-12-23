'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');

/**
 * @description Class to Controls the volume of an audio or video file.
 * @extends SDK.Action
 * @memberOf Actions.VideoEdit
 * @see Visit {@link Actions.VideoEdit|VideoEdit} for an example
 */
class VolumeAction extends Action.Action {
    constructor(volumeValue) {
        super();
        let volumeValueModel = { mode: 'mute' };
        if (volumeValue !== 'mute') {
            volumeValueModel = {
                mode: (`${volumeValue}`.endsWith('db') ? 'decibels' : 'percent'),
                value: +(`${volumeValue}`.replace('db', ''))
            };
        }
        this._actionModel = {
            actionType: 'volume',
            volumeValue: volumeValueModel
        };
        const qualifierValue = new QualifierValue.QualifierValue(['volume', volumeValue]).setDelimiter(':');
        this.addQualifier(new Qualifier.Qualifier('e', qualifierValue));
    }
    static fromJson(actionModel) {
        const { volumeValue } = actionModel;
        const { mode } = volumeValue;
        const value = mode === 'mute' ? mode : volumeValue.value;
        const suffix = (mode === 'mute' || mode === "percent") ? '' : 'db';
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        return new this(`${value}${suffix}`);
    }
}
var VolumeAction$1 = VolumeAction;

exports.VolumeAction = VolumeAction$1;
