import CutByImage from "./reshape/CutByImage.js";
import { DistortArcAction } from "./reshape/DistortArc.js";
import { ShearAction } from "./reshape/Shear.js";
import { DistortAction } from "./reshape/Distort.js";
import { TrimAction } from "./reshape/TrimAction.js";
/**
 * @summary action
 * @memberOf Actions
 * @namespace Reshape
 * @description Adjusts the shape of the delivered image. </br>
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Shape changes and distortion effects}
 * @example
 * // Expand every function separately to see its own example
 */
/**
 * @summary action
 * @description Trims pixels according to the transparency levels of a given overlay image.
 * Wherever the overlay image is transparent, the original is shown, and wherever the overlay is opaque, the resulting image is transparent.
 * @param {Qualifiers.Source.ImageSource} imageSource
 * @memberOf Actions.Reshape
 * @return {Actions.Reshape.CutByImage}
 * @example
 * <caption> <h4>Cut an image by using another image(Gravity)</h4> </caption>
 * import {Cloudinary, Transformation} from "@cloudinary/url-gen";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const img = yourCldInstance.image('woman');
 *
 * import {cutByImage} from '@cloudinary/url-gen/actions/reshape';
 * import {image} from "@cloudinary/url-gen/qualifiers/source";
 *
 * img.reshape(
 *    cutByImage(
 *        image('sourceImage').transformation(new Transformation())
 * ))
 * img.toString()
 */
function cutByImage(imageSource) {
    return new CutByImage(imageSource);
}
/**
 * @summary action
 * @description Distorts the image to an arc shape.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#e_distort|Distorting images}</br>
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Distortion effects}
 *
 * @param {number} degrees The degrees to arc the image
 * @memberOf Actions.Reshape
 * @return {Actions.Reshape.DistortArcAction}
 * @example
 * <caption> <h4>Distort arc</h4> </caption>
 * import {Cloudinary, Transformation} from "@cloudinary/url-gen";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const img = yourCldInstance.image('woman');
 *
 * import {distortArc} from '@cloudinary/url-gen/actions/reshape';
 *
 * img.reshape(
 *    distortArc(200)
 * )
 * img.toString()
 */
function distortArc(degrees) {
    return new DistortArcAction(degrees);
}
/**
 * @summary action
 * @description Distorts the image to a new shape by adjusting its corners to achieve perception warping.
 * Specify four corner coordinates, representing the new coordinates for each of the image's four corners,
 * in clockwise order from the top-left corner.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#e_distort|Distorting images}
 *
 * @param {number[]} coordinates - Four x/y pairs representing the new image corners
 * @memberOf Actions.Reshape
 * @return {Actions.Reshape.DistortAction}
 * @example
 * <caption> <h4>Distorting an image</h4> </caption>
 * import {Cloudinary, Transformation} from "@cloudinary/url-gen";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const img = yourCldInstance.image('woman');
 *
 * import {distort} from '@cloudinary/url-gen/actions/reshape';
 *
 * img.reshape(
 *    distort([100, 100, 100, 200, 200, 200, 200, 100])
 * )
 * img.toString()
 */
function distort(coordinates) {
    return new DistortAction(coordinates);
}
/**
 * @summary action
 * @description Skews the image according to the two specified values in degrees.
 * @param {number} x Skews the image according to the two specified values in degrees. (X and Y)
 * @param {number} y Skews the image according to the two specified values in degrees. (X and Y)
 * @memberOf Actions.Reshape
 * @return {Actions.Reshape.ShearAction}
 * @example
 * <caption> <h4>Shearing an image</h4> </caption>
 * import {Cloudinary, Transformation} from "@cloudinary/url-gen";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const img = yourCldInstance.image('woman');
 *
 * import {shear} from '@cloudinary/url-gen/actions/reshape';
 *
 * img.reshape(
 *    shear(50, 0)
 * )
 * img.toString()
 */
function shear(x, y) {
    return new ShearAction(x, y);
}
/**
 * @summary action
 * @description Removes the edges of the image based on the color of the corner pixels.
 * Specify a color other than the color of the corner pixels using the colorOverride() method
 * @memberOf Actions.Reshape
 * @return {Actions.Reshape.TrimAction}
 * @example
 * <caption> <h4>Trimming an image</h4> </caption>
 * import {Cloudinary, Transformation} from "@cloudinary/url-gen";
 *
 * const yourCldInstance = new Cloudinary({cloud:{cloudName:'demo'}});
 * const img = yourCldInstance.image('woman');
 *
 * import {trim} from '@cloudinary/url-gen/actions/reshape';
 *
 * img.reshape(
 *    trim().colorOverride('blue').colorSimilarity(15)
 * )
 * img.toString()
 */
function trim() {
    return new TrimAction();
}
const Reshape = { cutByImage, distortArc, distort, shear, trim };
export { cutByImage, Reshape, distortArc, distort, shear, trim };
