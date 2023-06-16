import React, { Component} from 'react'
import Navbar from '../navbar_login/navbar';
import '../../App.css'
import { AuthContext } from './AuthContext';

export default class Login extends Component {

  constructor(props) {
    super (props)
    this.state ={
      email:"",
      password:"",
      showError: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  handleSubmit(e){
    e.preventDefault();
const {email, password, showError} = this.state;
const credentials = {email, password};
const baseURL = "https://192.168.2.208:3001";
const req = {
  method: "POST",
  crossDomain: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*"
  },
  body: JSON.stringify(credentials)
};

//console.log(req);

fetch(`${baseURL}/api/auth/login`, req)
    .then((res)=>res.json())
    .then((data)=> {
      console.log(data, "utilisateur enregistré");
      if(data.token) {
        window.localStorage.setItem("token",data.token);
        const { setLoginStatus } = this.context;
        setLoginStatus(true);
        window.location.href= './';
      }
      if(data.message==="Paire login/mot de passe incorrecte") {
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
        <h3>Connexion</h3>
        {showError && <div className="alert alert-danger" role="alert">Paire email/mot de passe incorrecte</div>}

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
          <label>Mot de passe</label>
          <input
            type="password"
            className="form-control"
            placeholder="Mot de passe"
            onChange={e=>this.setState({password:e.target.value})}
          />
        </div>

        <div className="d-grid">
          <button onClick={this.handleSubmit} type="submit" className="btn btn-primary">
            Appliquer
          </button>
        </div>
      </form>
      </div>
    </div>
      </div>
    )
  }
}
Login.contextType = AuthContext;