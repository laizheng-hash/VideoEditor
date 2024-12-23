import { BlurAction } from "./effect/Blur.js";
import { AccelerationEffectAction } from "./effect/leveled/Accelerate.js";
import { LoopEffectAction } from "./effect/leveled/Loop.js";
import { CartoonifyEffect } from "./effect/Cartoonify.js";
import { EffectOutline } from "./effect/Outline.js";
import { SimpleEffectAction } from "./effect/EffectActions/SimpleEffectAction.js";
import { MakeTransparentEffectAction } from "./effect/leveled/MakeTransparent.js";
import { VectorizeEffectAction } from "./effect/Vectorize.js";
import { SimulateColorBlindEffectAction } from "./effect/SimulateColorBlind.js";
import { EffectActionWithLevel } from "./effect/EffectActions/EffectActionWithLevel.js";
import { AssistColorBlindEffectAction } from "./effect/AssistColorBlind.js";
import { GradientFadeEffectAction } from "./effect/GradientFade.js";
import { FadeOutEffectAction } from "./effect/leveled/FadeOut.js";
import { ColorizeEffectAction } from "./effect/Colorize.js";
import { ShadowEffectAction } from "./effect/Shadow.js";
import { StyleTransfer } from "./effect/StyleTransfer.js";
import { DitherEffectAction } from "./effect/Dither.js";
import { DeshakeEffectAction } from "./effect/leveled/Deshake.js";
import { Pixelate } from "./effect/pixelate/Pixelate.js";
import { ImageSource } from "../qualifiers/source/sourceTypes/ImageSource.js";
import { EffectActionWithStrength } from "./effect/EffectActions/EffectActionWithStrength.js";
import { BlackwhiteEffectAction } from "./effect/leveled/Blackwhite.js";
import { FadeInEffectAction } from "./effect/leveled/FadeIn.js";
import { RemoveBackgroundAction } from "./effect/RemoveBackgroundAction.js";
import { ThemeEffect } from "./effect/Theme.js";
import { SystemColors } from "../qualifiers/color.js";
import { ArtisticFilterType } from "../types/types.js";
import { BackgroundRemoval } from "./effect/BackgroundRemoval.js";
import { DropShadow } from "./effect/DropShadow.js";
import { GenerativeRemove } from "./effect/GenerativeRemove.js";
import { GenerativeReplace } from "./effect/GenerativeReplace.js";
import { GenerativeRecolor } from "./effect/GenerativeRecolor.js";
import { GenerativeBackgroundReplace } from "./effect/GenerativeBackgroundReplace.js";
import { Extract } from "./effect/Extract.js";
/**
 * @summary action
 * @description Applies a blurring filter to the asset.
 * @memberOf Actions.Effect
 * @param {number} blurLevel The strength of the blur. (Range: 1 to 2000, Server default: 100)
 * @return {Actions.Effect.BlurAction}
 */
declare function blur(blurLevel?: number): BlurAction;
/**
 * @summary action
 * @description Converts the image to gray-scale (multiple shades of gray).
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
declare function grayscale(): SimpleEffectAction;
/**
 * @summary action
 * @description Changes the color scheme of the image to sepia.
 * @memberOf Actions.Effect
 * @param {number} level The level of sepia to apply. (Range: 1 to 100, Server default: 80)
 * @return {Actions.Effect.EffectActionWithLevel}
 */
declare function sepia(level?: number): EffectActionWithLevel;
/**
 * @summary action
 * @description Applies a shadow filter to the asset.
 * @memberOf Actions.Effect
 * @param shadowLevel
 * @return {Actions.Effect.ShadowEffectAction}
 */
declare function shadow(shadowLevel?: number): ShadowEffectAction;
/**
 * @summary action
 * @description Applies a colorizing filter to the asset.
 * @memberOf Actions.Effect
 * @param {number} colorizeLevel The strength of the color. (Range: 0 to 100, Server default: 100)
 * @return {Actions.Effect.ColorizeEffectAction}
 */
declare function colorize(colorizeLevel?: number): ColorizeEffectAction;
/**
 * @summary action
 * @description Applies an oilPaint filter to the asset.
 * @memberOf Actions.Effect
 * @param {number} oilPaintLevel The strength of the effect. (Range: 0 to 100, Server default: 30)
 * @return {Actions.Effect.EffectActionWithStrength}
 */
