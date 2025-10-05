import { Request, Response, Router } from "express";
import { NUM_PREROLLS, preroll, PrerollResult } from "../constants";

const router = Router();

function isValidSpec(value: string): boolean {
  return value.match(/\d{1,2}d\d{1,3}/) != null;
}

/**
 * View renderer
 */
router.get("/preroll", (req: Request, res: Response) => {
  const rolls = req.query.rolls?.toString().trim();
  const number_to_preroll = req.query.number?.toString().trim();
  if (rolls == undefined) {
    // Error here
    res.status(400).json({ message: "bad query" });
    return;
  }
  const result: PrerollResult[] = rolls
    .split(/[\+\s]/)
    .filter(isValidSpec)
    .map<PrerollResult>((item: string) => {
      return {
        die: item,
        rolls: preroll(
          item,
          number_to_preroll != undefined
            ? parseInt(number_to_preroll)
            : NUM_PREROLLS
        ),
      };
    });
  res.render("roll_result", { roll_result: result });
});

export default router;
