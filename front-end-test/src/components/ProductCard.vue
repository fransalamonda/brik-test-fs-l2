<template>
    <div class="row">
        <div
            v-for="product in products"
            :key="product.id"
            class="col-md-4 mb-4"
        >
            <div class="card h-100 shadow-sm p-2">
                <img
                    :src="product.image"
                    class="card-img-top shadow-sm img-fluid"
                    alt="Product Image"
                    style="object-fit: contain;"
                />
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">{{ product.description }}</p>
                    <p class="card-text text-muted">SKU: {{ product.sku }}</p>
                    <p class="card-text fw-bold">
                        Harga: Rp {{ formatPrice(product.price) }}
                    </p>
                    <button class="btn btn-primary w-100 mb-2" @click="viewDetails(product.id)">
                        Lihat details
                    </button>
                    <button class="btn btn-primary w-100" disabled>
                        Tambah ke Keranjang
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useProductStore } from "../stores/product.store";
import { useRouter } from "vue-router";

const router = useRouter();
const productStore = useProductStore();
const products = computed(() => productStore.products);

const formatPrice = (price: number) => {
    return price.toLocaleString("id-ID", { minimumFractionDigits: 0 });
};

const viewDetails = (id: string) => {
    router.push(`/details/${id}`);
};
</script>

<style scoped>
.card {
    border-radius: 15px;
    transition: transform 0.2s;
}

.card:hover {
    transform: scale(1.05);
}

.card-img-top {
    height: 200px;
    object-fit: cover;
}
</style>
