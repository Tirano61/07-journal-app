import useAuth from '../../../../../src/modules/auth/composables/useAuth'

const mockStore = {
    dispatch: jest.fn(),
    commit: jest.fn(),
    getters: {
        'auth/currentState': 'authenticated',
        'auth/username': 'Dario'
    }

}

jest.mock('vuex', () => ({
    useStore: () => mockStore
}))

describe('Pruebas en useAuth', () => {

    beforeEach(() => jest.clearAllMocks())

    test('createUser EXITOSO', async() => {

        const { createUser } = useAuth()
            //console.log(useAuth());
        const newUser = { name: 'dario', email: 'dario@gmail.com' }

        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await createUser(newUser)

        expect(mockStore.dispatch).toHaveBeenCalledWith("auth/createUser", { "email": "dario@gmail.com", "name": "dario" })
        expect(resp).toEqual({ ok: true })

    })


    test('createUser FALLIDO, porque el email ya existe', async() => {

        const { createUser } = useAuth()
            //console.log(useAuth());
        const newUser = { name: 'dario', email: 'dario@gmail.com' }

        mockStore.dispatch.mockReturnValue({ ok: false, message: 'EMAIL_EXISTS' })

        const resp = await createUser(newUser)

        expect(resp).toEqual({ ok: false, message: 'EMAIL_EXISTS' })
    })

    test('login EXITOSO', async() => {

        const { loginUser } = useAuth()
            //console.log(useAuth());
        const loginForm = { email: 'dario@gmail.com', password: '123456' }

        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await loginUser(loginForm)

        expect(mockStore.dispatch).toHaveBeenLastCalledWith('auth/signInUser', loginForm)

        expect(resp).toEqual({ ok: true })

    })

    test('login FALLIDO', async() => {

        const { loginUser } = useAuth()
            //console.log(useAuth());
        const loginForm = { email: 'dario@gmail.com', password: '123456' }

        mockStore.dispatch.mockReturnValue({ ok: false, message: 'Login fallido' })

        const resp = await loginUser(loginForm)

        expect(mockStore.dispatch).toHaveBeenLastCalledWith('auth/signInUser', loginForm)

        expect(resp).toEqual({ ok: false, message: 'Login fallido' })

    })

    test('checkAuthStatus EXITOSO', async() => {

        const { checkAuthStatus } = useAuth()
            //console.log(useAuth());

        mockStore.dispatch.mockReturnValue({ ok: true })

        const resp = await checkAuthStatus()

        expect(mockStore.dispatch).toHaveBeenLastCalledWith('auth/checkAuthentication')

        expect(resp).toEqual({ ok: true })

    })


    test('logout ', () => {

        const { logOut } = useAuth()

        logOut()

        expect(mockStore.commit).toHaveBeenCalledWith('auth/logout')
        expect(mockStore.commit).toHaveBeenCalledWith('journal/clearEntry')
    })


    test('computed: authSatus userName', () => {

        const { authSatus, userName } = useAuth()

        expect(authSatus.value).toBe('authenticated')
        expect(userName.value).toBe('Dario')

    })




})