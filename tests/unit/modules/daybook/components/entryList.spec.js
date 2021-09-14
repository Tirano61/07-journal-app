import { shallowMount } from "@vue/test-utils";
import { createStore } from 'vuex'
import { getEntriesByTerm } from '../../../../../src/modules/daybook/store/journal/getters'
import { journalState } from '../../../mock-data/test-journal-state';
import { EntryList } from "../../../../../src/modules/daybook/components/EntryList.vue";




describe('Pruebas en EntryList', () => {

    const journalModule = {
        namespaced: true,
        getters: {
            getEntriesByTerm
        },
        state: () => ({
            isLoading: false,
            entries: journalState.entries
        })
    }
    const store = createStore({
        modules: {
            journal: {...journalModule }
        }
    });

    const wrapper = shallowMount(EntryList, {
        global: {
            mocks: {
                //$router: 
            },
            plugins: [store]
        }
    })

    test('Debe llamar el getEntryByTerm sin termino y mostrar 2 entradas', () => {

        console.log(wrapper.html());

    })

})