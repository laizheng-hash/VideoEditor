'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CutByImage = require('../CutByImage-987f54d9.cjs');
var DistortArc = require('../DistortArc-30429ddb.cjs');
var Shear = require('../Shear-6fd22532.cjs');
var Distort = require('../Distort-8afa6ab5.cjs');
var Action = require('../Action-0ed405c1.cjs');
require('../Qualifier-6633a22f.cjs');
require('../QualifierValue-e770d619.cjs');
require('../QualifierModel-0923d819.cjs');
require('../unsupportedError-74070138.cjs');
require('../FlagQualifier-7b069f22.cjs');

/**
 * @description Removes the edges of the image based on the color of the corner pixels.
 * Specify a color other than the color of the corner pixels using the colorOverride() method
 * @extends SDK.Action
 * @memberOf Actions.Reshape
 * @see Visit {@link Actions.Reshape| Reshape} for examples
 */
class TrimAction extends Action.Action {
    /**
     * @param {number} tolerance The tolerance level for color similarity.
     */
    colorSimilarity(tolerance) {
        this._tolerance = tolerance;
        return this;
    }
    /**
     * @param {string | Qualifiers.Color} color Overrides the corner pixels color with the specified color.
     */
    colorOverride(color) {
        this._color = color;
        return this;
    }
    toString() {
        // image.reshape(Reshape.trim()->colorSimilarity(50)->colorOverride(Color.YELLOW));
        // e_trim:50:yellow
        return [
            'e_trim',
            this._tolerance,
            this._color
        ].filter((a) => a).join(':');
    }
}

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
    return new CutByImage.CutByImage(imageSource);
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
    return new DistortArc.DistortArcAction(degrees);
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
    return new Distort.DistortAction(coordinates);
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
    return new Shear.ShearAction(x, y);
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

exports.Reshape = Reshape;
exports.cutByImage = cutByImage;
exports.distort = distort;
exports.distortArc = distortArc;
exports.shear = shear;
exports.trim = trim;
