import React, { Component } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material';


export default class CreateTrap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:0,
      latitude: 0,
      longitude: 0,
      deployed: false,
      nbCapture: 0,
      trapType: 0,
    };
    this.handleLocationClick = this.handleLocationClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleLocationClick() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        error => {
          if (error.code === error.PERMISSION_DENIED) {
            alert("Activer la géolocalisation sur votre appareil.");
          } else {
            console.error('Erreur de géolocalisation :', error);
          }
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      console.error('La géolocalisation n\'est pas prise en charge par ce navigateur.');
      alert("La géolocalisation n'est pas disponible sur votre appareil");
    }
  }
  

  handleSubmit(e) {
    e.preventDefault();
    const {id, latitude, longitude, deployed, nbCapture, trapType } = this.state;
    const trap = {id,latitude, longitude, deployed, nbCapture, trapType };
    const token = window.localStorage.getItem("token");
    const baseURL = "https://192.168.2.208:3001";
    if (token) {
    const req = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + token
      },
      body: JSON.stringify(trap)
    };
    console.log(req)
    fetch(`${baseURL}/api/trap`, req)
      .then(res => res.json())
      .then(data => {
        if (data.error){
          console.log(data);
          alert(data.message);
        } else {
          console.log(data);
          alert('Création prise en compte');
          this.props.handleClose();
        }
      })
      .catch(err => {
        console.error(err);
        alert('Erreur lors de la création du piège');
      });
    }
    else {
      alert("Vous devez vous authentifier avant d'accéder à cette ressource");
    }
  }

  
  render() {
    const {id, latitude, longitude, deployed, nbCapture, trapType } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="p-5">
        <h1>Création piège</h1>
        <FormGroup>
          <TextField label="Identifiant" type = "number" value={id} onChange={e => this.setState({ id: e.target.value === '' ? '' : parseInt(e.target.value) })} />
  
          <TextField label="Latitude" type = "number" value={latitude} onChange={e => this.setState({ latitude: e.target.value === '' ? '' : parseFloat(e.target.value) })} />
  
          <TextField label="Longitude" type = "number" value={longitude} onChange={e => this.setState({ longitude: e.target.value === '' ? '' : parseFloat(e.target.value) })} />
  
          <FormControlLabel control={<Checkbox checked={deployed} onChange={e => this.setState({ deployed: e.target.checked })} />} label="Active ?" />
  
          <TextField label="Type" type = "number" value={trapType} onChange={e => this.setState({ trapType: e.target.value === '' ? '' : parseInt(e.target.value) })} />
  
          <TextField label="Nombre de capture" type = "number" value={nbCapture} onChange={e => this.setState({ nbCapture: e.target.value === '' ? '' : parseInt(e.target.value) })} />


          <Button onClick={this.handleLocationClick} variant="contained" color="primary">Position actuelle</Button>
          <Button type="submit" variant="contained" color="secondary">Créer piège</Button>
        </FormGroup>
      </form>
    );
  }
}
