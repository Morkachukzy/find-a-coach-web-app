<template>
  <div>
    <base-dialog :show="!!error" title="An error occurred" @close="handleError">
      <p>{{ error }}</p>
    </base-dialog>

    <coach-filter @change-filter='setFilters'></coach-filter>
    <base-card>
      <div class='controls'>
        <base-button mode='outline' @click="loadCoaches(true)">Refresh</base-button>
        <base-button link to="/auth?redirect=register" v-if="!isLoggedIn">Login to Register as a Coach</base-button>
        <base-button link to='/register' v-if='showRegisterAsACoach'>Register as a Coach</base-button>
      </div>
      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>
      <ul v-else-if='hasCoaches && !isLoading'>
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
import {mapActions, mapGetters} from 'vuex';
import CoachItem from '../../components/coaches/CoachItem';
import CoachFilter from '../../components/coaches/CoachFilter';


export default {
  name: 'Coaches',
  components: {CoachItem, CoachFilter},
  computed: {
    isLoggedIn() {
      return this.isAuthenticated;
    },
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
    showRegisterAsACoach() {
      return this.isLoggedIn && !this.isCoach && !this.isLoading;
    },
    ...mapGetters('coachesModule', {hasCoaches: 'hasCoaches', allCoaches: 'coaches', isCoach: 'isCoach'}),
    ...mapGetters(['isAuthenticated']),
  },

  data() {
    return {
      isLoading: false,
      error: null,
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
    },
    async loadCoaches(refresh = false) {
      this.isLoading = true;
      try {
        await this.coaches({forceRefresh: refresh});
      } catch (e) {
        this.error = e.message || 'Something went wrong';
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    ...mapActions('coachesModule', {coaches: 'loadCoaches'}),
  },
  created() {
    this.loadCoaches();
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