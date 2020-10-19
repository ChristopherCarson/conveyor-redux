import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _concat from "ramda/src/concat";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _forEach from "ramda/src/forEach";
import _path from "ramda/src/path";
import _dissoc from "ramda/src/dissoc";
import _prop from "ramda/src/prop";
import _isEmpty from "ramda/src/isEmpty";
import _dissocPath from "ramda/src/dissocPath";
import _assocPath from "ramda/src/assocPath";
import _mapObjIndexed from "ramda/src/mapObjIndexed";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { initState, getEditValue } from '../utils/edit';
import { TABLE_ROW_EDIT, ATTRIBUTE_EDIT, TABLE_EDIT_CANCEL, ATTRIBUTE_EDIT_CANCEL, VALIDATION_ERROR_EDIT, DETAIL_TABLE_EDIT_SUBMIT, DETAIL_ATTRIBUTE_EDIT_SUBMIT, EDIT_INPUT_CHANGE, VALIDATION_ERROR_TABLE_ROW } from '../actionConsts';
import { LOCATION_CHANGE } from 'connected-react-router';
import { Reducer } from './reducer';
export var EditReducer = /*#__PURE__*/function (_Reducer) {
  _inherits(EditReducer, _Reducer);

  var _super = _createSuper(EditReducer);

  function EditReducer(schema) {
    _classCallCheck(this, EditReducer);

    return _super.call(this, schema, initState);
  }

  _createClass(EditReducer, [{
    key: LOCATION_CHANGE,
    value: function value() {
      return initState;
    }
  }, {
    key: TABLE_ROW_EDIT,
    value: function value(state, action) {
      var _this = this;

      var payload = action.payload; // @ts-ignore

      var _payload = _Object$assign({}, payload),
          modelName = _payload.modelName,
          id = _payload.id,
          node = _payload.node;

      var nodeFlattened = _mapObjIndexed(function (value, fieldName) {
        var editValue = getEditValue({
          schema: _this.schema,
          modelName: modelName,
          fieldName: fieldName,
          value: value
        });
        return {
          currentValue: editValue,
          initialValue: editValue
        };
      }, node); // if id is int, assocPath() creates list instead of object


      return _assocPath([modelName, id.toString()], nodeFlattened, state);
    }
  }, {
    key: ATTRIBUTE_EDIT,
    value: function value(state, action) {
      var payload = action.payload; // @ts-ignore

      var _payload2 = _Object$assign({}, payload),
          modelName = _payload2.modelName,
          id = _payload2.id,
          fieldName = _payload2.fieldName,
          value = _payload2.value;

      var editValue = getEditValue({
        schema: this.schema,
        modelName: modelName,
        fieldName: fieldName,
        value: value
      });
      var editState = {
        initialValue: editValue,
        currentValue: editValue
      };
      return _assocPath([modelName, id.toString(), fieldName], editState, state);
    }
  }, {
    key: TABLE_EDIT_CANCEL,
    value: function value(state, action) {
      var payload = action.payload; // @ts-ignore

      var _payload3 = _Object$assign({}, payload),
          modelName = _payload3.modelName,
          id = _payload3.id; // todo: make sure works


      var newState = _dissocPath([modelName, id], state); // if no ids on that model are being edited remove the model from the edit store


      if (_isEmpty(_prop(modelName, newState))) {
        return _dissoc(modelName, state);
      }

      return newState;
    }
  }, {
    key: ATTRIBUTE_EDIT_CANCEL,
    value: function value(state, action) {
      var payload = action.payload; // @ts-ignore

      var _payload4 = _Object$assign({}, payload),
          modelName = _payload4.modelName,
          fieldName = _payload4.fieldName,
          id = _payload4.id; // Remove the field from the edit store


      state = _dissocPath([modelName, id, fieldName], state); // if the instance of the model has no fields being edited, remove it from the store

      if (_isEmpty(_path([modelName, id], state))) {
        state = _dissocPath([modelName, id], state);
      } // if no instances of the model are being edited, remove the model from the edit store


      if (_isEmpty(_prop(modelName, state))) {
        state = _dissoc(modelName, state);
      }

      return state;
    }
  }, {
    key: VALIDATION_ERROR_EDIT,
    value: function value(state, action) {
      var payload = action.payload; // @ts-ignore

      var _payload5 = _Object$assign({}, payload),
          modelName = _payload5.modelName,
          id = _payload5.id,
          fieldName = _payload5.fieldName,
          errors = _payload5.errors;

      _forEach(function (fieldNameError) {
        if (fieldNameError === fieldName) {
          state = _assocPath([modelName, id.toString(), fieldNameError, 'errors'], _prop(fieldNameError, errors), state);
        }
      }, _Object$keys(errors));

      return state;
    }
  }, {
    key: DETAIL_TABLE_EDIT_SUBMIT,
    value: function value(state, action) {
      var payload = action.payload; // @ts-ignore

      var _payload6 = _Object$assign({}, payload),
          modelName = _payload6.modelName,
          id = _payload6.id;

      var fields = _Object$keys(_path([modelName, id], state));

      _forEach(function (f) {
        state = _dissocPath(_concat([modelName, id], [f, 'errors']), state);
      }, fields);

      return state;
    }
  }, {
    key: DETAIL_ATTRIBUTE_EDIT_SUBMIT,
    value: function value(state, action) {
      var payload = action.payload; // @ts-ignore

      var _payload7 = _Object$assign({}, payload),
          modelName = _payload7.modelName,
          id = _payload7.id,
          fieldName = _payload7.fieldName;

      return _dissocPath([modelName, id, fieldName, 'errors'], state);
    }
  }, {
    key: EDIT_INPUT_CHANGE,
    value: function value(state, action) {
      var payload = action.payload; // @ts-ignore

      var _payload8 = _Object$assign({}, payload),
          modelName = _payload8.modelName,
          id = _payload8.id,
          fieldName = _payload8.fieldName,
          value = _payload8.value;

      return _assocPath([modelName, id.toString(), fieldName, 'currentValue'], value, state);
    }
  }, {
    key: VALIDATION_ERROR_TABLE_ROW,
    value: function value(state, action) {
      var payload = action.payload; // @ts-ignore

      var _payload9 = _Object$assign({}, payload),
          modelName = _payload9.modelName,
          id = _payload9.id,
          errors = _payload9.errors;

      _forEach(function (fieldNameError) {
        state = _assocPath([modelName, id.toString(), fieldNameError, 'errors'], _prop(fieldNameError, errors), state);
      }, _Object$keys(errors));

      return state;
    }
  }]);

  return EditReducer;
}(Reducer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9lZGl0LnRzIl0sIm5hbWVzIjpbImluaXRTdGF0ZSIsImdldEVkaXRWYWx1ZSIsIlRBQkxFX1JPV19FRElUIiwiQVRUUklCVVRFX0VESVQiLCJUQUJMRV9FRElUX0NBTkNFTCIsIkFUVFJJQlVURV9FRElUX0NBTkNFTCIsIlZBTElEQVRJT05fRVJST1JfRURJVCIsIkRFVEFJTF9UQUJMRV9FRElUX1NVQk1JVCIsIkRFVEFJTF9BVFRSSUJVVEVfRURJVF9TVUJNSVQiLCJFRElUX0lOUFVUX0NIQU5HRSIsIlZBTElEQVRJT05fRVJST1JfVEFCTEVfUk9XIiwiTE9DQVRJT05fQ0hBTkdFIiwiUmVkdWNlciIsIkVkaXRSZWR1Y2VyIiwic2NoZW1hIiwic3RhdGUiLCJhY3Rpb24iLCJwYXlsb2FkIiwibW9kZWxOYW1lIiwiaWQiLCJub2RlIiwibm9kZUZsYXR0ZW5lZCIsInZhbHVlIiwiZmllbGROYW1lIiwiZWRpdFZhbHVlIiwiY3VycmVudFZhbHVlIiwiaW5pdGlhbFZhbHVlIiwidG9TdHJpbmciLCJlZGl0U3RhdGUiLCJuZXdTdGF0ZSIsImVycm9ycyIsImZpZWxkTmFtZUVycm9yIiwiZmllbGRzIiwiZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLFNBQVNBLFNBQVQsRUFBb0JDLFlBQXBCLFFBQXdDLGVBQXhDO0FBQ0EsU0FDRUMsY0FERixFQUVFQyxjQUZGLEVBR0VDLGlCQUhGLEVBSUVDLHFCQUpGLEVBS0VDLHFCQUxGLEVBTUVDLHdCQU5GLEVBT0VDLDRCQVBGLEVBUUVDLGlCQVJGLEVBU0VDLDBCQVRGLFFBVU8saUJBVlA7QUFXQSxTQUFTQyxlQUFULFFBQWdDLHdCQUFoQztBQUVBLFNBQVNDLE9BQVQsUUFBd0IsV0FBeEI7QUFFQSxXQUFhQyxXQUFiO0FBQUE7O0FBQUE7O0FBQ0UsdUJBQVlDLE1BQVosRUFBbUM7QUFBQTs7QUFBQSw2QkFDM0JBLE1BRDJCLEVBQ25CZCxTQURtQjtB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QUZNLEVBR05mLEtBSE0sQ0FBUjtBQUtELE9BTkQsRUFNRyxhQUFZZSxNQUFaLENBTkg7O0FBT0EsYUFBT2YsS0FBUDtBQUNEO0FBMUlIOztBQUFBO0FBQUEsRUFBaUNILE9BQWpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSdcbmltcG9ydCB7IGluaXRTdGF0ZSwgZ2V0RWRpdFZhbHVlIH0gZnJvbSAnLi4vdXRpbHMvZWRpdCdcbmltcG9ydCB7XG4gIFRBQkxFX1JPV19FRElULFxuICBBVFRSSUJVVEVfRURJVCxcbiAgVEFCTEVfRURJVF9DQU5DRUwsXG4gIEFUVFJJQlVURV9FRElUX0NBTkNFTCxcbiAgVkFMSURBVElPTl9FUlJPUl9FRElULFxuICBERVRBSUxfVEFCTEVfRURJVF9TVUJNSVQsXG4gIERFVEFJTF9BVFRSSUJVVEVfRURJVF9TVUJNSVQsXG4gIEVESVRfSU5QVVRfQ0hBTkdFLFxuICBWQUxJREFUSU9OX0VSUk9SX1RBQkxFX1JPV1xufSBmcm9tICcuLi9hY3Rpb25Db25zdHMnXG5pbXBvcnQgeyBMT0NBVElPTl9DSEFOR0UgfSBmcm9tICdjb25uZWN0ZWQtcmVhY3Qtcm91dGVyJ1xuaW1wb3J0IHsgU2NoZW1hQnVpbGRlciB9IGZyb20gJ0BhdXRvaW52ZW50L2NvbnZleW9yLXNjaGVtYSdcbmltcG9ydCB7IFJlZHVjZXIgfSBmcm9tICcuL3JlZHVjZXInXG5cbmV4cG9ydCBjbGFzcyBFZGl0UmVkdWNlciBleHRlbmRzIFJlZHVjZXIge1xuICBjb25zdHJ1Y3RvcihzY2hlbWE6IFNjaGVtYUJ1aWxkZXIpIHtcbiAgICBzdXBlcihzY2hlbWEsIGluaXRTdGF0ZSlcbiAgfVxuXG4gIFtMT0NBVElPTl9DSEFOR0VdKCkge1xuICAgIHJldHVybiBpbml0U3RhdGVcbiAgfVxuXG4gIFtUQUJMRV9ST1dfRURJVF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBwYXlsb2FkID0gYWN0aW9uLnBheWxvYWRcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGlkLCBub2RlIH0gPSB7IC4uLnBheWxvYWQgfVxuICAgIGNvbnN0IG5vZGVGbGF0dGVuZWQgPSBSLm1hcE9iakluZGV4ZWQoKHZhbHVlLCBmaWVsZE5hbWUpID0+IHtcbiAgICAgIGNvbnN0IGVkaXRWYWx1ZSA9IGdldEVkaXRWYWx1ZSh7XG4gICAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICAgIG1vZGVsTmFtZSxcbiAgICAgICAgZmllbGROYW1lLFxuICAgICAgICB2YWx1ZVxuICAgICAgfSlcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGN1cnJlbnRWYWx1ZTogZWRpdFZhbHVlLFxuICAgICAgICBpbml0aWFsVmFsdWU6IGVkaXRWYWx1ZVxuICAgICAgfVxuICAgIH0sIG5vZGUpXG4gICAgLy8gaWYgaWQgaXMgaW50LCBhc3NvY1BhdGgoKSBjcmVhdGVzIGxpc3QgaW5zdGVhZCBvZiBvYmplY3RcbiAgICByZXR1cm4gUi5hc3NvY1BhdGgoW21vZGVsTmFtZSwgaWQudG9TdHJpbmcoKV0sIG5vZGVGbGF0dGVuZWQsIHN0YXRlKVxuICB9XG5cbiAgW0FUVFJJQlVURV9FRElUXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBhY3Rpb24ucGF5bG9hZFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCB7IG1vZGVsTmFtZSwgaWQsIGZpZWxkTmFtZSwgdmFsdWUgfSA9IHsgLi4ucGF5bG9hZCB9XG4gICAgY29uc3QgZWRpdFZhbHVlID0gZ2V0RWRpdFZhbHVlKHtcbiAgICAgIHNjaGVtYTogdGhpcy5zY2hlbWEsXG4gICAgICBtb2RlbE5hbWUsXG4gICAgICBmaWVsZE5hbWUsXG4gICAgICB2YWx1ZVxuICAgIH0pXG4gICAgY29uc3QgZWRpdFN0YXRlID0ge1xuICAgICAgaW5pdGlhbFZhbHVlOiBlZGl0VmFsdWUsXG4gICAgICBjdXJyZW50VmFsdWU6IGVkaXRWYWx1ZVxuICAgIH1cbiAgICByZXR1cm4gUi5hc3NvY1BhdGgoW21vZGVsTmFtZSwgaWQudG9TdHJpbmcoKSwgZmllbGROYW1lXSwgZWRpdFN0YXRlLCBzdGF0ZSlcbiAgfVxuXG4gIFtUQUJMRV9FRElUX0NBTkNFTF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBwYXlsb2FkID0gYWN0aW9uLnBheWxvYWRcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGlkIH0gPSB7IC4uLnBheWxvYWQgfVxuICAgIC8vIHRvZG86IG1ha2Ugc3VyZSB3b3Jrc1xuICAgIGNvbnN0IG5ld1N0YXRlID0gUi5kaXNzb2NQYXRoKFttb2RlbE5hbWUsIGlkXSwgc3RhdGUpXG5cbiAgICAvLyBpZiBubyBpZHMgb24gdGhhdCBtb2RlbCBhcmUgYmVpbmcgZWRpdGVkIHJlbW92ZSB0aGUgbW9kZWwgZnJvbSB0aGUgZWRpdCBzdG9yZVxuICAgIGlmIChSLmlzRW1wdHkoUi5wcm9wKG1vZGVsTmFtZSwgbmV3U3RhdGUpKSkge1xuICAgICAgcmV0dXJuIFIuZGlzc29jKG1vZGVsTmFtZSwgc3RhdGUpXG4gICAgfVxuICAgIHJldHVybiBuZXdTdGF0ZVxuICB9XG5cbiAgW0FUVFJJQlVURV9FRElUX0NBTkNFTF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBwYXlsb2FkID0gYWN0aW9uLnBheWxvYWRcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgaWQgfSA9IHsgLi4ucGF5bG9hZCB9XG5cbiAgICAvLyBSZW1vdmUgdGhlIGZpZWxkIGZyb20gdGhlIGVkaXQgc3RvcmVcbiAgICBzdGF0ZSA9IFIuZGlzc29jUGF0aChbbW9kZWxOYW1lLCBpZCwgZmllbGROYW1lXSwgc3RhdGUpXG5cbiAgICAvLyBpZiB0aGUgaW5zdGFuY2Ugb2YgdGhlIG1vZGVsIGhhcyBubyBmaWVsZHMgYmVpbmcgZWRpdGVkLCByZW1vdmUgaXQgZnJvbSB0aGUgc3RvcmVcbiAgICBpZiAoUi5pc0VtcHR5KFIucGF0aChbbW9kZWxOYW1lLCBpZF0sIHN0YXRlKSkpIHtcbiAgICAgIHN0YXRlID0gUi5kaXNzb2NQYXRoKFttb2RlbE5hbWUsIGlkXSwgc3RhdGUpXG4gICAgfVxuXG4gICAgLy8gaWYgbm8gaW5zdGFuY2VzIG9mIHRoZSBtb2RlbCBhcmUgYmVpbmcgZWRpdGVkLCByZW1vdmUgdGhlIG1vZGVsIGZyb20gdGhlIGVkaXQgc3RvcmVcbiAgICBpZiAoUi5pc0VtcHR5KFIucHJvcChtb2RlbE5hbWUsIHN0YXRlKSkpIHtcbiAgICAgIHN0YXRlID0gUi5kaXNzb2MobW9kZWxOYW1lLCBzdGF0ZSlcbiAgICB9XG4gICAgcmV0dXJuIHN0YXRlXG4gIH1cblxuICBbVkFMSURBVElPTl9FUlJPUl9FRElUXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBhY3Rpb24ucGF5bG9hZFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCB7IG1vZGVsTmFtZSwgaWQsIGZpZWxkTmFtZSwgZXJyb3JzIH0gPSB7IC4uLnBheWxvYWQgfVxuICAgIFIuZm9yRWFjaChmaWVsZE5hbWVFcnJvciA9PiB7XG4gICAgICBpZiAoZmllbGROYW1lRXJyb3IgPT09IGZpZWxkTmFtZSkge1xuICAgICAgICBzdGF0ZSA9IFIuYXNzb2NQYXRoKFxuICAgICAgICAgIFttb2RlbE5hbWUsIGlkLnRvU3RyaW5nKCksIGZpZWxkTmFtZUVycm9yLCAnZXJyb3JzJ10sXG4gICAgICAgICAgUi5wcm9wKGZpZWxkTmFtZUVycm9yLCBlcnJvcnMpLFxuICAgICAgICAgIHN0YXRlXG4gICAgICAgIClcbiAgICAgIH1cbiAgICB9LCBPYmplY3Qua2V5cyhlcnJvcnMpKVxuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgW0RFVEFJTF9UQUJMRV9FRElUX1NVQk1JVF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBwYXlsb2FkID0gYWN0aW9uLnBheWxvYWRcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGlkIH0gPSB7IC4uLnBheWxvYWQgfVxuICAgIGNvbnN0IGZpZWxkcyA9IE9iamVjdC5rZXlzKFIucGF0aChbbW9kZWxOYW1lLCBpZF0sIHN0YXRlKSBhcyBhbnkpXG4gICAgUi5mb3JFYWNoKGYgPT4ge1xuICAgICAgc3RhdGUgPSBSLmRpc3NvY1BhdGgoUi5jb25jYXQoW21vZGVsTmFtZSwgaWRdLCBbZiwgJ2Vycm9ycyddKSwgc3RhdGUpXG4gICAgfSwgZmllbGRzKVxuICAgIHJldHVybiBzdGF0ZVxuICB9XG5cbiAgW0RFVEFJTF9BVFRSSUJVVEVfRURJVF9TVUJNSVRdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGFjdGlvbi5wYXlsb2FkXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHsgbW9kZWxOYW1lLCBpZCwgZmllbGROYW1lIH0gPSB7IC4uLnBheWxvYWQgfVxuICAgIHJldHVybiBSLmRpc3NvY1BhdGgoW21vZGVsTmFtZSwgaWQsIGZpZWxkTmFtZSwgJ2Vycm9ycyddLCBzdGF0ZSlcbiAgfVxuXG4gIFtFRElUX0lOUFVUX0NIQU5HRV0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBwYXlsb2FkID0gYWN0aW9uLnBheWxvYWRcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGlkLCBmaWVsZE5hbWUsIHZhbHVlIH0gPSB7IC4uLnBheWxvYWQgfVxuXG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKFxuICAgICAgW21vZGVsTmFtZSwgaWQudG9TdHJpbmcoKSwgZmllbGROYW1lLCAnY3VycmVudFZhbHVlJ10sXG4gICAgICB2YWx1ZSxcbiAgICAgIHN0YXRlXG4gICAgKVxuICB9XG5cbiAgW1ZBTElEQVRJT05fRVJST1JfVEFCTEVfUk9XXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBhY3Rpb24ucGF5bG9hZFxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCB7IG1vZGVsTmFtZSwgaWQsIGVycm9ycyB9ID0geyAuLi5wYXlsb2FkIH1cbiAgICBSLmZvckVhY2goZmllbGROYW1lRXJyb3IgPT4ge1xuICAgICAgc3RhdGUgPSBSLmFzc29jUGF0aChcbiAgICAgICAgW21vZGVsTmFtZSwgaWQudG9TdHJpbmcoKSwgZmllbGROYW1lRXJyb3IsICdlcnJvcnMnXSxcbiAgICAgICAgUi5wcm9wKGZpZWxkTmFtZUVycm9yLCBlcnJvcnMpLFxuICAgICAgICBzdGF0ZVxuICAgICAgKVxuICAgIH0sIE9iamVjdC5rZXlzKGVycm9ycykpXG4gICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cbiJdfQ==