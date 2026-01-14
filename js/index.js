// Esperar a que Cordova esté listo
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  console.log('Cordova listo: ' + cordova.platformId + ' @ ' + cordova.version);

  // Inicializar todos los componentes de Materialize automáticamente
  M.AutoInit();

  // --- INICIO: Código para SpaceNews ---
  const container = document.getElementById('news-container');
  let start = 0;          // índice inicial de noticias
  const limit = 10;       // cuántas noticias cargar por vez

  function loadNews() {
    fetch(`https://api.spaceflightnewsapi.net/v3/articles?_start=${start}&_limit=${limit}`)
      .then(response => response.json())
      .then(data => {
        if (data.length === 0) {
          loadMoreBtn.style.display = 'none';
          return;
        }

        data.forEach(article => {
          const card = document.createElement('div');
          card.className = 'col s12 m6 l4';
          card.innerHTML = `
            <div class="card medium hoverable">
              <div class="card-image">
                <img src="${article.imageUrl}" alt="${article.title}">
                <span class="card-title">${article.title}</span>
              </div>
              <div class="card-content">
                <p>${article.summary}</p>
              </div>
              <div class="card-action">
                <a href="${article.url}" target="_blank">Llegir més</a>
              </div>
            </div>
          `;
          container.appendChild(card);
        });

        start += limit;
      })
      .catch(error => {
        container.innerHTML += `<p class="red-text">Hi ha hagut un error carregant les notícies: ${error}</p>`;
      });
  }

  // Botón cargar mas
  const loadMoreBtn = document.createElement('a');
  loadMoreBtn.textContent = 'Cargar más';
  loadMoreBtn.className = 'btn blue darken-3';
  loadMoreBtn.style.display = 'block';
  loadMoreBtn.style.margin = '20px auto';
  loadMoreBtn.addEventListener('click', loadNews);

  container.after(loadMoreBtn);

  // Cargar las primeras noticias al inicio
  loadNews();
}
