<template>
  <div>
    <section>FILTER</section>
    <base-card>
      <div class='controls'>
        <base-button mode='outline'>Refresh</base-button>
        <base-button link to='/register'>Register as a Coach</base-button>
      </div>
      <ul v-if='hasCoaches'>
        <coach-item
          v-for='coach in filteredCoaches'
          :key='coach.id'
          :id='coach.id'
          :firstName='coach.firstName'
          :lastName='coach.lastName'
          :rate='coach.hourlyRate'
          :areas='coach.areas'
        >
        </coach-item>
      </ul>
      <h3 v-else>No coaches found</h3>
    </base-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import CoachItem from '@/components/coaches/CoachItem';

export default {
  name: 'Coaches',
  components: { CoachItem },
  computed: {
    ...mapGetters('coachesModule', { hasCoaches: 'hasCoaches', filteredCoaches: 'coaches' })
  }
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>