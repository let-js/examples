import {
  User
} from '../domain/User'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: User.createEmptyUser(),
  }),
  getters: {
    isLogin: (state) => state.user.userId > 0 && state.user.userName != '',
  },
  actions: {
    updateUser(user) {
      this.user = user
    },
    getUser() {
      return this.user
    },
    removeUser() {
      this.user = User.createEmptyUser()
    },
  },
})