const container = document.getElementById('news-container');
let start = 0;      // índice inicial
const limit = 10;   // noticias por carga

function loadNews() {
  fetch(`https://api.spaceflightnewsapi.net/v4/articles?limit=${limit}&offset=${start}`)
    .then(response => response.json())
    .then(data => {
      if (!data || !data.results || data.results.length === 0) {
        loadMoreBtn.style.display = 'none';
        return;
      }

      data.results.forEach(article => {
        const card = document.createElement('div');
        card.className = 'col s12 m6 l4';
        card.innerHTML = `
          <div class="card medium hoverable">
            <div class="card-image">
              <img src="${article.image_url}" alt="${article.title}">
              <span class="card-title">${article.title}</span>
            </div>
            <div class="card-content">
              <p>${article.summary}</p>
            </div>
            <div class="card-action">
              <a href="${article.url}" target="_blank">Leer más</a>
            </div>
          </div>
        `;
        container.appendChild(card);
      });

      start += limit;
    })
    .catch(error => {
      container.innerHTML += `<p class="red-text">Error cargando noticias: ${error}</p>`;
    });
}

// Botón "Cargar más"
const loadMoreBtn = document.createElement('a');
loadMoreBtn.textContent = 'Cargar más';
loadMoreBtn.className = 'btn blue darken-3';
loadMoreBtn.style.display = 'block';
loadMoreBtn.style.margin = '20px auto';
loadMoreBtn.addEventListener('click', loadNews);

container.after(loadMoreBtn);

// Cargar primeras noticias
loadNews();
