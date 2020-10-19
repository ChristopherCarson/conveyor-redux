import _type from "ramda/src/type";
import _isNil from "ramda/src/isNil";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
export var Reducer = /*#__PURE__*/function () {
  function Reducer(schema, initState) {
    _classCallCheck(this, Reducer);

    _defineProperty(this, "schema", void 0);

    _defineProperty(this, "initState", void 0);

    this.schema = schema;
    this.initState = initState;
  }

  _createClass(Reducer, [{
    key: "reduce",
    value: function reduce(state, action) {
      if (_isNil(state)) {
        state = this.initState;
      } // @ts-ignore


      if (this && _type(this[action.type]) === 'Function') // @ts-ignore
        return this[action.type](state, action);else return state;
    }
  }]);

  return Reducer;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yZWR1Y2Vycy9yZWR1Y2VyLnRzIl0sIm5hbWVzIjpbIlJlZHVjZXIiLCJzY2hlbWEiLCJpbml0U3RhdGUiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBR0EsV0FBYUEsT0FBYjtBQUlFLG1CQUFZQyxNQUFaLEVBQW1DQyxTQUFuQyxFQUFtRDtBQUFBOztBQUFBOztBQUFBOztBQUNqRCxTQUFLRCxNQUFMLEdBQWNBLE1BQWQ7QUFDQSxTQUFLQyxTQUFMLEdBQWlCQSxTQUFqQjtBQUNEOztBQVBIO0FBQUE7QUFBQSwyQkFTU0MsS0FUVCxFQVNxQkMsTUFUckIsRUFTa0M7QUFDOUIsVUFBSSxPQUFRRCxLQUFSLENBQUosRUFBb0I7QUFDbEJBLFFBQUFBLEtBQUssR0FBRyxLQUFLRCxTQUFiO0FBQ0QsT0FINkIsQ0FLOUI7OztBQUNBLFVBQUksUUFBUSxNQUFPLEtBQUtFLE1BQU0sQ0FBQ0MsSUFBWixDQUFQLE1BQThCLFVBQTFDLEVBQ0U7QUFDQSxlQUFPLEtBQUtELE1BQU0sQ0FBQ0MsSUFBWixFQUFrQkYsS0FBbEIsRUFBeUJDLE1BQXpCLENBQVAsQ0FGRixLQUdLLE9BQU9ELEtBQVA7QUFDTjtBQW5CSDs7QUFBQTtBQUFBIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgUiBmcm9tICdyYW1kYSdcbmltcG9ydCB7IFNjaGVtYUJ1aWxkZXIgfSBmcm9tICdAYXV0b2ludmVudC9jb252ZXlvci1zY2hlbWEnXG5cbmV4cG9ydCBjbGFzcyBSZWR1Y2VyIHtcbiAgc2NoZW1hOiBTY2hlbWFCdWlsZGVyXG4gIGluaXRTdGF0ZTogYW55XG5cbiAgY29uc3RydWN0b3Ioc2NoZW1hOiBTY2hlbWFCdWlsZGVyLCBpbml0U3RhdGU6IGFueSkge1xuICAgIHRoaXMuc2NoZW1hID0gc2NoZW1hXG4gICAgdGhpcy5pbml0U3RhdGUgPSBpbml0U3RhdGVcbiAgfVxuXG4gIHJlZHVjZShzdGF0ZTogYW55LCBhY3Rpb246IGFueSkge1xuICAgIGlmIChSLmlzTmlsKHN0YXRlKSkge1xuICAgICAgc3RhdGUgPSB0aGlzLmluaXRTdGF0ZVxuICAgIH1cblxuICAgIC8vIEB0cy1pZ25vcmVcbiAgICBpZiAodGhpcyAmJiBSLnR5cGUodGhpc1thY3Rpb24udHlwZV0pID09PSAnRnVuY3Rpb24nKVxuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgcmV0dXJuIHRoaXNbYWN0aW9uLnR5cGVdKHN0YXRlLCBhY3Rpb24pXG4gICAgZWxzZSByZXR1cm4gc3RhdGVcbiAgfVxufVxuIl19