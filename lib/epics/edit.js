import "core-js/modules/es.date.to-string";
import "core-js/modules/es.number.constructor";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _join from "ramda/src/join";
import _without from "ramda/src/without";
import _map from "ramda/src/map";
import _pathOr from "ramda/src/pathOr";
import _pipe from "ramda/src/pipe";
import _append from "ramda/src/append";
import _isEmpty from "ramda/src/isEmpty";
import _isNil from "ramda/src/isNil";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _omit from "ramda/src/omit";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _filter from "ramda/src/filter";
import _pick from "ramda/src/pick";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _path from "ramda/src/path";
import _prop from "ramda/src/prop";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { ofType } from 'redux-observable';
import { concat } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import * as Actions from '../actions';
import { DETAIL_ATTRIBUTE_EDIT_SUBMIT, DETAIL_TABLE_EDIT_SUBMIT, DETAIL_TABLE_REMOVE_SUBMIT, INDEX_EDIT_SUBMIT, INLINE_FILE_DELETE, INLINE_FILE_SUBMIT, DELETE_FILE } from '../actionConsts';
import * as Logger from '../utils/Logger';
import { editFieldToQueryInput, isValidationError, prepValidationErrors, getEditMutationInputVariables, getDeleteErrors, fileSubmitToBlob } from '../utils/helpers';
import { Epic } from './epic';
export var EditEpic = /*#__PURE__*/function (_Epic) {
  _inherits(EditEpic, _Epic);

  var _super = _createSuper(EditEpic);

  function EditEpic() {
    _classCallCheck(this, EditEpic);

    return _super.apply(this, arguments);
  }

  _createClass(EditEpic, [{
    key: DETAIL_ATTRIBUTE_EDIT_SUBMIT,
    value: function value(action$, state$) {
      var _this = this;

      return action$.pipe(ofType(DETAIL_ATTRIBUTE_EDIT_SUBMIT), map(_prop('payload')), map(function (payload) {
        var modelName = _prop('modelName', payload);

        var fieldName = _prop('fieldName', payload);

        var id = _prop('id', payload);

        var value = _path(['value', 'conveyor', 'edit', modelName, id, fieldName, 'currentValue'], state$);

        var inputValue = editFieldToQueryInput({
          schema: _this.schema,
          modelName: modelName,
          fieldName: fieldName,
          value: value
        });
        var variables = {
          id: id,
          input: _defineProperty({}, fieldName, inputValue)
        };

        var query = _this.queryBuilder.buildQuery({
          modelName: modelName,
          queryType: 'update'
        });

        return {
          id: id,
          modelName: modelName,
          variables: variables,
          query: query,
          fieldName: fieldName
        };
      }), mergeMap(function (context) {
        return _this.queryBuilder.sendRequest({
          query: context.query,
          variables: context.variables
        }).then(function (_ref) {
          var error = _ref.error;
          return {
            context: context,
            error: error
          };
        });
      }), switchMap(function (_ref2) {
        var context = _ref2.context,
            error = _ref2.error;

        if (error) {
          Logger.epicError('detailAttributeEditSubmitEpic', context, error);
          var actions = [];

          if (isValidationError(error.response)) {
            var errors = prepValidationErrors({
              schema: _this.schema,
              context: context,
              error: error
            });
            actions.push(Actions.onValidationErrorEdit({
              modelName: context.modelName,
              id: context.id,
              fieldName: context.fieldName,
              errors: errors
            }));
          }

          actions.push(Actions.addDangerAlert({
            message: 'Error submitting edit.'
          }));
          return concat(actions);
        }

        return concat([Actions.onAttributeEditCancel(_pick(['modelName', 'id', 'fieldName'], context)), Actions.fetchModelDetail({
          modelName: context.modelName,
          id: context.id
        })]);
      }));
    }
  }, {
    key: DETAIL_TABLE_EDIT_SUBMIT,
    value: function value(action$) {
      var _this2 = this;

      return action$.pipe(ofType(DETAIL_TABLE_EDIT_SUBMIT), map(_prop('payload')), map(function (payload) {
        var modelName = _prop('modelName', payload);

        var parentModelName = _prop('parentModelName', payload);

        var parentId = _prop('parentId', payload);

        var id = _prop('id', payload);

        var node = _prop('changedFields', payload);

        var imageFields = _filter(function (obj) {
          return _this2.schema.isFile(modelName, _prop('fieldName', obj));
        }, _this2.schema.getFields(modelName));

        var imageFieldsList = _Object$keys(imageFields);

        var input = getEditMutationInputVariables({
          schema: _this2.schema,
          modelName: modelName,
          node: node
        });

        var normalInput = _omit(imageFieldsList, input);

        var variables = {
          id: id,
          input: _Object$assign({}, normalInput)
        };

        var query = _this2.queryBuilder.buildQuery({
          modelName: modelName,
          queryType: 'update'
        });

        return {
          id: id,
          modelName: modelName,
          variables: variables,
          query: query,
          parentModelName: parentModelName,
          parentId: parentId,
          inputWithFile: _filter(function (n) {
            return !_isNil(n);
          }, _pick(imageFieldsList, input))
        };
      }), mergeMap(function (context) {
        return _this2.queryBuilder.sendRequest({
          query: context.query,
          variables: context.variables
        }).then(function (_ref3) {
          var data = _ref3.data,
              error = _ref3.error;
          return {
            context: context,
            data: data,
            error: error
          };
        });
      }), switchMap(function (_ref4) {
        var context = _ref4.context,
            data = _ref4.data,
            error = _ref4.error;

        if (error) {
          Logger.epicError('detailTableEditSubmitEpic', context, error);
          var _actions = [];

          if (isValidationError(error.response)) {
            var errors = prepValidationErrors({
              schema: _this2.schema,
              context: context,
              error: error
            });

            _actions.push(Actions.onValidationErrorTableRow({
              modelName: context.modelName,
              id: context.id,
              errors: errors
            }));
          }

          _actions.push(Actions.addDangerAlert({
            message: 'Error submitting edit.'
          }));

          return concat(_actions);
        }

        var actions = [Actions.onTableEditCancel(_pick(['modelName', 'id'], context))]; // images exist

        if (!_isEmpty(_prop('inputWithFile', context))) {
          var path = ['update' + context.modelName, 'result', 'id'];
          actions = _append(Actions.onInlineFileSubmit({
            modelName: context.modelName,
            id: _path(path, data),
            fileData: context.inputWithFile,
            parentModelName: context.parentModelName,
            parentId: context.parentId
          }), actions);
        } else {
          // fetchModelDetail called in inlineFileSubmit; otherwise append it here:
          actions = _append(Actions.fetchModelDetail({
            modelName: context.parentModelName,
            id: context.parentId
          }), actions);
        }

        return concat(actions);
      }));
    } // removed m2m relationship from object => alternative to deleting

    /* WARNING: only to be used with ManyToMany object. A 'remove' operation on a OneToMany relationship
    whose backref is non-nullable will cascade a delete operation => child object may be 'deleted'
    from db instead of being 'removed', without sqlalchemy warning * */

  }, {
    key: DETAIL_TABLE_REMOVE_SUBMIT,
    value: function value(action$, state$) {
      var _this3 = this;

      return action$.pipe(ofType(DETAIL_TABLE_REMOVE_SUBMIT), map(_prop('payload')), map(function (payload) {
        var _payload = _Object$assign({}, payload),
            modelName = _payload.modelName,
            fieldName = _payload.fieldName,
            id = _payload.id,
            removedId = _payload.removedId;

        var query = _this3.queryBuilder.buildQuery({
          modelName: modelName,
          queryType: 'update'
        });

        var updatedFieldList = _pipe(_pathOr([], ['value', 'conveyor', 'model', modelName, 'values', id, fieldName]), _map(function (obj) {
          return obj.id;
        }), _without([removedId]))(state$);

        var variables = {
          id: Number(id),
          input: _defineProperty({}, fieldName, updatedFieldList)
        };
        return _Object$assign({}, payload, {
          query: query,
          variables: variables
        });
      }), mergeMap(function (context) {
        return _this3.queryBuilder.sendRequest({
          query: context.query,
          variables: context.variables
        }).then(function (_ref5) {
          var data = _ref5.data,
              error = _ref5.error;
          return {
            context: context,
            data: data,
            error: error
          };
        });
      }), switchMap(function (_ref6) {
        var _context2;

        var context = _ref6.context,
            data = _ref6.data,
            error = _ref6.error;

        // todo: 'schema.getModelLabel' needs 'node'/ 'data'/ 'customProps' props
        // @ts-ignore
        var displayName = _this3.schema.getModelLabel({
          modelName: context.modelName
        }); // todo: 'schema.getFieldLabel' needs 'node'/'data'/ 'customProps' props


        var fieldLabel = _this3.schema.getFieldLabel({
          modelName: context.modelName,
          fieldName: context.fieldName
        }); // get errors from context


        var errors = getDeleteErrors({
          data: data,
          context: context
        });

        if (errors) {
          var _context;

          Logger.epicError('detailTableRemoveSubmitEpic', context, error);

          var contactErrors = _join('. ', errors);

          return concat([Actions.addDangerAlert({
            message: _concatInstanceProperty(_context = "Error removing ".concat(fieldLabel, ". ")).call(_context, contactErrors)
          })]);
        }

        if (error) {
          Logger.epicError('detailTableRemoveSubmitEpic', context, error);
          return Actions.addDangerAlert({
            message: "Error removing ".concat(fieldLabel, ".")
          });
        }

        return concat([Actions.fetchModelDetail({
          modelName: context.modelName,
          id: context.id
        }), Actions.addSuccessAlert({
          message: _concatInstanceProperty(_context2 = "\"".concat(fieldLabel, "\" object was successfully removed from \"")).call(_context2, displayName, "\".")
        })]);
      }));
    }
  }, {
    key: INDEX_EDIT_SUBMIT,
    value: function value(action$) {
      var _this4 = this;

      return action$.pipe(ofType(INDEX_EDIT_SUBMIT), map(_prop('payload')), map(function (payload) {
        var modelName = _prop('modelName', payload);

        var id = _prop('id', payload);

        var node = _prop('changedFields', payload);

        var input = getEditMutationInputVariables({
          schema: _this4.schema,
          modelName: modelName,
          node: node
        });
        var variables = {
          id: id,
          input: _Object$assign({}, input)
        };

        var query = _this4.queryBuilder.buildQuery({
          modelName: modelName,
          queryType: 'update'
        });

        return {
          id: id,
          modelName: modelName,
          variables: variables,
          query: query
        };
      }), mergeMap(function (context) {
        return _this4.queryBuilder.sendRequest({
          query: context.query,
          variables: context.variables
        }).then(function (_ref7) {
          var error = _ref7.error;
          return {
            context: context,
            error: error
          };
        });
      }), switchMap(function (_ref8) {
        var context = _ref8.context,
            error = _ref8.error;

        if (error) {
          Logger.epicError('indexEditSubmitEpic', context, error);
          var actions = [];

          if (isValidationError(error.response)) {
            var errors = prepValidationErrors({
              schema: _this4.schema,
              context: context,
              error: error
            });
            actions.push(Actions.onValidationErrorTableRow({
              modelName: context.modelName,
              id: context.id,
              errors: errors
            }));
          }

          actions.push(Actions.addDangerAlert({
            message: 'Error submitting edit.'
          }));
          return concat(actions);
        }

        return concat([Actions.onTableEditCancel(_pick(['modelName', 'id'], context)), Actions.fetchModelIndex({
          modelName: context.modelName
        })]);
      }));
    }
  }, {
    key: INLINE_FILE_DELETE,
    value: function value(action$) {
      var _this5 = this;

      return action$.pipe(ofType(INLINE_FILE_DELETE), map(_prop('payload')), map(function (payload) {
        var fieldName = _prop('fieldName', payload);

        var modelName = _prop('modelName', payload);

        var id = _prop('id', payload);

        return {
          query: _this5.queryBuilder.buildQuery({
            modelName: modelName,
            queryType: 'update'
          }),
          id: id,
          modelName: modelName,
          variables: {
            input: _defineProperty({}, fieldName, DELETE_FILE),
            id: id
          }
        };
      }), mergeMap(function (context) {
        return _this5.queryBuilder.sendRequest({
          query: context.query,
          variables: context.variables
        }).then(function (_ref9) {
          var error = _ref9.error;
          return {
            context: context,
            error: error
          };
        });
      }), switchMap(function (_ref10) {
        var context = _ref10.context,
            error = _ref10.error;

        if (error) {
          Logger.epicError('inlineFileDeleteEpic', context, error);
          return concat([Actions.addDangerAlert({
            message: 'Error deleting file.'
          })]);
        }

        return concat([Actions.fetchModelDetail({
          modelName: context.modelName,
          id: context.id
        }), Actions.addSuccessAlert({
          message: 'Successfully deleted file.'
        })]);
      }));
    }
  }, {
    key: INLINE_FILE_SUBMIT,
    value: function value(action$, state$) {
      var _this6 = this;

      return action$.pipe(ofType(INLINE_FILE_SUBMIT), map(_prop('payload')), map(function (payload) {
        var modelName = _prop('modelName', payload);

        var fieldName = _prop('fieldName', payload);

        var id = _prop('id', payload);

        return _Object$assign({
          formData: fileSubmitToBlob({
            payload: payload,
            query: _this6.queryBuilder.buildQuery({
              modelName: modelName,
              queryType: 'update'
            }),
            value: _path(['value', 'conveyor', 'edit', modelName, id, fieldName, 'currentValue'], state$)
          }),
          modelName: modelName,
          fieldName: fieldName,
          id: id
        }, payload);
      }), mergeMap(function (context) {
        return _this6.queryBuilder.sendRequest({
          formData: context.formData
        }).then(function (_ref11) {
          var error = _ref11.error;
          return {
            context: context,
            error: error
          };
        });
      }), switchMap(function (_ref12) {
        var context = _ref12.context,
            error = _ref12.error;

        if (error) {
          Logger.epicError('inlineFileSubmitEpic', context, error);
          return concat([Actions.addDangerAlert({
            message: "Could not save Image for ".concat(context.modelName, ".")
          })]);
        }

        var actions = [Actions.onAttributeEditCancel({
          modelName: context.modelName,
          fieldName: context.fieldName,
          id: context.id
        }), Actions.fetchModelDetail({
          modelName: context.modelName,
          id: context.id
        })];

        var parentModelName = _prop('parentModelName', context);

        var parentId = _prop('parentId', context); // if comes from detail table:


        if (parentModelName && parentId) {
          actions = _append(Actions.fetchModelDetail({
            modelName: parentModelName,
            id: parentId
          }), actions);
        }

        if (_prop('fromCreate', context)) {
          // comes from create page
          actions = _append(Actions.onSaveCreateSuccessful({}), actions);
        }

        return concat(actions);
      }));
    }
  }]);

  return EditEpic;
}(Epic);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy9lZGl0LnRzIl0sIm5hbWVzIjpbIm9mVHlwZSIsImNvbmNhdCIsIm1hcCIsIm1lcmdlTWFwIiwic3dpdGNoTWFwIiwiQWN0aW9ucyIsIkRFVEFJTF9BVFRSSUJVVEVfRURJVF9TVUJNSVQiLCJERVRBSUxfVEFCTEVfRURJVF9TVUJNSVQiLCJERVRBSUxfVEFCTEVfUkVNT1ZFX1NVQk1JVCIsIklOREVYX0VESVRfU1VCTUlUIiwiSU5MSU5FX0ZJTEVfREVMRVRFIiwiSU5MSU5FX0ZJTEVfU1VCTUlUIiwiREVMRVRFX0ZJTEUiLCJMb2dnZXIiLCJlZGl0RmllbGRUb1F1ZXJ5SW5wdXQiLCJpc1ZhbGlkYXRpb25FcnJvciIsInByZXBWYWxpZGF0aW9uRXJyb3JzIiwiZ2V0RWRpdE11dGF0aW9uSW5wdXRWYXJpYWJsZXMiLCJnZXREZWxldGVFcnJvcnMiLCJmaWxlU3VibWl0VG9CbG9iIiwiRXBpYyIsIkVkaXRFcGljIiwiYWN0aW9uJCIsInN0YXRlJCIsInBpcGUiLCJwYXlsb2FkIiwibW9kZWxOYW1lIiwiZmllbGROYW1lIiwiaWQiLCJ2YWx1ZSIsImlucHV0VmFsdWUiLCJzY2hlbWEiLCJ2YXJpYWJsZXMiLCJpbnB1dCIsInF1ZXJ5IiwicXVlcnlCdWlsZGVyIiwiYnVpbGRRdWVyeSIsInF1ZXJ5VHlwZSIsImNvbnRleHQiLCJzZW5kUmVxdWVzdCIsInRoZW4iLCJlcnJvciIsImVwaWNFcnJvciIsImFjdGlvbnMiLCJyZXNwb25zZSIsImVycm9ycyIsInB1c2giLCJvblZhbGlkYXRpb25FcnJvckVkaXQiLCJhZGREYW5nZXJBbGVydCIsIm1lc3NhZ2UiLCJvbkF0dHJpYnV0ZUVkaXRDYW5jZWwiLCJmZXRjaE1vZGVsRGV0YWlsIiwicGFyZW50TW9kZWxOYW1lIiwicGFyZW50SWQiLCJub2RlIiwiaW1hZ2VGaWVsZHMiLCJvYmoiLCJpc0ZpbGUiLCJnZXRGaWVsZHMiLCJpbWFnZUZpZWxkc0xpc3QiLCJub3JtYWxJbnB1dCIsImlucHV0V2l0aEZpbGUiLCJuIiwiZGF0YSIsIm9uVmFsaWRhdGlvbkVycm9yVGFibGVSb3ciLCJvblRhYmxlRWRpdENhbmNlbCIsInBhdGgiLCJvbklubGluZUZpbGVTdWJtaXQiLCJmaWxlRGF0YSIsInJlbW92ZWRJZCIsInVwZGF0ZWRGaWVsZExpc3QiLCJOdW1iZXIiLCJkaXNwbGF5TmFtZSIsImdldE1vZGVsTGFiZWwiLCJmaWVsZExhYmVsIiwiZ2V0RmllbGRMYWJlbCIsImNvbnRhY3RFcnJvcnMiLCJhZGRTdWNjZXNzQWxlcnQiLCJmZXRjaE1vZGVsSW5kZXgiLCJmb3JtRGF0YSIsIm9uU2F2ZUNyZWF0ZVN1Y2Nlc3NmdWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsTUFBVCxRQUF1QixrQkFBdkI7QUFDQSxTQUFTQyxNQUFULFFBQXVCLE1BQXZCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxRQUFkLEVBQXdCQyxTQUF4QixRQUF5QyxnQkFBekM7QUFFQSxPQUFPLEtBQUtDLE9BQVosTUFBeUIsWUFBekI7QUFDQSxTQUNFQyw0QkFERixFQUVFQyx3QkFGRixFQUdFQywwQkFIRixFQUlFQyxpQkFKRixFQUtFQyxrQkFMRixFQU1FQyxrQkFORixFQU9FQyxXQVBGLFFBUU8saUJBUlA7QUFTQSxPQUFPLEtBQUtDLE1BQVosTUFBd0IsaUJBQXhCO0FBQ0EsU0FDRUMscUJBREYsRUFFRUMsaUJBRkYsRUFHRUMsb0JBSEYsRUFJRUMsNkJBSkYsRUFLRUMsZUFMRixFQU1FQyxnQkFORixRQU9PLGtCQVBQO0FBUUEsU0FBU0MsSUFBVCxRQUFxQixRQUFyQjtBQUVBLFdBQWFDLFFBQWI7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQSxTQUNHZiw0QkFESDtBQUFBLDBCQUNpQ2dCLE9BRGpDLEVBQytDQyxNQUQvQyxFQUM0RDtBQUFBOztBQUN4RCxhQUFPRCxPQUFPLENBQUNFLElBQVIsQ0FDTHhCLE1BQU0sQ0FBQ00sNEJB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REk7QUFFdkJFLFVBQUFBLEVBQUUsRUFBRVUsT0FBTyxDQUFDVjtBQUZXLFNBQXpCLENBTlksQ0FBZDs7QUFXQSxZQUFNd0IsZUFBZSxHQUFHLE1BQU8saUJBQVAsRUFBMEJkLE9BQTFCLENBQXhCOztBQUNBLFlBQU1lLFFBQVEsR0FBRyxNQUFPLFVBQVAsRUFBbUJmLE9BQW5CLENBQWpCLENBckJnQyxDQXNCaEM7OztBQUNBLFlBQUljLGVBQWUsSUFBSUMsUUFBdkIsRUFBaUM7QUFDL0JWLFVBQUFBLE9BQU8sR0FBRyxRQUNSdEMsT0FBTyxDQUFDOEMsZ0JBQVIsQ0FBeUI7QUFDdkJ6QixZQUFBQSxTQUFTLEVBQUUwQixlQURZO0FBRXZCeEIsWUFBQUEsRUFBRSxFQUFFeUI7QUFGbUIsV0FBekIsQ0FEUSxFQUtSVixPQUxRLENBQVY7QUFPRDs7QUFDRCxZQUFJLE1BQU8sWUFBUCxFQUFxQkwsT0FBckIsQ0FBSixFQUFtQztBQUNqQztBQUNBSyxVQUFBQSxPQUFPLEdBQUcsUUFBU3RDLE9BQU8sQ0FBQzJFLHNCQUFSLENBQStCLEVBQS9CLENBQVQsRUFBNkNyQyxPQUE3QyxDQUFWO0FBQ0Q7O0FBQ0QsZUFBTzFDLE1BQU0sQ0FBQzBDLE9BQUQsQ0FBYjtBQUNELE9BckNRLENBeENKLENBQVA7QUErRUQ7QUFwZEg7O0FBQUE7QUFBQSxFQUE4QnZCLElBQTlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZSdcbmltcG9ydCB7IGNvbmNhdCB9IGZyb20gJ3J4anMnXG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMnXG5pbXBvcnQge1xuICBERVRBSUxfQVRUUklCVVRFX0VESVRfU1VCTUlULFxuICBERVRBSUxfVEFCTEVfRURJVF9TVUJNSVQsXG4gIERFVEFJTF9UQUJMRV9SRU1PVkVfU1VCTUlULFxuICBJTkRFWF9FRElUX1NVQk1JVCxcbiAgSU5MSU5FX0ZJTEVfREVMRVRFLFxuICBJTkxJTkVfRklMRV9TVUJNSVQsXG4gIERFTEVURV9GSUxFXG59IGZyb20gJy4uL2FjdGlvbkNvbnN0cydcbmltcG9ydCAqIGFzIExvZ2dlciBmcm9tICcuLi91dGlscy9Mb2dnZXInXG5pbXBvcnQge1xuICBlZGl0RmllbGRUb1F1ZXJ5SW5wdXQsXG4gIGlzVmFsaWRhdGlvbkVycm9yLFxuICBwcmVwVmFsaWRhdGlvbkVycm9ycyxcbiAgZ2V0RWRpdE11dGF0aW9uSW5wdXRWYXJpYWJsZXMsXG4gIGdldERlbGV0ZUVycm9ycyxcbiAgZmlsZVN1Ym1pdFRvQmxvYlxufSBmcm9tICcuLi91dGlscy9oZWxwZXJzJ1xuaW1wb3J0IHsgRXBpYyB9IGZyb20gJy4vZXBpYydcblxuZXhwb3J0IGNsYXNzIEVkaXRFcGljIGV4dGVuZHMgRXBpYyB7XG4gIFtERVRBSUxfQVRUUklCVVRFX0VESVRfU1VCTUlUXShhY3Rpb24kOiBhbnksIHN0YXRlJDogYW55KSB7XG4gICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShERVRBSUxfQVRUUklCVVRFX0VESVRfU1VCTUlUKSxcbiAgICAgIG1hcChSLnByb3AoJ3BheWxvYWQnKSksXG4gICAgICBtYXAoKHBheWxvYWQ6IEVwaWNQYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsTmFtZSA9IFIucHJvcCgnbW9kZWxOYW1lJywgcGF5bG9hZCkgYXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IFIucHJvcCgnZmllbGROYW1lJywgcGF5bG9hZCkgYXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IGlkID0gUi5wcm9wKCdpZCcsIHBheWxvYWQpIGFzIHN0cmluZ1xuICAgICAgICBjb25zdCB2YWx1ZSA9IFIucGF0aChcbiAgICAgICAgICBbXG4gICAgICAgICAgICAndmFsdWUnLFxuICAgICAgICAgICAgJ2NvbnZleW9yJyxcbiAgICAgICAgICAgICdlZGl0JyxcbiAgICAgICAgICAgIG1vZGVsTmFtZSxcbiAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgZmllbGROYW1lLFxuICAgICAgICAgICAgJ2N1cnJlbnRWYWx1ZSdcbiAgICAgICAgICBdLFxuICAgICAgICAgIHN0YXRlJFxuICAgICAgICApXG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWUgPSBlZGl0RmllbGRUb1F1ZXJ5SW5wdXQoe1xuICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgbW9kZWxOYW1lLFxuICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IGlkLCBpbnB1dDogeyBbZmllbGROYW1lXTogaW5wdXRWYWx1ZSB9IH1cbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5QnVpbGRlci5idWlsZFF1ZXJ5KHtcbiAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgcXVlcnlUeXBlOiAndXBkYXRlJ1xuICAgICAgICB9KVxuXG4gICAgICAgIHJldHVybiB7IGlkLCBtb2RlbE5hbWUsIHZhcmlhYmxlcywgcXVlcnksIGZpZWxkTmFtZSB9XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKChjb250ZXh0OiBhbnkpID0+XG4gICAgICAgIHRoaXMucXVlcnlCdWlsZGVyXG4gICAgICAgICAgLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHF1ZXJ5OiBjb250ZXh0LnF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiBjb250ZXh0LnZhcmlhYmxlc1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHsgZXJyb3IgfSkgPT4gKHsgY29udGV4dCwgZXJyb3IgfSkpXG4gICAgICApLFxuICAgICAgc3dpdGNoTWFwKCh7IGNvbnRleHQsIGVycm9yIH0pID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgTG9nZ2VyLmVwaWNFcnJvcignZGV0YWlsQXR0cmlidXRlRWRpdFN1Ym1pdEVwaWMnLCBjb250ZXh0LCBlcnJvcilcbiAgICAgICAgICBjb25zdCBhY3Rpb25zID0gW11cbiAgICAgICAgICBpZiAoaXNWYWxpZGF0aW9uRXJyb3IoZXJyb3IucmVzcG9uc2UpKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgPSBwcmVwVmFsaWRhdGlvbkVycm9ycyh7XG4gICAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICBBY3Rpb25zLm9uVmFsaWRhdGlvbkVycm9yRWRpdCh7XG4gICAgICAgICAgICAgICAgbW9kZWxOYW1lOiBjb250ZXh0Lm1vZGVsTmFtZSxcbiAgICAgICAgICAgICAgICBpZDogY29udGV4dC5pZCxcbiAgICAgICAgICAgICAgICBmaWVsZE5hbWU6IGNvbnRleHQuZmllbGROYW1lLFxuICAgICAgICAgICAgICAgIGVycm9yc1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhY3Rpb25zLnB1c2goXG4gICAgICAgICAgICBBY3Rpb25zLmFkZERhbmdlckFsZXJ0KHsgbWVzc2FnZTogJ0Vycm9yIHN1Ym1pdHRpbmcgZWRpdC4nIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBjb25jYXQoYWN0aW9ucylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uY2F0KFtcbiAgICAgICAgICBBY3Rpb25zLm9uQXR0cmlidXRlRWRpdENhbmNlbChcbiAgICAgICAgICAgIFIucGljayhbJ21vZGVsTmFtZScsICdpZCcsICdmaWVsZE5hbWUnXSwgY29udGV4dClcbiAgICAgICAgICApLFxuICAgICAgICAgIEFjdGlvbnMuZmV0Y2hNb2RlbERldGFpbCh7XG4gICAgICAgICAgICBtb2RlbE5hbWU6IGNvbnRleHQubW9kZWxOYW1lLFxuICAgICAgICAgICAgaWQ6IGNvbnRleHQuaWRcbiAgICAgICAgICB9KVxuICAgICAgICBdKVxuICAgICAgfSlcbiAgICApXG4gIH1cblxuICBbREVUQUlMX1RBQkxFX0VESVRfU1VCTUlUXShhY3Rpb24kOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKERFVEFJTF9UQUJMRV9FRElUX1NVQk1JVCksXG4gICAgICBtYXAoUi5wcm9wKCdwYXlsb2FkJykpLFxuICAgICAgbWFwKChwYXlsb2FkOiBFcGljUGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbE5hbWUgPSBSLnByb3AoJ21vZGVsTmFtZScsIHBheWxvYWQpIGFzIHN0cmluZ1xuICAgICAgICBjb25zdCBwYXJlbnRNb2RlbE5hbWUgPSBSLnByb3AoJ3BhcmVudE1vZGVsTmFtZScsIHBheWxvYWQpXG4gICAgICAgIGNvbnN0IHBhcmVudElkID0gUi5wcm9wKCdwYXJlbnRJZCcsIHBheWxvYWQpXG4gICAgICAgIGNvbnN0IGlkID0gUi5wcm9wKCdpZCcsIHBheWxvYWQpXG4gICAgICAgIGNvbnN0IG5vZGUgPSBSLnByb3AoJ2NoYW5nZWRGaWVsZHMnLCBwYXlsb2FkKVxuXG4gICAgICAgIGNvbnN0IGltYWdlRmllbGRzID0gUi5maWx0ZXIoXG4gICAgICAgICAgKG9iajogYW55KSA9PiB0aGlzLnNjaGVtYS5pc0ZpbGUobW9kZWxOYW1lLCBSLnByb3AoJ2ZpZWxkTmFtZScsIG9iaikpLFxuICAgICAgICAgIHRoaXMuc2NoZW1hLmdldEZpZWxkcyhtb2RlbE5hbWUpXG4gICAgICAgIClcbiAgICAgICAgY29uc3QgaW1hZ2VGaWVsZHNMaXN0ID0gT2JqZWN0LmtleXMoaW1hZ2VGaWVsZHMpXG5cbiAgICAgICAgY29uc3QgaW5wdXQgPSBnZXRFZGl0TXV0YXRpb25JbnB1dFZhcmlhYmxlcyh7XG4gICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgbm9kZVxuICAgICAgICB9KVxuICAgICAgICBjb25zdCBub3JtYWxJbnB1dCA9IFIub21pdChpbWFnZUZpZWxkc0xpc3QsIGlucHV0KVxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IGlkLCBpbnB1dDogeyAuLi5ub3JtYWxJbnB1dCB9IH1cbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5QnVpbGRlci5idWlsZFF1ZXJ5KHtcbiAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgcXVlcnlUeXBlOiAndXBkYXRlJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlkLFxuICAgICAgICAgIG1vZGVsTmFtZSxcbiAgICAgICAgICB2YXJpYWJsZXMsXG4gICAgICAgICAgcXVlcnksXG4gICAgICAgICAgcGFyZW50TW9kZWxOYW1lLFxuICAgICAgICAgIHBhcmVudElkLFxuICAgICAgICAgIGlucHV0V2l0aEZpbGU6IFIuZmlsdGVyKFxuICAgICAgICAgICAgbiA9PiAhUi5pc05pbChuKSxcbiAgICAgICAgICAgIFIucGljayhpbWFnZUZpZWxkc0xpc3QsIGlucHV0KVxuICAgICAgICAgIClcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgoY29udGV4dDogYW55KSA9PlxuICAgICAgICB0aGlzLnF1ZXJ5QnVpbGRlclxuICAgICAgICAgIC5zZW5kUmVxdWVzdCh7XG4gICAgICAgICAgICBxdWVyeTogY29udGV4dC5xdWVyeSxcbiAgICAgICAgICAgIHZhcmlhYmxlczogY29udGV4dC52YXJpYWJsZXNcbiAgICAgICAgICB9KVxuICAgICAgICAgIC50aGVuKCh7IGRhdGEsIGVycm9yIH0pID0+ICh7IGNvbnRleHQsIGRhdGEsIGVycm9yIH0pKVxuICAgICAgKSxcbiAgICAgIHN3aXRjaE1hcCgoeyBjb250ZXh0LCBkYXRhLCBlcnJvciB9KSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIExvZ2dlci5lcGljRXJyb3IoJ2RldGFpbFRhYmxlRWRpdFN1Ym1pdEVwaWMnLCBjb250ZXh0LCBlcnJvcilcbiAgICAgICAgICBjb25zdCBhY3Rpb25zID0gW11cbiAgICAgICAgICBpZiAoaXNWYWxpZGF0aW9uRXJyb3IoZXJyb3IucmVzcG9uc2UpKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvcnMgPSBwcmVwVmFsaWRhdGlvbkVycm9ycyh7XG4gICAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgYWN0aW9ucy5wdXNoKFxuICAgICAgICAgICAgICBBY3Rpb25zLm9uVmFsaWRhdGlvbkVycm9yVGFibGVSb3coe1xuICAgICAgICAgICAgICAgIG1vZGVsTmFtZTogY29udGV4dC5tb2RlbE5hbWUsXG4gICAgICAgICAgICAgICAgaWQ6IGNvbnRleHQuaWQsXG4gICAgICAgICAgICAgICAgZXJyb3JzXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApXG4gICAgICAgICAgfVxuICAgICAgICAgIGFjdGlvbnMucHVzaChcbiAgICAgICAgICAgIEFjdGlvbnMuYWRkRGFuZ2VyQWxlcnQoeyBtZXNzYWdlOiAnRXJyb3Igc3VibWl0dGluZyBlZGl0LicgfSlcbiAgICAgICAgICApXG4gICAgICAgICAgcmV0dXJuIGNvbmNhdChhY3Rpb25zKVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGFjdGlvbnMgPSBbXG4gICAgICAgICAgQWN0aW9ucy5vblRhYmxlRWRpdENhbmNlbChSLnBpY2soWydtb2RlbE5hbWUnLCAnaWQnXSwgY29udGV4dCkpXG4gICAgICAgIF1cblxuICAgICAgICAvLyBpbWFnZXMgZXhpc3RcbiAgICAgICAgaWYgKCFSLmlzRW1wdHkoUi5wcm9wKCdpbnB1dFdpdGhGaWxlJywgY29udGV4dCkpKSB7XG4gICAgICAgICAgY29uc3QgcGF0aDogc3RyaW5nW10gPSBbJ3VwZGF0ZScgKyBjb250ZXh0Lm1vZGVsTmFtZSwgJ3Jlc3VsdCcsICdpZCddXG5cbiAgICAgICAgICBhY3Rpb25zID0gUi5hcHBlbmQoXG4gICAgICAgICAgICBBY3Rpb25zLm9uSW5saW5lRmlsZVN1Ym1pdCh7XG4gICAgICAgICAgICAgIG1vZGVsTmFtZTogY29udGV4dC5tb2RlbE5hbWUsXG4gICAgICAgICAgICAgIGlkOiBSLnBhdGgocGF0aCwgZGF0YSksXG4gICAgICAgICAgICAgIGZpbGVEYXRhOiBjb250ZXh0LmlucHV0V2l0aEZpbGUsXG4gICAgICAgICAgICAgIHBhcmVudE1vZGVsTmFtZTogY29udGV4dC5wYXJlbnRNb2RlbE5hbWUsXG4gICAgICAgICAgICAgIHBhcmVudElkOiBjb250ZXh0LnBhcmVudElkXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGFjdGlvbnNcbiAgICAgICAgICApXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gZmV0Y2hNb2RlbERldGFpbCBjYWxsZWQgaW4gaW5saW5lRmlsZVN1Ym1pdDsgb3RoZXJ3aXNlIGFwcGVuZCBpdCBoZXJlOlxuICAgICAgICAgIGFjdGlvbnMgPSBSLmFwcGVuZChcbiAgICAgICAgICAgIEFjdGlvbnMuZmV0Y2hNb2RlbERldGFpbCh7XG4gICAgICAgICAgICAgIG1vZGVsTmFtZTogY29udGV4dC5wYXJlbnRNb2RlbE5hbWUsXG4gICAgICAgICAgICAgIGlkOiBjb250ZXh0LnBhcmVudElkXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIGFjdGlvbnNcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uY2F0KGFjdGlvbnMpXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIC8vIHJlbW92ZWQgbTJtIHJlbGF0aW9uc2hpcCBmcm9tIG9iamVjdCA9PiBhbHRlcm5hdGl2ZSB0byBkZWxldGluZ1xuICAvKiBXQVJOSU5HOiBvbmx5IHRvIGJlIHVzZWQgd2l0aCBNYW55VG9NYW55IG9iamVjdC4gQSAncmVtb3ZlJyBvcGVyYXRpb24gb24gYSBPbmVUb01hbnkgcmVsYXRpb25zaGlwXG4gIHdob3NlIGJhY2tyZWYgaXMgbm9uLW51bGxhYmxlIHdpbGwgY2FzY2FkZSBhIGRlbGV0ZSBvcGVyYXRpb24gPT4gY2hpbGQgb2JqZWN0IG1heSBiZSAnZGVsZXRlZCdcbiAgZnJvbSBkYiBpbnN0ZWFkIG9mIGJlaW5nICdyZW1vdmVkJywgd2l0aG91dCBzcWxhbGNoZW15IHdhcm5pbmcgKiAqL1xuICBbREVUQUlMX1RBQkxFX1JFTU9WRV9TVUJNSVRdKGFjdGlvbiQ6IGFueSwgc3RhdGUkOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKERFVEFJTF9UQUJMRV9SRU1PVkVfU1VCTUlUKSxcbiAgICAgIG1hcChSLnByb3AoJ3BheWxvYWQnKSksXG4gICAgICBtYXAoKHBheWxvYWQ6IEVwaWNQYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgbW9kZWxOYW1lLCBmaWVsZE5hbWUsIGlkLCByZW1vdmVkSWQgfSA9IHsgLi4ucGF5bG9hZCB9XG5cbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5QnVpbGRlci5idWlsZFF1ZXJ5KHtcbiAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgcXVlcnlUeXBlOiAndXBkYXRlJ1xuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IHVwZGF0ZWRGaWVsZExpc3QgPSBSLnBpcGUoXG4gICAgICAgICAgUi5wYXRoT3IoXG4gICAgICAgICAgICBbXSxcbiAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICAgJ2NvbnZleW9yJyxcbiAgICAgICAgICAgICAgJ21vZGVsJyxcbiAgICAgICAgICAgICAgbW9kZWxOYW1lIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgJ3ZhbHVlcycsXG4gICAgICAgICAgICAgIGlkIGFzIHN0cmluZyxcbiAgICAgICAgICAgICAgZmllbGROYW1lIGFzIHN0cmluZ1xuICAgICAgICAgICAgXVxuICAgICAgICAgICksXG4gICAgICAgICAgUi5tYXAoKG9iajogYW55KSA9PiBvYmouaWQpLFxuICAgICAgICAgIFIud2l0aG91dChbcmVtb3ZlZElkXSlcbiAgICAgICAgKShzdGF0ZSQpXG5cbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0ge1xuICAgICAgICAgIGlkOiBOdW1iZXIoaWQpLFxuICAgICAgICAgIGlucHV0OiB7IFtmaWVsZE5hbWUgYXMgc3RyaW5nXTogdXBkYXRlZEZpZWxkTGlzdCB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgLi4ucGF5bG9hZCwgcXVlcnksIHZhcmlhYmxlcyB9XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKChjb250ZXh0OiBhbnkpID0+XG4gICAgICAgIHRoaXMucXVlcnlCdWlsZGVyXG4gICAgICAgICAgLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHF1ZXJ5OiBjb250ZXh0LnF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiBjb250ZXh0LnZhcmlhYmxlc1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHsgZGF0YSwgZXJyb3IgfSkgPT4gKHsgY29udGV4dCwgZGF0YSwgZXJyb3IgfSkpXG4gICAgICApLFxuICAgICAgc3dpdGNoTWFwKCh7IGNvbnRleHQsIGRhdGEsIGVycm9yIH0pOiBhbnkgPT4ge1xuICAgICAgICAvLyB0b2RvOiAnc2NoZW1hLmdldE1vZGVsTGFiZWwnIG5lZWRzICdub2RlJy8gJ2RhdGEnLyAnY3VzdG9tUHJvcHMnIHByb3BzXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgZGlzcGxheU5hbWUgPSB0aGlzLnNjaGVtYS5nZXRNb2RlbExhYmVsKHtcbiAgICAgICAgICBtb2RlbE5hbWU6IGNvbnRleHQubW9kZWxOYW1lXG4gICAgICAgIH0pXG4gICAgICAgIC8vIHRvZG86ICdzY2hlbWEuZ2V0RmllbGRMYWJlbCcgbmVlZHMgJ25vZGUnLydkYXRhJy8gJ2N1c3RvbVByb3BzJyBwcm9wc1xuICAgICAgICBjb25zdCBmaWVsZExhYmVsID0gdGhpcy5zY2hlbWEuZ2V0RmllbGRMYWJlbCh7XG4gICAgICAgICAgbW9kZWxOYW1lOiBjb250ZXh0Lm1vZGVsTmFtZSxcbiAgICAgICAgICBmaWVsZE5hbWU6IGNvbnRleHQuZmllbGROYW1lXG4gICAgICAgIH0pXG5cbiAgICAgICAgLy8gZ2V0IGVycm9ycyBmcm9tIGNvbnRleHRcbiAgICAgICAgY29uc3QgZXJyb3JzID0gZ2V0RGVsZXRlRXJyb3JzKHsgZGF0YSwgY29udGV4dCB9KVxuICAgICAgICBpZiAoZXJyb3JzKSB7XG4gICAgICAgICAgTG9nZ2VyLmVwaWNFcnJvcignZGV0YWlsVGFibGVSZW1vdmVTdWJtaXRFcGljJywgY29udGV4dCwgZXJyb3IpXG4gICAgICAgICAgY29uc3QgY29udGFjdEVycm9ycyA9IFIuam9pbignLiAnLCBlcnJvcnMpXG4gICAgICAgICAgcmV0dXJuIGNvbmNhdChbXG4gICAgICAgICAgICBBY3Rpb25zLmFkZERhbmdlckFsZXJ0KHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogYEVycm9yIHJlbW92aW5nICR7ZmllbGRMYWJlbH0uICR7Y29udGFjdEVycm9yc31gXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIF0pXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBMb2dnZXIuZXBpY0Vycm9yKCdkZXRhaWxUYWJsZVJlbW92ZVN1Ym1pdEVwaWMnLCBjb250ZXh0LCBlcnJvcilcbiAgICAgICAgICByZXR1cm4gQWN0aW9ucy5hZGREYW5nZXJBbGVydCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBgRXJyb3IgcmVtb3ZpbmcgJHtmaWVsZExhYmVsfS5gXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb25jYXQoW1xuICAgICAgICAgIEFjdGlvbnMuZmV0Y2hNb2RlbERldGFpbCh7XG4gICAgICAgICAgICBtb2RlbE5hbWU6IGNvbnRleHQubW9kZWxOYW1lLFxuICAgICAgICAgICAgaWQ6IGNvbnRleHQuaWRcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBBY3Rpb25zLmFkZFN1Y2Nlc3NBbGVydCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBgXCIke2ZpZWxkTGFiZWx9XCIgb2JqZWN0IHdhcyBzdWNjZXNzZnVsbHkgcmVtb3ZlZCBmcm9tIFwiJHtkaXNwbGF5TmFtZX1cIi5gXG4gICAgICAgICAgfSlcbiAgICAgICAgXSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgW0lOREVYX0VESVRfU1VCTUlUXShhY3Rpb24kOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKElOREVYX0VESVRfU1VCTUlUKSxcbiAgICAgIG1hcChSLnByb3AoJ3BheWxvYWQnKSksXG4gICAgICBtYXAoKHBheWxvYWQ6IEVwaWNQYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsTmFtZSA9IFIucHJvcCgnbW9kZWxOYW1lJywgcGF5bG9hZCkgYXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IGlkID0gUi5wcm9wKCdpZCcsIHBheWxvYWQpIGFzIHN0cmluZ1xuICAgICAgICBjb25zdCBub2RlID0gUi5wcm9wKCdjaGFuZ2VkRmllbGRzJywgcGF5bG9hZCkgYXMgYW55XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZ2V0RWRpdE11dGF0aW9uSW5wdXRWYXJpYWJsZXMoe1xuICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgbW9kZWxOYW1lLFxuICAgICAgICAgIG5vZGVcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyBpZCwgaW5wdXQ6IHsgLi4uaW5wdXQgfSB9XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeUJ1aWxkZXIuYnVpbGRRdWVyeSh7XG4gICAgICAgICAgbW9kZWxOYW1lLFxuICAgICAgICAgIHF1ZXJ5VHlwZTogJ3VwZGF0ZSdcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4geyBpZCwgbW9kZWxOYW1lLCB2YXJpYWJsZXMsIHF1ZXJ5IH1cbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAoKGNvbnRleHQ6IGFueSkgPT5cbiAgICAgICAgdGhpcy5xdWVyeUJ1aWxkZXJcbiAgICAgICAgICAuc2VuZFJlcXVlc3Qoe1xuICAgICAgICAgICAgcXVlcnk6IGNvbnRleHQucXVlcnksXG4gICAgICAgICAgICB2YXJpYWJsZXM6IGNvbnRleHQudmFyaWFibGVzXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigoeyBlcnJvciB9KSA9PiAoeyBjb250ZXh0LCBlcnJvciB9KSlcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKHsgY29udGV4dCwgZXJyb3IgfSkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBMb2dnZXIuZXBpY0Vycm9yKCdpbmRleEVkaXRTdWJtaXRFcGljJywgY29udGV4dCwgZXJyb3IpXG4gICAgICAgICAgY29uc3QgYWN0aW9ucyA9IFtdXG4gICAgICAgICAgaWYgKGlzVmFsaWRhdGlvbkVycm9yKGVycm9yLnJlc3BvbnNlKSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gcHJlcFZhbGlkYXRpb25FcnJvcnMoe1xuICAgICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGFjdGlvbnMucHVzaChcbiAgICAgICAgICAgICAgQWN0aW9ucy5vblZhbGlkYXRpb25FcnJvclRhYmxlUm93KHtcbiAgICAgICAgICAgICAgICBtb2RlbE5hbWU6IGNvbnRleHQubW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgIGlkOiBjb250ZXh0LmlkLFxuICAgICAgICAgICAgICAgIGVycm9yc1xuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH1cbiAgICAgICAgICBhY3Rpb25zLnB1c2goXG4gICAgICAgICAgICBBY3Rpb25zLmFkZERhbmdlckFsZXJ0KHsgbWVzc2FnZTogJ0Vycm9yIHN1Ym1pdHRpbmcgZWRpdC4nIH0pXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiBjb25jYXQoYWN0aW9ucylcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBjb25jYXQoW1xuICAgICAgICAgIEFjdGlvbnMub25UYWJsZUVkaXRDYW5jZWwoUi5waWNrKFsnbW9kZWxOYW1lJywgJ2lkJ10sIGNvbnRleHQpKSxcbiAgICAgICAgICBBY3Rpb25zLmZldGNoTW9kZWxJbmRleCh7IG1vZGVsTmFtZTogY29udGV4dC5tb2RlbE5hbWUgfSlcbiAgICAgICAgXSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgW0lOTElORV9GSUxFX0RFTEVURV0oYWN0aW9uJDogYW55KSB7XG4gICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShJTkxJTkVfRklMRV9ERUxFVEUpLFxuICAgICAgbWFwKFIucHJvcCgncGF5bG9hZCcpKSxcbiAgICAgIG1hcCgocGF5bG9hZDogRXBpY1BheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZmllbGROYW1lID0gUi5wcm9wKCdmaWVsZE5hbWUnLCBwYXlsb2FkKSBhcyBzdHJpbmdcbiAgICAgICAgY29uc3QgbW9kZWxOYW1lID0gUi5wcm9wKCdtb2RlbE5hbWUnLCBwYXlsb2FkKSBhcyBzdHJpbmdcbiAgICAgICAgY29uc3QgaWQgPSBSLnByb3AoJ2lkJywgcGF5bG9hZCkgYXMgc3RyaW5nXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnlCdWlsZGVyLmJ1aWxkUXVlcnkoe1xuICAgICAgICAgICAgbW9kZWxOYW1lLFxuICAgICAgICAgICAgcXVlcnlUeXBlOiAndXBkYXRlJ1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGlkLFxuICAgICAgICAgIG1vZGVsTmFtZSxcbiAgICAgICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgICAgIGlucHV0OiB7XG4gICAgICAgICAgICAgIFtmaWVsZE5hbWVdOiBERUxFVEVfRklMRVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlkXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKChjb250ZXh0OiBhbnkpID0+XG4gICAgICAgIHRoaXMucXVlcnlCdWlsZGVyXG4gICAgICAgICAgLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHF1ZXJ5OiBjb250ZXh0LnF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiBjb250ZXh0LnZhcmlhYmxlc1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHsgZXJyb3IgfSkgPT4gKHsgY29udGV4dCwgZXJyb3IgfSkpXG4gICAgICApLFxuICAgICAgc3dpdGNoTWFwKCh7IGNvbnRleHQsIGVycm9yIH0pID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgTG9nZ2VyLmVwaWNFcnJvcignaW5saW5lRmlsZURlbGV0ZUVwaWMnLCBjb250ZXh0LCBlcnJvcilcbiAgICAgICAgICByZXR1cm4gY29uY2F0KFtcbiAgICAgICAgICAgIEFjdGlvbnMuYWRkRGFuZ2VyQWxlcnQoeyBtZXNzYWdlOiAnRXJyb3IgZGVsZXRpbmcgZmlsZS4nIH0pXG4gICAgICAgICAgXSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uY2F0KFtcbiAgICAgICAgICBBY3Rpb25zLmZldGNoTW9kZWxEZXRhaWwoe1xuICAgICAgICAgICAgbW9kZWxOYW1lOiBjb250ZXh0Lm1vZGVsTmFtZSxcbiAgICAgICAgICAgIGlkOiBjb250ZXh0LmlkXG4gICAgICAgICAgfSksXG4gICAgICAgICAgQWN0aW9ucy5hZGRTdWNjZXNzQWxlcnQoeyBtZXNzYWdlOiAnU3VjY2Vzc2Z1bGx5IGRlbGV0ZWQgZmlsZS4nIH0pXG4gICAgICAgIF0pXG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIFtJTkxJTkVfRklMRV9TVUJNSVRdKGFjdGlvbiQ6IGFueSwgc3RhdGUkOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKElOTElORV9GSUxFX1NVQk1JVCksXG4gICAgICBtYXAoUi5wcm9wKCdwYXlsb2FkJykpLFxuICAgICAgbWFwKChwYXlsb2FkOiBFcGljUGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbE5hbWUgPSBSLnByb3AoJ21vZGVsTmFtZScsIHBheWxvYWQpIGFzIHN0cmluZ1xuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBSLnByb3AoJ2ZpZWxkTmFtZScsIHBheWxvYWQpIGFzIHN0cmluZ1xuICAgICAgICBjb25zdCBpZCA9IFIucHJvcCgnaWQnLCBwYXlsb2FkKSBhcyBzdHJpbmdcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBmb3JtRGF0YTogZmlsZVN1Ym1pdFRvQmxvYih7XG4gICAgICAgICAgICBwYXlsb2FkLFxuICAgICAgICAgICAgcXVlcnk6IHRoaXMucXVlcnlCdWlsZGVyLmJ1aWxkUXVlcnkoe1xuICAgICAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgICAgIHF1ZXJ5VHlwZTogJ3VwZGF0ZSdcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgdmFsdWU6IFIucGF0aChcbiAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICd2YWx1ZScsXG4gICAgICAgICAgICAgICAgJ2NvbnZleW9yJyxcbiAgICAgICAgICAgICAgICAnZWRpdCcsXG4gICAgICAgICAgICAgICAgbW9kZWxOYW1lLFxuICAgICAgICAgICAgICAgIGlkLFxuICAgICAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgICAgICAnY3VycmVudFZhbHVlJ1xuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICBzdGF0ZSRcbiAgICAgICAgICAgIClcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBtb2RlbE5hbWU6IG1vZGVsTmFtZSxcbiAgICAgICAgICBmaWVsZE5hbWU6IGZpZWxkTmFtZSxcbiAgICAgICAgICBpZDogaWQsXG4gICAgICAgICAgLi4ucGF5bG9hZFxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKChjb250ZXh0OiBhbnkpID0+XG4gICAgICAgIHRoaXMucXVlcnlCdWlsZGVyXG4gICAgICAgICAgLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIGZvcm1EYXRhOiBjb250ZXh0LmZvcm1EYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgICAudGhlbigoeyBlcnJvciB9KSA9PiAoeyBjb250ZXh0LCBlcnJvciB9KSlcbiAgICAgICksXG4gICAgICBzd2l0Y2hNYXAoKHsgY29udGV4dCwgZXJyb3IgfSkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBMb2dnZXIuZXBpY0Vycm9yKCdpbmxpbmVGaWxlU3VibWl0RXBpYycsIGNvbnRleHQsIGVycm9yKVxuICAgICAgICAgIHJldHVybiBjb25jYXQoW1xuICAgICAgICAgICAgQWN0aW9ucy5hZGREYW5nZXJBbGVydCh7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGBDb3VsZCBub3Qgc2F2ZSBJbWFnZSBmb3IgJHtjb250ZXh0Lm1vZGVsTmFtZX0uYFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICBdKVxuICAgICAgICB9XG4gICAgICAgIGxldCBhY3Rpb25zID0gW1xuICAgICAgICAgIEFjdGlvbnMub25BdHRyaWJ1dGVFZGl0Q2FuY2VsKHtcbiAgICAgICAgICAgIG1vZGVsTmFtZTogY29udGV4dC5tb2RlbE5hbWUsXG4gICAgICAgICAgICBmaWVsZE5hbWU6IGNvbnRleHQuZmllbGROYW1lLFxuICAgICAgICAgICAgaWQ6IGNvbnRleHQuaWRcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBBY3Rpb25zLmZldGNoTW9kZWxEZXRhaWwoe1xuICAgICAgICAgICAgbW9kZWxOYW1lOiBjb250ZXh0Lm1vZGVsTmFtZSxcbiAgICAgICAgICAgIGlkOiBjb250ZXh0LmlkXG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuICAgICAgICBjb25zdCBwYXJlbnRNb2RlbE5hbWUgPSBSLnByb3AoJ3BhcmVudE1vZGVsTmFtZScsIGNvbnRleHQpXG4gICAgICAgIGNvbnN0IHBhcmVudElkID0gUi5wcm9wKCdwYXJlbnRJZCcsIGNvbnRleHQpXG4gICAgICAgIC8vIGlmIGNvbWVzIGZyb20gZGV0YWlsIHRhYmxlOlxuICAgICAgICBpZiAocGFyZW50TW9kZWxOYW1lICYmIHBhcmVudElkKSB7XG4gICAgICAgICAgYWN0aW9ucyA9IFIuYXBwZW5kKFxuICAgICAgICAgICAgQWN0aW9ucy5mZXRjaE1vZGVsRGV0YWlsKHtcbiAgICAgICAgICAgICAgbW9kZWxOYW1lOiBwYXJlbnRNb2RlbE5hbWUsXG4gICAgICAgICAgICAgIGlkOiBwYXJlbnRJZFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBhY3Rpb25zXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIGlmIChSLnByb3AoJ2Zyb21DcmVhdGUnLCBjb250ZXh0KSkge1xuICAgICAgICAgIC8vIGNvbWVzIGZyb20gY3JlYXRlIHBhZ2VcbiAgICAgICAgICBhY3Rpb25zID0gUi5hcHBlbmQoQWN0aW9ucy5vblNhdmVDcmVhdGVTdWNjZXNzZnVsKHt9KSwgYWN0aW9ucylcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29uY2F0KGFjdGlvbnMpXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuIl19