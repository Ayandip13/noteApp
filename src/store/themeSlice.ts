import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useColorScheme } from 'react-native';

export type ThemeType = 'light' | 'dark';

interface ThemeState {
  theme: ThemeType;
}

const systemScheme = useColorScheme?.() || 'light';

const initialState: ThemeState = {
  theme: systemScheme,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
