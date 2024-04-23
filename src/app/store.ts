import { configureStore } from '@reduxjs/toolkit'
import controllerSlice from '../features/controller/controllerSlice';

export default configureStore({
  reducer: {
    controller: controllerSlice
  }
})