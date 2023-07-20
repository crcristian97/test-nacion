import React from 'react';
import '../style/ArticleList.css' // Importar el archivo de estilos CSS

function ArticleList({ articles }) {
  // Filtrar los artículos con subtype igual a "7"
  const filteredArticles = articles.filter((article) => article?.subtype === '7');

  filteredArticles.sort((a, b) => new Date(a?.display_date) - new Date(b?.display_date));

  return (
    <div className="article-list">
      {filteredArticles.map((article) => (
        <div key={article._id} className="article-card">
          <img src={article.promo_items?.basic?.url} alt="Article" className="article-image" />
          <h2>{article.headlines.basic}</h2>
          {/* Mostrar la fecha en el formato requerido */}
          <p className="article-date">{formatDate(article.display_date)}</p>
          {/* Resto de la información del artículo */}
        </div>
      ))}
    </div>
  );
}

export default ArticleList;

// Función para formatear la fecha
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day} de ${month} de ${year}`;
}
