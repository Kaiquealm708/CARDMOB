import React, { useState } from 'react';
import Contato from './Contato'
import './style.css'

const ListaContatos = () => {
  const [contatos, setContatos] = useState([
  ]);

  const [novoNome, setNovoNome] = useState("");
  const [novoTelefone, setNovoTelefone] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const adicionarContato = () => {
    if (novoNome && novoTelefone) {
      setContatos([...contatos, { id: Date.now(), nome: novoNome, telefone: novoTelefone }]);
      setNovoNome("");
      setNovoTelefone("");
    }
  };

  const removerContato = (id) => {
    setContatos(contatos.filter(contato => contato.id !== id));
  };

   const iniciarEdicao = (id) => {
    const contato = contatos.find(c => c.id === id);
    setNovoNome(contato.nome);
    setNovoTelefone(contato.telefone);
    setEditandoId(id);
  };
  // função cancelar
  const cancelarEdicao = () => {
    setNovoNome("");
    setNovoTelefone("");
    setEditandoId(null);
  };

  // função salvar
  const salvarEdicao = () => {
    setContatos(contatos.map(contato => 
      contato.id === editandoId ? { ...contato, nome: novoNome, telefone: novoTelefone } : contato
    ));
    setNovoNome("");
    setNovoTelefone("");
    setEditandoId(null);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Lista de Contatos</h2>
      <input 
        type="text" 
        placeholder="Nome" 
        value={novoNome} 
        onChange={(e) => setNovoNome(e.target.value)} 
        className="border p-1 m-1" 
      />
      <input 
        type="text" 
        placeholder="Telefone" 
        value={novoTelefone} 
        onChange={(e) => setNovoTelefone(e.target.value)} 
        className="border p-1 m-1" 
      />
      {editandoId ? (
        <>
          <button onClick={salvarEdicao} className="save">Salvar</button>
          <button onClick={cancelarEdicao} className="cancel">Cancelar</button>
        </>
      ) : (
        <button onClick={adicionarContato} className="bg-blue-500 text-white p-1 rounded">Adicionar</button>
      )}

      <div>
        {contatos.map(contato => (
          <Contato 
            key={contato.id} 
            nome={contato.nome} 
            telefone={contato.telefone} 
            onDelete={() => removerContato(contato.id)}
            onEdit={() => iniciarEdicao(contato.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ListaContatos;