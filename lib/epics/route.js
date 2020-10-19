import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _flatten from "ramda/src/flatten";
import _equals from "ramda/src/equals";
import _reject from "ramda/src/reject";
import _ap from "ramda/src/ap";
import _pipe from "ramda/src/pipe";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { LOCATION_CHANGE } from 'connected-react-router';
import { ofType } from 'redux-observable';
import { concat } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { getPath, pathFunctions } from '../utils/helpers';
import { Epic } from './epic';
export var RouteEpic = /*#__PURE__*/function (_Epic) {
  _inherits(RouteEpic, _Epic);

  var _super = _createSuper(RouteEpic);

  function RouteEpic() {
    _classCallCheck(this, RouteEpic);

    return _super.apply(this, arguments);
  }

  _createClass(RouteEpic, [{
    key: LOCATION_CHANGE,
    value: function value(action$) {
      var _this = this;

      return action$.pipe(ofType(LOCATION_CHANGE), map(getPath), switchMap(function (path) {
        var pipeActions = _pipe(_ap(pathFunctions), // @ts-ignore
        _reject(_equals(undefined)), _flatten);

        var actions = pipeActions([{
          path: path,
          schema: _this.schema
        }]);
        return concat(actions);
      }));
    }
  }]);

  return RouteEpic;
}(Epic);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy9yb3V0ZS50cyJdLCJuYW1lcyI6WyJMT0NBVElPTl9DSEFOR0UiLCJvZlR5cGUiLCJjb25jYXQiLCJtYXAiLCJzd2l0Y2hNYXAiLCJnZXRQYXRoIiwicGF0aEZ1bmN0aW9ucyIsIkVwaWMiLCJSb3V0ZUVwaWMiLCJhY3Rpb24kIiwicGlwZSIsInBhdGgiLCJwaXBlQWN0aW9ucyIsInVuZGVmaW5lZCIsImFjdGlvbnMiLCJzY2hlbWEiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxTQUFTQSxlQUFULFFBQWdDLHdCQUFoQztBQUNBLFNBQVNDLE1BQVQsUUFBdUIsa0JBQXZCO0FBQ0EsU0FBU0MsTUFBVCxRQUF1QixNQUF2QjtBQUNBLFNBQVNDLEdBQVQsRUFBY0MsU0FBZCxRQUErQixnQkFBL0I7QUFDQSxTQUFTQyxPQUFULEVBQWtCQyxhQUFsQixRQUF1QyxrQkFBdkM7QUFDQSxTQUFTQyxJQUFULFFBQXFCLFFBQXJCO0FBRUEsV0FBYUMsU0FBYjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLFNBQ0dSLGVBREg7QUFBQSwwQkFDb0JTLE9BRHBCLEVBQ2tDO0FBQUE7O0FBQzlCLGFBQU9BLE9BQU8sQ0FBQ0MsSUFBUixDQUNMVCxNQUFNLENBQUNELGVBQUQsQ0FERCxFQUVMRyxHQUFHLENBQUNFLE9BQUQsQ0FGRSxFQUdMRCxTQUFTLENBQUMsVUFBQU8sSUFBSSxFQUFJO0FBQ2hCLFlBQU1DLFdBQTRDLEdBQUcsTUFDbkQsSUFBS04sYUFBTCxDQURtRCxFQUVuRDtBQUNBLGdCQUFTLFFBQVNPLFNBQVQsQ0FBVCxDQUhtRCxXQUFyRDs7QUFNQSxZQUFNQyxPQUFPLEdBQUdGLFdBQVcsQ0FBQyxDQUFDO0FBQUVELFVBQUFBLElBQUksRUFBSkEsSUFBRjtBQUFRSSxVQUFBQSxNQUFNLEVBQUUsS0FBSSxDQUFDQTtBQUFyQixTQUFELENBQUQsQ0FBM0I7QUFDQSxlQUFPYixNQUFNLENBQUNZLE9BQUQsQ0FBYjtBQUNELE9BVFEsQ0FISixDQUFQO0FBY0Q7QUFoQkg7O0FBQUE7QUFBQSxFQUErQlAsSUFBL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHsgTE9DQVRJT05fQ0hBTkdFIH0gZnJvbSAnY29ubmVjdGVkLXJlYWN0LXJvdXRlcidcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUnXG5pbXBvcnQgeyBjb25jYXQgfSBmcm9tICdyeGpzJ1xuaW1wb3J0IHsgbWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7IGdldFBhdGgsIHBhdGhGdW5jdGlvbnMgfSBmcm9tICcuLi91dGlscy9oZWxwZXJzJ1xuaW1wb3J0IHsgRXBpYyB9IGZyb20gJy4vZXBpYydcblxuZXhwb3J0IGNsYXNzIFJvdXRlRXBpYyBleHRlbmRzIEVwaWMge1xuICBbTE9DQVRJT05fQ0hBTkdFXShhY3Rpb24kOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKExPQ0FUSU9OX0NIQU5HRSksXG4gICAgICBtYXAoZ2V0UGF0aCksXG4gICAgICBzd2l0Y2hNYXAocGF0aCA9PiB7XG4gICAgICAgIGNvbnN0IHBpcGVBY3Rpb25zOiAob2JBcnJheTogW29iamVjdF0pID0+IFtvYmplY3RdID0gUi5waXBlKFxuICAgICAgICAgIFIuYXAocGF0aEZ1bmN0aW9ucyksXG4gICAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICAgIFIucmVqZWN0KFIuZXF1YWxzKHVuZGVmaW5lZCkpLFxuICAgICAgICAgIFIuZmxhdHRlblxuICAgICAgICApXG4gICAgICAgIGNvbnN0IGFjdGlvbnMgPSBwaXBlQWN0aW9ucyhbeyBwYXRoLCBzY2hlbWE6IHRoaXMuc2NoZW1hIH1dKVxuICAgICAgICByZXR1cm4gY29uY2F0KGFjdGlvbnMpXG4gICAgICB9KVxuICAgIClcbiAgfVxufVxuIl19