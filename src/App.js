import React, { useEffect, useState } from 'react';
import ArticleList from './components/ArticleList';
import TagList from './components/TagList';
import { getAllArticles } from './components/apiClient';

function App() {
  const [articles, setArticles] = useState([]);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    getAllArticles()
      .then((articlesData) => {
        setArticles(articlesData);

        // Procesar los tags y obtener su recuento
        const allTags = articlesData.reduce((acc, article) => {
          article?.taxonomy?.tags.forEach((tag) => {
            const existingTag = acc.find((item) => item.slug === tag.slug);
            if (existingTag) {
              existingTag.count++;
            } else {
              acc.push({ ...tag, count: 1 });
            }
          });
          return acc;
        }, []);

        // Ordenar los tags por recuento en orden descendente
        const sortedTags = allTags.sort((a, b) => b.count - a.count);

        // Tomar los primeros 10 tags
        const topTags = sortedTags.slice(0, 10);

        setTags(topTags);
      })
      .catch((error) => console.error('Error fetching articles:', error));
  }, []);

  return (
    <div className="App">
      <main>
        <TagList tags={tags} articles={articles} />
        <ArticleList articles={articles} />
      </main>
    </div>
  );
}

export default App;