
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

    await journalApi.put(`/entries/${entries.id}.json`, dataSave);

   
    //El spret sse hace que js no pase el objeto por referencia (puede pasar) {...entries}
    commit('upDateEntries', {...entries});
}

export const createEntries = async({ commit }, entries) =>  {

    const { date, text }  = entries;
    const dataSave = { date, text };
    const { data } = await journalApi.post(`/entries.json`, dataSave);
        
    dataSave.id = data.name;

    commit('addEntries', dataSave);

    return data.name;

}












