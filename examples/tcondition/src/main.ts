import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import {
  createLanguageModel,
  createJsonTranslator,
  processRequests,
} from "typechat";
import { TCondition } from "./tConditionSchema";

// TODO: use local .env file.
dotenv.config({ path: path.join(__dirname, "../../../.env") });

const model = createLanguageModel(process.env);
const viewSchema = fs.readFileSync(
  path.join(__dirname, "tConditionSchema.ts"),
  "utf8"
);
const translator = createJsonTranslator<TCondition>(model, viewSchema, "TCondition");




// Process requests interactively or from the input file specified on the command line
processRequests("🍕> ", process.argv[2], async (request) => {
  const response = await translator.translate(request);
  if (!response.success) {
    console.log(response.message);
    return;
  }
  const order = response.data;
  if (order.items.some((item) => item.entity === "unknown")) {
    console.log("I didn't understand the following:");
    for (const item of order.items) {
      if (item.entity === "unknown") console.log(item.text);
    }
  }
  console.log(order);
});
