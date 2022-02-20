let timer;
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

        const expiresIn = +responseData.expiresIn * 1000;
        const expirationDate = new Date().getTime() + expiresIn;

        localStorage.setItem('token', responseData.token);
        localStorage.setItem('userId', responseData.localId);
        localStorage.setItem('tokenExpiration', expirationDate)
        timer = setTimeout(() => {
            context.dispatch('autoLogOut');
        }, expiresIn)
        context.commit('SET_USER', {
            token: responseData.idToken,
            userId: responseData.localId,
        })
    },
    autoLogin(context){
       const token =  localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const tokenExpiration = localStorage.getItem('tokenExpiration');

        const expiresIn = +tokenExpiration - new Date().getTime();
        if (expiresIn < 0){
            return;
        }
        timer = setTimeout(() => {
            context.dispatch('autoLogOut');
        }, expiresIn)
        if(token && userId){
            context.commit('SET_USER', {
                token,
                userId,

            })
        }
    },
    logOut(context) {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('tokenExpiration');
        clearTimeout(timer);
        context.commit('SET_USER', {
            token: null,
            userId: null,
        })
    },
    autoLogOut(context){
        context.dispatch('logOut');
        context.commit('SET_AUTO_LOGOUT');
    }
}

export default actions;