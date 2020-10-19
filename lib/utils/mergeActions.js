import { getActions } from './getActions';
export var mergeConveyorActions = function mergeConveyorActions(schema, dispatch) {
  /* Here, actions are appended to the schema at the model level after
   * being bound to the redux store's 'dispatch' object. Each model receives its own separate
   * 'actions' dictionary, which one can override by editing the SchemaBuilder object.
   * Notice, the appended actions do not override already existing actions that
   * may exist in the schema 'schema.mergeDefaultModelAttr(getDefaultModelProps)'
   * as the 'override' boolean is not set to true.*/
  var getDefaultModelProps = function getDefaultModelProps() {
    return getActions(dispatch);
  };

  schema.mergeDefaultModelAttr(getDefaultModelProps);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlscy9tZXJnZUFjdGlvbnMudHMiXSwibmFtZXMiOlsiZ2V0QWN0aW9ucyIsIm1lcmdlQ29udmV5b3JBY3Rpb25zIiwic2NoZW1hIiwiZGlzcGF0Y2giLCJnZXREZWZhdWx0TW9kZWxQcm9wcyIsIm1lcmdlRGVmYXVsdE1vZGVsQXR0ciJdLCJtYXBwaW5ncyI6IkFBQ0EsU0FBU0EsVUFBVCxRQUEyQixjQUEzQjtBQUVBLE9BQU8sSUFBTUMsb0JBQW9CLEdBQUcsU0FBdkJBLG9CQUF1QixDQUFDQyxNQUFELEVBQXdCQyxRQUF4QixFQUEwQztBQUM1RTtBQUNGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFRSxNQUFNQyxvQkFBb0IsR0FBRyxTQUF2QkEsb0JBQXVCLEdBQU07QUFDakMsV0FBT0osVUFBVSxDQUFDRyxRQUFELENBQWpCO0FBQ0QsR0FGRDs7QUFHQUQsRUFBQUEsTUFBTSxDQUFDRyxxQkFBUCxDQUE2QkQsb0JBQTdCO0FBQ0QsQ0FaTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFNjaGVtYUJ1aWxkZXIgfSBmcm9tICdAYXV0b2ludmVudC9jb252ZXlvci1zY2hlbWEnXG5pbXBvcnQgeyBnZXRBY3Rpb25zIH0gZnJvbSAnLi9nZXRBY3Rpb25zJ1xuXG5leHBvcnQgY29uc3QgbWVyZ2VDb252ZXlvckFjdGlvbnMgPSAoc2NoZW1hOiBTY2hlbWFCdWlsZGVyLCBkaXNwYXRjaDogYW55KSA9PiB7XG4gIC8qIEhlcmUsIGFjdGlvbnMgYXJlIGFwcGVuZGVkIHRvIHRoZSBzY2hlbWEgYXQgdGhlIG1vZGVsIGxldmVsIGFmdGVyXG4gICAqIGJlaW5nIGJvdW5kIHRvIHRoZSByZWR1eCBzdG9yZSdzICdkaXNwYXRjaCcgb2JqZWN0LiBFYWNoIG1vZGVsIHJlY2VpdmVzIGl0cyBvd24gc2VwYXJhdGVcbiAgICogJ2FjdGlvbnMnIGRpY3Rpb25hcnksIHdoaWNoIG9uZSBjYW4gb3ZlcnJpZGUgYnkgZWRpdGluZyB0aGUgU2NoZW1hQnVpbGRlciBvYmplY3QuXG4gICAqIE5vdGljZSwgdGhlIGFwcGVuZGVkIGFjdGlvbnMgZG8gbm90IG92ZXJyaWRlIGFscmVhZHkgZXhpc3RpbmcgYWN0aW9ucyB0aGF0XG4gICAqIG1heSBleGlzdCBpbiB0aGUgc2NoZW1hICdzY2hlbWEubWVyZ2VEZWZhdWx0TW9kZWxBdHRyKGdldERlZmF1bHRNb2RlbFByb3BzKSdcbiAgICogYXMgdGhlICdvdmVycmlkZScgYm9vbGVhbiBpcyBub3Qgc2V0IHRvIHRydWUuKi9cblxuICBjb25zdCBnZXREZWZhdWx0TW9kZWxQcm9wcyA9ICgpID0+IHtcbiAgICByZXR1cm4gZ2V0QWN0aW9ucyhkaXNwYXRjaClcbiAgfVxuICBzY2hlbWEubWVyZ2VEZWZhdWx0TW9kZWxBdHRyKGdldERlZmF1bHRNb2RlbFByb3BzKVxufVxuIl19