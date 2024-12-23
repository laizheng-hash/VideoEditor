'use strict';

var LeveledEffectAction = require('./LeveledEffectAction-c6a11f05.cjs');

/**
 * @description A class for all effects that include a strength method
 * @extends {Actions.Effect.LeveledEffectAction}
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class EffectActionWithStrength extends LeveledEffectAction.LeveledEffectAction {
    constructor() {
        super(...arguments);
        this.LEVEL_NAME = 'strength';
    }
    strength(value) {
        return this.setLevel(value);
    }
}

exports.EffectActionWithStrength = EffectActionWithStrength;
