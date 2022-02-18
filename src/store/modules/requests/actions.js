const actions = {
    contactCoach(context, payload){
        const newRequest = {
            id: new Date().toISOString(),
            coachId: payload.coachId,
            userEmail: payload.email,
            message: payload.message
        }
        context.commit('ADD_REQUEST', newRequest)
    }
}

export default actions;