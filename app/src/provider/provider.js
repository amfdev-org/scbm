import * as React from "react";
import {reducedReducers, allInitialStates} from "./rootReducer";
import {combineInitialStates} from "../utils/combineInitialStates"

const AppStateProvider = React.createContext({});

const ContextProvider = ({ children }) => {
  // call the function to get initial state and global reducer

  const initialState = combineInitialStates(allInitialStates);
  //console.log(initialState)
  // setup useReducer with the returned value of the reducers function
  const [state, dispatch] = React.useReducer(reducedReducers, initialState);

  // pass in the returned value of useReducer
  const contextValue = React.useMemo(() => ({ state, dispatch, initialState }), [
    state,
    dispatch,
    initialState
  ]);

  return (
    <AppStateProvider.Provider value={contextValue}>
      {children}
    </AppStateProvider.Provider>
  );
};

export { ContextProvider, AppStateProvider as ContextConsumer };