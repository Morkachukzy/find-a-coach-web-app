const mutations = {
  REGISTER_COACH(state, payload){
    state.coaches.push(payload);
  }
}

export default mutations;