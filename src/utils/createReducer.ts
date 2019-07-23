
type ActionType = { type: string };

// type ReducerMapType = { x: ActionType };
// tslint:disable-next-line: no-any
const createReducer = (iSt: unknown) => (reducerMap: any) => (state = iSt, action: ActionType) => {
  const reducer = reducerMap[action.type];

  return reducer ? reducer(state, action) : state;
};

export default createReducer;
