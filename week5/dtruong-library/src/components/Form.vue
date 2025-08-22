<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  confPassword: '',
  isAustralian: '',
  reason: '',
  gender: '',
})

const submittedCards = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateResidency(true)
  validateGender(true)
  validateReason(true)
  validateConfPassword(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.gender &&
    !errors.value.reason &&
    !errors.value.resident &&
    !errors.value.confPassword
  ) {
    submittedCards.value.push({ ...formData.value })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confPassword: '',
    isAustralian: '',
    reason: '',
    gender: '',
  }
}

const errors = ref({
  username: null,
  password: null,
  confPassword: null,
  resident: null,
  gender: null,
  reason: null,
})

const validateName = (blur) => {
  const username = formData.value.username
  const minLength = 3
  const noSpaces = /\s/.test(username)
  const noSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(username)

  const userUniqueness = !submittedCards.value.some((card) => card.username === username)

  if (username.length < minLength) {
    if (blur) errors.value.username = `Name must be at least ${minLength} characters`
  } else if (noSpaces) {
    if (blur) errors.value.username = 'Name must not contain spaces'
  } else if (noSpecialChars) {
    if (blur) errors.value.username = 'Name must not contain special characters'
  } else if (!userUniqueness) {
    if (blur) errors.value.username = 'Name has already been submitted'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfPassword = (blur) => {
  if (formData.value.confPassword !== formData.value.password) {
    if (blur) errors.value.confPassword = 'Passwords do not match.'
  } else {
    errors.value.confPassword = null
  }
}

const validateResidency = (blur) => {
  if (!formData.value.isAustralian) {
    if (blur) errors.value.resident = 'Please select your Australian residency status.'
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select a gender.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  const reason = formData.value.reason
  const minLength = 10
  const containsLetters = /[a-zA-Z]/.test(reason)

  if (reason.length < minLength) {
    if (blur) errors.value.reason = `Reason must be at least ${minLength} characters long.`
  } else if (!containsLetters) {
    if (blur) errors.value.reason = 'Reason must contain at least one letter.'
  } else {
    errors.value.reason = null
  }
}
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">User Information Form</h1>

        <form @submit.prevent="submitForm">
          <div class="row">
            <div class="col-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">
                {{ errors.username }}
              </div>
            </div>

            <div class="col-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">
                {{ errors.password }}
              </div>
              <label for="confPassword" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confPassword"
                @blur="() => validateConfPassword(true)"
                @input="() => validateConfPassword(false)"
                v-model="formData.confPassword"
              />
              <div v-if="errors.confPassword" class="text-danger">
                {{ errors.confPassword }}
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-6">
              <div class="form-check">
                <label>Australian Resident?</label> <br />
                <input
                  type="radio"
                  id="isAustralianYes"
                  value="true"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralianYes">Yes</label>
                <br />
                <input
                  type="radio"
                  id="isAustralianNo"
                  value="false"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label" for="isAustralianNo">No</label>
                <div v-if="errors.resident" class="text-danger">
                  {{ errors.resident }}
                </div>
              </div>
            </div>

            <div class="col-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                @blur="() => validateGender(true)"
                @input="() => validateGender(false)"
                v-model="formData.gender"
              >
                <option value="" disabled>Select your Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
                <option value="prefer_not_to_say">Prefer not to say</option>
              </select>
              <div v-if="errors.gender" class="text-danger">
                {{ errors.gender }}
              </div>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for Joining</label>
            <textarea
              class="form-control"
              id="reason"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => validateReason(false)"
              rows="3"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">
              {{ errors.reason }}
            </div>
          </div>

          <div class="text-center">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
    <br />
    <h2>Submitted Cards</h2>
    <DataTable :value="submittedCards" table-style="min-width: 50rem">
      <Column field="username" header="Username" />
      <Column field="password" header="Password" />
      <Column field="isAustralian" header="Is Australian Resident?" />
      <Column field="gender" header="Gender" />
      <Column field="reason" header="Reason for Joining" />
    </DataTable>
  </div>
</template>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}
</style>
