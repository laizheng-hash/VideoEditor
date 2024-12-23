'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');

/**
 * @description Fade out at the end of the video, use the length() method to set the time in ms for the fade to occur. (Server default: 2000)
 * @extends Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class FadeInEffectAction extends Action.Action {
    constructor(duration) {
        super();
        this._actionModel = { actionType: 'fadeIn' };
        this.addQualifier(new Qualifier.Qualifier('e', new QualifierValue.QualifierValue(['fade', `${duration}`]).setDelimiter(':')));
        duration && (this._actionModel.length = duration);
    }
    /**
     *
     * @description Sets the duration level for the action
     * @param {string | number} duration - The duration of the effect
     */
    duration(duration) {
        this._actionModel.length = duration;
        return this.addQualifier(new Qualifier.Qualifier('e', new QualifierValue.QualifierValue(['fade', `${duration}`]).setDelimiter(':')));
    }
    static fromJson(actionModel) {
        const { length } = actionModel;
        if (length === undefined) {
            return new this(1000);
        }
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(length);
        return result;
    }
}

exports.FadeInEffectAction = FadeInEffectAction;
