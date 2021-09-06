<template>
  <div>
    <v-sheet height="6vh" class="d-flex align-center">
      <v-toolbar-title>2021年 9月</v-toolbar-title>
    </v-sheet>
    <v-sheet height="94vh">
      <v-calendar v-model="value" :events="events" @change="fetchEvents"></v-calendar>
    </v-sheet>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  name: 'Calendar',
  data: () => ({
    value: new Date('2021/09/01'),
  }),
  computed: {
    ...mapGetters('events', ['events']),
  },
  methods: {
    ...mapActions('events', ['fetchEvents']),
  },
};
</script>
