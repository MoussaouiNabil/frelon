import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup,LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.css';
import 'leaflet.awesome-markers/dist/leaflet.awesome-markers.js';
import axios from 'axios';
import 'leaflet/dist/leaflet.css';
import Navbar from '../navbar_login/navbar';
import "./carte.css"
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

//marker pour utilisateur
const myIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});
//marker pour tout les utilisateurs
let greenIcon = L.AwesomeMarkers.icon({
  icon: 'coffee',
  markerColor: 'green'
});

function Map() {
    const [traps, setTraps] = useState([]);
    const [allTraps, setAllTraps] = useState([]);
    const [center, setCenter] = useState([46.2276, 2.2137]);
    const [users, setUsers] = useState({});
    const baseURL = "https://192.168.2.208:3001";
    useEffect(() => {
      axios
        .get(`${baseURL}/api/trap/mytraps`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
          },
        })
        .then((response) => {
          setTraps(response.data);
    
          
          const fetchUserData = async () => {
            const userPromises = response.data.map((trap) =>
              axios
                .get(`${baseURL}/api/auth/${trap.userID}`, {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + window.localStorage.getItem('token'),
                  },
                })
                .catch((err) => console.error(err))
            );
            const userResponses = await Promise.all(userPromises);
            const userMap = userResponses.reduce((acc, userResponse, index) => {
              if (userResponse && userResponse.data && userResponse.data.name) {
                acc[response.data[index].userID] = userResponse.data.name;
              }
              return acc;
            }, {});
            setUsers(userMap);
          };
          fetchUserData();
    
          const validTraps = response.data.filter(
            (trap) => trap.latitude && trap.longitude
          );
          if (validTraps.length > 0) {
            const avgLatitude =
              validTraps.reduce((sum, trap) => sum + trap.latitude, 0) /
              validTraps.length;
            const avgLongitude =
              validTraps.reduce((sum, trap) => sum + trap.longitude, 0) /
              validTraps.length;
            setCenter([avgLatitude, avgLongitude]);
          }
        })
        .catch((err) => {
          console.error(err);
          alert('Erreur lors de l\'affichage des pièges');
        });
    
      axios
        .get(`${baseURL}/api/trap`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
          },
        })
        .then((response) => {
          setAllTraps(response.data);
        })
        .catch((err) => {
          console.error(err);
          alert('Erreur lors de l\'affichage des pièges');
        });
    }, []);
    

    //Ajout de pièges
    const handleAddCapture = (trapId) => {
      axios
        .put(
          `${baseURL}/api/trap/${trapId}/addcapt`,
          {},
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + window.localStorage.getItem('token'),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          
          const updatedTraps = traps.map((trap) =>
            trap.id === trapId ? { ...trap, nbCapture: trap.nbCapture + 1 } : trap
          );
          setTraps(updatedTraps);
        })
        .catch((err) => {
          console.error(err);
          alert('Erreur lors de l\'ajout des pièges');
        });
    };
    

    //Suppression de pièges
    const handleDeleteCapture = (trapId) => {
      axios
        .delete(
          `${baseURL}/api/trap/${trapId}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + window.localStorage.getItem('token'),
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          
          const updatedTraps = traps.filter((trap) => trap.id !== trapId);
          setTraps(updatedTraps);
        })
        .catch((err) => {
          console.error(err);
          alert('Erreur lors de la suppression du piège');
        });
    };
    
    
  
    return (
      <div>
        <Navbar></Navbar>
        <div className='map'>
          <MapContainer center={center} zoom={7} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LayersControl position="topright">
              <LayersControl.Overlay checked name="Mes pièges">
                <LayerGroup>
                  {traps.filter(trap => trap.latitude && trap.longitude).map(trap => (
                    <Marker position={[trap.latitude, trap.longitude]} 
                    icon={myIcon} 
                    key={trap.id}>
                      <Popup>
                        - {trap.id} <br />-Ajouté par: {users[trap.userID]} <br />- Captures: {trap.nbCapture} 
                        <button onClick={() => handleAddCapture(trap.id)}>
                            +
                         </button>
                         <br/>
                         <button onClick={() => handleDeleteCapture(trap.id)}>
                            supprimer
                         </button> <br/>
                         {trap.imgUrl && <img src={`${baseURL}/${trap.imgUrl}`} alt="Trap" style={{width: '50px', height: '50px'}} />}
                      </Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
              <LayersControl.Overlay checked name="Tout les pièges">
                <LayerGroup>
                  {allTraps.filter(trap => trap.latitude && trap.longitude).map(trap => (
                    <Marker position={[trap.latitude, trap.longitude]} 
                    icon={greenIcon}
                    key={trap.id}>
                      <Popup>
                        - {trap.id} <br />-Ajouté par: {users[trap.userID]}<br />- Captures: {trap.nbCapture} <br/>
                        {trap.imgUrl && <img src={`${baseURL}/${trap.imgUrl}`} alt="Trap" style={{width: '50px', height: '50px'}} />}
                      </Popup>
                    </Marker>
                  ))}
                </LayerGroup>
              </LayersControl.Overlay>
          </LayersControl>
        </MapContainer>
      </div>
    </div>
  );
}  

export default Map;
