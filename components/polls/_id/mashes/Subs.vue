<template>
  <div v-if="turn==mashes.length && mashes.length!=0">
    <button @click="resetClick">Reset</button>
    <div v-bind:key="orderedSub._id" v-for="orderedSub in rank">
      <img v-bind:src="getImgUrl(orderedSub.images)">
      <p>{{orderedSub.subjectName}}</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Subs",
  computed: {
    ...mapGetters({
      rank: "mash/rank",
      mashes: "mash/mashes",
      turn: "mash/turn"
    })
  },
  updated() {
    if (this.turn == this.mashes.length && this.mashes.length != 0) {
      this.fetchRank(this.$route.params.id);
    }
  },
  methods: {
    ...mapActions({
      resetRank: "mash/resetRank",
      fetchRank: "mash/fetchRank",
      fetchSubs: "mash/fetchSubs",
      fetchMashes: "mash/fetchMashes",
      resetTurn: "mash/resetTurn"
    }),
    resetClick() {
      this.resetRank(this.$route.params.id);
      this.resetTurn();
      this.fetchSubs(this.$route.params.id);
      this.fetchMashes(this.$route.params.id);
    },
    getImgUrl(pic) {
      if (pic.length < 1) {
        return require(`../../../../assets/img/noimage.jpg`);
      } else {
        return require(`../../../../server/uploads/${pic}`);
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 10em;
}
</style>
