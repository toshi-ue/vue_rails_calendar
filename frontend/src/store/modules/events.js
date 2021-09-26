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
  removeEvent: (state, event) => (state.events = state.events.filter((e) => e.id !== event.id)),
  resetEvent: (state) => (state.event = null),
  setEditMode: (state, bool) => (state.isEditMode = bool),
  setEvent: (state, event) => (state.event = event),
  setEvents: (state, events) => (state.events = events),
  updateEvent: (state, event) => (state.events = state.events.map((e) => (e.id === event.id ? event : e))),
};

const actions = {
  async createEvent({ commit }, event) {
    const response = await axios.post(`${apiUrl}/events`, event);
    commit('appendEvent', response.data);
  },
  async deleteEvent({ commit }, id) {
    const response = await axios.delete(`${apiUrl}/events/${id}`);
    commit('removeEvent', response.data);
    commit('resetEvent');
  },
  async fetchEvents({ commit }) {
    const response = await axios.get(`${apiUrl}/events`);
    commit('setEvents', response.data);
  },
  async updateEvent({ commit }, event) {
    const response = await axios.put(`${apiUrl}/events/${event.id}`, event);
    commit('updateEvent', response.data);
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
