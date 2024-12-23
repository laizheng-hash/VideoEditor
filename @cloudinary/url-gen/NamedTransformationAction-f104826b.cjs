'use strict';

var Action = require('./Action-0ed405c1.cjs');
var Qualifier = require('./Qualifier-6633a22f.cjs');

/**
 * @description Applies a pre-defined named transformation of the given name, used with a builder from {@link Actions.NamedTransformation|Named Transformation}
 * @extends SDK.Action
 * @memberOf Actions.NamedTransformation
 * @see Visit {@link Actions.NamedTransformation|Named Transformation} for an example
 */
class NamedTransformationAction extends Action.Action {
    /**
     *
     * @param {string} name The name of the named transformation
     */
    constructor(name) {
        super();
        this.addQualifier(new Qualifier.Qualifier('t', name));
    }
}

exports.NamedTransformationAction = NamedTransformationAction;