declare function oilPaint(oilPaintLevel?: number): EffectActionWithStrength;
/**
 * @summary action
 * @description Applies an artistic filter to the asset.
 * @memberOf Actions.Effect
 * @param {ArtisticFilterType | string} artisticFilterType
 * @return {Actions.Effect.SimpleEffectAction}
 */
declare function artisticFilter(artisticFilterType: ArtisticFilterType | string): SimpleEffectAction;
/**
 * @summary action
 * @description Applies a cartoonify effect to the asset.
 * @memberOf Actions.Effect
 * @param cartoonifyLevel The thickness of the lines. (Range: 0 to 100, Server default: 50)
 * @return {Actions.Effect.CartoonifyEffect}
 */
declare function cartoonify(cartoonifyLevel?: number): CartoonifyEffect;
/**
 * @summary action
 * @description Adds an outline to a transparent image. For examples, see the Image Transformations guide.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.EffectOutline}
 */
declare function outline(): EffectOutline;
/**
 * @summary action
 * @description Applies a complex deep learning neural network algorithm that extracts artistic styles from a source image and applies them to the content of a target photograph.<br/>
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/neural_artwork_style_transfer_addon|Neural Artwork Style Transfer}
 * @memberOf Actions.Effect
 * @param {ImageSource} imageSource `import {image} from '@cloudinary/url-gen/qualifiers/sources`
 * @return {Actions.Effect.StyleTransfer}
 */
declare function styleTransfer(imageSource: ImageSource): StyleTransfer;
/**
 * @summary action
 * @description
 * Causes a video clip to play forwards and then backwards.
 * Use in conjunction with trimming parameters ('duration', 'start_offset', or 'end_offset') and the 'loop' effect to deliver a classic (short, repeating) boomerang clip.<br/>
 * For details and examples, see 'Create a boomerang video clip' in the Video Transformations guide.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
declare function boomerang(): SimpleEffectAction;
/**
 * @summary action
 * @description
 * Removes red eyes with the Advanced Facial Attribute Detection add-on.
 * For details, see the Advanced Facial Attribute Detection add-on documentation.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
declare function advancedRedEye(): SimpleEffectAction;
/**
 * @summary action
 * @description Converts the image to black and white.
 * @memberOf Actions.Effect
 * @param {number | string} level The balance between black (100) and white (0). (Range: 0 to 100, Server default: 50)
 * @return {Actions.Effect.BlackwhiteEffectAction}
 */
declare function blackwhite(level?: number | "bw"): BlackwhiteEffectAction;
/**
 * @summary action
 * @description Negates the image colors (negative).
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
declare function negate(): SimpleEffectAction;
/**
 * @summary action
 * @description Removes red eyes in the image.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
declare function redEye(): SimpleEffectAction;
/**
 * @summary action
 * @description Plays the video or audio file in reverse.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
declare function reverse(): SimpleEffectAction;
/**
 * @summary action
 * @description Changes the speed of the video playback.
 * @memberOf Actions.Effect
 * @param {number} speedIncreasePercent The percentage change of speed. Positive numbers speed up the playback, negative numbers slow down the playback (Range: -50 to 100, Server default: 0)
 * @return {Actions.Effect.AccelerationEffectAction}
 */
declare function accelerate(speedIncreasePercent?: number): AccelerationEffectAction;
/**
 * @summary action
 * @description
 * Fade in at the beginning of the video.
 * For details and examples, see 'Fade in and out' in the Video Transformations guide.
 * @memberOf Actions.Effect
 * @param {number} fadeLength The time in ms for the fade to occur. (Server default: 2000)
 * @return {Actions.Effect.FadeInEffectAction}
 */
declare function fadeIn(fadeLength?: number): FadeInEffectAction;
/**
 * @summary action
 * @description
 * Fade out at the end of the video.
 * For details and examples, see 'Fade in and out' in the Video Transformations guide.
 * @memberOf Actions.Effect
 * @param {number} fadeLength The time in ms for the fade to occur. (Server default: 2000)
 * @return {Actions.Effect.FadeoutEffectAction}
 */
declare function fadeOut(fadeLength?: number): FadeOutEffectAction;
/**
 * @summary action
 * @description
 * Delivers a video or animated GIF that contains additional loops of the video/GIF.
 * The total number of iterations is the number of additional loops plus one. <br/>
 * For animated GIFs only, you can also specify the loop effect without a numeric value to instruct it to loop the GIF infinitely.
 * @memberOf Actions.Effect
 * @param {number} additionalLoops The additional number of times to play the video or animated GIF.
 * @return {Actions.Effect.LoopEffectAction}
 */
