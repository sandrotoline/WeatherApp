<template>
    <h2 v-if="savedCities.length > 0" class="text-center text-2xl mb-8">Saved Cities:</h2>
    <div class="flex flex-col gap-2 flex-wrap sm:flex-row">
        <div v-for="city in savedCities" :key="city.id">
            <CityCard :city="city" @click="goToCityView(city)"/>
        </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";
const apiWeatherKey = "4fee48452b346d63d3cc8a22ab82bb77";
const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(
      localStorage.getItem("savedCities")
    );

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.lat}&lon=${city.coords.lng}&appid=${apiWeatherKey}&units=metric`
        )
      );
    });

    const weatherData = await Promise.all(requests);

    await new Promise((res) => setTimeout(res,500));

    weatherData.forEach((value, index) => {
      savedCities.value[index].weather = value.data;
    });
  }
};
await getCities();

const router = useRouter();
const goToCityView = (city) => { 
    router.push({
        name: "cityView",
        params: { state:city.state, city:city.city, country:city.country },
        query: { id: city.id, lat:city.coords.lat, lng: city.coords.lng },
    });
};

</script>