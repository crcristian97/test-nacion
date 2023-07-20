import '../style/TagList.css'
function TagList({ tags, articles }) {
  // Función para formatear la fecha
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();
    return `${day} de ${month} de ${year}`;
  };

  // Función para obtener las URLs de las imágenes por tag
  const getTagImageUrls = () => {
    const tagImageUrls = {};

    articles.forEach((article) => {
      article?.taxonomy?.tags.forEach((tag) => {
        const existingUrls = tagImageUrls[tag.slug] || [];
        const imageUrl = article?.promo_items?.basic?.url || 'default-image-url.jpg';
        existingUrls.push(imageUrl);
        tagImageUrls[tag.slug] = existingUrls;
      });
    });

    return tagImageUrls;
  };

  const tagImageUrls = getTagImageUrls();

  // Renderizar el componente TagList
  return (
    <div className="com-titleWithfollow">
      <h2>Acumulado Grilla</h2>
      <div className="tag-card-container">
        {tags?.slice(0, 10).map((tag) => {
          const imageUrl = tagImageUrls[tag.slug]?.[0] || 'default-image-url.jpg';

          return (
            <div key={tag.slug} className="tag-card">
              <div className="tag-card-content">
                <a className="tag-link" href={`/tema/${tag.slug}`}>
                  {tag.text}
                </a>
                <span className="tag-count">({tag.count})</span>
              </div>
              {/* Mostrar la imagen del primer artículo que contiene el tag */}
              <img
                className="tag-image"
                src={imageUrl}
                alt={tag.text}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default TagList;
