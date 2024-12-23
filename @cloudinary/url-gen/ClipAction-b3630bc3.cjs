'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var flag = require('./flag-31bc1b8c.cjs');

/**
 * @description  Defines the clipping path to use when trimming pixels.
 * @extends SDK.Action
 * @memberOf Actions.PSDTools
 * @see Visit {@link Actions.PSDTools| PSDTools} for an example
 */
class ClipAction extends Action.Action {
    constructor() {
        super();
        this.isEvenOdd = false;
    }
    /**
     * @description The name of the path to clip by
     * @param {string} path
     * @return {this}
     */
    byName(path) {
        this.path = path;
        return this;
    }
    /**
     * @description The index of the path to clip by
     * @param {number} path
     * @return {this}
     */
    byIndex(path) {
        this.path = path;
        return this;
    }
    /**
     * @description Trims pixels according to a clipping path included in the original image using an evenodd clipping rule.
     * @return {this}
     */
    evenOdd() {
        this.isEvenOdd = true;
        return this;
    }
    prepareQualifiers() {
        let qualifierValue;
        if (typeof this.path === 'string') {
            qualifierValue = new QualifierValue.QualifierValue(['name', this.path]).setDelimiter(':');
        }
        else {
            qualifierValue = new QualifierValue.QualifierValue(this.path);
        }
        //handles flag
        if (this.isEvenOdd) {
            this.addFlag(flag.clipEvenOdd());
        }
        else {
            this.addFlag(flag.clip());
        }
        this.addQualifier(new Qualifier.Qualifier('pg', qualifierValue));
        return this;
    }
}

exports.ClipAction = ClipAction;
