import { Context } from '@nuxt/types';
import { HERO_MODE, SESSION } from '~/common/storageKeys';

/**
 * Populates user data from existing session cookie
 */

const authMiddleware = async ({ app, store, route, redirect }: Context) => {
  const isLogin = route.name === 'login';

  if (isLogin || store.getters['auth/isLoggedIn']) {
    return;
  }

  const sessionCookie = app.$cookies.get(SESSION);

  if (!sessionCookie) {
    store.commit('auth/RESET');
    return;
  }
  const {
    user_id: id,
    token,
    isPreview,
    isPublicAuthentication,
  } = sessionCookie;

  const isHeroMode = app.$cookies.get(HERO_MODE);

  store.commit('auth/SET_PREVIEW_MODE', !!isPreview);
  store.commit('user/SET_HERO_MODE', !!isHeroMode);

  try {
    await store.dispatch('auth/authenticate', {
      id,
      token,
      isPublicAuthentication,
    });
  } catch (error) {
    store
      .dispatch('auth/logout', {
        invalidateToken: false,
        loginRedirect: false,
      })
      .catch(app.$errorHandler.logSentry);

    redirect('/login');
  }
};

export default authMiddleware;
