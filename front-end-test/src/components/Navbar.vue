<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
            <a class="btn btn-brik navbar-brand" href="#">Toko Klontong</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <button class="btn btn-outline-danger" @click="handleLogout">Logout</button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "../stores/auth.store";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const handleLogout = () => {
    authStore.logout();
    router.push("/login");
};
</script>

<style scoped>
/* @import 'vue3-easy-data-table/dist/style.css'; */
.btn-brik {
    background-color: #780e05;
    border-color: #780e05; 

}
.btn-brik:hover {
    background-color: rgb(255, 206, 2);
    border-color: rgb(255, 206, 2);     
}
</style>
