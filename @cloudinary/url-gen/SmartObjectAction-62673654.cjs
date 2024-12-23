'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');

/**
 * @description Represents an embedded smart object in a Photoshop document.
 * </br><b>Learn more:</b> {@link https://cloudinary.com/documentation/paged_and_layered_media#extract_the_original_content_of_an_embedded_object|Extract the original content of an embedded Photoshop object}
 * @extends SDK.Action
 * @memberOf Actions.PSDTools
 * @see Visit {@link Actions.PSDTools| PSDTools} for an example
 */
class SmartObjectAction extends Action.Action {
    constructor() {
        super();
        this.qualifierValue = new QualifierValue.QualifierValue();
        this.useName = false;
        this.qualifierValue.delimiter = ';';
    }
    /**
     * @description Creates a new instance using the specified number.
     * @param index The number.
     */
    byIndex(index) {
        this.smartObjectValue = index;
        this.qualifierValue.addValue(index);
        return this;
    }
    /**
     * @description Creates an instance using the name.
     * @param {string} layerName The name of the layer
     */
    byLayerName(layerName) {
        this.useName = true;
        this.qualifierValue.addValue(layerName);
        return this;
    }
    prepareQualifiers() {
        let qualifierValue;
        if (this.useName) {
            qualifierValue = new QualifierValue.QualifierValue(['embedded:name', this.qualifierValue]);
        }
        else {
            qualifierValue = new QualifierValue.QualifierValue(['embedded', this.qualifierValue]);
        }
        this.addQualifier(new Qualifier.Qualifier('pg', qualifierValue));
    }
}

exports.SmartObjectAction = SmartObjectAction;
