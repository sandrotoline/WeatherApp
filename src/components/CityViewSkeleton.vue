<template>
    <div class="flex flex-col flex-1 items-center">
        <div class="container flex flex-col items-start text-white py-6">
            <h1 class="text-3xl mb-2 w-full"><AnimatedPlaceholder class="max-w-[50%] w-full" /></h1>
            <p class="w-full"><AnimatedPlaceholder class="max-w-[100px] w-full" /></p>
            <div class="flex w-full justify-between flex-col sm:flex-row my-5">
                <div class="flex p-2 pr-6">
                    <div class="w-[200px]">
                        <AnimatedPlaceholder class="max-w-[150px] h-[150px] w-full mb-12" />
                    </div>
                    <div class="flex flex-col justify-start">
                        <p class="text-8xl"><AnimatedPlaceholder class="max-w-[150px] h-[96px] mx-10 w-full" /></p>
                        <p class="capitalize text-center"><AnimatedPlaceholder class="max-w-[75px] mx-10 my-5 w-full" /></p>
                    </div>
                </div>
                <div class="flex pt-1 gap-9 justify-between items-top">
                  <div class="flex flex-col">
                    <div class="mb-5">
                        <p class="text-white text-2xl w-[75px]"><AnimatedPlaceholder class="max-w-[50%px] he w-full" /></p>
                        <p class="text-white/50 w-[50px]"><AnimatedPlaceholder class="max-w-[50px] he w-full" /></p>
                    </div>
                    <div>
                        <p class="text-white text-2xl w-[75px]"><AnimatedPlaceholder class="max-w-[50%px] he w-full" /></p>
                        <p class="text-white/50 w-[50px]"><AnimatedPlaceholder class="max-w-[50px] he w-full" /></p>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div class="mb-5">
                        <p class="text-white text-2xl w-[75px]"><AnimatedPlaceholder class="max-w-[50%px] he w-full" /></p>
                        <p class="text-white/50 w-[50px]"><AnimatedPlaceholder class="max-w-[50px] he w-full" /></p>
                    </div>
                    <div>
                        <p class="text-white text-2xl w-[75px]"><AnimatedPlaceholder class="max-w-[50%px] he w-full" /></p>
                        <p class="text-white/50 w-[50px]"><AnimatedPlaceholder class="max-w-[50px] he w-full" /></p>
                    </div>
                  </div>
                  <div class="flex flex-col">
                    <div  class="mb-5">
                        <p class="text-white text-2xl w-[75px]"><AnimatedPlaceholder class="max-w-[50%px] he w-full" /></p>
                        <p class="text-white/50 w-[50px]"><AnimatedPlaceholder class="max-w-[50px] he w-full" /></p>
                    </div>
                    <div>
                        <p class="text-white text-2xl w-[75px]"><AnimatedPlaceholder class="max-w-[50%px] he w-full" /></p>
                        <p class="text-white/50 w-[50px]"><AnimatedPlaceholder class="max-w-[50px] he w-full" /></p>
                    </div>
                  </div>
                </div>
            </div>
        </div>
        <!-- Today's Weather-->
        <div class="container w-full">
            <h2 class="text-white"><AnimatedPlaceholder class="max-w-[75px] mb-2 he w-full" /></h2>
            <AnimatedPlaceholder
                class="max-w-screen-md h-[100px] w-full mb-12 "
            />
        </div>
         <!-- Weekly Weather-->
         <div class="container w-full">
            <h2 class="text-white"><AnimatedPlaceholder class="max-w-[75px] mb-2 w-full" /></h2>
            <AnimatedPlaceholder
                class="max-w-screen-md h-[100px] w-full mb-12 "
            />
        </div>
    </div>
</template>

<script setup>
import AnimatedPlaceholder from "./AnimatedPlaceholder.vue";
</script>