<template>
  <b-container class="login-wrapper">
    <b-row>
      <b-col
        v-for="item in logins"
        :key="item.name"
        :class="['login-action-item', item.name]"
        @click="login(item.name)"
      >
        {{ item.label }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script lang="ts">
import Vue from 'vue';

const login = Vue.extend({
  layout: 'login',
  data() {
    return {
      logins: [
        {
          label: 'Linkedin',
          name: 'linkedin',
          image: '/static-v2/images/social/logo-linkedin.png',
        },
        {
          label: 'SFDC',
          name: 'salesforce',
          image: '/static-v2/images/social/logo-salesforce.svg',
        },
        {
          label: 'Google',
          name: 'google',
          image: '/static-v2/images/social/logo-google.png',
        },
      ],
    };
  },
  methods: {
    login() {
      // eslint-disable-next-line no-console
      console.log('call');
    },
  },
  head() {
    return {
      title: 'Login',
    };
  },
});
export default login;
</script>