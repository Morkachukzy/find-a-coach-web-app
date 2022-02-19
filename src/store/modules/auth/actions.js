const actions = {
    login() {

    },
    async signup(context, payload) {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCom1g9sy3ZnE7kT4h0rgjN0WoLfS6_IFY`, {
            method: 'POST',
            body: JSON.stringify({
                email: payload.email,
                password: payload.password,
                returnSecureToken: true
            })
        })
        const responseData = await response.json();
        if (!response.ok) {
            console.log(responseData);
            throw new Error(responseData.message || `Failed to validate`);
        }
        console.log(responseData);
        context.commit('SET_USER', {
            token: responseData.idToken,
            userId: responseData.localId,
            tokenExpiration: responseData.expiresIn
        })
    }
}

export default actions;