import express from 'express';
import xss from 'xss';
const router = express.Router();
async function getGuardianArticles(queryString) {
    const url = "https://content.guardianapis.com/search?";
    const params = new URLSearchParams({
        "api-key": process.env.GUARDIAN_API_KEY,
        "q": queryString // search query 
    });
    const guardianResults = await fetch(url + params)
        .then(res => res.json())
        .then(data => data.response.results);
    const articles = guardianResults.map((r) => ({
        id: r.id,
        webTitle: r.webTitle,
        webPublicationDate: r.webPublicationDate,
        webUrl: r.webUrl,
        category: r.sectionName,
        source: "The Guardian"
    }));
    return articles;
}
async function getNewsApiArticles(queryString) {
    const url = "https://newsapi.org/v2/everything?";
    const params = new URLSearchParams({
        "apiKey": process.env.NEWS_API_KEY,
        "q": queryString // search query 
    });
    const newsApiResults = await fetch(url + params)
        .then(res => res.json())
        .then(data => data.articles);
    console.log({ newsApiResults });
    const articles = newsApiResults.map((r) => ({
        id: r.url,
        webTitle: r.title,
        webPublicationDate: r.publishedAt,
        webUrl: r.url,
        category: r.source?.name,
        source: "News API"
    }));
    return articles;
}
router.get('/', async (request, response) => {
    const queryString = xss(request.query.string);
    const guardianArticles = await getGuardianArticles(queryString);
    const newsApiArticles = await getNewsApiArticles(queryString);
    const allArticles = [
        ...guardianArticles,
        ...newsApiArticles
    ];
    const sortedArticles = allArticles.sort((a, b) => new Date(a.webPublicationDate).getTime() > new Date(b.webPublicationDate).getTime() ? -1 : 0);
    response.json(sortedArticles);
});
export default router;
//# sourceMappingURL=search.js.map