import React, { useState} from 'react';
import { IconButton, TextField, Checkbox, TableHead, Table, TableBody, TableCell, TableContainer,TableRow, Paper } from '@mui/material';
import { Save as SaveIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import TableCells, { tableCellClasses } from '@mui/material/TableCell';
import TablePagination from '@mui/material/TablePagination';
import { Fab, Dialog, DialogTitle, DialogContent, Button, Input} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CreateTrap from './trap';
import axios from 'axios';

const TrapList = ({ traps, updateTrap, deleteTrap, onTrapCreated }) => {
  const [editId, setEditId] = useState(null);
  const [editTrap, setEditTrap] = useState({});
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const baseURL = "https://192.168.2.208:3001";


  //Modification information du piège
  const startEditing = (trap) => {
    setEditId(trap.id);
    setEditTrap(trap);
  };

  const handleTrapChange = (e) => {
    const { name, value } = e.target;
    setEditTrap(prevTrap => ({ ...prevTrap, [name]: value }));
  };

  const saveChanges = () => {
    updateTrap(editId, editTrap);
    setEditId(null);
    setEditTrap({});
  };
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      window.location.reload();
    };

  const StyledTableCell = styled(TableCells)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //Ajout des images

  const fileInput = React.useRef(null);

  const handleFileInputClick = () => {
    fileInput.current.click();
  };

  const addImage = (trapId, image) => {
    const formData = new FormData();
    formData.append('image', image);
  
    axios.put(`${baseURL}/api/trap/image/add/${trapId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    })
    .then((response) => {
      console.log(response.data);
      window.location.reload();
    })
    .catch((err) => {
      console.error(err);
      alert('Erreur lors de l\'ajout d\'image');
    });
  };
  
  const deleteImage = (trapId) => {
    axios.put(`${baseURL}/api/trap/image/rm/${trapId}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + window.localStorage.getItem('token'),
      },
    })
    .then((response) => {
      console.log(response.data);
      window.location.reload();
    })
    .catch((err) => {
      console.error(err);
      alert('Erreur lors de la suppression de l\'image');
    });
  };

  const handleImageClick = () => {
    setIsImageZoomed(!isImageZoomed);
  }

  const imageStyle = isImageZoomed ? {width: '300px', height: '300px'} : {width: '50px', height: '50px'};



  return (
    <div>
      <Fab color="primary" aria-label="add" onClick={handleClickOpen} style={{ marginRight: '100%' }}>
        <AddIcon />
      </Fab>

      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create Trap</DialogTitle>
        <DialogContent>
          <CreateTrap handleClose={handleClose}/>  {/* Affiche le form ici*/}
        </DialogContent>
      </Dialog>
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
          <StyledTableCell>Identifiants</StyledTableCell>
          <StyledTableCell>Type</StyledTableCell>
          <StyledTableCell>Active ?</StyledTableCell>
          <StyledTableCell>latitude</StyledTableCell>
          <StyledTableCell>longitude</StyledTableCell>
          <StyledTableCell>Capture</StyledTableCell>
          <StyledTableCell>Modifier</StyledTableCell>
          <StyledTableCell>Supprimer</StyledTableCell>
          <StyledTableCell>Image</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {traps
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((trap) => (
              <TableRow key={trap.id}>
                <TableCell component="th" scope="row">{trap.id}</TableCell>
                <TableCell>
                  {editId === trap.id ?
                    <TextField name="trapType" value={editTrap.trapType} onChange={handleTrapChange} /> :
                    trap.trapType}
                </TableCell>
                <TableCell>
                  {editId === trap.id ?
                    <Checkbox name="deployed" checked={editTrap.deployed} onChange={e => handleTrapChange({ target: { name: "deployed", value: e.target.checked } })} /> :
                    trap.deployed ? 'Yes' : 'No'}
                </TableCell>
                <TableCell>
                  {editId === trap.id ?
                    <TextField type="number" name="latitude" value={editTrap.latitude} onChange={handleTrapChange} /> :
                    trap.latitude}
                </TableCell>
                <TableCell>
                  {editId === trap.id ?
                    <TextField type="number" name="longitude" value={editTrap.latitude} onChange={handleTrapChange} /> :
                    trap.longitude}
                </TableCell>
                <TableCell>
                  {editId === trap.id ?
                    <TextField type="number" name="nbCapture" value={editTrap.nbCapture} onChange={handleTrapChange} /> :
                    trap.nbCapture}
                </TableCell>
                <TableCell>
                  {editId === trap.id ?
                    <IconButton onClick={saveChanges}><SaveIcon /></IconButton> :
                    <IconButton onClick={() => startEditing(trap)}><EditIcon /></IconButton>}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => deleteTrap(trap.id)}><DeleteIcon /></IconButton>
                </TableCell>
                <TableCell>
      {editId === trap.id ?
        <div>
          {trap.imgUrl ?
            <div>
              <img 
                src={`${baseURL}/${trap.imgUrl}`} 
                alt="Piège" 
                style={imageStyle} 
                onClick={handleImageClick} 
              />
            </div> :
            <div>
              <Input
                type="file"
                inputRef={fileInput}
                onChange={e => addImage(trap.id, e.target.files[0])}
                style={{ display: 'none' }}
              />
              <Button variant="contained" onClick={handleFileInputClick}>Upload Image</Button>
            </div>
          }
          {trap.imgUrl && <IconButton onClick={() => deleteImage(trap.id)}><DeleteOutlineIcon /></IconButton>}
        </div> : 
        
        trap.imgUrl ? 
          <img 
            src={`https://192.168.2.208:3001/${trap.imgUrl}`} 
            alt="Trap" 
            style={imageStyle} 
            onClick={handleImageClick} 
          /> : 
          'Pas D\'image'}
    </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    <TablePagination
      rowsPerPageOptions={[5, 10, 15]}
      component="div"
      count={traps.length}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  </Paper>
  </div>
  );
};

export default TrapList;
