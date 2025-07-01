import React, { useEffect, useState } from 'react';
import './style.css';

function App() {
    const [tarantulas, setTarantulas] = useState([]);
    const [newName, setNewName] = useState('');
    const [newSpecies, setNewSpecies] = useState('');
    const [newVenomStrength, setNewVenomStrength] = useState(false);
    const [editId, setEditId] = useState(null);
    const [editName, setEditName] = useState('');
    const [editSpecies, setEditSpecies] = useState('');
    const [editVenomStrength, setEditVenomStrength] = useState(false);

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

    function StartEdit(t) {
        setEditId(t.id);
        setEditName(t.name);
        setEditSpecies(t.species);
        setEditVenomStrength(t.hasStrongVenom);
    }

    function SaveEdit() {
        fetch(`/api/tarantulas/${editId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: editId, name: editName, species: editSpecies, hasStrongVenom: editVenomStrength })
        })
            .then(() => {
                setEditId(null);
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
      <table id="TarantulaList">
              <thead>
              <tr>
                  <th>Lp.</th>
                  <th>Imię</th>
                  <th>Gatunek</th>
                  <th>Silnie jadowity</th>
                      <th>Opcje</th>
              </tr>
              </thead>
              <tbody>
                  {tarantulas.map((t, index) => (

                   <tr key={t.id}>
                        {editId == t.id ? (
                        <>
                        <td>{index + 1}</td>
                        <td><input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                                  />
                        </td>
                        <td>
                        <input
                            type="text"
                            value={editSpecies}
                            onChange={(e) => setEditSpecies(e.target.value)}
                                      />
                        </td>
                        <td>
                        <input
                            type="checkbox"
                            checked={editVenomStrength}
                            onChange={(e) => setEditVenomStrength(e.target.checked)}
                                      />
                        </td>
                        <td>
                            <button onClick={SaveEdit} style={{ marginLeft: '10px' }}>Zapisz</button>
                            <button onClick={() => setEditId(null)} style={{ marginLeft: '5px' }}>Anuluj</button>
                        </td>
                    </>) : (
                    <>
                        <td>{index + 1}</td>
                        <td>{t.name}</td>
                        <td>{t.species}</td>
                        <td>{t.hasStrongVenom ? 'Tak' : 'Nie'}</td>
                        <td>
                            <button onClick={() => StartEdit(t)} style={{ marginLeft: '10px' }}>Edytuj</button>
                            <button class="delete-button" onClick={() => DeleteTarantula(t.id)} style={{ marginLeft: '5px' }}>Usuń</button>
                        </td>
                    </>)}
            </tr>
        ))}
              </tbody>
      </table>
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
