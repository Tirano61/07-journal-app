import { useStore } from "vuex"
import { computed } from "vue"

const useAuth = () => {

    const store = useStore()

    const createUser = async(user) => {

        const resp = await store.dispatch('auth/createUser', user)

        return resp

    }

    const loginUser = async(user) => {
        const resp = await store.dispatch('auth/signInUser', user)

        return resp
    }

    const checkAuthStatus = async() => {
        const resp = await store.dispatch('auth/checkAuthentication')
        return resp
    }

    const logOut = () => {
        store.commit('auth/logout')
        store.commit('journal/clearEntry')
    }

    return {
        createUser,
        loginUser,
        checkAuthStatus,
        authSatus: computed(() => store.getters['auth/currentState']),
        userName: computed(() => store.getters['auth/username']),
        logOut
    }

}

export default useAuth