'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');

/**
 * @description Represents a layer in a Photoshop document.
 * </br><b>Learn more:</b> {@link https://cloudinary.com/documentation/paged_and_layered_media#deliver_selected_layers_of_a_psd_image|Deliver selected layers of a PSD image}
 * @extends SDK.Action
 * @memberOf Actions.PSDTools
 * @see Visit {@link Actions.PSDTools| PSDTools} for an example
 */
class GetLayerAction extends Action.Action {
    constructor() {
        super();
        this.qualifierValue = new QualifierValue.QualifierValue();
        this.qualifierValue.delimiter = ';';
    }
    /**
     * @description deliver an image containing only specified layer of a Photoshop image from The layer index
     * @param {string|number} from the index of the layer
     */
    byIndex(from) {
        this.qualifierValue.addValue(from);
        return this;
    }
    /**
     * @description deliver an image containing only specified range of layers of a Photoshop image
     * @param {string|number} from The layer number
     * @param {string|number} to The layer number
     */
    byRange(from, to) {
        const range = new QualifierValue.QualifierValue(from);
        range.addValue(to);
        range.delimiter = '-';
        this.qualifierValue.addValue(range);
        return this;
    }
    /**
     * @description deliver an image containing only specified layer by name of a Photoshop image
     * @param {string|number} name The layer by name
     */
    byName(name) {
        this.name = name;
        this.qualifierValue.addValue(name);
        return this;
    }
    prepareQualifiers() {
        let qualifierValue = this.qualifierValue;
        if (this.name) {
            qualifierValue = new QualifierValue.QualifierValue(['name', this.qualifierValue]).setDelimiter(':');
        }
        this.addQualifier(new Qualifier.Qualifier('pg', qualifierValue));
        return this;
    }
}

exports.GetLayerAction = GetLayerAction;