const express = require('express');
const { uuid, isUuid } = require('uuidv4'); //Id único e universal

const app = express();

app.use(express.json());

/**
 * Métodos HTTP:
 * Get: Buscar informações do back-end
 * POST: Criar uma informação no back-end
 * PUT/PATCH: Alterar uma informação no back-end
 * DELETE: Deletar uma informação no back-end
 */

 /** 
  * Query Params: Filtros e paginação
  * Route Params: Identificar recursos (Atualizar/Deletar)
  * Request Body: Conteúdo na hora de criar ou editar um recurso
 
 */

/**
 * Middleware: 
 * 
 * Interceptador de requisições que interrompe totalmente a requisição ou alterar dados da requisição
 * 
 */


const projects = [];

function logRequests(request, response, next){
    const { method, url } = request;
    
    const logLabel = `[${method.toUpperCase()}] ${url}`;
    console.log('1');
    console.time(logLabel)
     next();  // Próximo middleware

    console.log('2');
    console.timeEnd(logLabel);
    
    //aqui (passo 3)  
}

function validateProjectId(request, response, next){
    const { id } = request.params;

    if(!isUuid(id)){
        return response.status(400).json({ error: 'Invalid project ID.'});
    }

    return next();
}

// 1 - 2 - 3
app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
    console.log('3');
    
    const { title } = request.query;

    const results = title
        ? projects.filter(project => project.title.includes(title))
        : projects;

    return response.json(results);
});

app.post('/projects', (request, response) => {
    const {title, owner} = request.body;

    const project = {id: uuid(), title, owner};

    projects.push(project) 

    return response.json(project);
});

app.put('/projects/:id',  (request, response) => {
    const { id } = request.params;
    const {title, owner} = request.body;

    const projectIndex = projects.findIndex(project => project.id === id); //Procurando informação dentro de um array (ID)

    if(projectIndex < 0 ){
        return response.status(400).json({error: 'Project not found'})
    }

    const project = {
        id,
        title,
        owner
    }; 

    projects[projectIndex] = project

    return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
    const { id } = request.params;

    const projectIndex = projects.findIndex(project => project.id === id); //Procurando informação dentro de um array (ID)

    if(projectIndex < 0 ){
        return response.status(400).json({error: 'Project not found'})
    }
    
    projects.splice(projectIndex, 1); //splice = tira as informações de dentro de um array

    return response.status(204).send();
});

app.listen(3333, () => { 
    console.log('Back-end started');
});
