import axios from "axios";
import createVuexStore from "../../../../mock-data/mock-store";



describe('Vuex: Pruebas en el auth-module ', () => {


    test('estado inicial', () => {
        const stores = createVuexStore({
            status: 'authenticating', // 'authenticated', 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })


        const { status, user, idToken, refreshToken } = stores.state.auth

        expect(status).toBe('authenticating')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(refreshToken).toBe(null)

    })


    test('Mutation: loginuser', () => {

        const stores = createVuexStore({
            status: 'authenticating', // 'authenticated', 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const payload = {
            user: {
                name: 'dario',
                email: 'dario@gmail.com'
            },
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        }

        stores.commit('auth/loginUser', payload)

        const { status, user, idToken, refreshToken } = stores.state.auth

        expect(status).toBe('authenticated')
        expect(user).toEqual({ email: 'dario@gmail.com', name: 'dario' })
        expect(idToken).toBe('ABC-123')
        expect(refreshToken).toBe('XYZ-123')

    })

    test('Mutation: logout', () => {

        localStorage.setItem('idToken', 'ABC-123')
        localStorage.setItem('refreshToken', 'xyz-123')

        const stores = createVuexStore({
            status: 'authenticated', // 'authenticated', 'not-authenticated',
            user: { email: 'dario@gmail.com', name: 'dario' },
            idToken: 'abc-123',
            refreshToken: 'abc-321'
        })

        stores.commit('auth/logout')

        const { status, user, idToken, refreshToken } = stores.state.auth

        expect(status).toBe('not-authenticated')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(refreshToken).toBe(null)

        expect(localStorage.getItem('idToken')).toBeFalsy()
        expect(localStorage.getItem('refreshToken')).toBeFalsy()

    })

    //Getters
    test('Getters: username currentState', () => {

        const store = createVuexStore({
            status: 'authenticated', // 'authenticated', 'not-authenticated',
            user: { email: 'dario@gmail.com', name: 'dario' },
            idToken: 'abc-123',
            refreshToken: 'abc-321'
        })

        expect(store.getters['auth/currentState']).toBe('authenticated')
        expect(store.getters['auth/username']).toBe('dario')

    })

    //Actions

    test('Actions: createUser - error usuario ya existe', async() => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = { name: 'Test User', email: 'test@test.com', password: '123456' }
        const resp = await store.dispatch('auth/createUser', newUser)

        expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })
        const { status, user, idToken, refreshToken } = store.state.auth
        expect(status).toBe('not-authenticated')
        expect(user).toBe(null)
        expect(idToken).toBe(null)
        expect(refreshToken).toBe(null)

    })


    test('Actions: createUser - crea el usuario', async() => {
        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const newUser = { name: 'Test User', email: 'test2@test.com', password: '123456' }
            //SignIn
        await store.dispatch('auth/signInUser', newUser)

        const { idToken } = store.state.auth
            //Borrar el usuario
        await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:delete?key=AIzaSyAmtLilPsYWjqOjOhaWkSogvqqr6I9NQkg`, {
                idToken
            })
            //Crear el usuario
        const resp = await store.dispatch('auth/createUser', newUser)

        expect(resp).toEqual({ ok: true })

        const { status, user, idToken: token, refreshToken } = store.state.auth
        expect(status).toBe('authenticated')
        expect(user).toEqual({ name: 'Test User', email: 'test2@test.com' })
        expect(typeof token).toBe('string')
        expect(typeof refreshToken).toBe('string')

    })


    test('Actions: checkAuthentication - POSITIVA', async() => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })
        const newUser = { name: 'User Test', email: 'test@test.com', password: '123456' }
        await store.dispatch('auth/signInUser', newUser)

        const { idToken } = store.state.auth
        store.commit('auth/logout')

        localStorage.setItem('idToken', idToken)

        const checkResponse = await store.dispatch('auth/checkAuthentication')
        expect(checkResponse).toEqual({ ok: true })

        const { status, user, idToken: token } = store.state.auth
        expect(status).toBe('authenticated')
        expect(user).toEqual({ name: 'User Test', email: 'test@test.com' })
        expect(typeof token).toBe('string')

    })


    test('Actions: checkAuthentication - NEGATIVA', async() => {

        const store = createVuexStore({
            status: 'not-authenticated', // 'authenticated', 'not-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        localStorage.removeItem('idToken')
        const checkResp1 = await store.dispatch('auth/checkAuthentication')

        expect(checkResp1).toEqual({ ok: false, mmessage: 'No hay token en la petición' })

        localStorage.setItem('idToken', 'ABC-123')
        const checkResp2 = await store.dispatch('auth/checkAuthentication')
        expect(checkResp2).toEqual({ ok: false, mmessage: 'INVALID_ID_TOKEN' })

    })





})