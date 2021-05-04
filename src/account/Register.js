import {Link} from 'react-router-dom';
import { useState } from "react";
import { useHistory } from "react-router";
import {link} from "../usables/baseLink.js";

const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [error, setError] = useState(null);

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`${link}/user/register`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"username": username, "password": password, "name": name})
        }).then(response => response.json())
        .then((data) => {
            if(data.registered){
                history.push('/')
            }else{
                setError(data.message)
            }
        })


        event.target.reset();
    }

    return ( 
        <div className="register">
            <form onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="username">Nom d'utilisateur:</label>
                <input type="text" name="username" placeholder="Entrez votre nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} className="form-input"/>
                <label htmlFor="password">Mot de passe:</label>
                <input type="password" name="password" placeholder="Entrez votre mot de passe" onChange={(e) => setPassword(e.target.value)} className="form-input"/>
                <label htmlFor="name">Votre nom:</label>
                <input type="text" name="name" placeholder="Entrez votre nom" onChange={(e) => setName(e.target.value)} className="form-input"/>
                <button>Créer votre compte</button>
                <Link to='/'>Vous avez déja un compte?</Link>
                {error && <p class="error">Erreur: {error}</p>}
            </form>
        </div>
     );
}
 
export default Register;