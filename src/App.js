import React from "react";

import api from './services/api'

import "./styles.css";
import { useState, useEffect } from 'react';

function App() {

  const [repositories, setRepositories] = useState([])

  // useEffect(() => {

  //   api.get('repositories').then(repo => setRepositories(repo.data))

  // })
  useEffect(() => {
    api.get('repositories')
      .then(repo => setRepositories(repo.data))
  })


  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Desafio teste ${Date.now()}`,
      url: `https://github.com/juliomchado`,
      techs: 'Teste 1, Teste 2'
    })


    setRepositories([...repositories, response.data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)

    const filterRepositories = repositories.filter(repo => repo.id !== id)

    setRepositories(filterRepositories)

  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
          </button>
          </li>))}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
