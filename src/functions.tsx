import { ObservableStatus, ReactFireOptions, useObservable } from './';
import { httpsCallable } from 'rxfire/functions';
import { HttpsCallableOptions } from 'firebase/functions';
import { useFunctions } from './sdk';
import { first } from 'rxjs/operators';

/**
 * useFunctionsCallable
 * A hook used to make calls to Firebase Callable Functions
 * @param name Callable function name
 * @param data Request Payload
 * @param options Combined HttpsCallableOptions and ReactFireOptions<Res>
 * @returns
 */
export function useFunctionsCallable<Req, Res>(name: string, data: Req, options?: HttpsCallableOptions & ReactFireOptions<Res>): ObservableStatus<Res> {
  const functions = useFunctions();
  const observableId = `functions:httpsCallable:${functions.app.name}:${name}:${performance.now()}`;
  const observable$ = httpsCallable<Req, Res>(functions, name, options)(data).pipe(first());
  return useObservable(observableId, observable$, options);
}
