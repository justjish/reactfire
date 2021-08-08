import firebase from 'firebase/app';
import * as React from 'react';
import { ReactFireOptions, ObservableStatus } from './';
export declare function preloadUser(options: {
    firebaseApp: firebase.app.App;
}): Promise<firebase.User | null | undefined>;
/**
 * Subscribe to Firebase auth state changes, including token refresh
 *
 * @param options
 */
export declare function useUser<T = unknown>(options?: ReactFireOptions<T>): ObservableStatus<firebase.User>;
export declare function useIdTokenResult(user: firebase.User, forceRefresh?: boolean, options?: ReactFireOptions<firebase.auth.IdTokenResult>): ObservableStatus<firebase.auth.IdTokenResult>;
export interface AuthCheckProps {
    fallback: React.ReactNode;
    children: React.ReactNode;
    requiredClaims?: Object;
}
export interface ClaimsCheckProps {
    user: firebase.User;
    fallback: React.ReactNode;
    children: React.ReactNode;
    requiredClaims: {
        [key: string]: any;
    };
}
export interface ClaimCheckErrors {
    [key: string]: any[];
}
export declare type SigninCheckResult = {
    signedIn: false;
    hasRequiredClaims: false;
    errors: {};
    user: null;
} | {
    signedIn: true;
    hasRequiredClaims: boolean;
    errors: ClaimCheckErrors;
    user: firebase.User;
};
export interface SignInCheckOptionsBasic extends ReactFireOptions<SigninCheckResult> {
    forceRefresh?: boolean;
}
export interface SignInCheckOptionsClaimsObject extends SignInCheckOptionsBasic {
    requiredClaims: firebase.auth.IdTokenResult['claims'];
}
export interface ClaimsValidator {
    (claims: firebase.auth.IdTokenResult['claims']): {
        hasRequiredClaims: boolean;
        errors: ClaimCheckErrors | {};
    };
}
export interface SignInCheckOptionsClaimsValidator extends SignInCheckOptionsBasic {
    validateCustomClaims: ClaimsValidator;
}
/**
 * Subscribe to the signed-in status of a user.
 *
 * ```ts
 * const { status, data:signInCheckResult } = useSigninCheck();
 *
 * if (status === 'loading') {
 *   return <LoadingSpinner />}
 *
 *
 * if (signInCheckResult.signedIn === true) {
 *   return <ProfilePage user={signInCheckResult.user}/>
 * } else {
 *   return <SignInForm />
 * }
 * ```
 *
 * Optionally check [custom claims](https://firebase.google.com/docs/auth/admin/custom-claims) of a user as well.
 *
 * ```ts
 * // pass in an object describing the custom claims a user must have
 * const {status, data: signInCheckResult} = useSignInCheck({requiredClaims: {admin: true}});
 *
 * // pass in a custom claims validator function
 * const {status, data: signInCheckResult} = useSignInCheck({validateCustomClaims: (userClaims) => {
 *   // custom validation logic...
 * }});
 *
 * // You can optionally force-refresh the token
 * const {status, data: signInCheckResult} = useSignInCheck({forceRefresh: true, requiredClaims: {admin: true}});
 * ```
 */
export declare function useSigninCheck(options?: SignInCheckOptionsBasic | SignInCheckOptionsClaimsObject | SignInCheckOptionsClaimsValidator): ObservableStatus<SigninCheckResult>;
/**
 * @deprecated Use `useSignInCheck` instead
 *
 * Conditionally render children based on [custom claims](https://firebase.google.com/docs/auth/admin/custom-claims).
 *
 * Meant for Concurrent mode only (`<FirebaseAppProvider suspense=true />`). [More detail](https://github.com/FirebaseExtended/reactfire/issues/325#issuecomment-827654376).
 */
export declare function ClaimsCheck({ user, fallback, children, requiredClaims }: ClaimsCheckProps): JSX.Element;
/**
 * @deprecated Use `useSignInCheck` instead
 *
 * Conditionally render children based on signed-in status and [custom claims](https://firebase.google.com/docs/auth/admin/custom-claims).
 *
 * Meant for Concurrent mode only (`<FirebaseAppProvider suspense=true />`). [More detail](https://github.com/FirebaseExtended/reactfire/issues/325#issuecomment-827654376).
 */
export declare function AuthCheck({ fallback, children, requiredClaims }: AuthCheckProps): JSX.Element;
