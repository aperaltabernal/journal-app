import { collection, doc, setDoc, deleteDoc } from "firebase/firestore/lite";
import { FiresbaseDB } from "../../firebase/config";
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice";
import { loadNotes, fileUpload } from "../../helpers";

export const startNewNote = () => {
    return async(dispatch, getState) => {
        dispatch(savingNewNote());

        const {uid} = getState().authReducer;

        const newNote = {
            title: '', 
            body: '',
            date: new Date().getTime(),
            imagesUrls: []
        };

        const newDoc = doc( collection(FiresbaseDB, `${uid}/journal/notes`) );
        await setDoc(newDoc, newNote);
        
        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));
    }
}

export const startLoadingNotes = () => {
    return async(dispatch, getState) => {
        const {uid} = getState().authReducer;
        const notes = await loadNotes(uid);
        dispatch(setNotes(notes));
    }
}

export const startSaveNotes = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const {uid} = getState().authReducer;
        const {active:note} = getState().journalReducer;

        const noteToFirestore = {
            ...note
        };
        delete noteToFirestore.id;

        const docRef = doc(FiresbaseDB, `${uid}/journal/notes/${note.id}`);
        await setDoc(docRef, noteToFirestore, {merge: true});

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files = []) => {
    return async(dispatch) => {
        dispatch(setSaving());

        let promesas = [];
        Array.from(files).forEach((file) => {
            promesas.push(fileUpload(file));
        });

        const photosUrls = await Promise.all(promesas);
        dispatch(setPhotosToActiveNote(photosUrls));
    }
}

export const startDeletingNote = () => {
    return async(dispatch, getState) => {
        dispatch(setSaving());
        const {uid} = getState().authReducer;
        const {active:note} = getState().journalReducer;
        const docRef = doc(FiresbaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNoteById(note.id));
    }
}