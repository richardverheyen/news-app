import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from "@mui/material/IconButton";
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { Article } from "../types";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

interface ArticleItemProps {
  article: Article;
  pinArticle: (id: String) => void;
  unpinArticle: (id: String) => void;
}

function ArticleItem({ article, pinArticle, unpinArticle }: ArticleItemProps) {
  return (
    <Card className="card" sx={{ maxWidth: 345 }}>
      <CardHeader
        action={
          article.pinned ? 
          <IconButton 
            onClick={() => unpinArticle(article.id)}
            aria-label="unpin article">
            <FavoriteIcon />
          </IconButton> :
          <IconButton 
            onClick={() => pinArticle(article.id)}
            aria-label="unpin article">
            <FavoriteBorderIcon />
          </IconButton>
        }
        subheader={article.source}
      />
      <CardContent>
        <Typography gutterBottom variant="h5">
          {article.webTitle}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {new Intl.DateTimeFormat('en-AU').format(new Date(article.webPublicationDate))}
        </Typography>
        <Chip label={article.category} />
      </CardContent>
      <CardActions>
          <Link target="_blank" href={article.webUrl}>
            <Button size="small">
              Link
            </Button>
          </Link>
      </CardActions>
    </Card>
  );
}

export default ArticleItem;
