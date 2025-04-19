async function loadComponent(id, file) {
    const response = await fetch(file);
    const text = await response.text();
    document.getElementById(id).innerHTML = text;
}

// Tải header và footer khi trang được load
document.addEventListener("DOMContentLoaded", function () {
    loadComponent("header-container", "../template/components/header.html");
    loadComponent("footer-container", "../template/components/footer.html");
});