declare function loop(additionalLoops?: number): LoopEffectAction;
/**
 * @summary action
 * @description
 * Makes the background of the image transparent (or solid white for formats that do not support transparency).
 * The background is determined as all pixels that resemble the pixels on the edges of the image.
 *
 * @memberOf Actions.Effect
 * @param {number} tolerance The tolerance used to accommodate variance in the background color. (Range: 0 to 100, Server default: 10)
 * @return {Actions.Effect.MakeTransparentEffectAction}
 */
declare function makeTransparent(tolerance?: number): MakeTransparentEffectAction;
/**
 * @summary action
 * @description Adds visual noise to the video, visible as a random flicker of "dots" or "snow".
 * @memberOf Actions.Effect
 * @param {number} percentage The percent of noise to apply. (Range: 0 to 100 Server default: 0)
 * @return {Actions.Effect.EffectActionWithLevel}
 */
declare function noise(percentage?: number): EffectActionWithLevel;
/**
 * @summary action
 * @description Applies a vignette effect.
 * @memberOf Actions.Effect
 * @param {number} strength The strength of the vignette. (Range: 0 to 100, Server default: 20)
 * @return {Actions.Effect.EffectActionWithStrength}
 */
declare function vignette(strength?: number): EffectActionWithStrength;
/**
 * @summary action
 * @description
 * Applies an ordered dither filter to the image.
 * Use the constants defined in {@link Qualifiers.Dither|@cloudinary/url-gen/qualifiers/dither} for ditherType.
 * @memberOf Actions.Effect
 * @param {Qualifiers.Dither} ditherType - The dither type applied to the image
 * @return {Actions.Effect.DitherEffectAction}
 */
declare function dither(ditherType?: number): DitherEffectAction;
/**
 * @summary action
 * @description
 * Vectorizes the image.
 * Notes:
 * To deliver the image as a vector image, make sure to change the format (or URL extension) to a vector format, such as SVG.</br>
 * However, you can also deliver in a raster format if you just want to get the 'vectorized' graphic effect.</br>
 * Large images are scaled down to 1000 pixels in the largest dimension before vectorization.
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.VectorizeEffectAction}
 */
declare function vectorize(): VectorizeEffectAction;
/**
 * @summary action
 * @description
 * Applies a gradient fade effect from one edge of the image.
 * Use .x() or .y() to indicate from which edge to fade and how much of the image should be faded.
 * Values of x and y can be specified as a percentage (Range: 0.0 to 1.0), or in pixels (integer values). <br/>
 * Positive values fade from the top (y) or left (x). Negative values fade from the bottom (y) or right (x). <br/>
 * By default, the gradient is applied to the top 50% of the image (y = 0.5).<br/>
 * Only one direction can be specified but the fade can be applied symmetrically using the mode parameter. </br>
 * To apply different amounts of fade to multiple edges, use chained fade effects.
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.GradientFadeEffectAction}
 */
declare function gradientFade(): GradientFadeEffectAction;
/**
 * @summary action
 * @description
 * Applies stripes to the image to help people with common color-blind conditions to differentiate between colors that are similar for them.</br>
 * You can replace colors using the xRay() method of the \Cloudinary\Transformation\AssistColorBlind class.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.AssistColorBlindEffectAction}
 */
declare function assistColorBlind(): AssistColorBlindEffectAction;
/**
 * @summary action
 * @description
 * Simulates the way an image would appear to someone with the specified color blind condition. </br>
 * For a list of supported color blind conditions see {@link Qualifiers.SimulateColorBlindValues| types of color blindness} for possible values
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimulateColorBlindEffectAction}
 */
declare function simulateColorBlind(): SimulateColorBlindEffectAction;
/**
 * @summary action
 * @description Removes small motion shifts from the video. with a maximum extent of movement in the horizontal and vertical direction of 32 pixels
 * @memberOf Actions.Effect
 * @return {Actions.Effect.DeshakeEffectAction}
 */
declare function deshake(pixels?: number | string): DeshakeEffectAction;
/**
 * @summary action
 * @description Supports the concatenation of videos with a custom transition by including a transition video as an
 * additional layer and specifying the transition effect
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
declare function transition(): SimpleEffectAction;
/**
 * @summary action
 * @description Applies a pixelatering filter to the asset.
 * @memberOf Actions.Effect
 * @param {number} squareSize The squareSize in the pixelation. (Range: 1 to 2000, Server default: 100)
 * @return {Actions.Effect.Pixelate}
 */
