<template>
  <v-card class="py-12">
    <v-card-text>
      <DialogSection icon="mdi-square" :color="color">
        <v-text-field v-model="name" label="カレンダー名"></v-text-field>
      </DialogSection>
      <DialogSection icon="mdi-pallet">
        <ColorForm v-model="color" />
      </DialogSection>
    </v-card-text>
    <v-card-actions class="f-flex justify-end">
      <v-btn @click="close">キャンセル</v-btn>
      <v-btn @click="submit" :disabled="$v.$invalid">保存</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { validationMixin } from 'vuelidate';
import { required } from 'vuelidate/lib/validators';
import ColorForm from '../forms/ColorForm';
import DialogSection from '../layouts/DialogSection';

export default {
  name: 'CalendarFormDialog',
  components: {
    ColorForm,
    DialogSection,
  },
  data:()=>{
    name: '',
    color: null,
  },
  validations:{
    name: {required},
  },
  created(){
    this.color = this.calendar.color;
    this.name = this.calendar.name;
  }
  computed: {
    ...mapGetters('calendars', ['calendar']),
  },
  methods: {
    ...mapActions('calendars', ['createCalendar', 'setCalendar', '']),
    close(){
      this.setCalendar(null);
    },
    submit(){
      if(this.$v.$invalid){
        return;
      }
      const params = {
        ...this.calendar,
        color: this.color,
        name: this.name,
      };
      this.createCalendar(params);
      this.close();
    }
  },
};
</script>
