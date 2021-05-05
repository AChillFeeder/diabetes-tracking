import {Link, useHistory} from 'react-router-dom';
import {ReactSession} from 'react-client-session';
import {link} from "../usables/baseLink.js";


const Navbar = () => {

    const history = useHistory()
    fetch(`${link}/user/isConnected`, {
        method: 'GET',
        headers: { "Content-Type": "application/json" }
    }).then(response => response.json())
    .then((data) => {
        if(!data.connected){
            history.push('/')
        }
    })

    return ( 
        <div className="nav-bar">
            <ul>
                <Link to='/home'>Acceuil</Link>
                <Link to='/new-day'>Ajouter un nouveau jour</Link>
                <Link to='/stats'>Statistiques</Link>
                <Link to='/settings'>Options</Link>
                <Link to='/' onClick={() => ReactSession.set("username", null)}>Se deconnecter</Link>
            </ul>
        </div>
     );
}
 
export default Navbar;