<template>
  <form @submit.prevent="handleSubmit">
    <h3>Sign up</h3>

    <label for="email">Email:</label>
    <input type="email" name="email" v-model="email" required>

    <label for="email">Password:</label>
    <input type="password" name="password" v-model="password" required>

    <button>Sign up</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup() {
    // Vue native resources
    const store = useStore()
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const error = ref(null)

    const handleSubmit = async () => {
      try {
        // The dispatch method is used to call an action method
        await store.dispatch('signup', { 
          email: email.value, 
          password: password.value 
        })
        router.push({ name: 'Home' })
      } catch (err) {
        error.value = err.message
      }
    }

    return { 
      email, 
      password,
      error,
      handleSubmit
    }
  }
}
</script>