'use strict';

var Action = require('./Action-0ed405c1.cjs');
var VariableAction = require('./VariableAction-2bc81ff6.cjs');

/**
 * @description Sets a user-defined variable.
 * @memberOf Actions.Variable
 * @extends Variable.VariableAction
 * @see Visit {@link Actions.Variable|Variable} for an example
 */
class SetAction extends VariableAction.VariableAction {
    constructor(name, value, wrapper = '!') {
        let finalValue;
        const parsedValue = Array.isArray(value) ? value.join(':') : value;
        if (Action.isString(parsedValue)) {
            /*
             * Encoding needed to make the Variable value Cloudinary Safe
             * If a string, we also determine what wrapper is used (wrapper variable)
             * The wrapper variable is needed because floats are passed as strings ('1.0') - in those case
             * we don't need to treat them as URL strings ($foo_!1.0!), but instead as foo_1.0
             */
            finalValue = `${wrapper}${parsedValue
                .replace(/,/g, '%2C')
                .replace(/\//g, '%2F')
                .replace(/!/g, '%21')}${wrapper}`;
        }
        else {
            finalValue = parsedValue;
        }
        // Required due to https://github.com/microsoft/TypeScript/issues/13029
        /* istanbul ignore next */
        super(name, finalValue);
    }
}
var SetAction$1 = SetAction;

exports.SetAction = SetAction$1;
