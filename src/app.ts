import cors from "cors";
import path from "path";
import YAML from "yamljs";
import express from "express";
import swaggerUI from "swagger-ui-express";

import authRoutes from "./routes/auth_routes";
import orderRoutes from "./routes/order_routes";
import productRoutes from "./routes/product_routes";

import { authenticate } from "./middleware/auth_middleware";
import { paginate } from "./middleware/pagination_middleware";

/** App */
const app = express();

/** Middlewares */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** Static files */
app.use(express.static(__dirname + "/public"));

app.get("/", (_req, res) => {
  res.send(__dirname + "/public/index.html");
});

/** Swagger */
const swaggerJsDocs = YAML.load(path.resolve(__dirname, "./docs/openapi.yaml"));
app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

/** Routes */
app.use("/api/auth", authRoutes);
app.use("/api/orders", [authenticate, paginate], orderRoutes);
app.use("/api/products", [authenticate, paginate], productRoutes);

/** Error handlers */
process.on("uncaughtException", (err) => {
  console.error("Excepción no manejada:", err);
});

process.on("unhandledRejection", (err) => {
  console.error("Promesa no manejada:", err);
});

export default app;
