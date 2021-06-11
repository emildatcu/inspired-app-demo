import * as React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Dispatch } from 'redux';

import {
  AppBar,
  Button,
  Grid,
  Toolbar,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import LazyLoad from 'components/LazyLoad';
import Post from 'components/Post';
import {
  decrementInspiration,
  fetchPosts,
  getPost,
  incrementInspiration,
} from 'store/actions/inspire';
import { TPost } from 'store/reducers/inspire';
import { StoreState } from 'store/store';
import helpers from 'utils/helpers';
import inspireStyles from './inspireStyles';

type MapStateToProps = {
  inspirationLevel: number;
  post: TPost;
  postsCount: number;
};

type MapDispatchToProps = {
  onIncrement: () => void;
  onDecrement: () => void;
  fetchPosts: () => void;
  getPost: (nmb: number) => void;
};

type OwnProps = {};

type Props = OwnProps & MapStateToProps & MapDispatchToProps & WithStyles<typeof inspireStyles>;
type State = {
  used: number[],
  show: boolean,
};
class Inspire extends React.Component<Props, State> {
  state: State = {
    used: [0],
    show: true,
  };

  componentDidMount() {
    this.props.fetchPosts();
  }

  getHearts = (numChars: number) => (
    Array(numChars + 1).join('♥')
  )

  getMessage = (level: number) => {
    return level <= 0 ?
      (<>You look like you could use some inspiration...</>) : // insert funny gif
      `Are you !nspired yet? ${this.getHearts(level)}`;
  }

  getRandomPost = () => {
    const { getPost: getNewPost, postsCount } = this.props;
    const { used: usedPosts } = this.state;

    const getRandom = (max: number) => Math.floor(Math.random() * (max));
    // tslint:disable-next-line: no-bitwise
    let randomN = getRandom(postsCount);
    const used = [...usedPosts];
    if (used.includes(randomN)) {
      randomN = getRandom(postsCount);
    }
    used.push(randomN);

    this.setState({
      used,
    });
    getNewPost(randomN);
  }

  getTitle = (post: TPost) => (
    post && post.title && !helpers.containsOnlyWhitespaces(post.title) ?
      post.title :
      'Title comes here...'
  )

  showHide() {
    this.setState((prevState) => ({
      show: !prevState.show
    }));
  }

  render() {
    const {
      classes,
      inspirationLevel,
      onDecrement,
      onIncrement,
      post,
    } = this.props;

    return (
      <Grid
        alignItems="center"
        className={classes.container}
        container={true}
        direction="column"
        justify="center"
        spacing={1}
      >
        <Grid item={true}>
          <AppBar position="static" color="secondary">
            <Toolbar>
              <Typography variant="body1" className={classes.subtitle}>
                {this.getMessage(inspirationLevel)}
              </Typography>
              <Button variant="contained" color="primary" onClick={this.getRandomPost}>
                !nspire me master!
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Button variant="contained" color="primary" onClick={this.showHide.bind(this)}>
          show/hide
        </Button>
        <LazyLoad show={post && !!post.content && this.state.show}>
          <Grid item={true}>
            <Post
              title={this.getTitle(post)}
              publishDate={post ? post.pubDate : ''}
              content={post ? post.content : ''}
              description={'Much truth! Such inspiration! Wuiiiiiiiiiii'}
              onDislike={onDecrement}
              onLike={onIncrement}
            />
          </Grid>
        </LazyLoad>

        <Button variant="contained" color="primary" onClick={this.getRandomPost}>
          !nspire me master
        </Button>
      </Grid>
    );
  }
}

const mapStateToProps = ({ inspire }: StoreState) => {
  const {
    inspirationLevel,
    post,
    postsCount,
  } = inspire;

  return {
    inspirationLevel,
    post,
    postsCount,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  // tslint:disable-next-line: no-any
  fetchPosts: () => dispatch<any>(fetchPosts()),
  getPost: (nmb: number) => dispatch(getPost(nmb)),
  onDecrement: () => dispatch(decrementInspiration()),
  onIncrement: () => dispatch(incrementInspiration()),
});

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withStyles(inspireStyles),
);

export default enhance(Inspire);
