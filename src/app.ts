import express, { Request, Response } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import morgan from "morgan";

const port = 3000;
const app = express();

app.use(morgan("combined"));
app.use(expressEjsLayouts);
app.set("layout", "../layouts/full-width");
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
