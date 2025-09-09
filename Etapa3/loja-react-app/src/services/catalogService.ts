const API_URL = 'http://10.81.205.17:5000';

export async function getCatalog(): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/products`);
    const data = await response.json();
    console.log(data);
    return Promise.resolve(data.catalog);
  } 
  catch (error) {
    console.error(error);
    return Promise.reject('Erro ao obter produtos');
  }
}