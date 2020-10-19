import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _prop from "ramda/src/prop";
import _filterInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/filter";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { initState, handleError } from '../utils/alerts';
import { ADD_DANGER_ALERT, ADD_SUCCESS_ALERT, DISMISS_ALERT } from '../actionConsts';
import { Reducer } from './reducer';
export var AlertsReducer = /*#__PURE__*/function (_Reducer) {
  _inherits(AlertsReducer, _Reducer);

  var _super = _createSuper(AlertsReducer);

  function AlertsReducer(schema) {
    _classCallCheck(this, AlertsReducer);

    return _super.call(this, schema, initState);
  }

  _createClass(AlertsReducer, [{
    key: ADD_DANGER_ALERT,
    value: function value(state, action) {
      var _context;

      return _concatInstanceProperty(_context = []).call(_context, _toConsumableArray(state), [handleError({
        payload: action.payload,
        type: 'danger'
      })]);
    }
  }, {
    key: ADD_SUCCESS_ALERT,
    value: function value(state, action) {
      var _context2;

      return _concatInstanceProperty(_context2 = []).call(_context2, _toConsumableArray(state), [handleError({
        payload: action.payload,
        type: 'success'
      })]);
    }
  }, {
    key: DISMISS_ALERT,
    value: function value(state, action) {
      return _filterInstanceProperty(state).call(state, function (obj) {
        return _prop('expiresOn', obj) > _prop('expiresOn', action.payload);
      });
    }
  }]);

  return AlertsReducer;
}(Reducer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9hbGVydHMudHMiXSwibmFtZXMiOlsiaW5pdFN0YXRlIiwiaGFuZGxlRXJyb3IiLCJBRERfREFOR0VSX0FMRVJUIiwiQUREX1NVQ0NFU1NfQUxFUlQiLCJESVNNSVNTX0FMRVJUIiwiUmVkdWNlciIsIkFsZXJ0c1JlZHVjZXIiLCJzY2hlbWEiLCJzdGF0ZSIsImFjdGlvbiIsInBheWxvYWQiLCJ0eXBlIiwib2JqIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxTQUFTQSxTQUFULEVBQW9CQyxXQUFwQixRQUF1QyxpQkFBdkM7QUFDQSxTQUNFQyxnQkFERixFQUVFQyxpQkFGRixFQUdFQyxhQUhGLFFBSU8saUJBSlA7QUFNQSxTQUFTQyxPQUFULFFBQXdCLFdBQXhCO0FBR0EsV0FBYUMsYUFBYjtBQUFBOztBQUFBOztBQUNFLHlCQUFZQyxNQUFaLEVBQW1DO0FBQUE7O0FBQUEsNkJBQzNCQSxNQUQyQixFQUNuQlAsU0FEbUI7QUFFbEM7O0FBSEg7QUFBQSxTQUtHRSxnQkFMSDtBQUFBLDBCQUtxQk0sS0FMckIsRUFLaUNDLE1BTGpDLEVBSzhDO0FBQUE7O0FBQzFDLHNGQUFXRCxLQUFYLElBQWtCUCxXQUFXLENBQUM7QUFBRVMsUUFBQUEsT0FBTyxFQUFFRCxNQUFNLENBQUNDLE9BQWxCO0FBQTJCQyxRQUFBQSxJQUFJLEVBQUU7QUFBakMsT0FBRCxDQUE3QjtBQUNEO0FBUEg7QUFBQSxTQVFHUixpQkFSSDtBQUFBLDBCQVFzQkssS0FSdEIsRUFRa0NDLE1BUmxDLEVBUStDO0FBQUE7O0FBQzNDLHdGQUFXRCxLQUFYLElBQWtCUCxXQUFXLENBQUM7QUFBRVMsUUFBQUEsT0FBTyxFQUFFRCxNQUFNLENBQUNDLE9BQWxCO0FBQTJCQyxRQUFBQSxJQUFJLEVBQUU7QUFBakMsT0FBRCxDQUE3QjtBQUNEO0FBVkg7QUFBQSxTQVdHUCxhQVhIO0FBQUEsMEJBV2tCSSxLQVhsQixFQVc4QkMsTUFYOUIsRUFXMkM7QUFDdkMsYUFBTyx3QkFBQUQsS0FBSyxNQUFMLENBQUFBLEtBQUssRUFDVixVQUFDSSxHQUFEO0FBQUEsZUFDRSxNQUFPLFdBQVAsRUFBb0JBLEdBQXBCLElBQTJCLE1BQU8sV0FBUCxFQUFvQkgsTUFBTSxDQUFDQyxPQUEzQixDQUQ3QjtBQUFBLE9BRFUsQ0FBWjtBQUlEO0FBaEJIOztBQUFBO0FBQUEsRUFBbUNMLE9BQW5DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdFN0YXRlLCBoYW5kbGVFcnJvciB9IGZyb20gJy4uL3V0aWxzL2FsZXJ0cydcbmltcG9ydCB7XG4gIEFERF9EQU5HRVJfQUxFUlQsXG4gIEFERF9TVUNDRVNTX0FMRVJULFxuICBESVNNSVNTX0FMRVJUXG59IGZyb20gJy4uL2FjdGlvbkNvbnN0cydcbmltcG9ydCB7IFNjaGVtYUJ1aWxkZXIgfSBmcm9tICdAYXV0b2ludmVudC9jb252ZXlvci1zY2hlbWEnXG5pbXBvcnQgeyBSZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2VyJ1xuaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSdcblxuZXhwb3J0IGNsYXNzIEFsZXJ0c1JlZHVjZXIgZXh0ZW5kcyBSZWR1Y2VyIHtcbiAgY29uc3RydWN0b3Ioc2NoZW1hOiBTY2hlbWFCdWlsZGVyKSB7XG4gICAgc3VwZXIoc2NoZW1hLCBpbml0U3RhdGUpXG4gIH1cblxuICBbQUREX0RBTkdFUl9BTEVSVF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICByZXR1cm4gWy4uLnN0YXRlLCBoYW5kbGVFcnJvcih7IHBheWxvYWQ6IGFjdGlvbi5wYXlsb2FkLCB0eXBlOiAnZGFuZ2VyJyB9KV1cbiAgfVxuICBbQUREX1NVQ0NFU1NfQUxFUlRdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgcmV0dXJuIFsuLi5zdGF0ZSwgaGFuZGxlRXJyb3IoeyBwYXlsb2FkOiBhY3Rpb24ucGF5bG9hZCwgdHlwZTogJ3N1Y2Nlc3MnIH0pXVxuICB9XG4gIFtESVNNSVNTX0FMRVJUXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIHJldHVybiBzdGF0ZS5maWx0ZXIoXG4gICAgICAob2JqOiBhbnkpID0+XG4gICAgICAgIFIucHJvcCgnZXhwaXJlc09uJywgb2JqKSA+IFIucHJvcCgnZXhwaXJlc09uJywgYWN0aW9uLnBheWxvYWQpXG4gICAgKVxuICB9XG59XG4iXX0=