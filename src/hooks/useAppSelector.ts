import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from '../configs/store';

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
