import * as R from 'ramda'
import { SchemaBuilder } from '@autoinvent/conveyor-schema'

export const initState = {}

export const getEditValue = ({
  schema,
  modelName,
  fieldName,
  value
}: {
  schema: SchemaBuilder
  modelName: string
  fieldName: string
  value: any
}) => {
  const field = schema.getField(modelName, fieldName)
  const fieldType = R.prop('type', field)
  if (R.type(fieldType) === 'Object') {
    const type = R.prop('type', fieldType)
    const relModelName = R.prop('target', fieldType)
    if (type.includes('ToMany')) {
      return value.map((node: any) => {
        const displayName = schema.getDisplayValue({
          modelName: relModelName,
          node
        })
        const id = R.prop('id', node)
        return { label: displayName, value: id }
      })
    } else if (type.includes('ToOne')) {
      if (R.isNil(value)) {
        return null
      }
      return {
        label: schema.getDisplayValue({
          modelName: relModelName,
          node: value
        }),
        value: R.prop('id', value)
      }
    } else {
      return R.prop('id', value)
    }
  } else if (fieldType === 'enum') {
    if (R.isNil(value)) {
      return null
    }
    return { label: R.path(['choices', value], field), value }
  }
  return value
}

export const selectEdit = (state: any) => R.path(['conveyor', 'edit'], state)
