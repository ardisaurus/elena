<template>
  <div>
    <h1 class="tabletitle">Subjects</h1>
    <AddSubject/>
    <Subjects/>
  </div>
</template>

<script>
import Subjects from "../../../components/polls/_id/Subjects";
import AddSubject from "../../../components/polls/_id/Addsubject";
export default {
  components: { Subjects, AddSubject },
  head() {
    return {
      title: "Subjects",
      meta: {
        hid: "description",
        name: "description",
        content: "hayooo"
      }
    };
  }
};
</script>

<style scoped>
.tabletitle {
  text-align: center;
  margin-bottom: 1rem;
}
</style>
