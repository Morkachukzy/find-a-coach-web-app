const getters = {
    requests: (state, _, _2, rootGetters) => {
        const coachId = rootGetters.userId;
        return state.requests.filter(request => request.coachId === coachId);
    },
    hasRequests: (_, getters) => getters.requests && getters.requests.length > 0,

}

export default getters;