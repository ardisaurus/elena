const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
import axios from "axios";
export const state = () => ({
  polls: [],
  subjects: []
});

export const getters = {
  polls(state) {
    return state.polls;
  },
  subjects(state) {
    return state.subjects;
  }
};

export const actions = {
  async fetchPolls({ commit }) {
    const response = await axios.get(`http://${host}:${port}/api/polls`);
    commit("setPolls", response.data);
  },
  async fetchSubjects({ commit }, pollId) {
    const response = await axios.get(
      `http://${host}:${port}/api/polls/subject/${pollId}`
    );
    commit("setSubjects", response.data);
  },
  async addPoll({ commit }, pollName) {
    const response = await axios.post(`http://${host}:${port}/api/polls`, {
      pollName
    });
    commit("newPoll", response.data);
  },
  async addSubject({ commit }, payload) {
    const response = await axios.post(
      `http://${host}:${port}/api/polls/subject/${payload.pollId}`,
      {
        subjectName: payload.subjectName,
        images: "",
        description: payload.description
      }
    );
    commit("newSubject", response.data);
  },
  async deletePoll({ commit }, _id) {
    await axios.delete(`http://${host}:${port}/api/polls/${_id}`);
    commit("removePoll", _id);
  },
  async deleteSubject({ commit }, payload) {
    await axios.delete(
      `http://${host}:${port}/api/polls/subject/${payload.pollsId}/delete/${
        payload.subjectId
      }`
    );
    commit("removeSubject", payload.subjectId);
  },
  async updatePoll({ commit }, updPoll) {
    const response = await axios.put(
      `http://${host}:${port}/api/polls/${updPoll._id}`,
      updPoll
    );
    commit("updatePoll", response.data);
  },
  async updateSubject({ commit }, payload) {
    const response = await axios.put(
      `http://${host}:${port}/api/polls/subject/${payload.pollsId}/put/${
        payload.subjectId
      }`,
      { subjectName: payload.subjectName, description: payload.description }
    );
    commit("updateSubject", response.data);
  }
};
export const mutations = {
  setPolls: (state, polls) => (state.polls = polls),
  newPoll: (state, poll) => state.polls.unshift(poll),
  removePoll: (state, _id) =>
    (state.polls = state.polls.filter(poll => poll._id !== _id)),
  updatePoll: (state, updPoll) => {
    const index = state.polls.findIndex(poll => poll._id == updPoll._id);
    if (index !== -1) {
      state.polls.splice(index, 1, updPoll);
    }
  },
  setSubjects: (state, subjects) => (state.subjects = subjects),
  newSubject: (state, subject) => state.subjects.unshift(subject),
  removeSubject: (state, _id) =>
    (state.subjects = state.subjects.filter(subject => subject._id !== _id)),
  updateSubject: (state, updSubject) => {
    const index = state.subjects.findIndex(
      subject => subject._id == updSubject._id
    );
    if (index !== -1) {
      state.subjects.splice(index, 1, updSubject);
    }
  }
};
