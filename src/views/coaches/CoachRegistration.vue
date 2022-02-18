<template>
  <section>
    <base-card>
    <h2>Register as a coach now!</h2>
    <coach-form  @save-data='saveData'/>
    </base-card>
  </section>

</template>

<script>
import { mapActions } from 'vuex';
import CoachForm from '../../components/coaches/CoachForm';
export default {
  name: 'CoachRegistration',
  components: { CoachForm },
  methods: {

    saveData(data) {
      this.registerCoach(data);
      console.log("Register");
      this.$router.replace('/coaches');
    },
    ...mapActions('coachesModule', {registerCoach: 'registerCoach'}),
  },


};
</script>

<style scoped>

</style>