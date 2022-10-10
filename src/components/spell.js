import React, { useEffect, useState } from 'react';
import { spellList, spellByIndex } from '../service/services';
import '../assets/styles/spell.css'
import "bootstrap/dist/css/bootstrap.css";

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

const style = {
  width: '100%',
  maxWidth: 260,
  bgcolor: 'background.paper',
};

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Spells() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = useState('');
    const [materialName, setMaterial] = useState('');

    // Load Spells List
    useEffect(() => {
        setLoading(true);
        (async () => {
            spellList()
                .then(async (res) => {
                    setLoading(false);
                    setData(res.results);
                });

        })().catch((e) => {
            console.error(e)
        }).finally(() => {
            setLoading(false);
        })
    }, [])

    //Load Spell Index by values
    const handleClickOpen = (e) => {
        setLoading(true);
        (async () => {
            spellByIndex(e)
                .then(async (response) => {
                    setLoading(false);
                    setValue(response.desc[0]);
                    setMaterial(response.material);
                    setOpen(true);
                });

        })().catch((e) => {
            console.error(e)
        }).finally(() => {
            setLoading(false);
        })

    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <List sx={style} component="nav" aria-label="mailbox folders">
            {data.map(goods => (
            <ListItem button divider >
                <ListItemText onClick={() => handleClickOpen(goods.index)}>{goods.index}
                </ListItemText>
            </ListItem>
            ))}
            <Divider />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {value}
                        <br /><br /> {materialName}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </List>
    );
}
export default Spells;