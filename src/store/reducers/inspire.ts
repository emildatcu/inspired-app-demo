import { inspireActions as types } from 'store/actions';
import { InspireActions } from 'store/actions/inspire';
import createReducer from 'utils/createReducer';
import helpers from 'utils/helpers';

export type TPost = {
  content: string,
  contentSnippet?: string,
  guid?: string,
  isoDate?: string,
  link: string,
  pubDate: string,
  title: string,
};

export type InspireState = {
  inspirationLevel: number,
  post: TPost,
  posts: TPost[],
  postsCount: number,
};

const initialState: InspireState = {
  inspirationLevel: 1,
  post: {} as unknown as TPost,
  posts: [] as unknown as TPost[],
  postsCount: 0,
};

const inspireReducer = createReducer(initialState)({
  [types.INCREMENT_INSPIRATION]: (state: InspireState, _action: InspireActions) => ({
    ...state,
    inspirationLevel: state.inspirationLevel >= 28 ? 28 : state.inspirationLevel + 1,
  }),
  [types.DECREMENT_INSPIRATION]: (state: InspireState, _action: InspireActions) => ({
    ...state,
    inspirationLevel: state.inspirationLevel <= 0 ? 0 : state.inspirationLevel - 1,
  }),
  [types.FETCH_POSTS_SUCCESS]: (state: InspireState, action: InspireActions) => {
    const { posts: allPosts } = action;

    const posts = allPosts.map(({ content: oldContent, link, title, pubDate }) => {
      const content = helpers.getStringBeforeChar(
        helpers.getStringAfterChar(oldContent, 'src="') || '',
        '"></a>',
      );

      return {
        content,
        link,
        pubDate,
        title,
      };
    });

    return {
      ...state,
      post: posts[0],
      // tslint:disable-next-line: object-shorthand-properties-first
      posts,
      postsCount: posts.length,
    };
  },
  [types.GET_POST]: (state: InspireState, action: InspireActions) => {
    const { posts } = state;

    return {
      ...state,
      post: posts[action.payload],
    };
  },
});

export default inspireReducer;
