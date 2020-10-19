import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _assoc from "ramda/src/assoc";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _map from "ramda/src/map";
import _pipe from "ramda/src/pipe";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _pathOr from "ramda/src/pathOr";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { SEARCH_QUERY_TEXT_CHANGED, SEARCH_QUERY_LINK_CLICKED, UPDATE_SEARCH_ENTRIES, SEARCH_BLUR, TRIGGER_SEARCH } from '../actionConsts';
import { initState } from '../utils/search';
import { Reducer } from './reducer';
export var SearchReducer = /*#__PURE__*/function (_Reducer) {
  _inherits(SearchReducer, _Reducer);

  var _super = _createSuper(SearchReducer);

  function SearchReducer(schema) {
    _classCallCheck(this, SearchReducer);

    return _super.call(this, schema, initState);
  }

  _createClass(SearchReducer, [{
    key: UPDATE_SEARCH_ENTRIES,
    value: function value(state, action) {
      var _this = this;

      var data = _pathOr([], ['payload', 'data'], action);

      if (data.length <= 0) {
        return _Object$assign({}, state, {
          entries: []
        });
      }

      var entries = _pipe(_map(function (entry) {
        return {
          id: entry.id,
          modelName: entry.__typename,
          // @ts-ignore
          modelLabel: _this.schema.getModelLabel({
            modelName: entry.__typename,
            node: entry
          }),
          name: _this.schema.getDisplayValue({
            modelName: entry.__typename,
            node: entry
          })
        };
      }), _map(function (obj) {
        var _context;

        return _Object$assign({}, obj, {
          detailURL: _concatInstanceProperty(_context = "/".concat(obj.modelName, "/")).call(_context, obj.id)
        });
      }))(data);

      return _Object$assign({}, state, {
        entries: entries
      });
    }
  }, {
    key: SEARCH_QUERY_TEXT_CHANGED,
    value: function value(state, action) {
      var newQueryText = action.payload.queryText;

      if (newQueryText) {
        return _assoc('queryText', newQueryText, state);
      }

      return initState;
    }
  }, {
    key: SEARCH_QUERY_LINK_CLICKED,
    value: function value() {
      return initState;
    }
  }, {
    key: SEARCH_BLUR,
    value: function value(state) {
      return _assoc('dropdown', false, state);
    }
  }, {
    key: TRIGGER_SEARCH,
    value: function value(state) {
      return _assoc('dropdown', true, state);
    }
  }]);

  return SearchReducer;
}(Reducer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9zZWFyY2gudHMiXSwibmFtZXMiOlsiU0VBUkNIX1FVRVJZX1RFWFRfQ0hBTkdFRCIsIlNFQVJDSF9RVUVSWV9MSU5LX0NMSUNLRUQiLCJVUERBVEVfU0VBUkNIX0VOVFJJRVMiLCJTRUFSQ0hfQkxVUiIsIlRSSUdHRVJfU0VBUkNIIiwiaW5pdFN0YXRlIiwiUmVkdWNlciIsIlNlYXJjaFJlZHVjZXIiLCJzY2hlbWEiLCJzdGF0ZSIsImFjdGlvbiIsImRhdGEiLCJsZW5ndGgiLCJlbnRyaWVzIiwiZW50cnkiLCJpZCIsIm1vZGVsTmFtZSIsIl9fdHlwZW5hbWUiLCJtb2RlbExhYmVsIiwiZ2V0TW9kZWxMYWJlbCIsIm5vZGUiLCJuYW1lIiwiZ2V0RGlzcGxheVZhbHVlIiwib2JqIiwiZGV0YWlsVVJMIiwibmV3UXVlcnlUZXh0IiwicGF5bG9hZCIsInF1ZXJ5VGV4dCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxTQUNFQSx5QkFERixFQUVFQyx5QkFGRixFQUdFQyxxQkFIRixFQUlFQyxXQUpGLEVBS0VDLGNBTEYsUUFNTyxpQkFOUDtBQU9BLFNBQVNDLFNBQVQsUUFBMEIsaUJBQTFCO0FBQ0EsU0FBU0MsT0FBVCxRQUF3QixXQUF4QjtBQUdBLFdBQWFDLGFBQWI7QUFBQTs7QUFBQTs7QUFDRSx5QkFBWUMsTUFBWixFQUFtQztBQUFBOztBQUFBLDZCQUMzQkEsTUFEMkIsRUFDbkJILFNBRG1CO0FBRWxDOztBQUhIO0FBQUEsU0FLR0gscUJBTEg7QUFBQSwwQkFLMEJPLEtBTDFCLEVBS3NDQyxNQUx0QyxFQUttRDtBQUFBOztBQUMvQyxVQUFNQyxJQUFjLEdBQUcsUUFBUyxFQUFULEVBQWEsQ0FBQyxTQUFELEVBQVksTUFBWixDQUFiLEVBQWtDRCxNQUFsQyxDQUF2Qjs7QUFDQSxVQUFJQyxJQUFJLENBQUNDLE1BQUwsSUFBZSxDQUFuQixFQUFzQjtBQUNwQixrQ0FBWUgsS0FBWjtBQUFtQkksVUFBQUEsT0FBTyxFQUFFO0FBQTVCO0FBQ0Q7O0FBRUQsVUFBTUEsT0FBTyxHQUFHLE1BQ2QsS0FBTSxVQUFDQyxLQUFEO0FBQUEsZUFBaUI7QUFDckJDLFVBQUFBLEVBQUUsRUFBRUQsS0FBSyxDQUFDQyxFQURXO0FBRXJCQyxVQUFBQSxTQUFTLEVBQUVGLEtBQUssQ0FBQ0csVUFGSTtBQUdyQjtBQUNBQyxVQUFBQSxVQUFVLEVBQUUsS0FBSSxDQUFDVixNQUFMLENBQVlXLGFBQVosQ0FBMEI7QUFDcENILFlBQUFBLFNBQVMsRUFBRUYsS0FBSyxDQUFDRyxVQURtQjtBQUVwQ0csWUFBQUEsSUFBSSxFQUFFTjtBQUY4QixXQUExQixDQUpTO0FBUXJCTyxVQUFBQSxJQUFJLEVBQUUsS0FBSSxDQUFDYixNQUFMLENBQVljLGVBQVosQ0FBNEI7QUFDaENOLFlBQUFBLFNBQVMsRUFBRUYsS0FBSyxDQUFDRyxVQURlO0FBRWhDRyxZQUFBQSxJQUFJLEVBQUVOO0FBRjBCLFdBQTVCO0FBUmUsU0FBakI7QUFBQSxPQUFOLENBRGMsRUFjZCxLQUFNLFVBQUFTLEdBQUc7QUFBQTs7QUFBQSxrQ0FDSkEsR0FESTtBQUVQQyxVQUFBQSxTQUFTLGdEQUFNRCxHQUFHLENBQUNQLFNBQVYsdUJBQXVCTyxHQUFHLENBQUNSLEVBQTNCO0FBRkY7QUFBQSxPQUFULENBZGMsRUFrQmRKLElBbEJjLENBQWhCOztBQW1CQSxnQ0FBWUYsS0FBWjtBQUFtQkksUUFBQUEsT0FBTyxFQUFQQTtBQUFuQjtBQUNEO0FBL0JIO0FBQUEsU0FpQ0diLHlCQWpDSDtBQUFBLDBCQWlDOEJTLEtBakM5QixFQWlDMENDLE1BakMxQyxFQWlDdUQ7QUFDbkQsVUFBTWUsWUFBWSxHQUFHZixNQUFNLENBQUNnQixPQUFQLENBQWVDLFNBQXBDOztBQUNBLFVBQUlGLFlBQUosRUFBa0I7QUFDaEIsZUFBTyxPQUFRLFdBQVIsRUFBcUJBLFlBQXJCLEVBQW1DaEIsS0FBbkMsQ0FBUDtBQUNEOztBQUNELGFBQU9KLFNBQVA7QUFDRDtBQXZDSDtBQUFBLFNBeUNHSix5QkF6Q0g7QUFBQSw0QkF5Q2dDO0FBQzVCLGFBQU9JLFNBQVA7QUFDRDtBQTNDSDtBQUFBLFNBNkNHRixXQTdDSDtBQUFBLDBCQTZDZ0JNLEtBN0NoQixFQTZDNEI7QUFDeEIsYUFBTyxPQUFRLFVBQVIsRUFBb0IsS0FBcEIsRUFBMkJBLEtBQTNCLENBQVA7QUFDRDtBQS9DSDtBQUFBLFNBaURHTCxjQWpESDtBQUFBLDBCQWlEbUJLLEtBakRuQixFQWlEK0I7QUFDM0IsYUFBTyxPQUFRLFVBQVIsRUFBb0IsSUFBcEIsRUFBMEJBLEtBQTFCLENBQVA7QUFDRDtBQW5ESDs7QUFBQTtBQUFBLEVBQW1DSCxPQUFuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5pbXBvcnQge1xuICBTRUFSQ0hfUVVFUllfVEVYVF9DSEFOR0VELFxuICBTRUFSQ0hfUVVFUllfTElOS19DTElDS0VELFxuICBVUERBVEVfU0VBUkNIX0VOVFJJRVMsXG4gIFNFQVJDSF9CTFVSLFxuICBUUklHR0VSX1NFQVJDSFxufSBmcm9tICcuLi9hY3Rpb25Db25zdHMnXG5pbXBvcnQgeyBpbml0U3RhdGUgfSBmcm9tICcuLi91dGlscy9zZWFyY2gnXG5pbXBvcnQgeyBSZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2VyJ1xuaW1wb3J0IHsgU2NoZW1hQnVpbGRlciB9IGZyb20gJ0BhdXRvaW52ZW50L2NvbnZleW9yLXNjaGVtYSdcblxuZXhwb3J0IGNsYXNzIFNlYXJjaFJlZHVjZXIgZXh0ZW5kcyBSZWR1Y2VyIHtcbiAgY29uc3RydWN0b3Ioc2NoZW1hOiBTY2hlbWFCdWlsZGVyKSB7XG4gICAgc3VwZXIoc2NoZW1hLCBpbml0U3RhdGUpXG4gIH1cblxuICBbVVBEQVRFX1NFQVJDSF9FTlRSSUVTXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IGRhdGE6IG9iamVjdFtdID0gUi5wYXRoT3IoW10sIFsncGF5bG9hZCcsICdkYXRhJ10sIGFjdGlvbilcbiAgICBpZiAoZGF0YS5sZW5ndGggPD0gMCkge1xuICAgICAgcmV0dXJuIHsgLi4uc3RhdGUsIGVudHJpZXM6IFtdIH1cbiAgICB9XG5cbiAgICBjb25zdCBlbnRyaWVzID0gUi5waXBlKFxuICAgICAgUi5tYXAoKGVudHJ5OiBhbnkpID0+ICh7XG4gICAgICAgIGlkOiBlbnRyeS5pZCxcbiAgICAgICAgbW9kZWxOYW1lOiBlbnRyeS5fX3R5cGVuYW1lLFxuICAgICAgICAvLyBAdHMtaWdub3JlXG4gICAgICAgIG1vZGVsTGFiZWw6IHRoaXMuc2NoZW1hLmdldE1vZGVsTGFiZWwoe1xuICAgICAgICAgIG1vZGVsTmFtZTogZW50cnkuX190eXBlbmFtZSxcbiAgICAgICAgICBub2RlOiBlbnRyeVxuICAgICAgICB9KSxcbiAgICAgICAgbmFtZTogdGhpcy5zY2hlbWEuZ2V0RGlzcGxheVZhbHVlKHtcbiAgICAgICAgICBtb2RlbE5hbWU6IGVudHJ5Ll9fdHlwZW5hbWUsXG4gICAgICAgICAgbm9kZTogZW50cnlcbiAgICAgICAgfSlcbiAgICAgIH0pKSxcbiAgICAgIFIubWFwKG9iaiA9PiAoe1xuICAgICAgICAuLi5vYmosXG4gICAgICAgIGRldGFpbFVSTDogYC8ke29iai5tb2RlbE5hbWV9LyR7b2JqLmlkfWBcbiAgICAgIH0pKVxuICAgICkoZGF0YSlcbiAgICByZXR1cm4geyAuLi5zdGF0ZSwgZW50cmllcyB9XG4gIH1cblxuICBbU0VBUkNIX1FVRVJZX1RFWFRfQ0hBTkdFRF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBuZXdRdWVyeVRleHQgPSBhY3Rpb24ucGF5bG9hZC5xdWVyeVRleHRcbiAgICBpZiAobmV3UXVlcnlUZXh0KSB7XG4gICAgICByZXR1cm4gUi5hc3NvYygncXVlcnlUZXh0JywgbmV3UXVlcnlUZXh0LCBzdGF0ZSlcbiAgICB9XG4gICAgcmV0dXJuIGluaXRTdGF0ZVxuICB9XG5cbiAgW1NFQVJDSF9RVUVSWV9MSU5LX0NMSUNLRURdKCkge1xuICAgIHJldHVybiBpbml0U3RhdGVcbiAgfVxuXG4gIFtTRUFSQ0hfQkxVUl0oc3RhdGU6IGFueSkge1xuICAgIHJldHVybiBSLmFzc29jKCdkcm9wZG93bicsIGZhbHNlLCBzdGF0ZSlcbiAgfVxuXG4gIFtUUklHR0VSX1NFQVJDSF0oc3RhdGU6IGFueSkge1xuICAgIHJldHVybiBSLmFzc29jKCdkcm9wZG93bicsIHRydWUsIHN0YXRlKVxuICB9XG59XG4iXX0=