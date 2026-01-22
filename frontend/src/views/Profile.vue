<script setup>
    import Cookies from "js-cookie";
    import { onMounted, ref } from "vue";
    
    const token = Cookies.get("authToken");
    const subscriptions = ref([]);

    const checkAuth = () => {
        if (!token) {
            window.location.href="/login"
            return false;
        }
        return true;
    }

    async function loadSubscriptions() {
        if (!checkAuth()) return;
        try {
            const response = await fetch("http://localhost:3000/users/subscriptions", {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + token
                }
            });

            if (!response.ok) {
                alert("Request failed")
                return
            }

            const data = await response.json()

            if (data) {
                subscriptions.value = data
            } else {
                alert("Unable to Load Subscription")
            }
        } catch(err) {
            alert("Unable to Load subscription " + err)
        }
    }
    onMounted(loadSubscriptions);
</script>

<template>
    <h1 class="mt-10 text-white font-medium text-4xl text-center">Your Subscriptions: </h1>
    <div class="flex gap-5 justify-center mt-10">
        <div class="w-10 h-7 bg-amber-300" v-for="subscription in subscriptions">
            <p class="font-medium">{{ subscription.subscription }}</p>
        </div>
    </div>
</template>