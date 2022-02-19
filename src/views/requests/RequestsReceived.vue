<template>

  <section>
    <base-card>
      <header>
        <h2 >Requests Received</h2>
      </header>
      <base-spinner v-if="isLoading"></base-spinner>
      <ul v-else-if="hasRequests && !isLoading">
        <request-item v-for="request in receivedRequests" :key="request.id" :email="request.userEmail"
                      :message="request.message"></request-item>
      </ul>
      <h3 v-else>You haven't received any requests yet</h3>
    </base-card>
  </section>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import RequestItem from "@/components/requests/RequestItem";
export default {
  name: 'RequestsReceived',
  components: {RequestItem},
  data() {
    return {
      isLoading: false,
      error: null
    }
  },
  computed: {
    ...mapGetters('requestsModule', {receivedRequests: 'requests', hasRequests: 'hasRequests'})
  },
  method: {
    async loadRequests() {
      this.handleError();
      this.isLoading = true;
      try {
        await this.fetchRequest();
      } catch (e) {
        this.error = e.message || 'Something went wrong'
      }
      this.isLoading = false;
    },
    handleError() {
      this.error = null;
    },
    ...mapActions('requestsModule', {fetchRequest: 'fetchRequest'}),
  },
  created() {
    this.loadRequests();
  }
};
</script>

<style scoped>
header {
  text-align: center;
}

ul {
  list-style: none;
  margin: 2rem auto;
  padding: 0;
  max-width: 30rem;
}

h3 {
  text-align: center;
}
</style>