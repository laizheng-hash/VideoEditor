import { LeveledEffectAction } from "./LeveledEffectAction.js";
/**
 * @description A class for all effects that include a blendPercentage method
 * @extends {Actions.Effect.LeveledEffectAction}
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class EffectActionWithBlend extends LeveledEffectAction {
    blend(value) {
        return this.setLevel(value);
    }
}
export { EffectActionWithBlend };
