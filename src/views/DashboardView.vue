<template>
  <div class="page-wrapper py-4">
    <AppHeader title="Dashboard" />

    <div v-if="deleteMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ deleteMessage }}
      <button type="button" class="btn-close" @click="deleteMessage = ''" aria-label="Close"></button>
    </div>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">Product Management</h5>
      <router-link to="/add" class="btn btn-outline-dark">
        <i class="bi bi-plus"></i> Create
      </router-link>
    </div>

    <div class="row">
      <div v-for="product in products" :key="product._id" class="col-md-4 mb-4" style="width: 27%; height: 9%;" >
        <div class="card h-100">
          <img :src="product.image" class="card-img-top" style="height: 200px; object-fit: cover; width: 50%; padding: 1rem;" />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <p class="mb-1"><strong>Brand:</strong> {{ product.brand }}</p>
            <p class="mb-1"><strong>Color:</strong> {{ product.color }} | <strong>Size:</strong> {{ product.size }}</p>
            <p class="mb-1"><strong>Price:</strong> ${{ product.price }}</p>
          </div>
          <div class="card-footer d-flex justify-content-between">
            <router-link :to="`/edit/${product._id}`" class="btn btn-outline-primary w-50 me-1">
              <i class="bi bi-pencil"></i> Edit
            </router-link>
            <button class="btn btn-outline-danger w-50 ms-1" @click="deleteProduct(product._id)">
              <i class="bi bi-trash"></i> Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import AppHeader from '../components/Header.vue';

export default {
  name: 'DashboardView',
  components: { AppHeader },
  data() {
    return {
      products: [],
      deleteMessage: ''
    };
  },
  mounted() {
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        this.products = res.data;
      } catch (err) {
        console.error('Failed to load products:', err);
      }
    },

    async deleteProduct(id) {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      this.products = this.products.filter(p => p._id !== id);
      this.deleteMessage = 'Product successfully deleted';

      setTimeout(() => {
        this.deleteMessage = '';
      }, 3000);

    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete product');
    }
  } 
  }
};
</script>
