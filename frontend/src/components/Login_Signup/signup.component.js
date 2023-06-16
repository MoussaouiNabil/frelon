import React, { Component } from 'react'
import Navbar from '../navbar_login/navbar';
import '../../App.css'
import 'react-phone-input-2/lib/style.css'


export default class SignUp extends Component {
  constructor(props) {
    super (props)
    this.state ={
      fname:"",
      lname:"",
      email:"",
      password:"",
      countryCode: "",
      number:"",
      postal:"",
      adress:"",
      showError: false,
      
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e){
    e.preventDefault();
    const{fname,lname,email,password,countryCode,number,postal,adress, showError} = this.state;
    console.log(fname,lname,email,password,countryCode,number,postal,adress);
    const baseURL = "https://192.168.2.208:3001";
    const req = {
      method:"POST",
      crossDomain:true,
      headers:{
        "Content-Type":"application/json",
        Accept:"application/json",
        "Access-Control-Allow-Origin":"*",
      },
      body:JSON.stringify({
        fname: fname,
        email: email,
        lname: lname,
        password: password,
        number: countryCode + number,
        postal: postal,
        adress: adress,
      }),
    };
    //console.log(req);
    fetch(`${baseURL}/api/auth/signup`,req)
    .then((res)=>res.json())
    .then((data)=> {
     //alert(data.message);
      //console.log(data);
    if(data.message === "Utilisateur créé !"){
      window.location.href= './sign-in';
    }
    else {
      this.setState({showError: true});
    }
      
    });
  }

  render() {
    const { showError } = this.state;
    return (
      <div>
      <Navbar></Navbar>
      <div className="auth-wrapper">
        <div className="auth-inner"> 
      <form onSubmit={this.handleSubmit}>
        <h3>Inscription</h3>
        {showError && <div className="alert alert-danger" role="alert">Erreur de saisie dans l'un des champs</div>}


        <div className="mb-3">
          <label>Prénom</label>
          <input
            type="text"
            className="form-control"
            placeholder="Prénom"
            onChange={e=>this.setState({fname:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Nom</label>
          <input type="text" className="form-control" placeholder="Nom de famille" 
          onChange={(e)=>this.setState({lname:e.target.value})}/>
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            type="email"
            className="form-control"
            placeholder="Entrez votre email"
            onChange={e=>this.setState({email:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Téléphone</label>
          <div className="input-group">
            <select
              className="form-select"
              onChange={(e) => this.setState({ countryCode: e.target.value })}
            >
              <option value="">Indicatif</option>
              <option value="+33">+33 (France)</option>
            </select>
          <input
            type="text"
            className="form-control"
            placeholder="Entrez votre numéro"
            onChange={e=>this.setState({number:e.target.value})}
            maxLength={9}
          />
        </div>
        </div>

        <div className="mb-3">
          <label>Code Postal</label>
          <input
            type="text"
            className="form-control"
            placeholder="Entrez votre code postal"
            onChange={e=>this.setState({postal:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Nom de rue</label>
          <input
            type="text"
            className="form-control"
            placeholder="Entrez le nom de votre rue"
            onChange={e=>this.setState({adress:e.target.value})}
          />
        </div>

        <div className="mb-3">
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            placeholder="Entrez le mot de passe"
            onChange={e=>this.setState({password:e.target.value})}
          />
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            S'inscrire
          </button>
        </div>
        <p className="forgot-password text-right">
          <a href="/sign-in">Déjà inscrit ?</a>
        </p>
      </form>
      </div>
    </div>
      </div>
    )
  }
}