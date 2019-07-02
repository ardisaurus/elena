<template>
  <div>
    <table>
      <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="poll in polls" :key="poll._id">
          <td scope="row">{{ poll._id }}</td>
          <td v-if="poll._id!=markedId">{{ poll.pollName }}</td>
          <td v-if="poll._id==markedId">
            <input type="text" name="name" v-model="newData">
          </td>
          <td v-if="poll._id!=markedId">
            <button @click="deletePoll(poll._id)">Delete</button>
            <button @click="marking(poll._id, poll.pollName)">Edit</button>
            <nuxt-link :to="'polls/'+poll._id" class="btn">Subject</nuxt-link>
            <nuxt-link :to="`polls/${poll._id}/mash`" class="btn">Mash</nuxt-link>
          </td>
          <td v-if="poll._id==markedId">
            <button @click="update">Save</button>
            <button @click="marking(poll._id, poll.pollName)">Cancel</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Polls",
  data() {
    return {
      markedId: "",
      newData: ""
    };
  },
  computed: mapGetters({
    polls: "polls/polls"
  }),
  methods: {
    ...mapActions({
      fetchPolls: "polls/fetchPolls",
      deletePoll: "polls/deletePoll",
      updatePoll: "polls/updatePoll"
    }),
    marking(_id, name) {
      if (this.markedId == _id) {
        this.markedId = "";
        this.newData = "";
      } else {
        this.markedId = _id;
        this.newData = name;
      }
    },
    update(e) {
      e.preventDefault();
      const updPoll = {
        _id: this.markedId,
        pollName: this.newData
      };
      this.updatePoll(updPoll);
      this.markedId = "";
      this.newData = "";
    }
  },
  created() {
    this.fetchPolls();
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
.btn {
  background-color: #41b883;
  border-radius: 5px;
  color: white;
  padding: 0.5em;
  text-decoration: none;
}
</style>
