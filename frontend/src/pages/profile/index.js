import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';

export default function Profile() {
    const ong = JSON.parse(localStorage.getItem('ongData'));
    const [incidents, setIncidents] = useState([]);
    const history = useHistory(); 


    useEffect(() => {
        api.get('/profile', {
            headers: {
                Authorization: ong.id
            }
        }).then(resp => setIncidents(resp.data.incidents));
    }, [ong.id]);

    function handleDelete(id) {
        try{
            api.delete(`/incident/${id}`, {
                headers: {
                    Authorization: ong.id
                }
            });

            setIncidents(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert("Erro ao deletar um caso");
        }
    }

    function LogOut() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be the Hero"/>

                <span>Bem vinda, {ong.name}</span>

                <Link className="button" to="/incidents/new">cadastrar novo caso</Link>
            
                <button onClick={LogOut}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>

            <ul>
                <li>
                    <strong>CASO:</strong>
                    <p>Caso teste</p>

                    <strong>Descrição:</strong>
                    <p>Descrição teste</p>

                    <strong>Valor:</strong>
                    <p>R$ 120,00</p>

                    <button type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>

                {incidents.map(incident => (
                    <li key={incident.id}>
                        <strong>Caso:</strong>
                        <p>{incident.title}</p>

                        <strong>Descrição:</strong>
                        <p>{incident.description}</p>

                        <strong>Valor:</strong>
                        <p>{Intl.NumberFormat('pt-br', {
                            style: 'currency',
                            currency: 'BRL'
                        }).format(incident.value)}</p>

                        <button 
                            onClick={() => handleDelete(incident.id)} 
                            type="button">
                            
                            <FiTrash2 size={20} color="#a8a8b3"/>
                        </button>
                    </li>
                ))}
                
            </ul>

        </div>
    );
}