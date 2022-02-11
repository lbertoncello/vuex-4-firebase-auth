import { createStore } from 'vuex'
import { auth } from '../firebase/config'
import {
  createUserWithEmailAndPassword
} from 'firebase/auth'

const store = createStore({
  state: {
    user: null
  },
  // Do not allows async code
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('User state changed: ', state.user)
    }
  },
  // Actions are just functions which allow async code
  actions: {
    async signup(context, { email, password }) {
      const res = await createUserWithEmailAndPassword(auth, email, password)

      if (res) {
        context.commit('setUser', { ...res.user, id: res.id })
      } else {
        throw new Error('Could not complete signup')
      }
    }
  }
})

export default store