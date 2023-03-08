<template>
    <div class="text-center">
        <h1 class="font-bold uppercase text-3xl mb-5">Login</h1>

        <form
            class="m-9 max-w-[100%] w-[400px] m-auto text-center"
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
                Login
            </button>
            <div>
                If don't have an account you can make it. <br />
                Go and
                <NuxtLink
                    class="font-bold text-red text-blue-600 hover:text-blue-800 transition"
                    to="/register"
                    >register</NuxtLink
                >
            </div>
        </form>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useAuthStore } from "@/stores/authStore";

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
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then((userCredential) => {
                    const store = useAuthStore();
                    store.isAuth = true;
                    this.$router.push("/");
                })
                .catch((error) => {
                    this.error = error;
                });
        },
    },
};
</script>