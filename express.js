import "dotenv/config";
import statsCard from "./api/index.js";
import repoCard from "./api/pin.js";
import langCard from "./api/top-langs.js";
import wakatimeCard from "./api/wakatime.js";
import gistCard from "./api/gist.js";
import express from "express";
import { inject } from "@vercel/analytics";

const app = express();
const router = express.Router();

// Serve static files from public directory
app.use(express.static("public"));

// Inject Vercel Analytics
inject({ mode: process.env.NODE_ENV || "development" });

router.get("/", statsCard);
router.get("/pin", repoCard);
router.get("/top-langs", langCard);
router.get("/wakatime", wakatimeCard);
router.get("/gist", gistCard);

app.use("/api", router);

const port = process.env.PORT || process.env.port || 9000;
app.listen(port, "0.0.0.0", () => {
  console.log(`Server running on port ${port}`);
  console.log(`Vercel Analytics enabled in ${process.env.NODE_ENV || "development"} mode`);
});
