import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.string.replace";
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
import { TRIGGER_SEARCH, FETCH_SEARCH_ENTRIES } from '../actionConsts';
import * as Logger from '../utils/Logger';
import { Epic } from './epic';
export var SearchEpic = /*#__PURE__*/function (_Epic) {
  _inherits(SearchEpic, _Epic);

  var _super = _createSuper(SearchEpic);

  function SearchEpic() {
    _classCallCheck(this, SearchEpic);

    return _super.apply(this, arguments);
  }

  _createClass(SearchEpic, [{
    key: TRIGGER_SEARCH,
    value: function value(action$) {
      return action$.pipe(ofType(TRIGGER_SEARCH), map(_prop('payload')), map(function (payload) {
        return Actions.fetchSearchEntries({
          queryString: payload.queryText
        });
      }));
    }
  }, {
    key: FETCH_SEARCH_ENTRIES,
    value: function value(action$) {
      var _this = this;

      return action$.pipe(ofType(FETCH_SEARCH_ENTRIES), map(_prop('payload')), map(function (payload) {
        var query = _this.queryBuilder.buildQuery({
          queryType: 'search'
        });

        var variables = {
          queryString: payload.queryString ? payload.queryString.replace(/[%_]/g, '\\$&') : undefined
        };
        return {
          queryString: payload.queryString,
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
          Logger.epicError('fetchSearchEntriesEpic', context, error);
          return Actions.addDangerAlert({
            message: 'Error loading search results.'
          });
        }

        return Actions.updateSearchEntries({
          queryString: context.queryString,
          data: data
        });
      }));
    }
  }]);

  return SearchEpic;
}(Epic);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy9zZWFyY2gudHMiXSwibmFtZXMiOlsib2ZUeXBlIiwibWFwIiwibWVyZ2VNYXAiLCJBY3Rpb25zIiwiVFJJR0dFUl9TRUFSQ0giLCJGRVRDSF9TRUFSQ0hfRU5UUklFUyIsIkxvZ2dlciIsIkVwaWMiLCJTZWFyY2hFcGljIiwiYWN0aW9uJCIsInBpcGUiLCJwYXlsb2FkIiwiZmV0Y2hTZWFyY2hFbnRyaWVzIiwicXVlcnlTdHJpbmciLCJxdWVyeVRleHQiLCJxdWVyeSIsInF1ZXJ5QnVpbGRlciIsImJ1aWxkUXVlcnkiLCJxdWVyeVR5cGUiLCJ2YXJpYWJsZXMiLCJyZXBsYWNlIiwidW5kZWZpbmVkIiwiY29udGV4dCIsInNlbmRSZXF1ZXN0IiwidGhlbiIsImRhdGEiLCJlcnJvciIsImVwaWNFcnJvciIsImFkZERhbmdlckFsZXJ0IiwibWVzc2FnZSIsInVwZGF0ZVNlYXJjaEVudHJpZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsTUFBVCxRQUF1QixrQkFBdkI7QUFDQSxTQUFTQyxHQUFULEVBQWNDLFFBQWQsUUFBOEIsZ0JBQTlCO0FBQ0EsT0FBTyxLQUFLQyxPQUFaLE1BQXlCLFlBQXpCO0FBQ0EsU0FBU0MsY0FBVCxFQUF5QkMsb0JBQXpCLFFBQXFELGlCQUFyRDtBQUNBLE9BQU8sS0FBS0MsTUFBWixNQUF3QixpQkFBeEI7QUFFQSxTQUFTQyxJQUFULFFBQXFCLFFBQXJCO0FBRUEsV0FBYUMsVUFBYjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLFNBQ0dKLGNBREg7QUFBQSwwQkFDbUJLLE9BRG5CLEVBQ2lDO0FBQzdCLGFBQU9BLE9BQU8sQ0FBQ0MsSUFBUixDQUNMVixNQUFNLENBQUNJLGNBQUQsQ0FERCxFQUVMSCxHQUFHLENBQUMsTUFBTyxTQUFQLENBQUQsQ0FGRSxFQUdMQSxHQUFHLENBQUMsVUFBQ1UsT0FBRDtBQUFBLGVBQ0ZSLE9BQU8sQ0FBQ1Msa0JBQVIsQ0FBMkI7QUFBRUMsVUFBQUEsV0FBVyxFQUFFRixPQUFPLENBQUNHO0FBQXZCLFNBQTNCLENBREU7QUFBQSxPQUFELENBSEUsQ0FBUDtBQU9EO0FBVEg7QUFBQSxTQVdHVCxvQkFYSDtBQUFBLDBCQVd5QkksT0FYekIsRUFXdUM7QUFBQTs7QUFDbkMsYUFBT0EsT0FBTyxDQUFDQyxJQUFSLENBQ0xWLE1BQU0sQ0FBQ0ssb0JBQUQsQ0FERCxFQUVMSixHQUFHLENBQUMsTUFBTyxTQUFQLENBQUQsQ0FGRSxFQUdMQSxHQUFHLENBQUMsVUFBQ1UsT0FBRCxFQUEwQjtBQUM1QixZQUFNSSxLQUFLLEdBQUcsS0FBSSxDQUFDQyxZQUFMLENBQWtCQyxVQUFsQixDQUE2QjtBQUFFQyxVQUFBQSxTQUFTLEVBQUU7QUFBYixTQUE3QixDQUFkOztBQUNBLFlBQU1DLFNBQVMsR0FBRztBQUNoQk4sVUFBQUEsV0FBVyxFQUFFRixPQUFPLENBQUNFLFdBQVIsR0FDVEYsT0FBTyxDQUFDRSxXQUFSLENBQW9CTyxPQUFwQixDQUE0QixPQUE1QixFQUFxQyxNQUFyQyxDQURTLEdBRVRDO0FBSFksU0FBbEI7QUFNQSxlQUFPO0FBQUVSLFVBQUFBLFdBQVcsRUFBRUYsT0FBTyxDQUFDRSxXQUF2QjtBQUFvQ0UsVUFBQUEsS0FBSyxFQUFMQSxLQUFwQztBQUEyQ0ksVUFBQUEsU0FBUyxFQUFUQTtBQUEzQyxTQUFQO0FBQ0QsT0FURSxDQUhFLEVBYUxqQixRQUFRLENBQUMsVUFBQ29CLE9BQUQ7QUFBQSxlQUNQLEtBQUksQ0FBQ04sWUFBTCxDQUNHTyxXQURILENBQ2U7QUFBRVIsVUFBQUEsS0FBSyxFQUFFTyxPQUFPLENBQUNQLEtBQWpCO0FBQXdCSSxVQUFBQSxTQUFTLEVBQUVHLE9BQU8sQ0FBQ0g7QUFBM0MsU0FEZixFQUVHSyxJQUZILENBRVE7QUFBQSxjQUFHQyxJQUFILFFBQUdBLElBQUg7QUFBQSxjQUFTQyxLQUFULFFBQVNBLEtBQVQ7QUFBQSxpQkFBc0I7QUFBRUosWUFBQUEsT0FBTyxFQUFQQSxPQUFGO0FBQVdHLFlBQUFBLElBQUksRUFBSkEsSUFBWDtBQUFpQkMsWUFBQUEsS0FBSyxFQUFMQTtBQUFqQixXQUF0QjtBQUFBLFNBRlIsQ0FETztBQUFBLE9BQUQsQ0FiSCxFQWtCTHpCLEdBQUcsQ0FDRCxpQkFBdUU7QUFBQSxZQUFwRXFCLE9BQW9FLFNBQXBFQSxPQUFvRTtBQUFBLFlBQTNERyxJQUEyRCxTQUEzREEsSUFBMkQ7QUFBQSxZQUFyREMsS0FBcUQsU0FBckRBLEtBQXFEOztBQUNyRSxZQUFJQSxLQUFKLEVBQVc7QUFDVHBCLFVBQUFBLE1BQU0sQ0FBQ3FCLFNBQVAsQ0FBaUIsd0JBQWpCLEVBQTJDTCxPQUEzQyxFQUFvREksS0FBcEQ7QUFFQSxpQkFBT3ZCLE9BQU8sQ0FBQ3lCLGNBQVIsQ0FBdUI7QUFDNUJDLFlBQUFBLE9BQU8sRUFBRTtBQURtQixXQUF2QixDQUFQO0FBR0Q7O0FBRUQsZUFBTzFCLE9BQU8sQ0FBQzJCLG1CQUFSLENBQTRCO0FBQ2pDakIsVUFBQUEsV0FBVyxFQUFFUyxPQUFPLENBQUNULFdBRFk7QUFFakNZLFVBQUFBLElBQUksRUFBSkE7QUFGaUMsU0FBNUIsQ0FBUDtBQUlELE9BZEEsQ0FsQkUsQ0FBUDtBQW1DRDtBQS9DSDs7QUFBQTtBQUFBLEVBQWdDbEIsSUFBaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBvZlR5cGUgfSBmcm9tICdyZWR1eC1vYnNlcnZhYmxlJ1xuaW1wb3J0IHsgbWFwLCBtZXJnZU1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuaW1wb3J0ICogYXMgQWN0aW9ucyBmcm9tICcuLi9hY3Rpb25zJ1xuaW1wb3J0IHsgVFJJR0dFUl9TRUFSQ0gsIEZFVENIX1NFQVJDSF9FTlRSSUVTIH0gZnJvbSAnLi4vYWN0aW9uQ29uc3RzJ1xuaW1wb3J0ICogYXMgTG9nZ2VyIGZyb20gJy4uL3V0aWxzL0xvZ2dlcidcbmltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5pbXBvcnQgeyBFcGljIH0gZnJvbSAnLi9lcGljJ1xuXG5leHBvcnQgY2xhc3MgU2VhcmNoRXBpYyBleHRlbmRzIEVwaWMge1xuICBbVFJJR0dFUl9TRUFSQ0hdKGFjdGlvbiQ6IGFueSkge1xuICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoVFJJR0dFUl9TRUFSQ0gpLFxuICAgICAgbWFwKFIucHJvcCgncGF5bG9hZCcpKSxcbiAgICAgIG1hcCgocGF5bG9hZDogRXBpY1BheWxvYWQpID0+XG4gICAgICAgIEFjdGlvbnMuZmV0Y2hTZWFyY2hFbnRyaWVzKHsgcXVlcnlTdHJpbmc6IHBheWxvYWQucXVlcnlUZXh0IH0pXG4gICAgICApXG4gICAgKVxuICB9XG5cbiAgW0ZFVENIX1NFQVJDSF9FTlRSSUVTXShhY3Rpb24kOiBhbnkpIHtcbiAgICByZXR1cm4gYWN0aW9uJC5waXBlKFxuICAgICAgb2ZUeXBlKEZFVENIX1NFQVJDSF9FTlRSSUVTKSxcbiAgICAgIG1hcChSLnByb3AoJ3BheWxvYWQnKSksXG4gICAgICBtYXAoKHBheWxvYWQ6IEVwaWNQYXlsb2FkKSA9PiB7XG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5xdWVyeUJ1aWxkZXIuYnVpbGRRdWVyeSh7IHF1ZXJ5VHlwZTogJ3NlYXJjaCcgfSlcbiAgICAgICAgY29uc3QgdmFyaWFibGVzID0ge1xuICAgICAgICAgIHF1ZXJ5U3RyaW5nOiBwYXlsb2FkLnF1ZXJ5U3RyaW5nXG4gICAgICAgICAgICA/IHBheWxvYWQucXVlcnlTdHJpbmcucmVwbGFjZSgvWyVfXS9nLCAnXFxcXCQmJylcbiAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBxdWVyeVN0cmluZzogcGF5bG9hZC5xdWVyeVN0cmluZywgcXVlcnksIHZhcmlhYmxlcyB9XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKChjb250ZXh0OiBhbnkpID0+XG4gICAgICAgIHRoaXMucXVlcnlCdWlsZGVyXG4gICAgICAgICAgLnNlbmRSZXF1ZXN0KHsgcXVlcnk6IGNvbnRleHQucXVlcnksIHZhcmlhYmxlczogY29udGV4dC52YXJpYWJsZXMgfSlcbiAgICAgICAgICAudGhlbigoeyBkYXRhLCBlcnJvciB9KSA9PiAoeyBjb250ZXh0LCBkYXRhLCBlcnJvciB9KSlcbiAgICAgICksXG4gICAgICBtYXAoXG4gICAgICAgICh7IGNvbnRleHQsIGRhdGEsIGVycm9yIH06IHsgY29udGV4dDogYW55OyBkYXRhOiBhbnk7IGVycm9yOiBhbnkgfSkgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgTG9nZ2VyLmVwaWNFcnJvcignZmV0Y2hTZWFyY2hFbnRyaWVzRXBpYycsIGNvbnRleHQsIGVycm9yKVxuXG4gICAgICAgICAgICByZXR1cm4gQWN0aW9ucy5hZGREYW5nZXJBbGVydCh7XG4gICAgICAgICAgICAgIG1lc3NhZ2U6ICdFcnJvciBsb2FkaW5nIHNlYXJjaCByZXN1bHRzLidcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIEFjdGlvbnMudXBkYXRlU2VhcmNoRW50cmllcyh7XG4gICAgICAgICAgICBxdWVyeVN0cmluZzogY29udGV4dC5xdWVyeVN0cmluZyxcbiAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgICApXG4gICAgKVxuICB9XG59XG4iXX0=