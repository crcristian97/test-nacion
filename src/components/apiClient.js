const BASE_URL = 'https://jrt2bb3b2nlkw5ozvfcld62wbe0pnifh.lambda-url.us-east-1.on.aws/';

async function fetchData(path) {
  const response = await fetch(`${BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

export async function getAllArticles() {
  try {
    const data = await fetchData('');
    return data.articles;
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}