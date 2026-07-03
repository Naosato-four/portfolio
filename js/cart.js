new Vue({
  el: "#cart-app",

  data: {
    cart: JSON.parse(localStorage.getItem("silence_cart")) || [],
  },

  methods: {
    increaseQty(index) {
      this.cart[index].quantity++;
      this.saveCartToStorage();
    },

    decreaseQty(index) {
      if (this.cart[index].quantity > 1) {
        this.cart[index].quantity--;
        this.saveCartToStorage();
      }
    },

    saveCartToStorage() {
      localStorage.setItem("silence_cart", JSON.stringify(this.cart));
    },
    removeFromCart(index) {
      this.cart.splice(index, 1);

      localStorage.setItem("silence_cart", JSON.stringify(this.cart));
    },
  },

  computed: {
    cartTotalPrice() {
      return this.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      );
    },
  },
});
