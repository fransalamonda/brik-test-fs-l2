# WELCOME

# setup Backend

- didalam directory backend-brik, rename file env-setting menjadi .env
- siapkan database posgresql.
- edit file .env sesuai settingan posgresql.
- jalan kan di terminal "npm install" di dalam backend-brik
- jalankan migration di backend-brik dengan menggunakan Sequelize "npx sequelize-cli db:migrate"
- jalankan seeder di backend-brik dengan menggunakan Sequelize "npx sequelize-cli db:seed --seed"
- jalankan aplikasi dengan "npm start"
- server sudah berjalan di port yang diberikan di file env

### setup Frontend

- masuk ke directory front-end-test rename file env-setting menjadi .env
- jalankan npm install
- setelah selesai jalan kan client dengan "npm run dev"
- client sudah berjalan secara default di http://localhost:5173/

### kredensial untuk login

- admin
  email : adminbrik@gmail.com
  password: Brik123
- user  
  email : userbrik@gmail.com
  password: Brik123
