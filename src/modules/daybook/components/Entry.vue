
<template>
    <div class="entry-container mb-3 pointer p-2" 
    @click="$router.push( { name:'entry', params:{id: 10} } )">
        <!-- Titulo -->
        <div class="entry-title d-flex">
            <span class="text-success fs-5 fw-bold">03</span>
            <span class="mx-1 fs-5">septiembre</span>
            <span class="mx-1 fw-light">2021, viernes</span>
        </div>

        <div class="entry-description">
            Tempor ullamco nulla minim dolor cillum laborum sit. Reprehenderit irure commodo velit dolore enim sit minim incididunt fugiat dolor in excepteur excepteur. Do sunt qui veniam exercitation sit sunt quis elit nulla consectetur laboris dolor. Esse veniam officia excepteur aute et sint labore voluptate ea. Ut quis do ut aliqua culpa aute deserunt in labore nulla amet commodo aliqua. Velit enim ad eu laborum sunt enim sint consectetur proident dolor pariatur.
        </div>
    
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.entry-container{
    border-bottom: 1px solid #2c3e50;
    transition: 0.2s all ease-in;

    &:hover{
        background-color: lighten($color: grey, $amount: 45);
        transition: 0.2s all ease-in;
    }
    .entry-description{
        font-size: 12px;
    }
}

</style>