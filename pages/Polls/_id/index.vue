<template>
  <div>
    <h3>Subjects</h3>
    <AddSubject/>
    <Subjects/>
  </div>
</template>

<script>
import Subjects from "../../../components/polls/_id/Subjects";
import AddSubject from "../../../components/polls/_id/Addsubject";
export default {
  components: { Subjects, AddSubject }
};
</script>

<style>
</style>
