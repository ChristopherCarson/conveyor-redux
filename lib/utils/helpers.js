import "core-js/modules/es.array.join";
import "core-js/modules/es.array-buffer.constructor";
import "core-js/modules/es.array-buffer.slice";
import "core-js/modules/es.data-view";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.exec";
import "core-js/modules/es.string.split";
import _reduce from "ramda/src/reduce";
import _equals from "ramda/src/equals";
import _dropLastWhile from "ramda/src/dropLastWhile";
import _JSON$stringify from "@babel/runtime-corejs3/core-js-stable/json/stringify";
import _pickBy from "ramda/src/pickBy";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _slicedToArray from "@babel/runtime-corejs3/helpers/esm/slicedToArray";
import _Object$entries from "@babel/runtime-corejs3/core-js-stable/object/entries";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/esm/toConsumableArray";
import _dissoc from "ramda/src/dissoc";
import _pipe from "ramda/src/pipe";
import _mapObjIndexed from "ramda/src/mapObjIndexed";
import _sliceInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/slice";
import _append from "ramda/src/append";
import _forEach from "ramda/src/forEach";
import _typeof from "@babel/runtime-corejs3/helpers/esm/typeof";
import _includesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/includes";
import _pathOr from "ramda/src/pathOr";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _identity from "ramda/src/identity";
import _filter from "ramda/src/filter";
import _merge from "ramda/src/merge";
import _map from "ramda/src/map";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _propOr from "ramda/src/propOr";
import _isEmpty from "ramda/src/isEmpty";
import _isNil from "ramda/src/isNil";
import _path from "ramda/src/path";
import _prop from "ramda/src/prop";
import { inputTypes } from '@autoinvent/conveyor-schema';
import * as Actions from '../actions';
import * as consts from '../actionConsts';
import * as Logger from './Logger';
import { DEFAULT_PAGINATION_AMT } from './tableView';
export var storeValueToArrayBuffer = function storeValueToArrayBuffer(value) {
  var arrayBuffer = new ArrayBuffer(value.length);
  var view = new DataView(arrayBuffer);

  for (var i = 0; i < value.length; ++i) {
    view.setUint8(i, value[i]);
  }

  return arrayBuffer;
};
export var getFilters = function getFilters(_ref) {
  var schema = _ref.schema,
      modelName = _ref.modelName,
      tableView = _ref.tableView;
  var fields = schema.getFields(modelName);

  var getFieldFilter = function getFieldFilter(field) {
    var fieldName = _prop('fieldName', field);

    var operator = _path([modelName, 'filter', 'filterValue', fieldName, 'operator', 'value'], tableView);

    var value = _path([modelName, 'filter', 'filterValue', fieldName, 'value'], tableView);

    if (operator && schema.isBoolean(modelName, fieldName)) {
      return {
        operator: operator,
        value: _isNil(value) ? false : value
      };
    }

    if (operator && !_isNil(value) && !_isEmpty(value)) {
      if (schema.isRel(modelName, fieldName)) {
        if (schema.isManyToOne(modelName, fieldName) || schema.isOneToOne(modelName, fieldName)) {
          return {
            operator: operator,
            value: _propOr(value, 'value', value)
          };
        }

        return {
          operator: operator,
          value: _mapInstanceProperty(value).call(value, function (val) {
            return val.value;
          })
        };
      }

      if (schema.isEnum(modelName, fieldName)) {
        return {
          operator: operator,
          value: value.value
        };
      }

      return {
        operator: operator,
        value: value
      };
    }

    return undefined;
  };

  var filters = _map(getFieldFilter, fields); // filterFields: default filters, in addition filters set by user; always active


  var defaultFilters = _path([modelName, 'filterFields'], schema.schemaJSON);

  if (defaultFilters) {
    filters = _merge(filters, defaultFilters);
  }

  return _filter(_identity, filters);
};
export var getSort = function getSort(_ref2) {
  var schema = _ref2.schema,
      modelName = _ref2.modelName,
      tableView = _ref2.tableView;

  // get sort from user input
  if (tableView) {
    var sortKey = _path([modelName, 'sort', 'sortKey'], tableView);

    var fieldName = _path([modelName, 'sort', 'fieldName'], tableView);

    if (sortKey && fieldName) {
      var _context;

      return [_concatInstanceProperty(_context = "".concat(fieldName, "_")).call(_context, sortKey)];
    }
  } // otherwise, get default sort from schema
  // sortFields: camel-case fields followed by '_asc' or '_desc'.


  return _path([modelName, 'sortFields'], schema.schemaJSON);
};
export var getPage = function getPage(_ref3) {
  var modelName = _ref3.modelName,
      tableView = _ref3.tableView;

  var currentPage = _pathOr(1, [modelName, 'page', 'currentPage'], tableView); // eslint-disable-next-line @typescript-eslint/camelcase


  return {
    current: currentPage,
    per_page: DEFAULT_PAGINATION_AMT
  };
};
export var editFieldToQueryInput = function editFieldToQueryInput(_ref4) {
  var schema = _ref4.schema,
      modelName = _ref4.modelName,
      fieldName = _ref4.fieldName,
      value = _ref4.value,
      type = _ref4.type;

  if (type === undefined && schema) {
    type = schema.getType(modelName, fieldName);
  }

  if (fieldName === '__typename') {
    return;
  }

  if (_includesInstanceProperty(type).call(type, 'ToMany')) {
    if (_isNil(value)) {
      return [];
    }

    return _mapInstanceProperty(value).call(value, function (value) {
      return _prop('value', value);
    });
  } else if (_includesInstanceProperty(type).call(type, 'ToOne')) {
    return _propOr(null, 'value', value);
  } else if (type === 'enum') {
    return _propOr(null, 'value', value);
  } else if (type === 'file') {
    if (_isNil(value)) {
      return value;
    }

    return storeValueToArrayBuffer(value);
  } else if (type === 'boolean') {
    return _typeof(value) === _typeof(false) ? value : false;
  }

  return value;
};
export var isValidationError = function isValidationError(response) {
  return _prop('status', response) === 200;
};

var errorMap = function errorMap(_ref5) {
  var schema = _ref5.schema,
      type = _ref5.type,
      fields = _ref5.fields,
      message = _ref5.message,
      modelName = _ref5.modelName;
  var fieldNames = [];

  _forEach(function (fieldName) {
    fieldNames = _append( // todo: pass 'node' and 'data' props
    schema.getFieldLabel({
      modelName: modelName,
      fieldName: fieldName
    }), fieldNames);
  }, fields);

  switch (type) {
    case consts.UNIQUE_CONSTRAINT:
      {
        var _context2;

        var len = fieldNames.length;
        var extra = '';

        if (len > 1) {
          extra = "combination of ".concat(_sliceInstanceProperty(fieldNames).call(fieldNames, 0, fieldNames.length - 1).join(', '), " and ");
        }

        var last = fieldNames[fieldNames.length - 1];
        return _concatInstanceProperty(_context2 = "This ".concat(extra)).call(_context2, last, " already exists.");
      }

    default:
      return message;
  }
};

