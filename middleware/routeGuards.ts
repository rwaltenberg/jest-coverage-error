import { Middleware } from '@nuxt/types';
import authenticateMiddleware from './guards/authenticate';
import authGuardMiddleware from './guards/authGuard';
import redirectToHomeMiddleware from './guards/redirectToHome';
import incompleteOnboardingMiddleware from './guards/incompleteOnboarding';
import verifyEmailMiddleware from './guards/verifyEmail';
import upgradePageGuard from './guards/upgradePageGuard';
import newTeamOwnerMiddleware from './guards/newTeamOwner';

const routeGuardMiddleware: Middleware = async (ctx) => {
  await authenticateMiddleware(ctx);
  authGuardMiddleware(ctx);
  redirectToHomeMiddleware(ctx);
  incompleteOnboardingMiddleware(ctx);
  verifyEmailMiddleware(ctx);
  upgradePageGuard(ctx);
  await newTeamOwnerMiddleware(ctx);
};

export default routeGuardMiddleware;
