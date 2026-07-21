import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

// Fetching data from a public API
async function getUserData() {
  try {
    const response = await axios.get(`${API}`);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

export default getUserData();