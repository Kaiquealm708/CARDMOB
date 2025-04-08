import React, { useState } from 'react'
import ProductCard from './ProductCard'

const ProductList = () => {
  const [produtos, setProdutos] = useState([]);
  const [newNome, setnewNome] = useState("");
  const [newPreco, setnewPreco] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  const adicionarprodutos = () => {
    if (newNome && newPreco) {
      setProdutos([...produtos, { id: Date.now(), nomeProduto: newNome, preco: newPreco }]);
      setnewNome("");
      setnewPreco("");
    }
  };

  const removerprodutos = (id) => {
    setProdutos(produtos.filter(produto => produto.id !== id));
  };

   const iniciarEdicao = (id) => {
    const produto = produtos.find(c => c.id === id);
    setnewNome(produto.nomeProduto);
    setnewPreco(produto.preco);
    setEditandoId(id);
  };
  // função cancelar
  const cancelarEdicao = () => {
    setnewNome("");
    setnewPreco("");
    setEditandoId(null);
  };

  // função salvar
  const salvarEdicao = () => {
    setProdutos(produtos.map(produto => 
      produto.id === editandoId ? { ...produto, nomeProduto: newNome, preco: newPreco } : produto
    ));
    setnewNome("");
    setnewPreco("");
    setEditandoId(null);
  };
  
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Lista de Produtos</h2>
      <input 
        type="text" 
        placeholder="Nome" 
        value={newNome} 
        onChange={(e) => setnewNome(e.target.value)} 
        className="border p-1 m-1" 
      />
      <input 
        type="text" 
        placeholder="Preço" 
        value={newPreco} 
        onChange={(e) => setnewPreco(e.target.value)} 
        className="border p-1 m-1" 
      />
      {editandoId ? (
        <>
          <button onClick={salvarEdicao} className="save">Salvar</button>
          <button onClick={cancelarEdicao} className="cancel">Cancelar</button>
        </>
      ) : (
        <button onClick={adicionarprodutos} className="bg-blue-500 text-white p-1 rounded">Adicionar Produto</button>
      )}

      <div>
        {produtos.map(produto => (
          <ProductCard 
            key={produto.id} 
            nomeProduto={produto.nomeProduto} 
            preco={produto.preco} 
            onDelete={() => removerprodutos(produto.id)}
            onEdit={() => iniciarEdicao(produto.id)}
          />
        ))}
      </div>
    </div>
  );
};


export default ProductList;