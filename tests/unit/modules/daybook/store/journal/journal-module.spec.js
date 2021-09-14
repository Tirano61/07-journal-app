import { createStore } from "vuex"
import journal from "../../../../../../src/modules/daybook/store/journal";
import { journalState } from "../../../../mock-data/test-journal-state";


const createVuexStore = (inicialState) => createStore({
    modules: {
        journal: {
            ...journal,
            state: {...inicialState }
        }
    }
})

describe('Vuex - Pruebas en el modulo del journal', () => {

    test('Este es el estado inicial,  Debe tener este state ', () => {

        const store = createVuexStore(journalState)

        const { isLoading, entries } = store.state.journal

        expect(isLoading).toBeFalsy()
        expect(entries).toEqual(journalState.entries)

    })

    //Mutations
    test('Mutation - setEntries', () => {
        const store = createVuexStore({ isLoading: true, entries: [] })
        store.commit('journal/setEntries', journalState.entries)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.isLoading).toBeFalsy()
    })

    test('Mutation - updateEntries ', () => {

        const store = createVuexStore(journalState)

        const updateEntry = {

            id: 'MjGzjLtqWG4wFQe4QWm',
            date: 1631315731779,
            text: "Hola mundo desde pruebas"
        }

        store.commit('journal/upDateEntries', updateEntry)

        expect(store.state.journal.entries.length).toBe(2)
        expect(
            store.state.journal.entries.find(e => e.id === updateEntry.id)
        ).toEqual(updateEntry)

    })

    test('mutation - addEntry deleteEntry ', () => {
        const store = createVuexStore(journalState)
        const newEntry = {

            id: 'ABC123',
            date: 1631315731779,
            text: "Hola mundo nuevo"
        }

        store.commit('journal/addEntries', newEntry)

        expect(store.state.journal.entries.length).toBe(3)
        expect(store.state.journal.entries.find(e => e.id === 'ABC123')).toBeTruthy()

        store.commit('journal/deleteEntry', newEntry.id)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === 'ABC123')).toBeFalsy()
    })

    test('getters - getEntriesByTerm getEntriesById', () => {
        const store = createVuexStore(journalState)

        expect(store.getters['journal/getEntriesByTerm']('').length).toBe(2)
        expect(store.getters['journal/getEntriesByTerm']('segunda').length).toBe(1)

        const [entry1, entry2] = journalState.entries
        console.log(entry2);

        expect(store.getters['journal/getEntriesById']('MjGzjLtqWG4wFQe4QWm')).toEqual(entry1)

    })
    
    test('Actions -  loadEntries', async () => {
        
        const store = createVuexStore( {isLoading: true, entries: []} )

        await store.dispatch('journal/loadEntries')

        expect(store.state.journal.entries.length).toBe(2)

    })

    test('actions - updateEntry', async() => {

        const store = createVuexStore(journalState)

        const updateEntry = {
            id: 'MjGzjLtqWG4wFQe4QWm',
            date: 1631315731779,
            text: "Hola mundo desde mock-data",
        }

        await store.dispatch('journal/upDateEntries', updateEntry)

        expect(store.state.journal.entries.length).toBe(2)
        expect(store.state.journal.entries.find(e => e.id === updateEntry.id)).toEqual({
            id: 'MjGzjLtqWG4wFQe4QWm',
            date: 1631315731779,
            text: "Hola mundo desde mock-data",
        })
    })

    test('actions - createEntries deleteEntry', async() => {

        const store = createVuexStore(journalState)
        const nuevoEntry = {
            date: 1631315731779,
            text: "Nueva entrada de prueba",
        }

        const id = await store.dispatch('journal/createEntries', nuevoEntry)

        nuevoEntry.id = id
        expect(typeof id).toBe('string')
        expect(store.state.journal.entries.find(e => e.id === id)).toBeTruthy()

        await store.dispatch('journal/deleteEntry', id)
        expect(store.state.journal.entries.find(e => e.id === nuevoEntry.id)).toBeFalsy()

    })
})