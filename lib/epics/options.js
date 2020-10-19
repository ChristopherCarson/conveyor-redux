import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _path from "ramda/src/path";
import _prop from "ramda/src/prop";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { getSort } from '../utils/helpers';
import { concat } from 'rxjs';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import * as Actions from '../actions';
import { QUERY_SELECT_MENU_OPEN, RELATIONSHIP_SELECT_MENU_OPEN } from '../actionConsts';
import * as Logger from '../utils/Logger';
import { Epic } from './epic';
export var OptionsEpic = /*#__PURE__*/function (_Epic) {
  _inherits(OptionsEpic, _Epic);

  var _super = _createSuper(OptionsEpic);

  function OptionsEpic() {
    _classCallCheck(this, OptionsEpic);

    return _super.apply(this, arguments);
  }

  _createClass(OptionsEpic, [{
    key: QUERY_SELECT_MENU_OPEN,
    value: function value(action$) {
      var _this = this;

      return action$.pipe(ofType(QUERY_SELECT_MENU_OPEN), map(_prop('payload')), map(function (payload) {
        var modelName = _prop('modelName', payload);

        var fieldName = _prop('fieldName', payload);

        var variables = {
          modelName: payload.modelName,
          fieldName: payload.fieldName
        };
        return {
          variables: variables,
          modelName: modelName,
          fieldName: fieldName
        };
      }), mergeMap(function (context) {
        var query = _this.queryBuilder.buildQuery({
          modelName: context.modelName,
          queryType: 'index'
        });

        return _this.queryBuilder.sendRequest({
          query: query,
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
          Logger.epicError('querySelectMenuOpenEpic', context, error);
          return Actions.addDangerAlert({
            message: 'Error loading form option.'
          });
        }

        return Actions.existingValueUpdate({
          modelName: context.modelName,
          fieldName: context.fieldName,
          value: _prop('result', data)
        });
      }));
    }
  }, {
    key: RELATIONSHIP_SELECT_MENU_OPEN,
    value: function value(action$) {
      var _this2 = this;

      return action$.pipe(ofType(RELATIONSHIP_SELECT_MENU_OPEN), map(_prop('payload')), map(function (payload) {
        var modelName = _prop('modelName', payload);

        var fieldName = _prop('fieldName', payload);

        var field = _this2.schema.getField(modelName, fieldName);

        var targetModel = _path(['type', 'target'], field);

        var variables = {
          sort: getSort({
            schema: _this2.schema,
            modelName: targetModel
          })
        };
        return {
          variables: variables,
          modelName: modelName,
          fieldName: fieldName,
          targetModel: targetModel
        };
      }), mergeMap(function (context) {
        var query = _this2.queryBuilder.buildQuery({
          modelName: context.targetModel,
          queryType: 'select'
        });

        return _this2.queryBuilder.sendRequest({
          query: query,
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
          Logger.epicError('relationshipSelectMenuOpenEpic', context, error);
          return Actions.addDangerAlert({
            message: 'Error loading form option.'
          });
        }

        return concat([Actions.dataOptionsUpdate({
          modelName: context.modelName,
          fieldName: context.fieldName,
          data: data
        }), Actions.updateModelIndex({
          modelName: context.targetModel,
          data: data
        })]);
      }));
    }
  }]);

  return OptionsEpic;
}(Epic);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy9vcHRpb25zLnRzIl0sIm5hbWVzIjpbImdldFNvcnQiLCJjb25jYXQiLCJtYXAiLCJtZXJnZU1hcCIsInN3aXRjaE1hcCIsIm9mVHlwZSIsIkFjdGlvbnMiLCJRVUVSWV9TRUxFQ1RfTUVOVV9PUEVOIiwiUkVMQVRJT05TSElQX1NFTEVDVF9NRU5VX09QRU4iLCJMb2dnZXIiLCJFcGljIiwiT3B0aW9uc0VwaWMiLCJhY3Rpb24kIiwicGlwZSIsInBheWxvYWQiLCJtb2RlbE5hbWUiLCJmaWVsZE5hbWUiLCJ2YXJpYWJsZXMiLCJjb250ZXh0IiwicXVlcnkiLCJxdWVyeUJ1aWxkZXIiLCJidWlsZFF1ZXJ5IiwicXVlcnlUeXBlIiwic2VuZFJlcXVlc3QiLCJ0aGVuIiwiZGF0YSIsImVycm9yIiwiZXBpY0Vycm9yIiwiYWRkRGFuZ2VyQWxlcnQiLCJtZXNzYWdlIiwiZXhpc3RpbmdWYWx1ZVVwZGF0ZSIsInZhbHVlIiwiZmllbGQiLCJzY2hlbWEiLCJnZXRGaWVsZCIsInRhcmdldE1vZGVsIiwic29ydCIsImRhdGFPcHRpb25zVXBkYXRlIiwidXBkYXRlTW9kZWxJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLFNBQVNBLE9BQVQsUUFBd0Isa0JBQXhCO0FBQ0EsU0FBU0MsTUFBVCxRQUF1QixNQUF2QjtBQUNBLFNBQVNDLEdBQVQsRUFBY0MsUUFBZCxFQUF3QkMsU0FBeEIsUUFBeUMsZ0JBQXpDO0FBQ0EsU0FBU0MsTUFBVCxRQUF1QixrQkFBdkI7QUFDQSxPQUFPLEtBQUtDLE9BQVosTUFBeUIsWUFBekI7QUFDQSxTQUNFQyxzQkFERixFQUVFQyw2QkFGRixRQUdPLGlCQUhQO0FBSUEsT0FBTyxLQUFLQyxNQUFaLE1BQXdCLGlCQUF4QjtBQUVBLFNBQVNDLElBQVQsUUFBcUIsUUFBckI7QUFFQSxXQUFhQyxXQUFiO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUEsU0FDR0os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QVRPLENBZEgsRUF3Qkx0QixTQUFTLENBQUMsaUJBQW1DO0FBQUEsWUFBaENjLE9BQWdDLFNBQWhDQSxPQUFnQztBQUFBLFlBQXZCTyxJQUF1QixTQUF2QkEsSUFBdUI7QUFBQSxZQUFqQkMsS0FBaUIsU0FBakJBLEtBQWlCOztBQUMzQyxZQUFJQSxLQUFKLEVBQVc7QUFDVGpCLFVBQUFBLE1BQU0sQ0FBQ2tCLFNBQVAsQ0FBaUIsZ0NBQWpCLEVBQW1EVCxPQUFuRCxFQUE0RFEsS0FBNUQ7QUFFQSxpQkFBT3BCLE9BQU8sQ0FBQ3NCLGNBQVIsQ0FBdUI7QUFDNUJDLFlBQUFBLE9BQU8sRUFBRTtBQURtQixXQUF2QixDQUFQO0FBR0Q7O0FBRUQsZUFBTzVCLE1BQU0sQ0FBQyxDQUNaSyxPQUFPLENBQUMrQixpQkFBUixDQUEwQjtBQUN4QnRCLFVBQUFBLFNBQVMsRUFBRUcsT0FBTyxDQUFDSCxTQURLO0FBRXhCQyxVQUFBQSxTQUFTLEVBQUVFLE9BQU8sQ0FBQ0YsU0FGSztBQUd4QlMsVUFBQUEsSUFBSSxFQUFKQTtBQUh3QixTQUExQixDQURZLEVBTVpuQixPQUFPLENBQUNnQyxnQkFBUixDQUF5QjtBQUFFdkIsVUFBQUEsU0FBUyxFQUFFRyxPQUFPLENBQUNpQixXQUFyQjtBQUFrQ1YsVUFBQUEsSUFBSSxFQUFKQTtBQUFsQyxTQUF6QixDQU5ZLENBQUQsQ0FBYjtBQVFELE9BakJRLENBeEJKLENBQVA7QUEyQ0Q7QUE3Rkg7O0FBQUE7QUFBQSxFQUFpQ2YsSUFBakMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRTb3J0IH0gZnJvbSAnLi4vdXRpbHMvaGVscGVycydcbmltcG9ydCB7IGNvbmNhdCB9IGZyb20gJ3J4anMnXG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUnXG5pbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMnXG5pbXBvcnQge1xuICBRVUVSWV9TRUxFQ1RfTUVOVV9PUEVOLFxuICBSRUxBVElPTlNISVBfU0VMRUNUX01FTlVfT1BFTlxufSBmcm9tICcuLi9hY3Rpb25Db25zdHMnXG5pbXBvcnQgKiBhcyBMb2dnZXIgZnJvbSAnLi4vdXRpbHMvTG9nZ2VyJ1xuaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSdcbmltcG9ydCB7IEVwaWMgfSBmcm9tICcuL2VwaWMnXG5cbmV4cG9ydCBjbGFzcyBPcHRpb25zRXBpYyBleHRlbmRzIEVwaWMge1xuICBbUVVFUllfU0VMRUNUX01FTlVfT1BFTl0oYWN0aW9uJDogYW55KSB7XG4gICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShRVUVSWV9TRUxFQ1RfTUVOVV9PUEVOKSxcbiAgICAgIG1hcChSLnByb3AoJ3BheWxvYWQnKSksXG4gICAgICBtYXAoKHBheWxvYWQ6IEVwaWNQYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IG1vZGVsTmFtZSA9IFIucHJvcCgnbW9kZWxOYW1lJywgcGF5bG9hZClcbiAgICAgICAgY29uc3QgZmllbGROYW1lID0gUi5wcm9wKCdmaWVsZE5hbWUnLCBwYXlsb2FkKVxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7XG4gICAgICAgICAgbW9kZWxOYW1lOiBwYXlsb2FkLm1vZGVsTmFtZSxcbiAgICAgICAgICBmaWVsZE5hbWU6IHBheWxvYWQuZmllbGROYW1lXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyB2YXJpYWJsZXMsIG1vZGVsTmFtZSwgZmllbGROYW1lIH1cbiAgICAgIH0pLFxuICAgICAgbWVyZ2VNYXAoKGNvbnRleHQ6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBxdWVyeSA9IHRoaXMucXVlcnlCdWlsZGVyLmJ1aWxkUXVlcnkoe1xuICAgICAgICAgIG1vZGVsTmFtZTogY29udGV4dC5tb2RlbE5hbWUsXG4gICAgICAgICAgcXVlcnlUeXBlOiAnaW5kZXgnXG4gICAgICAgIH0pXG5cbiAgICAgICAgcmV0dXJuIHRoaXMucXVlcnlCdWlsZGVyXG4gICAgICAgICAgLnNlbmRSZXF1ZXN0KHsgcXVlcnksIHZhcmlhYmxlczogY29udGV4dC52YXJpYWJsZXMgfSlcbiAgICAgICAgICAudGhlbigoeyBkYXRhLCBlcnJvciB9KSA9PiAoe1xuICAgICAgICAgICAgY29udGV4dCxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICBlcnJvclxuICAgICAgICAgIH0pKVxuICAgICAgfSksXG4gICAgICBtYXAoXG4gICAgICAgICh7IGNvbnRleHQsIGRhdGEsIGVycm9yIH06IHsgY29udGV4dDogYW55OyBkYXRhOiBhbnk7IGVycm9yOiBhbnkgfSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgTG9nZ2VyLmVwaWNFcnJvcigncXVlcnlTZWxlY3RNZW51T3BlbkVwaWMnLCBjb250ZXh0LCBlcnJvcilcblxuICAgICAgICAgICAgcmV0dXJuIEFjdGlvbnMuYWRkRGFuZ2VyQWxlcnQoe1xuICAgICAgICAgICAgICBtZXNzYWdlOiAnRXJyb3IgbG9hZGluZyBmb3JtIG9wdGlvbi4nXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBBY3Rpb25zLmV4aXN0aW5nVmFsdWVVcGRhdGUoe1xuICAgICAgICAgICAgbW9kZWxOYW1lOiBjb250ZXh0Lm1vZGVsTmFtZSxcbiAgICAgICAgICAgIGZpZWxkTmFtZTogY29udGV4dC5maWVsZE5hbWUsXG4gICAgICAgICAgICB2YWx1ZTogUi5wcm9wKCdyZXN1bHQnLCBkYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgIClcbiAgICApXG4gIH1cblxuICBbUkVMQVRJT05TSElQX1NFTEVDVF9NRU5VX09QRU5dKGFjdGlvbiQ6IGFueSkge1xuICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoUkVMQVRJT05TSElQX1NFTEVDVF9NRU5VX09QRU4pLFxuICAgICAgbWFwKFIucHJvcCgncGF5bG9hZCcpKSxcbiAgICAgIG1hcCgocGF5bG9hZDogRXBpY1BheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgbW9kZWxOYW1lID0gUi5wcm9wKCdtb2RlbE5hbWUnLCBwYXlsb2FkKSBhcyBzdHJpbmdcbiAgICAgICAgY29uc3QgZmllbGROYW1lID0gUi5wcm9wKCdmaWVsZE5hbWUnLCBwYXlsb2FkKSBhcyBzdHJpbmdcbiAgICAgICAgY29uc3QgZmllbGQgPSB0aGlzLnNjaGVtYS5nZXRGaWVsZChtb2RlbE5hbWUsIGZpZWxkTmFtZSlcbiAgICAgICAgY29uc3QgdGFyZ2V0TW9kZWwgPSBSLnBhdGgoWyd0eXBlJywgJ3RhcmdldCddLCBmaWVsZCkgYXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IHZhcmlhYmxlcyA9IHtcbiAgICAgICAgICBzb3J0OiBnZXRTb3J0KHsgc2NoZW1hOiB0aGlzLnNjaGVtYSwgbW9kZWxOYW1lOiB0YXJnZXRNb2RlbCB9KVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgdmFyaWFibGVzLCBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgdGFyZ2V0TW9kZWwgfVxuICAgICAgfSksXG4gICAgICBtZXJnZU1hcCgoY29udGV4dDogYW55KSA9PiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeUJ1aWxkZXIuYnVpbGRRdWVyeSh7XG4gICAgICAgICAgbW9kZWxOYW1lOiBjb250ZXh0LnRhcmdldE1vZGVsLFxuICAgICAgICAgIHF1ZXJ5VHlwZTogJ3NlbGVjdCdcbiAgICAgICAgfSlcblxuICAgICAgICByZXR1cm4gdGhpcy5xdWVyeUJ1aWxkZXJcbiAgICAgICAgICAuc2VuZFJlcXVlc3QoeyBxdWVyeSwgdmFyaWFibGVzOiBjb250ZXh0LnZhcmlhYmxlcyB9KVxuICAgICAgICAgIC50aGVuKCh7IGRhdGEsIGVycm9yIH0pID0+ICh7IGNvbnRleHQsIGRhdGEsIGVycm9yIH0pKVxuICAgICAgfSksXG4gICAgICBzd2l0Y2hNYXAoKHsgY29udGV4dCwgZGF0YSwgZXJyb3IgfSk6IGFueSA9PiB7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgIExvZ2dlci5lcGljRXJyb3IoJ3JlbGF0aW9uc2hpcFNlbGVjdE1lbnVPcGVuRXBpYycsIGNvbnRleHQsIGVycm9yKVxuXG4gICAgICAgICAgcmV0dXJuIEFjdGlvbnMuYWRkRGFuZ2VyQWxlcnQoe1xuICAgICAgICAgICAgbWVzc2FnZTogJ0Vycm9yIGxvYWRpbmcgZm9ybSBvcHRpb24uJ1xuICAgICAgICAgIH0pXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gY29uY2F0KFtcbiAgICAgICAgICBBY3Rpb25zLmRhdGFPcHRpb25zVXBkYXRlKHtcbiAgICAgICAgICAgIG1vZGVsTmFtZTogY29udGV4dC5tb2RlbE5hbWUsXG4gICAgICAgICAgICBmaWVsZE5hbWU6IGNvbnRleHQuZmllbGROYW1lLFxuICAgICAgICAgICAgZGF0YVxuICAgICAgICAgIH0pLFxuICAgICAgICAgIEFjdGlvbnMudXBkYXRlTW9kZWxJbmRleCh7IG1vZGVsTmFtZTogY29udGV4dC50YXJnZXRNb2RlbCwgZGF0YSB9KVxuICAgICAgICBdKVxuICAgICAgfSlcbiAgICApXG4gIH1cbn1cbiJdfQ==