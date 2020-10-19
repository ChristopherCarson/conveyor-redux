import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _path from "ramda/src/path";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { UPDATE_DELETE_DETAIL, CANCEL_DELETE_DETAIL } from '../actionConsts';
import { initState, groupModels } from '../utils/modal';
import { Reducer } from './reducer';
export var ModalReducer = /*#__PURE__*/function (_Reducer) {
  _inherits(ModalReducer, _Reducer);

  var _super = _createSuper(ModalReducer);

  function ModalReducer(schema) {
    _classCallCheck(this, ModalReducer);

    return _super.call(this, schema, initState);
  }

  _createClass(ModalReducer, [{
    key: UPDATE_DELETE_DETAIL,
    value: function value(state, action) {
      var deletes = _path(['payload', 'data'], action);

      var groupedData = groupModels(deletes, '__typename');
      return _Object$assign({}, state, {
        Delete: groupedData
      });
    }
  }, {
    key: CANCEL_DELETE_DETAIL,
    value: function value(state) {
      return _Object$assign({}, state, {
        Delete: undefined
      });
    }
  }]);

  return ModalReducer;
}(Reducer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tb2RhbC50cyJdLCJuYW1lcyI6WyJVUERBVEVfREVMRVRFX0RFVEFJTCIsIkNBTkNFTF9ERUxFVEVfREVUQUlMIiwiaW5pdFN0YXRlIiwiZ3JvdXBNb2RlbHMiLCJSZWR1Y2VyIiwiTW9kYWxSZWR1Y2VyIiwic2NoZW1hIiwic3RhdGUiLCJhY3Rpb24iLCJkZWxldGVzIiwiZ3JvdXBlZERhdGEiLCJEZWxldGUiLCJ1bmRlZmluZWQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxTQUFTQSxvQkFBVCxFQUErQkMsb0JBQS9CLFFBQTJELGlCQUEzRDtBQUNBLFNBQVNDLFNBQVQsRUFBb0JDLFdBQXBCLFFBQXVDLGdCQUF2QztBQUVBLFNBQVNDLE9BQVQsUUFBd0IsV0FBeEI7QUFFQSxXQUFhQyxZQUFiO0FBQUE7O0FBQUE7O0FBQ0Usd0JBQVlDLE1BQVosRUFBbUM7QUFBQTs7QUFBQSw2QkFDM0JBLE1BRDJCLEVBQ25CSixTQURtQjtBQUVsQzs7QUFISDtBQUFBLFNBS0dGLG9CQUxIO0FBQUEsMEJBS3lCTyxLQUx6QixFQUtxQ0MsTUFMckMsRUFLa0Q7QUFDOUMsVUFBTUMsT0FBTyxHQUFHLE1BQU8sQ0FBQyxTQUFELEVBQVksTUFBWixDQUFQLEVBQTRCRCxNQUE1QixDQUFoQjs7QUFDQSxVQUFNRSxXQUFXLEdBQUdQLFdBQVcsQ0FBQ00sT0FBRCxFQUFVLFlBQVYsQ0FBL0I7QUFDQSxnQ0FBWUYsS0FBWjtBQUFtQkksUUFBQUEsTUFBTSxFQUFFRDtBQUEzQjtBQUNEO0FBVEg7QUFBQSxTQVdHVCxvQkFYSDtBQUFBLDBCQVd5Qk0sS0FYekIsRUFXcUM7QUFDakMsZ0NBQVlBLEtBQVo7QUFBbUJJLFFBQUFBLE1BQU0sRUFBRUM7QUFBM0I7QUFDRDtBQWJIOztBQUFBO0FBQUEsRUFBa0NSLE9BQWxDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSdcbmltcG9ydCB7IFVQREFURV9ERUxFVEVfREVUQUlMLCBDQU5DRUxfREVMRVRFX0RFVEFJTCB9IGZyb20gJy4uL2FjdGlvbkNvbnN0cydcbmltcG9ydCB7IGluaXRTdGF0ZSwgZ3JvdXBNb2RlbHMgfSBmcm9tICcuLi91dGlscy9tb2RhbCdcbmltcG9ydCB7IFNjaGVtYUJ1aWxkZXIgfSBmcm9tICdAYXV0b2ludmVudC9jb252ZXlvci1zY2hlbWEnXG5pbXBvcnQgeyBSZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2VyJ1xuXG5leHBvcnQgY2xhc3MgTW9kYWxSZWR1Y2VyIGV4dGVuZHMgUmVkdWNlciB7XG4gIGNvbnN0cnVjdG9yKHNjaGVtYTogU2NoZW1hQnVpbGRlcikge1xuICAgIHN1cGVyKHNjaGVtYSwgaW5pdFN0YXRlKVxuICB9XG5cbiAgW1VQREFURV9ERUxFVEVfREVUQUlMXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IGRlbGV0ZXMgPSBSLnBhdGgoWydwYXlsb2FkJywgJ2RhdGEnXSwgYWN0aW9uKVxuICAgIGNvbnN0IGdyb3VwZWREYXRhID0gZ3JvdXBNb2RlbHMoZGVsZXRlcywgJ19fdHlwZW5hbWUnKVxuICAgIHJldHVybiB7IC4uLnN0YXRlLCBEZWxldGU6IGdyb3VwZWREYXRhIH1cbiAgfVxuXG4gIFtDQU5DRUxfREVMRVRFX0RFVEFJTF0oc3RhdGU6IGFueSkge1xuICAgIHJldHVybiB7IC4uLnN0YXRlLCBEZWxldGU6IHVuZGVmaW5lZCB9XG4gIH1cbn1cbiJdfQ==