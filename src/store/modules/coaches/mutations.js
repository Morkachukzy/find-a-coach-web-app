const mutations = {
  REGISTER_COACH(state, payload){
    state.coaches.push(payload);
  },
  SET_COACHES(state, payload){
    state.coaches = payload;
  }
}

export default mutations;