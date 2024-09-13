import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useConfigStore } from './config.store';

export const useCategoryStore = defineStore('category', () => {
    const categories = ref([]);
    const loading = ref(false);

    const fetchCategories = async () => {
        const configStore = useConfigStore();
        const apiBaseUrl = configStore.apiBaseUrl;
        loading.value = true;
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${apiBaseUrl}categories`, {
                headers: {
                    'access_token': token,
                },
            });
            categories.value = response.data.data;
        } catch (error) {
            console.error('Failed to fetch categories', error);
        } finally {
            loading.value = false;
        }
    };

    return { categories, loading, fetchCategories };
});
