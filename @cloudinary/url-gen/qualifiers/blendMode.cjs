'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var BlendModeQualifier = require('../BlendModeQualifier-744337e6.cjs');
require('../Action-0ed405c1.cjs');
require('../FlagQualifier-7b069f22.cjs');
require('../QualifierValue-e770d619.cjs');
require('../Qualifier-6633a22f.cjs');
require('../QualifierModel-0923d819.cjs');
require('../unsupportedError-74070138.cjs');

/**
 * @description Defines the mode of blending to use when overlaying an image.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#blending_and_masking_layers|Overlay blending effects}
 * @namespace BlendMode
 * @memberOf Qualifiers
 * @see To be used with an {@link Actions.Overlay|Overlay}
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.BlendMode
 * @description Add an overlay image blended using the 'multiply' blend mode.
 * @return {Qualifiers.BlendMode.BlendModeQualifier}
 */
function multiply() {
    return new BlendModeQualifier.BlendModeQualifier('multiply');
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.BlendMode
 * @description Add an overlay image blended using the 'screen' blend mode.
 * @return {Qualifiers.BlendMode.BlendModeQualifier}
 */
function screen() {
    return new BlendModeQualifier.BlendModeQualifier('screen');
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.BlendMode
 * @description Add an overlay image blended using the 'overlay' blend mode.
 * @return {Qualifiers.BlendMode.BlendModeQualifier}
 */
function overlay() {
    return new BlendModeQualifier.BlendModeQualifier('overlay');
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.BlendMode
 * @description Add an overlay image blended using the 'mask' blend mode.
 * @return {Qualifiers.BlendMode.BlendModeQualifier}
 */
function mask() {
    return new BlendModeQualifier.BlendModeQualifier('mask');
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.BlendMode
 * @description Add an overlay image blended using the 'antiRemoval' blend mode.
 * @param {number} lvl 	The level of distortion. (Range: 1 to 100, Server default: 50)
 * @return {Qualifiers.BlendMode.BlendModeQualifier}
 */
function antiRemoval(lvl) {
    return new BlendModeQualifier.BlendModeQualifier('anti_removal', lvl);
}
const BlendMode = {
    screen,
    multiply,
    overlay,
    mask,
    antiRemoval
};

exports.BlendMode = BlendMode;
exports.antiRemoval = antiRemoval;
exports.mask = mask;
exports.multiply = multiply;
exports.overlay = overlay;
exports.screen = screen;