declare function pixelate(squareSize?: number): Pixelate;
/**
 * @summary action
 * @description Makes the background of an image transparent (or solid white for JPGs).</br>
 *              Use when the background is a uniform color.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_bgremoval|Background Removal}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.RemoveBackgroundAction}
 */
declare function removeBackground(): RemoveBackgroundAction;
/**
 * @summary action
 * @description Uses the Cloudinary AI Background Removal add-on to make the background of an image transparent.</br>
 *              When combined with other transformations, this effect must be specified in the first component.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_background_removal|Background Removal}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.BackgroundRemoval}
 */
declare function backgroundRemoval(): BackgroundRemoval;
/**
 * @summary action
 * @description Adds a shadow to the object in an image.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_dropshadow|Drop Shadow}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.DropShadow}
 */
declare function dropShadow(): DropShadow;
/**
 * @summary action
 * @description Remove objects from an asset using Generative AI
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_remove|Generative Remove}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.GenerativeRemove}
 */
declare function generativeRemove(): GenerativeRemove;
/**
 * @summary action
 * @description Uses generative AI to replace parts of your image with something else.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_replace|Generative Replace}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.GenerativeReplace}
 */
declare function generativeReplace(): GenerativeReplace;
/**
 * @summary action
 * @description Uses generative AI to replace background of your image with something else.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_background_replace|Generative Background Replace}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.GenerativeBackgroundReplace}
 */
declare function generativeBackgroundReplace(): GenerativeBackgroundReplace;
/**
 * @summary action
 * @description Extracts an area or multiple areas of an image, described in natural language.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_extract|Extract}
 *
 * @memberOf Actions.Effect
 * @return {Actions.Effect.Extract}
 */
declare function extract(prompts: string | string[]): Extract;
/**
 * @summary action
 * @description Uses generative AI to recolor objects from your image.
 *              {@link https://cloudinary.com/documentation/transformation_reference#e_gen_recolor|Generative Recolor}
 * @param {string | string[]} prompts
 * @param {SystemColors} color
 * @memberOf Actions.Effect
 * @return {Actions.Effect.GenerativeRecolor}
 */
declare function generativeRecolor(prompts: string | string[], color: SystemColors): GenerativeRecolor;
/**
 * @summary action
 * @description
 * Uses generative AI to restore details in poor quality images
 * or images that may have become degraded through repeated processing and compression.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
declare function generativeRestore(): SimpleEffectAction;
/**
 * @summary action
 * @description
 * Uses AI-based prediction to add fine detail while upscaling small images.
 * This 'super-resolution' feature scales each dimension by four, multiplying the total number of pixels by 16.
 * @memberOf Actions.Effect
 * @return {Actions.Effect.SimpleEffectAction}
 */
declare function upscale(): SimpleEffectAction;
/**
 *
 * @description Changes the main background color to the one specified, as if a 'theme change' was applied (e.g. dark mode vs light mode).
 * @param {SystemColors} color
 * @return {Actions.Effect.ThemeEffect}
 */
declare function theme(color: SystemColors): ThemeEffect;
/**
 *
 * @description Uses AI to analyze an image and make adjustments to enhance the appeal of the image.
 * @return {Actions.Effect.Enhance}
 */
