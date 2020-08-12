<script lang="ts">
import Vue from 'vue';
import { IPubNubResponse } from './Pubnub.interface';
import { PROVISION_SETUP_FINISHED } from '~/common/eventNames';

/**
 * Pubnub widget control mixin
 */
export interface IPubnubMixin {
  /**
   * Pubnub subscribe method
   */
  $pnSubscribe: (arg: object) => void;
  /**
   * Pubnub getMessage method
   */
  $pnGetMessage: (arg: string) => string;
}

const mixinPubnub = Vue.extend({
  data() {
    return {
      pubnubMsg: '',
    };
  },
  computed: {
    userId(): string {
      return this.$store.state.auth.id;
    },
  },
  watch: {
    pubnubMsg(value): void {
      if (!value.length) {
        return;
      }
      this.$store.commit('pubnub/SET_RESPONSES', [...value]);

      const lastMessage: IPubNubResponse = value[value.length - 1];

      switch (lastMessage.message.type) {
        case 'user':
          this.handleUserMessage(lastMessage);
          break;
        case 'notification':
          this.handleNotificationMessage(lastMessage);
          break;
        case 'salesforce_connector/setup/field_provision_finished':
          this.$emit(
            PROVISION_SETUP_FINISHED,
            lastMessage.message.data.message
          );
          break;
      }
    },
  },
  mounted() {
    if ('$pnSubscribe' in this) {
      this.$pnSubscribe({
        channels: [this.userId],
        triggerEvents: ['callback', 'message'],
        withPresence: false,
      });
      this.pubnubMsg = this.$pnGetMessage(this.$store.state.auth.id);
    }
  },
  methods: {
    handleUserMessage(lastMessage: IPubNubResponse) {
      this.$store.commit('auth/SET_AUTH_USER', lastMessage.message.user);
    },
    handleNotificationMessage(lastMessage: IPubNubResponse) {
      const { data } = lastMessage.message;
      if (!data) {
        return;
      }

      switch (data.message_type) {
        case 'site_ready': {
          const messageSiteReady = `<span>${data.message_text}<a href="${data.message_link}" class="margin-left">View Report</a></span>`;
          this.$toast.global.dismissableSuccessLong(messageSiteReady);
          break;
        }

        case 'smartlist_download': {
          const messageSmartlistDownload = `<span>${data.message_text}<a href="${data.message_link}" class="margin-left">Download Results</a></span>`;
          this.$toast.global.dismissableSuccessLong(messageSmartlistDownload);
          break;
        }
      }
    },
  },
});

export default mixinPubnub;
</script>
