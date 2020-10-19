import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _Date$now from "@babel/runtime-corejs3/core-js-stable/date/now";
import _prop from "ramda/src/prop";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { ofType } from 'redux-observable';
import { map, mergeMap, delay, filter } from 'rxjs/operators';
import * as Actions from '../actions';
import { ADD_SUCCESS_ALERT, ADD_DANGER_ALERT } from '../actionConsts';
import { of } from 'rxjs';
import { Epic } from './epic';
export var AlertEpic = /*#__PURE__*/function (_Epic) {
  _inherits(AlertEpic, _Epic);

  var _super = _createSuper(AlertEpic);

  function AlertEpic() {
    _classCallCheck(this, AlertEpic);

    return _super.apply(this, arguments);
  }

  _createClass(AlertEpic, [{
    key: ADD_DANGER_ALERT,
    value: function value(action$) {
      return action$.pipe(ofType(ADD_DANGER_ALERT), map(_prop('payload')), filter(function (payload) {
        return _prop('expiresOn', payload) !== undefined;
      }), mergeMap(function (payload) {
        // @ts-ignore
        var timeOfAlertDismiss = _prop('expiresOn', payload) - _Date$now();

        return of(Actions.dismissAlert(payload)).pipe(delay(timeOfAlertDismiss));
      }));
    }
  }, {
    key: ADD_SUCCESS_ALERT,
    value: function value(action$) {
      return action$.pipe(ofType(ADD_SUCCESS_ALERT), map(_prop('payload')), filter(function (payload) {
        return _prop('expiresOn', payload) !== undefined;
      }), mergeMap(function (payload) {
        // @ts-ignore
        var timeOfAlertDismiss = _prop('expiresOn', payload) - _Date$now();

        return of(Actions.dismissAlert(payload)).pipe(delay(timeOfAlertDismiss));
      }));
    }
  }]);

  return AlertEpic;
}(Epic);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy9hbGVydC50cyJdLCJuYW1lcyI6WyJvZlR5cGUiLCJtYXAiLCJtZXJnZU1hcCIsImRlbGF5IiwiZmlsdGVyIiwiQWN0aW9ucyIsIkFERF9TVUNDRVNTX0FMRVJUIiwiQUREX0RBTkdFUl9BTEVSVCIsIm9mIiwiRXBpYyIsIkFsZXJ0RXBpYyIsImFjdGlvbiQiLCJwaXBlIiwicGF5bG9hZCIsInVuZGVmaW5lZCIsInRpbWVPZkFsZXJ0RGlzbWlzcyIsImRpc21pc3NBbGVydCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLE1BQVQsUUFBdUIsa0JBQXZCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxRQUFkLEVBQXdCQyxLQUF4QixFQUErQkMsTUFBL0IsUUFBNkMsZ0JBQTdDO0FBQ0EsT0FBTyxLQUFLQyxPQUFaLE1BQXlCLFlBQXpCO0FBQ0EsU0FBU0MsaUJBQVQsRUFBNEJDLGdCQUE1QixRQUFvRCxpQkFBcEQ7QUFDQSxTQUFTQyxFQUFULFFBQW1CLE1BQW5CO0FBRUEsU0FBU0MsSUFBVCxRQUFxQixRQUFyQjtBQUVBLFdBQWFDLFNBQWI7QUFBQTs7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQSxTQUNHSCxnQkFESDtBQUFBLDBCQUNxQkksT0FEckIsRUFDbUM7QUFDL0IsYUFBT0EsT0FBTyxDQUFDQyxJQUFSLENBQ0xaLE1BQU0sQ0FBQ08sZ0JBQUQsQ0FERCxFQUVMTixHQUFHLENBQUMsTUFBTyxTQUFQLENBQUQsQ0FGRSxFQUdMRyxNQUFNLENBQ0osVUFBQ1MsT0FBRDtBQUFBLGVBQTBCLE1BQU8sV0FBUCxFQUFvQkEsT0FBcEIsTUFBaUNDLFNBQTNEO0FBQUEsT0FESSxDQUhELEVBTUxaLFFBQVEsQ0FBQyxVQUFDVyxPQUFELEVBQTBCO0FBQ2pDO0FBQ0EsWUFBTUUsa0JBQWtCLEdBQUcsTUFBTyxXQUFQLEVBQW9CRixPQUFwQixJQUErQixXQUExRDs7QUFDQSxlQUFPTCxFQUFFLENBQUNILE9BQU8sQ0FBQ1csWUFBUixDQUFxQkgsT0FBckIsQ0FBRCxDQUFGLENBQWtDRCxJQUFsQyxDQUF1Q1QsS0FBSyxDQUFDWSxrQkFBRCxDQUE1QyxDQUFQO0FBQ0QsT0FKTyxDQU5ILENBQVA7QUFZRDtBQWRIO0FBQUEsU0FnQkdULGlCQWhCSDtBQUFBLDBCQWdCc0JLLE9BaEJ0QixFQWdCb0M7QUFDaEMsYUFBT0EsT0FBTyxDQUFDQyxJQUFSLENBQ0xaLE1BQU0sQ0FBQ00saUJBQUQsQ0FERCxFQUVMTCxHQUFHLENBQUMsTUFBTyxTQUFQLENBQUQsQ0FGRSxFQUdMRyxNQUFNLENBQ0osVUFBQ1MsT0FBRDtBQUFBLGVBQTBCLE1BQU8sV0FBUCxFQUFvQkEsT0FBcEIsTUFBaUNDLFNBQTNEO0FBQUEsT0FESSxDQUhELEVBTUxaLFFBQVEsQ0FBQyxVQUFDVyxPQUFELEVBQTBCO0FBQ2pDO0FBQ0EsWUFBTUUsa0JBQWtCLEdBQUcsTUFBTyxXQUFQLEVBQW9CRixPQUFwQixJQUErQixXQUExRDs7QUFDQSxlQUFPTCxFQUFFLENBQUNILE9BQU8sQ0FBQ1csWUFBUixDQUFxQkgsT0FBckIsQ0FBRCxDQUFGLENBQWtDRCxJQUFsQyxDQUF1Q1QsS0FBSyxDQUFDWSxrQkFBRCxDQUE1QyxDQUFQO0FBQ0QsT0FKTyxDQU5ILENBQVA7QUFZRDtBQTdCSDs7QUFBQTtBQUFBLEVBQStCTixJQUEvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUnXG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwLCBkZWxheSwgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5pbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMnXG5pbXBvcnQgeyBBRERfU1VDQ0VTU19BTEVSVCwgQUREX0RBTkdFUl9BTEVSVCB9IGZyb20gJy4uL2FjdGlvbkNvbnN0cydcbmltcG9ydCB7IG9mIH0gZnJvbSAncnhqcydcbmltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBFcGljIH0gZnJvbSAnLi9lcGljJ1xuXG5leHBvcnQgY2xhc3MgQWxlcnRFcGljIGV4dGVuZHMgRXBpYyB7XG4gIFtBRERfREFOR0VSX0FMRVJUXShhY3Rpb24kOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKEFERF9EQU5HRVJfQUxFUlQpLFxuICAgICAgbWFwKFIucHJvcCgncGF5bG9hZCcpKSxcbiAgICAgIGZpbHRlcihcbiAgICAgICAgKHBheWxvYWQ6IEVwaWNQYXlsb2FkKSA9PiBSLnByb3AoJ2V4cGlyZXNPbicsIHBheWxvYWQpICE9PSB1bmRlZmluZWRcbiAgICAgICksXG4gICAgICBtZXJnZU1hcCgocGF5bG9hZDogRXBpY1BheWxvYWQpID0+IHtcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICBjb25zdCB0aW1lT2ZBbGVydERpc21pc3MgPSBSLnByb3AoJ2V4cGlyZXNPbicsIHBheWxvYWQpIC0gRGF0ZS5ub3coKVxuICAgICAgICByZXR1cm4gb2YoQWN0aW9ucy5kaXNtaXNzQWxlcnQocGF5bG9hZCkpLnBpcGUoZGVsYXkodGltZU9mQWxlcnREaXNtaXNzKSlcbiAgICAgIH0pXG4gICAgKVxuICB9XG5cbiAgW0FERF9TVUNDRVNTX0FMRVJUXShhY3Rpb24kOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKEFERF9TVUNDRVNTX0FMRVJUKSxcbiAgICAgIG1hcChSLnByb3AoJ3BheWxvYWQnKSksXG4gICAgICBmaWx0ZXIoXG4gICAgICAgIChwYXlsb2FkOiBFcGljUGF5bG9hZCkgPT4gUi5wcm9wKCdleHBpcmVzT24nLCBwYXlsb2FkKSAhPT0gdW5kZWZpbmVkXG4gICAgICApLFxuICAgICAgbWVyZ2VNYXAoKHBheWxvYWQ6IEVwaWNQYXlsb2FkKSA9PiB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgY29uc3QgdGltZU9mQWxlcnREaXNtaXNzID0gUi5wcm9wKCdleHBpcmVzT24nLCBwYXlsb2FkKSAtIERhdGUubm93KClcbiAgICAgICAgcmV0dXJuIG9mKEFjdGlvbnMuZGlzbWlzc0FsZXJ0KHBheWxvYWQpKS5waXBlKGRlbGF5KHRpbWVPZkFsZXJ0RGlzbWlzcykpXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuIl19