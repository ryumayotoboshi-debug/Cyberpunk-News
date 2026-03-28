let currentCategory = "all";

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function setCategory(category) {
  currentCategory = category;
  renderList();
}

function renderList() {
  const list = document.getElementById("listView");
  list.innerHTML = "";

  let filtered = articles;

  if (currentCategory !== "all") {
    filtered = articles.filter(a => a.category === currentCategory);
  }

  // 日替わりランダム
  filtered = shuffle(filtered);

  filtered.forEach((article, index) => {
    const div = document.createElement("div");
    div.className = "card";

    div.innerHTML = `
      <h3>${article.title}</h3>
      <p>${article.date} | ${article.category}</p>
    `;

    div.onclick = () => openArticle(index);

    list.appendChild(div);
  });
}

function openArticle(index) {
  const article = articles[index];

  document.getElementById("listView").classList.add("hidden");
  document.getElementById("articleView").classList.remove("hidden");

  document.getElementById("articleTitle").innerText = article.title;
  document.getElementById("articleMeta").innerText =
    article.date + " | " + article.category;

  document.getElementById("articleBody").innerHTML = article.body;
}

function backToList() {
  document.getElementById("articleView").classList.add("hidden");
  document.getElementById("listView").classList.remove("hidden");
}

// 初期表示
renderList();
