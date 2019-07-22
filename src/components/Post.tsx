import * as React from 'react';

import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
} from '@material-ui/core';
import {
  SentimentDissatisfied,
  SentimentVerySatisfied,
} from '@material-ui/icons';
import postStyles from './postStyles';

type OwnProps = {
  content: string,
  description: string,
  onDislike: () => void,
  onLike: () => void,
  publishDate: string,
  title: string,
};

type PropsType = OwnProps;

const Post: React.FC<PropsType> = (props) => {
  const classes = postStyles();
  const {
    title,
    publishDate,
    content,
    description,
    onDislike,
    onLike,
  } = props;

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={<Avatar aria-label="Inspiration" className={classes.avatar}>!</Avatar>}
        title={title}
        subheader={`Published: ${publishDate}`}
      />
      <CardMedia className={classes.mediaContainer} title={title}>
        <img src={content} alt="quote" className={classes.media} />
      </CardMedia>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing={false} className={classes.spacing}>
        <IconButton aria-label="Dislike" color="secondary" onClick={onDislike}>
          <SentimentDissatisfied />
        </IconButton>

        <IconButton aria-label="Like" color="primary" onClick={onLike}>
          <SentimentVerySatisfied />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default Post;
