<template>
  <div>
    <p v-if="mashes.length<1">Add more subject</p>
    <div v-if="turn<mashes.length">
      {{turn+1}}/{{mashes.length}}
      <div v-bind:key="index" v-for="(mash, index) in mashes">
        <transition mode="out-in">
          <table v-if="index==turn">
            <tr style="text-align:center">
              <td>
                <div v-on:click="selectA(index)">
                  <p>{{mash.subjecta.subjectName}}</p>
                  <img style="width:200px" :src="getImgUrl(mash.subjecta.images)">
                </div>
              </td>
              <td>
                <div v-on:click="selectB(index)">
                  <p>{{mash.subjectb.subjectName}}</p>
                  <img style="width:200px" :src="getImgUrl(mash.subjectb.images)">
                </div>
              </td>
            </tr>
          </table>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Mashes",
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
      selectAn: "mash/selectA",
      selectBn: "mash/selectB",
      saveResult: "mash/saveResult"
    }),
    selectA(index) {
      this.selectAn(index);
      if (this.turn == this.mashes.length) {
        for (let index = 0; index < this.orderedSubs.length; index++) {
          let payload = {
            pollId: this.$route.params.id,
            subs: { ...this.orderedSubs[index], subjectRank: index }
          };
          this.saveResult(payload);
        }
      }
    },
    selectB(index) {
      this.selectBn(index);
      if (this.turn == this.mashes.length) {
        for (let index = 0; index < this.orderedSubs.length; index++) {
          let payload = {
            pollId: this.$route.params.id,
            subs: { ...this.orderedSubs[index], subjectRank: index }
          };
          this.saveResult(payload);
        }
      }
    },
    getImgUrl(pic) {
      if (pic.length < 1) {
        return require(`../../../../assets/img/noimage.jpg`);
      } else {
        try {
          return require(`../../../../server/uploads/${pic}`);
        } catch (error) {
          return require(`../../../../assets/img/noimage.jpg`);
        }
      }
    }
  }
};
</script>
<style scoped>
table {
  margin: 0 auto;
}
.v-enter {
  opacity: 0;
}
.v-enter-active {
  transition: opacity 2s;
}
.v-enter-to {
  opacity: 1;
}
</style>

