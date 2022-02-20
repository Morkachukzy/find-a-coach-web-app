const actions = {
    async login(context, payload) {
        await context.dispatch('postData', {...payload, action: 'login'});
    },
    async signup(context, payload) {
        await context.dispatch('postData', {...payload, action: 'signup'});
    },
    async postData(context, payload) {
        let firebaseLink = null;
        if (payload.action === 'signup') {
            firebaseLink = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCom1g9sy3ZnE7kT4h0rgjN0WoLfS6_IFY`
        } else {
            firebaseLink = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCom1g9sy3ZnE7kT4h0rgjN0WoLfS6_IFY`
        }
        const response = await fetch(firebaseLink, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const responseData = await response.json();
        if (!response.ok) {
            throw new Error(responseData.message || `Failed to validate`);
        }
        console.log(responseData);
        context.commit('SET_USER', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    },
    logOut(context) {
        context.commit('SET_USER', {
            token: null,
            userId: null,
            tokenExpiration: null,
        })

    }
}

export default actions;