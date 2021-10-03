import axios from 'axios';
import { serializeCalendar } from '../../functions/selializers';

const apiUrl = 'http://localhost:3000';

const state = {
  calendar: null,
  calendars: [],
};

const getters = {
  calendar: (state) => serializeCalendar(state.calendar),
  calendars: (state) => state.calendars.map((calendar) => serializeCalendar(calendar)),
};

const mutations = {
  appendCalendar: (state, calendar) => (state.calendars = [...state.calendars, calendar]),
  setCalendar: (state, calendar) => (state.calendars = calendar),
  setCalendars: (state, calendars) => (state.calendars = calendars),
};

const actions = {
  async createCalendar({ commit }, calendar) {
    const response = await axios.post(`${apiUrl}/calendars`, calendar);
    commit('appendCalendar', response.data);
  },
  async fetchCalendars({ commit }) {
    const response = await axios.get(`${apiUrl}/calendars`);
    commit('setCalendars', response.data);
  },
  async setCalendar({ commit }, calendar) {
    commit('setCalendar', calendar);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
