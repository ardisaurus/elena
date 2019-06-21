<template>
  <div>
    {{turn+1}}/{{mashes.length}}
    <div v-bind:key="index" v-for="(mash, index) in mashes">
      <transition mode="out-in">
        <MashItem
          v-if="index == turn"
          v-bind:mash="mash"
          v-bind:index="index"
          v-on:selectA="$emit('selectA', index)"
          v-on:selectB="$emit('selectB', index)"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import MashItem from "./MashItem.vue";
export default {
  name: "Mashes",
  components: {
    MashItem
  },
  props: ["mashes", "turn"],
  created() {
    for (var i = this.mashes.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = this.mashes[i];
      this.mashes[i] = this.mashes[j];
      this.mashes[j] = temp;
    }
  }
};
</script>
<style scoped>
/* .v-leave {
  opacity: 1;
}
.v-leave-active {
  transition: opacity 2s;
}
.v-leave-to {
  opacity: 0;
} */
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

