'use strict';

var ResizeSimpleAction = require('./ResizeSimpleAction-0ef78caa.cjs');
var GravityQualifier = require('./GravityQualifier-3be0186a.cjs');

/**
 * @description Defines a scaling resize action.
 * @extends Actions.Resize.ResizeSimpleAction
 * @memberOf Actions.Resize
 * @see Visit {@link Actions.Resize| Resize} for examples
 */
class ResizeScaleAction extends ResizeSimpleAction.ResizeSimpleAction {
    /**
     * @description Changes the aspect ratio of an image while retaining all important content and avoiding unnatural
     * distortions.
     * @return {this}
     */
    liquidRescaling() {
        return this.addQualifier(new GravityQualifier.GravityQualifier('liquid'));
    }
}

exports.ResizeScaleAction = ResizeScaleAction;
