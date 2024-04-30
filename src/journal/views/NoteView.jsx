import { SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useMemo, useRef } from "react"
import { useForm } from "../../hooks/useForm"
import { setActiveNote, startSaveNotes, startUploadingFiles } from "../../store/journal"
import Swal from "sweetalert2"

export const NoteView = () => {
    const inputFilesRef = useRef();
    const dispatch = useDispatch();
    const {active: note, messageSaved, isSaving} = useSelector(state => state.journalReducer);
    const {date, title, body, formState, onInputChange} = useForm(note);

    const dateString = useMemo(() => {
        return new Date(date).toUTCString();
    }, [date]);

    //Guarda en la nota activa cada cambio que se haga en el formulario
    useEffect(() => {
        dispatch(setActiveNote(formState));
    }, [formState]);

    useEffect(() => {
        if(messageSaved !== ''){
            Swal.fire({
                title: 'Nota actualizada',
                text: messageSaved,
                icon: 'success'
            })
        }
    }, [messageSaved])
    
    
    const onSaveNote = () => {
        dispatch(startSaveNotes());
    }

    const onFileInputChange = ({target}) => {
        if(target.files === 0) return;

        dispatch(startUploadingFiles(target.files))
    }

    return (
        <Grid container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{mb: 1}}
            className="animate__animated animate__fadeIn animate__faster"
        >
            <Grid item>
                <Typography fontSize={39} fontWeight="light">{dateString}</Typography>
            </Grid>
            <Grid item>
                <input
                    ref={inputFilesRef}
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{display: 'none'}}
                />

                <IconButton
                    color="primary"
                    disabled={isSaving}
                    onClick={() => inputFilesRef.current.click()}
                >
                    <UploadOutlined />
                </IconButton>

                <Button color="primary" sx={{padding: 2}} onClick={onSaveNote} disabled={isSaving}>
                    <SaveOutlined sx={{fontSize: 30, mr: 1}}/>
                    Guardar
                </Button>
            </Grid>
            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{border: 'none', mb: 1}}
                    value={title}
                    name="title"
                    onChange={onInputChange}

                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió en el día de hoy?"
                    minRows={5}
                    value={body}
                    name="body"
                    onChange={onInputChange}
                />
            </Grid>

            {/* Image gallery */}
            <ImageGallery images={note.imagesUrls} />
        </Grid>
    )
}