import React, {useState, useEffect} from "react";

import api from 'services/api'

import "./styles.css";

function App() {

  const [ repositories, setRepositories ] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `Novo Title ${Date.now()}`,
      "url": "https://github",
      "techs": ["node", "reaact"]
    })

    const repo = response.data

    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
   await api.delete(`/repositories/${id}`)
   const repositoryIndex = await repositories.findIndex(repository => repository.id === id)
   await repositories.splice(repositoryIndex, 1)
   setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}>
          {repository.title}
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>)}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
