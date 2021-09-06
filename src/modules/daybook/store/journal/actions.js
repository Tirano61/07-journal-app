
import journalApi from "@/api/journalApi";

// export const myAction = async({ commit }) =>{

// }




export const loadEntries = async({ commit }) =>{
    
    const { data } = await journalApi.get('/entries.json');
    
    const entries = []
    for(let id of Object.keys( data )){
        
        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries )

}

export const upDateEntries = async({ commit }, entries) =>{

    const { date, text }  = entries;
    const dataSave = { date, text };

    const res = await journalApi.put(`/entries/${entries.id}.json`, dataSave);

    console.log(res)
    //El spret sse hace que js no pase el objeto por referencia (puede pasar) {...entries}
    commit();
}

export const createEntries = async(/*{ commit }*/) =>{

}