<template>
  <div class="ranking">
    <div v-bind:key="orderedSub._id" v-for="orderedSub in orderedSubs">
      <SubItem v-bind:orderedSub="orderedSub"/>
    </div>
  </div>
</template>

<script>
import SubItem from "./SubItem.vue";
export default {
  name: "Subs",
  components: {
    SubItem
  },
  props: ["orderedSubs"]
};
</script>

