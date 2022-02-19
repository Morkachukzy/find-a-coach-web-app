const getters = {
    requests: (state) => state.requests,
    hasRequests: (state) => state.requests && state.requests.length > 0,
}

export default getters;