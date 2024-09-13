<template>
    <div>
        <Navbar />

        <div class="container mt-5">
            <h2 class="text-center mb-4">Daftar Produk</h2>

            <div class="mb-4">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Cari produk berdasarkan nama..."
                    v-model="searchQuery"
                    @input="handleSearch"
                />
            </div>

            <div v-if="loading" class="text-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <div v-else>
                <div class="row">
                <div v-for="product in list_products"
                :key="product.id"
                class="col-md-4 mb-4">

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
                        Harga:{{ formatPrice(product.price) }}
                    </p>
                    <button class="btn btn-brik w-100 mb-2" @click="viewDetails(product.id)">
                        Lihat details
                    </button>
                    <button class="btn  w-100" disabled>
                        Tambah ke Keranjang
                    </button>
                   </div>
                 </div>

                </div>
            </div>
                <nav aria-label="Page navigation" class="mt-4">
                    <ul class="pagination justify-content-center">
                        <li
                            class="page-item"
                            :class="{ disabled: currentPage === 1 }"
                        >
                            <button
                                class="page-link"
                                @click="prevPage"
                                :disabled="currentPage === 1"
                            >
                                Previous
                            </button>
                        </li>
                        <li
                            class="page-item"
                            v-for="page in totalPages"
                            :key="page"
                            :class="{ active: page === currentPage }"
                        >
                            <button class="page-link" @click="goToPage(page)">
                                {{ page }}
                            </button>
                        </li>
                        <li
                            class="page-item"
                            :class="{ disabled: currentPage === totalPages }"
                        >
                            <button
                                class="page-link"
                                @click="nextPage"
                                :disabled="currentPage === totalPages"
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </div>
</template>

<script >
import { ref, onMounted, computed } from "vue";
import Navbar from "../components/Navbar.vue";
import { useProductStore } from "../stores/product.store";
export default {
    components: {
        Navbar
  },
  data: () => ({
    list_products:[],
    totalPages:0,
   // currentPage:0,
  }),
  methods: {
    
    async productData(page = 1, pageSize = 5, query = '') {
      const productStore = useProductStore(); // Mengambil store di dalam methods
      productStore.currentPage = page;

      // Panggil API untuk mendapatkan produk
      const response = await productStore.fetchProducts(page, pageSize, query);
      
    if (productStore.products.length > 0) {
      this.list_products = productStore.products; 
      this.totalPages = productStore.totalPages;
      //this.currentPage = productStore.totalItems;
   } 
   
    },

    formatPrice(value) {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);
    },
    viewDetails(productId) {

            const router = this.$router; 
      router.push(`/details/${productId}`);
        }
  },
  mounted() {
    this.productData();
  }
};
//import { ref, onMounted, computed } from "vue";
// 
// 

// const productStore = useProductStore();
// const loading = computed(() => productStore.loading);
// const currentPage = computed(() => productStore.currentPage);
// const totalPages = computed(() => productStore.totalPages);
// const searchQuery = ref(productStore.searchQuery);

// onMounted(async () => {
// //    await productStore.fetchProducts();
// });


// const prevPage = () => {
//   //  productStore.prevPage();
// };

// const nextPage = () => {
//     //productStore.nextPage();
// };

// const goToPage = (page: number) => {
//     //productStore.goToPage(page);
// };

// const handleSearch = () => {
//     //productStore.searchProducts(searchQuery.value);
// };
</script>

<style scoped>
.btn-brik {
    background-color: rgb(255, 206, 2);
    border-color: rgb(255, 206, 2); 
}
.btn-brik:hover {
    background-color: #780e05;
    border-color: #780e05; 
}
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
