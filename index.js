document.addEventListener("DOMContentLoaded", () => {

    const searchInput = document.querySelector(".search-box input");
    const cards = document.querySelectorAll(".card");
    const menuBtn = document.querySelector(".menu-btn");
    const menu = document.querySelector(".menu");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // ===== ПОИСК =====
    searchInput.addEventListener("input", () => {
        const value = searchInput.value.toLowerCase();

        cards.forEach(card => {
            const text = card.innerText.toLowerCase();
            card.style.display = text.includes(value) ? "block" : "none";
        });
    });

    // ===== КОРЗИНА =====
    document.querySelectorAll(".cart").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();

            const card = btn.closest(".card");
            const title = card.querySelector(".title").innerText;
            const priceText = card.querySelector(".price").innerText;
            const price = parseInt(priceText.replace(/\D/g, ""));

            cart.push({
                name: title,
                price: parseInt(price)
            });

            localStorage.setItem("cart", JSON.stringify(cart));

            // alert("Добавлено 🛒");
        });
    });

    // ===== ИЗБРАННОЕ =====
    document.querySelectorAll(".fav").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            btn.innerText = "💖";
        });
    });

    // ===== КЛИК ПО КАРТОЧКЕ =====
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const link = card.querySelector(".card-link");
            if (link) window.location.href = link.href;
        });
    });

    // ===== МЕНЮ =====
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && !menuBtn.contains(e.target)) {
            menu.classList.remove("active");
        }
    });

    // ===== ФИЛЬТР =====
    const menuItems = document.querySelectorAll(".menu li");

    menuItems.forEach(item => {
        item.addEventListener("click", () => {

            const filter = item.dataset.filter;

            cards.forEach(card => {

                const category = card.dataset.category;

                if (filter === "all" || category === filter) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }

            });

        });
    });

});





let cartCount = 0;

document.querySelectorAll(".cart").forEach(btn => {
    btn.addEventListener("click", () => {

        const card = btn.closest(".card");
        const img = card.querySelector("img");
        const cartIcon = document.getElementById("cartIcon");
        const counter = document.getElementById("cartCount");

        if (!img || !cartIcon || !counter) return;

        // 👉 УВЕЛИЧЕНИЕ СЧЁТЧИКА
        cartCount++;
        counter.textContent = cartCount;

        // анимация
        const fly = document.createElement("div");

        fly.style.position = "fixed";
        fly.style.width = "50px";
        fly.style.height = "50px";
        fly.style.borderRadius = "50%";
        fly.style.overflow = "hidden";
        fly.style.zIndex = "9999";
        fly.style.transition = "all 0.8s ease";
        fly.style.pointerEvents = "none";

        fly.innerHTML = `<img src="${img.src}" style="width:100%;height:100%;object-fit:cover;">`;

        document.body.appendChild(fly);

        const start = img.getBoundingClientRect();
        fly.style.top = start.top + "px";
        fly.style.left = start.left + "px";

        setTimeout(() => {
            const end = cartIcon.getBoundingClientRect();

            fly.style.top = end.top + "px";
            fly.style.left = end.left + "px";
            fly.style.transform = "scale(0.2)";
            fly.style.opacity = "0";
        }, 20);

        setTimeout(() => fly.remove(), 900);
    });
});