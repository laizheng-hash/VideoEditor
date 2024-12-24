'use strict';

var RotationModeQualifierValue = require('./RotationModeQualifierValue-ea72af07.cjs');

/**
 * @description Contains functions to select the rotation mode.
 * </br><b>Learn more</b>: {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#rotating_images|Rotating images}
 * </br><b>Learn more</b>: {@link https://cloudinary.com/documentation/video_effects_and_enhancements#rotating_videos|Rotating videos}
 * @memberOf Qualifiers
 * @namespace RotationMode
 * @see Visit {@link Actions.Rotate|Rotate Action} for an example
 */
/**
 * @summary qualifier
 * @description Rotate image 90 degrees clockwise only if the requested aspect ratio does not match the image's aspect ratio.
 * @memberOf Qualifiers.RotationMode
 * @return {Qualifiers.RotationMode.RotationModeQualifierValue}
 */
function autoRight() {
    return new RotationModeQualifierValue.RotationModeQualifierValue('auto_right');
}
/**
 * @summary qualifier
 * @description Rotate image 90 degrees counterclockwise only if the requested aspect ratio does not match the image's aspect ratio.
 * @memberOf Qualifiers.RotationMode
 * @return {Qualifiers.RotationMode.RotationModeQualifierValue}
 */
function autoLeft() {
    return new RotationModeQualifierValue.RotationModeQualifierValue('auto_left');
}
/**
 * @summary qualifier
 * @description Vertical mirror flip of the image.
 * @memberOf Qualifiers.RotationMode
 * @return {Qualifiers.RotationMode.RotationModeQualifierValue}
 */
function verticalFlip() {
    return new RotationModeQualifierValue.RotationModeQualifierValue('vflip');
}
/**
 * @summary qualifier
 * @description Horizontal mirror flip of the image.
 * @memberOf Qualifiers.RotationMode
 * @return {Qualifiers.RotationMode.RotationModeQualifierValue}
 */
function horizontalFlip() {
    return new RotationModeQualifierValue.RotationModeQualifierValue('hflip');
}
/**
 * @summary qualifier
 * @description By default, the image is automatically rotated according to the EXIF data stored by the camera when the image
 *                           was taken. Set the angle to 'ignore' if you do not want the image to be automatically rotated.
 * @memberOf Qualifiers.RotationMode
 * @return {Qualifiers.RotationMode.RotationModeQualifierValue}
 */
function ignore() {
    return new RotationModeQualifierValue.RotationModeQualifierValue('ignore');
}
const RotationMode = { autoLeft, autoRight, horizontalFlip, ignore, verticalFlip };

exports.RotationMode = RotationMode;
exports.autoLeft = autoLeft;
exports.autoRight = autoRight;
exports.horizontalFlip = horizontalFlip;
exports.ignore = ignore;
exports.verticalFlip = verticalFlip;