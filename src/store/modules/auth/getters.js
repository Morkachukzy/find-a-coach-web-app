const getters = {
    userId : (state) => state.userId,
    token: (state) => state.token,
    isAuthenticated: (state) => !!state.token,
}

export default getters;