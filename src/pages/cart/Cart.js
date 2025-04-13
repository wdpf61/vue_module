import { ref, computed } from 'vue'

export default function useCart(cartName) {
  const cart = ref(JSON.parse(localStorage.getItem(cartName)) || [])

  const saveCart = () => {
    localStorage.setItem(cartName, JSON.stringify(cart.value))
  }

  const getCart = () => {
    return cart.value
  }

  const save = (item) => {
    const exists = cart.value.find((i) => i.item_id === item.item_id)
    if (!exists) {
      cart.value.push(item)
    } else {
      cart.value = cart.value.map((i) =>
        i.item_id === item.item_id
          ? { 
              ...i,
              qty: i.qty + item.qty,
              subtotal: (i.qty + item.qty) * i.price - i.discount
            }
          : i
      )
    }
    saveCart()
  }

  const deleteItem = (id) => {
    cart.value = cart.value.filter((item) => item.item_id !== id)
    saveCart()
  }

  const clearCart = () => {
    cart.value = []
    saveCart()
  }

  const total = computed(() =>
    cart.value.reduce((sum, item) => sum + item.subtotal, 0)
  )

  return {
    cart,
    getCart,
    save,
    deleteItem,
    clearCart,
    total
  }
}
