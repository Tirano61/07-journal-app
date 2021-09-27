
import { createStore } from 'vuex'
import journal from '../../../../../src/modules/daybook/store/journal';
import { shallowMount } from "@vue/test-utils";
import { journalState } from '../../../mock-data/test-journal-state';
import EntryView from '../../../../../src/modules/daybook/views/EntryView.vue'
import Swal from "sweetalert2";


const createVuexStore = ( inicialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...inicialState}            
        }
    }
})

jest.mock('sweetalert2', () => ({
    fire: jest.fn(),
    showLoading: jest.fn(),
    close: jest.fn()
}))


describe('Pruebas en el EntryView', () => {
    
    const store = createVuexStore( journalState )
    
    store.dispatch = jest.fn()

    const mockRouter = {
        push: jest.fn()
    }

    let wrapper ;

    beforeEach( ()=>{

        jest.clearAllMocks()

        wrapper = shallowMount( EntryView, {
            props: {
                id: '-MjL_umRoXAYun_8Z-ie'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [ store ]
            },
           
        });
    })


    test('Debe sacar al usuario por que el id no existe', () => {

        const wrapper = shallowMount( EntryView, {
            props:{
                id: 'sdfsdfsdfsdf'
            },
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store],
            },
        });
        
        expect( mockRouter.push).toHaveBeenCalledWith( {name: 'no-entry'} )

    })

    test('Debe mostrar la entarda correctamente', () => {
        
        expect(wrapper.html()).toMatchSnapshot()
        expect( mockRouter.push ).not.toHaveBeenCalled()

    })
    
    test('Debe borrar la entrada y salir', ( done ) => {
        
        Swal.fire.mockReturnValueOnce(  Promise.resolve({ isConfirmed: true}))
        
        wrapper.find('.btn-danger').trigger('click')

        expect( Swal.fire ).toHaveBeenCalledWith({
            title: 'Está seguro',
            text: 'Una vez borrado no se recuperará',
            showDenyButton: true,
            confirmButtonText: 'Si estoy seguro'
        })

       
        setTimeout(() =>{
            expect(store.dispatch).toHaveBeenCalledWith('journal/deleteEntry', '-MjL_umRoXAYun_8Z-ie')
            expect(mockRouter.push).toHaveBeenCalled()
            done()
        }, 1)


    })
    
    
})
