'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var toFloatAsString = require('./toFloatAsString-4766ab85.cjs');

/**
 * @extends SDK.Action
 * @memberOf Actions.Transcode
 * @description Controls the keyframe interval of the delivered video.
 * @see Visit {@link Actions.Transcode|Transcode} for an example
 */
class KeyframeIntervalsAction extends Action.Action {
    constructor(interval) {
        super();
        this._actionModel = { actionType: 'keyframeInterval' };
        this._actionModel.interval = interval;
        this.addQualifier(new Qualifier.Qualifier('ki', toFloatAsString.toFloatAsString(interval)));
    }
    static fromJson(actionModel) {
        const { interval } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(interval);
        return result;
    }
}
var KeyframeIntervalsAction$1 = KeyframeIntervalsAction;

exports.KeyframeIntervalsAction = KeyframeIntervalsAction$1;
