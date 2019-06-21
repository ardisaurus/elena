<template>
  <div>
    <div class="subb" v-on:click="$emit('selectA', index)">
      <p>{{mash.subjecta.subjectName}}</p>
      <img style="width:200px" :src="getImgUrl(mash.subjecta.images)">
    </div>
    <div class="suba" v-on:click="$emit('selectB', index)">
      <p>{{mash.subjectb.subjectName}}</p>
      <img style="width:200px" :src="getImgUrl(mash.subjectb.images)">
    </div>
  </div>
</template>

<script scoped>
export default {
  name: "MashItem",
  props: ["mash"],
  methods: {
    getImgUrl(pic) {
      return require(`../../../../server/uploads/${pic}`);
    }
  }
};
</script>
<style scoped>
.suba {
  float: right;
}
.subb {
  float: left;
}
</style>
