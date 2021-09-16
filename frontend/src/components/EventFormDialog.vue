<template>
  <v-card class="pb-12">
    <v-card-actions class="d-flex justify-end pa-2">
      <v-btn icon @click="closeDialog">
        <v-icon size="20px">mdi-close</v-icon>
      </v-btn>
    </v-card-actions>
    <v-card-text>
      <DialogSection icon="mdi-square" :color="color">
        <v-text-field v-model="name" label="タイトル"></v-text-field>
      </DialogSection>
      <DialogSection icon="mdi-clock-outline">
        <DateForm v-model="startDate" />
        <TimeForm v-model="startTime" />
        <DateForm v-model="endDate" />
        <TimeForm v-model="endTime" />
      </DialogSection>
      <DialogSection icon="mdi-card-text-outline">
        <TextForm v-model="description" />
      </DialogSection>
      <DialogSection icon="mdi-palette">
        <ColorForm v-model="color" />
      </DialogSection>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="submit">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import ColorForm from './ColorForm';
import DialogSection from './DialogSection';
import DateForm from './DateForm';
import TimeForm from './TimeForm';
import TextForm from './TextForm';

export default {
  name: 'EventFormDialog',
  components: {
    ColorForm,
    DialogSection,
    DateForm,
    TimeForm,
    TextForm,
  },
  data: () => ({
    color: '',
    description: '',
    endDate: null,
    endTime: null,
    name: '',
    startDate: null,
    startTime: null,
  }),
  computed: {
    ...mapGetters('events', ['event']),
  },
  created() {
    this.color = this.event.color;
    this.startDate = this.event.startDate;
    this.startTime = this.event.startTime;
    this.endDate = this.event.endDate;
    this.endTime = this.event.endTime;
  },
  methods: {
    ...mapActions('events', ['setEvent', 'setEditMode', 'createEvent']),
    closeDialog() {
      this.setEditMode(false);
      this.setEvent(null);
    },
    submit() {
      const params = {
        color: this.color,
        description: this.description,
        end: `${this.endDate} ${this.endTime || ''}`,
        name: this.name,
        start: `${this.startDate} ${this.startTime || ''}`,
      };
      this.createEvent(params);
      this.closeDialog();
    },
  },
};
</script>
