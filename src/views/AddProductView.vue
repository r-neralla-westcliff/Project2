<template>
  <div class="page-wrapper py-4">
    <AppHeader title="Add Product" />

    <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
      {{ successMessage }}
      <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
    </div>

    <div v-if="errorMessage" class="alert alert-danger alert-dismissible fade show" role="alert">
      {{ errorMessage }}
      <button type="button" class="btn-close" @click="errorMessage = ''" aria-label="Close"></button>
    </div>

    <form class="add-form mx-auto" @submit.prevent="handleSubmit">
      <h5 class="text-center fw-semibold mb-4">Add Product</h5>

      <input v-model="form.title" class="form-control mb-3" placeholder="Product Name" />
      <textarea v-model="form.description" class="form-control mb-3" placeholder="Product Description" />

      <!-- Image Upload Area -->
      <div class="d-flex align-items-center mb-3">
        <div class="upload-preview bg-light d-flex align-items-center justify-content-center me-3">
          <img v-if="previewUrl" :src="previewUrl" alt="Preview" />
          <i v-else class="bi bi-image fs-1 text-muted"></i>
        </div>
        <label class="upload-label btn btn-light border mb-0">
          <i class="bi bi-upload me-1"></i> Upload
          <input type="file" class="d-none" @change="handleFileChange" />
        </label>
      </div>

      <div class="d-flex mb-3">
        <select v-model="form.color" class="form-select me-2">
          <option disabled value="">Color</option>
          <option>Red</option>
          <option>Blue</option>
          <option>Black</option>
        </select>
        <select v-model="form.size" class="form-select">
          <option disabled value="">Size</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
        </select>
      </div>

      <input v-model="form.price" class="form-control mb-3" placeholder="Price" type="number" />
      <input v-model="form.brand" class="form-control mb-4" placeholder="Brand" />

      <div class="text-center">
        <button type="submit" class="btn btn-primary me-2">Add</button>
        <router-link to="/dashboard" class="btn btn-outline-secondary">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import AppHeader from '../components/Header.vue';

export default {
  name: 'AddProductView',
  components: { AppHeader },
  data() {
    return {
      form: {
        title: '',
        description: '',
        price: '',
        brand: '',
        color: '',
        size: '',
        image: ''
      },
      imageFile: null,
      previewUrl: '',
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    handleFileChange(event) {
      const file = event.target.files[0];
      this.imageFile = file;
      this.previewUrl = file ? URL.createObjectURL(file) : '';
    },
    async handleSubmit() {
      this.errorMessage = '';
      if (
      !this.form.title ||
      !this.form.description ||
      !this.form.price ||
      !this.form.brand ||
      !this.form.color ||
      !this.form.size ||
      !this.imageFile
    ) {
      this.errorMessage = 'Please fill in all required fields and upload an image.';
      return;
    }
      try {
        const formData = new FormData();
        for (const key in this.form) {
          formData.append(key, this.form[key]);
        }
        if (this.imageFile) {
          formData.append('image', this.imageFile);
        }

        await axios.post('http://localhost:5000/api/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });

        this.successMessage = 'Product successfully added!';

        setTimeout(() => {
          this.$router.push('/dashboard');
        }, 1000); 
      } catch (err) {
        this.errorMessage = err.response?.data?.message || 'Failed to add product.';
        console.error(err);
      }
    },
  }
};
</script>
<style scoped lang="scss">
.add-form {
  max-width: 500px;
}

.upload-preview {
  width: 100px;
  height: 100px;
  border: 1px solid #ccc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
