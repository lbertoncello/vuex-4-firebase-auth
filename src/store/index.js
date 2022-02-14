import { createStore } from 'vuex'
import { auth } from '../firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const store = createStore({
  state: {
    user: null,
    authIsReady: false
  },
  // Do not allows async code
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('User state changed: ', state.user)
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
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
      await signOut(auth)
      context.commit('setUser', null)
    }
  },
})

const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setUser', user)
  store.commit('setAuthIsReady', true)
  unsub()
})

export default store