import { BaseGradientBackground } from "../base/BaseGradientBackground.js";
/**
 * @description Specifies that the gradient fade effect, used for the background when resizing with padding, uses the
 * predominant colors in the border pixels of the image.
 * @memberOf Qualifiers.Background
 * @extends {Qualifiers.Background.BaseGradientBackground}
 */
declare class BackgroundBorderGradientQualifier extends BaseGradientBackground {
    /**
     * @description
     * Stringify the qualifier
     * BackgroundQualifiers don't have a value, but instead override the toString() function.
     */
    toString(): string;
}
export { BackgroundBorderGradientQualifier };
