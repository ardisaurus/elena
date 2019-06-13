<template>
  <div class="file">
    <form @submit.prevent="onSubmit" enctype="multipart/form-data">
      <div class="fields">
        <label>Upload File</label>
        <br>
        <input type="file" ref="file" @change="onSelect">
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
      if (file.size > 500000) {
        this.message = "Too large, max size allowed is 500kb";
      }
    },
    async onSubmit() {
      const formData = new FormData();
      formData.append("file", this.file);
      formData.append("subjectId", "5cfd2a04194cf724d7b5ef4e");
      formData.append("pollsId", "5cfa3d60a58c39298251baa9");
      try {
        const response = await axios.post(
          "http://localhost:3000/api/polls/upload/",
          formData
        );
        this.message = response.data;
      } catch (err) {
        console.log(err);
        this.message = err.response.data.error;
      }
    }
  }
};
</script>
