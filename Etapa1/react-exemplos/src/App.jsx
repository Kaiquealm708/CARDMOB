import { useState, useEffect } from 'react'
import './App.css'
import Counter from './components/Counter'
import Photo from './components/photo'
import Album from './components/album'
import TodoList from './components/TodoList'

function App() {
  const [count, setCount] = useState(0);
  const[photos, setPhotos] = useState([]);
  const [albumId, setAlbumId] = useState(1)

  const fetchPhotos = async () => {
    try {
      const url = 'https://jsonplaceholder.typicode.com/albums/1/photos';
      const response = await fetch(url); // Por padrão executa um request do tipo GET
      if (response.status === 200) {
        const data = await response.json();
       // console.log(data)
        const updatedPhotos = data.map((photo) => ({
          ...photo,
          thumbnailUrl: `https://picsum.photos/150?random=${photo.id}`
        }))

        setPhotos(updatedPhotos);
      }

    } catch (error) {
      console.error('Erro ao buscar fotos', error);
    }
  }

  useEffect(() => {
    fetchPhotos();
  }, []);

  //arrow function
  //

  return (
    <>
      <TodoList name="CARDMOB" />
      <Counter title="Contando..." /> 
      <Counter initial={100} />
      {/* <article>
        <h1>Album da API</h1>
        {photos.map( (photo) => (
          // <article key={photo.id}>
          //   <h2>ID #{photo.id} {photo.title}</h2>
          //   <img src={photo.thumbnailUrl} alt={photo.title} />
          // </article>
        <Photo photo={photo}/>
      ))}
      </article> */} 
      <div>
        <button onClick={() => setAlbumId(1)}>album #1</button>
        <button onClick={() => setAlbumId(2)}>album #2</button>
        <button onClick={() => setAlbumId(3)}>album #3</button>
        <button onClick={() => setAlbumId(4)}>album #4</button>
      </div>
      <Album albumId={albumId}/>
    </>
  );
}

export default App
