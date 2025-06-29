<template>
  <div class="login-wrapper">
    <div class="login-header d-flex align-items-center mb-4">
       <img src="/logo.jpg" alt="Logo" style="height: 100px;" class="me-3" />
      <h3 class="mb-0 fw-bold">NSR Clothing</h3>
    </div>

    <div class="login-content login-blocks d-flex">
      <!-- Left Image Area -->
      <div class="login-left d-flex align-items-center justify-content-center ">
        <div class="bg-light d-flex align-items-center justify-content-center" >
          <img src="/adminlogo.avif" alt="Logo" style="height: 378px;" />
        </div>
      </div>

      <!-- Right Login Form -->
      <div class="login-form p-4 flex-grow-1">
        <h5 class="mb-4 text-center fw-semibold" style="padding-top:6rem">Login as a Administrator</h5>

        <div v-if="errorMessage" class="alert alert-danger" role="alert">
          {{ errorMessage }}
        </div>

        <div class="mb-3 position-relative">
          <input v-model="email" class="form-control pe-5" type="text" placeholder="Username/Email">
          <i class="bi bi-person position-absolute top-50 end-0 translate-middle-y me-3"></i>
        </div>

        <div class="mb-3 position-relative">
          <input v-model="password" class="form-control pe-5" type="password" placeholder="Password">
          <i class="bi bi-lock-fill position-absolute top-50 end-0 translate-middle-y me-3"></i>
        </div>

        <button class="btn btn-outline-primary w-100 mt-2" @click="login">Login</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'LoginView',

  data() {
    return {
      email: '',
      password: '',
      errorMessage: ''
    };
  },

  methods: {
    async login() {
    this.errorMessage = '';
    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter both email and password';
      return;
    }
      try {
        const res = await axios.post(
          'http://localhost:5000/api/auth/login',
          {
            email: this.email,
            password: this.password
          },
          { withCredentials: true }
        );

        console.log('Login successful:', res.data);
        this.$router.push('/dashboard');
      } catch (err) {
        this.errorMessage = err.response?.data?.message || 'Login failed. Please try again.';
        console.error(err);
      }
    }
  }
}
</script>

<style scoped lang="scss">
.login-wrapper {
  margin: 2rem;

  .login-header {
    margin-bottom: 2rem;
  }

  .login-content {
    min-height: 350px;
    width: 60%;
    margin: auto;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    border-radius: 20px;
    .login-left {
      width: 50%;
      padding: 2rem;
    }

    .login-form {
      width: 50%;
    }

    @media (max-width: 768px) {
      flex-direction: column;

      .login-left,
      .login-form {
        width: 100%;
        border-right: none;
        border-bottom: 1px solid #dee2e6;
      }
    }
  }
}
</style>
