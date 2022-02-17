const getters = {
  coaches: state => state.coaches,
  hasCoaches: state => state.coaches && state.coaches.length > 0,

}

export default getters;