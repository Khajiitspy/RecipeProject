import { configureStore } from "@reduxjs/toolkit";
import { recipeService } from "../api/recipeService";
import { userService } from "../api/userService";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    [countryService.reducerPath]: recipeService.reducer,
    [userService.reducerPath]: userService.reducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeService.middleware, userService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
