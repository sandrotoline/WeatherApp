<template>
    <div 
        class="bg-yellow-300 absolute text-center rounded-b-lg w-40 py-2 right-5 sm:right-56 font-bold cursor-pointer transition duration-300 ease-in-out hover:bg-yellow-500"
        @click="addCity"
        v-if="route.query.preview"
        >
        SAVE LOCATION
    </div>
</template>

<script setup>
    import { RouterLink, useRoute, useRouter } from "vue-router";
    import { uid } from "uid";
    import { ref } from "vue";

    const savedCities = ref([]);
    const route = useRoute();
    const router = useRouter();

    const addCity = () => {
        if(localStorage.getItem('savedCities')){
            savedCities.value = JSON.parse(localStorage.getItem('savedCities'));
        }

        const locationObj = {
            id: uid(),
            state: route.params.state,
            city: route.params.city,
            country: route.params.country,
            coords:{
                lat: route.query.lat,
                lng: route.query.lng
            }
        };
        savedCities.value.push(locationObj);
        localStorage.setItem( "savedCities", JSON.stringify(savedCities.value));

        let query = Object.assign({}, route.query);
        delete query.preview;
        query.id = locationObj.id;
        router.replace({ query });
    };
</script>
