<template>
  <div v-if="turn==mashes.length && mashes.length!=0">
    <div v-bind:key="orderedSub._id" v-for="orderedSub in orderedSubs">
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
      subs: "mash/subs",
      mashes: "mash/mashes",
      turn: "mash/turn"
    }),
    orderedSubs: function() {
      return this.subs.slice().sort(function(a, b) {
        return b.point - a.point;
      });
    }
  },
  methods: {
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
