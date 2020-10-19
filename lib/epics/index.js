import _prop from "ramda/src/prop";
import _mapInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/map";
import _map from "ramda/src/map";
import _flatten from "ramda/src/flatten";
import _concatInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/concat";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/esm/toConsumableArray";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
import { combineEpics } from 'redux-observable';
import { catchError } from 'rxjs/operators';
import { AlertEpic } from './alert';
import { ModelEpic } from './model';
import { OptionsEpic } from './options';
import { RouteEpic } from './route';
import { SearchEpic } from './search';
import { IndexTableEpic } from './indexTable';
import { TooltipEpic } from './tooltip';
import { EditEpic } from './edit';
import { ValidationEpic } from './validation';
import { CreateEpic } from './create';
import { ModalEpic } from './modal';
import * as Actions from '../actions';
import * as Logger from '../utils/Logger';
var conveyorEpics = [AlertEpic, CreateEpic, EditEpic, IndexTableEpic, ModalEpic, ModelEpic, OptionsEpic, RouteEpic, SearchEpic, TooltipEpic, ValidationEpic];
export var ConveyorEpic = /*#__PURE__*/function () {
  function ConveyorEpic(schema, queryBuilder) {
    _classCallCheck(this, ConveyorEpic);

    _defineProperty(this, "schema", void 0);

    _defineProperty(this, "queryBuilder", void 0);

    this.schema = schema;
    this.queryBuilder = queryBuilder;
  }

  _createClass(ConveyorEpic, [{
    key: "makeEpic",
    value: function makeEpic(store) {
      var _context,
          _this = this;

      return combineEpicsAndCatchErrors.apply(void 0, _concatInstanceProperty(_context = [store]).call(_context, _toConsumableArray(_flatten(_map(function (Epic) {
        return new Epic(_this.schema, _this.queryBuilder).makeEpic();
      }, conveyorEpics)))));
    }
  }]);

  return ConveyorEpic;
}();
/**
 * Combine epics together and catch any errors when creating the root epic.
 * If there are any errors it will log it and add the error to the store.
 * credit: https://github.com/redux-observable/redux-observable/issues/94#issuecomment-396763936
 * @param store - the store of the application
 * @param epics - an object containing all the epics to be combined
 * @return The combined epics
 */

