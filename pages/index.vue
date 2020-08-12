<script lang="ts">
import Vue from 'vue';
const PageIndex = Vue.extend({
  name: 'PageIndex',
  fetch({ redirect }) {
    redirect('/login');
  },
});
export default PageIndex;
</script>
