<template>
    <div v-if="showModal" class="modal fade show d-block" tabindex="-1" role="dialog">
        <div class="modal-dialog modal-lg" role="document">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Add Product</h5>
                    <button type="button" class="btn-close" aria-label="Close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="addProduct" class="p-3">
                        <div class="form-group">
                            <label for="name">Name</label>
                            <input v-model="newProduct.name" type="text" id="name" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="sku">SKU</label>
                            <input v-model="newProduct.sku" type="text" id="sku" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="description">Description</label>
                            <textarea v-model="newProduct.description" id="description" class="form-control" required></textarea>
                        </div>
                        <div class="form-group">
                            <label for="weight">Weight</label>
                            <input v-model="newProduct.weight" type="number" id="weight" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="width">Width</label>
                            <input v-model="newProduct.width" type="number" id="width" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="length">Length</label>
                            <input v-model="newProduct.length" type="number" id="length" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="height">Height</label>
                            <input v-model="newProduct.height" type="number" id="height" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="image">Image URL</label>
                            <input v-model="newProduct.image" type="text" id="image" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="price">Price</label>
                            <input v-model="newProduct.price" type="number" id="price" class="form-control" required />
                        </div>
                        <div class="form-group">
                            <label for="category">Category</label>
                            <select v-model="newProduct.categoryId" id="category" class="form-select" required>
                                <option v-for="category in categories" :key="category.id" :value="category.id">
                                    {{ category.name }}
                                </option>
                            </select>
                        </div>
                        <button type="submit" class="btn btn-brik">Save Product</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { useProductStore } from '../stores/product.store'; 
import { useCategoryStore } from "../stores/category.store";
import Swal from 'sweetalert2';

const props = defineProps<{
    showModal: boolean;
    closeModal: () => void;
}>();

const emit = defineEmits<{
    (event: 'addProductSuccess'): void;
}>();

const productStore = useProductStore();
const categoryStore = useCategoryStore();

const newProduct = reactive({
    name: '',
    sku: '',
    description: '',
    weight: 0,
    width: 0,
    length: 0,
    height: 0,
    image: '',
    price: 0,
    categoryId: ''
});

const categories :any= ref([]);

const fetchCategories = async () => {
    await categoryStore.fetchCategories();
    categories.value = categoryStore.categories;
};

const addProduct = async () => {
    try {
        await productStore.addProduct(newProduct);
        newProduct.name = '';
        newProduct.sku = '';
        newProduct.description = '';
        newProduct.weight = 0;
        newProduct.width = 0;
        newProduct.length = 0;
        newProduct.height = 0;
        newProduct.image = '';
        newProduct.price = 0;
        newProduct.categoryId = '';
        props.closeModal();
        emit('addProductSuccess');
        Swal.fire({
            icon: 'success',
            title: 'Berhasil menambahkan product',
            text: 'Selamat datang!',
            timer: 1500,
            showConfirmButton: false,
        });
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Gagal menambah product',
            text: 'Periksa kembali data Anda.',
        });
    }
};

watch(() => props.showModal, (newVal) => {
    if (newVal) {
        fetchCategories();
    }
});
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
.modal-dialog {
    max-width: 40%; 
}

.modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}


.btn-close {
    font-size: 1.5rem;
    padding: 0.5rem; 
    margin-left: auto; 
}

</style>
