import { Router } from "https://deno.land/x/oak@v12.1.0/mod.ts";
import { renderFile } from "https://deno.land/x/deno_ejs@v0.3.1/mod.ts";

const router = new Router();

// Configurar ruta para la vista
router.get("/", async (ctx) => {
  // Renderizar la vista EJS con un valor de color predeterminado
  const color = "white";
  const body = await renderFile(`${Deno.cwd()}/vista.ejs`, { color });
  ctx.response.body = body;
});

// Configurar ruta para manejar el envío del formulario
router.post("/", async (ctx) => {
  // Obtener el valor del color del cuerpo de la solicitud POST
  const formData = await ctx.request.body().value;
  const color = formData.get("color") || "white";

  // Renderizar la vista EJS con el valor de color proporcionado
  const body = await renderFile(`${Deno.cwd()}/vista.ejs`, { color });
  ctx.response.body = body;
});

export default router;
