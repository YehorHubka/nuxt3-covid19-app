<template>
    <header class="p-3 flex justify-between items-center bg-slate-200 mb-10">
        <div class="flex items-center gap-2">
            <img src="@/assets/img/logo.png" width="25" alt="" />
            <div class="text-xl font-bold">Covid-19 Informer</div>
        </div>
        <nav v-if="!isAuth">
            <NuxtLink to="/login">Login</NuxtLink> |
            <NuxtLink to="/register">Register</NuxtLink>
        </nav>
        <button v-else @click="loggedOut()">Sign Out</button>
    </header>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
import { useAuthStore } from "@/stores/authStore";
import { mapState } from "pinia";

export default {
    methods: {
        loggedOut() {
            const auth = getAuth();
            signOut(auth)
                .then(() => {
                    // Sign-out successful.
                    this.$router.push("/login");
                })
                .catch((error) => {
                    // An error happened.
                    console.log("error:", error);
                });
        },
    },
    computed: {
        ...mapState(useAuthStore, ["isAuth"]),
    },
};
</script>

<style scoped>
.router-link-exact-active {
    color: #f00;
}
</style>