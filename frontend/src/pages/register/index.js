import React, {useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import './style.css'

export default function Register(){
    // const [name, setName] = useState("");
    // const [whatsapp, setWhatsapp] = useState("");
    // const [email, setEmail] = useState("");
    // const [city, setCity] = useState("");
    // const [state, setState] = useState("");
    const history = useHistory();
    const [state, setState] = useState({
        name: "",
        whatsapp: "",
        email: "",
        city: "",
        uf: ""
    });

    async function handleRegister(e) {
        e.preventDefault();

        try{
            const res = await api.post('ongs', state);
            alert(`SEU ID: ${res.data.id}`);
            history.push("/");
        }catch(erro) {
            alert(`Erro no cadastro`);
        }

    }

    function handleChange(e) {
        const {name, value} = e.target;

        setState({
            ...state,
            [name]: value
        });
    }
    
    return(
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="logo"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem 
                    os casos de sua ONG.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041"/>
                        voltar
                    </Link>
                </section>

                <form onSubmit={handleRegister}>

                    <input  placeholder="Nome da ONG" 
                            value={state.name} 
                            onChange={handleChange} 
                            name="name"/>

                    <input  type="email" 
                            placeholder="Email"
                            value={state.email}
                            onChange={handleChange}
                            name="email"/>

                    <input  placeholder="WhatsApp"
                            value={state.whatsapp}
                            onChange={handleChange}
                            name="whatsapp"/>

                    <div className="input-group">
                        <input  placeholder="Cidade"
                                name="city"
                                onChange={handleChange}
                                value={state.city}/>

                        <input  placeholder="UF" 
                                style={{ width: 80 }}
                                onChange={handleChange}
                                value={state.uf}
                                name="uf"/>
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}