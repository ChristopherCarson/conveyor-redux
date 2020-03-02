import * as R from 'ramda'

export const initState = {}

export const groupModels = (collection, property) => {
  const values = []
  const result = []
  for (let i = 0; i < collection.length; i++) {
    const val = collection[i][property]
    const index = values.indexOf(val)
    if (index > -1) {
      result[index].push(collection[i])
    } else {
      values.push(val)
      result.push([collection[i]])
    }
  }
  return result
}

export const selectModal = state => R.path(['conveyor', 'modal'], state)
export const selectModalStore = (state, modal) =>
  R.path(['conveyor', 'modal', modal], state)
