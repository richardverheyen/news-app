import express from 'express';
import xss from 'xss';
const router = express.Router();
router.get('/', async (request, response) => {
    const url = "https://content.guardianapis.com/search?";
    const params = new URLSearchParams({
        "api-key": process.env.GUARDIAN_API_KEY,
        "q": xss(request.query.string) // search query 
    });
    const guardianResults = await fetch(url + params)
        .then(res => res.json())
        .then(data => data.response.results);
    const guardianArticles = guardianResults.map((r) => ({
        id: r.id,
        webTitle: r.webTitle,
        webPublicationDate: r.webPublicationDate,
        webUrl: r.webUrl,
        category: r.sectionName
    }));
    response.json([
        ...guardianArticles
    ]);
});
export default router;
//# sourceMappingURL=search.js.map