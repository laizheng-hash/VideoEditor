'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/**
 * @description Qualifiers for applying an ordered dither filter to the image.
 * @namespace Dither
 * @memberOf Qualifiers
 * @see Visit {@link Actions.Effect.dither|Dither Effect} for an example
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function threshold1x1Nondither() {
    return 0;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function checkerboard2x1Dither() {
    return 1;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function ordered2x2Dispersed() {
    return 2;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function ordered3x3Dispersed() {
    return 3;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function ordered4x4Dispersed() {
    return 4;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function ordered8x8Dispersed() {
    return 5;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function halftone4x4Angled() {
    return 6;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function halftone6x6Angled() {
    return 7;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function halftone8x8Angled() {
    return 8;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function halftone4x4Orthogonal() {
    return 9;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function halftone6x6Orthogonal() {
    return 10;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function halftone8x8Orthogonal() {
    return 11;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function halftone16x16Orthogonal() {
    return 12;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function circles5x5Black() {
    return 13;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function circles5x5White() {
    return 14;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function circles6x6Black() {
    return 15;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function circles6x6White() {
    return 16;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function circles7x7Black() {
    return 17;
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Dither
 */
function circles7x7White() {
    return 18;
}
var Dither = {
    checkerboard2x1Dither: checkerboard2x1Dither,
    circles5x5Black: circles5x5Black,
    circles5x5White: circles5x5White,
    circles6x6Black: circles6x6Black,
    circles6x6White: circles6x6White,
    circles7x7Black: circles7x7Black,
    circles7x7White: circles7x7White,
    halftone4x4Angled: halftone4x4Angled,
    halftone4x4Orthogonal: halftone4x4Orthogonal,
    halftone6x6Angled: halftone6x6Angled,
    halftone6x6Orthogonal: halftone6x6Orthogonal,
    halftone8x8Angled: halftone8x8Angled,
    halftone8x8Orthogonal: halftone8x8Orthogonal,
    halftone16x16Orthogonal: halftone16x16Orthogonal,
    ordered2x2Dispersed: ordered2x2Dispersed,
    ordered3x3Dispersed: ordered3x3Dispersed,
    ordered4x4Dispersed: ordered4x4Dispersed,
    ordered8x8Dispersed: ordered8x8Dispersed,
    threshold1x1Nondither: threshold1x1Nondither
};

exports.Dither = Dither;
exports.checkerboard2x1Dither = checkerboard2x1Dither;
exports.circles5x5Black = circles5x5Black;
exports.circles5x5White = circles5x5White;
exports.circles6x6Black = circles6x6Black;
exports.circles6x6White = circles6x6White;
exports.circles7x7Black = circles7x7Black;
exports.circles7x7White = circles7x7White;
exports.halftone16x16Orthogonal = halftone16x16Orthogonal;
exports.halftone4x4Angled = halftone4x4Angled;
exports.halftone4x4Orthogonal = halftone4x4Orthogonal;
exports.halftone6x6Angled = halftone6x6Angled;
exports.halftone6x6Orthogonal = halftone6x6Orthogonal;
exports.halftone8x8Angled = halftone8x8Angled;
exports.halftone8x8Orthogonal = halftone8x8Orthogonal;
exports.ordered2x2Dispersed = ordered2x2Dispersed;
exports.ordered3x3Dispersed = ordered3x3Dispersed;
exports.ordered4x4Dispersed = ordered4x4Dispersed;
exports.ordered8x8Dispersed = ordered8x8Dispersed;
exports.threshold1x1Nondither = threshold1x1Nondither;
