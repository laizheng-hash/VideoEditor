'use strict';

var tslib_es6 = require('../../tslib.es6-7a681263.cjs');
var actions_variable_VariableAction = require('./VariableAction.cjs');
require('../../internal/Action.cjs');
require('../../qualifiers/flag/FlagQualifier.cjs');
require('../../internal/qualifier/QualifierValue.cjs');
require('../../internal/qualifier/Qualifier.cjs');
require('../../internal/models/QualifierModel.cjs');
require('../../internal/models/qualifierToJson.cjs');
require('../../internal/utils/unsupportedError.cjs');
require('../../internal/utils/dataStructureUtils.cjs');
require('../../internal/models/ActionModel.cjs');
require('../../internal/models/actionToJson.cjs');

/**
 * @description Sets a user-defined variable from structured metadata.
 * @memberOf Actions.Variable
 * @extends {Variable.VariableAction}
 * @see Visit {@link Actions.Variable|Variable} for an example
 */
var SetFromMetadataAction = /** @class */ (function (_super) {
    tslib_es6.__extends(SetFromMetadataAction, _super);
    function SetFromMetadataAction(name, value) {
        // Required due to https://github.com/microsoft/TypeScript/issues/13029
        /* istanbul ignore next */
        return _super.call(this, name, "md:!" + value + "!") || this;
    }
    return SetFromMetadataAction;
}(actions_variable_VariableAction));

module.exports = SetFromMetadataAction;
