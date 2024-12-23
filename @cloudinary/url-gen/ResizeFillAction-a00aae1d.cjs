'use strict';

var Qualifier = require('./Qualifier-6633a22f.cjs');
var ResizeAdvancedAction = require('./ResizeAdvancedAction-d9fa13e5.cjs');

/**
 * @description Defines how to crop-fill an asset
 * @extends Actions.Resize.ResizeAdvancedAction
 * @memberOf Actions.Resize
 * @see Visit {@link Actions.Resize| Resize} for examples
 */
class ResizeFillAction extends ResizeAdvancedAction.ResizeAdvancedAction {
    /**
     * @description Absolute X position when used with Gravity.xyCenter {@link Qualifiers.Gravity.GravityQualifier}}
     * @param {number} x The x position.
     */
    x(x) {
        this._actionModel.x = x;
        return this.addQualifier(new Qualifier.Qualifier('x', x));
    }
    /**
     * @description Absolute Y position when used with Gravity.xyCenter {@link Qualifiers.Gravity.GravityQualifier}}
     * @param {number} y The y position.
     */
    y(y) {
        this._actionModel.y = y;
        return this.addQualifier(new Qualifier.Qualifier('y', y));
    }
    static fromJson(actionModel) {
        const result = super.fromJson.apply(this, [actionModel]);
        actionModel.x && result.x(actionModel.x);
        actionModel.y && result.y(actionModel.y);
        return result;
    }
}

exports.ResizeFillAction = ResizeFillAction;
