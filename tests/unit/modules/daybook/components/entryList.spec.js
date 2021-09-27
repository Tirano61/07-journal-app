//import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex'
import journal from "@/modules/daybook/store/journal";
import { shallowMount } from "@vue/test-utils";
//import { getEntriesByTerm } from '../../../../../src/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state';
import  EntryList  from '../../../../../src/modules/daybook/components/EntryList';




const createVuexStore = ( inicialState ) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...inicialState}            
        }
    }
})


describe('Pruebas en EntryList', () => {

    const store = createVuexStore( journalState )
    const mockRouter = {
        push: jest.fn()
    }

    let wrapper ;

    beforeEach( ()=>{

        jest.clearAllMocks()

        wrapper = shallowMount( EntryList, {
            global: {
                mocks: {
                    $router: mockRouter
                },
                plugins: [store]
            },
           
        });
    })

    //Esta forma se crea el mock del store    
    // const journalModule = {
    //     namespaced: true,
    //     getters: {
    //         getEntriesByTerm
    //     },
    //     state: () => ({
    //         isLoading: false,
    //         entries: journalState.entries
    //     })
    // };
    // const store = createStore({
    //     modules: {
    //         journal: {...journalModule }
    //     }
    // });

    // const wrapper = shallowMount( EntryList, {
    //     global: {
    //         mocks: {
    //             //$router: 
    //         },
    //         plugins: [store]
    //     },
       
    // });

    test('Debe llamar el getEntryByTerm sin termino y mostrar 2 entradas', () => {

       
        expect(wrapper.findAll('entry-stub').length ).toBe(2);

    })
    test('Debe llamar el getEntriesByTerm y filtrar las entradas', async() => {
        const input = wrapper.find('input')

       await input.setValue('segunda')

       expect( wrapper.findAll('entry-stub').length ).toBe(1);
    })

    test('El boton de nuevo debe redireccionar a /new', () => {
        wrapper.find('button').trigger('click')

        expect(mockRouter.push).toHaveBeenCalledWith({name:'entry', params:{id: 'new'} })
    })
    
    

})