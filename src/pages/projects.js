import React from "react";
import Head from "next/head";
import Layout from "@/components/layout";
import AnimatedText from "@/components/AnimatedText";
import { FeaturedProject, Project } from "@/components/ProjectCards";
import TransitionEffect from "@/components/TransitionEffect";
import GolfFix from "../../public/images/projects/golf-fix.webp";
import FrozenMiasma from "../../public/images/projects/frozen-miasma.webp";
import ChillyWillyAir from "../../public/images/projects/chilly-willy-air.webp";
import Constellation from "../../public/images/projects/constellation.webp";
import Omnifood from "../../public/images/projects/Brians_Stuff-Omnifood_Project.webp";

const projects = () => {
  return (
    <>
      <Head>
        <title>Brian Williams | Projects Page</title>
        <meta
          name="description"
          content="Selected projects by Brian Williams: Golf Fix, a curated golf brand directory, a Three.js first-person shooter, a client site for an Atlanta HVAC company, and a local codebase dependency visualizer."
        />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Innovation Meets Usability!" className="mb-16 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl" />

          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                title="Golf Fix"
                img={GolfFix}
                summary="A curated directory of golf apparel, equipment and lifestyle brands beyond the big-box names. Visitors search and filter by category and vibe, then land straight on the brand's own site, and brands can submit themselves for listing."
                link="https://www.golf-fix.com"
                type="Featured Project"
                tags={["Vue 3", "TypeScript", "Vite", "Vercel"]}
                preload
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Frozen Miasma"
                img={FrozenMiasma}
                summary="A browser-based, Doom-style first-person shooter reskinned as 1920s Antarctic cosmic horror. Built with Three.js around a cell-grid level system with sector lighting, detailed props and 8-angle sprite enemies."
                link="https://frozen-miasma.vercel.app"
                type="Featured Project"
                tags={["Three.js", "JavaScript", "Game Development", "In Development"]}
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Chilly Willy Air"
                img={ChillyWillyAir}
                summary="A marketing and booking site for a family-owned HVAC company serving metro Atlanta, built to put pricing, reviews and same-day scheduling front and center."
                link="https://chilly-willy-air.vercel.app"
                type="Client Project"
                tags={["HTML", "CSS", "JavaScript", "Vercel"]}
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="Constellation"
                img={Constellation}
                summary="A local-only tool that maps dependencies across C#, PHP, Python and JavaScript/TypeScript codebases and renders them as an interactive graph at file and class level, with a built-in locator for answering where a feature lives. Nothing leaves the machine."
                type="Developer Tool"
                tags={["Python", "JavaScript", "Cytoscape.js"]}
                note="Private repository · runs locally"
              />
            </div>
            <div className="col-span-6 col-start-4 lg:col-start-3 sm:col-span-12 sm:col-start-1">
              <Project
                title="Omnifood Food Delivery"
                img={Omnifood}
                link="https://omnifoodbkw.netlify.app/"
                type="Project"
                github="https://github.com/bwilliams91/Omnifood-project"
              />
            </div>
          </div>
        </Layout>
      </main>
    </>
  );
};

export default projects;
