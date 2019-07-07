<template>
  <div>
    <div class="add">
      <form @submit="onSubmit">
        <input type="text" v-model="subjectName" name="subjectName" placeholder="Add Subject...">
        <input
          type="text"
          v-model="description"
          name="description"
          placeholder="Add description..."
        >
        <input type="submit" value="Submit">
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "AddSubject",
  data() {
    return {
      subjectName: "",
      description: ""
    };
  },
  methods: {
    ...mapActions({
      addSubject: "polls/addSubject"
    }),
    onSubmit(e) {
      const payload = {
        pollId: this.$route.params.id,
        subjectName: this.subjectName,
        description: this.description
      };
      e.preventDefault();
      this.addSubject(payload);
      this.subjectName = "";
      this.description = "";
    }
  }
};
</script>

<style scoped>
form {
  display: flex;
}
input[type="text"] {
  flex: 10;
  padding: 10px;
  border: 1px solid #41b883;
  outline: 0;
}
input[type="submit"] {
  flex: 2;
  background: #41b883;
  color: #fff;
  border: 1px #41b883 solid;
  cursor: pointer;
}
input[type="submit"]:hover {
  background-color: #055e36;
  color: white;
  padding: 0.5em;
  text-decoration: none;
}
</style>
