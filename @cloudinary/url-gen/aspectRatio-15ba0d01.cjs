'use strict';

var AspectRatioQualifierValue = require('./AspectRatioQualifierValue-d520bb1a.cjs');
var flag = require('./flag-31bc1b8c.cjs');

/**
 * @description 1 by 1 aspect ration.
 * @memberOf Qualifiers.AspectRatio
 * @return {string}
 */
function ar1X1() {
    return new AspectRatioQualifierValue.AspectRatioQualifierValue('1:1');
}
/**
 * @summary qualifier
 * @description 5 by 4 aspect ration.
 * @memberOf Qualifiers.AspectRatio
 * @return {string}
 */
function ar5X4() {
    return new AspectRatioQualifierValue.AspectRatioQualifierValue('5:4');
}
/**
 * @summary qualifier
 * @description 4 by 3 aspect ration.
 * @memberOf Qualifiers.AspectRatio
 * @return {string}
 */
function ar4X3() {
    return new AspectRatioQualifierValue.AspectRatioQualifierValue('4:3');
}
/**
 * @summary qualifier
 * @description 3 by 2 aspect ration.
 * @memberOf Qualifiers.AspectRatio
 * @return {string}
 */
function ar3X2() {
    return new AspectRatioQualifierValue.AspectRatioQualifierValue('3:2');
}
/**
 * @summary qualifier
 * @description 16 by 9 aspect ration.
 * @memberOf Qualifiers.AspectRatio
 * @return {string}
 */
function ar16X9() {
    return new AspectRatioQualifierValue.AspectRatioQualifierValue('16:9');
}
/**
 * @summary qualifier
 * @description 3 by 1 aspect ration.
 * @memberOf Qualifiers.AspectRatio
 * @return {string}
 */
function ar3X1() {
    return new AspectRatioQualifierValue.AspectRatioQualifierValue('3:1');
}
/**
 * @summary qualifier
 * @description ignores aspect ratio.
 * @memberOf Qualifiers.AspectRatio
 * @return {IgnoreAspectRatioQualifier}
 */
function ignoreInitialAspectRatio() {
    return flag.ignoreInitialAspectRatio();
}
/**
 * @summary qualifier
 * @description A list of all most commonly used aspect ratios. including an ‘ignore aspect ratio’ option which direct the BE to not stick to the original aspect ratio.
 * This is used in the context of resize actions
 * @namespace AspectRatio
 * @memberOf Qualifiers
 * @see Visit {@link Actions.Resize|Resize} for an example
 */
const AspectRatio = {
    ar1X1,
    ar5X4,
    ar3X1,
    ar3X2,
    ar4X3,
    ar16X9,
    ignoreInitialAspectRatio
};

exports.AspectRatio = AspectRatio;
exports.ar16X9 = ar16X9;
exports.ar1X1 = ar1X1;
exports.ar3X1 = ar3X1;
exports.ar3X2 = ar3X2;
exports.ar4X3 = ar4X3;
exports.ar5X4 = ar5X4;
exports.ignoreInitialAspectRatio = ignoreInitialAspectRatio;
