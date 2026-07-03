if (document.getElementById("checkout-app")) {
  new Vue({
    el: "#checkout-app",
    data: {
      // 1. カートデータ（Storageから復元）
      cart: JSON.parse(localStorage.getItem("silence_cart")) || [],

      // 2. ★ここを追加：HTMLの v-model と連動する入力フォームの受け皿
      orderForm: {
        lastName: "",
        firstName: "",
        email: "",
        tel: "",
        zip: "",
        prefecture: "",
        address1: "",
        address2: "",
        paymentMethod: "credit", // 初期値
      },
    },
    methods: {
      // ★ここを追加：電話番号の数字以外を弾く処理
      filterTel() {
        this.orderForm.tel = this.orderForm.tel.replace(/[^\d]/g, "");
      },

      // 注文確定時の処理
      completeOrder() {
        // 本来はここでサーバーにデータを送る処理が入ります
        alert("ご注文ありがとうございました。注文が確定いたしました。");

        // カートを空にする
        this.cart = [];
        localStorage.removeItem("silence_cart");

        // 完了ページへ遷移（必要に応じて変更してください）
        window.location.href = "thanks.html";
      },
    },
    computed: {
      // カートの合計金額を計算する処理
      cartTotalPrice() {
        return this.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    },
  });
}
