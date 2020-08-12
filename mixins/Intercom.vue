<script lang="ts">
import Vue from 'vue';
import IUserInfo from '../API/interfaces/userInfo.interface';

export default Vue.extend({
  computed: {
    user(): IUserInfo {
      return this.$store.getters['user/info'];
    },
  },
  mounted() {
    if (!this.$intercom) {
      return;
    }

    if (this.user && !this.$intercom.visible) {
      this.$intercom.boot({
        email: this.user.email,
        name: this.user.name,
        created_at: this.user.created_at,
        user_id: this.user.id,
        user_type: this.user.user_type,
        headline: this.user.linkedin_headline,
        linkedin_url: this.user.linkedin_url,
        trial_expires_at: this.user.trial_expires_at,
        user_hash: this.user.intercom_user_hash,
        widget: {
          activator: '#IntercomDefaultWidget',
        },
      });
    }
  },
  beforeDestroy() {
    if (!this.$intercom) {
      return;
    }

    this.$intercom.shutdown();
  },
});
</script>
