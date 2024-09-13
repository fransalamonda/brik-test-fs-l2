<template>
    <div class="d-flex justify-content-center align-items-center vh-100">
        <div class="card p-4 shadow-lg" style="max-width: 400px; width: 100%; border-radius: 15px;">
            <div class="card-body">
                <h2 class="card-title text-center mb-4">Toko Klontong</h2>
                <h2 class="card-title text-center mb-4">Login</h2>
                <form @submit.prevent="handleLogin">
                    <div class="mb-3">
                        <label for="email" class="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            v-model="email"
                            class="form-control"
                            required
                        />
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            v-model="password"
                            class="form-control"
                            required
                        />
                    </div>
                    <button type="submit" class="btn btn-primary w-100">Login</button>
                </form>
                <div v-if="error" class="alert alert-danger mt-3 text-center">{{ error }}</div>
            </div>
        </div>
    </div>
</template>

<script >
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth.store';
import swal from 'sweetalert2';
import { useRouter } from 'vue-router';

export default {
    components: {
    },
    data() {
        return {
            email: '',          // Model untuk input email
            password: '',       // Model untuk input password
            error: null,        // Untuk menyimpan pesan error jika login gagal
        };
    },
    methods: {
        async handleLogin() {
            const authStore = useAuthStore();  // Mengambil authStore dari Pinia
            this.error = null;  // Reset error sebelum mencoba login
            const router = useRouter();
            try{
                // Panggil action login dari store
                await authStore.login(this.email, this.password);
                 // Tampilkan pesan sukses 
                 swal.fire({
                    icon: 'success',
                    title: 'Login berhasil',
                    text: 'Selamat datang!',
                    timer: 2000,
                    showConfirmButton: false,
                });
                // Redirect setelah login berhasil, berdasarkan tipe user
                setTimeout(() => {
                    if (authStore.user && authStore.user.group === 'admin') {
                        this.$router.push('/dashboard');  // Redirect ke dashboard jika admin
                    } else {
                        this.$router.push('/');  // Redirect ke home jika bukan admin
                    }
                }, 1000);

            } catch (e) {
                // Tangani error jika login gagal
                this.error = 'Email atau password salah';
            }
        }
    }
};

// import Swal from 'sweetalert2';
// 
// import { useRouter } from 'vue-router'; 

// 
// const router = useRouter(); 
// const email = ref('');
// const password = ref('');
// const error = ref('');

// const handleLogin = async () => {
//     error.value = '';
//     try {
        // await authStore.login(email.value, password.value);
        // Swal.fire({
        //     icon: 'success',
        //     title: 'Login berhasil',
        //     text: 'Selamat datang!',
        //     timer: 2000,
        //     showConfirmButton: false,
        // });
        // setTimeout(() => {
        //     if (authStore.user && authStore.user.type === 'admin') {
        //         router.push('/dashboard');
        //     } else {
        //         router.push('/');
        //     }
        // }, 1000);
//     } catch (err) {
//         error.value = "Periksa Email/Password anda";
//         Swal.fire({
//             icon: 'error',
//             title: 'Login gagal',
//             text: 'Periksa email dan password Anda.',
//         });
//     }
// };

</script>

<style scoped>
.vh-100 {
    height: 100vh;
}

.card {
    background-color: #f8f9fa; 
    border: none; 
    border-radius: 15px; 
}

.btn-primary {
    background-color: rgb(255, 206, 2);
    border-color: rgb(255, 206, 2); 
}

.btn-primary:hover {
    background-color: #780e05;
    border-color: #780e05; 
}
</style>
