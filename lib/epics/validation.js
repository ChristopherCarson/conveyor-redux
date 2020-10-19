import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _contains from "ramda/src/contains";
import _equals from "ramda/src/equals";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _isEmpty from "ramda/src/isEmpty";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _filter from "ramda/src/filter";
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
import { map } from 'rxjs/operators';
import { SAVE_CREATE_CHECK, DETAIL_ATTRIBUTE_EDIT_SUBMIT_CHECK, DETAIL_TABLE_EDIT_SUBMIT_CHECK, INDEX_EDIT_SUBMIT_CHECK } from '../actionConsts';
import { getMissingFieldsMessage, tableChangedFields } from '../utils/helpers';
import * as Actions from '../actions';
import { Epic } from './epic';
export var ValidationEpic = /*#__PURE__*/function (_Epic) {
  _inherits(ValidationEpic, _Epic);

  var _super = _createSuper(ValidationEpic);

  function ValidationEpic() {
    _classCallCheck(this, ValidationEpic);

    return _super.apply(this, arguments);
  }

  _createClass(ValidationEpic, [{
    key: SAVE_CREATE_CHECK,
    value: function value(action$, state$) {
      var _this = this;

      return action$.pipe(ofType(SAVE_CREATE_CHECK), map(_prop('payload')), map(function (payload) {
        var modelName = _prop('modelName', payload);

        var stack = _path(['value', 'conveyor', 'create', 'stack'], state$);

        var fields = _path([stack.length - 1, 'fields'], stack);

        var requiredFields = _filter(function (val) {
          return val !== 'id';
        }, _this.schema.getRequiredFields(modelName));

        var missingFields = _filterInstanceProperty(requiredFields).call(requiredFields, function (fieldName) {
          return !(fieldName in fields);
        });

        if (!_isEmpty(missingFields)) {
          var message = getMissingFieldsMessage({
            schema: _this.schema,
            missingFields: missingFields,
            modelName: modelName
          });
          return Actions.addDangerAlert({
            message: "Missing required field(s): ".concat(message)
          });
        } else {
          return Actions.onSaveCreate(_Object$assign({}, payload));
        }
      }));
    }
  }, {
    key: DETAIL_ATTRIBUTE_EDIT_SUBMIT_CHECK,
    value: function value(action$, state$) {
      var _this2 = this;

      return action$.pipe(ofType(DETAIL_ATTRIBUTE_EDIT_SUBMIT_CHECK), map(_prop('payload')), map(function (payload) {
        var modelName = _prop('modelName', payload);

        var fieldName = _prop('fieldName', payload);

        var id = _prop('id', payload);

        var currentValue = _path(['value', 'conveyor', 'edit', modelName, id, fieldName, 'currentValue'], state$);

        var initialValue = _path(['value', 'conveyor', 'edit', modelName, id, fieldName, 'initialValue'], state$); // check for changes to initial value


        if (_equals(currentValue, initialValue)) {
          return Actions.onAttributeEditCancel({
            modelName: modelName,
            id: id,
            fieldName: fieldName
          });
        } // check for required field


        var requiredFields = _filter(function (val) {
          return val !== 'id';
        }, _this2.schema.getRequiredFields(modelName));

        if (!currentValue && _contains(fieldName, requiredFields)) {
          return Actions.addDangerAlert({
            message: "Missing required field: ".concat(fieldName, ".")
          });
        }

        return Actions.onDetailAttributeEditSubmit(_Object$assign({}, payload));
      }));
    }
  }, {
    key: DETAIL_TABLE_EDIT_SUBMIT_CHECK,
    value: function value(action$, state$) {
      var _this3 = this;

      return action$.pipe(ofType(DETAIL_TABLE_EDIT_SUBMIT_CHECK), map(_prop('payload')), map(function (payload) {
        var modelName = _prop('modelName', payload);

        var id = _prop('id', payload);

        var changedFields = tableChangedFields({
          modelName: modelName,
          id: id,
          state$: state$
        }); // check for changes to initial value(s)

        if (_isEmpty(changedFields)) {
          return Actions.onTableEditCancel({
            modelName: modelName,
            id: id
          });
        } // check for required field(s)


        var requiredFields = _filter(function (val) {
          return val !== 'id';
        }, _this3.schema.getRequiredFields(modelName));

        var missingFields = _filterInstanceProperty(requiredFields).call(requiredFields, function (fieldName) {
          return _contains(fieldName, _Object$keys(changedFields)) && !_prop(fieldName, changedFields);
        });

        if (!_isEmpty(missingFields)) {
          var message = getMissingFieldsMessage({
            schema: _this3.schema,
            missingFields: missingFields,
            modelName: modelName
          });
          return Actions.addDangerAlert({
            message: "Missing required field(s): ".concat(message, ".")
          });
        }

        return Actions.onDetailTableEditSubmit(_Object$assign({
          id: id,
          modelName: modelName,
          changedFields: changedFields
        }, payload));
      }));
    }
  }, {
    key: INDEX_EDIT_SUBMIT_CHECK,
    value: function value(action$, state$) {
      var _this4 = this;

      return action$.pipe(ofType(INDEX_EDIT_SUBMIT_CHECK), map(_prop('payload')), map(function (payload) {
        var modelName = _prop('modelName', payload);

        var id = _prop('id', payload);

        var changedFields = tableChangedFields({
          modelName: modelName,
          id: id,
          state$: state$
        }); // check for changes to initial value(s)

        if (_isEmpty(changedFields)) {
          return Actions.onTableEditCancel({
            modelName: modelName,
            id: id
          });
        } // check for required field(s)


        var requiredFields = _filter(function (val) {
          return val !== 'id';
        }, _this4.schema.getRequiredFields(modelName));

        var missingFields = _filterInstanceProperty(requiredFields).call(requiredFields, function (fieldName) {
          return _contains(fieldName, _Object$keys(changedFields)) && !_prop(fieldName, changedFields);
        });

        if (!_isEmpty(missingFields)) {
          var message = getMissingFieldsMessage({
            schema: _this4.schema,
            missingFields: missingFields,
            modelName: modelName
          });
          return Actions.addDangerAlert({
            message: "Missing required field(s): ".concat(message, ".")
          });
        }

        return Actions.onIndexEditSubmit(_Object$assign({
          id: id,
          modelName: modelName,
          changedFields: changedFields
        }, payload));
      }));
    }
  }]);

  return ValidationEpic;
}(Epic);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy92YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbIm9mVHlwZSIsIm1hcCIsIlNBVkVfQ1JFQVRFX0NIRUNLIiwiREVUQUlMX0FUVFJJQlVURV9FRElUX1NVQk1JVF9DSEVDSyIsIkRFVEFJTF9UQUJMRV9FRElUX1NVQk1JVF9DSEVDSyIsIklOREVYX0VESVRfU1VCTUlUX0NIRUNLIiwiZ2V0TWlzc2luZ0ZpZWxkc01lc3NhZ2UiLCJ0YWJsZUNoYW5nZWRGaWVsZHMiLCJBY3Rpb25zIiwiRXBpYyIsIlZhbGlkYXRpb25FcGljIiwiYWN0aW9uJCIsInN0YXRlJCIsInBpcGUiLCJwYXlsb2FkIiwibW9kZWxOYW1lIiwic3RhY2siLCJmaWVsZHMiLCJsZW5ndGgiLCJyZXF1aXJlZEZpZWxkcyIsInZhbCIsInNjaGVtYSIsImdldFJlcXVpcmVkRmllbGRzIiwibWlzc2luZ0ZpZWxkcyIsImZpZWxkTmFtZSIsIm1lc3NhZ2UiLCJhZGREYW5nZXJBbGVydCIsIm9uU2F2ZUNyZWF0ZSIsImlkIiwiY3VycmVudFZhbHVlIiwiaW5pdGlhbFZhbHVlIiwib25BdHRyaWJ1dGVFZGl0Q2FuY2VsIiwib25EZXRhaWxBdHRyaWJ1dGVFZGl0U3VibWl0IiwiY2hhbmdlZEZpZWxkcyIsIm9uVGFibGVFZGl0Q2FuY2VsIiwib25EZXRhaWxUYWJsZUVkaXRTdWJtaXQiLCJvbkluZGV4RWRpdFN1Ym1pdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxTQUFTQSxNQUFULFFBQXVCLGtCQUF2QjtBQUNBLFNBQVNDLEdBQVQsUUFBb0IsZ0JBQXBCO0FBQ0EsU0FDRUMsaUJBREYsRUFFRUMsa0NBRkYsRUFHRUMsOEJBSEYsRUFJRUMsdUJBSkYsUUFLTyxpQkFMUDtBQU1BLFNBQVNDLHVCQUFULEVBQWtDQyxrQkFBbEMsUUFBNEQsa0JBQTVEO0FBQ0EsT0FBTyxLQUFLQyxPQUFaLE1BQXlCLFlBQXpCO0FBQ0EsU0FBU0MsSUFBVCxRQUFx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LE1BQU9ULFNBQVAsRUFBa0JTLGFBQWxCLENBRkg7QUFBQSxTQURrQyxDQUFwQzs7QUFLQSxZQUFJLENBQUMsU0FBVVYsYUFBVixDQUFMLEVBQStCO0FBQzdCLGNBQU1FLE9BQU8sR0FBR25CLHVCQUF1QixDQUFDO0FBQ3RDZSxZQUFBQSxNQUFNLEVBQUUsTUFBSSxDQUFDQSxNQUR5QjtBQUV0Q0UsWUFBQUEsYUFBYSxFQUFiQSxhQUZzQztBQUd0Q1IsWUFBQUEsU0FBUyxFQUFUQTtBQUhzQyxXQUFELENBQXZDO0FBS0EsaUJBQU9QLE9BQU8sQ0FBQ2tCLGNBQVIsQ0FBdUI7QUFDNUJELFlBQUFBLE9BQU8sdUNBQWdDQSxPQUFoQztBQURxQixXQUF2QixDQUFQO0FBR0Q7O0FBRUQsZUFBT2pCLE9BQU8sQ0FBQzRCLGlCQUFSO0FBQ0xSLFVBQUFBLEVBQUUsRUFBRkEsRUFESztBQUVMYixVQUFBQSxTQUFTLEVBQVRBLFNBRks7QUFHTGtCLFVBQUFBLGFBQWEsRUFBYkE7QUFISyxXQUlGbkIsT0FKRSxFQUFQO0FBTUQsT0F0Q0UsQ0FIRSxDQUFQO0FBMkNEO0FBdExIOztBQUFBO0FBQUEsRUFBb0NMLElBQXBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSdcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUnXG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7XG4gIFNBVkVfQ1JFQVRFX0NIRUNLLFxuICBERVRBSUxfQVRUUklCVVRFX0VESVRfU1VCTUlUX0NIRUNLLFxuICBERVRBSUxfVEFCTEVfRURJVF9TVUJNSVRfQ0hFQ0ssXG4gIElOREVYX0VESVRfU1VCTUlUX0NIRUNLXG59IGZyb20gJy4uL2FjdGlvbkNvbnN0cydcbmltcG9ydCB7IGdldE1pc3NpbmdGaWVsZHNNZXNzYWdlLCB0YWJsZUNoYW5nZWRGaWVsZHMgfSBmcm9tICcuLi91dGlscy9oZWxwZXJzJ1xuaW1wb3J0ICogYXMgQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zJ1xuaW1wb3J0IHsgRXBpYyB9IGZyb20gJy4vZXBpYydcblxuZXhwb3J0IGNsYXNzIFZhbGlkYXRpb25FcGljIGV4dGVuZHMgRXBpYyB7XG4gIFtTQVZFX0NSRUFURV9DSEVDS10oYWN0aW9uJDogYW55LCBzdGF0ZSQ6IGFueSkge1xuICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoU0FWRV9DUkVBVEVfQ0hFQ0spLFxuICAgICAgbWFwKFIucHJvcCgncGF5bG9hZCcpKSxcbiAgICAgIG1hcCgocGF5bG9hZDogRXBpY1BheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWxOYW1lID0gUi5wcm9wKCdtb2RlbE5hbWUnLCBwYXlsb2FkKSBhcyBzdHJpbmdcbiAgICAgICAgY29uc3Qgc3RhY2sgPSBSLnBhdGgoXG4gICAgICAgICAgWyd2YWx1ZScsICdjb252ZXlvcicsICdjcmVhdGUnLCAnc3RhY2snXSxcbiAgICAgICAgICBzdGF0ZSRcbiAgICAgICAgKSBhcyBhbnlbXVxuICAgICAgICBjb25zdCBmaWVsZHM6IGFueSA9IFIucGF0aChbc3RhY2subGVuZ3RoIC0gMSwgJ2ZpZWxkcyddLCBzdGFjaylcbiAgICAgICAgY29uc3QgcmVxdWlyZWRGaWVsZHMgPSBSLmZpbHRlcihcbiAgICAgICAgICB2YWwgPT4gdmFsICE9PSAnaWQnLFxuICAgICAgICAgIHRoaXMuc2NoZW1hLmdldFJlcXVpcmVkRmllbGRzKG1vZGVsTmFtZSlcbiAgICAgICAgKVxuICAgICAgICBjb25zdCBtaXNzaW5nRmllbGRzID0gcmVxdWlyZWRGaWVsZHMuZmlsdGVyKFxuICAgICAgICAgIChmaWVsZE5hbWU6IGFueSkgPT4gIShmaWVsZE5hbWUgaW4gZmllbGRzKVxuICAgICAgICApXG5cbiAgICAgICAgaWYgKCFSLmlzRW1wdHkobWlzc2luZ0ZpZWxkcykpIHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZ2V0TWlzc2luZ0ZpZWxkc01lc3NhZ2Uoe1xuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIG1pc3NpbmdGaWVsZHMsXG4gICAgICAgICAgICBtb2RlbE5hbWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBBY3Rpb25zLmFkZERhbmdlckFsZXJ0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBNaXNzaW5nIHJlcXVpcmVkIGZpZWxkKHMpOiAke21lc3NhZ2V9YFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIEFjdGlvbnMub25TYXZlQ3JlYXRlKHsgLi4ucGF5bG9hZCB9KVxuICAgICAgICB9XG4gICAgICB9KVxuICAgIClcbiAgfVxuXG4gIFtERVRBSUxfQVRUUklCVVRFX0VESVRfU1VCTUlUX0NIRUNLXShhY3Rpb24kOiBhbnksIHN0YXRlJDogYW55KSB7XG4gICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShERVRBSUxfQVRUUklCVVRFX0VESVRfU1VCTUlUX0NIRUNLKSxcbiAgICAgIG1hcChSLnByb3AoJ3BheWxvYWQnKSksXG4gICAgICBtYXAoKHBheWxvYWQ6IEVwaWNQYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsTmFtZSA9IFIucHJvcCgnbW9kZWxOYW1lJywgcGF5bG9hZCkgYXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IFIucHJvcCgnZmllbGROYW1lJywgcGF5bG9hZCkgYXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IGlkID0gUi5wcm9wKCdpZCcsIHBheWxvYWQpIGFzIHN0cmluZ1xuICAgICAgICBjb25zdCBjdXJyZW50VmFsdWUgPSBSLnBhdGgoXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICdjb252ZXlvcicsXG4gICAgICAgICAgICAnZWRpdCcsXG4gICAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgICdjdXJyZW50VmFsdWUnXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzdGF0ZSRcbiAgICAgICAgKVxuICAgICAgICBjb25zdCBpbml0aWFsVmFsdWUgPSBSLnBhdGgoXG4gICAgICAgICAgW1xuICAgICAgICAgICAgJ3ZhbHVlJyxcbiAgICAgICAgICAgICdjb252ZXlvcicsXG4gICAgICAgICAgICAnZWRpdCcsXG4gICAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgICBpZCxcbiAgICAgICAgICAgIGZpZWxkTmFtZSxcbiAgICAgICAgICAgICdpbml0aWFsVmFsdWUnXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzdGF0ZSRcbiAgICAgICAgKVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciBjaGFuZ2VzIHRvIGluaXRpYWwgdmFsdWVcbiAgICAgICAgaWYgKFIuZXF1YWxzKGN1cnJlbnRWYWx1ZSwgaW5pdGlhbFZhbHVlKSkge1xuICAgICAgICAgIHJldHVybiBBY3Rpb25zLm9uQXR0cmlidXRlRWRpdENhbmNlbCh7IG1vZGVsTmFtZSwgaWQsIGZpZWxkTmFtZSB9KVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIHJlcXVpcmVkIGZpZWxkXG4gICAgICAgIGNvbnN0IHJlcXVpcmVkRmllbGRzID0gUi5maWx0ZXIoXG4gICAgICAgICAgdmFsID0+IHZhbCAhPT0gJ2lkJyxcbiAgICAgICAgICB0aGlzLnNjaGVtYS5nZXRSZXF1aXJlZEZpZWxkcyhtb2RlbE5hbWUpXG4gICAgICAgIClcbiAgICAgICAgaWYgKCFjdXJyZW50VmFsdWUgJiYgUi5jb250YWlucyhmaWVsZE5hbWUsIHJlcXVpcmVkRmllbGRzKSkge1xuICAgICAgICAgIHJldHVybiBBY3Rpb25zLmFkZERhbmdlckFsZXJ0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBNaXNzaW5nIHJlcXVpcmVkIGZpZWxkOiAke2ZpZWxkTmFtZX0uYFxuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gQWN0aW9ucy5vbkRldGFpbEF0dHJpYnV0ZUVkaXRTdWJtaXQoe1xuICAgICAgICAgIC4uLnBheWxvYWRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgW0RFVEFJTF9UQUJMRV9FRElUX1NVQk1JVF9DSEVDS10oYWN0aW9uJDogYW55LCBzdGF0ZSQ6IGFueSkge1xuICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoREVUQUlMX1RBQkxFX0VESVRfU1VCTUlUX0NIRUNLKSxcbiAgICAgIG1hcChSLnByb3AoJ3BheWxvYWQnKSksXG4gICAgICBtYXAoKHBheWxvYWQ6IEVwaWNQYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsTmFtZSA9IFIucHJvcCgnbW9kZWxOYW1lJywgcGF5bG9hZCkgYXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IGlkID0gUi5wcm9wKCdpZCcsIHBheWxvYWQpIGFzIHN0cmluZ1xuXG4gICAgICAgIGNvbnN0IGNoYW5nZWRGaWVsZHMgPSB0YWJsZUNoYW5nZWRGaWVsZHMoeyBtb2RlbE5hbWUsIGlkLCBzdGF0ZSQgfSlcblxuICAgICAgICAvLyBjaGVjayBmb3IgY2hhbmdlcyB0byBpbml0aWFsIHZhbHVlKHMpXG4gICAgICAgIGlmIChSLmlzRW1wdHkoY2hhbmdlZEZpZWxkcykpIHtcbiAgICAgICAgICByZXR1cm4gQWN0aW9ucy5vblRhYmxlRWRpdENhbmNlbCh7IG1vZGVsTmFtZSwgaWQgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGZvciByZXF1aXJlZCBmaWVsZChzKVxuICAgICAgICBjb25zdCByZXF1aXJlZEZpZWxkcyA9IFIuZmlsdGVyKFxuICAgICAgICAgIHZhbCA9PiB2YWwgIT09ICdpZCcsXG4gICAgICAgICAgdGhpcy5zY2hlbWEuZ2V0UmVxdWlyZWRGaWVsZHMobW9kZWxOYW1lKVxuICAgICAgICApXG4gICAgICAgIGNvbnN0IG1pc3NpbmdGaWVsZHMgPSByZXF1aXJlZEZpZWxkcy5maWx0ZXIoXG4gICAgICAgICAgKGZpZWxkTmFtZTogYW55KSA9PlxuICAgICAgICAgICAgUi5jb250YWlucyhmaWVsZE5hbWUsIE9iamVjdC5rZXlzKGNoYW5nZWRGaWVsZHMpKSAmJlxuICAgICAgICAgICAgIVIucHJvcChmaWVsZE5hbWUsIGNoYW5nZWRGaWVsZHMpXG4gICAgICAgIClcbiAgICAgICAgaWYgKCFSLmlzRW1wdHkobWlzc2luZ0ZpZWxkcykpIHtcbiAgICAgICAgICBjb25zdCBtZXNzYWdlID0gZ2V0TWlzc2luZ0ZpZWxkc01lc3NhZ2Uoe1xuICAgICAgICAgICAgc2NoZW1hOiB0aGlzLnNjaGVtYSxcbiAgICAgICAgICAgIG1pc3NpbmdGaWVsZHMsXG4gICAgICAgICAgICBtb2RlbE5hbWVcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBBY3Rpb25zLmFkZERhbmdlckFsZXJ0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGBNaXNzaW5nIHJlcXVpcmVkIGZpZWxkKHMpOiAke21lc3NhZ2V9LmBcbiAgICAgICAgICB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIEFjdGlvbnMub25EZXRhaWxUYWJsZUVkaXRTdWJtaXQoe1xuICAgICAgICAgIGlkLFxuICAgICAgICAgIG1vZGVsTmFtZSxcbiAgICAgICAgICBjaGFuZ2VkRmllbGRzLFxuICAgICAgICAgIC4uLnBheWxvYWRcbiAgICAgICAgfSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgW0lOREVYX0VESVRfU1VCTUlUX0NIRUNLXShhY3Rpb24kOiBhbnksIHN0YXRlJDogYW55KSB7XG4gICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShJTkRFWF9FRElUX1NVQk1JVF9DSEVDSyksXG4gICAgICBtYXAoUi5wcm9wKCdwYXlsb2FkJykpLFxuICAgICAgbWFwKChwYXlsb2FkOiBFcGljUGF5bG9hZCkgPT4ge1xuICAgICAgICBjb25zdCBtb2RlbE5hbWUgPSBSLnByb3AoJ21vZGVsTmFtZScsIHBheWxvYWQpIGFzIGFueVxuICAgICAgICBjb25zdCBpZCA9IFIucHJvcCgnaWQnLCBwYXlsb2FkKSBhcyBzdHJpbmdcblxuICAgICAgICBjb25zdCBjaGFuZ2VkRmllbGRzID0gdGFibGVDaGFuZ2VkRmllbGRzKHsgbW9kZWxOYW1lLCBpZCwgc3RhdGUkIH0pXG5cbiAgICAgICAgLy8gY2hlY2sgZm9yIGNoYW5nZXMgdG8gaW5pdGlhbCB2YWx1ZShzKVxuICAgICAgICBpZiAoUi5pc0VtcHR5KGNoYW5nZWRGaWVsZHMpKSB7XG4gICAgICAgICAgcmV0dXJuIEFjdGlvbnMub25UYWJsZUVkaXRDYW5jZWwoeyBtb2RlbE5hbWUsIGlkIH0pXG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBmb3IgcmVxdWlyZWQgZmllbGQocylcbiAgICAgICAgY29uc3QgcmVxdWlyZWRGaWVsZHMgPSBSLmZpbHRlcihcbiAgICAgICAgICB2YWwgPT4gdmFsICE9PSAnaWQnLFxuICAgICAgICAgIHRoaXMuc2NoZW1hLmdldFJlcXVpcmVkRmllbGRzKG1vZGVsTmFtZSlcbiAgICAgICAgKVxuICAgICAgICBjb25zdCBtaXNzaW5nRmllbGRzID0gcmVxdWlyZWRGaWVsZHMuZmlsdGVyKFxuICAgICAgICAgIChmaWVsZE5hbWU6IGFueSkgPT5cbiAgICAgICAgICAgIFIuY29udGFpbnMoZmllbGROYW1lLCBPYmplY3Qua2V5cyhjaGFuZ2VkRmllbGRzKSkgJiZcbiAgICAgICAgICAgICFSLnByb3AoZmllbGROYW1lLCBjaGFuZ2VkRmllbGRzKVxuICAgICAgICApXG4gICAgICAgIGlmICghUi5pc0VtcHR5KG1pc3NpbmdGaWVsZHMpKSB7XG4gICAgICAgICAgY29uc3QgbWVzc2FnZSA9IGdldE1pc3NpbmdGaWVsZHNNZXNzYWdlKHtcbiAgICAgICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgICAgICBtaXNzaW5nRmllbGRzLFxuICAgICAgICAgICAgbW9kZWxOYW1lXG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gQWN0aW9ucy5hZGREYW5nZXJBbGVydCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBgTWlzc2luZyByZXF1aXJlZCBmaWVsZChzKTogJHttZXNzYWdlfS5gXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBBY3Rpb25zLm9uSW5kZXhFZGl0U3VibWl0KHtcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBtb2RlbE5hbWUsXG4gICAgICAgICAgY2hhbmdlZEZpZWxkcyxcbiAgICAgICAgICAuLi5wYXlsb2FkXG4gICAgICAgIH0pXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuIl19