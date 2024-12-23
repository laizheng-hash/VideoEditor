'use strict';

/**
 * @description Defines how the background gradient fade effect is applied.
 * @memberOf Qualifiers
 * @namespace GradientFade
 */
/**
 * @summary qualifier
 * @description Instructs the gradient fade to be applied symmetrically (to opposite edges of the image).
 * @memberOf Qualifiers.GradientFade
 * @return {string}
 */
function symmetric() {
    return 'symmetric';
}
/**
 * @summary qualifier
 * @description Instructs the gradient fade to be applied symmetrically (to opposite edges of the image) including background padding.
 * @memberOf Qualifiers.GradientFade
 * @return {string}
 */
function symmetricPad() {
    return 'symmetric_pad';
}
const GradientFade = {
    symmetric,
    symmetricPad
};

exports.GradientFade = GradientFade;
exports.symmetric = symmetric;
exports.symmetricPad = symmetricPad;
