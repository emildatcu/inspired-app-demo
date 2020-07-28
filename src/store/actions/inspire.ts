import { Dispatch } from 'redux';
import { inspireActions as types } from 'store/actions';
import { TPost } from 'store/reducers/inspire';

type IncrementInspiration = {
  type: types.INCREMENT_INSPIRATION,
};
const incrementInspiration = (): IncrementInspiration => ({
  type: types.INCREMENT_INSPIRATION,
});

type DecrementInspiration = {
  type: types.DECREMENT_INSPIRATION,
};
const decrementInspiration = (): DecrementInspiration => ({
  type: types.DECREMENT_INSPIRATION,
});

export type GetPostAction = {
  payload: number,
  type: types.GET_POST,
};
const getPost = (payload: number): GetPostAction => ({
  payload,
  type: types.GET_POST,
});

export type FetchPostsAction = {
  posts: TPost[],
  type: types.FETCH_POSTS_SUCCESS,
};

type Source = {
  username: string,
  feed: string,
};
const fetchPosts = () => {
  return async (dispatch: Dispatch) => {
    const Parser = require('rss-parser');
    const parser = new Parser();
    const CORS_PROXY = 'https://thingproxy.freeboard.io/fetch/';

    const inspirationArr: Source[] = [
      { username: 'areare289', feed: 'uninspirational-quotes' },
      { username: 'torquerench', feed: 'uninspirational-quotes' },
      { username: 'clarewoodrow', feed: 'uninspirational-quotes' },
      { username: 'aharrison0104', feed: 'uninspirational-quotes' },
      { username: 'randimcdowall', feed: 'uninspirational-quotes' },
      { username: 'karenshaver1', feed: 'uninspirational-quotes' },
      { username: 'janeprichardson', feed: 'very-demotivational-uninspirational-quotesparody-h' },
      { username: 'ashleacourtney', feed: 'uninspirational-quotes' },
      { username: 'ErinLouiseHeine', feed: 'uninspirational-quotes' },

    ];

    await (async () => {
      const postList: TPost[] = [];

      inspirationArr.forEach(async ({ username, feed }: Source) => {
        const postBatch = await parser.parseURL(`
          ${CORS_PROXY}https://www.pinterest.com/${username}/${feed}.rss
        `);
        postList.push(...postBatch.items);

        dispatch({ posts: postList, type: types.FETCH_POSTS_SUCCESS });
      });
    })();
  };
};

export type InspireActions = ReturnType<typeof decrementInspiration> |
  ReturnType<typeof incrementInspiration>;

export {
  decrementInspiration,
  fetchPosts,
  getPost,
  incrementInspiration,
};
