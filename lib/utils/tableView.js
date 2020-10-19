import _path from "ramda/src/path";
import _assocPath from "ramda/src/assocPath";
import _prop from "ramda/src/prop";
import _dissocPath from "ramda/src/dissocPath";
// todo: user should be able to specify this number when instantiating conveyor-redux reducer classes
export var DEFAULT_PAGINATION_AMT = 20;
export var initState = {};
export var removeAll = function removeAll(state, modelName) {
  return _dissocPath([modelName, 'filter', 'filterOrder'], _dissocPath([modelName, 'filter', 'filterValue'], state));
};
export var setValues = function setValues(state, payload, type) {
  var modelName = _prop('modelName', payload);

  var values = _prop('values', payload);

  return _assocPath([modelName, type], values, state);
};
export var selectTableView = function selectTableView(state) {
  return _path(['conveyor', 'tableView'], state);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy90YWJsZVZpZXcudHMiXSwibmFtZXMiOlsiREVGQVVMVF9QQUdJTkFUSU9OX0FNVCIsImluaXRTdGF0ZSIsInJlbW92ZUFsbCIsInN0YXRlIiwibW9kZWxOYW1lIiwic2V0VmFsdWVzIiwicGF5bG9hZCIsInR5cGUiLCJ2YWx1ZXMiLCJzZWxlY3RUYWJsZVZpZXciXSwibWFwcGluZ3MiOiI7Ozs7QUFFQTtBQUNBLE9BQU8sSUFBTUEsc0JBQXNCLEdBQUcsRUFBL0I7QUFFUCxPQUFPLElBQU1DLFNBQVMsR0FBRyxFQUFsQjtBQUVQLE9BQU8sSUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0MsS0FBRCxFQUFhQyxTQUFiLEVBQW1DO0FBQzFELFNBQU8sWUFDTCxDQUFDQSxTQUFELEVBQVksUUFBWixFQUFzQixhQUF0QixDQURLLEVBRUwsWUFBYSxDQUFDQSxTQUFELEVBQVksUUFBWixFQUFzQixhQUF0QixDQUFiLEVBQW1ERCxLQUFuRCxDQUZLLENBQVA7QUFJRCxDQUxNO0FBT1AsT0FBTyxJQUFNRSxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDRixLQUFELEVBQWFHLE9BQWIsRUFBMkJDLElBQTNCLEVBQTRDO0FBQ25FLE1BQU1ILFNBQVMsR0FBRyxNQUFPLFdBQVAsRUFBb0JFLE9BQXBCLENBQWxCOztBQUNBLE1BQU1FLE1BQU0sR0FBRyxNQUFPLFFBQVAsRUFBaUJGLE9BQWpCLENBQWY7O0FBQ0EsU0FBTyxXQUFZLENBQUNGLFNBQUQsRUFBWUcsSUFBWixDQUFaLEVBQStCQyxNQUEvQixFQUF1Q0wsS0FBdkMsQ0FBUDtBQUNELENBSk07QUFNUCxPQUFPLElBQU1NLGVBQWUsR0FBRyxTQUFsQkEsZUFBa0IsQ0FBQ04sS0FBRDtBQUFBLFNBQzdCLE1BQU8sQ0FBQyxVQUFELEVBQWEsV0FBYixDQUFQLEVBQWtDQSxLQUFsQyxDQUQ2QjtBQUFBLENBQXhCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSdcblxuLy8gdG9kbzogdXNlciBzaG91bGQgYmUgYWJsZSB0byBzcGVjaWZ5IHRoaXMgbnVtYmVyIHdoZW4gaW5zdGFudGlhdGluZyBjb252ZXlvci1yZWR1eCByZWR1Y2VyIGNsYXNzZXNcbmV4cG9ydCBjb25zdCBERUZBVUxUX1BBR0lOQVRJT05fQU1UID0gMjBcblxuZXhwb3J0IGNvbnN0IGluaXRTdGF0ZSA9IHt9XG5cbmV4cG9ydCBjb25zdCByZW1vdmVBbGwgPSAoc3RhdGU6IGFueSwgbW9kZWxOYW1lOiBzdHJpbmcpID0+IHtcbiAgcmV0dXJuIFIuZGlzc29jUGF0aChcbiAgICBbbW9kZWxOYW1lLCAnZmlsdGVyJywgJ2ZpbHRlck9yZGVyJ10sXG4gICAgUi5kaXNzb2NQYXRoKFttb2RlbE5hbWUsICdmaWx0ZXInLCAnZmlsdGVyVmFsdWUnXSwgc3RhdGUpXG4gIClcbn1cblxuZXhwb3J0IGNvbnN0IHNldFZhbHVlcyA9IChzdGF0ZTogYW55LCBwYXlsb2FkOiBhbnksIHR5cGU6IHN0cmluZykgPT4ge1xuICBjb25zdCBtb2RlbE5hbWUgPSBSLnByb3AoJ21vZGVsTmFtZScsIHBheWxvYWQpXG4gIGNvbnN0IHZhbHVlcyA9IFIucHJvcCgndmFsdWVzJywgcGF5bG9hZClcbiAgcmV0dXJuIFIuYXNzb2NQYXRoKFttb2RlbE5hbWUsIHR5cGVdLCB2YWx1ZXMsIHN0YXRlKVxufVxuXG5leHBvcnQgY29uc3Qgc2VsZWN0VGFibGVWaWV3ID0gKHN0YXRlOiBhbnkpOiBhbnkgPT5cbiAgUi5wYXRoKFsnY29udmV5b3InLCAndGFibGVWaWV3J10sIHN0YXRlKVxuIl19