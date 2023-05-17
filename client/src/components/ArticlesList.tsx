import { Article } from "../types";
import ArticleItem from "./ArticleItem";

interface ArticlesListProps {
  articles: Article[];
  pinArticle: (id: String) => void;
  unpinArticle: (id: String) => void;
}

function ArticlesList({ articles, pinArticle, unpinArticle }: ArticlesListProps) {

  if (!articles.length) {
    return <p>No Articles</p>
  }
  return (
    <ul>
      {articles.map((article: Article, index: number) => (
        <li key={index}>
          <ArticleItem article={article} pinArticle={pinArticle} unpinArticle={unpinArticle} />
        </li>
      ))}
    </ul>
  );
}

export default ArticlesList;
