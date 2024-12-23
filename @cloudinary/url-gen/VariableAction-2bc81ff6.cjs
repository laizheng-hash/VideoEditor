'use strict';

var Action = require('./Action-0ed405c1.cjs');
var QualifierValue = require('./QualifierValue-e770d619.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description Defines an new user variable.
 * @memberOf Actions.Variable
 * @extends SDK.Action
 * @see Visit {@link Actions.Variable|Variable} for an example
 */
class VariableAction extends Action.Action {
    constructor(name, value) {
        super();
        this.isFloat = false;
        this.isNumber = false;
        this.value = value;
        this.name = name;
    }
    /**
     * @description Converts the returned value to type float.
     */
    asFloat() {
        this.isFloat = true;
        return this;
    }
    /**
     * @description Converts the returned value to type number.
     */
    asInteger() {
        this.isNumber = true;
        return this;
    }
    prepareQualifiers() {
        let qualifierValue;
        if (this.isFloat) {
            qualifierValue = new QualifierValue.QualifierValue([this.value, 'to_f']).setDelimiter('_');
        }
        else if (this.isNumber) {
            qualifierValue = new QualifierValue.QualifierValue([this.value, 'to_i']).setDelimiter('_');
        }
        else {
            qualifierValue = new QualifierValue.QualifierValue(this.value);
        }
        this.addQualifier(new Qualifier.Qualifier(`$${this.name}`, qualifierValue));
        return this;
    }
}
var VariableAction$1 = VariableAction;

exports.VariableAction = VariableAction$1;
