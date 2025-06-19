export const getAuthHeaders = () => {
    const token = JSON.parse(localStorage.getItem("auth"))?.token;
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};
