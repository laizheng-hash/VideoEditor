'use strict';

/**
 * @description Contains functions to select the font weight.
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/layers#text_layer_options|Adding text overlays to images}
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/video_layers#text_layer_options|Adding text overlays to videos}
 * @memberOf Qualifiers
 * @namespace FontWeight
 * @see To be used with {@link Qualifiers.TextStyle|Text Style}
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontWeight
 */
function thin() {
    return 'thin';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontWeight
 */
function light() {
    return 'light';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontWeight
 */
function normal() {
    return 'normal';
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.FontWeight
 */
function bold() {
    return 'bold';
}
const FontWeight = { bold, light, normal, thin };

exports.FontWeight = FontWeight;
exports.bold = bold;
exports.light = light;
exports.normal = normal;
exports.thin = thin;
