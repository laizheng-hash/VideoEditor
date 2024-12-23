'use strict';

var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Action = require('./Action-0ed405c1.cjs');

/**
 * @description Changes the main background color to the one specified, as if a 'theme change' was applied (e.g. dark mode vs light mode).
 * @extends SDK.Action
 * @memberOf {Actions.Effect}
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class ThemeEffect extends Action.Action {
    constructor(color) {
        super();
        this.effectName = 'theme';
        this.color = color;
    }
    /**
     * @description The sensitivity to photographic elements of an image.
     *              A value of 0 treats the whole image as non-photographic.
     *              A value of 200 treats the whole image as photographic, so no theme change is applied.
     * @param {number} photosensitivity
     * @return {this}
     */
    photosensitivity(photosensitivity) {
        this._photosensitivity = photosensitivity;
        return this;
    }
    prepareQualifiers() {
        const sensitivity = this._photosensitivity ? `:photosensitivity_${this._photosensitivity}` : '';
        // Replace # in hex colors (#fff -> fff)
        const val = `${this.effectName}:color_${this.color.replace('#', '')}${sensitivity}`;
        this.addQualifier(new Qualifier.Qualifier('e', new QualifierValue.QualifierValue(val)));
        return;
    }
}

exports.ThemeEffect = ThemeEffect;
