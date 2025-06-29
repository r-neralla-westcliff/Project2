<template>
  <header class="d-flex justify-content-between align-items-center border-bottom pb-2 mb-4 px-3">
    <button class="btn btn-link text-dark fs-4" @click="$emit('toggle-sidebar')">
      <i class="bi bi-list"></i>
    </button>
    <h2 class="mb-0">{{ title }}</h2>

    <div class="dropdown">
      <button
        class="btn btn-outline-secondary dropdown-toggle"
        type="button"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <i class="bi bi-person-circle fs-4"></i>
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li>
          <button class="dropdown-item" @click="logout">Logout</button>
        </li>
      </ul>
    </div>
  </header>
</template>

<script>
import axios from 'axios';
export default {
  name: 'AppHeader',
  props: {
    title: {
      type: String,
      default: 'Dashboard'
    }
  },
  methods: {
     async logout() {
      try {
        await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
        this.$router.push('/');
      } catch (err) {
        console.error('Logout failed:', err);
      }
    }
  }
};
</script>

<style scoped>
header {
  background-color: #fff;
}
</style>
