import { ObservableStatus, ReactFireOptions } from './';
import { HttpsCallableOptions } from 'firebase/functions';
/**
 * useFunctionsCallable
 * A hook used to make calls to Firebase Callable Functions
 * @param name Callable function name
 * @param data Request Payload
 * @param options Combined HttpsCallableOptions and ReactFireOptions<Res>
 * @returns
 */
export declare function useFunctionsCallable<Req, Res>(name: string, data: Req, options?: HttpsCallableOptions & ReactFireOptions<Res>): ObservableStatus<Res>;
