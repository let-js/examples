import { Production } from '../domain/production/Production'
import { defineStore } from 'pinia'
export const useProductionStore = defineStore('production', {
  state: () => ({
    production: new Production({}),
  }),
  getters: {},
  actions: {
    updateProduction(production: Production) {
      this.production = production
    },
    getProduction() {
      return this.production
    },
    removeProduction(Production: production) {
      for (let item in production) {
        delete production[item]
      }
    },
  },
})
