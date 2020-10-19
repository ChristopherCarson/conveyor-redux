import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _prepend from "ramda/src/prepend";
import _path from "ramda/src/path";
import _isEmpty from "ramda/src/isEmpty";
import _pick from "ramda/src/pick";
import _isNil from "ramda/src/isNil";
import _omit from "ramda/src/omit";
import _append from "ramda/src/append";
import _Object$keys from "@babel/runtime-corejs3/core-js-stable/object/keys";
import _filter from "ramda/src/filter";
import _prop from "ramda/src/prop";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { ofType } from 'redux-observable';
import { concat } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { SAVE_CREATE } from '../actionConsts';
import * as Actions from '../actions';
import * as Logger from '../utils/Logger';
import { selectCreate } from '../utils/create';
import { getCreateSubmitValues, isValidationError, prepValidationErrors } from '../utils/helpers';
import { Epic } from './epic';
export var CreateEpic = /*#__PURE__*/function (_Epic) {
  _inherits(CreateEpic, _Epic);

  var _super = _createSuper(CreateEpic);

  function CreateEpic() {
    _classCallCheck(this, CreateEpic);

    return _super.apply(this, arguments);
  }

  _createClass(CreateEpic, [{
    key: SAVE_CREATE,
    value: function value(action$, state$) {
      var _this = this;

      return action$.pipe(ofType(SAVE_CREATE), map(_prop('payload')), map(function (payload) {
        var formStack = selectCreate(state$.value);

        var query = _this.queryBuilder.buildQuery({
          modelName: payload.modelName,
          queryType: 'create'
        });

        var createValues = getCreateSubmitValues({
          schema: _this.schema,
          formStack: formStack,
          modelName: payload.modelName
        });

        var imageFields = _filter(function (obj) {
          return _this.schema.isFile(payload.modelName, _prop('fieldName', obj));
        }, _this.schema.getFields(payload.modelName));

        var imageFieldsList = _Object$keys(imageFields);

        var omitList = _append('id', imageFieldsList);

        var variables = {
          input: _omit(omitList, createValues)
        };
        return {
          modelName: payload.modelName,
          variables: variables,
          query: query,
          inputWithFile: _filter(function (n) {
            return !_isNil(n);
          }, _pick(imageFieldsList, createValues))
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
      }), mergeMap(function (_ref2) {
        var context = _ref2.context,
            data = _ref2.data,
            error = _ref2.error;

        if (error) {
          Logger.epicError('saveCreateEpic', context, error);
          var errorActions = [];

          if (isValidationError(error.response)) {
            var errors = prepValidationErrors({
              schema: _this.schema,
              context: context,
              error: error
            });
            errorActions.push(Actions.onValidationErrorCreate({
              errors: errors
            }));
          }

          errorActions.push(Actions.addDangerAlert({
            message: 'Error submitting form.'
          }));
          return concat(errorActions);
        }

        var actions = [Actions.addSuccessAlert({
          message: "".concat(context.modelName, " successfully created.")
        })];
        var IdPath = ['create' + context.modelName, 'result', 'id']; // images exist

        if (!_isEmpty(_prop('inputWithFile', context))) {
          actions = _append(Actions.onInlineFileSubmit({
            modelName: context.modelName,
            id: _path(IdPath, data),
            fileData: context.inputWithFile,
            fromCreate: true
          }), actions);
        } else {
          // createSuccessful called in inlineFileSubmit; otherwise prepend it here
          actions = _prepend(Actions.onSaveCreateSuccessful({}), actions);
        }

        return concat(actions);
      }));
    }
  }]);

  return CreateEpic;
}(Epic);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy9jcmVhdGUudHMiXSwibmFtZXMiOlsib2ZUeXBlIiwiY29uY2F0IiwibWFwIiwibWVyZ2VNYXAiLCJTQVZFX0NSRUFURSIsIkFjdGlvbnMiLCJMb2dnZXIiLCJzZWxlY3RDcmVhdGUiLCJnZXRDcmVhdGVTdWJtaXRWYWx1ZXMiLCJpc1ZhbGlkYXRpb25FcnJvciIsInByZXBWYWxpZGF0aW9uRXJyb3JzIiwiRXBpYyIsIkNyZWF0ZUVwaWMiLCJhY3Rpb24kIiwic3RhdGUkIiwicGlwZSIsInBheWxvYWQiLCJmb3JtU3RhY2siLCJ2YWx1ZSIsInF1ZXJ5IiwicXVlcnlCdWlsZGVyIiwiYnVpbGRRdWVyeSIsIm1vZGVsTmFtZSIsInF1ZXJ5VHlwZSIsImNyZWF0ZVZhbHVlcyIsInNjaGVtYSIsImltYWdlRmllbGRzIiwib2JqIiwiaXNGaWxlIiwiZ2V0RmllbGRzIiwiaW1hZ2VGaWVsZHNMaXN0Iiwib21pdExpc3QiLCJ2YXJpYWJsZXMiLCJpbnB1dCIsImlucHV0V2l0aEZpbGUiLCJuIiwiY29udGV4dCIsInNlbmRSZXF1ZXN0IiwidGhlbiIsImRhdGEiLCJlcnJvciIsImVwaWNFcnJvciIsImVycm9yQWN0aW9ucyIsInJlc3BvbnNlIiwiZXJyb3JzIiwicHVzaCIsIm9uVmFsaWRhdGlvbkVycm9yQ3JlYXRlIiwiYWRkRGFuZ2VyQWxlcnQiLCJtZXNzYWdlIiwiYWN0aW9ucyIsImFkZFN1Y2Nlc3NBbGVydCIsIklkUGF0aCIsIm9uSW5saW5lRmlsZVN1Ym1pdCIsImlkIiwiZmlsZURhdGEiLCJmcm9tQ3JlYXRlIiwib25TYXZlQ3JlYXRlU3VjY2Vzc2Z1bCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsTUFBVCxRQUF1QixrQkFBdkI7QUFDQSxTQUFTQyxNQUFULFFBQXVCLE1BQXZCO0FBQ0EsU0FBU0MsR0FBVCxFQUFjQyxRQUFkLFFBQThCLGdCQUE5QjtBQUVBLFNBQVNDLFdBQVQsUUFB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QixDQUFWLENBQUwsRUFBa0Q7QUFDaERhLFVBQUFBLE9BQU8sR0FBRyxRQUNSNUMsT0FBTyxDQUFDK0Msa0JBQVIsQ0FBMkI7QUFDekI5QixZQUFBQSxTQUFTLEVBQUVjLE9BQU8sQ0FBQ2QsU0FETTtBQUV6QitCLFlBQUFBLEVBQUUsRUFBRSxNQUFPRixNQUFQLEVBQWVaLElBQWYsQ0FGcUI7QUFHekJlLFlBQUFBLFFBQVEsRUFBRWxCLE9BQU8sQ0FBQ0YsYUFITztBQUl6QnFCLFlBQUFBLFVBQVUsRUFBRTtBQUphLFdBQTNCLENBRFEsRUFPUk4sT0FQUSxDQUFWO0FBU0QsU0FWRCxNQVVPO0FBQ0w7QUFDQUEsVUFBQUEsT0FBTyxHQUFHLFNBQVU1QyxPQUFPLENBQUNtRCxzQkFBUixDQUErQixFQUEvQixDQUFWLEVBQThDUCxPQUE5QyxDQUFWO0FBQ0Q7O0FBRUQsZUFBT2hELE1BQU0sQ0FBQ2dELE9BQUQsQ0FBYjtBQUNELE9BM0NPLENBaERILENBQVA7QUE2RkQ7QUEvRkg7O0FBQUE7QUFBQSxFQUFnQ3RDLElBQWhDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZSdcbmltcG9ydCB7IGNvbmNhdCB9IGZyb20gJ3J4anMnXG5pbXBvcnQgeyBtYXAsIG1lcmdlTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnXG5pbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHsgU0FWRV9DUkVBVEUgfSBmcm9tICcuLi9hY3Rpb25Db25zdHMnXG5pbXBvcnQgKiBhcyBBY3Rpb25zIGZyb20gJy4uL2FjdGlvbnMnXG5pbXBvcnQgKiBhcyBMb2dnZXIgZnJvbSAnLi4vdXRpbHMvTG9nZ2VyJ1xuaW1wb3J0IHsgc2VsZWN0Q3JlYXRlIH0gZnJvbSAnLi4vdXRpbHMvY3JlYXRlJ1xuaW1wb3J0IHtcbiAgZ2V0Q3JlYXRlU3VibWl0VmFsdWVzLFxuICBpc1ZhbGlkYXRpb25FcnJvcixcbiAgcHJlcFZhbGlkYXRpb25FcnJvcnNcbn0gZnJvbSAnLi4vdXRpbHMvaGVscGVycydcbmltcG9ydCB7IEVwaWMgfSBmcm9tICcuL2VwaWMnXG5cbmV4cG9ydCBjbGFzcyBDcmVhdGVFcGljIGV4dGVuZHMgRXBpYyB7XG4gIFtTQVZFX0NSRUFURV0oYWN0aW9uJDogYW55LCBzdGF0ZSQ6IGFueSkge1xuICAgIHJldHVybiBhY3Rpb24kLnBpcGUoXG4gICAgICBvZlR5cGUoU0FWRV9DUkVBVEUpLFxuICAgICAgbWFwKFIucHJvcCgncGF5bG9hZCcpKSxcbiAgICAgIG1hcCgocGF5bG9hZDogRXBpY1BheWxvYWQpID0+IHtcbiAgICAgICAgY29uc3QgZm9ybVN0YWNrID0gc2VsZWN0Q3JlYXRlKHN0YXRlJC52YWx1ZSlcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLnF1ZXJ5QnVpbGRlci5idWlsZFF1ZXJ5KHtcbiAgICAgICAgICBtb2RlbE5hbWU6IHBheWxvYWQubW9kZWxOYW1lLFxuICAgICAgICAgIHF1ZXJ5VHlwZTogJ2NyZWF0ZSdcbiAgICAgICAgfSlcbiAgICAgICAgY29uc3QgY3JlYXRlVmFsdWVzID0gZ2V0Q3JlYXRlU3VibWl0VmFsdWVzKHtcbiAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgIGZvcm1TdGFjayxcbiAgICAgICAgICBtb2RlbE5hbWU6IHBheWxvYWQubW9kZWxOYW1lIGFzIHN0cmluZ1xuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IGltYWdlRmllbGRzID0gUi5maWx0ZXIoXG4gICAgICAgICAgKG9iajogYW55KSA9PlxuICAgICAgICAgICAgdGhpcy5zY2hlbWEuaXNGaWxlKFxuICAgICAgICAgICAgICBwYXlsb2FkLm1vZGVsTmFtZSBhcyBzdHJpbmcsXG4gICAgICAgICAgICAgIFIucHJvcCgnZmllbGROYW1lJywgb2JqKVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICB0aGlzLnNjaGVtYS5nZXRGaWVsZHMocGF5bG9hZC5tb2RlbE5hbWUgYXMgc3RyaW5nKVxuICAgICAgICApXG4gICAgICAgIGNvbnN0IGltYWdlRmllbGRzTGlzdCA9IE9iamVjdC5rZXlzKGltYWdlRmllbGRzKVxuICAgICAgICBjb25zdCBvbWl0TGlzdCA9IFIuYXBwZW5kKCdpZCcsIGltYWdlRmllbGRzTGlzdClcblxuICAgICAgICBjb25zdCB2YXJpYWJsZXMgPSB7XG4gICAgICAgICAgaW5wdXQ6IFIub21pdChvbWl0TGlzdCwgY3JlYXRlVmFsdWVzKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBtb2RlbE5hbWU6IHBheWxvYWQubW9kZWxOYW1lLFxuICAgICAgICAgIHZhcmlhYmxlcyxcbiAgICAgICAgICBxdWVyeSxcbiAgICAgICAgICBpbnB1dFdpdGhGaWxlOiBSLmZpbHRlcihcbiAgICAgICAgICAgIG4gPT4gIVIuaXNOaWwobiksXG4gICAgICAgICAgICBSLnBpY2soaW1hZ2VGaWVsZHNMaXN0LCBjcmVhdGVWYWx1ZXMpXG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICB9KSxcbiAgICAgIG1lcmdlTWFwKChjb250ZXh0OiBhbnkpID0+XG4gICAgICAgIHRoaXMucXVlcnlCdWlsZGVyXG4gICAgICAgICAgLnNlbmRSZXF1ZXN0KHtcbiAgICAgICAgICAgIHF1ZXJ5OiBjb250ZXh0LnF1ZXJ5LFxuICAgICAgICAgICAgdmFyaWFibGVzOiBjb250ZXh0LnZhcmlhYmxlc1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLnRoZW4oKHsgZGF0YSwgZXJyb3IgfSkgPT4gKHsgY29udGV4dCwgZGF0YSwgZXJyb3IgfSkpXG4gICAgICApLFxuICAgICAgbWVyZ2VNYXAoKHsgY29udGV4dCwgZGF0YSwgZXJyb3IgfSkgPT4ge1xuICAgICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgICBMb2dnZXIuZXBpY0Vycm9yKCdzYXZlQ3JlYXRlRXBpYycsIGNvbnRleHQsIGVycm9yKVxuICAgICAgICAgIGNvbnN0IGVycm9yQWN0aW9ucyA9IFtdXG4gICAgICAgICAgaWYgKGlzVmFsaWRhdGlvbkVycm9yKGVycm9yLnJlc3BvbnNlKSkge1xuICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gcHJlcFZhbGlkYXRpb25FcnJvcnMoe1xuICAgICAgICAgICAgICBzY2hlbWE6IHRoaXMuc2NoZW1hLFxuICAgICAgICAgICAgICBjb250ZXh0LFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIGVycm9yQWN0aW9ucy5wdXNoKEFjdGlvbnMub25WYWxpZGF0aW9uRXJyb3JDcmVhdGUoeyBlcnJvcnMgfSkpXG4gICAgICAgICAgfVxuICAgICAgICAgIGVycm9yQWN0aW9ucy5wdXNoKFxuICAgICAgICAgICAgQWN0aW9ucy5hZGREYW5nZXJBbGVydCh7IG1lc3NhZ2U6ICdFcnJvciBzdWJtaXR0aW5nIGZvcm0uJyB9KVxuICAgICAgICAgIClcbiAgICAgICAgICByZXR1cm4gY29uY2F0KGVycm9yQWN0aW9ucylcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBhY3Rpb25zID0gW1xuICAgICAgICAgIEFjdGlvbnMuYWRkU3VjY2Vzc0FsZXJ0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6IGAke2NvbnRleHQubW9kZWxOYW1lfSBzdWNjZXNzZnVsbHkgY3JlYXRlZC5gXG4gICAgICAgICAgfSlcbiAgICAgICAgXVxuXG4gICAgICAgIGNvbnN0IElkUGF0aCA9IFsnY3JlYXRlJyArIGNvbnRleHQubW9kZWxOYW1lLCAncmVzdWx0JywgJ2lkJ11cblxuICAgICAgICAvLyBpbWFnZXMgZXhpc3RcbiAgICAgICAgaWYgKCFSLmlzRW1wdHkoUi5wcm9wKCdpbnB1dFdpdGhGaWxlJywgY29udGV4dCkpKSB7XG4gICAgICAgICAgYWN0aW9ucyA9IFIuYXBwZW5kKFxuICAgICAgICAgICAgQWN0aW9ucy5vbklubGluZUZpbGVTdWJtaXQoe1xuICAgICAgICAgICAgICBtb2RlbE5hbWU6IGNvbnRleHQubW9kZWxOYW1lLFxuICAgICAgICAgICAgICBpZDogUi5wYXRoKElkUGF0aCwgZGF0YSksXG4gICAgICAgICAgICAgIGZpbGVEYXRhOiBjb250ZXh0LmlucHV0V2l0aEZpbGUsXG4gICAgICAgICAgICAgIGZyb21DcmVhdGU6IHRydWVcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgYWN0aW9uc1xuICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBjcmVhdGVTdWNjZXNzZnVsIGNhbGxlZCBpbiBpbmxpbmVGaWxlU3VibWl0OyBvdGhlcndpc2UgcHJlcGVuZCBpdCBoZXJlXG4gICAgICAgICAgYWN0aW9ucyA9IFIucHJlcGVuZChBY3Rpb25zLm9uU2F2ZUNyZWF0ZVN1Y2Nlc3NmdWwoe30pLCBhY3Rpb25zKVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbmNhdChhY3Rpb25zKVxuICAgICAgfSlcbiAgICApXG4gIH1cbn1cbiJdfQ==