var getValidationMessage = function getValidationMessage(_ref6) {
  var schema = _ref6.schema,
      context = _ref6.context,
      parsedErrors = _ref6.parsedErrors;
  return _mapObjIndexed(function (fieldErrors) {
    var errorsList = [];

    _forEach(function (e) {
      var message = errorMap({
        type: _prop('type', e),
        fields: _prop('group', e),
        message: _prop('message', e),
        modelName: _prop('modelName', context),
        schema: schema
      });

      if (message) {
        errorsList = _append(message, errorsList);
      }
    }, fieldErrors);

    return errorsList;
  }, parsedErrors);
};

var parseValidationErrors = function parseValidationErrors(response) {
  var errorsStr = _path(['errors', 0, 'message'], response);

  var errors = [];

  try {
    errors = JSON.parse(errorsStr);
  } catch (e) {
    Logger.inputValidationParseValidationErrors(response, e);
  }

  return errors;
};

export var prepValidationErrors = function prepValidationErrors(_ref7) {
  var schema = _ref7.schema,
      context = _ref7.context,
      error = _ref7.error;
  var parsedErrors = parseValidationErrors(error.response);
  return getValidationMessage({
    schema: schema,
    context: context,
    parsedErrors: parsedErrors
  });
};
export var getEditMutationInputVariables = function getEditMutationInputVariables(_ref8) {
  var schema = _ref8.schema,
      modelName = _ref8.modelName,
      node = _ref8.node;
  return _pipe(_mapObjIndexed(function (value, fieldName) {
    return editFieldToQueryInput({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      value: value
    });
  }), _dissoc('__typename'), _dissoc('id'))(node);
};
export var getDeleteErrors = function getDeleteErrors(_ref9) {
  var data = _ref9.data,
      context = _ref9.context;
  return _path(['delete' + context.modelName, 'errors'], data);
};

var getInputValue = function getInputValue(fieldName, formStack) {
  var index = _prop('index', formStack);

  return _path(['stack', index, 'fields', fieldName], formStack);
}; // get input values from a create form


export var getCreateSubmitValues = function getCreateSubmitValues(_ref10) {
  var _context3, _context4;

  var schema = _ref10.schema,
      formStack = _ref10.formStack,
      modelName = _ref10.modelName;

  var createFields = _filter(function (field) {
    return _propOr(true, 'showCreate', field);
  }, schema.getFields(modelName));

  var formStackIndex = _prop('index', formStack);

  var origin = _prop('originModelName', formStack);

  if (origin && formStackIndex === 0) {
    var originFieldName = _prop('originFieldName', formStack);

    createFields[originFieldName] = originFieldName;
  }

  var inputs = _Object$assign.apply(Object, _concatInstanceProperty(_context3 = [{}]).call(_context3, _toConsumableArray(_mapInstanceProperty(_context4 = _Object$entries(createFields)).call(_context4, function (_ref11) {
    var _ref12 = _slicedToArray(_ref11, 1),
        fieldName = _ref12[0];

    return _defineProperty({}, fieldName, editFieldToQueryInput({
      schema: schema,
      modelName: modelName,
      fieldName: fieldName,
      value: getInputValue(fieldName, formStack)
    }));
  }))));

  return _pickBy(function (_, fieldName) {
    // Ignore fields who have submitCreate as false,
    // defaults to true
    return _propOr(true, 'submitCreate', schema.getField(modelName, fieldName));
  }, inputs);
};
export var fileSubmitToBlob = function fileSubmitToBlob(_ref14) {
  var payload = _ref14.payload,
      query = _ref14.query,
      value = _ref14.value;
  var formData = new FormData();

  var modelName = _prop('modelName', payload);

  var fieldName = _prop('fieldName', payload);

  var id = _prop('id', payload);

  var fileData = _propOr(false, 'fileData', payload);

  var variableInputDict;
  var fileInputDict = {};

  if (fileData) {
    // @ts-ignore
    variableInputDict = _map(function () {
      return consts.CREATE_FILE;
    }, fileData);
    fileInputDict = fileData;
  } else if (value) {
    variableInputDict = _defineProperty({}, fieldName, consts.CREATE_FILE); // type needed => reconciliation is not in schema

    var arrayBuffer = editFieldToQueryInput({
      modelName: modelName,
      fieldName: fieldName,
      value: value,
      type: inputTypes.FILE_TYPE
    });
    fileInputDict = _defineProperty({}, fieldName, arrayBuffer);
  }

  if (query) {
    formData.append('query', query);
  }

  var variables = _JSON$stringify({
    id: id,
    input: variableInputDict
  });

  formData.append('variables', variables);

  for (var _i = 0, _Object$entries2 = _Object$entries(fileInputDict); _i < _Object$entries2.length; _i++) {
    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i], 2),
        _fieldName = _Object$entries2$_i[0],
        contents = _Object$entries2$_i[1];

    formData.append(_fieldName, new Blob([contents], {
      type: 'application/octet-stream'
    }), _fieldName);
  }

  return formData;
}; // RouteEpic helpers

export var isModelPathPrefix = function isModelPathPrefix(path, schema) {
  return path.length >= 2 && path[0] === '' && _propOr(false, path[1], schema.schemaJSON) && (schema.getHasIndex(path[1]) || schema.getHasDetail(path[1]));
};
export var modelIndexPath = function modelIndexPath(_ref15) {
  var path = _ref15.path,
      schema = _ref15.schema;

  if (path.length === 2 && isModelPathPrefix(path, schema)) {
    var modelName = path[1];

    if (schema.getHasIndex(modelName) && modelName in schema.schemaJSON) {
      return [Actions.fetchModelIndex({
        modelName: modelName
      })];
    }
  }
};
export var modelDetailPath = function modelDetailPath(_ref16) {
  var path = _ref16.path,
      schema = _ref16.schema;

  if (path.length >= 3 && isModelPathPrefix(path, schema) && path[2] !== 'create') {
    return [Actions.fetchModelDetail({
      modelName: path[1],
      id: path[2]
    })];
  }
};
export var modelCreatePath = function modelCreatePath(_ref17) {
  var path = _ref17.path,
      schema = _ref17.schema;

  if (path.length === 3 && isModelPathPrefix(path, schema) && path[2] === 'create') {
    return [];
  }
};
export var pathFunctions = [modelIndexPath, modelDetailPath, modelCreatePath];
export var getPath = function getPath(locationChangeAction) {
  return _pipe(_pathOr('', ['payload', 'location', 'pathname']), function (pathname) {
    return pathname.split('/');
  }, _dropLastWhile(_equals('')))(locationChangeAction);
}; // ValidationEpic helpers

