import { getMe } from '@/app/api/user/userApi';
import { GetMeResType } from '@/schemaValidations/user.schema';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    profile: GetMeResType | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    status: 'idle',
    error: null,
};

// Thunk fetchUserProfile sử dụng API getMe
export const fetchUserProfile = createAsyncThunk('user/fetchUserProfile', async (_, { rejectWithValue }) => {
    try {
        return await getMe(); // Gọi API từ userApi
    } catch (error: any) {
        if (error.message) {
            return rejectWithValue(error.message);
        }
        throw error;
    }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        clearProfile(state) {
            state.profile = null;
            state.status = 'idle';
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<GetMeResType>) => {
                state.status = 'succeeded';
                state.profile = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to fetch user profile.';
            });
    },
});

export const { clearProfile } = userSlice.actions;
export default userSlice.reducer;
