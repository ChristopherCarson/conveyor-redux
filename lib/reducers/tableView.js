import "core-js/modules/es.date.to-string";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _getIterator from "@babel/runtime-corejs3/core-js/get-iterator";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _path from "ramda/src/path";
import _pipe from "ramda/src/pipe";
import _Object$entries from "@babel/runtime-corejs3/core-js-stable/object/entries";
import _dissocPath from "ramda/src/dissocPath";
import _isEmpty from "ramda/src/isEmpty";
import _isNil from "ramda/src/isNil";
import _spliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/splice";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _assocPath from "ramda/src/assocPath";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _pathOr from "ramda/src/pathOr";
import _prop from "ramda/src/prop";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof _Symbol === "undefined" || _getIteratorMethod(o) == null) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context = Object.prototype.toString.call(o)).call(_context, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { INDEX_ADD_FILTER, INDEX_DELETE_FILTER, INDEX_CLEAR_FILTERS, INDEX_CHANGE_FILTER_FIELD, CHANGE_REL_TABLE_PAGE, CHANGE_GOTO_PAGE, CHANGE_REL_GOTO_PAGE, UPDATE_OVERVIEW_DISPLAYED, UPDATE_OVERVIEW_SELECTED, INDEX_TABLE_SORT_CHANGE, INDEX_TABLE_FILTER_SUBMIT, COLLAPSE_TABLE_CHANGE, CHANGE_PAGE, UPDATE_MODEL_INDEX, INDEX_TABLE_FILTER_CHANGE, INDEX_TABLE_FILTER_DROPDOWN, UPDATE_MODEL_DETAIL } from '../actionConsts';
import { initState, DEFAULT_PAGINATION_AMT, removeAll, setValues } from '../utils/tableView';
import { Reducer } from './reducer';
export var TableViewReducer = /*#__PURE__*/function (_Reducer) {
  _inherits(TableViewReducer, _Reducer);

  var _super = _createSuper(TableViewReducer);

  function TableViewReducer(schema) {
    _classCallCheck(this, TableViewReducer);

    return _super.call(this, schema, initState);
  }

  _createClass(TableViewReducer, [{
    key: INDEX_ADD_FILTER,
    value: function value(state, action) {
      var payload = _prop('payload', action);

      var modelName = _prop('modelName', payload);

      var filterOrder = _pathOr([], [modelName, 'filter', 'filterOrder'], state);

      var newFilterOrder = _sliceInstanceProperty(filterOrder).call(filterOrder);

      newFilterOrder.push('');
      return _assocPath([modelName, 'filter', 'filterOrder'], newFilterOrder, state);
    }
  }, {
    key: INDEX_DELETE_FILTER,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload = _Object$assign({}, payload),
          modelName = _payload.modelName,
          index = _payload.index;

      var filterOrder = _pathOr([], [modelName, 'filter', 'filterOrder'], state);

      var fieldName = filterOrder[index];

      var newFilterOrder = _sliceInstanceProperty(filterOrder).call(filterOrder);

      _spliceInstanceProperty(newFilterOrder).call(newFilterOrder, index, 1);

      if (_isNil(newFilterOrder) || _isEmpty(newFilterOrder)) {
        return removeAll(state, modelName);
      }

      return _assocPath([modelName, 'filter', 'filterOrder'], newFilterOrder, _dissocPath([modelName, 'filter', 'filterValue', fieldName], state));
    }
  }, {
    key: INDEX_CLEAR_FILTERS,
    value: function value(state, action) {
      var payload = _prop('payload', action);

      var modelName = _prop('modelName', payload);

      return _assocPath([modelName, 'page', 'currentPage'], 0, removeAll(state, modelName));
    }
  }, {
    key: INDEX_CHANGE_FILTER_FIELD,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload2 = _Object$assign({}, payload),
          modelName = _payload2.modelName,
          fieldName = _payload2.fieldName,
          index = _payload2.index;

      var filterOrder = _pathOr([], [modelName, 'filter', 'filterOrder'], state);

      var newFilterOrder = _sliceInstanceProperty(filterOrder).call(filterOrder);

      newFilterOrder[index] = fieldName;
      return _assocPath([modelName, 'filter', 'filterOrder'], newFilterOrder, state);
    }
  }, {
    key: INDEX_TABLE_FILTER_CHANGE,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload3 = _Object$assign({}, payload),
          modelName = _payload3.modelName,
          fieldName = _payload3.fieldName,
          value = _payload3.value;

      return _assocPath([modelName, 'filter', 'filterValue', fieldName, 'value'], value, state);
    }
  }, {
    key: INDEX_TABLE_FILTER_DROPDOWN,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload4 = _Object$assign({}, payload),
          modelName = _payload4.modelName,
          fieldName = _payload4.fieldName,
          operator = _payload4.operator;

      return _assocPath([modelName, 'filter', 'filterValue', fieldName, 'operator'], operator, state);
    }
  }, {
    key: INDEX_TABLE_FILTER_SUBMIT,
    value: function value(state, action) {
      var payload = _prop('payload', action);

      var modelName = _prop('modelName', payload);

      var currentFilters = _pathOr([], [modelName, 'filter', 'filterOrder'], state);

      var filtersAreActive = !(_isNil(currentFilters) || _Object$entries(currentFilters).length === 0);
      return _pipe(_assocPath([modelName, 'filter', 'filtersAreActive'], filtersAreActive), _assocPath([modelName, 'page', 'currentPage'], 0))(state);
    }
  }, {
    key: INDEX_TABLE_SORT_CHANGE,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload5 = _Object$assign({}, payload),
          modelName = _payload5.modelName,
          fieldName = _payload5.fieldName,
          sortKey = _payload5.sortKey;

      return _pipe(_assocPath([modelName, 'sort'], {
        fieldName: fieldName,
        sortKey: sortKey
      }), _assocPath([modelName, 'page', 'currentPage'], 0))(state);
    }
  }, {
    key: COLLAPSE_TABLE_CHANGE,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload6 = _Object$assign({}, payload),
          modelName = _payload6.modelName,
          fieldName = _payload6.fieldName,
          collapse = _payload6.collapse;

      return _assocPath([modelName, 'fields', fieldName, 'collapse'], !collapse, state);
    }
  }, {
    key: CHANGE_PAGE,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload7 = _Object$assign({}, payload),
          modelName = _payload7.modelName,
          updatedPageIndex = _payload7.updatedPageIndex,
          _payload7$isValid = _payload7.isValid,
          isValid = _payload7$isValid === void 0 ? true : _payload7$isValid;

      var newState = _assocPath([modelName, 'page', 'canGoto'], isValid, state);

      if (!isValid) {
        return newState;
      }

      return _assocPath([modelName, 'page', 'currentPage'], updatedPageIndex, newState);
    } // todo: make sure works

  }, {
    key: CHANGE_REL_TABLE_PAGE,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload8 = _Object$assign({}, payload),
          modelName = _payload8.modelName,
          fieldName = _payload8.fieldName,
          updatedPageIndex = _payload8.updatedPageIndex,
          _payload8$isValid = _payload8.isValid,
          isValid = _payload8$isValid === void 0 ? true : _payload8$isValid;

      var newState = _assocPath([modelName, 'fields', fieldName, 'page', 'canGoto'], isValid, state);

      if (!isValid) {
        return newState;
      }

      return _assocPath([modelName, 'fields', fieldName, 'page', 'currentPage'], updatedPageIndex, newState);
    }
  }, {
    key: CHANGE_GOTO_PAGE,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload9 = _Object$assign({}, payload),
          modelName = _payload9.modelName,
          pageIndex = _payload9.pageIndex;

      return _assocPath([modelName, 'page', 'goto'], pageIndex, state);
    } // todo: make sure works

  }, {
    key: CHANGE_REL_GOTO_PAGE,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload10 = _Object$assign({}, payload),
          modelName = _payload10.modelName,
          fieldName = _payload10.fieldName,
          pageIndex = _payload10.pageIndex;

      return _assocPath([modelName, 'fields', fieldName, 'page', 'goto'], pageIndex, state);
    }
  }, {
    key: UPDATE_MODEL_INDEX,
    value: function value(state, action) {
      var payload = _prop('payload', action);

      var modelName = _prop('modelName', payload); // @ts-ignore


      var count = _path(['payload', 'data', 'count'], action);

      var lastIndex = null;

      if (count) {
        // @ts-ignore
        lastIndex = Math.ceil(count / DEFAULT_PAGINATION_AMT);
      }

      return _pipe(_assocPath([modelName, 'page', 'lastIndex'], lastIndex), _assocPath([modelName, 'page', 'total'], count), _assocPath([modelName, 'page', 'amtPerPage'], DEFAULT_PAGINATION_AMT))(state);
    }
  }, {
    key: UPDATE_MODEL_DETAIL,
    value: function value(state, action) {
      var payload = _prop('payload', action);

      var modelName = _prop('modelName', payload); // @ts-ignore


      var newNode = _path(['payload', 'data', 'result'], action);

      if (newNode) {
        // @ts-ignore
        var _iterator = _createForOfIteratorHelper(_Object$entries(newNode)),
            _step;

        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _step$value = _slicedToArray(_step.value, 2),
                fieldName = _step$value[0],
                obj = _step$value[1];

            var type = this.schema.getType(modelName, fieldName); // if multi-rel type

            if (type && _includesInstanceProperty(type).call(type, 'ToMany') && !_isEmpty(obj)) {
              var totalDataLength = obj.length;
              var lastIndexRel = Math.ceil(totalDataLength / DEFAULT_PAGINATION_AMT);

              if (lastIndexRel > 0) {
                state = _pipe(_assocPath([modelName, 'fields', fieldName, 'page', 'lastIndex'], lastIndexRel), _assocPath([modelName, 'fields', fieldName, 'page', 'total'], totalDataLength), _assocPath([modelName, 'fields', fieldName, 'page', 'amtPerPage'], DEFAULT_PAGINATION_AMT))(state);
              }
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }

      return state;
    } // todo: not necessary in conveyor-redux: delete?

  }, {
    key: UPDATE_OVERVIEW_DISPLAYED,
    value: function value(state, action) {
      return setValues(state, _prop('payload', action), 'selected');
    } // todo: not necessary in conveyor-redux: delete?

  }, {
    key: UPDATE_OVERVIEW_SELECTED,
    value: function value(state, action) {
      return setValues(state, _prop('payload', action), 'displayed');
    }
  }]);

  return TableViewReducer;
}(Reducer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy90YWJsZVZpZXcudHMiXSwibmFtZXMiOlsiSU5ERVhfQUREX0ZJTFRFUiIsIklOREVYX0RFTEVURV9GSUxURVIiLCJJTkRFWF9DTEVBUl9GSUxURVJTIiwiSU5ERVhfQ0hBTkdFX0ZJTFRFUl9GSUVMRCIsIkNIQU5HRV9SRUxfVEFCTEVfUEFHRSIsIkNIQU5HRV9HT1RPX1BBR0UiLCJDSEFOR0VfUkVMX0dPVE9fUEFHRSIsIlVQREFURV9PVkVSVklFV19ESVNQTEFZRUQiLCJVUERBVEVfT1ZFUlZJRVdfU0VMRUNURUQiLCJJTkRFWF9UQUJMRV9TT1JUX0NIQU5HRSIsIklOREVYX1RBQkxFX0ZJTFRFUl9TVUJNSVQiLCJDT0xMQVBTRV9UQUJMRV9DSEFOR0UiLCJDSEFOR0VfUEFHRSIsIlVQREFURV9NT0RFTF9JTkRFWCIsIklOREVYX1RBQkxFX0ZJTFRFUl9DSEFOR0UiLCJJTkRFWF9UQUJMRV9GSUxURVJfRFJPUERPV04iLCJVUERBVEVfTU9ERUxfREVUQUlMIiwiaW5pdFN0YXRlIiwiREVGQVVMVF9QQUdJTkFUSU9OX0FNVCIsInJlbW92ZUFsbCIsInNldFZhbHVlcyIsIlJlZHVjZXIiLCJUYWJsZVZpZXdSZWR1Y2VyIiwic2NoZW1hIiwic3RhdGUiLCJhY3Rpb24iLCJwYXlsb2FkIiwibW9kZWxOYW1lIiwiZmlsdGVyT3JkZXIiLCJuZXdGaWx0ZXJPcmRlciIsInB1c2giLCJpbmRleCIsImZpZWxkTmFtZSIsInZhbHVlIiwib3BlcmF0b3IiLCJjdXJyZW50RmlsdGVycyIsImZpbHRlcnNBcmVBY3RpdmUiLCJsZW5ndGgiLCJzb3J0S2V5IiwiY29sbGFwc2UiLCJ1cGRhdGVkUGFnZUluZGV4IiwiaXNWYWxpZCIsIm5ld1N0YXRlIiwicGFnZUluZGV4IiwiY291bnQiLCJsYXN0SW5kZXgiLCJNYXRoIiwiY2VpbCIsIm5ld05vZGUiLCJvYmoiLCJ0eXBlIiwiZ2V0VHlwZSIsInRvdGFsRGF0YUxlbmd0aCIsImxhc3RJbmRl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YUFBT0wsU0FBUyxDQUFDSSxLQUFELEVBQVEsTUFBTyxTQUFQLEVBQWtCQyxNQUFsQixDQUFSLEVBQW1DLFVBQW5DLENBQWhCO0FBQ0QsS0F6UEgsQ0EyUEU7O0FBM1BGO0FBQUEsU0E0UEdqQix3QkE1UEg7QUFBQSwwQkE0UDZCZ0IsS0E1UDdCLEVBNFB5Q0MsTUE1UHpDLEVBNFBzRDtBQUNsRCxhQUFPTCxTQUFTLENBQUNJLEtBQUQsRUFBUSxNQUFPLFNBQVAsRUFBa0JDLE1BQWxCLENBQVIsRUFBbUMsV0FBbkMsQ0FBaEI7QUFDRDtBQTlQSDs7QUFBQTtBQUFBLEVBQXNDSixPQUF0QyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5pbXBvcnQge1xuICBJTkRFWF9BRERfRklMVEVSLFxuICBJTkRFWF9ERUxFVEVfRklMVEVSLFxuICBJTkRFWF9DTEVBUl9GSUxURVJTLFxuICBJTkRFWF9DSEFOR0VfRklMVEVSX0ZJRUxELFxuICBDSEFOR0VfUkVMX1RBQkxFX1BBR0UsXG4gIENIQU5HRV9HT1RPX1BBR0UsXG4gIENIQU5HRV9SRUxfR09UT19QQUdFLFxuICBVUERBVEVfT1ZFUlZJRVdfRElTUExBWUVELFxuICBVUERBVEVfT1ZFUlZJRVdfU0VMRUNURUQsXG4gIElOREVYX1RBQkxFX1NPUlRfQ0hBTkdFLFxuICBJTkRFWF9UQUJMRV9GSUxURVJfU1VCTUlULFxuICBDT0xMQVBTRV9UQUJMRV9DSEFOR0UsXG4gIENIQU5HRV9QQUdFLFxuICBVUERBVEVfTU9ERUxfSU5ERVgsXG4gIElOREVYX1RBQkxFX0ZJTFRFUl9DSEFOR0UsXG4gIElOREVYX1RBQkxFX0ZJTFRFUl9EUk9QRE9XTixcbiAgVVBEQVRFX01PREVMX0RFVEFJTFxufSBmcm9tICcuLi9hY3Rpb25Db25zdHMnXG5pbXBvcnQge1xuICBpbml0U3RhdGUsXG4gIERFRkFVTFRfUEFHSU5BVElPTl9BTVQsXG4gIHJlbW92ZUFsbCxcbiAgc2V0VmFsdWVzXG59IGZyb20gJy4uL3V0aWxzL3RhYmxlVmlldydcbmltcG9ydCB7IFNjaGVtYUJ1aWxkZXIgfSBmcm9tICdAYXV0b2ludmVudC9jb252ZXlvci1zY2hlbWEnXG5pbXBvcnQgeyBSZWR1Y2VyIH0gZnJvbSAnLi9yZWR1Y2VyJ1xuXG5leHBvcnQgY2xhc3MgVGFibGVWaWV3UmVkdWNlciBleHRlbmRzIFJlZHVjZXIge1xuICBjb25zdHJ1Y3RvcihzY2hlbWE6IFNjaGVtYUJ1aWxkZXIpIHtcbiAgICBzdXBlcihzY2hlbWEsIGluaXRTdGF0ZSlcbiAgfVxuXG4gIFtJTkRFWF9BRERfRklMVEVSXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBSLnByb3AoJ3BheWxvYWQnLCBhY3Rpb24pXG4gICAgY29uc3QgbW9kZWxOYW1lID0gUi5wcm9wKCdtb2RlbE5hbWUnLCBwYXlsb2FkKVxuICAgIGNvbnN0IGZpbHRlck9yZGVyID0gUi5wYXRoT3IoXG4gICAgICBbXSxcbiAgICAgIFttb2RlbE5hbWUsICdmaWx0ZXInLCAnZmlsdGVyT3JkZXInXSxcbiAgICAgIHN0YXRlXG4gICAgKSBhcyBhbnlbXVxuICAgIGNvbnN0IG5ld0ZpbHRlck9yZGVyID0gZmlsdGVyT3JkZXIuc2xpY2UoKVxuICAgIG5ld0ZpbHRlck9yZGVyLnB1c2goJycpXG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKFxuICAgICAgW21vZGVsTmFtZSwgJ2ZpbHRlcicsICdmaWx0ZXJPcmRlciddLFxuICAgICAgbmV3RmlsdGVyT3JkZXIsXG4gICAgICBzdGF0ZVxuICAgIClcbiAgfVxuXG4gIFtJTkRFWF9ERUxFVEVfRklMVEVSXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBSLnByb3AoJ3BheWxvYWQnLCBhY3Rpb24pXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHsgbW9kZWxOYW1lLCBpbmRleCB9ID0geyAuLi5wYXlsb2FkIH1cbiAgICBjb25zdCBmaWx0ZXJPcmRlciA9IFIucGF0aE9yKFxuICAgICAgW10sXG4gICAgICBbbW9kZWxOYW1lLCAnZmlsdGVyJywgJ2ZpbHRlck9yZGVyJ10sXG4gICAgICBzdGF0ZVxuICAgIClcbiAgICBjb25zdCBmaWVsZE5hbWUgPSBmaWx0ZXJPcmRlcltpbmRleF1cbiAgICBjb25zdCBuZXdGaWx0ZXJPcmRlciA9IGZpbHRlck9yZGVyLnNsaWNlKClcbiAgICBuZXdGaWx0ZXJPcmRlci5zcGxpY2UoaW5kZXgsIDEpXG4gICAgaWYgKFIuaXNOaWwobmV3RmlsdGVyT3JkZXIpIHx8IFIuaXNFbXB0eShuZXdGaWx0ZXJPcmRlcikpIHtcbiAgICAgIHJldHVybiByZW1vdmVBbGwoc3RhdGUsIG1vZGVsTmFtZSlcbiAgICB9XG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKFxuICAgICAgW21vZGVsTmFtZSwgJ2ZpbHRlcicsICdmaWx0ZXJPcmRlciddLFxuICAgICAgbmV3RmlsdGVyT3JkZXIsXG4gICAgICBSLmRpc3NvY1BhdGgoW21vZGVsTmFtZSwgJ2ZpbHRlcicsICdmaWx0ZXJWYWx1ZScsIGZpZWxkTmFtZV0sIHN0YXRlKVxuICAgIClcbiAgfVxuXG4gIFtJTkRFWF9DTEVBUl9GSUxURVJTXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBSLnByb3AoJ3BheWxvYWQnLCBhY3Rpb24pXG4gICAgY29uc3QgbW9kZWxOYW1lID0gUi5wcm9wKCdtb2RlbE5hbWUnLCBwYXlsb2FkKVxuICAgIHJldHVybiBSLmFzc29jUGF0aChcbiAgICAgIFttb2RlbE5hbWUsICdwYWdlJywgJ2N1cnJlbnRQYWdlJ10sXG4gICAgICAwLFxuICAgICAgcmVtb3ZlQWxsKHN0YXRlLCBtb2RlbE5hbWUpXG4gICAgKVxuICB9XG5cbiAgW0lOREVYX0NIQU5HRV9GSUxURVJfRklFTERdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IFIucHJvcCgncGF5bG9hZCcsIGFjdGlvbilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgaW5kZXggfSA9IHsgLi4ucGF5bG9hZCB9XG4gICAgY29uc3QgZmlsdGVyT3JkZXIgPSBSLnBhdGhPcihcbiAgICAgIFtdLFxuICAgICAgW21vZGVsTmFtZSwgJ2ZpbHRlcicsICdmaWx0ZXJPcmRlciddLFxuICAgICAgc3RhdGVcbiAgICApIGFzIGFueVtdXG4gICAgY29uc3QgbmV3RmlsdGVyT3JkZXIgPSBmaWx0ZXJPcmRlci5zbGljZSgpXG4gICAgbmV3RmlsdGVyT3JkZXJbaW5kZXhdID0gZmllbGROYW1lXG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKFxuICAgICAgW21vZGVsTmFtZSwgJ2ZpbHRlcicsICdmaWx0ZXJPcmRlciddLFxuICAgICAgbmV3RmlsdGVyT3JkZXIsXG4gICAgICBzdGF0ZVxuICAgIClcbiAgfVxuXG4gIFtJTkRFWF9UQUJMRV9GSUxURVJfQ0hBTkdFXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBSLnByb3AoJ3BheWxvYWQnLCBhY3Rpb24pXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHsgbW9kZWxOYW1lLCBmaWVsZE5hbWUsIHZhbHVlIH0gPSB7IC4uLnBheWxvYWQgfVxuICAgIHJldHVybiBSLmFzc29jUGF0aChcbiAgICAgIFttb2RlbE5hbWUsICdmaWx0ZXInLCAnZmlsdGVyVmFsdWUnLCBmaWVsZE5hbWUsICd2YWx1ZSddLFxuICAgICAgdmFsdWUsXG4gICAgICBzdGF0ZVxuICAgIClcbiAgfVxuXG4gIFtJTkRFWF9UQUJMRV9GSUxURVJfRFJPUERPV05dKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IFIucHJvcCgncGF5bG9hZCcsIGFjdGlvbilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgb3BlcmF0b3IgfSA9IHsgLi4ucGF5bG9hZCB9XG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKFxuICAgICAgW21vZGVsTmFtZSwgJ2ZpbHRlcicsICdmaWx0ZXJWYWx1ZScsIGZpZWxkTmFtZSwgJ29wZXJhdG9yJ10sXG4gICAgICBvcGVyYXRvcixcbiAgICAgIHN0YXRlXG4gICAgKVxuICB9XG5cbiAgW0lOREVYX1RBQkxFX0ZJTFRFUl9TVUJNSVRdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IFIucHJvcCgncGF5bG9hZCcsIGFjdGlvbilcbiAgICBjb25zdCBtb2RlbE5hbWUgPSBSLnByb3AoJ21vZGVsTmFtZScsIHBheWxvYWQpXG4gICAgY29uc3QgY3VycmVudEZpbHRlcnMgPSBSLnBhdGhPcihcbiAgICAgIFtdLFxuICAgICAgW21vZGVsTmFtZSwgJ2ZpbHRlcicsICdmaWx0ZXJPcmRlciddLFxuICAgICAgc3RhdGVcbiAgICApXG4gICAgY29uc3QgZmlsdGVyc0FyZUFjdGl2ZSA9ICEoXG4gICAgICBSLmlzTmlsKGN1cnJlbnRGaWx0ZXJzKSB8fCBPYmplY3QuZW50cmllcyhjdXJyZW50RmlsdGVycykubGVuZ3RoID09PSAwXG4gICAgKVxuICAgIHJldHVybiBSLnBpcGUoXG4gICAgICBSLmFzc29jUGF0aChbbW9kZWxOYW1lLCAnZmlsdGVyJywgJ2ZpbHRlcnNBcmVBY3RpdmUnXSwgZmlsdGVyc0FyZUFjdGl2ZSksXG4gICAgICBSLmFzc29jUGF0aChbbW9kZWxOYW1lLCAncGFnZScsICdjdXJyZW50UGFnZSddLCAwKVxuICAgICkoc3RhdGUpXG4gIH1cblxuICBbSU5ERVhfVEFCTEVfU09SVF9DSEFOR0VdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IFIucHJvcCgncGF5bG9hZCcsIGFjdGlvbilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgc29ydEtleSB9ID0geyAuLi5wYXlsb2FkIH1cbiAgICByZXR1cm4gUi5waXBlKFxuICAgICAgUi5hc3NvY1BhdGgoW21vZGVsTmFtZSwgJ3NvcnQnXSwgeyBmaWVsZE5hbWUsIHNvcnRLZXkgfSksXG4gICAgICBSLmFzc29jUGF0aChbbW9kZWxOYW1lLCAncGFnZScsICdjdXJyZW50UGFnZSddLCAwKVxuICAgICkoc3RhdGUpXG4gIH1cblxuICBbQ09MTEFQU0VfVEFCTEVfQ0hBTkdFXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBSLnByb3AoJ3BheWxvYWQnLCBhY3Rpb24pXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHsgbW9kZWxOYW1lLCBmaWVsZE5hbWUsIGNvbGxhcHNlIH0gPSB7IC4uLnBheWxvYWQgfVxuICAgIHJldHVybiBSLmFzc29jUGF0aChcbiAgICAgIFttb2RlbE5hbWUsICdmaWVsZHMnLCBmaWVsZE5hbWUsICdjb2xsYXBzZSddLFxuICAgICAgIWNvbGxhcHNlLFxuICAgICAgc3RhdGVcbiAgICApXG4gIH1cblxuICBbQ0hBTkdFX1BBR0VdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IFIucHJvcCgncGF5bG9hZCcsIGFjdGlvbilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIHVwZGF0ZWRQYWdlSW5kZXgsIGlzVmFsaWQgPSB0cnVlIH0gPSB7IC4uLnBheWxvYWQgfVxuICAgIGNvbnN0IG5ld1N0YXRlID0gUi5hc3NvY1BhdGgoW21vZGVsTmFtZSwgJ3BhZ2UnLCAnY2FuR290byddLCBpc1ZhbGlkLCBzdGF0ZSlcbiAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgIH1cbiAgICByZXR1cm4gUi5hc3NvY1BhdGgoXG4gICAgICBbbW9kZWxOYW1lLCAncGFnZScsICdjdXJyZW50UGFnZSddLFxuICAgICAgdXBkYXRlZFBhZ2VJbmRleCxcbiAgICAgIG5ld1N0YXRlXG4gICAgKVxuICB9XG5cbiAgLy8gdG9kbzogbWFrZSBzdXJlIHdvcmtzXG4gIFtDSEFOR0VfUkVMX1RBQkxFX1BBR0VdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IFIucHJvcCgncGF5bG9hZCcsIGFjdGlvbilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgdXBkYXRlZFBhZ2VJbmRleCwgaXNWYWxpZCA9IHRydWUgfSA9IHtcbiAgICAgIC4uLnBheWxvYWRcbiAgICB9XG4gICAgY29uc3QgbmV3U3RhdGUgPSBSLmFzc29jUGF0aChcbiAgICAgIFttb2RlbE5hbWUsICdmaWVsZHMnLCBmaWVsZE5hbWUsICdwYWdlJywgJ2NhbkdvdG8nXSxcbiAgICAgIGlzVmFsaWQsXG4gICAgICBzdGF0ZVxuICAgIClcbiAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgIHJldHVybiBuZXdTdGF0ZVxuICAgIH1cbiAgICByZXR1cm4gUi5hc3NvY1BhdGgoXG4gICAgICBbbW9kZWxOYW1lLCAnZmllbGRzJywgZmllbGROYW1lLCAncGFnZScsICdjdXJyZW50UGFnZSddLFxuICAgICAgdXBkYXRlZFBhZ2VJbmRleCxcbiAgICAgIG5ld1N0YXRlXG4gICAgKVxuICB9XG5cbiAgW0NIQU5HRV9HT1RPX1BBR0VdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IFIucHJvcCgncGF5bG9hZCcsIGFjdGlvbilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIHBhZ2VJbmRleCB9ID0geyAuLi5wYXlsb2FkIH1cbiAgICByZXR1cm4gUi5hc3NvY1BhdGgoW21vZGVsTmFtZSwgJ3BhZ2UnLCAnZ290byddLCBwYWdlSW5kZXgsIHN0YXRlKVxuICB9XG5cbiAgLy8gdG9kbzogbWFrZSBzdXJlIHdvcmtzXG4gIFtDSEFOR0VfUkVMX0dPVE9fUEFHRV0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBwYXlsb2FkID0gUi5wcm9wKCdwYXlsb2FkJywgYWN0aW9uKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCB7IG1vZGVsTmFtZSwgZmllbGROYW1lLCBwYWdlSW5kZXggfSA9IHsgLi4ucGF5bG9hZCB9XG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKFxuICAgICAgW21vZGVsTmFtZSwgJ2ZpZWxkcycsIGZpZWxkTmFtZSwgJ3BhZ2UnLCAnZ290byddLFxuICAgICAgcGFnZUluZGV4LFxuICAgICAgc3RhdGVcbiAgICApXG4gIH1cblxuICBbVVBEQVRFX01PREVMX0lOREVYXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBSLnByb3AoJ3BheWxvYWQnLCBhY3Rpb24pXG4gICAgY29uc3QgbW9kZWxOYW1lID0gUi5wcm9wKCdtb2RlbE5hbWUnLCBwYXlsb2FkKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBjb3VudCA9IFIucGF0aChbJ3BheWxvYWQnLCAnZGF0YScsICdjb3VudCddLCBhY3Rpb24pXG5cbiAgICBsZXQgbGFzdEluZGV4ID0gbnVsbFxuICAgIGlmIChjb3VudCkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgbGFzdEluZGV4ID0gTWF0aC5jZWlsKGNvdW50IC8gREVGQVVMVF9QQUdJTkFUSU9OX0FNVClcbiAgICB9XG5cbiAgICByZXR1cm4gUi5waXBlKFxuICAgICAgUi5hc3NvY1BhdGgoW21vZGVsTmFtZSwgJ3BhZ2UnLCAnbGFzdEluZGV4J10sIGxhc3RJbmRleCksXG4gICAgICBSLmFzc29jUGF0aChbbW9kZWxOYW1lLCAncGFnZScsICd0b3RhbCddLCBjb3VudCksXG4gICAgICBSLmFzc29jUGF0aChbbW9kZWxOYW1lLCAncGFnZScsICdhbXRQZXJQYWdlJ10sIERFRkFVTFRfUEFHSU5BVElPTl9BTVQpXG4gICAgKShzdGF0ZSlcbiAgfVxuXG4gIFtVUERBVEVfTU9ERUxfREVUQUlMXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBSLnByb3AoJ3BheWxvYWQnLCBhY3Rpb24pXG4gICAgY29uc3QgbW9kZWxOYW1lID0gUi5wcm9wKCdtb2RlbE5hbWUnLCBwYXlsb2FkKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBuZXdOb2RlID0gUi5wYXRoKFsncGF5bG9hZCcsICdkYXRhJywgJ3Jlc3VsdCddLCBhY3Rpb24pXG5cbiAgICBpZiAobmV3Tm9kZSkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgZm9yIChjb25zdCBbZmllbGROYW1lLCBvYmpdIG9mIE9iamVjdC5lbnRyaWVzKG5ld05vZGUpIGFzIGFueSkge1xuICAgICAgICBjb25zdCB0eXBlID0gdGhpcy5zY2hlbWEuZ2V0VHlwZShtb2RlbE5hbWUsIGZpZWxkTmFtZSlcblxuICAgICAgICAvLyBpZiBtdWx0aS1yZWwgdHlwZVxuICAgICAgICBpZiAodHlwZSAmJiB0eXBlLmluY2x1ZGVzKCdUb01hbnknKSAmJiAhUi5pc0VtcHR5KG9iaikpIHtcbiAgICAgICAgICBjb25zdCB0b3RhbERhdGFMZW5ndGggPSBvYmoubGVuZ3RoXG4gICAgICAgICAgY29uc3QgbGFzdEluZGV4UmVsID0gTWF0aC5jZWlsKFxuICAgICAgICAgICAgdG90YWxEYXRhTGVuZ3RoIC8gREVGQVVMVF9QQUdJTkFUSU9OX0FNVFxuICAgICAgICAgIClcbiAgICAgICAgICBpZiAobGFzdEluZGV4UmVsID4gMCkge1xuICAgICAgICAgICAgc3RhdGUgPSBSLnBpcGUoXG4gICAgICAgICAgICAgIFIuYXNzb2NQYXRoKFxuICAgICAgICAgICAgICAgIFttb2RlbE5hbWUsICdmaWVsZHMnLCBmaWVsZE5hbWUsICdwYWdlJywgJ2xhc3RJbmRleCddLFxuICAgICAgICAgICAgICAgIGxhc3RJbmRleFJlbFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBSLmFzc29jUGF0aChcbiAgICAgICAgICAgICAgICBbbW9kZWxOYW1lLCAnZmllbGRzJywgZmllbGROYW1lLCAncGFnZScsICd0b3RhbCddLFxuICAgICAgICAgICAgICAgIHRvdGFsRGF0YUxlbmd0aFxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICBSLmFzc29jUGF0aChcbiAgICAgICAgICAgICAgICBbbW9kZWxOYW1lLCAnZmllbGRzJywgZmllbGROYW1lLCAncGFnZScsICdhbXRQZXJQYWdlJ10sXG4gICAgICAgICAgICAgICAgREVGQVVMVF9QQUdJTkFUSU9OX0FNVFxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICApKHN0YXRlKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gc3RhdGVcbiAgfVxuXG4gIC8vIHRvZG86IG5vdCBuZWNlc3NhcnkgaW4gY29udmV5b3ItcmVkdXg6IGRlbGV0ZT9cbiAgW1VQREFURV9PVkVSVklFV19ESVNQTEFZRURdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgcmV0dXJuIHNldFZhbHVlcyhzdGF0ZSwgUi5wcm9wKCdwYXlsb2FkJywgYWN0aW9uKSwgJ3NlbGVjdGVkJylcbiAgfVxuXG4gIC8vIHRvZG86IG5vdCBuZWNlc3NhcnkgaW4gY29udmV5b3ItcmVkdXg6IGRlbGV0ZT9cbiAgW1VQREFURV9PVkVSVklFV19TRUxFQ1RFRF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICByZXR1cm4gc2V0VmFsdWVzKHN0YXRlLCBSLnByb3AoJ3BheWxvYWQnLCBhY3Rpb24pLCAnZGlzcGxheWVkJylcbiAgfVxufVxuIl19