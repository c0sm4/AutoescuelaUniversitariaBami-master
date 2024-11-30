import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { serializeAxiosError } from 'app/shared/reducers/reducer.utils';

interface Libro {
  id: number;
  titulo: string;
  url: string;
}

interface LibroState {
  loading: boolean;
  errorMessage: string | null;
  libros: Libro[];
  libro: Libro | null;
  updateSuccess: boolean;
}

const initialState: LibroState = {
  loading: false,
  errorMessage: null,
  libros: [],
  libro: null,
  updateSuccess: false,
};

const apiUrl = 'api/libros';

// Thunks para las acciones

// Obtener todos los libros
export const fetchLibros = createAsyncThunk(
  'libro/fetch_all',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get<Libro[]>(apiUrl);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeAxiosError(error));
    }
  }
);

// Obtener un libro por ID
export const fetchLibro = createAsyncThunk(
  'libro/fetch_one',
  async (id: number, thunkAPI) => {
    try {
      const response = await axios.get<Libro>(`${apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeAxiosError(error));
    }
  }
);

// Crear un nuevo libro
export const createLibro = createAsyncThunk(
  'libro/create',
  async (libro: Partial<Libro>, thunkAPI) => {
    try {
      const response = await axios.post<Libro>(apiUrl, libro);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeAxiosError(error));
    }
  }
);

// Eliminar un libro por ID
export const deleteLibro = createAsyncThunk(
  'libro/delete',
  async (id: number, thunkAPI) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(serializeAxiosError(error));
    }
  }
);

// Slice para manejar el estado de los libros
export const libroSlice = createSlice({
  name: 'libro',
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder
      .addCase(fetchLibros.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchLibros.fulfilled, (state, action) => {
        state.loading = false;
        state.libros = action.payload;
      })
      .addCase(fetchLibros.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(fetchLibro.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchLibro.fulfilled, (state, action) => {
        state.loading = false;
        state.libro = action.payload;
      })
      .addCase(fetchLibro.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      })
      .addCase(createLibro.pending, state => {
        state.loading = true;
        state.errorMessage = null;
        state.updateSuccess = false;
      })
      .addCase(createLibro.fulfilled, (state, action) => {
        state.loading = false;
        state.libros.push(action.payload);
        state.updateSuccess = true;
      })
      .addCase(createLibro.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
        state.updateSuccess = false;
      })
      .addCase(deleteLibro.pending, state => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(deleteLibro.fulfilled, (state, action) => {
        state.loading = false;
        state.libros = state.libros.filter(libro => libro.id !== action.payload);
      })
      .addCase(deleteLibro.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload as string;
      });
  },
});

export const { reset } = libroSlice.actions;
export default libroSlice.reducer;
