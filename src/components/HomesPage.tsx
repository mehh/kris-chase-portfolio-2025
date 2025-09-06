'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function HomesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-[800px] flex items-center justify-center overflow-hidden">
        <Image
          src="https://api.builder.io/api/v1/image/assets/TEMP/b906bf7e4e11682059cc94ec5b0726e05038bc9d?width=3200"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-medium text-white leading-normal max-w-[742px] mx-auto px-4">
            Precision Engineered,<br />
            High Performance Homes
          </h1>
        </div>
      </section>

      {/* A Predictable Way to Build */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-11 h-11 rounded-full border-2 border-black flex items-center justify-center">
                  <svg width="20" height="21" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.29289 20.7071C7.68342 21.0976 8.31658 21.0976 8.70711 20.7071L15.0711 14.3431C15.4616 13.9526 15.4616 13.3195 15.0711 12.9289C14.6805 12.5384 14.0474 12.5384 13.6569 12.9289L8 18.5858L2.34315 12.9289C1.95262 12.5384 1.31946 12.5384 0.928932 12.9289C0.538407 13.3195 0.538407 13.9526 0.928932 14.3431L7.29289 20.7071ZM7 -4.37114e-08L7 20L9 20L9 4.37114e-08L7 -4.37114e-08Z" fill="black"/>
                  </svg>
                </div>
              </div>
              <h2 className="text-4xl sm:text-5xl font-medium text-black leading-tight mb-12">
                A Predictable<br />
                Way to Build
              </h2>
            </div>
            <div>
              <h3 className="text-lg font-medium text-black mb-6 uppercase tracking-wide">
                ADVANCED MANUFACTURING
              </h3>
              <p className="text-base text-black leading-relaxed">
                We use a repeatable process for high-performance, prefabricated homes
                at scale. We standardize assemblies, materials, and designs to reliably
                produce world-class quality homes in less than 16 weeks.
              </p>
              <br />
              <p className="text-base text-black leading-relaxed">
                Our technology and software transforms your home into a detailed 
                manufacturing order ready for production. Each home is made with 
                cutting-edge materials and processes that aren't readily available to local 
                builders. It's built to last with a precision-engineered steel frame resistant 
                to mold, rot, and termites. As a result, you get a home with less worry and
                less maintenance—now and in the future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Three images row */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-[137/213]">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/a3075adb0eac99bbb0f379e65bc5e4aa575e94ef?width=838"
                alt="Way to Build 1"
                width={419}
                height={227}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="aspect-[137/213]">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/aec4fd675755cbf4e9f60757135b7a3c9237876b?width=842"
                alt="Way to Build 2"
                width={421}
                height={227}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="aspect-[137/213]">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/132792466899c8813b6212edfb3405d4cf74182a?width=838"
                alt="Way to Build 3"
                width={419}
                height={227}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* WE ARE Section */}
      <section className="py-16 bg-[#595E48]">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-[1440px] text-center">
          <p className="text-lg font-medium text-white mb-4 uppercase tracking-wide">
            WE ARE
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium text-white leading-tight mb-8">
            The Very Best at One Thing
          </h2>
          <p className="text-base text-white leading-relaxed max-w-4xl mx-auto">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. 
            Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis 
            convallis tempus leo eu aenean. Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit 
            quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium 
            tellus duis. Pretium tellus duis convallis tempus leo eu.
          </p>
        </div>
      </section>

      {/* Tmod Two Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-[1440px] text-center">
          <p className="text-lg font-medium text-black mb-4 uppercase tracking-wide">
            2,500 SQ FT DUPLEX
          </p>
          <h2 className="text-4xl sm:text-5xl font-medium text-black leading-tight mb-8">
            Tmod Two
          </h2>
          <p className="text-base text-black leading-relaxed max-w-4xl mx-auto mb-16">
            Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. 
            Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis 
            convallis tempus leo eu aenean. Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit 
            quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium 
            tellus duis. Pretium tellus duis convallis tempus leo eu.
          </p>
          
          {/* Three home images */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="aspect-[137/213]">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/12e175392bcc8459ce8b26bd384c5226349a36f7?width=840"
                alt="Home design 1"
                width={420}
                height={653}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="aspect-[137/213]">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/12e175392bcc8459ce8b26bd384c5226349a36f7?width=840"
                alt="Home design 2"
                width={420}
                height={653}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="aspect-[137/213]">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/12e175392bcc8459ce8b26bd384c5226349a36f7?width=840"
                alt="Home design 3"
                width={420}
                height={653}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Safety for the Future */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-medium text-black leading-tight mb-8">
                Safety for<br />
                the Future
              </h2>
              <p className="text-base text-black leading-relaxed mb-6">
                Weather has become unpredictable, and it's not the same climate we grew up with. The next several decades will bring 
                cold temperatures to warm climates and excessive water to dry regions. Being ready–at home–for these weather variations 
                is the safest way to protect yourself. Our homes are built for any climate using a standardized production system. 
                They will shield you from Category-5 hurricanes, heat waves, freezing temperatures, and even earthquakes.
              </p>
              <p className="text-base text-black leading-relaxed">
                When there are wildfires, the home will be safe. Embers cannot enter an attic–we use flat roofs–or enter the 
                crawlspace–it's internally ventilated–and the metal frame will not deform until temperatures are 700º C / 1292º F, 
                making it a Class-A fire-rated home. Having one universal building code for residential homes will keep people safe.
              </p>
            </div>
            <div className="relative">
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/d899118f6b35b4b8fabf086c13b9567e9d89bbc7?width=1468"
                alt="Safety features"
                width={734}
                height={788}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
          
          {/* Additional safety images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
            <div>
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/b74b6b66928d06561417bd6ae64bebf3a5d26b9b?width=1122"
                alt="Safety feature 2"
                width={561}
                height={582}
                className="w-full h-auto rounded-lg"
              />
            </div>
            <div>
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/275b65631c6f6eda0ae0b690aad4b9c68db73dee?width=812"
                alt="Safety feature 3"
                width={406}
                height={310}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Environmental Responsibility */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-[1440px]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-medium text-black mb-4 uppercase tracking-wide">
                ENVIRONMENTALLY RESPONSIBLE
              </h3>
              <p className="text-base text-black leading-relaxed">
                Each Tmod home is built to last 100 years, significantly reducing the environmental impact. Using high-quality 
                materials and product design-based science, your home will require less maintenance, won't begin to rot in a 
                matter of years, and will consume a fraction of the energy a typical home uses each year – for the lifetime of the home.
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-px bg-black"></div>
              <h3 className="text-lg font-medium text-black mb-4 mt-6 uppercase tracking-wide">
                READY FOR MOTHER NATURE
              </h3>
              <p className="text-base text-black leading-relaxed">
                We crafted every square foot using material science for unparalleled performance to build the ultimate 
                climate-resilient home. Recycled light-gauge steel strikes the perfect balance of being resistant to mold, 
                rot, insects, and fires. While the airtight and waterproof liquid membrane wrap the entire home in one 
                continuous seal to reduce temperature change. And the double-layered insulation further prevents extreme 
                climates from entering the home. You can take this home almost anywhere.
              </p>
            </div>
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-px bg-black"></div>
              <h3 className="text-lg font-medium text-black mb-4 mt-6 uppercase tracking-wide">
                BENEATH THE SURFACE
              </h3>
              <p className="text-base text-black leading-relaxed">
                The most climate-resilient home pushes the limits of Passive House Standards. Robotic automation increases 
                the precision and speed of production. Building science ensures each home is created for durability and to 
                improve the health of the occupants. And an intelligent home operating system connects it all.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Above and Beyond */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h2 className="text-4xl sm:text-5xl font-medium text-black leading-tight mb-8">
                Above and<br />
                Beyond
              </h2>
              <p className="text-base text-black leading-relaxed mb-12">
                A health-promoting home is crucial to your mental and physical well-being. But what about your connection to the outdoors?
              </p>
              <p className="text-base text-black leading-relaxed">
                Our homes are designed to make it easier to see nature, use the sun's natural light to illuminate your home, 
                and step outside to enjoy the weather. This is what's called a biophilic design.
              </p>
            </div>
            <div>
              <Image
                src="https://api.builder.io/api/v1/image/assets/TEMP/a54c7fca1704a99c68708f24340079ca0f08ba12?width=1436"
                alt="Above and Beyond"
                width={718}
                height={547}
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Health Section with Stats */}
      <section className="py-16 bg-[#595E48] relative overflow-hidden">
        <Image
          src="https://api.builder.io/api/v1/image/assets/TEMP/40510e61585f305691d28447e5e69acffec496c3?width=2880"
          alt="Health background"
          fill
          className="object-cover"
        />
        <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-12 max-w-[1440px] text-center">
          <h3 className="text-xl font-medium text-white mb-6 uppercase tracking-wide">
            HOW YOUR HOME IS CONFIGURED DIRECTLY IMPACTS YOUR HEALTH
          </h3>
          <p className="text-base text-white leading-relaxed max-w-4xl mx-auto mb-16">
            Most people don't realize the magnitude of a home's contribution as a positive influence on our daily lives. 
            And while people invest in their personal future in many ways, few investments pay off more than a healthy 
            lifestyle promoted by a healthy home. From the quality of the air we breathe to the water we drink, cook, 
            and bathe with, we've used our background as building scientists to design a home with systems we can rely 
            on to provide a positively healthier living experience.
          </p>
          
          {/* Statistics */}
          <div className="border-t border-white pt-16 mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="text-6xl sm:text-7xl font-medium text-white mb-4">97%</div>
                <p className="text-xs text-white leading-relaxed">
                  Effective at capturing airborne particles–dust, pollen, and mold
                  spores–between 3-10 microns
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl sm:text-7xl font-medium text-white mb-4">90%</div>
                <p className="text-xs text-white leading-relaxed">
                  Effective at capturing airborne particles–CO2, NOx, SOx, and metals–
                  between 3‑10 microns
                </p>
              </div>
              <div className="text-center">
                <div className="text-6xl sm:text-7xl font-medium text-white mb-4">99.9%</div>
                <p className="text-xs text-white leading-relaxed">
                  Of viruses and bacteria killed in water with in-line UV (ultraviolet light) filtration
                </p>
              </div>
            </div>
          </div>
          
          {/* CTA Button */}
          <Link 
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-white text-white font-medium hover:bg-white hover:text-black transition-colors duration-300"
          >
            Learn more about our health & sustainability standards
          </Link>
        </div>
      </section>
    </div>
  );
}
