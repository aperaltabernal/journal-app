import {createSlice} from '@reduxjs/toolkit'

const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSaved: '',
        notes: [],
        active: null,
        // active: {
        //     id: 'asd123',
        //     title: '',
        //     body: '',
        //     date: 123456,
        //     imagesUrls: [], //https://foto1.jpg, https://foto2.jpg
        // }
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSaved = '';
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSaved = '';
        },
        updateNote: (state, {payload}) => {
            state.isSaving = false;
            state.notes = state.notes.map(note => {
                if(note.id === payload.id) return payload;
                return note;
            });
            state.messageSaved = `${payload.title}, actualizada correctamente`;
        },
        setPhotosToActiveNote: (state, {payload}) => {
            state.active.imagesUrls = [...state.active.imagesUrls, ...payload];
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => {

        }
    }
});

export const {setPhotosToActiveNote, savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNoteById} = journalSlice.actions;

export const journalReducer = journalSlice.reducer;