import { ADD_SUCCESS_ALERT, ADD_DANGER_ALERT } from '../actionConsts';
import { Epic } from './epic';
export declare class AlertEpic extends Epic {
    [ADD_DANGER_ALERT](action$: any): any;
    [ADD_SUCCESS_ALERT](action$: any): any;
}
