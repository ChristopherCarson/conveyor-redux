import "core-js/modules/es.function.name";
import _toConsumableArray from "@babel/runtime-corejs3/helpers/esm/toConsumableArray";
import _Object$defineProperty from "@babel/runtime-corejs3/core-js-stable/object/define-property";
import _includes from "ramda/src/includes";
import _forEach from "ramda/src/forEach";
import _Object$getOwnPropertyNames from "@babel/runtime-corejs3/core-js-stable/object/get-own-property-names";
import _forEachInstanceProperty from "@babel/runtime-corejs3/core-js-stable/instance/for-each";
import _Object$getPrototypeOf from "@babel/runtime-corejs3/core-js-stable/object/get-prototype-of";
import _Set from "@babel/runtime-corejs3/core-js-stable/set";
import _classCallCheck from "@babel/runtime-corejs3/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime-corejs3/helpers/esm/createClass";
import _defineProperty from "@babel/runtime-corejs3/helpers/esm/defineProperty";
export var Epic = /*#__PURE__*/function () {
  function Epic(schema, queryBuilder) {
    _classCallCheck(this, Epic);

    _defineProperty(this, "schema", void 0);

    _defineProperty(this, "queryBuilder", void 0);

    this.schema = schema;
    this.queryBuilder = queryBuilder;
  }

  _createClass(Epic, [{
    key: "makeEpic",
    value: function makeEpic() {
      var _this = this;

      var epics = [];
      var methods = new _Set();
      var obj = this; //eslint-disable-line

      do {
        var _context;

        obj = _Object$getPrototypeOf(obj);

        _forEachInstanceProperty(_context = _Object$getOwnPropertyNames(obj)).call(_context, function (name) {
          return methods.add(name);
        });
      } while (_Object$getPrototypeOf(obj).constructor.name != 'Epic');

      _forEach(function (methodName) {
        if (!_includes(methodName, ['constructor', 'makeEpic', '__reactstandin__regenerateByEval'])) {
          var epic = function epic(action$, state$) {
            return (// @ts-ignore
              _this[methodName](action$, state$)
            );
          };

          _Object$defineProperty(epic, 'name', {
            value: _this.constructor.name
          });

          epics.push(epic);
        }
      }, _toConsumableArray(methods));

      return epics;
    }
  }]);

  return Epic;
}();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lcGljcy9lcGljLnRzIl0sIm5hbWVzIjpbIkVwaWMiLCJzY2hlbWEiLCJxdWVyeUJ1aWxkZXIiLCJlcGljcyIsIm1ldGhvZHMiLCJvYmoiLCJuYW1lIiwiYWRkIiwiY29uc3RydWN0b3IiLCJtZXRob2ROYW1lIiwiZXBpYyIsImFjdGlvbiQiLCJzdGF0ZSQiLCJ2YWx1ZSIsInB1c2giXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLFdBQWFBLElBQWI7QUFJRSxnQkFBWUMsTUFBWixFQUFtQ0MsWUFBbkMsRUFBK0Q7QUFBQTs7QUFBQTs7QUFBQTs7QUFDN0QsU0FBS0QsTUFBTCxHQUFjQSxNQUFkO0FBQ0EsU0FBS0MsWUFBTCxHQUFvQkEsWUFBcEI7QUFDRDs7QUFQSDtBQUFBO0FBQUEsK0JBU2E7QUFBQTs7QUFDVCxVQUFNQyxLQUFlLEdBQUcsRUFBeEI7QUFDQSxVQUFNQyxPQUFPLEdBQUcsVUFBaEI7QUFDQSxVQUFJQyxHQUF3QixHQUFHLElBQS9CLENBSFMsQ0FHMkI7O0FBQ3BDLFNBQUc7QUFBQTs7QUFDREEsUUFBQUEsR0FBRyxHQUFHLHVCQUFzQkEsR0FBdEIsQ0FBTjs7QUFDQSx3RUFBMkJBLEdBQTNCLGtCQUF3QyxVQUFBQyxJQUFJO0FBQUEsaUJBQUlGLE9BQU8sQ0FBQ0csR0FBUixDQUFZRCxJQUFaLENBQUo7QUFBQSxTQUE1QztBQUNELE9BSEQsUUFHUyx1QkFBc0JELEdBQXRCLEVBQTJCRyxXQUEzQixDQUF1Q0YsSUFBdkMsSUFBK0MsTUFIeEQ7O0FBSUEsZUFDRSxVQUFBRyxVQUFVLEVBQUk7QUFDWixZQUNFLENBQUMsVUFBV0EsVUFBWCxFQUF1QixDQUN0QixhQURzQixFQUV0QixVQUZzQixFQUd0QixrQ0FIc0IsQ0FBdkIsQ0FESCxFQU1FO0FBQ0EsY0FBTUMsSUFBWSxHQUFHLFNBQWZBLElBQWUsQ0FBQ0MsT0FBRCxFQUFVQyxNQUFWO0FBQUEsbUJBQ25CO0FBQ0EsY0FBQSxLQUFJLENBQUNILFVBQUQsQ0FBSixDQUFpQkUsT0FBakIsRUFBMEJDLE1BQTFCO0FBRm1CO0FBQUEsV0FBckI7O0FBR0EsaUNBQXNCRixJQUF0QixFQUE0QixNQUE1QixFQUFvQztBQUFFRyxZQUFBQSxLQUFLLEVBQUUsS0FBSSxDQUFDTCxXQUFMLENBQWlCRjtBQUExQixXQUFwQzs7QUFDQUgsVUFBQUEsS0FBSyxDQUFDVyxJQUFOLENBQVdKLElBQVg7QUFDRDtBQUNGLE9BZkgscUJBZ0JNTixPQWhCTjs7QUFrQkEsYUFBT0QsS0FBUDtBQUNEO0FBcENIOztBQUFBO0FBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBSIGZyb20gJ3JhbWRhJ1xuaW1wb3J0IHsgU2NoZW1hQnVpbGRlciB9IGZyb20gJ0BhdXRvaW52ZW50L2NvbnZleW9yLXNjaGVtYSdcblxuZXhwb3J0IGNsYXNzIEVwaWMge1xuICBzY2hlbWE6IFNjaGVtYUJ1aWxkZXJcbiAgcXVlcnlCdWlsZGVyOiBRdWVyeUJ1aWxkZXJcblxuICBjb25zdHJ1Y3RvcihzY2hlbWE6IFNjaGVtYUJ1aWxkZXIsIHF1ZXJ5QnVpbGRlcjogUXVlcnlCdWlsZGVyKSB7XG4gICAgdGhpcy5zY2hlbWEgPSBzY2hlbWFcbiAgICB0aGlzLnF1ZXJ5QnVpbGRlciA9IHF1ZXJ5QnVpbGRlclxuICB9XG5cbiAgbWFrZUVwaWMoKSB7XG4gICAgY29uc3QgZXBpY3M6IFJPRXBpY1tdID0gW11cbiAgICBjb25zdCBtZXRob2RzID0gbmV3IFNldCgpXG4gICAgbGV0IG9iajogUmVjb3JkPHN0cmluZywgYW55PiA9IHRoaXMgLy9lc2xpbnQtZGlzYWJsZS1saW5lXG4gICAgZG8ge1xuICAgICAgb2JqID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iailcbiAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKG9iaikuZm9yRWFjaChuYW1lID0+IG1ldGhvZHMuYWRkKG5hbWUpKVxuICAgIH0gd2hpbGUgKE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmopLmNvbnN0cnVjdG9yLm5hbWUgIT0gJ0VwaWMnKVxuICAgIFIuZm9yRWFjaChcbiAgICAgIG1ldGhvZE5hbWUgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIVIuaW5jbHVkZXMobWV0aG9kTmFtZSwgW1xuICAgICAgICAgICAgJ2NvbnN0cnVjdG9yJyxcbiAgICAgICAgICAgICdtYWtlRXBpYycsXG4gICAgICAgICAgICAnX19yZWFjdHN0YW5kaW5fX3JlZ2VuZXJhdGVCeUV2YWwnXG4gICAgICAgICAgXSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgZXBpYzogUk9FcGljID0gKGFjdGlvbiQsIHN0YXRlJCkgPT5cbiAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgIHRoaXNbbWV0aG9kTmFtZV0oYWN0aW9uJCwgc3RhdGUkKVxuICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShlcGljLCAnbmFtZScsIHsgdmFsdWU6IHRoaXMuY29uc3RydWN0b3IubmFtZSB9KVxuICAgICAgICAgIGVwaWNzLnB1c2goZXBpYylcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIFsuLi5tZXRob2RzXVxuICAgIClcbiAgICByZXR1cm4gZXBpY3NcbiAgfVxufVxuIl19