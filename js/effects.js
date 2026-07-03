/**
 * Silence TSUMUGI - 共通演出・UIロジック
 */

document.addEventListener("DOMContentLoaded", () => {
  initScrollReveal();
  initCanvasConfetti();
  initMobileMenu();
});

/**
 * 1. スクロール連動アニメーション
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal, .reveal-line");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal-active");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });
}

/**
 * 2. キャンバス紙吹雪エフェクト
 */
function initCanvasConfetti() {
  const canvas = document.getElementById("confetti-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const confettiCount = 30;
  const confettis = [];

  class Confetti {
    constructor() {
      this.reset();
      this.y = Math.random() * height;
    }

    reset() {
      this.x = Math.random() * width;
      this.y = -20;
      this.size = Math.random() * 4 + 2;
      this.speedY = Math.random() * 0.8 + 0.4;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.opacity = Math.random() * 0.4 + 0.1;
      const colors = ["#D4AF37", "#E6E6E6", "#8A8A93"];
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.rotation = Math.random() * 360;
      this.rotationSpeed = Math.random() * 1 - 0.5;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX;
      this.rotation += this.rotationSpeed;
      if (this.y > height) this.reset();
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate((this.rotation * Math.PI) / 180);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = this.color;
      ctx.fillRect(-this.size / 2, -this.size, this.size, this.size * 2);
      ctx.restore();
    }
  }

  for (let i = 0; i < confettiCount; i++) {
    confettis.push(new Confetti());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    confettis.forEach((c) => {
      c.update();
      c.draw();
    });
    requestAnimationFrame(animate);
  }
  animate();
}

/**
 * 3. モバイル用ハンバーガーメニュー
 */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const menuLinks = document.getElementById("nav-links-menu");
  if (!hamburgerBtn || !menuLinks) return;

  hamburgerBtn.addEventListener("click", () => {
    hamburgerBtn.classList.toggle("active");
    menuLinks.classList.toggle("nav-active");
  });
}
