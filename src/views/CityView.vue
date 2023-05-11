<template>
    <div class="w-full items-top min-h-screen">
        <AddCity/>
        <Suspense>
            <AsyncCityView/>
            <template #fallback>
                <CityViewSkeleton/>
            </template>
        </Suspense>
    </div>
</template>

<script setup>
import AddCity from '../components/AddCity.vue';
import AsyncCityView from '../components/AsyncCityView.vue';
import CityViewSkeleton from '../components/CityViewSkeleton.vue';
</script>
