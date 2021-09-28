

<template>
    <nav class="navbar bg-primary">
        <a class="navbar-brand text-white">
            <img src="@/assets/logo.png" alt="Vue logo" height="24" class="d-inline-block aling-text-top mx-2" >
            {{userName}} 
        </a>

        <div class="d-flex mx-3">
            <button @click="onLogOut" class="btn btn-outline-info"><i class="fa fa-sign-out-alt"></i></button>
        </div>
        
    </nav>
</template>

<script>
import { useRouter } from "vue-router"
import useAuth from "../../auth/composables/useAuth"



export default ({
    setup() {
        
        const router = useRouter()
        const { userName, logOut } = useAuth()

        return{
            userName,
            onLogOut: () =>{
                router.push({name: 'login'})
                logOut()
            } 
        }
    },
})
</script>
