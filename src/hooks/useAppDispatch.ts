import { useDispatch } from 'react-redux';
import { AppDispatch } from '../configs/store';

export const useAppDispatch = () => useDispatch<AppDispatch>();
