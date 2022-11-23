import { Shop } from '../domain/shop/Shop'
import { defineStore } from 'pinia'
export const useShopStore = defineStore('shop', {
  state: () => ({
    shop: new Shop({
      id: -1,
      name: '',
    }),
  }),
  getters: {},
  actions: {
    updateShop(shop: Shop) {
      this.shop = shop
    },
    getShop() {
      return this.shop
    },
    removeShop(Shop: shop) {
      for (let item in shop) {
        delete shop[item]
      }
    },
  },
})
