
import { check, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import { AvaliadorModel } from "../models/avaliadoresModel";
import { EquipeModel } from "../models/equipesModel";

const validateAvaliador = [
  check("nome").isString().notEmpty(),
  check("login").isString().notEmpty(),
  check("senha").isLength({ min: 6 }),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];


const validateEquipe = [
  check("nome").isString().notEmpty(),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

 
 const validateAvaliacao = [
   check("avaliador_id").isInt().notEmpty(),
   check("equipe_id").isInt().notEmpty(),
   check("notas").isObject(),
   (req: Request, res: Response, next: NextFunction) => {
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
     }
     next();
   },
 ];

export { validateAvaliador, validateEquipe, validateAvaliacao };