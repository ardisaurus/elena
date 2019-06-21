<template>
  <div id="app">
    <div class="content">
      <Mashes
        v-if="turn<mashes.length"
        v-bind:mashes="mashes"
        v-bind:turn="turn"
        v-on:selectA="selectA"
        v-on:selectB="selectB"
      />
      <transition name="slide-fade">
        <Subs class="ranking" v-if="turn==mashes.length" v-bind:orderedSubs="orderedSubs"/>
      </transition>
    </div>
  </div>
</template>

<script>
import Mashes from "../../../../components/polls/_id/mashes/Mashes";
import Subs from "../../../../components/polls/_id/mashes/Subs";
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
export default {
  name: "App",
  components: {
    Mashes,
    Subs
  },
  data() {
    return {
      mashes: [],
      subs: [],
      turn: 0,
      val: eloRating(1200, 1000, 30, true)
    };
  },
  beforeMount() {
    axios
      .get(`http://127.0.0.1:3000/api/polls/subject/${this.$route.params.id}`)
      .then(res => (this.subs = res.data.map(obj => ({ ...obj, point: 1400 }))))
      // eslint-disable-next-line
      .catch(err => console.log(err));
    axios
      .get(
        `http://127.0.0.1:3000/api/polls/subject/mashes/${
          this.$route.params.id
        }`
      )
      .then(res => (this.mashes = res.data))
      // eslint-disable-next-line
      .catch(err => console.log(err));
  },
  computed: {
    orderedSubs: function() {
      return this.subs.slice().sort(function(a, b) {
        return b.point - a.point;
      });
    }
  },
  methods: {
    selectA(index) {
      this.turn++;
      let poina = 0;
      let poinb = 0;
      for (let i = 0; i < this.subs.length; i++) {
        if (this.subs[i]._id == this.mashes[index].subjecta._id) {
          poina = this.subs[i].point;
        }
        if (this.subs[i]._id == this.mashes[index].subjectb._id) {
          poinb = this.subs[i].point;
        }
      }
      var eloVal = eloRating(poina, poinb, 30, true);
      for (let i = 0; i < this.subs.length; i++) {
        if (this.subs[i]._id == this.mashes[index].subjecta._id) {
          this.subs[i].point = eloVal[0];
        }
        if (this.subs[i]._id == this.mashes[index].subjectb._id) {
          this.subs[i].point = eloVal[1];
        }
      }
    },
    selectB(index) {
      this.turn++;
      let poina = 0;
      let poinb = 0;
      for (let i = 0; i < this.subs.length; i++) {
        if (this.subs[i]._id == this.mashes[index].subjecta._id) {
          poina = this.subs[i].point;
        }
        if (this.subs[i]._id == this.mashes[index].subjectb._id) {
          poinb = this.subs[i].point;
        }
      }
      var eloVal = eloRating(poina, poinb, 30, false);
      for (let i = 0; i < this.subs.length; i++) {
        if (this.subs[i]._id == this.mashes[index].subjecta._id) {
          this.subs[i].point = eloVal[0];
        }
        if (this.subs[i]._id == this.mashes[index].subjectb._id) {
          this.subs[i].point = eloVal[1];
        }
      }
    }
  }
};
</script>
<style>
.ranking {
  text-align: center;
}
.slide-fade-enter-active {
  transition: all 0.5s ease;
}
.slide-fade-enter {
  opacity: 0;
}
</style>

