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

  let filtered = window.articles || [];

  if (currentCategory !== "all") {
    filtered = filtered.filter(a => a.category === currentCategory);
  }

  filtered = shuffle(filtered);

  filtered.forEach(article => {
    const div = document.createElement("div");
    div.className = "card";

    // 👇 サムネ条件分岐
    let thumbnailHTML = "";
    if (article.thumbnail) {
      thumbnailHTML = `<img src="${article.thumbnail}" class="thumb">`;
    }

    div.innerHTML = `
      ${thumbnailHTML}
      <h3>${article.title}</h3>
      <p>${article.date} | ${article.category}</p>
    `;

    div.onclick = () => openArticle(article.id);

    list.appendChild(div);
  });
}

function openArticle(id) {
  const article = window.articles.find(a => a.id === id);

  document.getElementById("listView").classList.add("hidden");
  document.getElementById("articleView").classList.remove("hidden");

  document.getElementById("articleTitle").innerText = article.title;
  document.getElementById("articleMeta").innerText =
    article.date + " | " + article.category;

  // 👇 サムネ条件分岐（詳細）
  let thumbnailHTML = "";
  if (article.thumbnail) {
    thumbnailHTML = `<img src="${article.thumbnail}" class="thumb-large">`;
  }

  document.getElementById("articleBody").innerHTML =
    thumbnailHTML + article.body;
}

function backToList() {
  document.getElementById("articleView").classList.add("hidden");
  document.getElementById("listView").classList.remove("hidden");
}

renderList();