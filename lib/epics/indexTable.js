import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _path from "ramda/src/path";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { ofType } from 'redux-observable';
import { map } from 'rxjs/operators';
import * as Actions from '../actions';
import { INDEX_TABLE_FILTER_SUBMIT, INDEX_TABLE_SORT_CHANGE } from '../actionConsts';
import { Epic } from './epic';
export var IndexTableEpic = /*#__PURE__*/function (_Epic) {
  _inherits(IndexTableEpic, _Epic);

  var _super = _createSuper(IndexTableEpic);

  function IndexTableEpic() {
    _classCallCheck(this, IndexTableEpic);

    return _super.apply(this, arguments);
  }

  _createClass(IndexTableEpic, [{
    key: INDEX_TABLE_FILTER_SUBMIT,
    value: function value(action$) {
      return action$.pipe(ofType(INDEX_TABLE_FILTER_SUBMIT), map(_path(['payload', 'modelName'])), map(function (modelName) {
        return Actions.fetchModelIndex({
          modelName: modelName
        });
      }));
    }
  }, {
    key: INDEX_TABLE_SORT_CHANGE,
    value: function value(action$) {
      return action$.pipe(ofType(INDEX_TABLE_SORT_CHANGE), map(_path(['payload', 'modelName'])), map(function (modelName) {
        return Actions.fetchModelIndex({
          modelName: modelName
        });
      }));
    }
  }]);

  return IndexTableEpic;
}(Epic);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy9pbmRleFRhYmxlLnRzIl0sIm5hbWVzIjpbIm9mVHlwZSIsIm1hcCIsIkFjdGlvbnMiLCJJTkRFWF9UQUJMRV9GSUxURVJfU1VCTUlUIiwiSU5ERVhfVEFCTEVfU09SVF9DSEFOR0UiLCJFcGljIiwiSW5kZXhUYWJsZUVwaWMiLCJhY3Rpb24kIiwicGlwZSIsIm1vZGVsTmFtZSIsImZldGNoTW9kZWxJbmRleCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsU0FBU0EsTUFBVCxRQUF1QixrQkFBdkI7QUFDQSxTQUFTQyxHQUFULFFBQW9CLGdCQUFwQjtBQUVBLE9BQU8sS0FBS0MsT0FBWixNQUF5QixZQUF6QjtBQUNBLFNBQ0VDLHlCQURGLEVBRUVDLHVCQUZGLFFBR08saUJBSFA7QUFJQSxTQUFTQyxJQUFULFFBQXFCLFFBQXJCO0FBRUEsV0FBYUMsY0FBYjtBQUFBOztBQUFBOztBQUFBO0FBQUE7O0FBQUE7QUFBQTs7QUFBQTtBQUFBLFNBQ0dILHlCQURIO0FBQUEsMEJBQzhCSSxPQUQ5QixFQUM0QztBQUN4QyxhQUFPQSxPQUFPLENBQUNDLElBQVIsQ0FDTFIsTUFBTSxDQUFDRyx5QkFBRCxDQURELEVBRUxGLEdBQUcsQ0FBQyxNQUFPLENBQUMsU0FBRCxFQUFZLFdBQVosQ0FBUCxDQUFELENBRkUsRUFHTEEsR0FBRyxDQUFDLFVBQUFRLFNBQVM7QUFBQSxlQUFJUCxPQUFPLENBQUNRLGVBQVIsQ0FBd0I7QUFBRUQsVUFBQUEsU0FBUyxFQUFUQTtBQUFGLFNBQXhCLENBQUo7QUFBQSxPQUFWLENBSEUsQ0FBUDtBQUtEO0FBUEg7QUFBQSxTQVNHTCx1QkFUSDtBQUFBLDBCQVM0QkcsT0FUNUIsRUFTMEM7QUFDdEMsYUFBT0EsT0FBTyxDQUFDQyxJQUFSLENBQ0xSLE1BQU0sQ0FBQ0ksdUJBQUQsQ0FERCxFQUVMSCxHQUFHLENBQUMsTUFBTyxDQUFDLFNBQUQsRUFBWSxXQUFaLENBQVAsQ0FBRCxDQUZFLEVBR0xBLEdBQUcsQ0FBQyxVQUFBUSxTQUFTO0FBQUEsZUFBSVAsT0FBTyxDQUFDUSxlQUFSLENBQXdCO0FBQUVELFVBQUFBLFNBQVMsRUFBVEE7QUFBRixTQUF4QixDQUFKO0FBQUEsT0FBVixDQUhFLENBQVA7QUFLRDtBQWZIOztBQUFBO0FBQUEsRUFBb0NKLElBQXBDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgb2ZUeXBlIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZSdcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJ1xuaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSdcbmltcG9ydCAqIGFzIEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucydcbmltcG9ydCB7XG4gIElOREVYX1RBQkxFX0ZJTFRFUl9TVUJNSVQsXG4gIElOREVYX1RBQkxFX1NPUlRfQ0hBTkdFXG59IGZyb20gJy4uL2FjdGlvbkNvbnN0cydcbmltcG9ydCB7IEVwaWMgfSBmcm9tICcuL2VwaWMnXG5cbmV4cG9ydCBjbGFzcyBJbmRleFRhYmxlRXBpYyBleHRlbmRzIEVwaWMge1xuICBbSU5ERVhfVEFCTEVfRklMVEVSX1NVQk1JVF0oYWN0aW9uJDogYW55KSB7XG4gICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShJTkRFWF9UQUJMRV9GSUxURVJfU1VCTUlUKSxcbiAgICAgIG1hcChSLnBhdGgoWydwYXlsb2FkJywgJ21vZGVsTmFtZSddKSksXG4gICAgICBtYXAobW9kZWxOYW1lID0+IEFjdGlvbnMuZmV0Y2hNb2RlbEluZGV4KHsgbW9kZWxOYW1lIH0pKVxuICAgIClcbiAgfVxuXG4gIFtJTkRFWF9UQUJMRV9TT1JUX0NIQU5HRV0oYWN0aW9uJDogYW55KSB7XG4gICAgcmV0dXJuIGFjdGlvbiQucGlwZShcbiAgICAgIG9mVHlwZShJTkRFWF9UQUJMRV9TT1JUX0NIQU5HRSksXG4gICAgICBtYXAoUi5wYXRoKFsncGF5bG9hZCcsICdtb2RlbE5hbWUnXSkpLFxuICAgICAgbWFwKG1vZGVsTmFtZSA9PiBBY3Rpb25zLmZldGNoTW9kZWxJbmRleCh7IG1vZGVsTmFtZSB9KSlcbiAgICApXG4gIH1cbn1cbiJdfQ==