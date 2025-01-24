import React from "react";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ position, company, companyLink, time, address, work }) => {
  const ref = useRef(null);
  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="capitalize font-bold text-2xl sm:text-xl xs:text-lg">
          {position}&nbsp;
          <a
            href={companyLink}
            target="_blank"
            className="text-primary capitalize"
          >
            @{company}
          </a>
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <ul className="list-disc list-inside">
            {Array.isArray(work) && work.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  const workRikerWeb = [
    'Specialize in full-stack web development using HTML/CSS, JavaScript, and Tailwind CSS',
    'Follow design mockups and wireframes for precise implementation',
    'Collaborate closely with backend developers for seamless integration',
    'Leverage Tailwind CSS utilities to create custom layouts and styles',
    'Delivered projects for various industries, increasing online leads by 25% for an HVAC company',
    'Boosted user engagement by 30% and reduced load times by 15% for a food delivery service',
    'Contributed to a 20% increase in overall project delivery efficiency',
  ];

  const workCodingForHermitCrabs = [
    'Developed and maintained websites for small businesses using HTML, CSS, and JavaScript',
    'Optimized websites for mobile responsiveness and cross-browser compatibility',
    'Implemented SEO best practices to improve search engine rankings',
    'Collaborated with clients to understand their needs and deliver custom solutions',
    'Helped write articles introducing underpriveledged teens to careers in tech',
    'Provided ongoing support and maintenance to ensure optimal performance',
  ];
  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>

      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2 ">
          <Details
            position="Frontend Developer"
            company="RikerWeb"
            companyLink= '/'
            time="2024-Present"
            address="Colorado Springs, CO"
            work={workRikerWeb}
          />
          <Details
            position="Web Developer"
            company="Coding For Hermit Crabs"
            companyLink="/"
            time="2023"
            address="Atlanta, GA"
            work={workCodingForHermitCrabs}
            />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
