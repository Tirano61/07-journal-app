import { createStore } from "vuex";

import auth from "../../../src/modules/auth/store/auth";
import journal from "../../../src/modules/daybook/store/journal";
import { journalState } from "./test-journal-state";


const createVuexStore = ( authInitState, journalInitState = journalState ) => 
    createStore({
        modules:{
            auth: {
                ...auth,
                state: { ...authInitState }
            },
            journal: {
                ...journal,
                state: { ...journalInitState }
            }
        }
    })


export default createVuexStore