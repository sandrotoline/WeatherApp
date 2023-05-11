<template>
    <div class="flex flex-col flex-1 items-center">
        <div class="container flex flex-col items-start text-white py-6">
            <h1 class="text-3xl mb-2">{{ route.params.city }},{{ route.params.country }}</h1>
            <p>{{new Date(weatherData.currentTime).toLocaleDateString("en-UK",{weekday: "long",day: "2-digit",month: "long",})}}</p>
            <div class="flex w-full justify-between flex-col sm:flex-row">
                <div class="flex p-2 pr-6 sm:border-r">
                    <div class="w-48">
                        <img class="w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${weatherData.current.weather[0].icon}@2x.png`" alt=""/>
                    </div>
                    <div class="flex flex-col justify-start">
                        <p class="text-8xl mt-4 ">{{ Math.round(weatherData.current.temp) }}°</p>
                        <p class="capitalize text-center">{{ weatherData.current.weather[0].description }}</p>
                    </div>
                </div>
                <div class="flex pt-1 gap-9 justify-between items-end sm:pl-4">
                  <div class="flex flex-col">
                    <div class="mb-5">
                        <p class="text-white text-2xl">{{ Math.round(weatherData.daily[0].temp.max) }}°</p>
                        <p class="text-white/50">High</p>
                    </div>
                    <div>
                        <p class="text-white text-2xl">{{ Math.round(weatherData.daily[0].temp.min) }}°</p>
                        <p class="text-white/50">Low</p>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="mb-5">
                        <p class="text-white text-2xl">{{ (weatherData.daily[0].wind_speed*3.6).toFixed(2) }}mph</p>
                        <p class="text-white/50">Wind</p>
                    </div>
                    <div>
                        <p class="text-white text-2xl">{{ Math.round(weatherData.daily[0].pressure*0.02953).toFixed(2) }}in</p>
                        <p class="text-white/50">Pressure</p>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div  class="mb-5">
                        <p class="text-white text-2xl">{{ weatherData.daily[0].humidity}}%</p>
                        <p class="text-white/50">Pressure</p>
                    </div>
                    <div>
                        <p class="text-white text-2xl"> {{ (weatherData.daily[0].pop*100).toFixed(0)}}%</p>
                        <p class="text-white/50">Preciptation</p>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <!-- Today's Weather-->
        <div class="container w-full">
            <h2 class="text-white">Today's Weather</h2>
            <div class="flex overflow-x-hidden justify-between flex-wrap flex-row">
                <div
                    v-for="hourData in weatherData.hourly.slice(1,7)" :key="hourData.dt"
                    class="flex flex-col gap-4 items-center bg-sky-950/50 rounded-sm p-6 px-7 my-4"
                >
                    <p class="whitespace-nowrap text-md text-white"> {{new Date(hourData.currentTime).toLocaleTimeString("en-us", {hour: "numeric",})}}</p>
                    <img class="w-auto h-[50px] object-cover" :src="`http://openweathermap.org/img/wn/${hourData.weather[0].icon}@2x.png`" alt="" />
                    <p class="text-xl text-white"> {{ Math.round(hourData.temp) }}°</p>
                </div>
            </div>
        </div>
         <!-- Weekly Weather-->
         <div class="container w-full">
            <h2 class="text-white">Next 3 Days</h2>
            <div class="flex my-2 flex-col bg-sky-950/50 rounded-sm"  v-for="day in weatherData.daily.slice(1,4)" :key="day.dt">
                <div class="flex p-6 justify-between items-center flex-wrap gap-10 sm:gap-0">
                    <div class="flex flex-col">
                        <p class="text-center text-white">{{new Date(day.dt * 1000).toLocaleDateString("en-us",{weekday: "short",})}}</p>
                        <p class="text-center text-white">{{new Date(day.dt * 1000).toLocaleDateString("en-GB",{day: "2-digit",month: "2-digit",})}}</p>
                    </div>
                    <div>
                        <img class="w-[50px] h-[50px] object-cover" :src=" `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`" alt=""/>
                    </div>
                    <div class="flex flex-col text-center">
                        <p class="text-white">{{ Math.round(day.temp.min) }}°</p>
                        <p class="text-white/50">Low</p>
                    </div>
                    <div class="flex flex-col text-center">
                        <p  class="text-white">{{ Math.round(day.temp.max) }}°</p>
                        <p class="text-white/50">High</p>
                    </div>
                    <div class="flex flex-col text-center">
                        <p class="text-center text-white"> <span v-if="day.pop > 0">{{ Math.round((day.pop)*100) }}%</span> <span v-else>0%</span></p>
                        <p class="text-white/50">Rain</p>
                    </div>
                    <div class="flex flex-col text-center">
                        <p class="text-center text-white">{{ (day.wind_speed*3.6).toFixed(2) }}mph</p>
                        <p class="text-white/50">Wind</p>
                    </div>
                </div>
            </div>
         </div>
         <div v-if="!route.query.preview" class="flex items-center gap-2 py-6 text-white cursor-pointer duration-150 hover:text-red-800" @click="removeCity">
            <i class="fa-solid fa-trash"></i> <p>Remove City</p>
         </div>
    </div>
</template>

<script setup>
import axios from "axios";
import { useRoute, useRouter } from "vue-router";
const apiWeatherKey = "4fee48452b346d63d3cc8a22ab82bb77";
const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=${apiWeatherKey}&units=metric`
    );

    // current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime =
        utc + 1000 * weatherData.data.timezone_offset;
    });

    await new Promise((res) => setTimeout(res,500));

    return weatherData.data;
  } catch (err) {
    console.log(err);
  }
};
const weatherData = await getWeatherData();

const router = useRouter();
const removeCity = () => {
    const cities = JSON.parse(localStorage.getItem("savedCities"));
    const updateCities = cities.filter((city) => city.id !== route.query.id);
    localStorage.setItem("savedCities", JSON.stringify(updateCities));
    router.push({
        name: "home",
    });
};

</script>
