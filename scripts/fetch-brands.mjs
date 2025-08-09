import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.resolve(__dirname, "../public/brands");

const urls = [
  "https://www.gigasavvy.com/app/uploads/2019/05/VirginOrbit.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/VirginOrbit@2x.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/HiChew.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/HiChew@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/johnny-rockets.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/johnny-rockets@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/PetIQ.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/PetIQ@2x.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/Orchid.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/Orchid@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/FlameBroiler.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/FlameBroiler@2x.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/Wahoos.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/Wahoos@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/Sugarfina.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/Sugarfina@2x.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/Nekter.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/Nekter@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/AmericanCareerCollegelogo.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/AmericanCareerCollegelogo@2x.png",
  "https://www.gigasavvy.com/app/uploads/2019/04/Toshiba_Alt.png",
  "https://www.gigasavvy.com/app/uploads/2019/04/Toshiba_Alt@2x.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/WCU.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/WCU@2x.png",
  "https://www.gigasavvy.com/app/uploads/2018/11/Chapman-Logo.png",
  "https://www.gigasavvy.com/app/uploads/2018/11/Chapman-Logo@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/Knotts_Logo.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/Knotts_Logo@2x.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/Oakwood.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/Oakwood@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/LumeCube.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/LumeCube@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/betteru_logo.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/betteru_logo@2x.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/Orangewood.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/Orangewood@2x.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/MarcPro.png",
  "https://www.gigasavvy.com/app/uploads/2019/05/MarcPro@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/tenet.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/tenet@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/OluKai_Logo.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/OluKai_Logo@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/GFORE_Logo.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/GFORE_Logo@2x.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/Northgate_Logo.png",
  "https://www.gigasavvy.com/app/uploads/2016/08/Northgate_Logo@2x.png",
];

async function download(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": "Mozilla/5.0 (PortfolioMigration)" },
  });
  if (!res.ok) throw new Error(`Failed ${res.status} for ${url}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const filename = path.basename(new URL(url).pathname);
  const outPath = path.join(publicDir, filename);
  await writeFile(outPath, buf);
  return filename;
}

(async () => {
  await mkdir(publicDir, { recursive: true });
  const results = [];
  for (const url of urls) {
    try {
      const name = await download(url);
      results.push({ url, savedAs: name });
      console.log("Saved:", name);
    } catch (e) {
      console.warn("Skip:", url, String(e));
    }
  }
  // Save a manifest for reference
  await writeFile(
    path.join(publicDir, "brands-manifest.json"),
    JSON.stringify(results, null, 2)
  );
  console.log("Done. Files in:", publicDir);
})();
