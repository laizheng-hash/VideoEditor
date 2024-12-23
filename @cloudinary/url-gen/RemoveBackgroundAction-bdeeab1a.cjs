'use strict';

var Action = require('./Action-0ed405c1.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description A class that defines how to remove the background of an asset
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class RemoveBackgroundAction extends Action.Action {
    constructor() {
        super();
        this.overwriteQualifier();
    }
    /**
     * @description Everytime this method is called, it will overwrite the e_bgremoval qualifier with new values
     * @private
     */
    overwriteQualifier() {
        const value = ['bgremoval', this._screen ? 'screen' : '', (this._colorToRemove || '').replace('#', '')];
        return this.addQualifier(new Qualifier.Qualifier('e', new QualifierValue.QualifierValue(value)));
    }
    /**
     * @description The strength of the shadow. (Range: 0 to 100, Server default: 40)
     * @param {number} useScreen Boolean, defaults to true
     * @return {this}
     */
    screen(useScreen = true) {
        this._screen = useScreen;
        return this.overwriteQualifier();
    }
    /**
     * @description The color to remove from the background
     * @param {SystemColors} color
     * @return {this}
     */
    colorToRemove(color) {
        this._colorToRemove = color;
        return this.overwriteQualifier();
    }
}

exports.RemoveBackgroundAction = RemoveBackgroundAction;
