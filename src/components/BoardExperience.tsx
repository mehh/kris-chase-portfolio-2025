"use client";

interface BoardExperience {
  title: string;
  company: string;
  timeframe: string;
  description: string;
}

const boardExperience: BoardExperience[] = [
  {
    title: "AWS SoCal Executive Advisory Board",
    company: "Amazon Web Services",
    timeframe: "Oct. 2023 - Nov. 2024",
    description: "The AWS SoCal Executive Advisory Board is a confluence of senior executives and industry thought leaders, brought together to foster innovative business strategies, enhance operational efficiency, and drive sustainable growth."
  },
  {
    title: "Engineering Leadership Community - Chapter Organizer",
    company: "Engineering Leadership Community",
    timeframe: "Oct. 2023 - Present",
    description: "The Engineering Leadership Community is a platform for engineering leaders of all roles and tenures to engage, exchange ideas, and face challenges together. It's more than a peer group; it's a sanctuary for gaining diverse perspectives and discussing real-world issues with trusted peers."
  },
  {
    title: "Advisory Board Member",
    company: "StatusHero/Steady",
    timeframe: "Jan. 2022 - Present",
    description: "Our vision is to streamline work processes, ensuring that time and effort are invested where they matter most. As a member of our advisory board, your role will be pivotal in shaping this vision. Your insights will help us examine and refine our ideas, ensuring that our assumptions are robust and our strategies are sound."
  }
];

export default function BoardExperience() {
  return (
    <section id="board" className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4 pl-20 md:pl-24">
        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-12 text-foreground">
          Board & Advisory Experience
        </h2>
        
        <div className="space-y-0">
          {boardExperience.map((board, index) => (
            <div
              key={index}
              className="group block py-8 border-t border-border transition-all duration-500 ease-out hover:bg-accent/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-500 ease-out">
                    {board.title}
                  </h3>
                  <div className="text-lg text-muted-foreground group-hover:text-foreground/80 transition-colors duration-500 ease-out">
                    {board.company}
                  </div>
                </div>
                <div className="text-base text-muted-foreground font-medium">
                  {board.timeframe}
                </div>
              </div>
              
              <div className="max-h-0 overflow-hidden group-hover:max-h-32 transition-all duration-500 ease-out">
                <p className="text-foreground/70 max-w-4xl pt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 ease-out leading-relaxed">
                  {board.description}
                </p>
              </div>
            </div>
          ))}
          
          {/* Bottom border */}
          <div className="border-t border-border mt-0"></div>
        </div>
      </div>
    </section>
  );
}
