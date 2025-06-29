<template>
  <div class="page-wrapper py-4">
     <AppHeader title="Edit Product" />


    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ successMessage }}
      <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
    </div>

    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ errorMessage }}
      <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
    </div>
    <form class="w-50 mx-auto" @submit.prevent="handleSubmit">
      <h5 class="text-center fw-semibold mb-4">Edit Product</h5>

      <input v-model="form.title" class="form-control mb-3" placeholder="Product Name" />
      <textarea v-model="form.description" class="form-control mb-3" placeholder="Product Description" />

      <!-- Note: image update skipped for now -->
      <div class="d-flex align-items-center mb-3">
        <div class="upload-preview me-3 bg-light d-flex align-items-center justify-content-center">
        <img :src="previewUrl || form.image" alt="Product" v-if="form.image || previewUrl" />
        <i v-else class="bi bi-image fs-1 text-muted"></i>
      </div>
      </div>
      <div class="d-flex mb-3">
        <input v-model="form.color" class="form-control me-2" placeholder="Color" />
        <input v-model="form.size" class="form-control" placeholder="Size" />
      </div>

      <input v-model="form.price" class="form-control mb-3" placeholder="Price" type="number" />
      <input v-model="form.brand" class="form-control mb-4" placeholder="Brand" />

      <div class="text-center">
        <button type="submit" class="btn btn-primary me-2">Update</button>
        <router-link to="/dashboard" class="btn btn-outline-secondary">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import AppHeader from '../components/Header.vue';

export default {
  name: 'EditProductView',
  components: { AppHeader },
  data() {
    return {
      form: {
        title: '',
        description: '',
        color: '',
        size: '',
        price: '',
        brand: ''
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    console.log(id)
    try {
      const res = await axios.get(`http://localhost:5000/api/products/${id}`);
      this.form = res.data;
    } catch (err) {
      this.errorMessage = 'Failed to load product';
    }
  },
  methods: {
    async handleSubmit() {
      this.errorMessage = '';
      const id = this.$route.params.id;
      const { title, description, price, brand, color, size } = this.form;
      if (!title || !description || !price || !brand || !color || !size) {
        this.errorMessage = 'Please fill in all required fields.';
        return;
      }
      try {
        await axios.put(`http://localhost:5000/api/products/${id}`, this.form);
        this.successMessage = 'Product successfully updated!';
        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 1000); 
      } catch (err) {
        this.errorMessage = err.response?.data?.message || 'Update failed';
      }
    }
  }
};
</script>
