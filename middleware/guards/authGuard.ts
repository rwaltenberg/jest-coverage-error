import { Context } from '@nuxt/types';
import IMeta from '../../common/meta.interface';
import { LAST_VISITED_ROUTE } from '../../common/storageKeys';
import cookieSettings from './../../plugins/helpers/cookieSettings';

/**
 * Unauthenticated user redirect
 */
const unauthRedirect = '/login';

/**
 * Redirects to login if unauthenticated user is trying to access a protected page
 */
const authGuardMiddleware = ({ route, store, app, redirect }: Context) => {
  const isAuthOnly = route.meta.reduce(
    (memo: boolean, current: IMeta) => current.authOnly || memo,
    false
  );

  if (!store.getters['auth/isLoggedIn'] && isAuthOnly) {
    app.$cookies.set(
      LAST_VISITED_ROUTE,
      route,
      cookieSettings({
        path: '/',
      })
    );
    redirect(unauthRedirect);
  }
};

export default authGuardMiddleware;
