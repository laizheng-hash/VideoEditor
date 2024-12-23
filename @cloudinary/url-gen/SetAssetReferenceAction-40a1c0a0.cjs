'use strict';

var VariableAction = require('./VariableAction-2bc81ff6.cjs');

/**
 * @description Sets a user-defined variable from a file reference.
 * @memberOf Actions.Variable
 * @extends {Variable.VariableAction}
 * @see Visit {@link Actions.Variable|Variable} for an example
 */
class SetAssetReferenceAction extends VariableAction.VariableAction {
    constructor(name, value) {
        // Required due to https://github.com/microsoft/TypeScript/issues/13029
        /* istanbul ignore next */
        const parsedValue = value
            .replace(/\//g, ':');
        super(name, `ref:!${parsedValue}!`);
    }
}
var SetAssetReferenceAction$1 = SetAssetReferenceAction;

exports.SetAssetReferenceAction = SetAssetReferenceAction$1;
