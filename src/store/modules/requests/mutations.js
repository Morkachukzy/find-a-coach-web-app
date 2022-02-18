const mutations = {
    ADD_REQUEST(state, payload) {
        state.requests.push(payload);
    }
}

export default mutations;