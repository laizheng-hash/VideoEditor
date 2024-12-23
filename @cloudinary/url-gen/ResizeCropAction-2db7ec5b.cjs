'use strict';

var Qualifier = require('./Qualifier-6633a22f.cjs');
var ResizeAdvancedAction = require('./ResizeAdvancedAction-d9fa13e5.cjs');

/**
 * @description Defines how to crop an asset
 * @extends Actions.Resize.ResizeAdvancedAction
 * @memberOf Actions.Resize
 * @see Visit {@link Actions.Resize| Resize} for examples
 */
class ResizeCropAction extends ResizeAdvancedAction.ResizeAdvancedAction {
    /**
     * @description Horizontal position for custom-coordinates based cropping.
     * @param {number} x The x position.
     */
    x(x) {
        this._actionModel.x = x;
        return this.addQualifier(new Qualifier.Qualifier('x', x));
    }
    /**
     * @description Vertical position for custom-coordinates based cropping
     * @param {number} y The y position.
     */
    y(y) {
        this._actionModel.y = y;
        return this.addQualifier(new Qualifier.Qualifier('y', y));
    }
    /**
     * @description Controls how much of the original image surrounding the face to keep when using either the 'crop' or 'thumb' cropping modes with face detection.
     * @param {number | string} z The zoom factor. (Default: 1.0)
     */
    zoom(z) {
        this._actionModel.zoom = z;
        return this.addQualifier(new Qualifier.Qualifier('z', z));
    }
    static fromJson(actionModel) {
        const result = super.fromJson.apply(this, [actionModel]);
        actionModel.x && result.x(actionModel.x);
        actionModel.y && result.y(actionModel.y);
        actionModel.zoom && result.zoom(actionModel.zoom);
        return result;
    }
}

exports.ResizeCropAction = ResizeCropAction;
