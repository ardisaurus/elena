<template>
  <div class="file">
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <input type="file" id="file" ref="file" @change="onSelect">
      </div>
      <div class="fields">
        <button>Submit</button>
      </div>
      <div class="message">{{message}}</div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FileUpload",
  props: ["subject"],
  data() {
    return {
      file: "",
      message: ""
    };
  },
  methods: {
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
      const file = this.$refs.file.files[0];
      this.file = file;
      if (!allowedTypes.includes(file.type)) {
        this.message = "Filetype is wrong!!";
      }
      if (file.size > 2000000) {
        this.message = "Too large, max size allowed is 2MB";
      }
    },
    async onSubmit() {
      const host = process.env.HOST || "127.0.0.1";
      const port = process.env.PORT || 3000;
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("subjectId", this.subject._id);
      formData.append("pollsId", this.$route.params.id);
      try {
        const response = await axios.post(
          `http://${host}:${port}/api/polls/upload/`,
          formData
        );
        this.message = "Upload Success";
      } catch (err) {
        console.log(err);
        this.message = err.response.data.error;
      }
    }
  }
};
</script>
