import React, {useState} from 'react';
import { FiLogIn } from 'react-icons/fi';
import {Link, useHistory} from 'react-router-dom';
import logoImg from '../../assets/logo.svg';
import heroesImg from '../../assets/heroes.png';
import api from '../../services/api';
import './style.css';

export default function Logon() {
    const [id, setId] = useState("");
    const history = useHistory();

    async function handleSubmit(e) {
        e.preventDefault();

        
        try{
            const resp = await api.post('/session', {ong_id: id});
            localStorage.setItem('ongData', JSON.stringify(resp.data.ong));
            history.push('/profile');
        }catch(err) {
            alert("Erro no Login");
        }
        
    }
    
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be the hero"/>

                <form onSubmit={handleSubmit}>
                    <h1>Faça seu Logon</h1>

                    <input  type="text" 
                            placeholder="Seu ID"
                            value={id}
                            onChange = {e => setId(e.target.value)}
                        />
                    
                    <button type="submit" className="button">Entrar</button>
                    
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                
                </form>
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}