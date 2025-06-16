export async function getCareers() {
    try {
      const response = await fetch("http://localhost:3000/api/careers");
      if (!response.ok) throw new Error("Error al obtener carreras");
      return await response.json();
    } catch (error) {
      console.error("Error:", error);
      return [];
    }
  }
  