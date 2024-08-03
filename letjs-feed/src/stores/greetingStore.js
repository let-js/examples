import {
  Greeting
} from '../domain/Greeting'
import {
  defineStore
} from 'pinia'
export const useGreetingStore = defineStore('greeting', {
  state: () => ({
    greeting: new Greeting(),
  }),
  getters: {},
  actions: {
    updateGreeting(greeting) {
      this.greeting = greeting
    },
    getGreeting() {
      return this.greeting
    },
    removeGreeting(greeting) {
      for (let item in greeting) {
        delete greeting[item]
      }
    },
  },
})