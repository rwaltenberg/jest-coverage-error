import { Context } from '@nuxt/types';
import { ITeamInformation } from '~/store/teamAdmin/users.state.interface';
import IUserInfo from '~/API/interfaces/userInfo.interface';

const newTeamOwnerMiddleware = async ({ store, route, redirect }: Context) => {
  const userInfo = store.getters['user/info'] as Nullable<IUserInfo>;

  if (!userInfo || !userInfo.team_id) {
    return;
  }

  let teamInfo = store.getters['teamAdmin/info'] as Nullable<ITeamInformation>;

  if (!teamInfo) {
    await store.dispatch('teamAdmin/fetchTeamInformation');
    teamInfo = store.getters['teamAdmin/info'];
  }

  if (!teamInfo || teamInfo.name || route.name?.includes('admin-id-name')) {
    return;
  }

  redirect({
    name: 'admin-id-name',
    params: { id: `${userInfo.team_id}` },
    query: route.query,
  });
};

export default newTeamOwnerMiddleware;
