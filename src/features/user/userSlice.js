import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
import { authService } from "./userService";
import { toast } from "react-toastify";


export const registerUser=createAsyncThunk("auth/register",async (userData,thunkAPI)=>{
    try{
        return await authService.register(userData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
export const loginUser=createAsyncThunk("auth/login",async (userData,thunkAPI)=>{
    try{
        return await authService.login(userData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
export const addProductCart=createAsyncThunk("auth/cart/add",async (cartData,thunkAPI)=>{
    try{
        return await authService.addToCart(cartData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const getUserCart=createAsyncThunk("auth/cart/",async (thunkAPI)=>{
    try{
        return await authService.getCart()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
export const updateUserCart=createAsyncThunk("auth/cart/update",async (cartDetail,thunkAPI)=>{
    try{
        return await authService.updateCart(cartDetail)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
export const removeUserCart=createAsyncThunk("auth/cart/delete",async (id,thunkAPI)=>{
    try{
        return await authService.removeCart(id)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const addOrder=createAsyncThunk("auth/order/add",async (orderData,thunkAPI)=>{
    try{
        return await authService.createOrder(orderData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

export const updateUser=createAsyncThunk("auth/update",async (userData,thunkAPI)=>{
    try{
        return await authService.saveAddress(userData)
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});
export const getUserOrder=createAsyncThunk("auth/order/",async (thunkAPI)=>{
    try{
        return await authService.getOrders()
    }catch(error){
        return thunkAPI.rejectWithValue(error)
    }
});

const getUserfromLocalStorage = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;
const initialState = {
    user: getUserfromLocalStorage,
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}
export const resetState = createAction("Reset_all");
export const authSlice=createSlice({
    name:"auth",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(registerUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.createdUser = action.payload;
            if(state.isSuccess === true){
                toast.info("Bạn đã đăng ký thành công")
            }
        }).addCase(registerUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isError = false;
            state.message = action.error;
            if(state.isSuccess === true){
                toast.error(action.error)
            }
        })
        .addCase(loginUser.pending,(state)=>{
            state.isLoading = true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.User = action.payload;
            if(state.isSuccess === true){
                // localStorage.setItem("token", action.payload.token);
                toast.info("Bạn đã đăng nhập thành công")
            }
        }).addCase(loginUser.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = true;
            state.isError = false;
            state.message = action.error;
            if(state.isError === true){
                toast.error(action.error)
            }
        })
        .addCase(addProductCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addProductCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProduct = action.payload;
            if(state.isSuccess){
                toast.success("Product Added to Cart")
            }
        })
        .addCase(addProductCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(getUserCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.cartProducts = action.payload;
        })
        .addCase(getUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(updateUserCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUserCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCartProduct = action.payload;
        })
        .addCase(updateUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
        .addCase(removeUserCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(removeUserCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.deletedCartProduct = action.payload;
            
        })
        .addCase(removeUserCart.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true){
                toast.error("action Failed")
            }
        })
        .addCase(addOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.addedOrder = action.payload;
            if(state.isSuccess){
                toast.success("Chúc mừng! Bạn đã đặt hàng thành công.")
            }
        })
        .addCase(addOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true){
                toast.error("action Failed")
            }
        })
        .addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.updatedCartProduct = action.payload;
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
            if(state.isError === true){
                toast.error("action Failed")
            }
        })
        .addCase(getUserOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserOrder.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isError = false;
            state.isSuccess = true;
            state.UserOrder = action.payload;
        })
        .addCase(getUserOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.isSuccess = false;
            state.message = action.error;
        })
    }
})


export default authSlice.reducer;