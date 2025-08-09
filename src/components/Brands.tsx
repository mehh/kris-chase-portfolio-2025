"use client";

import Image from "next/image";

type Brand = { file: string; name: string };

const brands: Brand[] = [
  { file: "VirginOrbit.png", name: "Virgin Orbit" },
  { file: "HiChew.png", name: "Hi-Chew" },
  { file: "johnny-rockets.png", name: "Johnny Rockets" },
  { file: "PetIQ.png", name: "PetIQ" },
  { file: "Orchid.png", name: "Orchid" },
  { file: "FlameBroiler.png", name: "The Flame Broiler" },
  { file: "Wahoos.png", name: "Wahoo's" },
  { file: "Sugarfina.png", name: "Sugarfina" },
  { file: "Nekter.png", name: "Nékter Juice Bar" },
  { file: "AmericanCareerCollegelogo.png", name: "American Career College" },
  { file: "Toshiba_Alt.png", name: "Toshiba" },
  { file: "WCU.png", name: "West Coast University" },
  { file: "Chapman-Logo.png", name: "Chapman University" },
  { file: "Knotts_Logo.png", name: "Knott's Berry Farm" },
  { file: "Oakwood.png", name: "Oakwood" },
  { file: "LumeCube.png", name: "Lume Cube" },
  { file: "betteru_logo.png", name: "betterU" },
  { file: "Orangewood.png", name: "Orangewood" },
  { file: "MarcPro.png", name: "Marc Pro" },
  { file: "tenet.png", name: "Tenet Healthcare" },
  { file: "OluKai_Logo.png", name: "OluKai" },
  { file: "GFORE_Logo.png", name: "G/FORE" },
  { file: "Northgate_Logo.png", name: "Northgate Market" },
];

export default function BrandsGrid() {
  return (
    <section className="w-full py-10">
      <div className="container mx-auto px-4 pl-20 md:pl-24">
        <h2 className="text-2xl font-bold font-heading text-black mb-6">Brands</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {brands.map((b) => (
            <div
              key={b.file}
              className="rounded-box bg-base-200/50 border border-base-300 flex items-center justify-center p-4"
            >
              <Image
                src={`/brands/${b.file}`}
                alt={b.name}
                width={200}
                height={100}
                className="object-contain opacity-90 hover:opacity-100 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
