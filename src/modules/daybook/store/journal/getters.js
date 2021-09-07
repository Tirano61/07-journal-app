

// export const myGetters = ( state ) =>{
    // return state.lo que nececite
// }




export const getEntriesByTerm = ( state ) => ( term = '' ) => {
    if ( term.length === 0 ) return state.entries;

    return state.entries.filter( ent => ent.text.toLowerCase().includes( term.toLocaleLowerCase() ) );
        

    
};

export const getEntriesById = ( state ) => ( id = '' ) =>{
   
    // console.log(state.entries)
    const entry = state.entries.find(  ent => ent.id === id);

    if(!entry) return; 

    return { ...entry }; //TODO: probar

    

};