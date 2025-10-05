import express, { Request, Response } from "express";
import expressEjsLayouts from "express-ejs-layouts";
import morgan from "morgan";
import { default as apiRouter } from "./routers/api";
import { NUM_PREROLLS, preroll, PrerollResult } from "./constants";
import path from "path";

const { PORT = 3000} = process.env;
const app = express();

app.use(morgan("combined"));
app.use(expressEjsLayouts);
app.set("layout", "../layouts/full-width");
app.set("view engine", "ejs");

// Set up routers
app.use("/api", apiRouter);
app.use(express.static(path.join(__dirname, "../public")));

// Initialize paths
app.get("/", (req: Request, res: Response) => {
  res.render("index", {
    default_num_prerolls: NUM_PREROLLS,
    quickAdds: ["1d4", "1d6", "1d8", "1d10", "1d12", "1d20", "1d100"],
  });
});

/**
 * View renderer
 */
app.get("/preroll/:rolls", (req: Request, res: Response) => {
  const rolls = req.params.rolls;
  const num_rolls = req.query.number ?? NUM_PREROLLS;
  if (rolls == undefined) {
    // Error here
    res.status(400).json({ message: "bad query" });
    return;
  }
  const result: PrerollResult[] = rolls
    .split("+")
    .map<PrerollResult>((item: string) => {
      return {
        die: item,
        rolls: preroll(item),
      };
    });
  res.render("roll_result", { roll_result: result });
});

app.listen(PORT, () => {
  console.log(`ttrpg-preroll-calculator listening on port ${PORT}`);
});
