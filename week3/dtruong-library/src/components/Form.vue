<script setup></script>

<template>
  <div class="form">
    <h1>User Information Form / Credentials</h1>

    <form>
      <label for="username">Username:</label><br />
      <input type="text" id="username" name="username" /><br />

      <label for="password">Password:</label><br />
      <input type="password" id="password" name="password" /><br />

      <label for="isAustralian">Australian Resident?</label><br />
      <input type="checkbox" id="isAustralian" name="isAustralian" /><br />

      <label for="reason">Reason for Joining:</label><br /><br />
      <textarea id="reason" name="reason" rows="3"></textarea><br />

      <label for="gender">Gender:</label><br />
      <select id="gender" name="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
    </form>
  </div>
</template>

<style scoped></style>
