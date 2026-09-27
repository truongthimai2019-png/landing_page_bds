/* =====================================================
   js/main.js – Vinhomes Grand Park Landing Page
   ===================================================== */

/* ===== 1. NĂM TỰ ĐỘNG TRONG FOOTER ===== */
(function setFooterYear() {
  const yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
})();


/* ===== 2. CUỘN MƯỢt (Smooth Scroll) ===== */
(function initSmoothScroll() {
  // Chọn tất cả link có data-scroll hoặc href bắt đầu bằng #
  const scrollLinks = document.querySelectorAll('[data-scroll], a[href^="#"]');

  scrollLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      const targetId = this.dataset.scroll || this.getAttribute('href').replace('#', '');
      const targetEl = document.getElementById(targetId);

      if (targetEl) {
        e.preventDefault();
        const navbarHeight = document.getElementById('navbar')
          ? document.getElementById('navbar').offsetHeight
          : 0;
        const top = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;

        window.scrollTo({ top, behavior: 'smooth' });

        // Đóng menu mobile nếu đang mở
        const navMenu = document.getElementById('navMenu');
        if (navMenu && navMenu.classList.contains('show')) {
          const toggler = document.querySelector('.navbar-toggler');
          if (toggler) toggler.click();
        }
      }
    });
  });
})();


/* ===== 3. NAVBAR: thêm class 'scrolled' khi cuộn ===== */
(function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // kiểm tra ngay khi load
})();


/* ===== 4. ĐÓNG MENU MOBILE khi bấm ngoài vùng menu ===== */
(function initClickOutsideMenu() {
  document.addEventListener('click', function (e) {
    const navMenu = document.getElementById('navMenu');
    const toggler = document.querySelector('.navbar-toggler');

    if (!navMenu || !toggler) return;
    if (!navMenu.classList.contains('show')) return;

    // Nếu click không phải trong navbar → đóng
    if (!navMenu.contains(e.target) && !toggler.contains(e.target)) {
      toggler.click();
    }
  });
})();


/* ===== 5. FADE-IN KHI CUỘN (IntersectionObserver) ===== */
(function initFadeIn() {
  const fadeEls = document.querySelectorAll('.fade-in');
  if (!fadeEls.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Chỉ chạy một lần
        }
      });
    },
    {
      threshold: 0.15,       // Hiện khi 15% phần tử trong viewport
      rootMargin: '0px 0px -40px 0px'
    }
  );

  fadeEls.forEach(function (el) {
    observer.observe(el);
  });
})();


/* ===== 6. ACTIVE NAV LINK theo section đang hiển thị ===== */
(function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link[data-scroll]');

  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.dataset.scroll === id) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();


/* ===== 7. FORM ĐĂNG KÝ TƯ VẤN + POPUP THÀNH CÔNG ===== */
(function initConsultForm() {
  const form      = document.getElementById('consultForm');
  const submitBtn = document.getElementById('submitBtn');
  const overlay   = document.getElementById('successOverlay');
  const closeBtns = [
    document.getElementById('closePopup'),
    document.getElementById('closePopupBtn')
  ];

  if (!form || !submitBtn || !overlay) return;

  /* --- Hàm hiển thị popup --- */
  function showPopup() {
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Khóa cuộn trang
    // Focus vào nút "Đã hiểu" để hỗ trợ keyboard
    setTimeout(function () {
      const okBtn = document.getElementById('closePopupBtn');
      if (okBtn) okBtn.focus();
    }, 450);
  }

  /* --- Hàm ẩn popup & reset form --- */
  function hidePopup() {
    overlay.classList.remove('show');
    document.body.style.overflow = '';

    // Reset form về trạng thái ban đầu
    form.reset();
    form.classList.remove('was-validated');

    // Reset nút gửi
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    if (btnText)    btnText.classList.remove('d-none');
    if (btnLoading) btnLoading.classList.add('d-none');
    submitBtn.disabled = false;
  }

  /* --- Xử lý submit form --- */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();

    // Validate HTML5 native
    if (!form.checkValidity()) {
      form.classList.add('was-validated');
      // Cuộn đến trường lỗi đầu tiên
      const firstInvalid = form.querySelector(':invalid');
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Hiển thị trạng thái đang gửi
    const btnText    = submitBtn.querySelector('.btn-text');
    const btnLoading = submitBtn.querySelector('.btn-loading');
    if (btnText)    btnText.classList.add('d-none');
    if (btnLoading) btnLoading.classList.remove('d-none');
    submitBtn.disabled = true;

    // Giả lập gửi email (timeout 1.2 giây)
    setTimeout(function () {
      showPopup();
    }, 1200);
  });

  /* --- Nút đóng popup (X và "Đã hiểu") --- */
  closeBtns.forEach(function (btn) {
    if (btn) {
      btn.addEventListener('click', function () {
        hidePopup();
      });
    }
  });

  /* --- Click vào vùng tối bên ngoài popup để đóng --- */
  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) {
      hidePopup();
    }
  });

  /* --- Phím Escape để đóng popup --- */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('show')) {
      hidePopup();
    }
  });
})();
