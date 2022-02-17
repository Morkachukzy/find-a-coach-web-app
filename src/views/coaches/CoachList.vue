<template>
  <div>
    <coach-filter @change-filter='setFilters'></coach-filter>
    <base-card>
      <div class='controls'>
        <base-button mode='outline'>Refresh</base-button>
        <base-button link to='/register' v-if='!isCoach'>Register as a Coach</base-button>
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
import CoachItem from '../../components/coaches/CoachItem';
import CoachFilter from '../../components/coaches/CoachFilter';


export default {
  name: 'Coaches',
  components: { CoachItem, CoachFilter },
  computed: {
    filteredCoaches() {
      const coaches = this.allCoaches;
      return coaches.filter(coach => {
        console.log(coach);
        if (this.activeFilters.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.activeFilters.backend && coach.areas.includes('backend')) {
          return true;
        }
        return this.activeFilters.career && coach.areas.includes('career');

      });
    },
    ...mapGetters('coachesModule', { hasCoaches: 'hasCoaches', allCoaches: 'coaches', isCoach: 'isCoach' })
  },
  data() {
    return {
      activeFilters: {
        frontend: true,
        backend: true,
        career: true
      }
    };
  },
  methods: {
    setFilters(updatedFilters) {
      this.activeFilters = updatedFilters;
    }
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