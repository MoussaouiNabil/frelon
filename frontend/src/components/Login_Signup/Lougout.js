import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutComponent = () => {
  const navigate = useNavigate();

  const logOut = () => {
    window.localStorage.clear();
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', logOut);

    // Nettoyer l'écouteur d'événement lors du démontage du composant
    return () => window.removeEventListener('beforeunload', logOut);
  }, []);  // Un tableau de dépendances vide signifie que cet effet s'exécute une fois lors du montage et que le nettoyage s'exécute lors du démontage

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <div className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: "80vh" }}>
          <h2 className="mb-4">Vous êtes sur le point de vous déconnecter</h2>
          <button onClick={logOut} className="btn btn-primary">
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutComponent;
