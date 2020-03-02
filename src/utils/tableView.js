import * as R from 'ramda'

export const DEFAULT_PAGINATION_AMT = 20

export const initState = { amtPerPage: DEFAULT_PAGINATION_AMT }

export const removeAll = (state, modelName) => {
  return R.dissocPath(
    [modelName, 'filter', 'filterOrder'],
    R.dissocPath([modelName, 'filter', 'filterValue'], state)
  )
}

export const setValues = (state, payload, type) => {
  const modelName = R.prop('modelName', payload)
  const values = R.prop('values', payload)
  return R.assocPath([modelName, type], values, state)
}

export const selectTableView = state => R.path(['conveyor', 'tableView'], state)
