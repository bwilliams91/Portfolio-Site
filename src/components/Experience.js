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
          {companyLink ? (
            <a
              href={companyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary capitalize dark:text-primaryDark"
            >
              @{company}
            </a>
          ) : (
            <span className="text-primary capitalize dark:text-primaryDark">@{company}</span>
          )}
        </h3>
        <span className="capitalize font-medium text-dark/75 dark:text-light/75 xs:text-sm">
          {address ? `${time} | ${address}` : time}
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

  const workGaDoe = [
    "Hired as a UI/UX Developer and grew into full-stack ownership of mission-critical platforms serving millions of K-12 students and educators across Georgia",
    "Architected and maintained an H5P-based PHP platform serving thousands of concurrent users across Georgia Virtual School (GAVS), covering both frontend and backend",
    "Sole design/development resource for 1+ year on GALEADS, the leadership evaluation and development system used by principals, assistant principals, and superintendents across 2,316 schools",
    "Optimized SQL queries and relational database architecture to support statewide deployments serving 1.75M+ students and 121K+ educators",
    "Leading organizational AI development strategy, architecting Model Context Protocol (MCP) infrastructure and enabling AI-assisted development workflows",
    "Designed and implemented a testing automation framework, improving code reliability and reducing manual QA across multiple educational platforms",
    "Collaborated with product, design, compliance, and leadership teams to meet state government standards and accessibility requirements",
  ];

  const workRikerWeb = [
    "Built responsive, accessible UIs using Vue.js and React, translating Figma designs into production-ready components",
    "Worked with TailwindCSS and component-driven architecture, creating reusable component libraries that reduced development time and improved consistency",
    "Collaborated with designers on design-to-code workflows for pixel-perfect, accessible implementation across projects",
  ];

  const workCodingForHermitCrabs = [
    "Completed an intensive bootcamp-style apprenticeship, gaining proficiency in Django, Python backend development, and full-stack architecture",
    "Contributed to production Django applications and open-source educational technology initiatives in an agile team",
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
            position="Full-Stack Developer"
            company="Georgia Department of Education"
            companyLink="https://www.gadoe.org/"
            time="March 2025 - Present"
            work={workGaDoe}
          />
          <Details
            position="Junior Front-End Developer"
            company="RikerWeb"
            time="January 2022 - December 2023"
            address="Colorado Springs, CO"
            work={workRikerWeb}
          />
          <Details
            position="Junior Software Development Apprentice"
            company="Coding For Hermit Crabs"
            time="April 2023 - July 2023"
            address="Atlanta, GA"
            work={workCodingForHermitCrabs}
          />
        </ul>
      </div>
    </div>
  );
};

export default Experience;
