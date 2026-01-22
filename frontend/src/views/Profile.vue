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

    const isExpired = (sub) => {
        if (!sub?.expiresAt) return false;

        const expires = new Date(sub.expiresAt);
        if (isNaN(expires)) return false;

        return Date.now() > expires.getTime();
    };

    onMounted(loadSubscriptions);
</script>

<template>
    <h1 class="mt-6 md:mt-10 text-white font-medium text-2xl md:text-4xl text-center px-4">Your Subscriptions:</h1>
    
    <div class="p-4 md:p-10 lg:p-20">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-10 max-w-7xl mx-auto justify-items-center">
            <div class="bg-amber-300 p-5 rounded-xl shadow-lg hover:shadow-xl transition-shadow w-full max-w-xs" v-for="(subscription, index) in subscriptions" :key="index">
                <p class="font-medium mb-2 wrap-break-word">
                    <strong>Subscription:</strong> {{ subscription.subscription }}
                </p>

                <p v-if="isExpired(subscription)" class="font-medium text-red-600 mb-2">
                    <strong>Status:</strong> Expired
                </p>
                <p v-else class="font-medium text-green-600 mb-2">
                    <strong>Status:</strong> Active
                </p>

                <p class="font-medium mb-2 text-sm md:text-base">
                    <strong>Bought At:</strong> {{ subscription.createdAt?.slice(0, 10) }}
                </p>
                <p class="font-medium text-sm md:text-base">
                    <strong>Expires At:</strong> {{ subscription.expiresAt?.slice(0, 10) }}
                </p>
            </div>
        </div>
    </div>
</template>