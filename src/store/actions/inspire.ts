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

type GetPost = {
  payload: number,
  type: types.GET_POST,
};
const getPost = (payload: number): GetPost => ({
  payload,
  type: types.GET_POST,
});

type FetchPosts = {
  posts: TPost[],
  type: types.FETCH_POSTS_SUCCESS,
};

type Source = {
  user: string,
  feed: string,
};
const fetchPosts = () => {
  return async (dispatch: Dispatch) => {
    const Parser = require('rss-parser');
    const parser = new Parser();
    const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
    const inspirationArr: Source[] = [
      { user: 'areare289', feed: 'uninspirational-quotes' },
      { user: 'torquerench', feed: 'uninspirational-quotes' },
      { user: 'clarewoodrow', feed: 'uninspirational-quotes' },
      { user: 'aharrison0104', feed: 'uninspirational-quotes' },
      { user: 'randimcdowall', feed: 'uninspirational-quotes' },
      { user: 'karenshaver1', feed: 'uninspirational-quotes' },
      { user: 'janeprichardson', feed: 'very-demotivational-uninspirational-quotesparody-h' },
    ];

    await (async () => {
      const postList: TPost[] = [];
      inspirationArr.forEach(async ({ user, feed }: Source) => {
        const postBatch = await parser.parseURL(`
          ${CORS_PROXY}https://ro.pinterest.com/${user}/${feed}.rss
        `);

        await postList.push(...postBatch.items);
        dispatch({ posts: postList, type: types.FETCH_POSTS_SUCCESS });
      });
    })();
  };
};

export type InspireActions = DecrementInspiration &
  FetchPosts &
  GetPost &
  IncrementInspiration;

export {
  decrementInspiration,
  fetchPosts,
  getPost,
  incrementInspiration,
};
