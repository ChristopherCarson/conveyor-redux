import * as R from 'ramda'
import { ofType } from 'redux-observable'
import { map, mergeMap } from 'rxjs/operators'
import * as Actions from '../actions'
import { FETCH_MODEL_TOOLTIP } from '../actionConsts'
import * as Logger from '../utils/Logger'

import { Epic } from './epic'

export class TooltipEpic extends Epic {
  [FETCH_MODEL_TOOLTIP](action$) {
    return action$.pipe(
      ofType(FETCH_MODEL_TOOLTIP),
      map(R.prop('payload')),
      map(payload => {
        const variables = { id: payload.id }
        const query = this.doRequest.buildQuery({
          modelName: payload.modelName,
          queryType: 'tooltip'
        })
        return {
          modelName: payload.modelName,
          id: payload.id,
          query,
          variables
        }
      }),
      mergeMap(context => {
        return this.doRequest
          .sendRequest({ query: context.query, variables: context.variables })
          .then(({ data, error }) => ({ context, data, error }))
      }),
      map(({ context, data, error }) => {
        if (error) {
          Logger.epicError('fetchModelTooltipEpic', context, error)
          return Actions.addDangerAlert({
            message: `Error loading ${context.modelName} tooltip`
          })
        }

        return Actions.updateModelTooltip({
          modelName: context.modelName,
          id: context.id,
          data
        })
      })
    )
  }
}
