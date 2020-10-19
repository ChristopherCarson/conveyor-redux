import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _assocPath from "ramda/src/assocPath";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _path from "ramda/src/path";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _prop from "ramda/src/prop";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { MENU_OPEN, DATA_OPTIONS_UPDATE, EXISTING_VALUE_UPDATE } from '../actionConsts';
import { initState } from '../utils/options';
import { Reducer } from './reducer';
export var OptionsReducer = /*#__PURE__*/function (_Reducer) {
  _inherits(OptionsReducer, _Reducer);

  var _super = _createSuper(OptionsReducer);

  function OptionsReducer(schema) {
    _classCallCheck(this, OptionsReducer);

    return _super.call(this, schema, initState);
  }

  _createClass(OptionsReducer, [{
    key: MENU_OPEN,
    value: function value(state, action) {
      var _this = this;

      var payload = _prop('payload', action); // @ts-ignore


      var _payload = _Object$assign({}, payload),
          modelName = _payload.modelName,
          fieldName = _payload.fieldName,
          rawData = _payload.rawData; // get schema data about the field


      var field1 = this.schema.getField(modelName, fieldName); // get the target model from the field:

      var targetModel = _path(['type', 'target'], field1); // get drop-down options


      var options = _mapInstanceProperty(rawData).call(rawData, function (node) {
        return {
          label: _this.schema.getDisplayValue({
            modelName: targetModel,
            node: node
          }),
          value: _prop('id', node)
        };
      });

      return _assocPath([modelName, fieldName], options, state);
    }
  }, {
    key: DATA_OPTIONS_UPDATE,
    value: function value(state, action) {
      var _this2 = this;

      var payload = _prop('payload', action); // @ts-ignore


      var _payload2 = _Object$assign({}, payload),
          modelName = _payload2.modelName,
          fieldName = _payload2.fieldName;

      var targetModelName = _path(['type', 'target'], this.schema.getField(modelName, fieldName));

      var data = _path(['data', 'result'], payload);

      var options = _mapInstanceProperty(data).call(data, function (option) {
        return {
          label: _this2.schema.getDisplayValue({
            modelName: targetModelName,
            node: option
          }),
          value: _prop('id', option)
        };
      });

      return _assocPath([modelName, fieldName], options, state);
    }
  }, {
    key: EXISTING_VALUE_UPDATE,
    value: function value(state, action) {
      var payload = _prop('payload', action); // @ts-ignore


      var _payload3 = _Object$assign({}, payload),
          modelName = _payload3.modelName,
          fieldName = _payload3.fieldName,
          value = _payload3.value;

      var options = _mapInstanceProperty(value).call(value, function (option) {
        return {
          label: option,
          value: option
        };
      });

      return _assocPath([modelName, fieldName], options, state);
    }
  }]);

  return OptionsReducer;
}(Reducer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9vcHRpb25zLnRzIl0sIm5hbWVzIjpbIk1FTlVfT1BFTiIsIkRBVEFfT1BUSU9OU19VUERBVEUiLCJFWElTVElOR19WQUxVRV9VUERBVEUiLCJpbml0U3RhdGUiLCJSZWR1Y2VyIiwiT3B0aW9uc1JlZHVjZXIiLCJzY2hlbWEiLCJzdGF0ZSIsImFjdGlvbiIsInBheWxvYWQiLCJtb2RlbE5hbWUiLCJmaWVsZE5hbWUiLCJyYXdEYXRhIiwiZmllbGQxIiwiZ2V0RmllbGQiLCJ0YXJnZXRNb2RlbCIsIm9wdGlvbnMiLCJub2RlIiwibGFiZWwiLCJnZXREaXNwbGF5VmFsdWUiLCJ2YWx1ZSIsInRhcmdldE1vZGVsTmFtZSIsImRhdGEiLCJvcHRpb24iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxTQUNFQSxTQURGLEVBRUVDLG1CQUZGLEVBR0VDLHFCQUhGLFFBSU8saUJBSlA7QUFLQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsV0FBeEI7QUFHQSxXQUFhQyxjQUFiO0FBQUE7O0FBQUE7O0FBQ0UsMEJBQVlDLE1BQVosRUFBbUM7QUFBQTs7QUFBQSw2QkFDM0JBLE1BRDJCLEVBQ25CSCxTQURtQjtBQUVsQzs7QUFISDtBQUFBLFNBS0dILFNBTEg7QUFBQSwwQkFLY08sS0FMZCxFQUswQkMsTUFMMUIsRUFLdUM7QUFBQTs7QUFDbkMsVUFBTUMsT0FBTyxHQUFHLE1BQU8sU0FBUCxFQUFrQkQsTUFBbEIsQ0FBaEIsQ0FEbUMsQ0FFbkM7OztBQUZtQyx3Q0FHWUMsT0FIWjtBQUFBLFVBRzNCQyxTQUgyQixZQUczQkEsU0FIMkI7QUFBQSxVQUdoQkMsU0FIZ0IsWUFHaEJBLFNBSGdCO0FBQUEsVUFHTEMsT0FISyxZQUdMQSxPQUhLLEVBS25DOzs7QUFDQSxVQUFNQyxNQUFNLEdBQUcsS0FBS1AsTUFBTCxDQUFZUSxRQUFaLENBQXFCSixTQUFyQixFQUFnQ0MsU0FBaEMs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X09QRU4sXG4gIERBVEFfT1BUSU9OU19VUERBVEUsXG4gIEVYSVNUSU5HX1ZBTFVFX1VQREFURVxufSBmcm9tICcuLi9hY3Rpb25Db25zdHMnXG5pbXBvcnQgeyBpbml0U3RhdGUgfSBmcm9tICcuLi91dGlscy9vcHRpb25zJ1xuaW1wb3J0IHsgUmVkdWNlciB9IGZyb20gJy4vcmVkdWNlcidcbmltcG9ydCB7IFNjaGVtYUJ1aWxkZXIgfSBmcm9tICdAYXV0b2ludmVudC9jb252ZXlvci1zY2hlbWEnXG5cbmV4cG9ydCBjbGFzcyBPcHRpb25zUmVkdWNlciBleHRlbmRzIFJlZHVjZXIge1xuICBjb25zdHJ1Y3RvcihzY2hlbWE6IFNjaGVtYUJ1aWxkZXIpIHtcbiAgICBzdXBlcihzY2hlbWEsIGluaXRTdGF0ZSlcbiAgfVxuXG4gIFtNRU5VX09QRU5dKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IFIucHJvcCgncGF5bG9hZCcsIGFjdGlvbilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGZpZWxkTmFtZSwgcmF3RGF0YSB9ID0geyAuLi5wYXlsb2FkIH1cblxuICAgIC8vIGdldCBzY2hlbWEgZGF0YSBhYm91dCB0aGUgZmllbGRcbiAgICBjb25zdCBmaWVsZDEgPSB0aGlzLnNjaGVtYS5nZXRGaWVsZChtb2RlbE5hbWUsIGZpZWxkTmFtZSlcblxuICAgIC8vIGdldCB0aGUgdGFyZ2V0IG1vZGVsIGZyb20gdGhlIGZpZWxkOlxuICAgIGNvbnN0IHRhcmdldE1vZGVsID0gUi5wYXRoKFsndHlwZScsICd0YXJnZXQnXSwgZmllbGQxKSBhcyBzdHJpbmdcblxuICAgIC8vIGdldCBkcm9wLWRvd24gb3B0aW9uc1xuICAgIGNvbnN0IG9wdGlvbnMgPSByYXdEYXRhLm1hcCgobm9kZTogYW55KSA9PiAoe1xuICAgICAgbGFiZWw6IHRoaXMuc2NoZW1hLmdldERpc3BsYXlWYWx1ZSh7XG4gICAgICAgIG1vZGVsTmFtZTogdGFyZ2V0TW9kZWwsXG4gICAgICAgIG5vZGVcbiAgICAgIH0pLFxuICAgICAgdmFsdWU6IFIucHJvcCgnaWQnLCBub2RlKVxuICAgIH0pKVxuXG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKFttb2RlbE5hbWUsIGZpZWxkTmFtZV0sIG9wdGlvbnMsIHN0YXRlKVxuICB9XG5cbiAgW0RBVEFfT1BUSU9OU19VUERBVEVdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgcGF5bG9hZCA9IFIucHJvcCgncGF5bG9hZCcsIGFjdGlvbilcbiAgICAvLyBAdHMtaWdub3JlXG4gICAgY29uc3QgeyBtb2RlbE5hbWUsIGZpZWxkTmFtZSB9ID0geyAuLi5wYXlsb2FkIH1cbiAgICBjb25zdCB0YXJnZXRNb2RlbE5hbWUgPSBSLnBhdGgoXG4gICAgICBbJ3R5cGUnLCAndGFyZ2V0J10sXG4gICAgICB0aGlzLnNjaGVtYS5nZXRGaWVsZChtb2RlbE5hbWUsIGZpZWxkTmFtZSlcbiAgICApIGFzIGFueVxuICAgIGNvbnN0IGRhdGEgPSBSLnBhdGgoWydkYXRhJywgJ3Jlc3VsdCddLCBwYXlsb2FkKSBhcyBhbnlcbiAgICBjb25zdCBvcHRpb25zID0gZGF0YS5tYXAoKG9wdGlvbjogYW55KSA9PiAoe1xuICAgICAgbGFiZWw6IHRoaXMuc2NoZW1hLmdldERpc3BsYXlWYWx1ZSh7XG4gICAgICAgIG1vZGVsTmFtZTogdGFyZ2V0TW9kZWxOYW1lLFxuICAgICAgICBub2RlOiBvcHRpb25cbiAgICAgIH0pLFxuICAgICAgdmFsdWU6IFIucHJvcCgnaWQnLCBvcHRpb24pXG4gICAgfSkpXG5cbiAgICByZXR1cm4gUi5hc3NvY1BhdGgoW21vZGVsTmFtZSwgZmllbGROYW1lXSwgb3B0aW9ucywgc3RhdGUpXG4gIH1cblxuICBbRVhJU1RJTkdfVkFMVUVfVVBEQVRFXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IHBheWxvYWQgPSBSLnByb3AoJ3BheWxvYWQnLCBhY3Rpb24pXG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHsgbW9kZWxOYW1lLCBmaWVsZE5hbWUsIHZhbHVlIH0gPSB7IC4uLnBheWxvYWQgfVxuICAgIGNvbnN0IG9wdGlvbnMgPSB2YWx1ZS5tYXAoKG9wdGlvbjogYW55KSA9PiAoe1xuICAgICAgbGFiZWw6IG9wdGlvbixcbiAgICAgIHZhbHVlOiBvcHRpb25cbiAgICB9KSlcblxuICAgIHJldHVybiBSLmFzc29jUGF0aChbbW9kZWxOYW1lLCBmaWVsZE5hbWVdLCBvcHRpb25zLCBzdGF0ZSlcbiAgfVxufVxuIl19