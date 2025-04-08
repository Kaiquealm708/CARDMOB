import  React from 'react'

const ProductCard = ({ nomeProduto, preco, onDelete, onEdit, addCar }) => {
  return (
    <div className=''>
      <p><strong>Nome:</strong> {nomeProduto}</p>
      <p><strong>Preço:</strong> {preco}</p>
      <div>
        <button onClick={onDelete} className="bg-red-500 text-white p-1 rounded">Remover</button>
        <button onClick={onEdit} className="editing">Editar</button>
        <button onClick={addCar} className="editing">Adicionar ao carrinho</button>
      </div>
    </div>
  )
}

export default ProductCard;