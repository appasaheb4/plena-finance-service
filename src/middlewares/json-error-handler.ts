/* eslint-disable */
import { Request, Response } from "express";

export const jsonErrorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: () => void
) => {
  if (error) {
    res.status(422).jsonp({ message: "Invalid json" });
    res.end();
  } else next();
};
