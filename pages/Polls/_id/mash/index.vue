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
import axios from "axios";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Mashes,
    Subs
  },
  head() {
    return {
      title: "Mash it up",
      meta: {
        hid: "description",
        name: "description",
        content: "hayooo"
      }
    };
  },
  async created() {
    const host = process.env.HOST || "127.0.0.1";
    const port = process.env.PORT || 3000;
    const response = await axios.get(
      `http://${host}:${port}/api/polls/check/${this.$route.params.id}`
    );
    if (response.data.status) {
      this.resetTurn();
      this.checkRank(this.$route.params.id);
      this.fetchMashes(this.$route.params.id);
      this.fetchSubs(this.$route.params.id);
    } else {
      this.$router.push({ path: "/polls" });
    }
  },
  methods: {
    ...mapActions({
      fetchSubs: "mash/fetchSubs",
      fetchMashes: "mash/fetchMashes",
      resetTurn: "mash/resetTurn",
      checkRank: "mash/checkRank"
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

