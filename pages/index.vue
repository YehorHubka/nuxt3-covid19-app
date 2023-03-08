<template>
    <div>
        <h1 class="font-bold mb-6 mt-0 text-center text-3xl">
            Covid-19 API data (last {{ dataLength }} days info)
        </h1>

        <div v-if="!loader">
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table
                                class="min-w-full text-left text-sm font-light"
                            >
                                <thead class="border-b font-medium">
                                    <tr>
                                        <th scope="col" class="px-6 py-4">#</th>
                                        <th scope="col" class="px-6 py-4">
                                            Date
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Confirmed diff
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Deaths diff
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Active diff
                                        </th>
                                        <th scope="col" class="px-6 py-4">
                                            Delete
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr
                                        v-for="(info, idx) in localData"
                                        :key="info.id"
                                        class="border-b"
                                    >
                                        <td
                                            class="whitespace-nowrap px-6 py-4 font-medium"
                                        >
                                            {{ idx + 1 }}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                            {{ info.date }}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                            {{ info.confirmed_diff }}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                            {{ info.deaths_diff }}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                            {{ info.active_diff }}
                                        </td>
                                        <td class="whitespace-nowrap px-6 py-4">
                                            <button
                                                @click="
                                                    deleteRowHandler(info.id)
                                                "
                                                class="text-white bg-red-700 py-1 px-3 hover:bg-red-500 transition"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="flex justify-center items-center flex-col">
            <img src="@/assets/img/loading.gif" width="40" alt="" />
            <div class="font-bold mt-5 text-xl text-center">
                There are no data yet. <br />Press "Refresh data" to see a new
                data.
            </div>
        </div>
        <div class="flex justify-center mt-5">
            <button
                @click="refreshData()"
                class="py-2 px-4 bg-red-700 hover:bg-red-500 font-bold text-white transition"
            >
                Refresh data
            </button>
        </div>
    </div>
</template>

<script>
import { getAuth } from "firebase/auth";
import { useAuthStore } from "@/stores/authStore";
import { useDataStore } from "@/stores/dataStore";
import { mapState } from "pinia";

export default {
    data() {
        return {
            localData: [],
        };
    },
    methods: {
        loginCheck() {
            const auth = getAuth();
            const store = useAuthStore();
            auth.onAuthStateChanged((user) => {
                if (user) {
                    // User is signed in
                    console.log("User is signed in");
                    store.isAuth = true;
                    this.$router.push("/");
                } else {
                    // User is signed out
                    console.log("User is signed out");
                    store.isAuth = false;
                    this.$router.push("/login");
                }
            });
        },
        refreshData() {
            const dataStore = useDataStore();
            dataStore.data = [];
            dataStore.fetchData();
            localStorage.setItem("localData", JSON.stringify(this.data));
            this.setData();
        },
        deleteRowHandler(id) {
            this.localData = this.localData.filter((el) => el.id !== id);
            localStorage.setItem("localData", JSON.stringify(this.localData));
        },
        setData() {
            if (
                JSON.parse(localStorage.getItem("localData") || "[]").length ==
                0
            ) {
                localStorage.setItem("localData", JSON.stringify(this.data));
                this.localData = JSON.parse(
                    localStorage.getItem("localData") || "[]"
                );
                //console.log("set this.localData", this.localData);
            } else {
                this.localData = JSON.parse(
                    localStorage.getItem("localData") || "[]"
                );
                //console.log("else this.localData", this.localData);
            }
        },
    },
    watch: {
        loader(newV) {
            //console.log("loader", newV);
            if (!newV) {
                this.setData();
            }
        },
    },
    mounted() {
        if (this.data.length == 0) {
            const dataStore = useDataStore();
            dataStore.fetchData();
        } else {
            this.localData = JSON.parse(
                localStorage.getItem("localData") || "[]"
            );
        }

        this.loginCheck();
    },
    computed: {
        ...mapState(useAuthStore, ["isAuth"]),
        ...mapState(useDataStore, ["data", "loader", "dataLength"]),
    },
};
</script>