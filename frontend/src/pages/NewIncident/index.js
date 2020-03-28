import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css';

export default function NewIncident() {
    const [state, setState] = useState({
        title: "",
        description: "",
        value: ""
    });
    
    function handleChange(e) {
        const {name, value} = e.target;
        setState({ ...state, [name]: value });
    
        
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const {id} = JSON.parse(localStorage.getItem('ongData'));
        alert(id);

        try{
            await api.post('/incident', state,{
                headers: { authorization: id }
            });

            Object.keys(state).forEach(item => {
                setState({ [item]: "" });
            });    


        }catch(err){
            alert("Erro ao cadastar o caso");
        }
        
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"/>

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o seu caso detalhadamente para encontrar um herói
                        para resolver isso
                    </p>

                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#E02041"/>
                        voltar para home
                    </Link>
                </section>

                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder="Título do caso"
                        name="title"
                        value={state.title}
                        onChange={handleChange}
                    />

                    <textarea 
                        placeholder="Descrição"
                        name="description"
                        value={state.description}
                        onChange={handleChange}
                    />

                    <input 
                        placeholder="Valor em reais"
                        name="value"
                        value={state.value}
                        onChange={handleChange}
                    />
                    
                    <button 
                        className="button" 
                        type="submit">
                            Cadastrar
                    </button>
                </form>
            </div>
        </div>
    );
}