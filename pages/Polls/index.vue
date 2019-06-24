<template>
  <div>
    <h3>Polls</h3>
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

<style>
</style>
