import { Context } from '@nuxt/types';

/**
 * Pages that authenticated users should be redirected away from
 */
const redirectPages = ['login'];
/**
 * Home redirect
 */
const homeRedirect = '/home';

/**
 * Redirects authenticated user to homepage if needed
 */
const redirectToHomeMiddleware = ({ route, store, redirect }: Context) => {
  if (!route.name) {
    return;
  }
  const isHomePage = route.path === homeRedirect;
  const shouldRedirectToHome = redirectPages.includes(route.name);

  if (!isHomePage && store.getters['auth/isLoggedIn'] && shouldRedirectToHome) {
    redirect(homeRedirect);
  }
};

export default redirectToHomeMiddleware;
