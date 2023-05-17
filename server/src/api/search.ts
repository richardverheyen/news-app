import express from 'express';

interface Article {
  id: string;
  webTitle: string;
  webPublicationDate: string;
  webUrl: string;
  category: string;
}

const router = express.Router();

router.get('/', async (request, response) => {

  const url = "https://content.guardianapis.com/search?";
  const params = new URLSearchParams({ 
    "api-key": process.env.GUARDIAN_API_KEY,
    "q": request.query.string // search query 
  });

  const guardianResults = await fetch(url + params)
    .then(res => res.json())
    .then(data => data.response.results);

  const guardianArticles: Article[] = guardianResults.map((r: any) => ({
    id: r.id,
    webTitle: r.webTitle,
    webPublicationDate: r.webPublicationDate,
    webUrl: r.webUrl,
    category: r.sectionName
  }) as Article);
  
  response.json([
    ...guardianArticles
  ]);
});

export default router;
