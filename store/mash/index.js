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
  turn: 0
});

export const getters = {
  mashes(state) {
    return state.mashes;
  },
  subs(state) {
    return state.subs;
  },
  turn(state) {
    return state.turn;
  }
};

export const actions = {
  async fetchSubs({ commit }, id) {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/polls/subject/${id}`
    );
    commit("setSubs", response.data.map(obj => ({ ...obj, point: 1400 })));
  },
  async fetchMashes({ commit }, id) {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/polls/subject/mashes/${id}`
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
  }
};

export const mutations = {
  setSubs: (state, subs) => (state.subs = subs),
  setMashes: (state, mashes) => (state.mashes = mashes),
  updatePoints: (state, payload) => {
    state.turn++;
    state.subs[payload.indexa].point = payload.eloVal[0];
    state.subs[payload.indexb].point = payload.eloVal[1];
  }
};
