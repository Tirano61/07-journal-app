
import daybookRouter  from "../../../../../src/modules/daybook/router";

describe('Pruebas en  Router Module', () => {
    
    test('El router de be tener esta configuracuion', async() => {
        
        expect( daybookRouter ).toMatchObject({
            name: 'daybook',
            component: expect.any(Function), 
            children: [
                {
                    path:'',
                    name: 'no-entry',
                    component: expect.any(Function),
                },
                {
                    path: ':id',
                    name: 'entry',
                    component: expect.any(Function),
                    props: expect.any(Function),
                }
            ]
        })

        // expect((await daybookRouter.children[0].component()).default.name).toBe('NoViewEntrySelected')
        // expect((await daybookRouter.children[1].component()).default.name).toBe('EntryView')

        const promiseRoutes = []
        daybookRouter.children.forEach( child => promiseRoutes.push( child.component()))

        const routes = (await Promise.all( promiseRoutes)).map( r => r.default.name)

        expect( routes ).toContain('EntryView')
        expect( routes ).toContain('NoViewEntrySelected')

    })

    test('Debe retornar el id de la ruta', () => {
        
        const route = {
            params: {
                id: 'ABC123'
            }
        }

        // expect(daybookRouter.children[1].props( route )).toEqual({id: 'ABC123'})
        const entryRoute = daybookRouter.children.find( route => route.name === 'entry')
        expect(entryRoute.props( route )).toEqual({id: 'ABC123'})

    })
    
    

})
