'use strict';

var Action = require('./Action-0ed405c1.cjs');

/**
 * @description Creates the 3D_lut layer transformation
 * @memberOf Actions.Adjust
 * @extends SDK.Action
 */
class By3dLutAction extends Action.Action {
    constructor(publicId) {
        super();
        this.publicId = publicId;
    }
    /**
     * Returns a string representation of the action
     * @return {string}
     */
    toString() {
        return `l_lut:${this.publicId}/fl_layer_apply`;
    }
}

exports.By3dLutAction = By3dLutAction;
