import { useState } from "react";
import { useHistory } from "react-router";
import {Link} from 'react-router-dom';
import {link} from "../usables/baseLink.js";

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${link}/login`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"username": username, "password": password})
        }).then(response => response.json())
        .then((data) => {
            console.log(data)
            if(data.success){
                history.push('/home')
            }else{
                setError("Nom d'utilisateur ou mot de passe incorrect.")
            }
        })

        event.target.reset();
    }

    return ( 
        <div className="login">
            <form onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="username">Nom d'utilisateur</label>
                <input type="text" name="username" placeholder="Entrez votre nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} className="form-input"/>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" placeholder="Enterez votre mot de passe" onChange={(e) => setPassword(e.target.value)} className="form-input"/>
                <button>Se connecter</button>
                <Link to='/register'>Vous n'avez pas de compte?</Link>
                {error && <p class="error">Erreur: {error}</p>}
            </form>
        </div>
     );
}
 
export default Login;