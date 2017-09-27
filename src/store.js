import Vuex from "vuex";
import Vue from "vue";
import {mutations} from "./models/constants";
import storage from "./storage";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    babyName: '陈崭岩',
    count: 0,
    records: [],
    ongoingTask: {},
  },

  mutations: {
    [mutations.ADD_RECORD] (state, record) {
      state.records.push(record);
    },

    [mutations.REMOVE_RECORD] (state, record) {
      if (!record || !record.id) return;
      let deletedIndex = state.records.map(item=>item.id).indexOf(record.id);
      state.records.splice(deletedIndex, 1);
    },

    [mutations.SET_RECORDS] (state, records) {
      state.records = records;
    },

    [mutations.SET_ONGOING_TASK] (state, record) {
      state.ongoingTask = record;
    },

    [mutations.BABY_RENAME] (state, name) {
      state.babyName = name;
    },

    [mutations.SAVE_ALL] (state) {
      storage.save(state);
    }
  }
});