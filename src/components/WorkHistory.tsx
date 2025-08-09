"use client";

interface WorkExperience {
  title: string;
  company: string;
  timeframe: string;
  description: string;
}

const workExperience: WorkExperience[] = [
  {
    title: "Engineering Manager",
    company: "GigaSavvy",
    timeframe: "2020 - Present",
    description: "Leading cross-functional engineering teams to deliver award-winning digital experiences. Mentoring developers, architecting scalable solutions, and driving technical strategy for Fortune 500 clients including Virgin Orbit, PetIQ, and Sugarfina."
  },
  {
    title: "Senior Full Stack Developer",
    company: "GigaSavvy",
    timeframe: "2018 - 2020",
    description: "Built high-performance web applications and mobile solutions using React, Node.js, and modern frameworks. Specialized in e-commerce platforms, IoT integrations, and real-time data visualization systems."
  },
  {
    title: "Lead Developer",
    company: "Digital Agency",
    timeframe: "2016 - 2018",
    description: "Led development teams in creating custom web applications and digital marketing solutions. Implemented CI/CD pipelines, optimized performance, and established coding standards across multiple projects."
  },
  {
    title: "Full Stack Developer",
    company: "Tech Startup",
    timeframe: "2014 - 2016",
    description: "Developed MVP products from concept to launch using agile methodologies. Built responsive web applications, RESTful APIs, and integrated third-party services for rapid product iteration."
  },
  {
    title: "Frontend Developer",
    company: "Creative Studio",
    timeframe: "2012 - 2014",
    description: "Created engaging user interfaces and interactive experiences for brand campaigns. Specialized in CSS animations, JavaScript interactions, and cross-browser compatibility for high-traffic websites."
  }
];

export default function WorkHistory() {
  return (
    <section id="work" className="py-16 lg:py-24">
      <div className="container mx-auto px-4 pl-20 md:pl-24">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-black">
          Work Experience
        </h2>
        
        <div className="space-y-0">
          {workExperience.map((job, index) => (
            <div
              key={index}
              className="group block py-8 border-t border-black/10 transition-all duration-500 ease-out hover:bg-black/5"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-black/80 group-hover:text-black transition-colors duration-500 ease-out">
                    {job.title}
                  </h3>
                  <div className="text-lg text-black/60 group-hover:text-black/80 transition-colors duration-500 ease-out">
                    {job.company}
                  </div>
                </div>
                <div className="text-base text-black/60 font-medium">
                  {job.timeframe}
                </div>
              </div>
              
              <div className="max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-500 ease-out">
                <p className="text-black/70 max-w-4xl pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ease-out leading-relaxed">
                  {job.description}
                </p>
              </div>
            </div>
          ))}
          
          {/* Bottom border */}
          <div className="border-t border-black/10 mt-0"></div>
        </div>
      </div>
    </section>
  );
}
