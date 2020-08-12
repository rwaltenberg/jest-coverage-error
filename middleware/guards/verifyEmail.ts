import { Context } from '@nuxt/types';

/**
 * Pages that should not redirect to home and show verify modal
 */
const ignoredRoutes = ['/authcallback', '/secret', '/verify'];
/**
 * Page that incomplete onboarding users are redirected to
 */
const homePath = '/home';

/**
 * Redirects to home if user with unverified email is accessing the web app
 */
const verifyEmailMiddleware = ({ store, route, redirect }: Context) => {
  const isUserVerified = !store.getters['user/unverifiedEmail'];
  const isIgnoredRoute = ignoredRoutes.find((path) =>
    route.path.includes(path)
  );

  if (!route.name) {
    return;
  }

  const isHomePage = route.path === homePath;

  if (
    store.getters['auth/isLoggedIn'] &&
    !isHomePage &&
    !isUserVerified &&
    !isIgnoredRoute
  ) {
    redirect(homePath);
  }
};

export default verifyEmailMiddleware;
