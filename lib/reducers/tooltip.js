import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _assocPath from "ramda/src/assocPath";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _path from "ramda/src/path";
import _pathOr from "ramda/src/pathOr";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _prop from "ramda/src/prop";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { UPDATE_MODEL_TOOLTIP } from '../actionConsts';
import { initState } from '../utils/tooltip';
import { Reducer } from './reducer';
export var TooltipReducer = /*#__PURE__*/function (_Reducer) {
  _inherits(TooltipReducer, _Reducer);

  var _super = _createSuper(TooltipReducer);

  function TooltipReducer(schema) {
    _classCallCheck(this, TooltipReducer);

    return _super.call(this, schema, initState);
  }

  _createClass(TooltipReducer, [{
    key: UPDATE_MODEL_TOOLTIP,
    value: function value(state, action) {
      var _this = this;

      var payload = _prop('payload', action); // @ts-ignore


      var _payload = _Object$assign({}, payload),
          id = _payload.id,
          modelName = _payload.modelName,
          data = _payload.data; // @ts-ignore


      var result = _pathOr([], ['result'], data);

      var tooltipData = [];

      for (var fieldName in result) {
        // @ts-ignore
        var value = _prop(fieldName, result); // todo: add 'node' and/or 'data' props into 'schema.getFieldLabel'


        var name = this.schema.getFieldLabel({
          modelName: modelName,
          fieldName: fieldName
        });
        var type = this.schema.getType(modelName, fieldName);
        var field = this.schema.getField(modelName, fieldName);

        if (value === null) {
          tooltipData.push({
            name: name,
            value: [{
              text: 'N/A'
            }]
          });
        } else if (type === 'enum') {
          tooltipData.push({
            name: name,
            value: [{
              text: this.schema.getEnumLabel(modelName, fieldName, value)
            }]
          });
        } else if (this.schema.isManyToMany(modelName, fieldName)) {
          (function () {
            var relModelName = _path(['type', 'target'], field); // todo: add 'customProps' from outside source to all functions


            var values = _mapInstanceProperty(value).call(value, function (node) {
              var _context;

              var text = _this.schema.getDisplayValue({
                modelName: relModelName,
                node: node
              });

              return {
                text: text,
                url: _concatInstanceProperty(_context = "/".concat(relModelName, "/")).call(_context, _prop('id', node))
              };
            });

            tooltipData.push({
              name: name,
              value: values
            });
          })();
        } else if (this.schema.isManyToOne(modelName, fieldName)) {
          var _context2;

          var relModelName = _path(['type', 'target'], this.schema.getField(modelName, fieldName));

          var text = this.schema.getDisplayValue({
            modelName: relModelName,
            node: value
          });

          var getId = _prop('id');

          tooltipData.push({
            name: name,
            value: [{
              text: text,
              url: _concatInstanceProperty(_context2 = "/".concat(relModelName, "/")).call(_context2, getId(value))
            }]
          });
        } else {
          tooltipData.push({
            name: name,
            value: [{
              text: value
            }]
          });
        }
      }

      return _assocPath([modelName, id.toString()], tooltipData, state);
    }
  }]);

  return TooltipReducer;
}(Reducer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy90b29sdGlwLnRzIl0sIm5hbWVzIjpbIlVQREFURV9NT0RFTF9UT09MVElQIiwiaW5pdFN0YXRlIiwiUmVkdWNlciIsIlRvb2x0aXBSZWR1Y2VyIiwic2NoZW1hIiwic3RhdGUiLCJhY3Rpb24iLCJwYXlsb2FkIiwiaWQiLCJtb2RlbE5hbWUiLCJkYXRhIiwicmVzdWx0IiwidG9vbHRpcERhdGEiLCJmaWVsZE5hbWUiLCJ2YWx1ZSIsIm5hbWUiLCJnZXRGaWVsZExhYmVsIiwidHlwZSIsImdldFR5cGUiLCJmaWVsZCIsImdldEZpZWxkIiwicHVzaCIsInRleHQiLCJnZXRFbnVtTGFiZWwiLCJpc01hbnlUb01hbnkiLCJyZWxNb2RlbE5hbWUiLCJ2YWx1ZXMiLCJub2RlIiwiZ2V0RGlzcGxheVZhbHVlIiwidXJsIiwiaXNNYW55VG9PbmUiLCJnZXRJZCIsInRvU3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxTQUFTQSxvQkFBVCxRQUFxQyxpQkFBckM7QUFDQSxTQUFTQyxTQUFULFFBQTBCLGtCQUExQjtBQUNBLFNBQVNDLE9BQVQsUUFBd0IsV0FBeEI7QUFHQSxXQUFhQyxjQUFiO0FBQUE7O0FBQUE7O0FBQ0UsMEJBQVlDLE1BQVosRUFBbUM7QUFBQTs7QUFBQSw2QkFDM0JBLE1BRDJCLEVBQ25CSCxTQURtQjtBQUVsQzs7QUFISDtBQUFBLFNBS0dELG9CQUxIO0FBQUEsMEJBS3lCSyxLQUx6QixFQUtxQ0MsTUFMckMsRUFLa0Q7QUFBQTs7QUFDOUMsVUFBTUMsT0FBTyxHQUFHLE1BQU8sU0FBUCxFQUFrQkQsTUFBbEIsQ0FBaEIsQ0FEOEMsQ0FFOUM7OztBQUY4Qyx3Q0FHVEMsT0FIUztBQUFBLFVBR3RDQyxFQUhzQyxZQUd0Q0EsRUFIc0M7QUFBQSxVQUdsQ0MsU0FIa0MsWUFHbENBLFNBSGtDO0FBQUEsVUFHdkJDLElBSHVCLFlBR3ZCQSxJQUh1QixFQUk5Qzs7O0FBQ0EsVUFBTUMs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QUFFYjtBQUZpQyxXQUE1QixDQUFiOztBQUlBLGNBQU1pQixLQUE2QixHQUFHLE1BQU8sSUFBUCxDQUF0Qzs7QUFDQW5CLFVBQUFBLFdBQVcsQ0FBQ1MsSUFBWixDQUFpQjtBQUNmTixZQUFBQSxJQUFJLEVBQUpBLElBRGU7QUFFZkQsWUFBQUEsS0FBSyxFQUFFLENBQ0w7QUFDRVEsY0FBQUEsSUFBSSxFQUFKQSxJQURGO0FBRUVPLGNBQUFBLEdBQUcsaURBQU1KLFlBQU4sd0JBQXNCTSxLQUFLLENBQUNqQixLQUFELENBQTNCO0FBRkwsYUFESztBQUZRLFdBQWpCO0FBU0QsU0FuQk0sTUFtQkE7QUFDTEYsVUFBQUEsV0FBVyxDQUFDUyxJQUFaLENBQWlCO0FBQ2ZOLFlBQUFBLElBQUksRUFBSkEsSUFEZTtBQUVmRCxZQUFBQSxLQUFLLEVBQUUsQ0FDTDtBQUNFUSxjQUFBQSxJQUFJLEVBQUVSO0FBRFIsYUFESztBQUZRLFdBQWpCO0FBUUQ7QUFDRjs7QUFFRCxhQUFPLFdBQVksQ0FBQ0wsU0FBRCxFQUFZRCxFQUFFLENBQUN3QixRQUFILEVBQVosQ0FBWixFQUF3Q3BCLFdBQXhDLEVBQXFEUCxLQUFyRCxDQUFQO0FBQ0Q7QUF6Rkg7O0FBQUE7QUFBQSxFQUFvQ0gsT0FBcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHsgVVBEQVRFX01PREVMX1RPT0xUSVAgfSBmcm9tICcuLi9hY3Rpb25Db25zdHMnXG5pbXBvcnQgeyBpbml0U3RhdGUgfSBmcm9tICcuLi91dGlscy90b29sdGlwJ1xuaW1wb3J0IHsgUmVkdWNlciB9IGZyb20gJy4vcmVkdWNlcidcbmltcG9ydCB7IFNjaGVtYUJ1aWxkZXIgfSBmcm9tICdAYXV0b2ludmVudC9jb252ZXlvci1zY2hlbWEnXG5cbmV4cG9ydCBjbGFzcyBUb29sdGlwUmVkdWNlciBleHRlbmRzIFJlZHVjZXIge1xuICBjb25zdHJ1Y3RvcihzY2hlbWE6IFNjaGVtYUJ1aWxkZXIpIHtcbiAgICBzdXBlcihzY2hlbWEsIGluaXRTdGF0ZSlcbiAgfVxuXG4gIFtVUERBVEVfTU9ERUxfVE9PTFRJUF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBwYXlsb2FkID0gUi5wcm9wKCdwYXlsb2FkJywgYWN0aW9uKVxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCB7IGlkLCBtb2RlbE5hbWUsIGRhdGEgfSA9IHsgLi4ucGF5bG9hZCB9XG4gICAgLy8gQHRzLWlnbm9yZVxuICAgIGNvbnN0IHJlc3VsdCA9IFIucGF0aE9yKFtdLCBbJ3Jlc3VsdCddLCBkYXRhKVxuICAgIGNvbnN0IHRvb2x0aXBEYXRhID0gW11cblxuICAgIGZvciAoY29uc3QgZmllbGROYW1lIGluIHJlc3VsdCkge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgY29uc3QgdmFsdWU6IG5vZGUgPSBSLnByb3AoZmllbGROYW1lLCByZXN1bHQpXG4gICAgICAvLyB0b2RvOiBhZGQgJ25vZGUnIGFuZC9vciAnZGF0YScgcHJvcHMgaW50byAnc2NoZW1hLmdldEZpZWxkTGFiZWwnXG4gICAgICBjb25zdCBuYW1lID0gdGhpcy5zY2hlbWEuZ2V0RmllbGRMYWJlbCh7IG1vZGVsTmFtZSwgZmllbGROYW1lIH0pXG4gICAgICBjb25zdCB0eXBlID0gdGhpcy5zY2hlbWEuZ2V0VHlwZShtb2RlbE5hbWUsIGZpZWxkTmFtZSlcbiAgICAgIGNvbnN0IGZpZWxkID0gdGhpcy5zY2hlbWEuZ2V0RmllbGQobW9kZWxOYW1lLCBmaWVsZE5hbWUpXG5cbiAgICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICB0b29sdGlwRGF0YS5wdXNoKHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHZhbHVlOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRleHQ6ICdOL0EnXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnZW51bScpIHtcbiAgICAgICAgdG9vbHRpcERhdGEucHVzaCh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICB2YWx1ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiB0aGlzLnNjaGVtYS5nZXRFbnVtTGFiZWwobW9kZWxOYW1lLCBmaWVsZE5hbWUsIHZhbHVlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2hlbWEuaXNNYW55VG9NYW55KG1vZGVsTmFtZSwgZmllbGROYW1lKSkge1xuICAgICAgICBjb25zdCByZWxNb2RlbE5hbWUgPSBSLnBhdGgoWyd0eXBlJywgJ3RhcmdldCddLCBmaWVsZCkgYXMgc3RyaW5nXG4gICAgICAgIC8vIHRvZG86IGFkZCAnY3VzdG9tUHJvcHMnIGZyb20gb3V0c2lkZSBzb3VyY2UgdG8gYWxsIGZ1bmN0aW9uc1xuICAgICAgICBjb25zdCB2YWx1ZXMgPSB2YWx1ZS5tYXAoKG5vZGU6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLnNjaGVtYS5nZXREaXNwbGF5VmFsdWUoe1xuICAgICAgICAgICAgbW9kZWxOYW1lOiByZWxNb2RlbE5hbWUsXG4gICAgICAgICAgICBub2RlXG4gICAgICAgICAgfSlcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0ZXh0LFxuICAgICAgICAgICAgdXJsOiBgLyR7cmVsTW9kZWxOYW1lfS8ke1IucHJvcCgnaWQnLCBub2RlKX1gXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICB0b29sdGlwRGF0YS5wdXNoKHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZXNcbiAgICAgICAgfSlcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zY2hlbWEuaXNNYW55VG9PbmUobW9kZWxOYW1lLCBmaWVsZE5hbWUpKSB7XG4gICAgICAgIGNvbnN0IHJlbE1vZGVsTmFtZSA9IFIucGF0aChcbiAgICAgICAgICBbJ3R5cGUnLCAndGFyZ2V0J10sXG4gICAgICAgICAgdGhpcy5zY2hlbWEuZ2V0RmllbGQobW9kZWxOYW1lLCBmaWVsZE5hbWUpXG4gICAgICAgICkgYXMgc3RyaW5nXG4gICAgICAgIGNvbnN0IHRleHQgPSB0aGlzLnNjaGVtYS5nZXREaXNwbGF5VmFsdWUoe1xuICAgICAgICAgIG1vZGVsTmFtZTogcmVsTW9kZWxOYW1lLFxuICAgICAgICAgIG5vZGU6IHZhbHVlXG4gICAgICAgIH0pXG4gICAgICAgIGNvbnN0IGdldElkOiAodmFsdWU6IGFueSkgPT4gc3RyaW5nID0gUi5wcm9wKCdpZCcpXG4gICAgICAgIHRvb2x0aXBEYXRhLnB1c2goe1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgdmFsdWU6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dCxcbiAgICAgICAgICAgICAgdXJsOiBgLyR7cmVsTW9kZWxOYW1lfS8ke2dldElkKHZhbHVlKX1gXG4gICAgICAgICAgICB9XG4gICAgICAgICAgXVxuICAgICAgICB9KVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG9vbHRpcERhdGEucHVzaCh7XG4gICAgICAgICAgbmFtZSxcbiAgICAgICAgICB2YWx1ZTogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiB2YWx1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gUi5hc3NvY1BhdGgoW21vZGVsTmFtZSwgaWQudG9TdHJpbmcoKV0sIHRvb2x0aXBEYXRhLCBzdGF0ZSlcbiAgfVxufVxuIl19