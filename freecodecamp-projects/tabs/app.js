const about = document.querySelector(".about");
const btns = document.querySelectorAll(".tab-btn");
const articles = document.querySelectorAll(".content");

function handleClicks(event) {
  const id = event.target.dataset.id;
  if (id) {
    btns.forEach((btn) => btn.classList.remove("active"));
    event.target.classList.add("active");
    articles.forEach((art) => art.classList.remove("active"));
    const article = document.getElementById(id);
    article.classList.add("active");
  }
}

about.addEventListener("click", handleClicks);
