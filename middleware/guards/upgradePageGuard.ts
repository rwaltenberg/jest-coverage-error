import { Context } from '@nuxt/types';

/**
 * Upgrade page route name
 */
const upgradeRoute = '/upgrade';
/**
 * Home page route name
 */
const homeRoute = '/home';

/**
 * Redirects user from upgrade page to home page
 */
const upgradePageGuardMiddleware = ({ route, store, redirect }: Context) => {
  if (!route.name) {
    return;
  }

  const isUpgradePage = route.path === upgradeRoute;
  const shouldRedirectToHome =
    !store.getters['user/isFreePlan'] || store.getters['user/hasTeam'];

  if (isUpgradePage && shouldRedirectToHome) {
    redirect(homeRoute);
  }
};

export default upgradePageGuardMiddleware;
