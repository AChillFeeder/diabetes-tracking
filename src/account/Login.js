import { useState } from "react";
import { useHistory } from "react-router";
import {Link} from 'react-router-dom';
import {ReactSession} from 'react-client-session';

const Login = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null);

    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://192.168.1.150:8000/connect`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({"username": username, "password": password})
        }).then(response => response.json())
        .then((data) => {
            if(data.connected){
                ReactSession.set("username", data["username"]);
                history.push('/home')
            }else{
                setError("unable to login")
            }
            console.log('Login | username: ' + window.username);
        })

        event.target.reset();
    }

    return ( 
        <div className="login">
            {error && <p>error: {error}</p>}
            <form onSubmit={(event) => handleSubmit(event)}>
                <label htmlFor="username">Nom d'utilisateur</label>
                <input type="text" name="username" placeholder="Entrez votre nom d'utilisateur" onChange={(e) => setUsername(e.target.value)} className="form-input"/>
                <label htmlFor="password">Mot de passe</label>
                <input type="password" name="password" placeholder="Enterez votre mot de passe" onChange={(e) => setPassword(e.target.value)} className="form-input"/>
                <button>Se connecter</button>
                <Link to='/register'>Vous n'avez pas de compte?</Link>
            </form>
        </div>
     );
}
 
export default Login;