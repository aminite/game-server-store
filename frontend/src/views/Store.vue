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
                alert("You hought sun")
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
        <h1 class="text-6xl text-white text-center mt-20">loading...</h1>
    </template>
    <div v-else class="flex justify-center items-center p-20 gap-10">
        <div class="w-60 bg-amber-400 p-5 rounded-2xl" v-for="(sub, name) in subscriptions">
            <p class="font-medium">
                <strong>Rank:</strong> {{ name }}
            </p>
            <p class="font-medium">
                <strong>Price:</strong> {{ sub.price }}$
            </p>
            <p class="font-medium">
                <strong>Duration:</strong> {{ sub.duration }} Days
            </p>    
            <p class="font-medium"><strong>Features:</strong> </p>
            <ul class="pl-5">
                <li v-for="feature in sub.features" class="list-disc font-medium"> {{ feature }}</li>
            </ul>
            <button v-on:click="buySub(name)" class="w-20 h-8 bg-green-700 rounded mt-5 cursor-pointer hover:bg-green-600 transition text-white font-medium">
                Purchase
            </button>
        </div>
    </div>
</template>