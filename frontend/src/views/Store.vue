<script setup>
    import { onMounted, ref } from 'vue';
    import Cookies from "js-cookie";
    
    const token = Cookies.get("authToken");

   const checkAuth = () => {
        if (!token) {
            window.location.href="/login"
            return false;
        }
        return true;
    }
    const subscriptions = ref({});
    const loading = ref(true)

    async function loadSubs() {//localhost:3000/subscriptions
        try {
            const response = await fetch("http://localhost:3000/subscriptions");

            if (!response.ok) {
                alert("Request failed")
                return
            }

            const data = await response.json()

            if (data) {
                subscriptions.value = data;
                loading.value = false
            } else {
                alert("Unable to load subscriptions")
            }
        } catch(err) {
            alert("Unable to load subscriptions " + err)
        }
    }

    async function buySub(subName) {
        if (!checkAuth()) return;
        try {
            const response = await fetch("http://localhost:3000/users/subscriptions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }, body: JSON.stringify({
                    subscriptionName: subName
                })
            });

            if (!response.ok) {
                alert("Request failed")
                return
            }

            const data = await response.json()

            if (data) {
                alert("You have succussfuly bought a subscription")
            } else {
                alert("Unable to Buy Subscription")
            }
        } catch(err) {
            alert("Unable to buy subscription " + err)
        }
    }

    onMounted(loadSubs)
</script>


<template>
    <template v-if="loading == true">
        <h1 class="text-4xl md:text-6xl text-white text-center mt-20 px-4">loading...</h1>
    </template>
    <template v-else>

    <h1 class="mt-6 md:mt-10 text-white font-medium text-2xl md:text-4xl text-center px-4">Available Subscriptions:</h1>

    <div class="p-4 md:p-10 lg:p-20">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-10 max-w-7xl mx-auto justify-items-center">
            <div class="bg-amber-300 p-5 rounded-2xl shadow-lg hover:shadow-xl transition-shadow w-full max-w-xs" v-for="(sub, name) in subscriptions" :key="name">
                <p class="font-medium mb-2">
                    <strong>Rank:</strong> {{ name }}
                </p>
                <p class="font-medium mb-2">
                    <strong>Price:</strong> {{ sub.price }}$
                </p>
                <p class="font-medium mb-2">
                    <strong>Duration:</strong> {{ sub.duration }} Days
                </p>    
                <p class="font-medium mb-1"><strong>Features:</strong></p>
                <ul class="pl-5 mb-4">
                    <li v-for="(feature, index) in sub.features" :key="index" class="list-disc font-medium text-sm md:text-base">{{ feature }}</li>
                </ul>
                <button v-on:click="buySub(name)" class="w-full md:w-auto px-6 py-2 bg-green-700 rounded mt-2 cursor-pointer hover:bg-green-600 transition text-white font-medium">
                    Purchase
                </button>
            </div>
        </div>
    </div>
    </template>
</template>