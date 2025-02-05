import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { login as loginApi, logout as logoutApi } from '@/app/api/authentication/authApi';
import http from '@/lib/http';

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const initialState: AuthState = {
    accessToken: null,
    refreshToken: null,
    status: 'idle',
    error: null,
};

// Thunk xử lý login
export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
        try {
            const response = await loginApi(credentials.username, credentials.password); // Gọi API login
            if (!response?.value) {
                throw new Error('Invalid response from server');
            }

            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', response.value.accessToken);
                localStorage.setItem('refreshToken', response.value.refreshToken);
            }

            return response.value;
        } catch (error: any) {
            return rejectWithValue(error.payload?.message || 'Login failed');
        }
    }
);

// Thunk xử lý logout
export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
    try {
        await logoutApi(); // Gọi API logout
        dispatch(clearAuthState()); // Xóa state trong Redux

        if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            window.location.href = '/auth/login'; // Redirect về trang login
        }
    } catch (error) {
        console.error('❌ Logout failed:', error);
    }
});

// Thunk xử lý refresh token
export const refreshTokens = createAsyncThunk('auth/refreshTokens', async (_, { rejectWithValue }) => {
    const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;

    if (!refreshToken) {
        return rejectWithValue('No refresh token found');
    }

    try {
        const response = await http.post<{ value: { accessToken: string; refreshToken: string } }>('/auth/refresh', {
            refreshToken,
        });

        if (typeof window !== 'undefined') {
            localStorage.setItem('accessToken', response.value.accessToken);
            localStorage.setItem('refreshToken', response.value.refreshToken);
        }

        return response.value;
    } catch (error: any) {
        return rejectWithValue(error.payload?.message || 'Failed to refresh tokens.');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        updateTokens(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;

            if (typeof window !== 'undefined') {
                localStorage.setItem('accessToken', action.payload.accessToken);
                localStorage.setItem('refreshToken', action.payload.refreshToken);
            }
        },
        clearAuthState(state) {
            state.accessToken = null;
            state.refreshToken = null;
            state.status = 'idle';
            state.error = null;

            if (typeof window !== 'undefined') {
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(login.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
                state.status = 'succeeded';
                state.accessToken = action.payload.accessToken;
                state.refreshToken = action.payload.refreshToken;
            })
            .addCase(login.rejected, (state, action: PayloadAction<any>) => {
                state.status = 'failed';
                state.error = action.payload || 'Failed to login.';
            })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.status = 'idle';
                state.accessToken = null;
                state.refreshToken = null;
            })

            // Refresh Tokens
            .addCase(
                refreshTokens.fulfilled,
                (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
                    state.accessToken = action.payload.accessToken;
                    state.refreshToken = action.payload.refreshToken;
                }
            )
            .addCase(refreshTokens.rejected, (state, action: PayloadAction<any>) => {
                state.error = action.payload || 'Failed to refresh tokens.';
            });
    },
});

export const { updateTokens, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
