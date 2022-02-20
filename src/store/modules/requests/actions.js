const actions = {
    async contactCoach(context, payload){
        const newRequest = {
            userEmail: payload.email,
            message: payload.message
        }
        const response = await fetch(`https://coach-web-app-9435e-default-rtdb.firebaseio.com/requests/${payload.coachId}.json`,{
            method: 'POST',
            body: JSON.stringify(newRequest)
        });
        const responseData = await response.json();
        newRequest.id = responseData.name;
        newRequest.coachId = payload.coachId;
        console.log(responseData);
        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to send request');
        }
        context.commit('ADD_REQUEST', newRequest)
    },
    async fetchRequest(context){
        const coachId = context.rootGetters.userId;
        const token = context.rootGetters.token;
        const response= await fetch(`https://coach-web-app-9435e-default-rtdb.firebaseio.com/requests/${coachId}.json?auth=${token}`)
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch request');
        }
        const requests = [];
        for (const key in responseData){
            const request = {
                id: key,
                coachId,
                userEmail: responseData[key].userEmail,
                message: responseData[key].message,
            };
            requests.push(request);
        }
        context.commit('SET_REQUESTS', requests);
    }
}

export default actions;