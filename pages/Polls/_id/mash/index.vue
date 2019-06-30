<template>
  <div id="app">
    <div class="content">
      <Mashes
        v-if="turn<mashes.length"
        v-bind:mashes="mashes"
        v-bind:turn="turn"
        v-on:selectA="selectA"
        v-on:selectB="selectB"
      />
      <Subs v-if="turn==mashes.length && mashes.length!=0" v-bind:orderedSubs="orderedSubs"/>
    </div>
  </div>
</template>

<script>
import Mashes from "../../../../components/polls/_id/mashes/Mashes";
import Subs from "../../../../components/polls/_id/mashes/Subs";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {
    Mashes,
    Subs
  },
  created() {
    this.fetchSubs(this.$route.params.id);
    this.fetchMashes(this.$route.params.id);
  },
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
    ...mapActions({
      fetchSubs: "mash/fetchSubs",
      fetchMashes: "mash/fetchMashes",
      selectAn: "mash/selectA",
      selectBn: "mash/selectB"
    }),
    selectA(index) {
      // this.turn++;
      // const indexa = this.subs.findIndex(
      //   subject => subject._id == this.mashes[index].subjecta._id
      // );
      // const indexb = this.subs.findIndex(
      //   subject => subject._id == this.mashes[index].subjectb._id
      // );
      // var eloVal = eloRating(
      //   this.subs[indexa].point,
      //   this.subs[indexb].point,
      //   30,
      //   true
      // );
      // this.subs[indexa].point = eloVal[0];
      // this.subs[indexb].point = eloVal[1];
      this.selectAn(index);
    },
    selectB(index) {
      // this.turn++;
      // const indexa = this.subs.findIndex(
      //   subject => subject._id == this.mashes[index].subjecta._id
      // );
      // const indexb = this.subs.findIndex(
      //   subject => subject._id == this.mashes[index].subjectb._id
      // );
      // var eloVal = eloRating(
      //   this.subs[indexa].point,
      //   this.subs[indexb].point,
      //   30,
      //   false
      // );
      // this.subs[indexa].point = eloVal[0];
      // this.subs[indexb].point = eloVal[1];
      this.selectBn(index);
    }
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

