import React, { useState } from 'react';

import Header from './components/Header';

/**
 * Componente
 * Propriedade = Alguma informação que é repassada de um componente pai para o filho
 * Estado & Imutabilidade
 * 
 * projects.map = percorre os projetos retornando algo
 *  
 */

function App(){
    const [projects, setProjects] = useState(['Desenvolvimento de app', 'Front-end web']);

    // useState retorna um array com 2 posições
    //
    // 1.Variável com o seu valor inicial
    // 2. Função para atualizarmos esse valor 
    
    function handleAddProject(){
       // projects.push(`Novo projeto ${Date.now()}`);

       setProjects([...projects, `Novo projeto ${Date.now()}`]);

        console.log(projects);
    }
    
    return (
        <>
            <Header title="Projects"/>
           
            <ul>
                {projects.map(project => <li key={project}>{project}</li>)} 
            </ul>

            <button type='button' onClick={handleAddProject}>Adicionar projeto</button>
           
        </>
    );
}

export default App;

//Fragment

// <Header /> = <>