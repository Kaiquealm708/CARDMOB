import React from "react";

const Contato = ({ nome, telefone, onDelete, onEdit }) => {
  return (
    <div className="">
      <p><strong>Nome:</strong> {nome}</p>
      <p><strong>Telefone:</strong> {telefone}</p>
      <div>
      <button onClick={onDelete} className="bg-red-500 text-white p-1 rounded">Excluir</button>
      <button onClick={onEdit} className="editing">Editar</button>
      </div>
    </div>
  )
}

export default Contato;