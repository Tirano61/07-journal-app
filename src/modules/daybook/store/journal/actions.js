import journalApi from "@/api/journalApi";

// export const myAction = async({ commit }) =>{

// }




export const loadEntries = async({ commit }) => {

    const { data } = await journalApi.get('/entries.json');
    if (!data) {
        commit('setEntries', []);
        return;
    }
    const entries = []
    for (let id of Object.keys(data)) {

        entries.push({
            id,
            ...data[id]
        })
    }

    commit('setEntries', entries)

}

export const upDateEntries = async({ commit }, entries) => {

    const { date, text, picture } = entries;
    const dataSave = { date, text, picture };

    await journalApi.put(`/entries/${entries.id}.json`, dataSave);

    dataSave.id = entries.id
        //El spret sse hace que js no pase el objeto por referencia (puede pasar) {...entries}
    commit('upDateEntries', {...dataSave });
}

export const createEntries = async({ commit }, entries) => {

    const { date, text, picture } = entries;
    const dataSave = { date, text, picture };
    const { data } = await journalApi.post(`/entries.json`, dataSave);

    dataSave.id = data.name;

    commit('addEntries', dataSave);

    return data.name;

}

export const deleteEntry = async({ commit }, id) => {

    await journalApi.delete(`/entries/${id}.json`);

    commit('deleteEntry', id)

    return id

}