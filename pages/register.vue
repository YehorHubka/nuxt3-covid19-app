<template>
    <div class="text-center">
        <h1 class="font-bold uppercase text-3xl mb-5">Register</h1>

        <form
            class="m-9 max-w-[100%] w-[400px] m-auto"
            @submit.prevent="submitHandler"
        >
            <div class="mb-3 text-red-600" v-if="error">
                {{ error.message }}
            </div>
            <input
                class="w-[100%] border px-5 h-[40px] mb-5"
                type="text"
                placeholder="Email..."
                v-model="email"
            />
            <input
                class="w-[100%] border px-5 h-[40px] mb-5"
                type="password"
                placeholder="Password..."
                v-model="password"
            />
            <button
                class="py-2 px-10 mb-5 bg-slate-600 text-white hover:bg-slate-800 transition"
                type="submit"
            >
                Register
            </button>
            <div>
                If you already have an account - <br />
                go and
                <NuxtLink
                    class="font-bold text-red text-blue-600 hover:text-blue-800 transition"
                    to="/login"
                    >login</NuxtLink
                >
            </div>
        </form>
    </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
    data() {
        return {
            error: "",
            email: "",
            password: "",
        };
    },
    methods: {
        submitHandler() {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    // Signed in
                    this.$router.push("/");
                })
                .catch((error) => {
                    this.error = error;
                });
        },
    },
};
</script>