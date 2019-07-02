<template>
  <div>
    <h1 class="tabletitle">Polls</h1>
    <Addpoll/>
    <Polls/>
  </div>
</template>

<script>
import Addpoll from "../../components/polls/Addpoll";
import Polls from "../../components/polls/Polls";
export default {
  components: { Polls, Addpoll },
  head() {
    return {
      title: "Polls",
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
