import app from "./app";
import pool from "./database/dbConfig";

const PORT = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await pool.connect();
    console.log("Connectado ao banco :)");
    app.listen(PORT, () => {
      console.log(`O servidor está rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error("Problema ao connectar ao banco :( ", error);
  }
};

startServer();
