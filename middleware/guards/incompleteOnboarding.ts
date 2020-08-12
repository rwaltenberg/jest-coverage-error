import { Context } from '@nuxt/types';

/**
 * Pages that should not redirect to onboarding completion form
 */
const onboardingRegistrationRoutes = ['/home', '/authcallback'];
/**
 * Page that incomplete onboarding users are redirected to
 */
const completeOnboardingRedirect = '/home';

/**
 * Redirects to login if unauthenticated user is trying to access a protected page
 */
const incompleteOnboardingMiddleware = ({
  store,
  route,
  redirect,
}: Context) => {
  const { user } = store.state.auth;
  if (!user) return;

  const needsToCompleteOnboarding = !user.completed_onboarding;
  const isOnboardingRegistrationRoute = onboardingRegistrationRoutes.includes(
    route.path
  );
  const shouldRedirect =
    needsToCompleteOnboarding && !isOnboardingRegistrationRoute;

  if (shouldRedirect) {
    redirect(completeOnboardingRedirect);
  }
};

export default incompleteOnboardingMiddleware;
