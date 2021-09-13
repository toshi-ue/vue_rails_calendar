import axios from 'axios';
import { serializeEvent } from '../../functions/selializers';

const apiUrl = 'http://localhost:3000';

const state = {
  events: [],
  event: null,
  isEditMode: false,
};

const getters = {
  events: (state) => state.events.map((event) => serializeEvent(event)),
  event: (state) => serializeEvent(state.event),
  isEditMode: (state) => state.isEditMode,
};

const mutations = {
  appendEvent: (state, event) => (state.events = [...state.events, event]),
  setEditMode: (state, bool) => (state.isEditMode = bool),
  setEvent: (state, event) => (state.event = event),
  setEvents: (state, events) => (state.events = events),
};

const actions = {
  async createEvent({ commit }, event) {
    const response = await axios.post(`${apiUrl}/events`, event);
    commit('appendEvent', response.data);
  },
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data);
  },
  setEvent({ commit }, event) {
    commit('setEvent', event);
  },
  setEditMode({ commit }, bool) {
    commit('setEditMode', bool);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
