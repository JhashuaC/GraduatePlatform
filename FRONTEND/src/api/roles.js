// src/api/graduates.js
export async function getRoles() {
    try {
      const respuesta = await fetch('http://localhost:3000/api/roles');
      if (!respuesta.ok) throw new Error('Error al traer roles');
      const datos = await respuesta.json();
      return datos;
    } catch (error) {
      console.error('Error:', error);
      return []; // Devuelve vacío si falla
    }
  }

  export async function addRole(role) {
    try {
      const response = await fetch("http://localhost:3000/api/roles", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(role)
      });
  
      if (!response.ok) throw new Error("Error al agregar rol");
      const nuevo = await response.json();
      return nuevo;
    } catch (error) {
      console.error("Error:", error);
      return null;
    }
  }
  
  export async function updateRole(id, updatedData) {
  try {
    const response = await fetch(`http://localhost:3000/api/role/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedData)
    });

    if (!response.ok) throw new Error("Error al actualizar rol");
    const actualizado = await response.json();
    return actualizado;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function deleteRole(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/graduates/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) throw new Error("Error al eliminar role");
    return true; // Confirmación de borrado
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