export var combineEpicsAndCatchErrors = function combineEpicsAndCatchErrors(store) {
  for (var _len = arguments.length, epics = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    epics[_key - 1] = arguments[_key];
  }

  return function (action$, state$, dep) {
    epics = _mapInstanceProperty(epics).call(epics, function (epic) {
      return function (action$, state$) {
        return epic(action$, state$, dep).pipe(catchError(function (error, caught) {
          var epicName = _prop('name', epic);

          Logger.rootEpicError(epicName, error);
          store.dispatch(Actions.addDangerAlert({
            message: "An error has occurred in the ".concat(epicName, ".")
          }));
          return caught;
        }));
      };
    });
    return combineEpics.apply(void 0, _toConsumableArray(epics))(action$, state$);
  };
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy9pbmRleC50cyJdLCJuYW1lcyI6WyJjb21iaW5lRXBpY3MiLCJjYXRjaEVycm9yIiwiQWxlcnRFcGljIiwiTW9kZWxFcGljIiwiT3B0aW9uc0VwaWMiLCJSb3V0ZUVwaWMiLCJTZWFyY2hFcGljIiwiSW5kZXhUYWJsZUVwaWMiLCJUb29sdGlwRXBpYyIsIkVkaXRFcGljIiwiVmFsaWRhdGlvbkVwaWMiLCJDcmVhdGVFcGljIiwiTW9kYWxFcGljIiwiQWN0aW9ucyIsIkxvZ2dlciIsImNvbnZleW9yRXBpY3MiLCJDb252ZXlvckVwaWMiLCJzY2hlbWEiLCJxdWVyeUJ1aWxkZXIiLCJzdG9yZSIsImNvbWJpbmVFcGljc0FuZENhdGNoRXJyb3JzIiwiRXBpYyIsIm1ha2VFcGljIiwiZXBpY3MiLCJhY3Rpb24kIiwic3RhdGUkIiwiZGVwIiwiZXBpYyIsInBpcGUiLCJlcnJvciIsImNhdWdodCIsImVwaWNOYW1lIiwicm9vdEVwaWNFcnJvciIsImRpc3BhdGNoIiwiYWRkRGFuZ2VyQWxlcnQiLCJtZXNzYWdlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxTQUFTQSxZQUFULFFBQTZCLGtCQUE3QjtBQUNBLFNBQVNDLFVBQVQsUUFBMkIsZ0JBQTNCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixTQUExQjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsU0FBMUI7QUFDQSxTQUFTQyxXQUFULFFBQTRCLFdBQTVCO0FBQ0EsU0FBU0MsU0FBVCxRQUEwQixTQUExQjtBQUNBLFNBQVNDLFVBQVQsUUFBMkIsVUFBM0I7QUFDQSxTQUFTQyxjQUFULFFBQStCLGNBQS9CO0FBQ0EsU0FBU0MsV0FBVCxRQUE0QixXQUE1QjtBQUNBLFNBQVNDLFFBQVQsUUFBeUIsUUFBekI7QUFDQSxTQUFTQyxjQUFULFFBQStCLGNBQS9CO0FBQ0EsU0FBU0MsVUFBVCxRQUEyQixVQUEzQjtBQUNBLFNBQVNDLFNBQVQsUUFBMEIsU0FBMUI7QUFFQSxPQUFPLEtBQUtDLE9BQVosTUFBeUIsWUFBekI7QUFDQSxPQUFPLEtBQUtDLE1BQVosTUFBd0IsaUJBQXhCO0FBR0EsSUFBTUMsYUFBYSxHQUFHLENBQ3BCYixTQURvQixFQUVwQlMsVUFGb0IsRUFHcEJGLFFBSG9CLEVBSXBCRixjQUpvQixFQUtwQkssU0FMb0IsRUFNcEJULFNBTm9CLEVBT3BCQyxXQVBvQixFQVFwQkMsU0FSb0IsRUFTcEJDLFVBVG9CLEVBVXBCRSxXQVZvQixFQVdwQkUsY0FYb0IsQ0FBdEI7QUFjQSxXQUFhTSxZQUFiO0FBSUUsd0JBQVlDLE1BQVosRUFBbUNDLFlBQW5DLEVBQStEO0FBQUE7O0FBQUE7O0FBQUE7O0FBQzdELFNBQUtELE1BQUwsR0FBY0EsTUFBZDtBQUNBLFNBQUtDLFlBQUwsR0FBb0JBLFlBQXBCO0FBQ0Q7O0FBUEg7QUFBQTtBQUFBLDZCQVNXQyxLQVRYLEVBU3VCO0FBQUE7QUFBQTs7QUFDbkIsYUFBT0MsMEJBQTBCLE1BQTFCLDZDQUNMRCxLQURLLHFDQUVGLFNBQ0QsS0FDRSxVQUFBRSxJQUFJO0FBQUEsZUFBSSxJQUFJQSxJQUFKLENBQVMsS0FBSSxDQUFDSixNQUFkLEVBQXNCLEtBQUksQ0FBQ0MsWUFBM0IsRUFBeUNJLFFBQXpDLEVBQUo7QUFBQSxPQUROLEVBRUVQLGFBRkYsQ0FEQyxDQUZFLEdBQVA7QUFTRDtBQW5CSDs7QUFBQTtBQUFBO0FBc0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsT0FBTyxJQUFNSywwQkFBMEIsR0FBRyxTQUE3QkEsMEJBQTZCLENBQUNELEtBQUQ7QUFBQSxvQ0FBZ0JJLEtBQWhCO0FBQWdCQSxJQUFBQSxLQUFoQjtBQUFBOztBQUFBLFNBQStCLFVBQ3ZFQyxPQUR1RSxFQUV2RUMsTUFGdUUsRUFHdkVDLEdBSHVFLEVBSXBFO0FBQ0hILElBQUFBLEtBQUssR0FBRyxxQkFBQUEsS0FBSyxNQUFMLENBQUFBLEtBQUssRUFBSyxVQUFDSSxJQUFEO0FBQUEsYUFBZSxVQUFDSCxPQUFELEVBQWVDLE1BQWY7QUFBQSxlQUMvQkUsSUFBSSxDQUFDSCxPQUFELEVBQVVDLE1BQVYsRUFBa0JDLEdBQWxCLENBQUosQ0FBMkJFLElBQTNCLENBQ0UzQixVQUFVLENBQUMsVUFBQzRCLEtBQUQsRUFBUUMsTUFBUixFQUFtQjtBQUM1QixjQUFNQyxRQUFRLEdBQUcsTUFBTyxNQUFQLEVBQWVKLElBQWYsQ0FBakI7O0FBQ0FiLFVBQUFBLE1BQU0sQ0FBQ2tCLGFBQVAsQ0FBcUJELFFBQXJCLEVBQStCRixLQUEvQjtBQUNBVixVQUFBQSxLQUFLLENBQUNjLFFBQU4sQ0FDRXBCLE9BQU8sQ0FBQ3FCLGNBQVIsQ0FBdUI7QUFDckJDLFlBQUFBLE9BQU8seUNBQWtDSixRQUFsQztBQURjLFdBQXZCLENBREY7QUFLQSxpQkFBT0QsTUFBUDtBQUNELFNBVFMsQ0FEWixDQUQrQjtBQUFBLE9BQWY7QUFBQSxLQUFMLENBQWI7QUFjQSxXQUFPOUIsWUFBWSxNQUFaLDRCQUFnQnVCLEtBQWhCLEdBQXVCQyxPQUF2QixFQUFnQ0MsTUFBaEMsQ0FBUDtBQUNELEdBcEJ5QztBQUFBLENBQW5DIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tYmluZUVwaWNzIH0gZnJvbSAncmVkdXgtb2JzZXJ2YWJsZSdcbmltcG9ydCB7IGNhdGNoRXJyb3IgfSBmcm9tICdyeGpzL29wZXJhdG9ycydcbmltcG9ydCB7IEFsZXJ0RXBpYyB9IGZyb20gJy4vYWxlcnQnXG5pbXBvcnQgeyBNb2RlbEVwaWMgfSBmcm9tICcuL21vZGVsJ1xuaW1wb3J0IHsgT3B0aW9uc0VwaWMgfSBmcm9tICcuL29wdGlvbnMnXG5pbXBvcnQgeyBSb3V0ZUVwaWMgfSBmcm9tICcuL3JvdXRlJ1xuaW1wb3J0IHsgU2VhcmNoRXBpYyB9IGZyb20gJy4vc2VhcmNoJ1xuaW1wb3J0IHsgSW5kZXhUYWJsZUVwaWMgfSBmcm9tICcuL2luZGV4VGFibGUnXG5pbXBvcnQgeyBUb29sdGlwRXBpYyB9IGZyb20gJy4vdG9vbHRpcCdcbmltcG9ydCB7IEVkaXRFcGljIH0gZnJvbSAnLi9lZGl0J1xuaW1wb3J0IHsgVmFsaWRhdGlvbkVwaWMgfSBmcm9tICcuL3ZhbGlkYXRpb24nXG5pbXBvcnQgeyBDcmVhdGVFcGljIH0gZnJvbSAnLi9jcmVhdGUnXG5pbXBvcnQgeyBNb2RhbEVwaWMgfSBmcm9tICcuL21vZGFsJ1xuaW1wb3J0IHsgU2NoZW1hQnVpbGRlciB9IGZyb20gJ0BhdXRvaW52ZW50L2NvbnZleW9yLXNjaGVtYSdcbmltcG9ydCAqIGFzIEFjdGlvbnMgZnJvbSAnLi4vYWN0aW9ucydcbmltcG9ydCAqIGFzIExvZ2dlciBmcm9tICcuLi91dGlscy9Mb2dnZXInXG5pbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuXG5jb25zdCBjb252ZXlvckVwaWNzID0gW1xuICBBbGVydEVwaWMsXG4gIENyZWF0ZUVwaWMsXG4gIEVkaXRFcGljLFxuICBJbmRleFRhYmxlRXBpYyxcbiAgTW9kYWxFcGljLFxuICBNb2RlbEVwaWMsXG4gIE9wdGlvbnNFcGljLFxuICBSb3V0ZUVwaWMsXG4gIFNlYXJjaEVwaWMsXG4gIFRvb2x0aXBFcGljLFxuICBWYWxpZGF0aW9uRXBpY1xuXVxuXG5leHBvcnQgY2xhc3MgQ29udmV5b3JFcGljIHtcbiAgc2NoZW1hOiBTY2hlbWFCdWlsZGVyXG4gIHF1ZXJ5QnVpbGRlcjogUXVlcnlCdWlsZGVyXG5cbiAgY29uc3RydWN0b3Ioc2NoZW1hOiBTY2hlbWFCdWlsZGVyLCBxdWVyeUJ1aWxkZXI6IFF1ZXJ5QnVpbGRlcikge1xuICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hXG4gICAgdGhpcy5xdWVyeUJ1aWxkZXIgPSBxdWVyeUJ1aWxkZXJcbiAgfVxuXG4gIG1ha2VFcGljKHN0b3JlOiBhbnkpIHtcbiAgICByZXR1cm4gY29tYmluZUVwaWNzQW5kQ2F0Y2hFcnJvcnMoXG4gICAgICBzdG9yZSxcbiAgICAgIC4uLlIuZmxhdHRlbihcbiAgICAgICAgUi5tYXAoXG4gICAgICAgICAgRXBpYyA9PiBuZXcgRXBpYyh0aGlzLnNjaGVtYSwgdGhpcy5xdWVyeUJ1aWxkZXIpLm1ha2VFcGljKCksXG4gICAgICAgICAgY29udmV5b3JFcGljc1xuICAgICAgICApXG4gICAgICApXG4gICAgKVxuICB9XG59XG5cbi8qKlxuICogQ29tYmluZSBlcGljcyB0b2dldGhlciBhbmQgY2F0Y2ggYW55IGVycm9ycyB3aGVuIGNyZWF0aW5nIHRoZSByb290IGVwaWMuXG4gKiBJZiB0aGVyZSBhcmUgYW55IGVycm9ycyBpdCB3aWxsIGxvZyBpdCBhbmQgYWRkIHRoZSBlcnJvciB0byB0aGUgc3RvcmUuXG4gKiBjcmVkaXQ6IGh0dHBzOi8vZ2l0aHViLmNvbS9yZWR1eC1vYnNlcnZhYmxlL3JlZHV4LW9ic2VydmFibGUvaXNzdWVzLzk0I2lzc3VlY29tbWVudC0zOTY3NjM5MzZcbiAqIEBwYXJhbSBzdG9yZSAtIHRoZSBzdG9yZSBvZiB0aGUgYXBwbGljYXRpb25cbiAqIEBwYXJhbSBlcGljcyAtIGFuIG9iamVjdCBjb250YWluaW5nIGFsbCB0aGUgZXBpY3MgdG8gYmUgY29tYmluZWRcbiAqIEByZXR1cm4gVGhlIGNvbWJpbmVkIGVwaWNzXG4gKi9cbmV4cG9ydCBjb25zdCBjb21iaW5lRXBpY3NBbmRDYXRjaEVycm9ycyA9IChzdG9yZTogYW55LCAuLi5lcGljczogYW55KSA9PiAoXG4gIGFjdGlvbiQ6IGFueSxcbiAgc3RhdGUkOiBhbnksXG4gIGRlcDogYW55XG4pID0+IHtcbiAgZXBpY3MgPSBlcGljcy5tYXAoKGVwaWM6IGFueSkgPT4gKGFjdGlvbiQ6IGFueSwgc3RhdGUkOiBhbnkpID0+XG4gICAgZXBpYyhhY3Rpb24kLCBzdGF0ZSQsIGRlcCkucGlwZShcbiAgICAgIGNhdGNoRXJyb3IoKGVycm9yLCBjYXVnaHQpID0+IHtcbiAgICAgICAgY29uc3QgZXBpY05hbWUgPSBSLnByb3AoJ25hbWUnLCBlcGljKVxuICAgICAgICBMb2dnZXIucm9vdEVwaWNFcnJvcihlcGljTmFtZSwgZXJyb3IpXG4gICAgICAgIHN0b3JlLmRpc3BhdGNoKFxuICAgICAgICAgIEFjdGlvbnMuYWRkRGFuZ2VyQWxlcnQoe1xuICAgICAgICAgICAgbWVzc2FnZTogYEFuIGVycm9yIGhhcyBvY2N1cnJlZCBpbiB0aGUgJHtlcGljTmFtZX0uYFxuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgcmV0dXJuIGNhdWdodFxuICAgICAgfSlcbiAgICApXG4gIClcbiAgcmV0dXJuIGNvbWJpbmVFcGljcyguLi5lcGljcykoYWN0aW9uJCwgc3RhdGUkKVxufVxuIl19