export var tableChangedFields = function tableChangedFields(_ref18) {
  var modelName = _ref18.modelName,
      id = _ref18.id,
      state$ = _ref18.state$;

  var changeFields = _pipe(_path(['value', 'conveyor', 'edit', modelName, id]), // @ts-ignore
  _filter(function (val) {
    return !_equals(_prop('currentValue', val), _prop('initialValue', val));
  }), _map(function (field) {
    return _prop('currentValue', field);
  }));

  return changeFields(state$);
};
export var getMissingFieldsMessage = function getMissingFieldsMessage(_ref19) {
  var _context5;

  var schema = _ref19.schema,
      missingFields = _ref19.missingFields,
      modelName = _ref19.modelName;
  return _sliceInstanceProperty(_context5 = _reduce(function (acc, fieldName) {
    return acc + schema.getFieldLabel({
      modelName: modelName,
      fieldName: fieldName
    }) + ', ';
  }, '', missingFields)).call(_context5, 0, -2);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9oZWxwZXJzLnRzIl0sIm5hbWVzIjpbImlucHV0VHlwZXMiLCJBY3Rpb25zIiwiY29uc3RzIiwiTG9nZ2VyIiwiREVGQVVMVF9QQUdJTkFUSU9OX0FNVCIsInN0b3JlVmFsdWVUb0FycmF5QnVmZmVyIiwidmFsdWUiLCJhcnJheUJ1ZmZlciIsIkFycmF5QnVmZmVyIiwibGVuZ3RoIiwidmlldyIsIkRhdGFWaWV3IiwiaSIsInNldFVpbnQ4IiwiZ2V0RmlsdGVycyIsInNjaGVtYSIsIm1vZGVsTmFtZSIsInRhYmxlVmlldyIsImZpZWxkcyIsImdldEZpZWxkcyIsImdldEZpZWxkRmlsdGVyIiwiZmllbGQiLCJmaWVsZE5hbWUiLCJvcGVyYXRvciIsImlzQm9vbGVhbiIsImlzUmVsIiwiaXNNYW55VG9PbmUiLCJpc09uZVRvT25lIiwidmFsIiwiaXNFbnVtIiwidW5kZWZpbmVkIiwiZmlsdGVycyIsImRlZmF1bHRGaWx0ZXJzIiwic2NoZW1hSlNPTiIsImdldFNvcnQiLCJzb3J0S2V5IiwiZ2V0UGFnZSIsImN1cnJlbnRQYWdlIiwiY3VycmVudCIsInBlcl9wYWdlIiwiZWRpdEZpZWxkVG9RdWVyeUlucHV0IiwidHlwZSIsImdldFR5cGUiLCJpc1ZhbGlkYXRpb25FcnJvciIsInJlc3BvbnNlIiwiZXJyb3JNYXAiLCJtZXNzYWdlIiwiZmllbGROYW1lcyIsImdldEZpZWxkTGFiZWwiLCJVTklRVUVfQ09OU1RSQUlOVCIsImxlbiIsImV4dHJhIiwiam9pbiIsImxhc3QiLCJnZXRWYWxpZGF0aW9uTWVzc2FnZSIsImNvbnRleHQiLCJwYXJzZWRFcnJvcnMiLCJmaWVsZEVycm9ycyIsImVycm9yc0xpc3QiLCJlIiwicGFyc2VWYWxpZGF0aW9uRXJyb3JzIiwiZXJyb3JzU3RyIiwiZXJyb3JzIiwiSlNPTiIsInBhcnNlIiwiaW5wdXRWYWxpZGF0aW9uUGFyc2VWYWxpZGF0aW9uRXJyb3JzIiwicHJlcFZhbGlkYXRpb25FcnJvcnMiLCJlcnJvciIsImdldEVkaXRNdXRhdGlvbklucHV0VmFyaWFibGVzIiwibm9kZSIsImdldERlbGV0ZUVycm9ycyIsImRhdGEiLCJnZXRJbnB1dFZhbHVlIiwiZm9ybVN0YWNrIiwiaW5kZXgiLCJnZXRDcmVhdGVTdWJtaXRWYWx1ZXMiLCJjcmVhdGVGaWVsZHMiLCJmb3JtU3RhY2tJbmRleCIsIm9yaWdpbiIsIm9yaWdpbkZpZWxkTmFtZSIsImlucHV0cyIsIk9iamVjdCIsIl8iLCJnZXRGaWVsZCIsImZpbGVTdWJtaXRUb0Jsb2IiLCJwYXlsb2FkIiwicXVlcnkiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiaWQiLCJmaWxlRGF0YSIsInZhcmlhYmxlSW5wdXREaWN0IiwiZmlsZUlucHV0RGljdCIsIkNSRUFURV9GSUxFIiwiRklMRV9UWVBFIiwiYXBwZW5kIiwidmFyaWFibGVzIiwiaW5wdXQiLCJjb250ZW50cyIsIkJsb2IiLCJpc01vZGVsUGF0aFByZWZpeCIsInBhdGgiLCJnZXRIYXNJbmRleCIsImdldEhhc0RldGFpbCIsIm1vZGVsSW5kZXhQYXRoIiwiZmV0Y2hNb2RlbEluZGV4IiwibW9kZWxEZXRhaWxQYXRoIiwiZmV0Y2hNb2RlbERldGFpbCIsIm1vZGVsQ3JlYXRlUGF0aCIsInBhdGhGdW5jdGlvbnMiLCJnZXRQYXRoIiwibG9jYXRpb25DaGFuZ2VBY3Rpb24iLCJwYXRobmFtZSIsInNwbGl0IiwidGFibGVDaGFuZ2VkRmllbGRzIiwic3RhdGUkIiwiY2hhbmdlRmllbGRzIiwiZ2V0TWlzc2luZ0ZpZWxkc01lc3NhZ2UiLCJtaXNzaW5nRmllbGRzIiwiYWNjIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsU0FBU0EsVUFBVCxRQUEyQiw2QkFBM0I7QUFDQSxPQUFPLEtBQUtDLE9BQVosTUFBeUIsWUFBekI7QUFDQSxPQUFPLEtBQUtDLE1BQVosTUFBd0IsaUJBQXhCO0FBQ0EsT0FBTyxLQUFLQyxNQUFaLE1BQXdCLFVBQXhCO0FBRUEsU0FB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R0FBdkIsQ0FBVCxFQUFzQyxNQUFPLGNBQVAsRUFBdUJBLEdBQXZCLENBQXRDLENBREg7QUFBQSxHQURGLENBSDhDLEVBTzlDLEtBQU0sVUFBQ1AsS0FBRDtBQUFBLFdBQWdCLE1BQU8sY0FBUCxFQUF1QkEsS0FBdkIsQ0FBaEI7QUFBQSxHQUFOLENBUDhDLENBQWhEOztBQVNBLFNBQU8rRixZQUFZLENBQUNELE1BQUQsQ0FBbkI7QUFDRCxDQW5CTTtBQXFCUCxPQUFPLElBQU1FLHVCQUF1QixHQUFHLFNBQTFCQSx1QkFBMEI7QUFBQTs7QUFBQSxNQUNyQ3RHLE1BRHFDLFVBQ3JDQSxNQURxQztBQUFBLE1BRXJDdUcsYUFGcUMsVUFFckNBLGFBRnFDO0FBQUEsTUFHckN0RyxTQUhxQyxVQUdyQ0EsU0FIcUM7QUFBQSxTQVNyQywyQ0FDRSxVQUFDdUcsR0FBRCxFQUFjakcsU0FBZDtBQUFBLFdBQ0VpRyxHQUFHLEdBQUd4RyxNQUFNLENBQUNpQyxhQUFQLENBQXFCO0FBQUVoQyxNQUFBQSxTQUFTLEVBQVRBLFNBQUY7QUFBYU0sTUFBQUEsU0FBUyxFQUFUQTtBQUFiLEtBQXJCLENBQU4sR0FBdUQsSUFEekQ7QUFBQSxHQURGLEVBR0UsRUFIRixFQUlFZ0csYUFKRixtQkFLUSxDQUxSLEVBS1csQ0FBQyxDQUxaLENBVHFDO0FBQUEsQ0FBaEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHsgaW5wdXRUeXBlcyB9IGZyb20gJ0BhdXRvaW52ZW50L2NvbnZleW9yLXNjaGVtYSdcbmltcG9ydCAqIGFzIEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucydcbmltcG9ydCAqIGFzIGNvbnN0cyBmcm9tICcuLi9hY3Rpb25Db25zdHMnXG5pbXBvcnQgKiBhcyBMb2dnZXIgZnJvbSAnLi9Mb2dnZXInXG5pbXBvcnQgeyBTY2hlbWFCdWlsZGVyIH0gZnJvbSAnQGF1dG9pbnZlbnQvY29udmV5b3Itc2NoZW1hJ1xuaW1wb3J0IHsgREVGQVVMVF9QQUdJTkFUSU9OX0FNVCB9IGZyb20gJy4vdGFibGVWaWV3J1xuXG5leHBvcnQgY29uc3Qgc3RvcmVWYWx1ZVRvQXJyYXlCdWZmZXIgPSAodmFsdWU6IG51bWJlcltdKSA9PiB7XG4gIGNvbnN0IGFycmF5QnVmZmVyID0gbmV3IEFycmF5QnVmZmVyKHZhbHVlLmxlbmd0aClcbiAgY29uc3QgdmlldyA9IG5ldyBEYXRhVmlldyhhcnJheUJ1ZmZlcilcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB2YWx1ZS5sZW5ndGg7ICsraSkge1xuICAgIHZpZXcuc2V0VWludDgoaSwgdmFsdWVbaV0pXG4gIH1cbiAgcmV0dXJuIGFycmF5QnVmZmVyXG59XG5cbmV4cG9ydCBjb25zdCBnZXRGaWx0ZXJzID0gKHtcbiAgc2NoZW1hLFxuICBtb2RlbE5hbWUsXG4gIHRhYmxlVmlld1xufToge1xuICBzY2hlbWE6IFNjaGVtYUJ1aWxkZXJcbiAgbW9kZWxOYW1lOiBzdHJpbmdcbiAgdGFibGVWaWV3OiBhbnlcbn0pID0+IHtcbiAgY29uc3QgZmllbGRzID0gc2NoZW1hLmdldEZpZWxkcyhtb2RlbE5hbWUpXG4gIGNvbnN0IGdldEZpZWxkRmlsdGVyID0gKGZpZWxkOiBhbnkpID0+IHtcbiAgICBjb25zdCBmaWVsZE5hbWU6IHN0cmluZyA9IFIucHJvcCgnZmllbGROYW1lJywgZmllbGQpXG4gICAgY29uc3Qgb3BlcmF0b3I6IHN0cmluZyB8IHVuZGVmaW5lZCA9IFIucGF0aChcbiAgICAgIFttb2RlbE5hbWUsICdmaWx0ZXInLCAnZmlsdGVyVmFsdWUnLCBmaWVsZE5hbWUsICdvcGVyYXRvcicsICd2YWx1ZSddLFxuICAgICAgdGFibGVWaWV3XG4gICAgKVxuICAgIGNvbnN0IHZhbHVlOiBhbnkgPSBSLnBhdGgoXG4gICAgICBbbW9kZWxOYW1lLCAnZmlsdGVyJywgJ2ZpbHRlclZhbHVlJywgZmllbGROYW1lLCAndmFsdWUnXSxcbiAgICAgIHRhYmxlVmlld1xuICAgIClcbiAgICBpZiAob3BlcmF0b3IgJiYgc2NoZW1hLmlzQm9vbGVhbihtb2RlbE5hbWUsIGZpZWxkTmFtZSkpIHtcbiAgICAgIHJldHVybiB7IG9wZXJhdG9yLCB2YWx1ZTogUi5pc05pbCh2YWx1ZSkgPyBmYWxzZSA6IHZhbHVlIH1cbiAgICB9XG4gICAgaWYgKG9wZXJhdG9yICYmICFSLmlzTmlsKHZhbHVlKSAmJiAhUi5pc0VtcHR5KHZhbHVlKSkge1xuICAgICAgaWYgKHNjaGVtYS5pc1JlbChtb2RlbE5hbWUsIGZpZWxkTmFtZSkpIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNjaGVtYS5pc01hbnlUb09uZShtb2RlbE5hbWUsIGZpZWxkTmFtZSkgfHxcbiAgICAgICAgICBzY2hlbWEuaXNPbmVUb09uZShtb2RlbE5hbWUsIGZpZWxkTmFtZSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmV0dXJuIHsgb3BlcmF0b3IsIHZhbHVlOiBSLnByb3BPcih2YWx1ZSwgJ3ZhbHVlJywgdmFsdWUpIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4geyBvcGVyYXRvciwgdmFsdWU6IHZhbHVlLm1hcCgodmFsOiBhbnkpID0+IHZhbC52YWx1ZSkgfVxuICAgICAgfVxuICAgICAgaWYgKHNjaGVtYS5pc0VudW0obW9kZWxOYW1lLCBmaWVsZE5hbWUpKSB7XG4gICAgICAgIHJldHVybiB7IG9wZXJhdG9yLCB2YWx1ZTogdmFsdWUudmFsdWUgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHsgb3BlcmF0b3IsIHZhbHVlIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZFxuICB9XG4gIGxldCBmaWx0ZXJzOiBhbnkgPSBSLm1hcChnZXRGaWVsZEZpbHRlciwgZmllbGRzKVxuICAvLyBmaWx0ZXJGaWVsZHM6IGRlZmF1bHQgZmlsdGVycywgaW4gYWRkaXRpb24gZmlsdGVycyBzZXQgYnkgdXNlcjsgYWx3YXlzIGFjdGl2ZVxuICBjb25zdCBkZWZhdWx0RmlsdGVyczogYW55ID0gUi5wYXRoKFxuICAgIFttb2RlbE5hbWUsICdmaWx0ZXJGaWVsZHMnXSxcbiAgICBzY2hlbWEuc2NoZW1hSlNPTlxuICApXG4gIGlmIChkZWZhdWx0RmlsdGVycykge1xuICAgIGZpbHRlcnMgPSBSLm1lcmdlKGZpbHRlcnMsIGRlZmF1bHRGaWx0ZXJzKVxuICB9XG4gIHJldHVybiBSLmZpbHRlcjxhbnk+KFIuaWRlbnRpdHksIGZpbHRlcnMpXG59XG5cbmV4cG9ydCBjb25zdCBnZXRTb3J0ID0gKHtcbiAgc2NoZW1hLFxuICBtb2RlbE5hbWUsXG4gIHRhYmxlVmlld1xufToge1xuICBzY2hlbWE6IFNjaGVtYUJ1aWxkZXJcbiAgbW9kZWxOYW1lOiBzdHJpbmdcbiAgdGFibGVWaWV3PzogYW55XG59KTogYW55ID0+IHtcbiAgLy8gZ2V0IHNvcnQgZnJvbSB1c2VyIGlucHV0XG4gIGlmICh0YWJsZVZpZXcpIHtcbiAgICBjb25zdCBzb3J0S2V5OiBzdHJpbmcgfCB1bmRlZmluZWQgPSBSLnBhdGgoXG4gICAgICBbbW9kZWxOYW1lLCAnc29ydCcsICdzb3J0S2V5J10sXG4gICAgICB0YWJsZVZpZXdcbiAgICApXG4gICAgY29uc3QgZmllbGROYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBSLnBhdGgoXG4gICAgICBbbW9kZWxOYW1lLCAnc29ydCcsICdmaWVsZE5hbWUnXSxcbiAgICAgIHRhYmxlVmlld1xuICAgIClcbiAgICBpZiAoc29ydEtleSAmJiBmaWVsZE5hbWUpIHtcbiAgICAgIHJldHVybiBbYCR7ZmllbGROYW1lfV8ke3NvcnRLZXl9YF1cbiAgICB9XG4gIH1cbiAgLy8gb3RoZXJ3aXNlLCBnZXQgZGVmYXVsdCBzb3J0IGZyb20gc2NoZW1hXG4gIC8vIHNvcnRGaWVsZHM6IGNhbWVsLWNhc2UgZmllbGRzIGZvbGxvd2VkIGJ5ICdfYXNjJyBvciAnX2Rlc2MnLlxuICByZXR1cm4gUi5wYXRoKFttb2RlbE5hbWUsICdzb3J0RmllbGRzJ10sIHNjaGVtYS5zY2hlbWFKU09OKVxufVxuXG5leHBvcnQgY29uc3QgZ2V0UGFnZSA9ICh7XG4gIG1vZGVsTmFtZSxcbiAgdGFibGVWaWV3XG59OiB7XG4gIG1vZGVsTmFtZTogc3RyaW5nXG4gIHRhYmxlVmlldzogYW55XG59KSA9PiB7XG4gIGNvbnN0IGN1cnJlbnRQYWdlID0gUi5wYXRoT3IoMSwgW21vZGVsTmFtZSwgJ3BhZ2UnLCAnY3VycmVudFBhZ2UnXSwgdGFibGVWaWV3KVxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZVxuICByZXR1cm4geyBjdXJyZW50OiBjdXJyZW50UGFnZSwgcGVyX3BhZ2U6IERFRkFVTFRfUEFHSU5BVElPTl9BTVQgfVxufVxuXG5leHBvcnQgY29uc3QgZWRpdEZpZWxkVG9RdWVyeUlucHV0ID0gKHtcbiAgc2NoZW1hLFxuICBtb2RlbE5hbWUsXG4gIGZpZWxkTmFtZSxcbiAgdmFsdWUsXG4gIHR5cGVcbn06IHtcbiAgc2NoZW1hPzogU2NoZW1hQnVpbGRlclxuICBtb2RlbE5hbWU6IHN0cmluZ1xuICBmaWVsZE5hbWU6IHN0cmluZ1xuICB2YWx1ZTogYW55XG4gIHR5cGU/OiBhbnlcbn0pID0+IHtcbiAgaWYgKHR5cGUgPT09IHVuZGVmaW5lZCAmJiBzY2hlbWEpIHtcbiAgICB0eXBlID0gc2NoZW1hLmdldFR5cGUobW9kZWxOYW1lLCBmaWVsZE5hbWUpXG4gIH1cbiAgaWYgKGZpZWxkTmFtZSA9PT0gJ19fdHlwZW5hbWUnKSB7XG4gICAgcmV0dXJuXG4gIH1cbiAgaWYgKHR5cGUuaW5jbHVkZXMoJ1RvTWFueScpKSB7XG4gICAgaWYgKFIuaXNOaWwodmFsdWUpKSB7XG4gICAgICByZXR1cm4gW11cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlLm1hcCgodmFsdWU6IGFueSkgPT4gUi5wcm9wKCd2YWx1ZScsIHZhbHVlKSlcbiAgfSBlbHNlIGlmICh0eXBlLmluY2x1ZGVzKCdUb09uZScpKSB7XG4gICAgcmV0dXJuIFIucHJvcE9yKG51bGwsICd2YWx1ZScsIHZhbHVlKVxuICB9IGVsc2UgaWYgKHR5cGUgPT09ICdlbnVtJykge1xuICAgIHJldHVybiBSLnByb3BPcihudWxsLCAndmFsdWUnLCB2YWx1ZSlcbiAgfSBlbHNlIGlmICh0eXBlID09PSAnZmlsZScpIHtcbiAgICBpZiAoUi5pc05pbCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiB2YWx1ZVxuICAgIH1cbiAgICByZXR1cm4gc3RvcmVWYWx1ZVRvQXJyYXlCdWZmZXIodmFsdWUpXG4gIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gdHlwZW9mIGZhbHNlID8gdmFsdWUgOiBmYWxzZVxuICB9XG4gIHJldHVybiB2YWx1ZVxufVxuXG5leHBvcnQgY29uc3QgaXNWYWxpZGF0aW9uRXJyb3IgPSAocmVzcG9uc2U6IGFueSkgPT5cbiAgUi5wcm9wKCdzdGF0dXMnLCByZXNwb25zZSkgPT09IDIwMFxuXG5jb25zdCBlcnJvck1hcCA9ICh7XG4gIHNjaGVtYSxcbiAgdHlwZSxcbiAgZmllbGRzLFxuICBtZXNzYWdlLFxuICBtb2RlbE5hbWVcbn06IHtcbiAgc2NoZW1hOiBTY2hlbWFCdWlsZGVyXG4gIHR5cGU6IHN0cmluZ1xuICBmaWVsZHM6IHN0cmluZ1tdXG4gIG1lc3NhZ2U6IHN0cmluZ1xuICBtb2RlbE5hbWU6IHN0cmluZ1xufSkgPT4ge1xuICBsZXQgZmllbGROYW1lczogc3RyaW5nW10gPSBbXVxuICBSLmZvckVhY2goZmllbGROYW1lID0+IHtcbiAgICBmaWVsZE5hbWVzID0gUi5hcHBlbmQoXG4gICAgICAvLyB0b2RvOiBwYXNzICdub2RlJyBhbmQgJ2RhdGEnIHByb3BzXG4gICAgICBzY2hlbWEuZ2V0RmllbGRMYWJlbCh7IG1vZGVsTmFtZSwgZmllbGROYW1lIH0pLFxuICAgICAgZmllbGROYW1lc1xuICAgIClcbiAgfSwgZmllbGRzKVxuXG4gIHN3aXRjaCAodHlwZSkge1xuICAgIGNhc2UgY29uc3RzLlVOSVFVRV9DT05TVFJBSU5UOiB7XG4gICAgICBjb25zdCBsZW4gPSBmaWVsZE5hbWVzLmxlbmd0aFxuICAgICAgbGV0IGV4dHJhID0gJydcbiAgICAgIGlmIChsZW4gPiAxKSB7XG4gICAgICAgIGV4dHJhID0gYGNvbWJpbmF0aW9uIG9mICR7ZmllbGROYW1lc1xuICAgICAgICAgIC5zbGljZSgwLCBmaWVsZE5hbWVzLmxlbmd0aCAtIDEpXG4gICAgICAgICAgLmpvaW4oJywgJyl9IGFuZCBgXG4gICAgICB9XG4gICAgICBjb25zdCBsYXN0ID0gZmllbGROYW1lc1tmaWVsZE5hbWVzLmxlbmd0aCAtIDFdXG4gICAgICByZXR1cm4gYFRoaXMgJHtleHRyYX0ke2xhc3R9IGFscmVhZHkgZXhpc3RzLmBcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBtZXNzYWdlXG4gIH1cbn1cblxuY29uc3QgZ2V0VmFsaWRhdGlvbk1lc3NhZ2UgPSAoe1xuICBzY2hlbWEsXG4gIGNvbnRleHQsXG4gIHBhcnNlZEVycm9yc1xufToge1xuICBzY2hlbWE6IFNjaGVtYUJ1aWxkZXJcbiAgY29udGV4dDogYW55XG4gIHBhcnNlZEVycm9yczogYW55XG59KSA9PlxuICBSLm1hcE9iakluZGV4ZWQoKGZpZWxkRXJyb3JzOiBhbnkpID0+IHtcbiAgICBsZXQgZXJyb3JzTGlzdDogc3RyaW5nW10gPSBbXVxuICAgIFIuZm9yRWFjaCgoZTogYW55KSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gZXJyb3JNYXAoe1xuICAgICAgICB0eXBlOiBSLnByb3AoJ3R5cGUnLCBlKSxcbiAgICAgICAgZmllbGRzOiBSLnByb3AoJ2dyb3VwJywgZSksXG4gICAgICAgIG1lc3NhZ2U6IFIucHJvcCgnbWVzc2FnZScsIGUpLFxuICAgICAgICBtb2RlbE5hbWU6IFIucHJvcCgnbW9kZWxOYW1lJywgY29udGV4dCksXG4gICAgICAgIHNjaGVtYVxuICAgICAgfSlcbiAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgIGVycm9yc0xpc3QgPSBSLmFwcGVuZChtZXNzYWdlLCBlcnJvcnNMaXN0KVxuICAgICAgfVxuICAgIH0sIGZpZWxkRXJyb3JzKVxuICAgIHJldHVybiBlcnJvcnNMaXN0XG4gIH0sIHBhcnNlZEVycm9ycylcblxuY29uc3QgcGFyc2VWYWxpZGF0aW9uRXJyb3JzID0gKHJlc3BvbnNlOiBhbnkpID0+IHtcbiAgY29uc3QgZXJyb3JzU3RyOiBzdHJpbmcgfCB1bmRlZmluZWQgPSBSLnBhdGgoXG4gICAgWydlcnJvcnMnLCAwLCAnbWVzc2FnZSddLFxuICAgIHJlc3BvbnNlXG4gIClcbiAgbGV0IGVycm9ycyA9IFtdXG4gIHRyeSB7XG4gICAgZXJyb3JzID0gSlNPTi5wYXJzZShlcnJvcnNTdHIgYXMgc3RyaW5nKVxuICB9IGNhdGNoIChlKSB7XG4gICAgTG9nZ2VyLmlucHV0VmFsaWRhdGlvblBhcnNlVmFsaWRhdGlvbkVycm9ycyhyZXNwb25zZSwgZSlcbiAgfVxuICByZXR1cm4gZXJyb3JzXG59XG5cbmV4cG9ydCBjb25zdCBwcmVwVmFsaWRhdGlvbkVycm9ycyA9ICh7XG4gIHNjaGVtYSxcbiAgY29udGV4dCxcbiAgZXJyb3Jcbn06IHtcbiAgc2NoZW1hOiBTY2hlbWFCdWlsZGVyXG4gIGNvbnRleHQ6IGFueVxuICBlcnJvcjogYW55XG59KSA9PiB7XG4gIGNvbnN0IHBhcnNlZEVycm9ycyA9IHBhcnNlVmFsaWRhdGlvbkVycm9ycyhlcnJvci5yZXNwb25zZSlcbiAgcmV0dXJuIGdldFZhbGlkYXRpb25NZXNzYWdlKHsgc2NoZW1hLCBjb250ZXh0LCBwYXJzZWRFcnJvcnMgfSlcbn1cblxuZXhwb3J0IGNvbnN0IGdldEVkaXRNdXRhdGlvbklucHV0VmFyaWFibGVzID0gKHtcbiAgc2NoZW1hLFxuICBtb2RlbE5hbWUsXG4gIG5vZGVcbn06IHtcbiAgc2NoZW1hOiBTY2hlbWFCdWlsZGVyXG4gIG1vZGVsTmFtZTogc3RyaW5nXG4gIG5vZGU6IGFueVxufSk6IGFueSA9PlxuICBSLnBpcGUoXG4gICAgUi5tYXBPYmpJbmRleGVkKCh2YWx1ZSwgZmllbGROYW1lKSA9PlxuICAgICAgZWRpdEZpZWxkVG9RdWVyeUlucHV0KHsgc2NoZW1hLCBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgdmFsdWUgfSlcbiAgICApLFxuICAgIFIuZGlzc29jKCdfX3R5cGVuYW1lJyksXG4gICAgUi5kaXNzb2MoJ2lkJylcbiAgKShub2RlKVxuXG5leHBvcnQgY29uc3QgZ2V0RGVsZXRlRXJyb3JzID0gKHtcbiAgZGF0YSxcbiAgY29udGV4dFxufToge1xuICBkYXRhOiBhbnlcbiAgY29udGV4dDogYW55XG59KTogc3RyaW5nW10gfCB1bmRlZmluZWQgPT5cbiAgUi5wYXRoKFsnZGVsZXRlJyArIGNvbnRleHQubW9kZWxOYW1lLCAnZXJyb3JzJ10sIGRhdGEpXG5cbmNvbnN0IGdldElucHV0VmFsdWUgPSAoZmllbGROYW1lOiBzdHJpbmcsIGZvcm1TdGFjazogYW55KSA9PiB7XG4gIGNvbnN0IGluZGV4ID0gUi5wcm9wKCdpbmRleCcsIGZvcm1TdGFjaylcbiAgcmV0dXJuIFIucGF0aChbJ3N0YWNrJywgaW5kZXgsICdmaWVsZHMnLCBmaWVsZE5hbWVdLCBmb3JtU3RhY2spXG59XG5cbi8vIGdldCBpbnB1dCB2YWx1ZXMgZnJvbSBhIGNyZWF0ZSBmb3JtXG5leHBvcnQgY29uc3QgZ2V0Q3JlYXRlU3VibWl0VmFsdWVzID0gKHtcbiAgc2NoZW1hLFxuICBmb3JtU3RhY2ssXG4gIG1vZGVsTmFtZVxufToge1xuICBzY2hlbWE6IFNjaGVtYUJ1aWxkZXJcbiAgZm9ybVN0YWNrOiBhbnlcbiAgbW9kZWxOYW1lOiBzdHJpbmdcbn0pID0+IHtcbiAgY29uc3QgY3JlYXRlRmllbGRzID0gUi5maWx0ZXIoXG4gICAgZmllbGQgPT4gUi5wcm9wT3IodHJ1ZSwgJ3Nob3dDcmVhdGUnLCBmaWVsZCksXG4gICAgc2NoZW1hLmdldEZpZWxkcyhtb2RlbE5hbWUpXG4gIClcbiAgY29uc3QgZm9ybVN0YWNrSW5kZXggPSBSLnByb3AoJ2luZGV4JywgZm9ybVN0YWNrKVxuICBjb25zdCBvcmlnaW4gPSBSLnByb3AoJ29yaWdpbk1vZGVsTmFtZScsIGZvcm1TdGFjaylcbiAgaWYgKG9yaWdpbiAmJiBmb3JtU3RhY2tJbmRleCA9PT0gMCkge1xuICAgIGNvbnN0IG9yaWdpbkZpZWxkTmFtZSA9IFIucHJvcCgnb3JpZ2luRmllbGROYW1lJywgZm9ybVN0YWNrKVxuICAgIGNyZWF0ZUZpZWxkc1tvcmlnaW5GaWVsZE5hbWVdID0gb3JpZ2luRmllbGROYW1lXG4gIH1cblxuICBjb25zdCBpbnB1dHMgPSBPYmplY3QuYXNzaWduKFxuICAgIHt9LFxuICAgIC4uLk9iamVjdC5lbnRyaWVzKGNyZWF0ZUZpZWxkcykubWFwKChbZmllbGROYW1lXSkgPT4gKHtcbiAgICAgIFtmaWVsZE5hbWVdOiBlZGl0RmllbGRUb1F1ZXJ5SW5wdXQoe1xuICAgICAgICBzY2hlbWEsXG4gICAgICAgIG1vZGVsTmFtZSxcbiAgICAgICAgZmllbGROYW1lLFxuICAgICAgICB2YWx1ZTogZ2V0SW5wdXRWYWx1ZShmaWVsZE5hbWUsIGZvcm1TdGFjaylcbiAgICAgIH0pXG4gICAgfSkpXG4gIClcbiAgcmV0dXJuIFIucGlja0J5KChfLCBmaWVsZE5hbWUpID0+IHtcbiAgICAvLyBJZ25vcmUgZmllbGRzIHdobyBoYXZlIHN1Ym1pdENyZWF0ZSBhcyBmYWxzZSxcbiAgICAvLyBkZWZhdWx0cyB0byB0cnVlXG4gICAgcmV0dXJuIFIucHJvcE9yKHRydWUsICdzdWJtaXRDcmVhdGUnLCBzY2hlbWEuZ2V0RmllbGQobW9kZWxOYW1lLCBmaWVsZE5hbWUpKVxuICB9LCBpbnB1dHMpXG59XG5cbmV4cG9ydCBjb25zdCBmaWxlU3VibWl0VG9CbG9iID0gKHtcbiAgcGF5bG9hZCxcbiAgcXVlcnksXG4gIHZhbHVlXG59OiB7XG4gIHBheWxvYWQ6IGFueVxuICBxdWVyeTogYW55XG4gIHZhbHVlOiBhbnlcbn0pID0+IHtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKVxuICBjb25zdCBtb2RlbE5hbWUgPSBSLnByb3AoJ21vZGVsTmFtZScsIHBheWxvYWQpXG4gIGNvbnN0IGZpZWxkTmFtZSA9IFIucHJvcCgnZmllbGROYW1lJywgcGF5bG9hZClcbiAgY29uc3QgaWQgPSBSLnByb3AoJ2lkJywgcGF5bG9hZClcbiAgY29uc3QgZmlsZURhdGE6IFJlY29yZDxzdHJpbmcsIEJsb2JQYXJ0PiB8IHVuZGVmaW5lZCA9IFIucHJvcE9yKFxuICAgIGZhbHNlLFxuICAgICdmaWxlRGF0YScsXG4gICAgcGF5bG9hZFxuICApXG5cbiAgbGV0IHZhcmlhYmxlSW5wdXREaWN0XG4gIGxldCBmaWxlSW5wdXREaWN0OiBSZWNvcmQ8c3RyaW5nLCBCbG9iUGFydD4gPSB7fVxuXG4gIGlmIChmaWxlRGF0YSkge1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICB2YXJpYWJsZUlucHV0RGljdCA9IFIubWFwKCgpID0+IGNvbnN0cy5DUkVBVEVfRklMRSwgZmlsZURhdGEpXG4gICAgZmlsZUlucHV0RGljdCA9IGZpbGVEYXRhXG4gIH0gZWxzZSBpZiAodmFsdWUpIHtcbiAgICB2YXJpYWJsZUlucHV0RGljdCA9IHsgW2ZpZWxkTmFtZV06IGNvbnN0cy5DUkVBVEVfRklMRSB9XG4gICAgLy8gdHlwZSBuZWVkZWQgPT4gcmVjb25jaWxpYXRpb24gaXMgbm90IGluIHNjaGVtYVxuICAgIGNvbnN0IGFycmF5QnVmZmVyID0gZWRpdEZpZWxkVG9RdWVyeUlucHV0KHtcbiAgICAgIG1vZGVsTmFtZSxcbiAgICAgIGZpZWxkTmFtZSxcbiAgICAgIHZhbHVlLFxuICAgICAgdHlwZTogaW5wdXRUeXBlcy5GSUxFX1RZUEVcbiAgICB9KVxuICAgIGZpbGVJbnB1dERpY3QgPSB7IFtmaWVsZE5hbWVdOiBhcnJheUJ1ZmZlciB9XG4gIH1cbiAgaWYgKHF1ZXJ5KSB7XG4gICAgZm9ybURhdGEuYXBwZW5kKCdxdWVyeScsIHF1ZXJ5KVxuICB9XG4gIGNvbnN0IHZhcmlhYmxlcyA9IEpTT04uc3RyaW5naWZ5KHtcbiAgICBpZCxcbiAgICBpbnB1dDogdmFyaWFibGVJbnB1dERpY3RcbiAgfSlcbiAgZm9ybURhdGEuYXBwZW5kKCd2YXJpYWJsZXMnLCB2YXJpYWJsZXMpXG5cbiAgZm9yIChjb25zdCBbZmllbGROYW1lLCBjb250ZW50c10gb2YgT2JqZWN0LmVudHJpZXMoZmlsZUlucHV0RGljdCkpIHtcbiAgICBmb3JtRGF0YS5hcHBlbmQoXG4gICAgICBmaWVsZE5hbWUsXG4gICAgICBuZXcgQmxvYihbY29udGVudHNdLCB7IHR5cGU6ICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nIH0pLFxuICAgICAgZmllbGROYW1lXG4gICAgKVxuICB9XG4gIHJldHVybiBmb3JtRGF0YVxufVxuXG4vLyBSb3V0ZUVwaWMgaGVscGVyc1xuZXhwb3J0IGNvbnN0IGlzTW9kZWxQYXRoUHJlZml4ID0gKHBhdGg6IHN0cmluZ1tdLCBzY2hlbWE6IFNjaGVtYUJ1aWxkZXIpID0+XG4gIHBhdGgubGVuZ3RoID49IDIgJiZcbiAgcGF0aFswXSA9PT0gJycgJiZcbiAgUi5wcm9wT3IoZmFsc2UsIHBhdGhbMV0sIHNjaGVtYS5zY2hlbWFKU09OKSAmJlxuICAoc2NoZW1hLmdldEhhc0luZGV4KHBhdGhbMV0pIHx8IHNjaGVtYS5nZXRIYXNEZXRhaWwocGF0aFsxXSkpXG5cbmV4cG9ydCBjb25zdCBtb2RlbEluZGV4UGF0aCA9ICh7XG4gIHBhdGgsXG4gIHNjaGVtYVxufToge1xuICBwYXRoOiBzdHJpbmdbXVxuICBzY2hlbWE6IFNjaGVtYUJ1aWxkZXJcbn0pID0+IHtcbiAgaWYgKHBhdGgubGVuZ3RoID09PSAyICYmIGlzTW9kZWxQYXRoUHJlZml4KHBhdGgsIHNjaGVtYSkpIHtcbiAgICBjb25zdCBtb2RlbE5hbWUgPSBwYXRoWzFdXG5cbiAgICBpZiAoc2NoZW1hLmdldEhhc0luZGV4KG1vZGVsTmFtZSkgJiYgbW9kZWxOYW1lIGluIHNjaGVtYS5zY2hlbWFKU09OKSB7XG4gICAgICByZXR1cm4gW0FjdGlvbnMuZmV0Y2hNb2RlbEluZGV4KHsgbW9kZWxOYW1lIH0pXVxuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgbW9kZWxEZXRhaWxQYXRoID0gKHtcbiAgcGF0aCxcbiAgc2NoZW1hXG59OiB7XG4gIHBhdGg6IHN0cmluZ1tdXG4gIHNjaGVtYTogU2NoZW1hQnVpbGRlclxufSkgPT4ge1xuICBpZiAoXG4gICAgcGF0aC5sZW5ndGggPj0gMyAmJlxuICAgIGlzTW9kZWxQYXRoUHJlZml4KHBhdGgsIHNjaGVtYSkgJiZcbiAgICBwYXRoWzJdICE9PSAnY3JlYXRlJ1xuICApIHtcbiAgICByZXR1cm4gW0FjdGlvbnMuZmV0Y2hNb2RlbERldGFpbCh7IG1vZGVsTmFtZTogcGF0aFsxXSwgaWQ6IHBhdGhbMl0gfSldXG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IG1vZGVsQ3JlYXRlUGF0aCA9ICh7XG4gIHBhdGgsXG4gIHNjaGVtYVxufToge1xuICBwYXRoOiBzdHJpbmdbXVxuICBzY2hlbWE6IFNjaGVtYUJ1aWxkZXJcbn0pID0+IHtcbiAgaWYgKFxuICAgIHBhdGgubGVuZ3RoID09PSAzICYmXG4gICAgaXNNb2RlbFBhdGhQcmVmaXgocGF0aCwgc2NoZW1hKSAmJlxuICAgIHBhdGhbMl0gPT09ICdjcmVhdGUnXG4gICkge1xuICAgIHJldHVybiBbXVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBwYXRoRnVuY3Rpb25zID0gW21vZGVsSW5kZXhQYXRoLCBtb2RlbERldGFpbFBhdGgsIG1vZGVsQ3JlYXRlUGF0aF1cblxuZXhwb3J0IGNvbnN0IGdldFBhdGggPSAobG9jYXRpb25DaGFuZ2VBY3Rpb246IHN0cmluZykgPT5cbiAgUi5waXBlKFxuICAgIFIucGF0aE9yKCcnLCBbJ3BheWxvYWQnLCAnbG9jYXRpb24nLCAncGF0aG5hbWUnXSksXG4gICAgcGF0aG5hbWUgPT4gcGF0aG5hbWUuc3BsaXQoJy8nKSxcbiAgICBSLmRyb3BMYXN0V2hpbGUoUi5lcXVhbHMoJycpKVxuICApKGxvY2F0aW9uQ2hhbmdlQWN0aW9uKVxuXG4vLyBWYWxpZGF0aW9uRXBpYyBoZWxwZXJzXG5leHBvcnQgY29uc3QgdGFibGVDaGFuZ2VkRmllbGRzID0gKHtcbiAgbW9kZWxOYW1lLFxuICBpZCxcbiAgc3RhdGUkXG59OiB7XG4gIG1vZGVsTmFtZTogc3RyaW5nXG4gIGlkOiBzdHJpbmdcbiAgc3RhdGUkOiBhbnlcbn0pOiBhbnkgPT4ge1xuICBjb25zdCBjaGFuZ2VGaWVsZHM6IChzdGF0ZTogb2JqZWN0KSA9PiBvYmplY3QgPSBSLnBpcGUoXG4gICAgUi5wYXRoKFsndmFsdWUnLCAnY29udmV5b3InLCAnZWRpdCcsIG1vZGVsTmFtZSwgaWRdKSxcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgUi5maWx0ZXIoXG4gICAgICAodmFsOiBhbnkpID0+XG4gICAgICAgICFSLmVxdWFscyhSLnByb3AoJ2N1cnJlbnRWYWx1ZScsIHZhbCksIFIucHJvcCgnaW5pdGlhbFZhbHVlJywgdmFsKSlcbiAgICApLFxuICAgIFIubWFwKChmaWVsZDogYW55KSA9PiBSLnByb3AoJ2N1cnJlbnRWYWx1ZScsIGZpZWxkKSlcbiAgKVxuICByZXR1cm4gY2hhbmdlRmllbGRzKHN0YXRlJClcbn1cblxuZXhwb3J0IGNvbnN0IGdldE1pc3NpbmdGaWVsZHNNZXNzYWdlID0gKHtcbiAgc2NoZW1hLFxuICBtaXNzaW5nRmllbGRzLFxuICBtb2RlbE5hbWVcbn06IHtcbiAgc2NoZW1hOiBTY2hlbWFCdWlsZGVyXG4gIG1pc3NpbmdGaWVsZHM6IGFueVxuICBtb2RlbE5hbWU6IHN0cmluZ1xufSkgPT5cbiAgUi5yZWR1Y2UoXG4gICAgKGFjYzogc3RyaW5nLCBmaWVsZE5hbWU6IHN0cmluZykgPT5cbiAgICAgIGFjYyArIHNjaGVtYS5nZXRGaWVsZExhYmVsKHsgbW9kZWxOYW1lLCBmaWVsZE5hbWUgfSkgKyAnLCAnLFxuICAgICcnLFxuICAgIG1pc3NpbmdGaWVsZHNcbiAgKS5zbGljZSgwLCAtMilcbiJdfQ==