import './styles/App.css'
import { useState } from 'react';
import Search from './components/Search';
import ArticlesList from './components/ArticlesList';
import { Article } from './types';

function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  function handleSearchResults(data: Article[]) {
    const pinnedArticles = articles.filter(a => a.pinned);

    const array = [...pinnedArticles, ...data];

    const uniqueArticles = array.reduce((accumulator: Array<Article>, current: Article)=> {
      if (!accumulator.find((item: any) => item.id === current.id)) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);

    // console.log(`hsr: ${articles.length} old, ${data.length} new, ${pinnedArticles.length} pinned, ${uniqueArticles.length} uniqueArticles`);
    setArticles(uniqueArticles);
  }

  function pinArticle(id: String) {
    // console.log("pinArticle");

    const state = [...articles];
    const articleIndex = state.findIndex(a => a.id === id);
    state[articleIndex].pinned = true;
    setArticles(state);
  }
  function unpinArticle(id: String) {
    // console.log("unpinArticle");

    const state = [...articles];
    const articleIndex = state.findIndex(a => a.id === id);
    state[articleIndex].pinned = false;
    setArticles(state);
  }

  return (
    <main>
      <Search handleSearchResults={handleSearchResults}/>
      <ArticlesList 
        articles={articles}
        pinArticle={pinArticle}
        unpinArticle={unpinArticle} />
    </main>
  )
}

export default App
