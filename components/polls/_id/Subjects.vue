<template>
  <div>
    <table>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Description</th>
          <th scope="col">Images</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="subject in subjects" :key="subject._id">
          <td scope="row">{{ subject._id }}</td>
          <td v-if="subject._id!=markedId">{{ subject.subjectName }}</td>
          <td v-if="subject._id==markedId">
            <input type="text" name="name" v-model="subjectName">
          </td>
          <td v-if="subject._id!=markedId">{{ subject.description }}</td>
          <td v-if="subject._id==markedId">
            <input type="text" name="description" v-model="description">
          </td>
          <td style="text-align: center;">
            <img
              v-if="subject._id!=markedId && subject.images.length<1 || subject.images.length>0"
              :src="getImgUrl(subject.images)"
              v-bind:alt="subject.images"
            >
            <button
              v-if="subject._id==markedId && subject.images.length>0"
              @click="removeImage"
            >Remove</button>
            <file-upload
              v-if="subject._id==markedId && subject.images.length<1"
              :subject="subject"
            />
          </td>
          <td v-if="subject._id!=markedId">
            <button @click="deleteClick(subject._id)">Delete</button>
            <button
              @click="marking(subject._id, subject.subjectName, subject.images, subject.description)"
            >Edit</button>
          </td>
          <td v-if="subject._id==markedId">
            <button
              @click="update"
              v-if="subject.subjectName!=subjectName||subject.description!=description"
            >Save</button>
            <button @click="marking(subject._id, subject.subjectName)">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import FileUpload from "../../polls/_id/Upload";
import { mapActions, mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "Subjects",
  components: {
    FileUpload
  },
  data() {
    return {
      markedId: "",
      subjectName: "",
      images: "",
      description: ""
    };
  },
  computed: {
    ...mapGetters({
      subjects: "polls/subjects"
    })
  },
  methods: {
    ...mapActions({
      fetchSubjects: "polls/fetchSubjects",
      deleteSubject: "polls/deleteSubject",
      updateSubject: "polls/updateSubject",
      removeImageSubject: "polls/removeImageSubject"
    }),
    marking(_id, name, images, description) {
      if (this.markedId == _id) {
        this.markedId = "";
        this.subjectName = "";
        this.images = "";
        this.description = "";
      } else {
        this.markedId = _id;
        this.subjectName = name;
        this.images = images;
        this.description = description;
      }
    },
    deleteClick(subjectId) {
      const payload = { pollsId: this.$route.params.id, subjectId };
      this.deleteSubject(payload);
    },
    update(e) {
      e.preventDefault();
      const payload = {
        pollsId: this.$route.params.id,
        subjectId: this.markedId,
        subjectName: this.subjectName,
        images: this.images,
        description: this.description
      };
      this.updateSubject(payload);
      this.markedId = "";
      this.subjectName = "";
      this.images = "";
      this.description = "";
    },
    getImgUrl(pic) {
      if (pic.length < 1) {
        return require(`../../../assets/img/noimage.jpg`);
      } else {
        return require(`../../../server/uploads/${pic}`);
      }
    },
    update(e) {
      e.preventDefault();
      const payload = {
        pollsId: this.$route.params.id,
        subjectId: this.markedId,
        subjectName: this.subjectName,
        images: this.images,
        description: this.description
      };
      this.updateSubject(payload);
      this.markedId = "";
      this.subjectName = "";
      this.images = "";
      this.description = "";
    },
    removeImage(e) {
      e.preventDefault();
      const payload = {
        pollsId: this.$route.params.id,
        subjectId: this.markedId
      };
      this.removeImageSubject(payload);
      this.markedId = "";
      this.subjectName = "";
      this.images = "";
      this.description = "";
    }
  },
  async created() {
    const host = process.env.HOST || "127.0.0.1";
    const port = process.env.PORT || 3000;
    const response = await axios.get(
      `http://${host}:${port}/api/polls/check/${this.$route.params.id}`
    );
    if (response.data.status) {
      this.fetchSubjects(this.$route.params.id);
    } else {
      this.$router.push({ path: "/polls" });
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  margin: 10px auto;
}

caption {
  font-size: 1.6em;
  font-weight: 400;
  padding: 10px 0;
}

thead th {
  font-weight: 400;
  background: #41b883;
  color: #fff;
}

tr {
  background: #f4f7f8;
  border-bottom: 1px solid #fff;
  margin-bottom: 5px;
}

tr:nth-child(even) {
  background: #e8eeef;
}

th,
td {
  text-align: left;
  padding: 20px;
  font-weight: 300;
}
img {
  width: 100px;
}
</style>
