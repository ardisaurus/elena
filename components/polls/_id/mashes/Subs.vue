<template>
  <div>
    <div v-bind:key="orderedSub._id" v-for="orderedSub in orderedSubs">
      <img v-bind:src="getImgUrl(orderedSub.images)">
      <p>{{orderedSub.subjectName}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Subs",
  props: ["orderedSubs"],
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
