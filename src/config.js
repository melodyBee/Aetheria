// Set VITE_API_URL in Vercel (or a .env file) to your deployed API address.
// Example: VITE_API_URL=https://aetheria-api.onrender.com
export const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:8765"
).replace(/\/$/, "");
