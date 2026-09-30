import React from "react";
import Head from "next/head";
import TransitionEffect from "@/components/TransitionEffect";
import Layout from "@/components/layout";
import AnimatedText from "@/components/AnimatedText";
import { FeaturedProject, Project } from "@/components/ProjectCards";
import AsciiWorld from "../../public/images/fun/ascii-world.webp";
import GalaxyGenerator from "../../public/images/fun/galaxy-generator.webp";
import HauntedHouse from "../../public/images/fun/haunted-house.webp";
import Fox from "../../public/images/fun/fox.webp";
import QuoteCloud from "../../public/images/fun/quote-cloud.webp";
import FlagShader from "../../public/images/fun/flag-shader.webp";
import RealisticRender from "../../public/images/fun/realistic-render.webp";
import ReflectionMat from "../../public/images/fun/reflection-material.webp";
import StarShower from "../../public/images/fun/star-shower.webp";
import SunsetRacer from "../../public/images/fun/sunset-racer.webp";

const experiments = [
  {
    title: "Galaxy Generator",
    type: "Three.js",
    img: GalaxyGenerator,
    summary: "A user-controlled galaxy generator using particle effects. Tune the arms, spin, randomness and colors with the live controls.",
    link: "https://galaxy-maker-brianw.vercel.app",
    github: "https://github.com/bwilliams91/galaxy-generator",
    tags: ["Three.js", "Particles"],
  },
  {
    title: "Haunted House",
    type: "Three.js",
    img: HauntedHouse,
    summary: "A spooky house and graveyard shrouded in fog, with textured materials, shadows and wandering spirits.",
    link: "https://haunted-house-brianw.vercel.app",
    github: "https://github.com/bwilliams91/haunted-house",
    tags: ["Three.js", "Lighting", "Textures"],
  },
  {
    title: "Low-Poly Fox",
    type: "Three.js",
    img: Fox,
    summary: "A low-poly fox on textured ground, built while learning to structure Three.js code for larger projects.",
    link: "https://demo-fox.vercel.app",
    tags: ["Three.js", "Animation"],
  },
  {
    title: "Quote Cloud",
    type: "Three.js",
    img: QuoteCloud,
    summary: "A quote made of 3D text floating in a cloud of randomly generated geometry.",
    link: "https://quote-cloud.vercel.app/",
    github: "https://github.com/bwilliams91/quote-cloud",
    tags: ["Three.js", "JavaScript"],
  },
  {
    title: "Flag Shader",
    type: "Shader",
    img: FlagShader,
    summary: "My first custom shader: a waving flag with live controls for the wave frequency.",
    link: "https://flag-shader-sigma.vercel.app",
    tags: ["GLSL", "Three.js"],
  },
  {
    title: "Realistic Render",
    type: "Three.js",
    img: RealisticRender,
    summary: "Giving a 3D model depth and color with environment-map lighting, with a slider for the environment intensity.",
    link: "https://realistic-render-pied.vercel.app",
    tags: ["Three.js", "Lighting"],
  },
  {
    title: "Reflection Material",
    type: "Three.js",
    img: ReflectionMat,
    summary: "Three objects with standard materials floating in a street, with a debug UI to tweak the values. Click to move the camera.",
    link: "https://materialexp.netlify.app/",
    github: "https://github.com/bwilliams91/material-experimentation",
    tags: ["Three.js", "Materials"],
  },
  {
    title: "Star Shower",
    type: "Canvas",
    img: StarShower,
    summary: "A randomly generated star shower using JavaScript.",
    link: "https://starshowerbkw.netlify.app/",
    github: "https://github.com/bwilliams91/Star-Shower",
    tags: ["JavaScript", "Canvas"],
  },
  {
    title: "Sunset Racer",
    type: "Game",
    img: SunsetRacer,
    summary: "A racing game in vanilla JavaScript on canvas. Use the arrow keys to drive.",
    link: "https://sunsetracer.netlify.app/",
    github: "https://github.com/bwilliams91/Sunset-Racing",
    tags: ["JavaScript", "Canvas", "Game"],
  },
];

const fun = () => {
  return (
    <>
      <Head>
        <title>Brian Williams | Fun Things</title>
        <meta
          name="description"
          content="Little worlds and experiments: a 3D world rendered entirely as text, Three.js scenes, shaders and small browser games built for the joy of it."
        />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText text="Experiments & Little Worlds" className="mb-8 lg:!text-7xl sm:mb-8 sm:!text-6xl xs:!text-4xl" />
          <p className="mx-auto mb-16 max-w-2xl text-center text-lg font-medium sm:mb-12 sm:text-base">
            Side projects, shader experiments and small browser games built for the fun of it. Most of them are
            interactive, so click, drag and explore.
          </p>

          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                title="ASCII World"
                img={AsciiWorld}
                summary="A first-person world rendered entirely as text. A procedurally generated voxel landscape of rivers, forests, a stone fort and villagers is drawn at character-grid resolution, then covered in a density-sorted glyph pass. Click to enter, then explore with WASD and the mouse. Best on desktop."
                link="https://acii-project.vercel.app"
                type="Featured Experiment"
                tags={["Three.js", "Procedural Generation", "ASCII Art"]}
                preload
              />
            </div>
            {experiments.map((experiment, index) => {
              // With an odd count, center the last card rather than leaving a gap beside it.
              const centered = experiments.length % 2 === 1 && index === experiments.length - 1;
              return (
                <div
                  key={experiment.title}
                  className={`col-span-6 sm:col-span-12 ${centered ? "col-start-4 lg:col-start-4 sm:col-start-1" : ""}`}
                >
                  <Project {...experiment} />
                </div>
              );
            })}
          </div>
        </Layout>
      </main>
    </>
  );
};

export default fun;
