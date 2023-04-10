import session from 'koa-session';

// Configura la clave secreta para firmar las cookies de sesión
const keys = ['clave-secreta'];

// Opciones de configuración para el middleware de sesiones
const sessionConfig = {
  key: 'mi-app:sess', // Nombre de la cookie de sesión
  maxAge: 3600000, // Tiempo de vida de la cookie de sesión en milisegundos
};

// Configura y exporta el middleware de sesiones
export const sessionMiddleware = session(sessionConfig, keys);
