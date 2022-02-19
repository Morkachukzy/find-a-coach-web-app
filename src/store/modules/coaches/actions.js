const actions = {
    async registerCoach(context, data) {
        const userId = context.rootGetters.userId;

        const coachData = {
            firstName: data.first,
            lastName: data.last,
            description: data.desc,
            hourlyRate: data.rate,
            areas: data.areas
        }

        const response = await fetch(`https://coach-web-app-9435e-default-rtdb.firebaseio.com/coaches/${userId}.json`, {
            method: 'PUT',
            body: JSON.stringify(coachData),
        });

        if (!response.ok) {
            //error...
        }

        context.commit('REGISTER_COACH', {
            ...coachData,
            id: userId,
        });
    },
    async loadCoaches(context, payload) {
        if (!payload.forceRefresh && !context.getters.shouldUpdate) {
            return;
        }
        const response = await fetch(`https://coach-web-app-9435e-default-rtdb.firebaseio.com/coaches.json`);
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || 'Failed to fetch');
        }
        const coaches = [];
        for (const key in responseData) {
            const coach = {
                id: key,
                firstName: responseData[key].firstName,
                lastName: responseData[key].lastName,
                description: responseData[key].description,
                hourlyRate: responseData[key].hourlyRate,
                areas: responseData[key].areas
            };
            coaches.push(coach);
        }
        context.commit('SET_COACHES', coaches);
        context.commit('SET_FETCH_TIMESTAMP');
    }
}

export default actions;