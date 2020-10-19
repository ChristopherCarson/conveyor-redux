import { LOCATION_CHANGE } from 'connected-react-router';
import { Epic } from './epic';
export declare class RouteEpic extends Epic {
    [LOCATION_CHANGE](action$: any): any;
}
