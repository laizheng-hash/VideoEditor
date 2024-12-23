'use strict';

var VariableAction = require('./VariableAction-2bc81ff6.cjs');

/**
 * @description Sets a user-defined variable from structured metadata.
 * @memberOf Actions.Variable
 * @extends {Variable.VariableAction}
 * @see Visit {@link Actions.Variable|Variable} for an example
 */
class SetFromMetadataAction extends VariableAction.VariableAction {
    constructor(name, value) {
        // Required due to https://github.com/microsoft/TypeScript/issues/13029
        /* istanbul ignore next */
        super(name, `md:!${value}!`);
    }
}
var SetFromMetadataAction$1 = SetFromMetadataAction;

exports.SetFromMetadataAction = SetFromMetadataAction$1;
