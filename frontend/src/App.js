import React, { useState, useEffect } from 'react';
import api from './services/api';

import Header from './components/Header';

import './App.css';
// import backgroundImage from './assets/background.jpeg';

/**
 * Componente
 * Propriedade = Alguma informação que é repassada de um componente pai para o filho
 * Estado & Imutabilidade
 * 
 * projects.map = percorre os projetos retornando algo
 *  
 */

function App(){
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('projects').then(response => {
           setProjects(response.data);
        }); //buscar GET
    }, [] ); //Array de dependencias

    // useState retorna um array com 2 posições
    //
    // 1.Variável com o seu valor inicial
    // 2. Função para atualizarmos esse valor 
    
   async function handleAddProject(){
       // projects.push(`Novo projeto ${Date.now()}`);

    //    setProjects([...projects, `Novo projeto ${Date.now()}`]);

        const response = await api.post('projects', {
            title: `Novo projeto ${Date.now()}`,
            owner: "Clerton Filho"
        });

        const project = response.data;

        setProjects([...projects, project]);
    }
    
    return (
        <>
            <Header title="Projects"/>

            {/* <img width={300} src={backgroundImage}/> */}
           
            <ul>
                {projects.map(project => <li key={project.id}>{project.title}</li>)} 
            </ul>

            <button type='button' onClick={handleAddProject}>Adicionar projeto</button>
           
        </>
    );
}

export default App;

//Fragment

// <Header /> = <>