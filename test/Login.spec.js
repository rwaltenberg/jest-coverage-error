import { mount, createLocalVue } from '@vue/test-utils';
import VueBootstrap from 'bootstrap-vue';
import Login from '~/pages/login/index.vue';

const localVue = createLocalVue();
localVue.use(VueBootstrap);

const factory = (params = {}) => {
  return mount(Login, {
    ...params,
    localVue,
    mocks: {
      login: () => {},
      $mixpanel: () => {},
      $oauth: {
        logout: () => {},
      },
    },
  });
};

const loginTest = (name) => {
  test(`${name} login`, () => {
    const wrapper = factory();
    const loginMock = jest.fn();
    wrapper.vm.login = loginMock;

    const loginButton = wrapper.find(`.${name}`);

    loginButton.trigger('click').catch((error) => {
      throw error;
    });

    expect(loginMock.mock.calls.length).toBe(1);
    expect(loginMock).toHaveBeenCalledWith(name);
  });
};

describe('Login page', () => {
  test('mounts properly', () => {
    const wrapper = factory();
    expect(wrapper.vm).toBeTruthy();
  });
  test('renders properly', () => {
    const wrapper = factory();
    expect(wrapper.html()).toMatchSnapshot();
  });

  loginTest('linkedin');
  loginTest('salesforce');
  loginTest('google');
});
