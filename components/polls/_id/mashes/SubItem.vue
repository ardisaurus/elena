<template>
  <div>
    <p>
      <img v-bind:src="getImgUrl(orderedSub.images)">
      {{orderedSub.subjectName}}
    </p>
  </div>
</template>

<script>
export default {
  name: "SubItem",
  props: ["orderedSub"],
  methods: {
    getImgUrl(pic) {
      return require(`../../../../server/uploads/${pic}`);
    }
  }
};
</script>
<style scoped>
img {
  width: 10em;
  height: 10em;
  border-radius: 50%;
}
</style>
