import { Application } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import router from "./routes.ts"; // Importar las rutas desde el archivo routes.ts

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

const port = parseInt(Deno.args[0]) || 8080;

// Mostrar mensaje en la consola cuando la aplicación esté escuchando
app.addEventListener("listen", ({ port }) => {
  console.log(`Servidor escuchando en ${port}`);
});

await app.listen({ port });
