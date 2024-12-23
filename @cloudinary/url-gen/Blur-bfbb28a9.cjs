'use strict';

var Qualifier = require('./Qualifier-6633a22f.cjs');
var Action = require('./Action-0ed405c1.cjs');
var region = require('./region-ef039f04.cjs');

/**
 * @description The Action class of the blur Builder.
 * @extends SDK.Action
 * @memberOf Actions.Effect
 * @see Visit {@link Actions.Effect|Effect} for an example
 */
class BlurAction extends Action.Action {
    constructor(strength) {
        super();
        this._actionModel = {};
        this._strength = strength;
        this._actionModel.actionType = 'blur';
        this._actionModel.strength = strength;
    }
    /**
     * @description Specifies the region to blur.
     * @param {NamedRegion} blurRegion
     */
    region(blurRegion) {
        this._region = blurRegion;
        this._actionModel.region = blurRegion.toJson();
        return this;
    }
    /**
     * @description Sets the strength of the blur effect.
     * @param {number | string} strength
     */
    strength(strength) {
        this._strength = strength;
        this._actionModel.strength = strength;
        return this;
    }
    prepareQualifiers() {
        /*
         * Blur with region is a unique object in this codebase.
         * On top of Blur being an Action with Qualifiers,
         * it also accepts a Qualifier called Region.
         *
         * This Qualifier is in itself composite of qualifiers (such as height, or width).
         * The existence of Region changes the output of Blur in non traditional ways
         * which forced this relatively ad-hoc implementation.
         *
         * Aside from all of that, all of the Qualifiers in the component should be alphabetized
         * This happens naturally in the Action class,
         * however since we're dealing with two levels of qualifiers (Blur and Region),
         * these need to be merged.
         *
         * This function will merge the Region qualifiers with Blur
         * and add all needed implicit qualifiers (like g_ocr_text).
         * We're not using the full Gravity Qualifier here to prevent the code import for such a simplistic case
         */
        const strength = this._strength ? `:${this._strength}` : '';
        if ('_region' in this) {
            const qualifiers = this._region.qualifiers;
            // Copy qualifiers from the region "action" to the blur action
            qualifiers.forEach((q) => this.addQualifier(q));
            if (this._region.regionType === 'custom') {
                this.addQualifier(new Qualifier.Qualifier('e', `blur_region${strength}`));
            }
            if (this._region.regionType === 'ocr_text') {
                this.addQualifier(new Qualifier.Qualifier('e', `blur_region${strength}`));
                this.addQualifier(new Qualifier.Qualifier('g', `ocr_text`));
            }
            if (this._region.regionType === 'faces') {
                this.addQualifier(new Qualifier.Qualifier('e', `blur_faces${strength}`));
            }
        }
        else {
            this.addQualifier(new Qualifier.Qualifier('e', `blur${strength}`));
        }
    }
    static fromJson(actionModel) {
        const { strength, region: region$1 } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(strength);
        strength && result.strength(strength);
        if (region$1 && region$1.regionType === 'faces') {
            result.region(region.faces());
        }
        if (region$1 && region$1.regionType === 'ocr_text') {
            result.region(region.ocr());
        }
        if (region$1 && region$1.regionType === 'custom') {
            result.region(region.CustomRegion.fromJson(region$1));
        }
        return result;
    }
}

exports.BlurAction = BlurAction;
