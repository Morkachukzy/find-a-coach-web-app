const getters = {
  coaches: state => state.coaches,
  hasCoaches: state => state.coaches && state.coaches.length > 0,
  isCoach: (_, getters, _2, rootGetters) => {
    const coaches = getters.coaches;
    const userId = rootGetters.userId;
    return coaches.some(coach => coach.id === userId);
  }
}

export default getters;