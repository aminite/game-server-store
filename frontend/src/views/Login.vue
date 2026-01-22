<script setup>
import { ref } from 'vue';

    const email = ref("");
    const password = ref("");

    async function login() {
        try {
            const response = await fetch("http://localhost:3000/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }, body: JSON.stringify({
                    email: email.value,
                    password: password.value
                })
            })

            const data = await response.json();
        
            if (!response.ok) {
                alert("Unable to login " + data.message);
                return;
            }

            if (data.token) {
                document.cookie = `authToken=${data.token}; path=/; max-age=3600`;
                alert("Login succusful")
            }
        } catch(err) {
            alert(err)
        }
    }
</script>

<template>
    <form @submit.prevent="login" class="flex flex-col w-100 h-80 bg-amber-300 justify-self-center mt-25 rounded-2xl items-center p-5">
        <label class="font-medium text-2xl">
            Email:
            <br> 
            <input v-model="email" class="mt-2 bg-gray-50 border-2" type="email">
        </label>

        <br>

        <label class="font-medium text-2xl">
            Password:
            <br> 
            <input v-model="password" class="mt-2 bg-gray-50 border-2" type="password">
        </label>

        <input value="Login" type="submit" class="cursor-pointer mt-10 w-40 h-15 rounded-2xl bg-green-700 hover:bg-green-600 transition"/>
    </form>
</template>