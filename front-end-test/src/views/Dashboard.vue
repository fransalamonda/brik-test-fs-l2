<template>
    <div class="container mt-5">
        <Navbar />

        <h2 class="text-3xl mb-5">Product Dashboard</h2>
        <div class="mb-4">
            <button class="btn btn-brik" @click="openAddProductModal">Add Product</button>

        </div>
        <div v-if="showTable">
            <v-data-table 
    v-model:search="search"
                    :headers="headers"
                    :items="list_products"
                    :items-per-page="itemsPerPage"
                    :server-items-length="totalItems"
                  class="">
                  
                  <template v-slot:item="{ item }">
                    <tr class="text-xs bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td class="text-start">{{ item.categoryName }}</td>
                      <td class="text-start">{{ item.sku }}</td>
                      <td class="text-start">{{ item.name	 }}</td>
                      <td class="">{{ item.description	 }}</td>
                      <td class="text-start">
                        <v-card class="my-2" elevation="2" rounded>
                            <v-img
                               :src="item.image"
                            :height="item.height + 'px'" 
                            cover
                            ></v-img></v-card>
                        </td>
                        <td class="text-start">
                            <div class="flex gap-4">
                                <button class="btn btn-brik" @click="viewDetails(item.id)">View</button>
                                <button type="button" class="btn btn-danger !py-1 mx-1" @click="deleteProduct(item.id, item.name)">Delete</button>
                            </div>
                        </td>
                    </tr>              
                  </template>

                  <template v-slot:no-data>
                    <tr class="text-xs bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td colspan="6" class="text-center">No Data, Select Filter Date </td>
                    </tr>
                  </template>
                  
         </v-data-table>
        </div> 
         

         <AddProductModal 
            :showModal="showModal" 
            @addProductSuccess="fetchProducts(1, params.pageSize)"
            :closeModal="() => showModal = false" 
        />

    </div>
</template>

<script >
import { ref } from 'vue';
import { useProductStore } from '../stores/product.store'; 
import AddProductModal from '../components/AddProductModal.vue';
import Navbar from "../components/Navbar.vue";

export default {
  components: {
    Navbar,
    AddProductModal,
  },
  data: () => ({
    showModal: false, 
    showTable: true,
    rowOptions : [5, 10, 20, 30],
    
    page: 1,
    itemsPerPage: 5,
    totalItems: 0,
    itemsPerPageOptions: [5, 10, 50, 100, 200],
      headers: [
        { title: 'Category Name', value: 'categoryName', align: 'start', minWidth: "150px"  },
        { title: 'SKU', value: 'sku', align: 'start', minWidth: "150px"  },
        { title: 'Name', value: 'name', align: 'start', minWidth: "150px" },
        { title: 'description', value: 'description', align: 'start', minWidth: "100px" },
        { title: 'Image', value: 'image', align: 'start', minWidth: "100px" },
        { title: 'Actions', value: '', align: 'start', minWidth: "100px" },
    ],
    list_products: [],
  }),
  methods: {
    openAddProductModal() {
      this.showModal = true;
      //this.showTable = false; // Sembunyikan tabel ketika modal dibuka
    },

    async productData(page = 1, pageSize = 5, query = '') {
      const productStore = useProductStore(); // Mengambil store di dalam methods
      productStore.currentPage = page;

      // Panggil API untuk mendapatkan produk
      const response = await productStore.fetchProducts(page, pageSize, query);
      
    if (productStore.products.length > 0) {
      this.list_products = productStore.products; // Update list_products dengan hasil API
   } 
   
    },

    viewDetails(id){
        const router = this.$router; 
      router.push(`/details/${id}`);
    }
  },
  mounted() {
    this.productData();
  }
};
</script>

<style scoped>
/* @import 'vue3-easy-data-table/dist/style.css'; */
.btn-brik {
    background-color: rgb(255, 206, 2);
    border-color: rgb(255, 206, 2); 
}
.btn-brik:hover {
    background-color: #780e05;
    border-color: #780e05; 
}
</style>
