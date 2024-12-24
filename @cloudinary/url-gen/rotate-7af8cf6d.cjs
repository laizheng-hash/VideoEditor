'use strict';

var RotateAction = require('./RotateAction-3874422b.cjs');

/**
 * Rotates or flips an image or video by the specified number of degrees, or automatically (images only) according to its orientation or available metadata.
 * @memberOf Actions
 * @namespace Rotate
 *
 * @example
 * <caption>Rotate by mode</caption>
 * import {Cloudinary} from "@cloudinary/url-gen";
 * import {mode, byAngle} from "@cloudinary/url-gen/actions/rotate";
 * import {autoLeft} from "@cloudinary/url-gen/qualifiers/rotationMode";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const image = yourCldInstance.image('woman');
 *
 * // Rotate by mode
 * image.rotate(mode(autoLeft());
 *
 * // Rotate by angle
 * image.rotate(byAngle(90));
 *
 * image.toString();
 */
/**
 * @summary action
 * @description Rotate an image by using a rotationMode
 * @param {RotationModeType|string} rotationMode
 * For a list of supported rotation modes see {@link Qualifiers.RotationMode| types of rotation modes} for
 * possible values
 * @memberOf Actions.Rotate
 * @return {Actions.Rotate.RotateAction}
 */
function mode(rotationMode) {
    return new RotateAction.RotateAction().mode(rotationMode);
}
/**
 * @summary action
 * @description Rotate an image by the given degrees.
 * @param {number} angle Given degrees. (Range: 0 to 360, Default: 0).
 * @return {Actions.Rotate.RotateAction}
 * @memberOf Actions.Rotate
 */
function byAngle(angle) {
    return new RotateAction.RotateAction(angle);
}
const Rotate = { byAngle, mode };

exports.Rotate = Rotate;
exports.byAngle = byAngle;
exports.mode = mode;