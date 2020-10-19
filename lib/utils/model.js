import "core-js/modules/es.array.join";
import "core-js/modules/es.date.to-string";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _getIterator from "@babel/runtime-corejs3/core-js/get-iterator";
import _Array$isArray from "@babel/runtime-corejs3/core-js-stable/array/is-array";
import _getIteratorMethod from "@babel/runtime-corejs3/core-js/get-iterator-method";
import _Symbol from "@babel/runtime-corejs3/core-js-stable/symbol";
import _Array$from from "@babel/runtime-corejs3/core-js-stable/array/from";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _mergeDeepRight from "ramda/src/mergeDeepRight";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _propOr from "ramda/src/propOr";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _isNil from "ramda/src/isNil";
import _prop from "ramda/src/prop";
import _prepend from "ramda/src/prepend";
import _isEmpty from "ramda/src/isEmpty";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _Object$entries2 from "@babel/runtime-corejs3/core-js-stable/object/entries";
import _pathOr from "ramda/src/pathOr";
import _path from "ramda/src/path";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof _Symbol === "undefined" || _getIteratorMethod(o) == null) { if (_Array$isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = _getIterator(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { var _context2; if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = _sliceInstanceProperty(_context2 = Object.prototype.toString.call(o)).call(_context2, 8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return _Array$from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

import { selectTableView } from './tableView';
export var initState = {};
export var DEFAULT_PAGINATION_AMT = 20;

var slicePageData = function slicePageData(data, idx) {
  var firstIdx = (idx - 1) * DEFAULT_PAGINATION_AMT;
  var lastIdx = idx * DEFAULT_PAGINATION_AMT; //const firstIdx = idx * DEFAULT_PAGINATION_AMT // obj of firstIdx included
  //const lastIdx = (idx + 1) * DEFAULT_PAGINATION_AMT // obj of lastIdx NOT included => cutoff point
  // slice(first_index, cutoff_index)

  return _sliceInstanceProperty(data).call(data, firstIdx, lastIdx);
};

export var getModelStore = function getModelStore(state, modelName) {
  return _path(['conveyor', 'model', modelName], state);
};
export var getPaginatedNode = function getPaginatedNode(schema, state, modelName, id) {
  var modelStore = getModelStore(state, modelName);

  var node = _pathOr(null, ['values', id], modelStore); // do not change the redux store


  var updatedNode = modelStore === 'NOTFOUND' ? null : {};

  if (node) {
    for (var _i = 0, _Object$entries = _Object$entries2(node); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          fieldName = _Object$entries$_i[0],
          obj = _Object$entries$_i[1];

      var type = schema.getType(modelName, fieldName); // if multi-rel type

      if (type && _includesInstanceProperty(type).call(type, 'ToMany') && !_isEmpty(obj)) {
        var idx = _pathOr(1, [modelName, 'fields', fieldName, 'page', 'currentPage'], selectTableView(state)); // @ts-ignore


        updatedNode[fieldName] = slicePageData(obj, idx);
      } else {
        // @ts-ignore
        updatedNode[fieldName] = obj;
      }
    }
  }

  return updatedNode;
};
export var getTabIdentifier = function getTabIdentifier(_ref) {
  var modelName = _ref.modelName,
      tabList = _ref.tabList;
  return _prepend(modelName, tabList).join('.');
};
export var getDefaultModelStore = function getDefaultModelStore() {
  return {
    order: [],
    values: {}
  };
};
export var getOrderedValues = function getOrderedValues(store) {
  var order = _prop('order', store);

  var values = _prop('values', store);

  if (_isNil(order) || _isNil(values)) {
    return [];
  }

  return _mapInstanceProperty(order).call(order, function (id) {
    return values[id];
  });
};
export var updateIndex = function updateIndex(state, modelName, data) {
  if (!data) data = [];

  var oldStore = _propOr(getDefaultModelStore(), modelName, state);

  var newStore = getDefaultModelStore();
  newStore.order = _mapInstanceProperty(data).call(data, _prop('id'));

  var _iterator = _createForOfIteratorHelper(data),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;

      var oldNode = _propOr({}, node.id, _valuesInstanceProperty(oldStore));

      _valuesInstanceProperty(newStore)[node.id] = _mergeDeepRight(oldNode, node);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return _Object$assign({}, state, _defineProperty({}, modelName, newStore));
};
export var selectModel = _pathOr(initState, ['conveyor', 'model']);
export var getDetailUrl = function getDetailUrl(_ref2) {
  var _context;

  var modelName = _ref2.modelName,
      id = _ref2.id;
  return _concatInstanceProperty(_context = "/".concat(modelName, "/")).call(_context, id);
};
export var getIndexUrl = function getIndexUrl(_ref3) {
  var modelName = _ref3.modelName;
  return "/".concat(modelName);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tb2RlbC50cyJdLCJuYW1lcyI6WyJzZWxlY3RUYWJsZVZpZXciLCJpbml0U3RhdGUiLCJERUZBVUxUX1BBR0lOQVRJT05fQU1UIiwic2xpY2VQYWdlRGF0YSIsImRhdGEiLCJpZHgiLCJmaXJzdElkeCIsImxhc3RJZHgiLCJnZXRNb2RlbFN0b3JlIiwic3RhdGUiLCJtb2RlbE5hbWUiLCJnZXRQYWdpbmF0ZWROb2RlIiwic2NoZW1hIiwiaWQiLCJtb2RlbFN0b3JlIiwibm9kZSIsInVwZGF0ZWROb2RlIiwiZmllbGROYW1lIiwib2JqIiwidHlwZSIsImdldFR5cGUiLCJnZXRUYWJJZGVudGlmaWVyIiwidGFiTGlzdCIsImpvaW4iLCJnZXREZWZhdWx0TW9kZWxTdG9yZSIsIm9yZGVyIiwidmFsdWVzIiwiZ2V0T3JkZXJlZFZhbHVlcyIsInN0b3JlIiwidXBkYXRlSW5kZXgiLCJvbGRTdG9yZSIsIm5ld1N0b3JlIiwib2xkTm9kZSIsInNlbGVjdE1vZGVsIiwiZ2V0RGV0YWlsVXJsIiwiZ2V0SW5kZXhVcmwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxTQUFTQSxlQUFULFFBQWdDLGFBQWhDO0FBR0EsT0FBTyxJQUFNQyxTQUFTLEdBQUcsRUFBbEI7QUFFUCxPQUFPLElBQU1DLHNCQUFzQixHQUFHLEVBQS9COztBQUVQLElBQU1DLGFBQWEsR0FBRyxTQUFoQkEsYUFBZ0IsQ0FBQ0MsSUFBRCxFQUFZQyxHQUFaLEVBQTRCO0FBQ2hELE1BQU1DLFFBQVEsR0FBRyxDQUFDRCxHQUFHLEdBQUcsQ0FBUCxJQUFZSCxzQkFBN0I7QUFDQSxNQUFNSyxPQUFPLEdBQUdGLEdBQUcsR0FBR0gsc0JBQXRCLENBRmdELENBR2hEO0FBQ0E7QUFFQTs7QUFDQSxTQUFPLHVCQUFBRSxJQUFJLE1BQUosQ0FBQUEsSUFBSSxFQUFPRSxRQUFQLEVBQWlCQyxPQUFqQixDQUFYO0FBQ0QsQ0FSRDs7QUFV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b20gJ3JhbWRhJ1xuaW1wb3J0IHsgc2VsZWN0VGFibGVWaWV3IH0gZnJvbSAnLi90YWJsZVZpZXcnXG5pbXBvcnQgeyBTY2hlbWFCdWlsZGVyIH0gZnJvbSAnQGF1dG9pbnZlbnQvY29udmV5b3Itc2NoZW1hJ1xuXG5leHBvcnQgY29uc3QgaW5pdFN0YXRlID0ge31cblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfUEFHSU5BVElPTl9BTVQgPSAyMFxuXG5jb25zdCBzbGljZVBhZ2VEYXRhID0gKGRhdGE6IGFueSwgaWR4OiBudW1iZXIpID0+IHtcbiAgY29uc3QgZmlyc3RJZHggPSAoaWR4IC0gMSkgKiBERUZBVUxUX1BBR0lOQVRJT05fQU1UXG4gIGNvbnN0IGxhc3RJZHggPSBpZHggKiBERUZBVUxUX1BBR0lOQVRJT05fQU1UXG4gIC8vY29uc3QgZmlyc3RJZHggPSBpZHggKiBERUZBVUxUX1BBR0lOQVRJT05fQU1UIC8vIG9iaiBvZiBmaXJzdElkeCBpbmNsdWRlZFxuICAvL2NvbnN0IGxhc3RJZHggPSAoaWR4ICsgMSkgKiBERUZBVUxUX1BBR0lOQVRJT05fQU1UIC8vIG9iaiBvZiBsYXN0SWR4IE5PVCBpbmNsdWRlZCA9PiBjdXRvZmYgcG9pbnRcblxuICAvLyBzbGljZShmaXJzdF9pbmRleCwgY3V0b2ZmX2luZGV4KVxuICByZXR1cm4gZGF0YS5zbGljZShmaXJzdElkeCwgbGFzdElkeClcbn1cblxuZXhwb3J0IGNvbnN0IGdldE1vZGVsU3RvcmUgPSAoc3RhdGU6IGFueSwgbW9kZWxOYW1lOiBzdHJpbmcpID0+XG4gIFIucGF0aChbJ2NvbnZleW9yJywgJ21vZGVsJywgbW9kZWxOYW1lXSwgc3RhdGUpXG5cbmV4cG9ydCBjb25zdCBnZXRQYWdpbmF0ZWROb2RlID0gKFxuICBzY2hlbWE6IFNjaGVtYUJ1aWxkZXIsXG4gIHN0YXRlOiBhbnksXG4gIG1vZGVsTmFtZTogc3RyaW5nLFxuICBpZDogc3RyaW5nXG4pID0+IHtcbiAgY29uc3QgbW9kZWxTdG9yZSA9IGdldE1vZGVsU3RvcmUoc3RhdGUsIG1vZGVsTmFtZSlcbiAgY29uc3Qgbm9kZSA9IFIucGF0aE9yKG51bGwsIFsndmFsdWVzJywgaWRdLCBtb2RlbFN0b3JlKVxuXG4gIC8vIGRvIG5vdCBjaGFuZ2UgdGhlIHJlZHV4IHN0b3JlXG4gIGNvbnN0IHVwZGF0ZWROb2RlID0gbW9kZWxTdG9yZSA9PT0gJ05PVEZPVU5EJyA/IG51bGwgOiB7fVxuICBpZiAobm9kZSkge1xuICAgIGZvciAoY29uc3QgW2ZpZWxkTmFtZSwgb2JqXSBvZiBPYmplY3QuZW50cmllcyhub2RlKSkge1xuICAgICAgY29uc3QgdHlwZSA9IHNjaGVtYS5nZXRUeXBlKG1vZGVsTmFtZSwgZmllbGROYW1lKVxuXG4gICAgICAvLyBpZiBtdWx0aS1yZWwgdHlwZVxuICAgICAgaWYgKHR5cGUgJiYgdHlwZS5pbmNsdWRlcygnVG9NYW55JykgJiYgIVIuaXNFbXB0eShvYmopKSB7XG4gICAgICAgIGNvbnN0IGlkeCA9IFIucGF0aE9yKFxuICAgICAgICAgIDEsXG4gICAgICAgICAgW21vZGVsTmFtZSwgJ2ZpZWxkcycsIGZpZWxkTmFtZSwgJ3BhZ2UnLCAnY3VycmVudFBhZ2UnXSxcbiAgICAgICAgICBzZWxlY3RUYWJsZVZpZXcoc3RhdGUpXG4gICAgICAgIClcbiAgICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgICB1cGRhdGVkTm9kZVtmaWVsZE5hbWVdID0gc2xpY2VQYWdlRGF0YShvYmosIGlkeClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgdXBkYXRlZE5vZGVbZmllbGROYW1lXSA9IG9ialxuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdXBkYXRlZE5vZGVcbn1cblxuZXhwb3J0IGNvbnN0IGdldFRhYklkZW50aWZpZXIgPSAoe1xuICBtb2RlbE5hbWUsXG4gIHRhYkxpc3Rcbn06IHtcbiAgbW9kZWxOYW1lOiBzdHJpbmdcbiAgdGFiTGlzdDogYW55XG59KSA9PiB7XG4gIHJldHVybiBSLnByZXBlbmQobW9kZWxOYW1lLCB0YWJMaXN0KS5qb2luKCcuJylcbn1cblxuZXhwb3J0IGNvbnN0IGdldERlZmF1bHRNb2RlbFN0b3JlID0gKCkgPT4gKHsgb3JkZXI6IFtdLCB2YWx1ZXM6IHt9IH0pXG5cbmV4cG9ydCBjb25zdCBnZXRPcmRlcmVkVmFsdWVzID0gKHN0b3JlOiBhbnkpID0+IHtcbiAgY29uc3Qgb3JkZXIgPSBSLnByb3AoJ29yZGVyJywgc3RvcmUpXG4gIGNvbnN0IHZhbHVlcyA9IFIucHJvcCgndmFsdWVzJywgc3RvcmUpXG4gIGlmIChSLmlzTmlsKG9yZGVyKSB8fCBSLmlzTmlsKHZhbHVlcykpIHtcbiAgICByZXR1cm4gW11cbiAgfVxuICByZXR1cm4gb3JkZXIubWFwKChpZDogc3RyaW5nKSA9PiB2YWx1ZXNbaWRdKVxufVxuXG5leHBvcnQgY29uc3QgdXBkYXRlSW5kZXggPSAoc3RhdGU6IGFueSwgbW9kZWxOYW1lOiBzdHJpbmcsIGRhdGE6IGFueSkgPT4ge1xuICBpZiAoIWRhdGEpIGRhdGEgPSBbXVxuICBjb25zdCBvbGRTdG9yZSA9IFIucHJvcE9yKGdldERlZmF1bHRNb2RlbFN0b3JlKCksIG1vZGVsTmFtZSwgc3RhdGUpIGFzIGFueVxuICBjb25zdCBuZXdTdG9yZSA9IGdldERlZmF1bHRNb2RlbFN0b3JlKCkgYXMgYW55XG5cbiAgbmV3U3RvcmUub3JkZXIgPSBkYXRhLm1hcChSLnByb3AoJ2lkJykpXG4gIGZvciAoY29uc3Qgbm9kZSBvZiBkYXRhKSB7XG4gICAgY29uc3Qgb2xkTm9kZSA9IFIucHJvcE9yKHt9LCBub2RlLmlkLCBvbGRTdG9yZS52YWx1ZXMpXG4gICAgbmV3U3RvcmUudmFsdWVzW25vZGUuaWRdID0gUi5tZXJnZURlZXBSaWdodChvbGROb2RlLCBub2RlKVxuICB9XG4gIHJldHVybiB7IC4uLnN0YXRlLCBbbW9kZWxOYW1lXTogbmV3U3RvcmUgfVxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0TW9kZWwgPSBSLnBhdGhPcihpbml0U3RhdGUsIFsnY29udmV5b3InLCAnbW9kZWwnXSlcbmV4cG9ydCBjb25zdCBnZXREZXRhaWxVcmwgPSAoe1xuICBtb2RlbE5hbWUsXG4gIGlkXG59OiB7XG4gIG1vZGVsTmFtZTogc3RyaW5nXG4gIGlkOiBzdHJpbmdcbn0pID0+IGAvJHttb2RlbE5hbWV9LyR7aWR9YFxuZXhwb3J0IGNvbnN0IGdldEluZGV4VXJsID0gKHsgbW9kZWxOYW1lIH06IHsgbW9kZWxOYW1lOiBzdHJpbmcgfSkgPT5cbiAgYC8ke21vZGVsTmFtZX1gXG4iXX0=