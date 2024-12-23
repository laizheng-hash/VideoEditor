'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description Simulates the way an image would appear to someone with the specified color blind condition
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class SimulateColorBlindEffectAction extends Action.Action {
    constructor() {
        super();
        this._actionModel = {};
        this._actionModel.actionType = 'simulateColorblind';
        this.addQualifier(new Qualifier.Qualifier('e', `simulate_colorblind`));
    }
    setQualifier(val) {
        const strToAppend = `:${val}`;
        if (val) {
            this.addQualifier(new Qualifier.Qualifier('e', `simulate_colorblind${strToAppend}`));
        }
        return this;
    }
    /**
     * @description Sets the color blind condition to simulate.
     * @param {Qualifiers.simulateColorBlindValues | SimulateColorBlindType | string} cond
     * @return {this}
     */
    condition(cond) {
        this._actionModel.condition = cond;
        return this.setQualifier(cond);
    }
    static fromJson(actionModel) {
        const { actionType, condition } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this();
        condition && result.condition(condition);
        return result;
    }
}

exports.SimulateColorBlindEffectAction = SimulateColorBlindEffectAction;
