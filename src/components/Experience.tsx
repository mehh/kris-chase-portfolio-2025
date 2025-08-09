export default function Experience() {
  return (
    <section className="experience py-16 lg:py-24">
      <div className="container mx-auto px-4 pl-20 md:pl-24">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Over 15 years of experience</h2>
            <p className="text-lg text-base-content/90 mb-4">
              Engineering Leader | Leading Through Empathy | Web/Mobile Development | I am passionate about building high performing teams through mentoring, coaching, and leadership development.
            </p>
            <p className="text-base text-base-content/80">
              For more details, head over to my{" "}
              <a 
                target="_blank" 
                rel="noreferrer" 
                href="https://www.linkedin.com/in/krisrchase/"
                className="link link-primary hover:link-accent"
              >
                LinkedIn profile.
              </a>
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Experience Column */}
            <div>
              <h3 className="text-2xl font-bold font-heading mb-6" id="experience">Experience</h3>
              <ul className="space-y-6">
                <li className="border-l-2 border-primary pl-4">
                  <span className="text-sm font-heading text-primary">2022—TODAY</span>
                  <div>
                    <a href="https://www.talentsystems.com" className="link link-hover font-semibold">Talent Systems</a>
                    <br />
                    <span className="text-base-content/80">VP of Software Engineering</span>
                  </div>
                </li>
                <li className="border-l-2 border-base-300 pl-4">
                  <span className="text-sm font-heading text-base-content/70">2021—2022</span>
                  <div>
                    <a href="https://www.publicsq.com" className="link link-hover font-semibold">PublicSq.</a>
                    <br />
                    <span className="text-base-content/80">VP of Engineering</span>
                  </div>
                </li>
                <li className="border-l-2 border-base-300 pl-4">
                  <span className="text-sm font-heading text-base-content/70">2018—2021</span>
                  <div>
                    <a href="https://www.weareenvoy.com" className="link link-hover font-semibold">Envoy</a>
                    <br />
                    <span className="text-base-content/80">VP of Technology</span>
                  </div>
                </li>
                <li className="border-l-2 border-base-300 pl-4">
                  <span className="text-sm font-heading text-base-content/70">2013—2018</span>
                  <div>
                    <a href="https://www.gigasavvy.com" className="link link-hover font-semibold">Gigasavvy</a>
                    <br />
                    <span className="text-base-content/80">Partner & Development Director</span>
                  </div>
                </li>
                <li className="border-l-2 border-base-300 pl-4">
                  <span className="text-sm font-heading text-base-content/70">2008-2013</span>
                  <div>
                    <a href="https://www.werbewelt.de/" className="link link-hover font-semibold">IBM</a>
                    <br />
                    <span className="text-base-content/80">Associate Software Product Professional<br />Systems Administrator<br />Developer</span>
                  </div>
                </li>
                <li className="border-l-2 border-base-300 pl-4">
                  <span className="text-sm font-heading text-base-content/70">2007—2020</span>
                  <div>
                    <span className="font-semibold">Freelance / Consulting</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Awards Column */}
            <div>
              <h3 className="text-2xl font-bold font-heading mb-6" id="awards">Awards</h3>
              <ul className="space-y-4">
                <li>
                  <span className="text-sm font-heading text-accent">2019</span>
                  <div className="font-semibold">Gold Addy Award - VirginOrbit.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-accent">2019</span>
                  <div className="font-semibold">Gold Addy Award - CremoCompany.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-base-content/70">2018</span>
                  <div className="font-semibold">Gold Addy Award - OrchidEssentials.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-base-content/70">2018</span>
                  <div className="font-semibold">Bronze Addy Award - JohnnyRockets.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-base-content/70">2018</span>
                  <div className="font-semibold">Bronze Addy Award - Bruxie.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-base-content/70">2016</span>
                  <div className="font-semibold">Gold Addy Award - Sugarfina.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-base-content/70">2016</span>
                  <div className="font-semibold">Gold Addy Award - PearSports.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-base-content/70">2016</span>
                  <div className="font-semibold">Gold Addy Award - LumeCube.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-base-content/70">2016</span>
                  <div className="font-semibold">Gold Addy Award - Ullushop.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-base-content/70">2016</span>
                  <div className="font-semibold">Silver Addy Award - LumeCube.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-base-content/70">2016</span>
                  <div className="font-semibold">Silver Addy Award - DitaEyewear.com</div>
                </li>
                <li>
                  <span className="text-sm font-heading text-base-content/70">2016</span>
                  <div className="font-semibold">Silver Addy Award - Gigasavvy.com</div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
