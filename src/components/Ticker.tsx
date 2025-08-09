"use client";

export default function Ticker() {
  const items = ["IoT", "Websites", "Applications", "Teams"];

  return (
    <div className="ticker bg-accent text-neutral py-4 overflow-hidden">
      <div className="marquee flex">
        <div className="marquee_list flex animate-marquee">
          {items.map((item, index) => (
            <span key={index} className="marquee_item flex text-sm uppercase font-heading px-8 whitespace-nowrap">
              - {item}
            </span>
          ))}
        </div>
        <div className="marquee_list flex animate-marquee">
          {items.map((item, index) => (
            <span key={index} className="marquee_item flex text-sm uppercase font-heading px-8 whitespace-nowrap">
              - {item}
            </span>
          ))}
        </div>
        <div className="marquee_list flex animate-marquee">
          {items.map((item, index) => (
            <span key={index} className="marquee_item flex text-sm uppercase font-heading px-8 whitespace-nowrap">
              - {item}
            </span>
          ))}
        </div>
        <div className="marquee_list flex animate-marquee">
          {items.map((item, index) => (
            <span key={index} className="marquee_item flex text-sm uppercase font-heading px-8 whitespace-nowrap">
              - {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
