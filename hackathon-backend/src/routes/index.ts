
import express from "express";
import avaliadorRoutes from "./avaliadoresRoutes";
import equipeRoutes from "./equipesRoutes";
import avaliacaoRoutes from "./avaliacoesRoutes";

const appRouter = express();


appRouter.use("/avaliadores", avaliadorRoutes);


appRouter.use("/equipes", equipeRoutes);


appRouter.use("/avaliacoes", avaliacaoRoutes);

export default appRouter;
