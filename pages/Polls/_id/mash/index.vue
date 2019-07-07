<template>
  <div id="app">
    <div class="content">
      <Mashes/>
      <Subs/>
    </div>
  </div>
</template>

<script>
import Mashes from "../../../../components/polls/_id/mashes/Mashes";
import Subs from "../../../../components/polls/_id/mashes/Subs";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Mashes,
    Subs
  },
  created() {
    this.resetTurn();
    this.fetchSubs(this.$route.params.id);
    this.fetchMashes(this.$route.params.id);
  },
  methods: {
    ...mapActions({
      fetchSubs: "mash/fetchSubs",
      fetchMashes: "mash/fetchMashes",
      resetTurn: "mash/resetTurn"
    })
  }
};
</script>
<style>
.content {
  text-align: center;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter {
  opacity: 0;
}
</style>

