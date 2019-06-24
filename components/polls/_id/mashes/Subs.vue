<template>
  <div class="ranking">
    <div v-bind:key="orderedSub._id" v-for="orderedSub in orderedSubs">
      <p>
        <img v-bind:src="getImgUrl(orderedSub.images)">
        {{orderedSub.subjectName}}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Subs",
  methods: {
    getImgUrl(pic) {
      if (pic.length < 1) {
        return require(`../../../../assets/img/noimage.jpg`);
      } else {
        return require(`../../../../server/uploads/${pic}`);
      }
    }
  },
  props: ["orderedSubs"]
};
</script>

<style scoped>
img {
  width: 10em;
}
</style>
