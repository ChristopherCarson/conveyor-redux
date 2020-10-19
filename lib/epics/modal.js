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
import { FETCH_DELETE_DETAIL } from '../actionConsts';
import * as Logger from '../utils/Logger';
import { Epic } from './epic';
export var ModalEpic = /*#__PURE__*/function (_Epic) {
  _inherits(ModalEpic, _Epic);

  var _super = _createSuper(ModalEpic);

  function ModalEpic() {
    _classCallCheck(this, ModalEpic);

    return _super.apply(this, arguments);
  }

  _createClass(ModalEpic, [{
    key: FETCH_DELETE_DETAIL,
    value: function value(action$) {
      var _this = this;

      return action$.pipe(ofType(FETCH_DELETE_DETAIL), map(_prop('payload')), map(function (payload) {
        var query = _this.queryBuilder.buildQuery({
          modelName: payload.modelName,
          queryType: 'deleteCascades'
        });

        var variables = {
          modelName: payload.modelName,
          id: payload.id
        };
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
          Logger.epicError('fetchDeleteDetailEpic', context, error);
          return Actions.addDangerAlert({
            message: "Error loading ".concat(context.modelName, " delete detail.")
          });
        }

        return Actions.updateDeleteDetail({
          data: data
        });
      }));
    }
  }]);

  return ModalEpic;
}(Epic);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy9tb2RhbC50cyJdLCJuYW1lcyI6WyJvZlR5cGUiLCJtYXAiLCJtZXJnZU1hcCIsIkFjdGlvbnMiLCJGRVRDSF9ERUxFVEVfREVUQUlMIiwiTG9nZ2VyIiwiRXBpYyIsIk1vZGFsRXBpYyIsImFjdGlvbiQiLCJwaXBlIiwicGF5bG9hZCIsInF1ZXJ5IiwicXVlcnlCdWlsZGVyIiwiYnVpbGRRdWVyeSIsIm1vZGVsTmFtZSIsInF1ZXJ5VHlwZSIsInZhcmlhYmxlcyIsImlkIiwiY29udGV4dCIsInNlbmRSZXF1ZXN0IiwidGhlbiIsImRhdGEiLCJlcnJvciIsImVwaWNFcnJvciIsImFkZERhbmdlckFsZXJ0IiwibWVzc2FnZSIsInVwZGF0ZURlbGV0ZURldGFpbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsTUFBVCxRQUF1QixrQkFBdkI7QUFFQSxTQUFTQyxHQUFULEVBQWNDLFFBQWQsUUFBOEIsZ0JBQTlCO0FBQ0EsT0FBTyxLQUFLQyxPQUFaLE1BQXlCLFlBQXpCO0FBQ0EsU0FBU0MsbUJBQVQsUUFBb0MsaUJBQXBDO0FBQ0EsT0FBTyxLQUFLQyxNQUFaLE1BQXdCLGlCQUF4QjtBQUNBLFNBQVNDLElBQVQsUUFBcUIsUUFBckI7QUFFQSxXQUFhQyxTQUFiO0FBQUE7O0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBOztBQUFBO0FBQUEsU0FDR0gsbUJBREg7QUFBQSwwQkFDd0JJLE9BRHhCLEVBQ3NDO0FBQUE7O0FBQ2xDLGFBQU9BLE9BQU8sQ0FBQ0MsSUFBUixDQUNMVCxNQUFNLENBQUNJLG1CQUFELENBREQsRUFFTEgsR0FBRyxDQUFDLE1BQU8sU0FBUCxDQUFELENBRkUsRUFHTEEsR0FBRyxDQUFDLFVBQUNTLE9BQUQsRUFBMEI7QUFDNUIsWUFBTUMsS0FBSyxHQUFHLEtBQUksQ0FBQ0MsWUFBTCxDQUFrQkMsVUFBbEIsQ0FBNkI7QUFDekNDLFVBQUFBLFNBQVMsRUFBRUosT0FBTyxDQUFDSSxTQURzQjtBQUV6Q0MsVUFBQUEsU0FBUyxFQUFFO0FBRjhCLFNBQTdCLENBQWQ7O0FBSUEsWUFBTUMsU0FBUyxHQUFHO0FBQUVGLFVBQUFBLFNBQVMsRUFBRUosT0FBTyxDQUFDSSxTQUFyQjtBQUFnQ0csVUFBQUEsRUFBRSxFQUFFUCxPQUFPLENBQUNPO0FBQTVDLFNBQWxCO0FBQ0EsZUFBTztBQUNMSCxVQUFBQSxTQUFTLEVBQUVKLE9BQU8sQ0FBQ0ksU0FEZDtBQUVMRyxVQUFBQSxFQUFFLEVBQUVQLE9BQU8sQ0FBQ08sRUFGUDtBQUdMTixVQUFBQSxLQUFLLEVBQUxBLEtBSEs7QUFJTEssVUFBQUEsU0FBUyxFQUFUQTtBQUpLLFNBQVA7QUFNRCxPQVpFLENBSEUsRUFnQkxkLFFBQVEsQ0FBQyxVQUFDZ0IsT0FBRDtBQUFBLGVBQ1AsS0FBSSxDQUFDTixZQUFMLENBQ0dPLFdBREgsQ0FDZTtBQUNYUixVQUFBQSxLQUFLLEVBQUVPLE9BQU8sQ0FBQ1AsS0FESjtBQUVYSyxVQUFBQSxTQUFTLEVBQUVFLE9BQU8sQ0FBQ0Y7QUFGUixTQURmLEVBS0dJLElBTEgsQ0FLUTtBQUFBLGNBQUdDLElBQUgsUUFBR0EsSUFBSDtBQUFBLGNBQVNDLEtBQVQsUUFBU0EsS0FBVDtBQUFBLGlCQUFzQjtBQUFFSixZQUFBQSxPQUFPLEVBQVBBLE9BQUY7QUFBV0csWUFBQUEsSUFBSSxFQUFKQSxJQUFYO0FBQWlCQyxZQUFBQSxLQUFLLEVBQUxBO0FBQWpCLFdBQXRCO0FBQUEsU0FMUixDQURPO0FBQUEsT0FBRCxDQWhCSCxFQXdCTHJCLEdBQUcsQ0FDRCxpQkFBdUU7QUFBQSxZQUFwRWlCLE9BQW9FLFNBQXBFQSxPQUFvRTtBQUFBLFlBQTNERyxJQUEyRCxTQUEzREEsSUFBMkQ7QUFBQSxZQUFyREMsS0FBcUQsU0FBckRBLEtBQXFEOztBQUNyRSxZQUFJQSxLQUFKLEVBQVc7QUFDVGpCLFVBQUFBLE1BQU0sQ0FBQ2tCLFNBQVAsQ0FBaUIsdUJBQWpCLEVBQTBDTCxPQUExQyxFQUFtREksS0FBbkQ7QUFDQSxpQkFBT25CLE9BQU8sQ0FBQ3FCLGNBQVIsQ0FBdUI7QUFDNUJDLFlBQUFBLE9BQU8sMEJBQW1CUCxPQUFPLENBQUNKLFNBQTNCO0FBRHFCLFdBQXZCLENBQVA7QUFHRDs7QUFFRCxlQUFPWCxPQUFPLENBQUN1QixrQkFBUixDQUEyQjtBQUFFTCxVQUFBQSxJQUFJLEVBQUpBO0FBQUYsU0FBM0IsQ0FBUDtBQUNELE9BVkEsQ0F4QkUsQ0FBUDtBQXFDRDtBQXZDSDs7QUFBQTtBQUFBLEVBQStCZixJQUEvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IG9mVHlwZSB9IGZyb20gJ3JlZHV4LW9ic2VydmFibGUnXG5pbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuaW1wb3J0ICogYXMgQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zJ1xuaW1wb3J0IHsgRkVUQ0hfREVMRVRFX0RFVEFJTCB9IGZyb20gJy4uL2FjdGlvbkNvbnN0cydcbmltcG9ydCAqIGFzIExvZ2dlciBmcm9tICcuLi91dGlscy9Mb2dnZXInXG5pbXBvcnQgeyBFcGljIH0gZnJvbSAnLi9lcGljJ1xuXG5leHBvcnQgY2xhc3MgTW9kYWxFcGljIGV4dGVuZHMgRXBpYyB7XG4gIFtGRVRDSF9ERUxFVEVfREVUQUlMXShhY3Rpb24kOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKEZFVENIX0RFTEVURV9ERVRBSUwpLFxuICAgICAgbWFwKFIucHJvcCgncGF5bG9hZCcpKSxcbiAgICAgIG1hcCgocGF5bG9hZDogRXBpY1BheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5QnVpbGRlci5idWlsZFF1ZXJ5KHtcbiAgICAgICAgICBtb2RlbE5hbWU6IHBheWxvYWQubW9kZWxOYW1lLFxuICAgICAgICAgIHF1ZXJ5VHlwZTogJ2RlbGV0ZUNhc2NhZGVzJ1xuICAgICAgICB9KVxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7IG1vZGVsTmFtZTogcGF5bG9hZC5tb2RlbE5hbWUsIGlkOiBwYXlsb2FkLmlkIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtb2RlbE5hbWU6IHBheWxvYWQubW9kZWxOYW1lLFxuICAgICAgICAgIGlkOiBwYXlsb2FkLmlkLFxuICAgICAgICAgIHF1ZXJ5LFxuICAgICAgICAgIHZhcmlhYmxlc1xuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKChjb250ZXh0OiBhbnkpID0+XG4gICAgICAgIHRoaXMucXVlcnlCdWlsZGVyXG4gICAgICAgICAgLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHF1ZXJ5OiBjb250ZXh0LnF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiBjb250ZXh0LnZhcmlhYmxlc1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHsgZGF0YSwgZXJyb3IgfSkgPT4gKHsgY29udGV4dCwgZGF0YSwgZXJyb3IgfSkpXG4gICAgICApLFxuICAgICAgbWFwKFxuICAgICAgICAoeyBjb250ZXh0LCBkYXRhLCBlcnJvciB9OiB7IGNvbnRleHQ6IGFueTsgZGF0YTogYW55OyBlcnJvcjogYW55IH0pID0+IHtcbiAgICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICAgIExvZ2dlci5lcGljRXJyb3IoJ2ZldGNoRGVsZXRlRGV0YWlsRXBpYycsIGNvbnRleHQsIGVycm9yKVxuICAgICAgICAgICAgcmV0dXJuIEFjdGlvbnMuYWRkRGFuZ2VyQWxlcnQoe1xuICAgICAgICAgICAgICBtZXNzYWdlOiBgRXJyb3IgbG9hZGluZyAke2NvbnRleHQubW9kZWxOYW1lfSBkZWxldGUgZGV0YWlsLmBcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIEFjdGlvbnMudXBkYXRlRGVsZXRlRGV0YWlsKHsgZGF0YSB9KVxuICAgICAgICB9XG4gICAgICApXG4gICAgKVxuICB9XG59XG4iXX0=