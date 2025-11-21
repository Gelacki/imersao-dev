let cardContainer = document.querySelector(".card-container");
let dados = [];

// Função para carregar os dados do JSON em segundo plano
async function carregarDados() {
  try {
    const resposta = await fetch("data.json");
    dados = await resposta.json();
  } catch (error) {
    console.error("Erro ao carregar os dados:", error);
  }
}

async function iniciarBusca() {
  const termoBusca = document.querySelector("input").value.toLowerCase();
  const resultados = dados.filter(
    (dado) =>
      dado.nome.toLowerCase().includes(termoBusca) ||
      dado.descricao.toLowerCase().includes(termoBusca) ||
      dado.categoria.toLowerCase().includes(termoBusca) ||
      dado.autores.some((autor) => autor.toLowerCase().includes(termoBusca))
  );
  renderizarCards(resultados);
}

function renderizarCards(dados) {
  cardContainer.innerHTML = ""; // Limpa os resultados anteriores
  for (let dado of dados) {
    let article = document.createElement("article");
    article.classList.add("card"); // Adiciona a classe para estilização
    article.innerHTML = `
    <h2>${dado.nome}</h2>
          <p><strong>Ano de Publicação:</strong> ${dado.ano}</p>
          <p><strong>Categoria:</strong> ${dado.categoria}</p>
          <p>${dado.descricao}</p>
          <p><strong>Autores:</strong></p>
          <ul>
            ${dado.autores.map((autor) => `<li>${autor}</li>`).join("")}
          </ul>
          <a href="${dado.link}" target="_blank">Saiba mais</a>
           `;

    cardContainer.appendChild(article);
  }
}

// Carrega os dados assim que a página é aberta
carregarDados();
