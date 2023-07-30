import { combineReducers, configureStore } from '@reduxjs/toolkit'
import type { PreloadedState } from '@reduxjs/toolkit'

// import userReducer from '../features/users/userSlice'
import { userAuthReducer } from '../../Storage/Redux/userAuthSlice'
import { authApi } from '../../Apis';


// Create the root reducer separately so we can extract the RootState type
  const rootReducer = combineReducers({ userAuthStore: userAuthReducer,[authApi.reducerPath]: authApi.reducer, });



export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
      middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({immutableCheck: false,
    serializableCheck: false,})
      .concat(authApi.middleware)
     
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']