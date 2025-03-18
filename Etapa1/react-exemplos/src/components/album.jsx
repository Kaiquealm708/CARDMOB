import react, { useState, useEffect } from "react";

import '../album.css';

import Photo from "./photo"

const Album = ({ albumId }) => {
    const[photos, setPhotos] = useState([]);

    const fetchPhotos = async (albumId) => {
        try {
          const url = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos` ;
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
        fetchPhotos(albumId);
      }, [albumId]);
 
      return (
        <div className="album-container">
            <h1 className="album-title">album #</h1>
            <div className="grid-container">
                { photos.length > 0 ? (
                        photos.map((photo) => (
                            <div key={photo.id} className="album-item">
                                <Photo photo={photo}/>
                            </div>
                        ) )
                ) : (
                    <p>error</p>
                ) }

            </div>
        </div>
      )
}
export default Album;