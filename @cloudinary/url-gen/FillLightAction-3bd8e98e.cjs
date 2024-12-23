'use strict';

var Action = require('./Action-0ed405c1.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description Adjusts the fill light and blends the result with the original image.
 * @memberOf Actions.Adjust
 * @extends SDK.Action
 */
class FillLightAction extends Action.Action {
    constructor() {
        super();
    }
    /**
     * @description Sets the level of adjustment
     * @param {number} lvl How much to blend the adjusted fill light, where 0 means only use the original and 100 means only use the adjusted fill light result. (Range: 0 to 100, Server default: 100)
     */
    blend(blend) {
        this.lvl = blend;
        return this;
    }
    /**
     * @description Sets the level of the bias
     * @param {number} biasLvl The bias to apply to the fill light effect (Range: -100 to 100, Server default: 0).
     */
    bias(biasLvl) {
        this.biasLvl = biasLvl;
        return this;
    }
    prepareQualifiers() {
        const qualifierValue = new QualifierValue.QualifierValue(['fill_light', this.lvl, this.biasLvl]).setDelimiter(':');
        this.addQualifier(new Qualifier.Qualifier('e', qualifierValue));
        return this;
    }
}

exports.FillLightAction = FillLightAction;
