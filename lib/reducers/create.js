import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _path from "ramda/src/path";
import _assoc from "ramda/src/assoc";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { initState, handleCreateInputChange, handleStackPop, handleClearErrorSave, handleStackPush, handleDetailCreate, handleEnterFormStack, handleValidationErrorCreate } from '../utils/create';
import { CREATE_INPUT_CHANGE, CANCEL_CREATE, SAVE_CREATE_SUCCESSFUL, SAVE_CREATE, STACK_CREATE, DETAIL_CREATE, INDEX_CREATE, UPDATE_FORM_STACK_INDEX, VALIDATION_ERROR_CREATE } from '../actionConsts';
import { Reducer } from './reducer';
export var CreateReducer = /*#__PURE__*/function (_Reducer) {
  _inherits(CreateReducer, _Reducer);

  var _super = _createSuper(CreateReducer);

  function CreateReducer(schema) {
    _classCallCheck(this, CreateReducer);

    return _super.call(this, schema, initState);
  }

  _createClass(CreateReducer, [{
    key: CREATE_INPUT_CHANGE,
    value: function value(state, action) {
      return handleCreateInputChange(state, action);
    }
  }, {
    key: CANCEL_CREATE,
    value: function value(state) {
      return handleStackPop(state);
    }
  }, {
    key: SAVE_CREATE_SUCCESSFUL,
    value: function value(state) {
      return handleStackPop(state);
    }
  }, {
    key: SAVE_CREATE,
    value: function value(state) {
      return handleClearErrorSave(state);
    }
  }, {
    key: STACK_CREATE,
    value: function value(state, action) {
      return handleStackPush(state, action);
    }
  }, {
    key: DETAIL_CREATE,
    value: function value(state, action) {
      return handleDetailCreate(this.schema, state, action);
    }
  }, {
    key: INDEX_CREATE,
    value: function value(state, action) {
      return handleEnterFormStack(state, action);
    }
  }, {
    key: UPDATE_FORM_STACK_INDEX,
    value: function value(state, action) {
      return _assoc('index', _path(['payload', 'index'], action), state);
    }
  }, {
    key: VALIDATION_ERROR_CREATE,
    value: function value(state, action) {
      return handleValidationErrorCreate(state, action);
    }
  }]);

  return CreateReducer;
}(Reducer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9jcmVhdGUudHMiXSwibmFtZXMiOlsiaW5pdFN0YXRlIiwiaGFuZGxlQ3JlYXRlSW5wdXRDaGFuZ2UiLCJoYW5kbGVTdGFja1BvcCIsImhhbmRsZUNsZWFyRXJyb3JTYXZlIiwiaGFuZGxlU3RhY2tQdXNoIiwiaGFuZGxlRGV0YWlsQ3JlYXRlIiwiaGFuZGxlRW50ZXJGb3JtU3RhY2siLCJoYW5kbGVWYWxpZGF0aW9uRXJyb3JDcmVhdGUiLCJDUkVBVEVfSU5QVVRfQ0hBTkdFIiwiQ0FOQ0VMX0NSRUFURSIsIlNBVkVfQ1JFQVRFX1NVQ0NFU1NGVUwiLCJTQVZFX0NSRUFURSIsIlNUQUNLX0NSRUFURSIsIkRFVEFJTF9DUkVBVEUiLCJJTkRFWF9DUkVBVEUiLCJVUERBVEVfRk9STV9TVEFDS19JTkRFWCIsIlZBTElEQVRJT05fRVJST1JfQ1JFQVRFIiwiUmVkdWNlciIsIkNyZWF0ZVJlZHVjZXIiLCJzY2hlbWEiLCJzdGF0ZSIsImFjdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLFNBQ0VBLFNBREYsRUFFRUMsdUJBRkYsRUFHRUMsY0FIRixFQUlFQyxvQkFKRixFQUtFQyxlQUxGLEVBTUVDLGtCQU5GLEVBT0VDLG9CQVBGLEVBUUVDLDJCQVJGLFFBU08saUJBVFA7QUFVQSxTQUNFQyxtQkFERixFQUVFQyxhQUZGLEVBR0VDLHNCQUhGLEVBSUVDLFdBSkYsRUFLRUMsWUFMRixFQU1FQyxhQU5GLEVBT0VDLFlBUEYsRUFRRUMsdUJBUkYsRUFTRUMsdUJBVEYsUUFVTyxpQkFWUDtBQVdBLFNBQVNDLE9BQVQsUUFBd0IsV0FBeEI7QUFHQSxXQUFhQyxhQUFiO0FBQUE7O0FBQUE7O0FBQ0UseUJBQVlDLE1BQVosRUFBbUM7QUFBQTs7QUFBQSw2QkFDM0JBLE1BRDJCLEVBQ25CbkIsU0FEbUI7QUFFbEM7O0FBSEg7QUFBQSxTQUtHUSxtQkFMSDtBQUFBLDBCQUt3QlksS0FMeEIsRUFLb0NDLE1BTHBDLEVBS2lEO0FBQzdDLGFBQU9wQix1QkFBdUIsQ0FBQ21CLEtBQUQsRUFBUUMsTUFBUixDQUE5QjtBQUNEO0FBUEg7QUFBQSxTQVNHWixhQVRIO0FBQUEsMEJBU2tCVyxLQVRsQixFQVM4QjtBQUMxQixhQUFPbEIsY0FBYyxDQUFDa0IsS0FBRCxDQUFyQjtBQUNEO0FBWEg7QUFBQSxTQWFHVixzQkFiSDtBQUFBLDBCQWEyQlUsS0FiM0IsRUFhdUM7QUFDbkMsYUFBT2xCLGNBQWMsQ0FBQ2tCLEtBQUQsQ0FBckI7QUFDRDtBQWZIO0FBQUEsU0FpQkdULFdBakJIO0FBQUEsMEJBaUJnQlMsS0FqQmhCLEVBaUI0QjtBQUN4QixhQUFPakIsb0JBQW9CLENBQUNpQixLQUFELENBQTNCO0FBQ0Q7QUFuQkg7QUFBQSxTQXFCR1IsWUFyQkg7QUFBQSwwQkFxQmlCUSxLQXJCakIsRUFxQjZCQyxNQXJCN0IsRUFxQjBDO0FBQ3RDLGFBQU9qQixlQUFlLENBQUNnQixLQUFELEVBQVFDLE1BQVIsQ0FBdEI7QUFDRDtBQXZCSDtBQUFBLFNBeUJHUixhQXpCSDtBQUFBLDBCQXlCa0JPLEtBekJsQixFQXlCOEJDLE1BekI5QixFQXlCMkM7QUFDdkMsYUFBT2hCLGtCQUFrQixDQUFDLEtBQUtjLE1BQU4sRUFBY0MsS0FBZCxFQUFxQkMsTUFBckIsQ0FBekI7QUFDRDtBQTNCSDtBQUFBLFNBNkJHUCxZQTdCSDtBQUFBLDBCQTZCaUJNLEtBN0JqQixFQTZCNkJDLE1BN0I3QixFQTZCMEM7QUFDdEMsYUFBT2Ysb0JBQW9CLENBQUNjLEtBQUQsRUFBUUMsTUFBUixDQUEzQjtBQUNEO0FBL0JIO0FBQUEsU0FpQ0dOLHVCQWpDSDtBQUFBLDBCQWlDNEJLLEtBakM1QixFQWlDd0NDLE1BakN4QyxFQWlDcUQ7QUFDakQsYUFBTyxPQUFRLE9BQVIsRUFBaUIsTUFBTyxDQUFDLFNBQUQsRUFBWSxPQUFaLENBQVAsRUFBNkJBLE1BQTdCLENBQWpCLEVBQXVERCxLQUF2RCxDQUFQO0FBQ0Q7QUFuQ0g7QUFBQSxTQXFDR0osdUJBckNIO0FBQUEsMEJBcUM0QkksS0FyQzVCLEVBcUN3Q0MsTUFyQ3hDLEVBcUNxRDtBQUNqRCxhQUFPZCwyQkFBMkIsQ0FBQ2EsS0FBRCxFQUFRQyxNQUFSLENBQWxDO0FBQ0Q7QUF2Q0g7O0FBQUE7QUFBQSxFQUFtQ0osT0FBbkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHtcbiAgaW5pdFN0YXRlLFxuICBoYW5kbGVDcmVhdGVJbnB1dENoYW5nZSxcbiAgaGFuZGxlU3RhY2tQb3AsXG4gIGhhbmRsZUNsZWFyRXJyb3JTYXZlLFxuICBoYW5kbGVTdGFja1B1c2gsXG4gIGhhbmRsZURldGFpbENyZWF0ZSxcbiAgaGFuZGxlRW50ZXJGb3JtU3RhY2ssXG4gIGhhbmRsZVZhbGlkYXRpb25FcnJvckNyZWF0ZVxufSBmcm9tICcuLi91dGlscy9jcmVhdGUnXG5pbXBvcnQge1xuICBDUkVBVEVfSU5QVVRfQ0hBTkdFLFxuICBDQU5DRUxfQ1JFQVRFLFxuICBTQVZFX0NSRUFURV9TVUNDRVNTRlVMLFxuICBTQVZFX0NSRUFURSxcbiAgU1RBQ0tfQ1JFQVRFLFxuICBERVRBSUxfQ1JFQVRFLFxuICBJTkRFWF9DUkVBVEUsXG4gIFVQREFURV9GT1JNX1NUQUNLX0lOREVYLFxuICBWQUxJREFUSU9OX0VSUk9SX0NSRUFURVxufSBmcm9tICcuLi9hY3Rpb25Db25zdHMnXG5pbXBvcnQgeyBSZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2VyJ1xuaW1wb3J0IHsgU2NoZW1hQnVpbGRlciB9IGZyb20gJ0BhdXRvaW52ZW50L2NvbnZleW9yLXNjaGVtYSdcblxuZXhwb3J0IGNsYXNzIENyZWF0ZVJlZHVjZXIgZXh0ZW5kcyBSZWR1Y2VyIHtcbiAgY29uc3RydWN0b3Ioc2NoZW1hOiBTY2hlbWFCdWlsZGVyKSB7XG4gICAgc3VwZXIoc2NoZW1hLCBpbml0U3RhdGUpXG4gIH1cblxuICBbQ1JFQVRFX0lOUFVUX0NIQU5HRV0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICByZXR1cm4gaGFuZGxlQ3JlYXRlSW5wdXRDaGFuZ2Uoc3RhdGUsIGFjdGlvbilcbiAgfVxuXG4gIFtDQU5DRUxfQ1JFQVRFXShzdGF0ZTogYW55KSB7XG4gICAgcmV0dXJuIGhhbmRsZVN0YWNrUG9wKHN0YXRlKVxuICB9XG5cbiAgW1NBVkVfQ1JFQVRFX1NVQ0NFU1NGVUxdKHN0YXRlOiBhbnkpIHtcbiAgICByZXR1cm4gaGFuZGxlU3RhY2tQb3Aoc3RhdGUpXG4gIH1cblxuICBbU0FWRV9DUkVBVEVdKHN0YXRlOiBhbnkpIHtcbiAgICByZXR1cm4gaGFuZGxlQ2xlYXJFcnJvclNhdmUoc3RhdGUpXG4gIH1cblxuICBbU1RBQ0tfQ1JFQVRFXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIHJldHVybiBoYW5kbGVTdGFja1B1c2goc3RhdGUsIGFjdGlvbilcbiAgfVxuXG4gIFtERVRBSUxfQ1JFQVRFXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIHJldHVybiBoYW5kbGVEZXRhaWxDcmVhdGUodGhpcy5zY2hlbWEsIHN0YXRlLCBhY3Rpb24pXG4gIH1cblxuICBbSU5ERVhfQ1JFQVRFXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIHJldHVybiBoYW5kbGVFbnRlckZvcm1TdGFjayhzdGF0ZSwgYWN0aW9uKVxuICB9XG5cbiAgW1VQREFURV9GT1JNX1NUQUNLX0lOREVYXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIHJldHVybiBSLmFzc29jKCdpbmRleCcsIFIucGF0aChbJ3BheWxvYWQnLCAnaW5kZXgnXSwgYWN0aW9uKSwgc3RhdGUpXG4gIH1cblxuICBbVkFMSURBVElPTl9FUlJPUl9DUkVBVEVdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgcmV0dXJuIGhhbmRsZVZhbGlkYXRpb25FcnJvckNyZWF0ZShzdGF0ZSwgYWN0aW9uKVxuICB9XG59XG4iXX0=