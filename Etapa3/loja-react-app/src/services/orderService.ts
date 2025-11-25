import Constants from "expo-constants";
const { apiUrl } = Constants.expoConfig?.extra || {};

interface AuthUser {
  token: string;
}

export async function getOrders(user: AuthUser): Promise<any> {
  try {
    const response = await fetch(`${apiUrl}/api/orders`, {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Erro ao obter os pedidos");
    }

    return await response.json(); // deve ser { orders: [...] }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateOrderStatus(
  orderId: number,
  status: string,
  user: AuthUser
): Promise<any> {
  try {
    const response = await fetch(`${apiUrl}/api/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify({ status }),
    });

    if (!response.ok) {
      throw new Error("Erro ao atualizar o status do pedido");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}
