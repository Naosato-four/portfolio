new Vue({
  el: "#oder-app",

  data: {
    orderNumber: "",
  },

  created() {
    this.orderNumber = this.generateOrderNumber();
  },

  methods: {
    generateOrderNumber() {
      const prefix = "ST";

      const now = new Date();

      const yyyy = now.getFullYear();
      const mm = String(now.getMonth() + 1).padStart(2, "0");
      const dd = String(now.getDate()).padStart(2, "0");

      const date = `${yyyy}${mm}${dd}`;

      const random = String(Math.floor(Math.random() * 10000)).padStart(4, "0");

      return `${prefix}-${date}-${random}`;
    },
  },
});
