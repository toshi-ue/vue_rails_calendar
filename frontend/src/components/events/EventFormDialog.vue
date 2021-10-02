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
        <div v-show="!allDay">
          <TimeForm v-model="startTime" />
        </div>
        <span class="px-2">-</span>
        <DateForm v-model="endDate" :isError="isInvalidDatetime" />
        <div v-show="!allDay">
          <TimeForm v-model="endTime" :isError="isInvalidDatetime" />
        </div>
      </DialogSection>
      <DialogSection>
        <CheckBox v-model="allDay" label="終日" class="ma-0 pa-0" />
      </DialogSection>
      <DialogSection icon="mdi-card-text-outline">
        <TextForm v-model="description" />
      </DialogSection>
      <DialogSection icon="mdi-calendar">
        <CalendarSelectForm :value="calendar" @input="changeCalendar($event)" />
      </DialogSection>
      <DialogSection icon="mdi-palette">
        <ColorForm v-model="color" />
      </DialogSection>
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn @click="cancel">キャンセル</v-btn>
      <v-btn :disabled="isInvalid" @click="submit">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import { isGreaterEndThanStart } from '../../functions/datetime';

import CalendarSelectForm from '../forms/CalendarSelectForm';
import CheckBox from '../forms/CheckBox';
import ColorForm from '../forms/ColorForm';
import DialogSection from '../layouts/DialogSection';
import DateForm from '../forms/DateForm';
import TimeForm from '../forms/TimeForm';
import TextForm from '../forms/TextForm';

export default {
  name: 'EventFormDialog',
  mixins: [validationMixin],
  components: {
    CalendarSelectForm,
    CheckBox,
    ColorForm,
    DialogSection,
    DateForm,
    TimeForm,
    TextForm,
  },
  data: () => ({
    allDay: false,
    calendar: null,
    color: '',
    description: '',
    endDate: null,
    endTime: null,
    name: '',
    startDate: null,
    startTime: null,
  }),
  validations: {
    calendar: { required },
    name: { required },
    startDate: { required },
    endDate: { required },
  },
  computed: {
    ...mapGetters('events', ['event']),
    isInvalid() {
      return this.$v.$invalid || this.isInvalidDatetime;
    },
    isInvalidDatetime() {
      return !isGreaterEndThanStart(this.startDate, this.startTime, this.endDate, this.endDate, this.endTime, this.allDay);
    },
  },
  created() {
    this.allDay = this.event.allDay;
    this.calendar = this.event.calendar;
    this.color = this.event.color;
    this.description = this.event.description;
    this.endDate = this.event.endDate;
    this.endTime = this.event.endTime;
    this.name = this.event.name;
    this.startDate = this.event.startDate;
    this.startTime = this.event.startTime;
  },
  methods: {
    ...mapActions('events', ['setEvent', 'setEditMode', 'createEvent', 'updateEvent']),
    cancel() {
      this.setEditMode(false);
      if (!this.event.id) {
        this.setEvent(null);
      }
    },
    changeCalendar(calendar) {
      this.color = calendar.color;
      this.calendar = calendar;
    },
    closeDialog() {
      this.setEditMode(false);
      this.setEvent(null);
    },
    submit() {
      if (this.isInvalid) {
        return;
      }
      const params = {
        ...this.event,
        calendar_id: this.calendar.id,
        color: this.color,
        description: this.description,
        end: `${this.endDate} ${this.endTime || ''}`,
        name: this.name,
        start: `${this.startDate} ${this.startTime || ''}`,
        timed: !this.allDay,
      };
      if (params.id) {
        this.updateEvent(params);
      } else {
        this.createEvent(params);
      }
      this.closeDialog();
    },
  },
};
</script>
