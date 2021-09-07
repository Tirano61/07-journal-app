



<template>
    <div class="d-flex justify-content-center">
        <h1 class="align-self-center">No hay nada seleccionado</h1>
    </div>

    <Fab
    @on:Click="createNewEntry" />

</template>

<script>
import { defineAsyncComponent } from '@vue/runtime-core'

export default {
    components:{
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    methods:{
        createNewEntry(){
            this.$router.push({name: 'entry', params: {id: 'new'}})
        }
    }
}
</script>

<style lang="scss" scoped>
div{
    height: 100%;
}
</style>


Mollit exercitation ullamco sit amet velit veniam ipsum do irure eiusmod. Velit aliquip fugiat eiusmod eiusmod et irure. Occaecat duis sint enim fugiat dolor dolor in do ad. Adipisicing exercitation occaecat proident est commodo qui nostrud tempor Lorem fugiat mollit voluptate non mollit. Mollit adipisicing sit consectetur aute aute sunt cillum elit minim excepteur proident in sint non. Ullamco enim in nulla veniam pariatur commodo esse dolor. Eu qui cupidatat voluptate occaecat adipisicing irure ullamco proident nostrud ullamco commodo ex tempor.