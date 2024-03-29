

<template >
    <template v-if="entry">
        <div   class="entry-title d-flex justify-content-between p-2">

            <div>
                <span class="text-success fs-3  fw-bold">{{ day }}</span>
                <span class="mx-1 fs-3 ">{{ month }}</span>
                <span class="mx-2 fs-4  fw-light">{{ yearDay }}</span>
            </div>

            <div>
                <input type="file"
                    @change="onSelectedImage"
                    ref="imageSelector"
                    v-show="false"
                    accept="image/png, image/jpeg">
                <button 
                    v-if="entry.id"
                    class="btn btn-danger mx-2"
                    @click="deleteEntries">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary"
                    @click="onSelectImage">
                    Subir Foto
                    <i class="fa fa-up-load"></i>
                </button>
            </div>
            
        </div>

        <hr>

        <div class="d-flex flex-column px-3 h-75">
            <textarea 
            v-model="entry.text"
            placeholder="¿Que sucedió hoy?" ></textarea>
        </div>

        <Fab 
            icon="fa-save"
            @on:Click="saveEntries"
        />

        <img v-if="entry.picture && !localImage" 
            :src="entry.picture" 
            alt="elefante"
            class="img-thumbnail">

        <img v-if="localImage" 
            :src="localImage" 
            alt="elefante"
            class="img-thumbnail">
    </template>
    

</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapActions, mapGetters } from 'vuex'

import getDayMonthYear from "../helpers/getDayMonthYear";
import Swal from 'sweetalert2'
import uploadImage from '../helpers/uploadImage'




export default {
    name: 'EntryView',
    props: {
        id:{
            type: String,
            required: true
        }
    },
    components:{
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },

    data(){
        return{
            entry: null,
            localImage: null,
            file: null 
        }
    },

    computed: {
        ...mapGetters('journal', ['getEntriesById']),
        
        day(){
            const { day } = getDayMonthYear(this.entry.date)
            return day
        },
        month(){
            const { month } = getDayMonthYear(this.entry.date)
            return month
        },
        yearDay(){
            const { yearDay } = getDayMonthYear(this.entry.date)
            return yearDay
        }

    },

    methods: {
        ...mapActions('journal', ['upDateEntries', 'createEntries', 'deleteEntry']),

        loadEntry(){
           let entry;
           
           if(this.id === 'new'){

               entry ={
                   text: '',
                   date: new Date().getTime()
               }

           }else{
                entry = this.getEntriesById( this.id)

                if(!entry) return this.$router.push({name: 'no-entry'})   
           }
           
           this.entry = entry 

        },

        async saveEntries(){

            Swal.fire({
                title: 'Espere por favor ...',
                allowOutsideClick: false
            })
            Swal.showLoading()

            const picture = await uploadImage(this.file)
            
            this.entry.picture = picture

            if(this.entry.id ){

                await this.upDateEntries( this.entry)

            }else{
                //Crear una nueva entrada
                const resp = await this.createEntries(this.entry)
                
                this.$router.push({name: 'entry', params:{id: resp}})
            }
            
            this.file = null

            Swal.fire('Guardando', 'Entrada registrada con éxito', 'success')


        },

        async deleteEntries(){
           
            const {isConfirmed} = await Swal.fire({
                title: 'Está seguro',
                text: 'Una vez borrado no se recuperará',
                showDenyButton: true,
                confirmButtonText: 'Si estoy seguro'

            })
           
            if(isConfirmed){
                Swal.fire({
                    title: 'Espere por favor ...',
                    allowOutsideClick: false
                })
                Swal.showLoading()
                console.log('A punto de eliminar')
                await this.deleteEntry(this.entry.id)
                this.$router.push({name: 'no-entry'})

                Swal.fire('Eliminado', '', 'success' )
            }
            
        },
        onSelectedImage( event ){
            const file = event.target.files[0] 
            if(!file){
                this.localImage = null
                this.file = null
                return 
            }

            this.file = file

            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL( file )
             
        },
        onSelectImage(){
            this.$refs.imageSelector.click()
            document
        }
    },

    created(){
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
}
</script>

<style lang="scss" scoped>
textarea{
    font-size: 20px;
    border: none;
    height: 100%;
    &:focus{
        outline: none;
    }
}
img{
    width: 200px;
    position: fixed;
    bottom: 150px;
    right: 20px;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);
}
</style>