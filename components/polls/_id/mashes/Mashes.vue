<template>
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
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Mashes",
  mounted() {
    for (var i = this.mashes.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.mashes[i];
      this.mashes[i] = this.mashes[j];
      this.mashes[j] = temp;
    }
  },
  computed: {
    ...mapGetters({
      subs: "mash/subs",
      mashes: "mash/mashes",
      turn: "mash/turn"
    })
  },
  methods: {
    ...mapActions({
      selectAn: "mash/selectA",
      selectBn: "mash/selectB"
    }),
    selectA(index) {
      this.selectAn(index);
    },
    selectB(index) {
      this.selectBn(index);
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