declare function enhance(): SimpleEffectAction;
/**
 * @description Defines effects that you can apply to transform your assets.
 * @memberOf Actions
 * @namespace Effect
 * @example
 * <caption>An <b>extreme</b> example of using many effects on the same asset</caption>
 * import {Cloudinary} from "@cloudinary/url-gen";
 * // Import everything, or just the action you need for tree-shaking purposes
 * import {Effect, sepia} from "@cloudinary/url-gen/actions/effect";
 * import {ArtisticFilter, alDente} from "@cloudinary/url-gen/qualifiers/artisticFilter";
 * import {ShakeStrength, pixels16} from "@cloudinary/url-gen/qualifiers/shakeStrength";
 * import {cat, dog} from "@cloudinary/url-gen/qualifiers/ForegroundObject";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const image = yourCldInstance.image('woman');
 *
 * image.effect(Effect.advancedRedEye())
 * .effect(Effect.accelerate())
 * .effect(Effect.accelerate(100))
 * .effect(Effect.accelerate().rate(5))
 * .effect(Effect.boomerang())
 * .effect(Effect.blackwhite())
 * .effect(Effect.blackwhite(10))
 * .effect(Effect.blackwhite().threshold(20))
 * .effect(Effect.fadeIn(100))
 * .effect(Effect.fadeIn().duration(5))
 * .effect(Effect.fadeOut(100))
 * .effect(Effect.fadeOut().duration(5))
 * .effect(Effect.grayscale())
 * .effect(Effect.loop())
 * .effect(Effect.loop(100))
 * .effect(Effect.loop().additionalIterations(5))
 * .effect(Effect.makeTransparent())
 * .effect(Effect.makeTransparent(100))
 * .effect(Effect.makeTransparent().tolerance(5))
 * .effect(Effect.makeTransparent().tolerance(5).colorToReplace('red'))
 * .effect(Effect.noise())
 * .effect(Effect.noise(100))
 * .effect(Effect.noise().level(5))
 * .effect(Effect.negate())
 * .effect(Effect.reverse())
 * .effect(Effect.redEye())
 * .effect(Effect.sepia())
 * .effect(Effect.sepia(100))
 * .effect(Effect.sepia().level(5))
 * .effect(Effect.vignette())
 * .effect(Effect.vignette(100))
 * .effect(Effect.vignette().strength(5))
 * .effect(Effect.deshake())
 * .effect(Effect.deshake(10))
 * .effect(Effect.artisticFilter(alDente())
 * .effect(Effect.deshake().shakeStrength(pixels16()))
 * .effect(Effect.backgroundRemoval().fineEdges(true).hints(cat(), dog())
 * .effect(Effect.generativeRemove().prompt("red car").detectMultiple())
 * .effect(Effect.generativeRemove().region({x: 20, y: 200, width: 100, height: 100}))
 * .effect(Effect.generativeReplace().from("ceiling").to("sunny sky").preserveGeometry(true))
 */
declare const Effect: {
    pixelate: typeof pixelate;
    deshake: typeof deshake;
    boomerang: typeof boomerang;
    advancedRedEye: typeof advancedRedEye;
    blackwhite: typeof blackwhite;
    negate: typeof negate;
    redEye: typeof redEye;
    reverse: typeof reverse;
    accelerate: typeof accelerate;
    fadeIn: typeof fadeIn;
    fadeOut: typeof fadeOut;
    loop: typeof loop;
    makeTransparent: typeof makeTransparent;
    noise: typeof noise;
    vignette: typeof vignette;
    blur: typeof blur;
    grayscale: typeof grayscale;
    sepia: typeof sepia;
    shadow: typeof shadow;
    colorize: typeof colorize;
    oilPaint: typeof oilPaint;
    artisticFilter: typeof artisticFilter;
    cartoonify: typeof cartoonify;
    outline: typeof outline;
    styleTransfer: typeof styleTransfer;
    gradientFade: typeof gradientFade;
    vectorize: typeof vectorize;
    assistColorBlind: typeof assistColorBlind;
    simulateColorBlind: typeof simulateColorBlind;
    transition: typeof transition;
    dither: typeof dither;
    removeBackground: typeof removeBackground;
    backgroundRemoval: typeof backgroundRemoval;
    dropShadow: typeof dropShadow;
    generativeRemove: typeof generativeRemove;
    generativeReplace: typeof generativeReplace;
    generativeBackgroundReplace: typeof generativeBackgroundReplace;
    generativeRecolor: typeof generativeRecolor;
    generativeRestore: typeof generativeRestore;
    upscale: typeof upscale;
    theme: typeof theme;
    enhance: typeof enhance;
    extract: typeof extract;
};
export declare type EffectActions = SimpleEffectAction | EffectOutline | ShadowEffectAction | AssistColorBlindEffectAction | SimulateColorBlindEffectAction | CartoonifyEffect | StyleTransfer | VectorizeEffectAction | GradientFadeEffectAction | BlurAction | Pixelate | RemoveBackgroundAction | FadeInEffectAction | FadeOutEffectAction | AccelerationEffectAction | BackgroundRemoval | DropShadow | GenerativeRemove | GenerativeReplace | GenerativeBackgroundReplace | GenerativeRecolor | Extract;
export { Effect, pixelate, deshake, boomerang, advancedRedEye, blackwhite, negate, redEye, reverse, accelerate, fadeIn, fadeOut, loop, makeTransparent, noise, vignette, blur, grayscale, sepia, shadow, colorize, oilPaint, artisticFilter, cartoonify, outline, styleTransfer, gradientFade, vectorize, assistColorBlind, simulateColorBlind, transition, dither, removeBackground, backgroundRemoval, dropShadow, generativeRemove, generativeReplace, generativeBackgroundReplace, generativeRecolor, generativeRestore, upscale, theme, enhance, extract };
