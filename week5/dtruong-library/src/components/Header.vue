<script setup></script>

<template>
  <div class="container">
    <header class="d-flex justify-content-center py-3">
      <ul class="nav nav-pills">
        <li class="nav-item">
          <router-link to="/" class="nav-link" active-class="active" aria-current="page"
            >Home</router-link
          >
        </li>
        <li class="nav-item">
          <router-link to="/about" class="nav-link" active-class="active">About</router-link>
        </li>
      </ul>
    </header>
  </div>
  <hr class="full-divider" />
</template>

<style></style>
<style>
.full-divider {
  width: 100%;
  border: none;
  border-top: 1px solid #000000;
  margin: 0;
}
</style>
