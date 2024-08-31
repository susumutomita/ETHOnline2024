"use client";

import BasicCard from "@/components/basic-card";
import { config } from "@/util/site-config";

const About = () => {
  return (
    <div className="flex flex-col md:flex-row mt-8 md:space-x-8 z-10 w-full max-w-screen-xl px-5 xl:px-0">
      <BasicCard
        title="About BlockFeedback"
        description="Learn more about BlockFeedback and how it works."
        className="flex-1 min-w-[300px] p-4"
      >
        {config.about.map((section, index) => (
          <div key={index} className="mt-4">
            <h3 className="text-lg font-bold">{section.title}</h3>
            <p>{section.description}</p>
          </div>
        ))}
      </BasicCard>
    </div>
  );
};
export default About;
