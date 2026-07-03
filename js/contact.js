/**
 * Silence TSUMUGI - お問い合わせフォーム制御
 */
if (document.getElementById("contact-app")) {
  new Vue({
    el: "#contact-app",
    data: {
      name: "",
      contents: "",
      email: "",
      tel: "",
      errors: {
        name: [],
        contents: [],
      },
    },
    methods: {
      filterTel() {
        this.tel = this.tel.replace(/[^\d]/g, "");
      },
      validator(type, max) {
        let name = [];
        let contents = [];
        let message = max + "文字以内で入力してください。";

        if (type === "name") {
          if (this.name.length > max) name.push(message);
          this.errors.name = name;
        }
        if (type === "contents") {
          if (this.contents.length > max) contents.push(message);
          this.errors.contents = contents;
        }
      },
      submitForm() {
        if (!this.name.trim()) return alert("名前を入力してください");
        if (!this.email.trim())
          return alert("メールアドレスを入力してください");
        if (!this.contents.trim())
          return alert("お問い合わせ内容を入力してください");

        if (
          this.errors.name.length > 0 ||
          this.errors.contents.length > 0 ||
          this.mailError ||
          this.telError
        ) {
          return alert("入力内容を確認してください");
        }

        alert("送信成功");
        document.getElementById("my-form").submit();
      },
    },
    computed: {
      mailError() {
        if (!this.email) return "";
        var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(this.email)
          ? ""
          : "メールアドレス形式ではありません";
      },
      telError() {
        if (!this.tel) return "";
        var telRegex = /^0\d{9,10}$/;
        return telRegex.test(this.tel)
          ? ""
          : "電話番号の形式が正しくありません";
      },
    },
  });
}
