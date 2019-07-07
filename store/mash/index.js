const host = process.env.HOST || "127.0.0.1";
const port = process.env.PORT || 3000;
import axios from "axios";

var probability = function(rating1, rating2) {
  return (1.0 * 1.0) / (1 + 1.0 * 10 ** ((1.0 * (rating1 - rating2)) / 400));
};

var eloRating = function(Ra, Rb, K, d) {
  let Pb = probability(Ra, Rb);
  let Pa = probability(Rb, Ra);
  if (d == true) {
    Ra = Ra + K * (1 - Pa);
    Rb = Rb + K * (0 - Pb);
  } else {
    Ra = Ra + K * (0 - Pa);
    Rb = Rb + K * (1 - Pb);
  }
  var val = [Ra, Rb];
  return val;
};

export const state = () => ({
  mashes: [],
  subs: [],
  rank: [],
  turn: 0
});

export const getters = {
  mashes(state) {
    return state.mashes;
  },
  subs(state) {
    return state.subs;
  },
  rank(state) {
    return state.rank;
  },
  turn(state) {
    return state.turn;
  }
};

export const actions = {
  async resetTurn({ commit }) {
    commit("resetTurn");
  },
  async checkRank({ commit }, id) {
    const response = await axios.get(
      `http://${host}:${port}/api/polls/rank/${id}`
    );
    if (response.data.length > 0) {
      commit("fullRank", response.data.length);
    }
  },
  async fetchRank({ commit }, id) {
    const response = await axios.get(
      `http://${host}:${port}/api/polls/rank/${id}`
    );
    commit("setRank", response.data);
  },
  async fetchSubs({ commit }, id) {
    const response = await axios.get(
      `http://${host}:${port}/api/polls/subject/${id}`
    );
    commit("setSubs", response.data.map(obj => ({ ...obj, point: 1400 })));
  },
  async fetchMashes({ commit }, id) {
    const response = await axios.get(
      `http://${host}:${port}/api/polls/subject/mashes/${id}`
    );
    commit("setMashes", response.data);
  },
  async selectA({ commit, state }, index) {
    const indexa = state.subs.findIndex(
      subject => subject._id == state.mashes[index].subjecta._id
    );
    const indexb = state.subs.findIndex(
      subject => subject._id == state.mashes[index].subjectb._id
    );
    var eloVal = eloRating(
      state.subs[indexa].point,
      state.subs[indexb].point,
      30,
      true
    );
    let payload = { indexa, indexb, eloVal };
    commit("updatePoints", payload);
  },
  async selectB({ commit, state }, index) {
    const indexa = state.subs.findIndex(
      subject => subject._id == state.mashes[index].subjecta._id
    );
    const indexb = state.subs.findIndex(
      subject => subject._id == state.mashes[index].subjectb._id
    );
    var eloVal = eloRating(
      state.subs[indexa].point,
      state.subs[indexb].point,
      30,
      false
    );
    let payload = { indexa, indexb, eloVal };
    commit("updatePoints", payload);
  },
  async saveResult({ commit }, payload) {
    await axios.post(
      `http://${host}:${port}/api/polls/rank/${payload.pollId}`,
      {
        subjectName: payload.subs.subjectName,
        images: payload.subs.images,
        subjectRank: payload.subs.subjectRank,
        description: payload.subs.description
      }
    );
  },
  async resetRank({ commit }, payload) {
    await axios.delete(`http://${host}:${port}/api/polls/rank/${payload}`);
  }
};

export const mutations = {
  resetTurn: state => (state.turn = 0),
  fullRank: (state, length) => (state.turn = length),
  setSubs: (state, subs) => (state.subs = subs),
  setRank: (state, rank) => (state.rank = rank),
  setMashes: (state, mashes) => (state.mashes = mashes),
  updatePoints: (state, payload) => {
    state.turn++;
    state.subs[payload.indexa].point = payload.eloVal[0];
    state.subs[payload.indexb].point = payload.eloVal[1];
  }
};
