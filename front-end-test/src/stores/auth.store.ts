import { defineStore } from 'pinia';
import axios from 'axios';
import { useConfigStore } from './config.store';
import type { UserInterface } from './user.interface';




export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null as unknown as UserInterface | null,
        isAuthenticated: false,
        accessToken: '' as string,
    }),
    actions: {
        async login(email: string, password: string) {
            const configStore = useConfigStore();
            const apiBaseUrl = configStore.apiBaseUrl;

            try {
                const response = await axios.post(`${apiBaseUrl}login`, { email, password });
                if (response.data.status) {
                    this.user = response.data.data;
                    this.isAuthenticated = true;
                    localStorage.setItem('user', JSON.stringify(this.user));
                    localStorage.setItem('token', response.data.data.access_token);
                }
            } catch (error) {
                throw error;
            }
        },
        logout() {
            this.user = null;
            this.accessToken = '';
            this.isAuthenticated = false;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
});
