import { SAVE_CREATE } from '../actionConsts';
import { Epic } from './epic';
export declare class CreateEpic extends Epic {
    [SAVE_CREATE](action$: any, state$: any): any;
}
