import { Router, NextFunction, Request, Response }  from "express";
import URLcontroller from "../controller/URLcontroller";


const shortURL = Router();

shortURL.post("/gererateurl", URLcontroller.shorten);
shortURL.get("/:hash", URLcontroller.redirect);

export default shortURL;