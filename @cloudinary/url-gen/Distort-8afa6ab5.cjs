'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description Distorts the image to a new shape by adjusting its corners to achieve perception warping.
 * Specify four corner coordinates, representing the new coordinates for each of the image's four corners,
 * in clockwise order from the top-left corner.
 *
 * <b>Learn more:</b> {@link https://cloudinary.com/documentation/transformation_reference#e_distort|Distorting images}
 * @param {number[]} coordinates - Four x/y pairs representing the new image corners
 * @extends SDK.Action
 * @memberOf Actions.Reshape
 * @see Visit {@link Actions.Reshape| Reshape} for examples
 */
class DistortAction extends Action.Action {
    constructor(coordinates) {
        super();
        this.addQualifier(new Qualifier.Qualifier('e', `distort:${coordinates.join(':')}`));
    }
}

exports.DistortAction = DistortAction;
