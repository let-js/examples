import { User } from '../domain/user'
import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    user: User.createEmptyUser(),
  }),
  getters: {
    hasLogin: (state) => state.user.isLogin,
  },
  actions: {
    updateUser(user: User) {
      this.user = user
    },
    getUser() {
      return this.user
    },
    removeUser(user: User) {
      for (const item in user) {
        delete user[item]
      }
    },
  },
})
