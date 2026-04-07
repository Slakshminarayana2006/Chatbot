import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk("chat/sendMessage", async(message) => {
    const response = await fetch("https://chatbot-c43l.onrender.com/chat", 
        {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body : JSON.stringify({message})
        }
    );

    const data = await response.json();
    return data.reply;
})


const chatSlice = createSlice({
    name : "chat",
    initialState : {
        messages : [],
        loading : false
    },
    reducers : {
        addUserMessage : (state ,action) => {
            state.messages.push({
                text : action.payload,
                sender : "user"
            })
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(sendMessage.pending, (state) => {
            state.loading = true;
        })
        .addCase(sendMessage.fulfilled, (state, action) => {
            state.loading = false;
            state.messages.push({
            text: action.payload,
            sender: "bot"
            });
        })
        .addCase(sendMessage.rejected, (state) => {
            state.loading = false;
        });
    }
});

export const {addUserMessage} = chatSlice.actions;
export default chatSlice.reducer;
