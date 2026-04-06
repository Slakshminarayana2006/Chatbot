import {configureStore} from '@reduxjs/toolkit'
import chatReducer from './Slice/chatSlice'

const store = configureStore({
    reducer : {
        chat : chatReducer
    }
})

export default store;