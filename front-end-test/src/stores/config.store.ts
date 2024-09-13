import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', {
    state: () => ({
        apiBaseUrl: 'http://localhost:3000/',
    }),
});
