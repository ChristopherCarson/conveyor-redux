import { QUERY_SELECT_MENU_OPEN, RELATIONSHIP_SELECT_MENU_OPEN } from '../actionConsts';
import { Epic } from './epic';
export declare class OptionsEpic extends Epic {
    [QUERY_SELECT_MENU_OPEN](action$: any): any;
    [RELATIONSHIP_SELECT_MENU_OPEN](action$: any): any;
}
