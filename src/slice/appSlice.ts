import { createSlice } from '@reduxjs/toolkit';
import { MovieListItem } from '../models/movieList';

export interface AppState {
  isPreviewActivated: boolean;
  isDetailActivated: boolean;
  hoveredCardTop: number;
  hoveredCardLeft: number;
  hoveredMovie: MovieListItem | null;
  isPreviewMuted: boolean;
}

export const initialState: AppState = {
  isPreviewActivated: false,
  isDetailActivated: false,
  hoveredCardTop: 0,
  hoveredCardLeft: 0,
  hoveredMovie: null,
  isPreviewMuted: true,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setPreview: (state, action) => {
      state.isPreviewActivated = action.payload;
    },
    setTop: (state, action) => {
      state.hoveredCardTop = action.payload;
    },
    setLeft: (state, action) => {
      state.hoveredCardLeft = action.payload;
    },
    setMovie: (state, action) => {
      state.hoveredMovie = action.payload;
    },
    setMuted: (state, action) => {
      state.isPreviewMuted = action.payload;
    },
    setDetail: (state, action) => {
      state.isDetailActivated = action.payload;
      if (action.payload) {
        const scrollY = window.scrollY;
        const appContainer = document.getElementById('appContainer');
        if (appContainer) {
          appContainer.style.overflow = 'hidden';
          appContainer.style.position = 'fixed';
          appContainer.style.top = `-${scrollY}px`;
          window.scrollTo(0, 0);
        }
      } else {
        const appContainer = document.getElementById('appContainer');
        if (appContainer) {
          const scrollY = appContainer.style.top;
          appContainer.style.position = '';
          appContainer.style.top = '';
          window.scrollTo(0, parseInt(scrollY || '0') * -1);
        }
      }
    },
  },
});

export const { setPreview, setLeft, setTop, setMovie, setDetail, setMuted } =
  appSlice.actions;
