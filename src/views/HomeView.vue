<template>
  <main class="container text-white">
    <div class="mb-8 relative bg-white rounded-sm py-3">
      <input 
      type="text" 
      v-model="searchQuery"
      @input="getSearchResults"
      placeholder="Search for a city" 
      class="text-black w-5/6 focus:outline-none px-3 ">
      <button class="border-l border-[#ccc] w-1/6" @click="getLocation()"><i class="fa-solid fa-location-crosshairs text-[grey] text-lg"></i></button>
      <ul v-if="searchResultMap" class="absolute bg-white text-blue-900 w-full shadow-md top-[55px] ease-in-out duration-200 rounded-sm">
        <p class="p-2" v-if="searchError">Sorry, something went wrong, please try again</p>
        <p class="p-2" v-if="!searchError && searchResultMap.length === 0">No result match your query, please try a different term.</p>
        <template v-else>
            <li 
              v-for="searchResult in searchResultMap" 
              :key="searchResult.id" 
              class="p-2 border-b border-[#ccc] cursor-pointer last:border-0 hover:bg-weather-secondary hover:text-white"
              @click="previewCity(searchResult)"
              >
              {{ searchResult.place_name }}
            </li>
        </template>
      </ul>
    </div>
    <div>
      <Suspense>
        <CityList />
        <template #fallback>
          <CityCardSkeleton/>
        </template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import CityCardSkeleton from '../components/CityCardSkeleton.vue';

const keyMapBox = "pk.eyJ1IjoidDBsaW5lIiwiYSI6ImNsaGh5czJqbDAycGUzZnBiMXlvZ3B5d2cifQ.lqIMoisaZE5WeXtF_0B9YQ";
const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResultMap = ref(null);
const searchError = ref(null);
const currentLocation = ref(); 

const router = useRouter();

const getLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

const showPosition = (position) => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.coords.longitude},${position.coords.latitude}.json?access_token=${keyMapBox}&types=place`
        );
        currentLocation.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return previewCityByLtLg(currentLocation.value[0]);
  });
}

const previewCityByLtLg = (currentLocationResult) => {
  console.log(currentLocationResult);
  const [city,state,country] = currentLocationResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: {state: state.replaceAll(" ",""), city: city, country: country},
    query:{
      lat: currentLocationResult.geometry.coordinates[1],
      lng: currentLocationResult.geometry.coordinates[0],
      preview: true,
    }
  }); 
}

const previewCity = (searchResult) => {
  console.log(searchResult);
  const [city,state,country] = searchResult.place_name.split(",");
  router.push({
    name: "cityView",
    params: {state: state.replaceAll(" ",""), city: city, country: country},
    query:{
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    }
  });
}


const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value.length !== 0) {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${keyMapBox}&types=place`
        );
        searchResultMap.value = result.data.features;
      } catch {
        searchError.value = true;
      }
      return;
    }
    searchResultMap.value = null;
  },300);
}


</script>