/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
}

// next.config.js
module.exports = {
  nextConfig,
  publicRuntimeConfig: {
    // Aquí puedes agregar las variables de entorno que quieres acceder en el cliente
    BACKEND_URL: process.env.BACKEND_URL,
  },
};


// module.exports = nextConfig
