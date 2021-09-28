import { shallowMount } from '@vue/test-utils'

import Login from '../../../../../src/modules/auth/views/Login.vue'
import createVuexStore from '../../../mock-data/mock-store'
import Swal from 'sweetalert2'


import {
    VueRouterMock,
    createRouterMock,
    injectRouterMock,
} from 'vue-router-mock'
import { config } from '@vue/test-utils'

// create one router per test file
const router = createRouterMock()

beforeEach(() => {
    injectRouterMock(router)
})

// Add properties to the wrapper
config.plugins.VueWrapper.install(VueRouterMock)



jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))

describe('Pruebas en Login.vue component', () => {

    const store = createVuexStore({
        status: 'authenticating', // 'authenticated', 'not-authenticated',
        user: null,
        idToken: null,
        refreshToken: null
    })

    store.dispatch = jest.fn()

    beforeEach(() => jest.clearAllMocks())

    test('Deebe hacer match con el snapshop', () => {

        const wrapper = shallowMount(Login, {
            global: {
                plugins: [store]
            }
        })

        expect(wrapper.html()).toMatchSnapshot()

    })

    test('credenciales incorrectas , disparan el SWAL', async() => {

        store.dispatch.mockReturnValueOnce({ ok: false, message: 'Error en credenciales' })

        const wrapper = shallowMount(Login, {
            global: {
                plugins: [store]
            }
        })

        await wrapper.find('form').trigger('submit')

        expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", { email: "", password: "" })
        expect(Swal.fire).toHaveBeenCalledWith("error", "Email o password incorrecto", "error")

    })


    test('credenciales correctas, redirigir a no-entry', async() => {

        store.dispatch.mockReturnValueOnce({ ok: true })
        const wrapper = shallowMount(Login, {
            global: {
                plugins: [store]
            }
        })

        const [txtEmail, txtPassword] = wrapper.findAll('input')
        await txtEmail.setValue('dario@gmail.com')
        await txtPassword.setValue('123456')

        await wrapper.find('form').trigger('submit')

        expect(store.dispatch).toHaveBeenCalledWith("auth/signInUser", { email: "dario@gmail.com", password: "123456" })

        expect(wrapper.router.push).toHaveBeenCalledWith({ name: "no-entry" })

    })


})