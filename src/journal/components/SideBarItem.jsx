import { useMemo } from "react"
import { useDispatch } from "react-redux"

import { TurnedInNot } from "@mui/icons-material"
import { Grid, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { setActiveNote } from "../../store/journal"

export const SideBarItem = ({note}) => {
    const {title, body} = note;
    const dispatch = useDispatch();

    const titleRef = useMemo(() => {
        return title.length > 17 ?
            title.substring(0, 17) + '...':
            title;
    }, [title]);

    const onClickNote = () => {
        dispatch(setActiveNote(note));
    }

    return (
        <ListItem disablePadding>
            <ListItemButton onClick={onClickNote}>
                <ListItemIcon>
                    <TurnedInNot />
                </ListItemIcon>
                
                <Grid container>
                    <ListItemText primary={titleRef}/>
                    <ListItemText secondary={body} />
                </Grid>
                
            </ListItemButton>
        </ListItem>
    )
}