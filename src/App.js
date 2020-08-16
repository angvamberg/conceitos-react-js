import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getAllRepositories(setRepositories);
  }, []);

  async function handleAddRepository() {
    const newRepository = {
      title: `New Repository - ${Date.now()}`,
      url: `${Date.now()}`,
      techs: [`${Date.now()}`, `${Date.now()}`]
    };

    const response = await api.post('repositories', newRepository);
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    setRepositories(repositories.filter(repository => repository.id !== id));
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
        </li>
      )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

function getAllRepositories(setRepositories) {
  api.get('repositories').then(response => setRepositories(response.data));
}

export default App;
