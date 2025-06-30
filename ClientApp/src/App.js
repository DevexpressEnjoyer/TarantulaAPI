import React, { useEffect, useState } from 'react';

function App() {
    const [tarantulas, setTarantulas] = useState([]);
    const [newName, setNewName] = useState('');
    const [newSpecies, setNewSpecies] = useState('');
    const [newVenomStrength, setNewVenomStrength] = useState(false);

    function LoadTarantulas() {
        fetch('/api/tarantulas')
            .then(res => res.json())
            .then(data => setTarantulas(data));
    }
  useEffect(() => {
      LoadTarantulas();
  }, []);

    function AddTarantula(t) {
      t.preventDefault();
        fetch('/api/tarantulas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: newName, species: newSpecies, hasStrongVenom: newVenomStrength })
      })
          .then(res => res.json())
          .then(() => {
              setNewName('');
              setNewSpecies('');
              setNewVenomStrength(false);
              LoadTarantulas();
          })
    }

    function DeleteTarantula(id) {
        fetch(`/api/tarantulas/${id}`, {
            method: 'DELETE'
        })
            .then(() => {
                LoadTarantulas();
            })
    }

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Lista Ptaszników</h1>
      <ul>
        {tarantulas.map(t => (
          <li key={t.id}>
            {t.name} ({t.species})
            <button style={{ marginLeft: '10px' }}>Edytuj</button>
            <button style={{ marginLeft: '5px' }} onClick={() => DeleteTarantula(t.id)}>Usuń</button>
          </li>
        ))}
      </ul>
      <form onSubmit={AddTarantula}>
        Imie: <input type="text" placeholder="Name" value={newName} onChange={(t) => setNewName(t.target.value)} />
        Gatunek: <input type="text" placeholder="Species" value={newSpecies} onChange={(t) => setNewSpecies(t.target.value)} />
        SilnyJad?: <input type="checkbox" checked={newVenomStrength} onChange={(t) => setNewVenomStrength(t.target.checked)} />
        <button style={{ marginTop: '20px' }}>Dodaj nowego ptasznika</button>
      </form>
    </div>
  );
}

export default App;
