import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from "react-redux";
import areasSlice from './features/Areas/areasSlice';
import dashboardSlice from './features/Dashboard/dashboardSlice';
import farmsSlice from './features/Farms/farmsSlice';
import producersSlice from './features/Producers/producersSlice';

export const store = configureStore({
  reducer: {
    areas: areasSlice,
    producers: producersSlice,
    farms: farmsSlice,
    dashboard: dashboardSlice
  },
  devTools: true,
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type RootState = ReturnType<typeof store.getState>