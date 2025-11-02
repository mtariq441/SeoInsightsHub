import express from "express";
import { registerRoutes } from "./routes";
import { createServer as createViteServer } from "vite";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 5000;

async function startServer() {
  const httpServer = await registerRoutes(app);

  if (process.env.NODE_ENV === "development") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist/public"));
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
