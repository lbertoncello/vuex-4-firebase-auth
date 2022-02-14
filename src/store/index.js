import { createStore } from 'vuex'
import { auth } from '../firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
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
        context.commit('setUser', res.user)
      } else {
        throw new Error('Could not complete signup')
      }
    },
    async login(context, { email, password }) {
      const res = await signInWithEmailAndPassword(auth, email, password)

      if (res) {
        context.commit('setUser', res.user)
      } else {
        throw new Error('Could not complete login')
      }
    },
    async logout(context) {
      console.log('Logout action')
  
      await signOut(auth)
      context.commit('setUser', null)
    }
  },
})

export default store