import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {State, AppDispatch} from './type';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useAppSelector: TypedUseSelectorHook<State> = useSelector;
