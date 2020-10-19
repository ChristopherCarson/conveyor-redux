import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _prop from "ramda/src/prop";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { ofType } from 'redux-observable';
import { map, mergeMap } from 'rxjs/operators';
import * as Actions from '../actions';
import { FETCH_MODEL_TOOLTIP } from '../actionConsts';
import * as Logger from '../utils/Logger';
import { Epic } from './epic';
export var TooltipEpic = /*#__PURE__*/function (_Epic) {
  _inherits(TooltipEpic, _Epic);

  var _super = _createSuper(TooltipEpic);

  function TooltipEpic() {
    _classCallCheck(this, TooltipEpic);

    return _super.apply(this, arguments);
  }

  _createClass(TooltipEpic, [{
    key: FETCH_MODEL_TOOLTIP,
    value: function value(action$) {
      var _this = this;

      return action$.pipe(ofType(FETCH_MODEL_TOOLTIP), map(_prop('payload')), map(function (payload) {
        var variables = {
          id: payload.id
        };

        var query = _this.queryBuilder.buildQuery({
          modelName: payload.modelName,
          queryType: 'tooltip'
        });

        return {
          modelName: payload.modelName,
          id: payload.id,
          query: query,
          variables: variables
        };
      }), mergeMap(function (context) {
        return _this.queryBuilder.sendRequest({
          query: context.query,
          variables: context.variables
        }).then(function (_ref) {
          var data = _ref.data,
              error = _ref.error;
          return {
            context: context,
            data: data,
            error: error
          };
        });
      }), map(function (_ref2) {
        var context = _ref2.context,
            data = _ref2.data,
            error = _ref2.error;

        if (error) {
          Logger.epicError('fetchModelTooltipEpic', context, error);
          return Actions.addDangerAlert({
            message: "Error loading ".concat(context.modelName, " tooltip")
          });
        }

        return Actions.updateModelTooltip({
          modelName: context.modelName,
          id: context.id,
          data: data
        });
      }));
    }
  }]);

  return TooltipEpic;
}(Epic);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy90b29sdGlwLnRzIl0sIm5hbWVzIjpbIm9mVHlwZSIsIm1hcCIsIm1lcmdlTWFwIiwiQWN0aW9ucyIsIkZFVENIX01PREVMX1RPT0xUSVAiLCJMb2dnZXIiLCJFcGljIiwiVG9vbHRpcEVwaWMiLCJhY3Rpb24kIiwicGlwZSIsInBheWxvYWQiLCJ2YXJpYWJsZXMiLCJpZCIsInF1ZXJ5IiwicXVlcnlCdWlsZGVyIiwiYnVpbGRRdWVyeSIsIm1vZGVsTmFtZSIsInF1ZXJ5VHlwZSIsImNvbnRleHQiLCJzZW5kUmVxdWVzdCIsInRoZW4iLCJkYXRhIiwiZXJyb3IiLCJlcGljRXJyb3IiLCJhZGREYW5nZXJBbGVydCIsIm1lc3NhZ2UiLCJ1cGRhdGVNb2RlbFRvb2x0aXAiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUNBLFNBQVNBLE1BQVQsUUFBdUIsa0JBQXZCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxRQUFkLFFBQThCLGdCQUE5QjtBQUNBLE9BQU8sS0FBS0MsT0FBWixNQUF5QixZQUF6QjtBQUNBLFNBQVNDLG1CQUFULFFBQW9DLGlCQUFwQztBQUNBLE9BQU8sS0FBS0MsTUFBWixNQUF3QixpQkFBeEI7QUFFQSxTQUFTQyxJQUFULFFBQXFCLFFBQXJCO0FBRUEsV0FBYUMsV0FBYjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLFNBQ0dILG1CQURIO0FBQUEsMEJBQ3dCSSxPQUR4QixFQUNzQztBQUFBOztBQUNsQyxhQUFPQSxPQUFPLENBQUNDLElBQVIsQ0FDTFQsTUFBTSxDQUFDSSxtQkFBRCxDQURELEVBRUxILEdBQUcsQ0FBQyxNQUFPLFNBQVAsQ0FBRCxDQUZFLEVBR0xBLEdBQUcsQ0FBQyxVQUFDUyxPQUFELEVBQTBCO0FBQzVCLFlBQU1DLFNBQVMsR0FBRztBQUFFQyxVQUFBQSxFQUFFLEVBQUVGLE9BQU8sQ0FBQ0U7QUFBZCxTQUFsQjs7QUFDQSxZQUFNQyxLQUFLLEdBQUcsS0FBSSxDQUFDQyxZQUFMLENBQWtCQyxVQUFsQixDQUE2QjtBQUN6Q0MsVUFBQUEsU0FBUyxFQUFFTixPQUFPLENBQUNNLFNBRHNCO0FBRXpDQyxVQUFBQSxTQUFTLEVBQUU7QUFGOEIsU0FBN0IsQ0FBZDs7QUFJQSxlQUFPO0FBQ0xELFVBQUFBLFNBQVMsRUFBRU4sT0FBTyxDQUFDTSxTQURkO0FBRUxKLFVBQUFBLEVBQUUsRUFBRUYsT0FBTyxDQUFDRSxFQUZQO0FBR0xDLFVBQUFBLEtBQUssRUFBTEEsS0FISztBQUlMRixVQUFBQSxTQUFTLEVBQVRBO0FBSkssU0FBUDtBQU1ELE9BWkUsQ0FIRSxFQWdCTFQsUUFBUSxDQUFDLFVBQUNnQixPQUFELEVBQWtCO0FBQ3pCLGVBQU8sS0FBSSxDQUFDSixZQUFMLENBQ0pLLFdBREksQ0FDUTtBQUFFTixVQUFBQSxLQUFLLEVBQUVLLE9BQU8sQ0FBQ0wsS0FBakI7QUFBd0JGLFVBQUFBLFNBQVMsRUFBRU8sT0FBTyxDQUFDUDtBQUEzQyxTQURSLEVBRUpTLElBRkksQ0FFQztBQUFBLGNBQUdDLElBQUgsUUFBR0EsSUFBSDtBQUFBLGNBQVNDLEtBQVQsUUFBU0EsS0FBVDtBQUFBLGlCQUFzQjtBQUFFSixZQUFBQSxPQUFPLEVBQVBBLE9BQUY7QUFBV0csWUFBQUEsSUFBSSxFQUFKQSxJQUFYO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUxBO0FBQWpCLFdBQXRCO0FBQUEsU0FGRCxDQUFQO0FBR0QsT0FKTyxDQWhCSCxFQXFCTHJCLEdBQUcsQ0FDRCxpQkFBdUU7QUFBQSxZQUFwRWlCLE9BQW9FLFNBQXBFQSxPQUFvRTtBQUFBLFlBQTNERyxJQUEyRCxTQUEzREEsSUFBMkQ7QUFBQSxZQUFyREMsS0FBcUQsU0FBckRBLEtBQXFEOztBQUNyRSxZQUFJQSxLQUFKLEVBQVc7QUFDVGpCLFVBQUFBLE1BQU0sQ0FBQ2tCLFNBQVAsQ0FBaUIsdUJBQWpCLEVBQTBDTCxPQUExQyxFQUFtREksS0FBbkQ7QUFDQSxpQkFBT25CLE9BQU8sQ0FBQ3FCLGNBQVIsQ0FBdUI7QUFDNUJDLFlBQUFBLE9BQU8sMEJBQW1CUCxPQUFPLENBQUNGLFNBQTNCO0FBRHFCLFdBQXZCLENBQVA7QUFHRDs7QUFFRCxlQUFPYixPQUFPLENBQUN1QixrQkFBUixDQUEyQjtBQUNoQ1YsVUFBQUEsU0FBUyxFQUFFRSxPQUFPLENBQUNGLFNBRGE7QUFFaENKLFVBQUFBLEVBQUUsRUFBRU0sT0FBTyxDQUFDTixFQUZvQjtBQUdoQ1MsVUFBQUEsSUFBSSxFQUFKQTtBQUhnQyxTQUEzQixDQUFQO0FBS0QsT0FkQSxDQXJCRSxDQUFQO0FBc0NEO0FBeENIOztBQUFBO0FBQUEsRUFBaUNmLElBQWpDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSdcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUnXG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5pbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMnXG5pbXBvcnQgeyBGRVRDSF9NT0RFTF9UT09MVElQIH0gZnJvbSAnLi4vYWN0aW9uQ29uc3RzJ1xuaW1wb3J0ICogYXMgTG9nZ2VyIGZyb20gJy4uL3V0aWxzL0xvZ2dlcidcblxuaW1wb3J0IHsgRXBpYyB9IGZyb20gJy4vZXBpYydcblxuZXhwb3J0IGNsYXNzIFRvb2x0aXBFcGljIGV4dGVuZHMgRXBpYyB7XG4gIFtGRVRDSF9NT0RFTF9UT09MVElQXShhY3Rpb24kOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKEZFVENIX01PREVMX1RPT0xUSVApLFxuICAgICAgbWFwKFIucHJvcCgncGF5bG9hZCcpKSxcbiAgICAgIG1hcCgocGF5bG9hZDogRXBpY1BheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0geyBpZDogcGF5bG9hZC5pZCB9XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeUJ1aWxkZXIuYnVpbGRRdWVyeSh7XG4gICAgICAgICAgbW9kZWxOYW1lOiBwYXlsb2FkLm1vZGVsTmFtZSxcbiAgICAgICAgICBxdWVyeVR5cGU6ICd0b29sdGlwJ1xuICAgICAgICB9KVxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1vZGVsTmFtZTogcGF5bG9hZC5tb2RlbE5hbWUsXG4gICAgICAgICAgaWQ6IHBheWxvYWQuaWQsXG4gICAgICAgICAgcXVlcnksXG4gICAgICAgICAgdmFyaWFibGVzXG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAoKGNvbnRleHQ6IGFueSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeUJ1aWxkZXJcbiAgICAgICAgICAuc2VuZFJlcXVlc3QoeyBxdWVyeTogY29udGV4dC5xdWVyeSwgdmFyaWFibGVzOiBjb250ZXh0LnZhcmlhYmxlcyB9KVxuICAgICAgICAgIC50aGVuKCh7IGRhdGEsIGVycm9yIH0pID0+ICh7IGNvbnRleHQsIGRhdGEsIGVycm9yIH0pKVxuICAgICAgfSksXG4gICAgICBtYXAoXG4gICAgICAgICh7IGNvbnRleHQsIGRhdGEsIGVycm9yIH06IHsgY29udGV4dDogYW55OyBkYXRhOiBhbnk7IGVycm9yOiBhbnkgfSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgTG9nZ2VyLmVwaWNFcnJvcignZmV0Y2hNb2RlbFRvb2x0aXBFcGljJywgY29udGV4dCwgZXJyb3IpXG4gICAgICAgICAgICByZXR1cm4gQWN0aW9ucy5hZGREYW5nZXJBbGVydCh7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6IGBFcnJvciBsb2FkaW5nICR7Y29udGV4dC5tb2RlbE5hbWV9IHRvb2x0aXBgXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBBY3Rpb25zLnVwZGF0ZU1vZGVsVG9vbHRpcCh7XG4gICAgICAgICAgICBtb2RlbE5hbWU6IGNvbnRleHQubW9kZWxOYW1lLFxuICAgICAgICAgICAgaWQ6IGNvbnRleHQuaWQsXG4gICAgICAgICAgICBkYXRhXG4gICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgICAgKVxuICAgIClcbiAgfVxufVxuIl19