import React, { useState,  useEffect } from 'react';
import axios from 'axios';
import TrapList from './trapList';
import Navbar from '../navbar_login/navbar';
import 'bootstrap/dist/css/bootstrap.min.css'
import "./Manage_Traps.css"

const TrapPage = () => {
    const [traps, setTraps] = useState([]);
  
    useEffect(() => {
      fetchTraps();
    }, []);
    const baseURL = "https://192.168.2.208:3001";
    const fetchTraps = () => {
      axios.get(`${baseURL}/api/trap/mytraps`, {
        headers : {
          "Content-Type": "application/json",
          "Authorization" : "Bearer " + window.localStorage.getItem("token")
        }
      })
        .then(res => {
          setTraps(res.data);
        })
        .catch(err => {
          console.error(err);
          alert('Erreur lors de l\'affichage des pièges');
        });
    };
    

    const updateTrap = async (trapId, newTrapInfo) => {
      try {
        const response = await axios.put(`${baseURL}/api/trap/${trapId}`, newTrapInfo, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + window.localStorage.getItem("token")
          }
        });
  
        if (response.status === 200) {
          console.log('Modification prise en compte');
          fetchTraps();
        }
      } catch (error) {
        console.error('Erreur lors de la modification:', error);
      }
    };

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
        <div className="App">
            <Navbar></Navbar>
        <div className="traplist-wrapper">
        
             <TrapList traps={traps} updateTrap={updateTrap} deleteTrap={handleDeleteCapture}/>
            
        </div>
        </div>
     </div>
    );
  };
  
  export default TrapPage;