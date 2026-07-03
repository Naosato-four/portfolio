/**
 * Silence TSUMUGI - メインアプリケーション & カートドロワー
 */
if (document.getElementById("app")) {
  new Vue({
    el: "#app",
    data: {
      cart: JSON.parse(localStorage.getItem("silence_cart")) || [],
      products: [
        {
          id: 1,
          name: "Short Silhouette",
          description:
            "静寂を紡ぎ、強さを纏う。伝統的な織りと現代的なカッティングが融合したショートシルエット。軽やかな着心地でありながら、美しいドレープが独特の存在感を放ちます。丁寧な職人の手仕事がディテールに宿る一着。",
          price: 48000,
          selectedVariantIndex: 0,
          variants: [
            {
              colorName: "墨黒",
              colorCode: "#1a1a1a",
              image: "img/hero_black.png",
            },
            {
              colorName: "生成り",
              colorCode: "#f4f1ea",
              image: "img/hero.png",
            },
          ],
        },
        {
          id: 2,
          name: "Middle Silhouette",
          description:
            "無駄を削ぎ落としたストイックな佇まいのミドル丈。モード感漂う深い墨色の生地は、光の当たり方で様々な表情を見せます。日常に溶け込みながらも、確かな個性を演出する仕上がり。",
          price: 56000,
          selectedVariantIndex: 0,
          variants: [
            {
              colorName: "深紺",
              colorCode: "#1c2d42",
              image: "img/long_black.png",
            },
            { colorName: "墨黒", colorCode: "#1a1a1a", image: "img/long.png" },
          ],
        },
        {
          id: 3,
          name: "Middle Silhouette",
          description:
            "無駄を削ぎ落としたストイックな佇まいのミドル丈。モード感漂う深い墨色の生地は、光の当たり方で様々な表情を見せます。日常に溶け込みながらも、確かな個性を演出する仕上がり。",
          price: 56000,
          selectedVariantIndex: 0,
          variants: [
            {
              colorName: "深紺",
              colorCode: "#1c2d42",
              image: "img/middle_black.png",
            },
            {
              colorName: "墨黒",
              colorCode: "#1a1a1a",
              image: "img/middle.png",
            },
          ],
        },
        {
          id: 4,
          name: "Middle Silhouette",
          description:
            "無駄を削ぎ落としたストイックな佇まいのミドル丈。モード感漂う深い墨色の生地は、光の当たり方で様々な表情を見せます。日常に溶け込みながらも、確かな個性を演出する仕上がり。",
          price: 56000,
          selectedVariantIndex: 0,
          variants: [
            {
              colorName: "深紺",
              colorCode: "#1c2d42",
              image: "img/short_black.png",
            },
            { colorName: "墨黒", colorCode: "#1a1a1a", image: "img/short.png" },
          ],
        },
      ],
    },
    methods: {
      addToCart(product) {
        const currentVariant = product.variants[product.selectedVariantIndex];
        const existingItem = this.cart.find(
          (item) =>
            item.id === product.id &&
            item.colorName === currentVariant.colorName,
        );

        if (existingItem) {
          existingItem.quantity++;
        } else {
          this.cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            colorName: currentVariant.colorName,
            image: currentVariant.image,
            quantity: 1,
          });
        }
        this.saveCartToStorage();
      },
      removeFromCart(index) {
        this.cart.splice(index, 1);
        this.saveCartToStorage();
      },
      saveCartToStorage() {
        localStorage.setItem("silence_cart", JSON.stringify(this.cart));
      },
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
    },
    computed: {
      cartTotalQuantity() {
        return this.cart.reduce((total, item) => total + item.quantity, 0);
      },
      cartTotalPrice() {
        return this.cart.reduce(
          (total, item) => total + item.price * item.quantity,
          0,
        );
      },
    },
  });
}
