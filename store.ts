// src/store.ts
import { configureStore } from '@reduxjs/toolkit'

import authReducer from './redux/reducer/authReducer'
import pricingReducer from './redux/reducer/pricingReducer'
import userReducer from './redux/reducer/userReducer'
import  colorReducer from './redux/reducer/colorReducer'
import fontSizeReducer from './redux/reducer/fontSizeReducer'
import fontFamilyReducer from './redux/reducer/fontFamilyReducer'
 import tabReducer from './redux/reducer/dashboardReducers/tabReducer'
import noteReducer from './redux/reducer/dashboardReducers/noteReducer'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    plan: pricingReducer,
    color:colorReducer,
    fontSize:fontSizeReducer,
    fontFamily: fontFamilyReducer,
    user: userReducer,
    tab: tabReducer,
    note: noteReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
