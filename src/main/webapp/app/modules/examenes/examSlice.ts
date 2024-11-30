import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

interface ScrapeNotaParams {
  dni: string;
  fechaNacimiento: string;
  fechaExamen: string;
}

interface ScraperState {
  loading: boolean;
  errorMessage: string | null;
  result: string | null;
  updateSuccess: boolean;
}

const initialState: ScraperState = {
  loading: false,
  errorMessage: null,
  result: null,
  updateSuccess: false,
};

const apiUrl = 'api/scraping';

// Thunk para realizar la llamada al scraper
export const scrapeNota = createAsyncThunk(
  'scraper/obtener_nota',
  async (params: ScrapeNotaParams, thunkAPI) => {
    const requestUrl = `${apiUrl}/nota`;
    try {
      const response = await axios.post(requestUrl, null, {
        params,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeAxiosError(error));
    }
  },
);

// Slice para manejar el estado del scraper
export const scraperSlice = createSlice({
  name: 'scraper',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(scrapeNota.pending, state => {
        state.loading = true;
        state.errorMessage = null;
        state.updateSuccess = false;
      })
      .addCase(scrapeNota.fulfilled, (state, action) => {
        state.loading = false;
        state.result = action.payload;
        state.updateSuccess = true;
      })
      .addCase(scrapeNota.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
        state.updateSuccess = false;
      });
  },
});

export const { reset } = scraperSlice.actions;
export default scraperSlice.reducer;
