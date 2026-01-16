import { configureStore } from "@reduxjs/toolkit";
import { recipeService } from "../api/recipeService";
import { userService } from "../api/userService";
import { unitService } from "../api/unitService";
import { ingredientService } from "../api/ingredientService";
import { categoryService } from "../api/categoryService.ts";
import {type TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

export const store = configureStore({
  reducer: {
    [recipeService.reducerPath]: recipeService.reducer,
    [userService.reducerPath]: userService.reducer,
    [ingredientService.reducerPath]: ingredientService.reducer,
    [unitService.reducerPath]: unitService.reducer,
    [categoryService.reducerPath]: categoryService.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(recipeService.middleware,categoryService.middleware, unitService.middleware, userService.middleware, ingredientService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
