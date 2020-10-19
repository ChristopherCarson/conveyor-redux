import "core-js/modules/es.array.iterator";
import "core-js/modules/es.date.to-string";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/web.dom-collections.iterator";
import _Reflect$construct from "@babel/runtime-corejs3/core-js-stable/reflect/construct";
import _assocPath from "ramda/src/assocPath";
import _without from "ramda/src/without";
import _dissoc from "ramda/src/dissoc";
import _valuesInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/values";
import _prop from "ramda/src/prop";
import _propOr from "ramda/src/propOr";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import _Object$assign from "@babel/runtime-corejs3/core-js-stable/object/assign";
import _path from "ramda/src/path";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _inherits from "@babel/runtime-corejs3/helpers/esm/inherits";
import _possibleConstructorReturn from "@babel/runtime-corejs3/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime-corejs3/helpers/esm/getPrototypeOf";

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = _Reflect$construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !_Reflect$construct) return false; if (_Reflect$construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(_Reflect$construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import { UPDATE_MODEL_INDEX, UPDATE_MODEL_DETAIL, UPDATE_DELETE_MODEL, REMOVE_INSTANCE, MODEL_NOT_FOUND } from '../actionConsts';
import { initState, updateIndex, getDefaultModelStore } from '../utils/model';
import { Reducer } from './reducer';
export var ModelReducer = /*#__PURE__*/function (_Reducer) {
  _inherits(ModelReducer, _Reducer);

  var _super = _createSuper(ModelReducer);

  function ModelReducer(schema) {
    _classCallCheck(this, ModelReducer);

    return _super.call(this, schema, initState);
  }

  _createClass(ModelReducer, [{
    key: MODEL_NOT_FOUND,
    value: function value(state, action) {
      var modelName = _path(['payload', 'modelName'], action);

      return _Object$assign({}, state, _defineProperty({}, modelName, 'NOTFOUND'));
    }
  }, {
    key: UPDATE_MODEL_INDEX,
    value: function value(state, action) {
      var modelName = _path(['payload', 'modelName'], action); // @ts-ignore


      var data = _path(['payload', 'data', 'result'], action);

      return updateIndex(state, modelName, data);
    }
  }, {
    key: UPDATE_MODEL_DETAIL,
    value: function value(state, action) {
      var modelName = _path(['payload', 'modelName'], action); // @ts-ignore


      var id = _path(['payload', 'id'], action);

      var store = _Object$assign({}, _propOr(getDefaultModelStore(), modelName, state));

      var oldNode = _prop(id, _valuesInstanceProperty(store));

      var newNode = _path(['payload', 'data', 'result'], action);

      if (!oldNode) {
        store.order.push(id);
      }

      _valuesInstanceProperty(store)[id] = newNode;
      return _Object$assign({}, state, _defineProperty({}, modelName, store));
    }
  }, {
    key: UPDATE_DELETE_MODEL,
    value: function value(state, action) {
      var modelName = _path(['payload', 'modelName'], action);

      var id = _path(['payload', 'id'], action);

      var store = _Object$assign({}, _propOr(getDefaultModelStore(), modelName, state));

      store.values = _dissoc(id, _valuesInstanceProperty(store));
      store.order = _without([id], store.order);
      return _Object$assign({}, state, _defineProperty({}, modelName, store));
    }
  }, {
    key: REMOVE_INSTANCE,
    value: function value(state, action) {
      var modelName = _path(['payload', 'modelName'], action);

      var id = _path(['payload', 'id'], action);

      return _assocPath([modelName, 'values', id.toString()], {
        result: null
      }, state);
    }
  }]);

  return ModelReducer;
}(Reducer);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9tb2RlbC50cyJdLCJuYW1lcyI6WyJVUERBVEVfTU9ERUxfSU5ERVgiLCJVUERBVEVfTU9ERUxfREVUQUlMIiwiVVBEQVRFX0RFTEVURV9NT0RFTCIsIlJFTU9WRV9JTlNUQU5DRSIsIk1PREVMX05PVF9GT1VORCIsImluaXRTdGF0ZSIsInVwZGF0ZUluZGV4IiwiZ2V0RGVmYXVsdE1vZGVsU3RvcmUiLCJSZWR1Y2VyIiwiTW9kZWxSZWR1Y2VyIiwic2NoZW1hIiwic3RhdGUiLCJhY3Rpb24iLCJtb2RlbE5hbWUiLCJkYXRhIiwiaWQiLCJzdG9yZSIsIm9sZE5vZGUiLCJuZXdOb2RlIiwib3JkZXIiLCJwdXNoIiwidmFsdWVzIiwidG9TdHJpbmciLCJyZXN1bHQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxTQUNFQSxrQkFERixFQUVFQyxtQkFGRixFQUdFQyxtQkFIRixFQUlFQyxlQUpGLEVBS0VDLGVBTEYsUUFNTyxpQkFOUDtBQU9BLFNBQVNDLFNBQVQsRUFBb0JDLFdBQXBCLEVBQWlDQyxvQkFBakMsUUFBNkQsZ0JBQTdEO0FBRUEsU0FBU0MsT0FBVCxRQUF3QixXQUF4QjtBQUVBLFdBQWFDLFlBQWI7QUFBQTs7QUFBQTs7QUFDRSx3QkFBWUMsTUFBWixFQUFtQztBQUFBOztBQUFBLDZCQUMzQkEsTUFEMkIsRUFDbkJMLFNBRG1CO0FBRWxDOztBQUhIO0FBQUEsU0FLR0QsZUFMSDtBQUFBLDBCQUtvQk8sS0FMcEIsRUFLZ0NDLE1BTGhDLEVBSzZDO0FBQ3pDLFVBQU1DLFNBQVMsR0FBRyxNQUFPLENBQUMsU0FBRCxFQUFZLFdBQVosQ0FBUCxFQUFpQ0QsTUFBakMsQ0FBbEI7O0FBQ0EsZ0NBQVlELEtBQVosc0JBQW9CRSxTQUFwQixFQUFnQyxVQUFoQztBQUNEO0FBUkg7QUFBQSxTQVVHYixrQkFWSDtBQUFBLDBCQVV1QlcsS0FWdkIsRUFVbUNDLE1BVm5DLEVBVWdEO0FBQzVDLFVBQU1DLFNBQVMsR0FBRyxNQUFPLENBQUMsU0FBRCxFQUFZLFdBQVosQ0FBUCxFQUFpQ0QsTUFBakMsQ0FBbEIsQ0FENEMsQ0FFNUM7OztBQUNBLFVBQU1FLElBQUksR0FBRyxNQUFPLENBQUMsU0FBRCxFQUFZLE1BQVosRUFBb0IsUUFBcEIsQ0FBUCxFQUFzQ0YsTUFBdEMsQ0FBYjs7QUFDQSxhQUFPTixXQUFXLENBQUNLLEtBQUQsRUFBUUUsU0FBUixFQUFtQkMsSUFBbkIsQ0FBbEI7QUFDRDtBQWZIO0FBQUEsU0FpQkdiLG1CQWpCSDtBQUFBLDBCQWlCd0JVLEtBakJ4QixFQWlCb0NDLE1BakJwQyxFQWlCaUQ7QUFDN0MsVUFBTUMsU0FBUyxHQUFHLE1BQU8sQ0FBQyxTQUFELEVBQVksV0FBWixDQUFQLEVBQWlDRCxNQUFqQyxDQUFsQixDQUQ2QyxDQUU3Qzs7O0FBQ0EsVUFBTUcsRUFBRSxHQUFHLE1BQU8sQ0FBQyxTQUFELEVBQVksSUFBWixDQUFQLEVBQTBCSCxNQUExQixDQUFYOztBQUNBLFVBQU1JLEtBQUssc0JBQ0wsUUFBU1Qsb0JBQW9CLEVBQTdCLEVBQWlDTSxTQUFqQyxFQUE0Q0YsS0FBNUMsQ0FESyxDQUFYOztBQUdBLFVBQU1NLE9BQU8sR0FBRyxNQUFPRixFQUFQLDBCQUFXQyxLQUFYLEVBQWhCOztBQUNBLFVBQU1FLE9BQU8sR0FBRyxNQUFPLENBQUMsU0FBRCxFQUFZLE1BQVosRUFBb0IsUUFBcEIsQ0FBUCxFQUFzQ04sTUFBdEMsQ0FBaEI7O0FBRUEsVUFBSSxDQUFDSyxPQUFMLEVBQWM7QUFDWkQsUUFBQUEsS0FBSyxDQUFDRyxLQUFOLENBQVlDLElBQVosQ0FBaUJMLEVBQWpCO0FBQ0Q7O0FBQ0QsOEJBQUFDLEtBQUssRUFBUUQsRUFBUixDQUFMLEdBQW1CRyxPQUFuQjtBQUVBLGdDQUFZUCxLQUFaLHNCQUFvQkUsU0FBcEIsRUFBZ0NHLEtBQWhDO0FBQ0Q7QUFqQ0g7QUFBQSxTQW1DR2QsbUJBbkNIO0FBQUEsMEJBbUN3QlMsS0FuQ3hCLEVBbUNvQ0MsTUFuQ3BDLEVBbUNpRDtBQUM3QyxVQUFNQyxTQUFTLEdBQUcsTUFBTyxDQUFDLFNBQUQsRUFBWSxXQUFaLENBQVAsRUFBaUNELE1BQWpDLENBQWxCOztBQUNBLFVBQU1HLEVBQUUsR0FBRyxNQUFPLENBQUMsU0FBRCxFQUFZLElBQVosQ0FBUCxFQUEwQkgsTUFBMUIsQ0FBWDs7QUFDQSxVQUFNSSxLQUFLLHNCQUNMLFFBQVNULG9CQUFvQixFQUE3QixFQUFpQ00sU0FBakMsRUFBNENGLEtBQTVDLENBREssQ0FBWDs7QUFHQUssTUFBQUEsS0FBSyxDQUFDSyxNQUFOLEdBQWUsUUFBU04sRUFBVCwwQkFBYUMsS0FBYixFQUFmO0FBQ0FBLE1BQUFBLEtBQUssQ0FBQ0csS0FBTixHQUFjLFNBQVUsQ0FBQ0osRUFBRCxDQUFWLEVBQWdCQyxLQUFLLENBQUNHLEtBQXRCLENBQWQ7QUFDQSxnQ0FBWVIsS0FBWixzQkFBb0JFLFNBQXBCLEVBQWdDRyxLQUFoQztBQUNEO0FBNUNIO0FBQUEsU0E4Q0diLGVBOUNIO0FBQUEsMEJBOENvQlEsS0E5Q3BCLEVBOENnQ0MsTUE5Q2hDLEVBOEM2QztBQUN6QyxVQUFNQyxTQUFTLEdBQUcsTUFBTyxDQUFDLFNBQUQsRUFBWSxXQUFaLENBQVAsRUFBaUNELE1BQWpDLENBQWxCOztBQUNBLFVBQU1HLEVBQUUsR0FBRyxNQUFPLENBQUMsU0FBRCxFQUFZLElBQVosQ0FBUCxFQUEwQkgsTUFBMUIsQ0FBWDs7QUFDQSxhQUFPLFdBQ0wsQ0FBQ0MsU0FBRCxFQUFZLFFBQVosRUFBc0JFLEVBQUUsQ0FBQ08sUUFBSCxFQUF0QixDQURLLEVBRUw7QUFBRUMsUUFBQUEsTUFBTSxFQUFFO0FBQVYsT0FGSyxFQUdMWixLQUhLLENBQVA7QUFLRDtBQXRESDs7QUFBQTtBQUFBLEVBQWtDSCxPQUFsQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFIgZnJvbSAncmFtZGEnXG5pbXBvcnQge1xuICBVUERBVEVfTU9ERUxfSU5ERVgsXG4gIFVQREFURV9NT0RFTF9ERVRBSUwsXG4gIFVQREFURV9ERUxFVEVfTU9ERUwsXG4gIFJFTU9WRV9JTlNUQU5DRSxcbiAgTU9ERUxfTk9UX0ZPVU5EXG59IGZyb20gJy4uL2FjdGlvbkNvbnN0cydcbmltcG9ydCB7IGluaXRTdGF0ZSwgdXBkYXRlSW5kZXgsIGdldERlZmF1bHRNb2RlbFN0b3JlIH0gZnJvbSAnLi4vdXRpbHMvbW9kZWwnXG5pbXBvcnQgeyBTY2hlbWFCdWlsZGVyIH0gZnJvbSAnQGF1dG9pbnZlbnQvY29udmV5b3Itc2NoZW1hJ1xuaW1wb3J0IHsgUmVkdWNlciB9IGZyb20gJy4vcmVkdWNlcidcblxuZXhwb3J0IGNsYXNzIE1vZGVsUmVkdWNlciBleHRlbmRzIFJlZHVjZXIge1xuICBjb25zdHJ1Y3RvcihzY2hlbWE6IFNjaGVtYUJ1aWxkZXIpIHtcbiAgICBzdXBlcihzY2hlbWEsIGluaXRTdGF0ZSlcbiAgfVxuXG4gIFtNT0RFTF9OT1RfRk9VTkRdKHN0YXRlOiBhbnksIGFjdGlvbjogYW55KSB7XG4gICAgY29uc3QgbW9kZWxOYW1lID0gUi5wYXRoKFsncGF5bG9hZCcsICdtb2RlbE5hbWUnXSwgYWN0aW9uKSBhcyBzdHJpbmdcbiAgICByZXR1cm4geyAuLi5zdGF0ZSwgW21vZGVsTmFtZV06ICdOT1RGT1VORCcgfVxuICB9XG5cbiAgW1VQREFURV9NT0RFTF9JTkRFWF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBtb2RlbE5hbWUgPSBSLnBhdGgoWydwYXlsb2FkJywgJ21vZGVsTmFtZSddLCBhY3Rpb24pIGFzIHN0cmluZ1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBkYXRhID0gUi5wYXRoKFsncGF5bG9hZCcsICdkYXRhJywgJ3Jlc3VsdCddLCBhY3Rpb24pXG4gICAgcmV0dXJuIHVwZGF0ZUluZGV4KHN0YXRlLCBtb2RlbE5hbWUsIGRhdGEpXG4gIH1cblxuICBbVVBEQVRFX01PREVMX0RFVEFJTF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBtb2RlbE5hbWUgPSBSLnBhdGgoWydwYXlsb2FkJywgJ21vZGVsTmFtZSddLCBhY3Rpb24pIGFzIHN0cmluZ1xuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBjb25zdCBpZCA9IFIucGF0aChbJ3BheWxvYWQnLCAnaWQnXSwgYWN0aW9uKSBhcyBzdHJpbmdcbiAgICBjb25zdCBzdG9yZSA9IHtcbiAgICAgIC4uLihSLnByb3BPcihnZXREZWZhdWx0TW9kZWxTdG9yZSgpLCBtb2RlbE5hbWUsIHN0YXRlKSBhcyBvYmplY3QpXG4gICAgfSBhcyBhbnlcbiAgICBjb25zdCBvbGROb2RlID0gUi5wcm9wKGlkLCBzdG9yZS52YWx1ZXMpXG4gICAgY29uc3QgbmV3Tm9kZSA9IFIucGF0aChbJ3BheWxvYWQnLCAnZGF0YScsICdyZXN1bHQnXSwgYWN0aW9uKVxuXG4gICAgaWYgKCFvbGROb2RlKSB7XG4gICAgICBzdG9yZS5vcmRlci5wdXNoKGlkKVxuICAgIH1cbiAgICBzdG9yZS52YWx1ZXNbaWRdID0gbmV3Tm9kZVxuXG4gICAgcmV0dXJuIHsgLi4uc3RhdGUsIFttb2RlbE5hbWVdOiBzdG9yZSB9XG4gIH1cblxuICBbVVBEQVRFX0RFTEVURV9NT0RFTF0oc3RhdGU6IGFueSwgYWN0aW9uOiBhbnkpIHtcbiAgICBjb25zdCBtb2RlbE5hbWUgPSBSLnBhdGgoWydwYXlsb2FkJywgJ21vZGVsTmFtZSddLCBhY3Rpb24pIGFzIHN0cmluZ1xuICAgIGNvbnN0IGlkID0gUi5wYXRoKFsncGF5bG9hZCcsICdpZCddLCBhY3Rpb24pIGFzIHN0cmluZ1xuICAgIGNvbnN0IHN0b3JlID0ge1xuICAgICAgLi4uKFIucHJvcE9yKGdldERlZmF1bHRNb2RlbFN0b3JlKCksIG1vZGVsTmFtZSwgc3RhdGUpIGFzIG9iamVjdClcbiAgICB9IGFzIGFueVxuICAgIHN0b3JlLnZhbHVlcyA9IFIuZGlzc29jKGlkLCBzdG9yZS52YWx1ZXMpXG4gICAgc3RvcmUub3JkZXIgPSBSLndpdGhvdXQoW2lkXSwgc3RvcmUub3JkZXIpXG4gICAgcmV0dXJuIHsgLi4uc3RhdGUsIFttb2RlbE5hbWVdOiBzdG9yZSB9XG4gIH1cblxuICBbUkVNT1ZFX0lOU1RBTkNFXShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGNvbnN0IG1vZGVsTmFtZSA9IFIucGF0aChbJ3BheWxvYWQnLCAnbW9kZWxOYW1lJ10sIGFjdGlvbikgYXMgc3RyaW5nXG4gICAgY29uc3QgaWQgPSBSLnBhdGgoWydwYXlsb2FkJywgJ2lkJ10sIGFjdGlvbikgYXMgc3RyaW5nXG4gICAgcmV0dXJuIFIuYXNzb2NQYXRoKFxuICAgICAgW21vZGVsTmFtZSwgJ3ZhbHVlcycsIGlkLnRvU3RyaW5nKCldLFxuICAgICAgeyByZXN1bHQ6IG51bGwgfSxcbiAgICAgIHN0YXRlXG4gICAgKVxuICB9XG59XG4iXX0=