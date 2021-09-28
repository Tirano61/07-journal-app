import { loginUser } from "../../../../../../src/modules/auth/store/auth/mutations";
import createVuexStore from "../../../../mock-data/mock-store";



describe('Vuex: Pruebas en el auth-module ', () => {
    

    test('estado inicial', () => {
        const stores = createVuexStore({
            status: 'authenticating',// 'authenticated', 'no-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })


        const { status,user, idToken, refreshToken } = stores.state.auth

        expect( status ).toBe( 'authenticating' )
        expect( user ).toBe( null )
        expect( idToken ).toBe( null )
        expect( refreshToken ).toBe( null )

    })


    test('Mutation: loginuser', () => {
        
        const stores = createVuexStore({
            status: 'authenticating',// 'authenticated', 'no-authenticated',
            user: null,
            idToken: null,
            refreshToken: null
        })

        const payload = {
            user:{name: 'dario',
            email: 'dario@gmail.com'},
            idToken: 'ABC-123',
            refreshToken: 'XYZ-123'
        }

        stores.commit('auth/loginUser', payload)

        const { status,user, idToken, refreshToken } = stores.state.auth

        expect( status ).toBe( 'authenticated' )
        expect( user ).toEqual( { email: 'dario@gmail.com',name: 'dario'} )
        expect( idToken ).toBe( 'ABC-123' )
        expect( refreshToken ).toBe( 'XYZ-123' )

    })

    test('Mutation: logout', () => {

        localStorage.setItem('idToken', 'ABC-123')
        localStorage.setItem('refreshToken', 'xyz-123')

        const stores = createVuexStore({
            status: 'authenticated',// 'authenticated', 'no-authenticated',
            user: { email: 'dario@gmail.com',name: 'dario'} ,
            idToken: 'abc-123',
            refreshToken: 'abc-321'
        })

        stores.commit('auth/logout')

        const { status,user, idToken, refreshToken } = stores.state.auth

        expect( status ).toBe( 'not-authenticated' )
        expect( user ).toBe( null )
        expect( idToken ).toBe( null )
        expect( refreshToken ).toBe( null )

        expect(localStorage.getItem('idToken')).toBeFalsy()
        expect(localStorage.getItem('refreshToken')).toBeFalsy()

    })
    
    
    

})
