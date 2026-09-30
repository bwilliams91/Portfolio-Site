import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationControls,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";

// x/y are offsets from the center in vw. `extra` skills are hidden on phones, where the orbit is crowded.
const SKILLS = [
  { name: "HTML", x: -21, y: 2 },
  { name: "CSS", x: -6, y: -9 },
  { name: "JavaScript", x: 19, y: 6 },
  { name: "React", x: 0, y: 10 },
  { name: "D3.js", x: -21, y: -15 },
  { name: "THREEJS", x: 19, y: -12 },
  { name: "NextJS", x: 31, y: -5 },
  { name: "Python", x: 19, y: -20 },
  { name: "Tailwind CSS", x: 0, y: -20 },
  { name: "Figma", x: -24, y: 18 },
  { name: "Blender", x: 17, y: 17 },
  { name: "TypeScript", x: -32, y: -6, extra: true },
  { name: "Vue.js", x: -31, y: -14, extra: true },
  { name: "PHP", x: -12, y: 17, extra: true },
  { name: "SQL", x: 31, y: 8, extra: true },
  { name: "MCP", x: -33, y: 10, extra: true },
];

// The wave is a 0 -> PULSE_END value: the radius of the lead ring as a fraction of the container.
const PULSE_DURATION = 3.6;
const PULSE_PAUSE = 1;
const PULSE_END = 1.15;
// Trailing rings follow the lead ring at these radius offsets, dimmer each time.
const RINGS = [
  { delay: 0, strength: 1 },
  { delay: 0.07, strength: 0.55 },
  { delay: 0.14, strength: 0.3 },
];

const clamp01 = (v) => Math.min(1, Math.max(0, v));

const pillVariants = {
  hidden: { opacity: 0, scale: 0.3 },
  reveal: {
    opacity: 1,
    scale: [0.3, 1.18, 1],
    transition: { duration: 0.6, times: [0, 0.6, 1], ease: "easeOut" },
  },
  ping: {
    opacity: 1,
    scale: [1, 1.1, 1],
    transition: { duration: 0.5, ease: "easeOut" },
  },
  static: { opacity: 1, scale: 1, transition: { duration: 0 } },
};

// Outline that expands from each skill as a ring passes over it.
const pingVariants = {
  hidden: { opacity: 0, scale: 1 },
  reveal: { opacity: [0.9, 0], scale: [1, 1.5], transition: { duration: 0.8, ease: "easeOut" } },
  ping: { opacity: [0.9, 0], scale: [1, 1.5], transition: { duration: 0.8, ease: "easeOut" } },
  static: { opacity: 0, scale: 1, transition: { duration: 0 } },
};

const Skill = ({ name, x, y, r, wave, reduceMotion, className = "" }) => {
  const controls = useAnimationControls();
  const revealed = useRef(false);
  const previous = useRef(0);

  useEffect(() => {
    if (reduceMotion) {
      controls.start("static");
      return;
    }

    // Reveal the first time the wave reaches this skill, then ping it on every later pass.
    return wave.on("change", (value) => {
      const crossed = previous.current < r && value >= r;
      previous.current = value;
      if (!crossed) return;

      controls.start(revealed.current ? "ping" : "reveal");
      revealed.current = true;
    });
  }, [wave, r, reduceMotion, controls]);

  return (
    <motion.div
      className={`flex items-center justify-center rounded-full font-semibold bg-dark text-light py-3 px-6 shadow-dark cursor-pointer absolute dark:text-dark dark:bg-light
      lg:py-2 lg:px-4 md:text-sm md:py-1.5 md:px-3 xs:bg-transparent xs:dark:bg-transparent xs:text-dark xs:dark:text-light xs:font-bold ${className}`}
      style={{ x: `${x}vw`, y: `${y}vw` }}
      variants={pillVariants}
      initial="hidden"
      animate={controls}
      whileHover={{ scale: 1.05 }}
    >
      {name}
      <motion.span
        aria-hidden="true"
        variants={pingVariants}
        className="pointer-events-none absolute inset-0 rounded-full border-2 border-solid border-primary dark:border-primaryDark xs:hidden"
      />
    </motion.div>
  );
};

// SVG so the stroke keeps a constant width while the ellipse scales to the container's shape.
const PulseRing = ({ wave, delay, strength }) => {
  const scale = useTransform(wave, (v) => Math.max(0, v - delay));
  const opacity = useTransform(wave, (v) => {
    const radius = v - delay;
    return strength * clamp01(radius * 10) * clamp01((1.05 - radius) / 0.35);
  });

  return (
    <motion.svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-primary dark:text-primaryDark"
      style={{ scale, opacity, filter: "drop-shadow(0 0 6px currentColor)" }}
    >
      <ellipse
        cx="50"
        cy="50"
        rx="50"
        ry="50"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </motion.svg>
  );
};

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });
  const reduceMotion = useReducedMotion();
  const wave = useMotionValue(0);
  const hubScale = useTransform(wave, [0, 0.06, 0.22], [1, 1.18, 1]);
  const [size, setSize] = useState(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const measure = () =>
      setSize({ width: element.offsetWidth, height: element.offsetHeight, vw: window.innerWidth });

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Pulse only while the section is on screen.
  useEffect(() => {
    if (!inView || reduceMotion) return;

    const pulse = animate(wave, [0, PULSE_END], {
      duration: PULSE_DURATION,
      ease: "easeOut",
      repeat: Infinity,
      repeatDelay: PULSE_PAUSE,
    });

    return () => pulse.stop();
  }, [inView, reduceMotion, wave]);

  // Radius of each skill as a fraction of the container ellipse, i.e. when the wave reaches it.
  const skills = useMemo(
    () =>
      SKILLS.map((skill) => {
        if (!size) return { ...skill, r: Infinity };
        const dx = ((skill.x / 100) * size.vw) / (size.width / 2);
        const dy = ((skill.y / 100) * size.vw) / (size.height / 2);
        return { ...skill, r: Math.max(0, Math.hypot(dx, dy) - 0.04) };
      }),
    [size]
  );

  return (
    <>
      <h2 className="font-bold text-8xl mt-60 w-full text-center mb-8 pb-4 lg:pb-2 md:text-6xl md:mt-32">
        Skills
      </h2>
      <div
        ref={ref}
        className="w-full h-screen relative flex items-center justify-center rounded-full bg-circularLight dark:bg-circularDark
       lg:h-[80vh] sm:h-[60vh] xs:h-[40vh]
       lg:bg-circularLightLg lg:dark:bg-circularDarkLg
       md:bg-circularLightMd md:dark:bg-circularDarkMd
       sm:bg-circularLightSm sm:dark:bg-circularDarkSm"
      >
        {!reduceMotion &&
          RINGS.map((ring) => <PulseRing key={ring.delay} wave={wave} {...ring} />)}

        <motion.div style={{ scale: hubScale }}>
          <motion.div
            className="flex items-center justify-center rounded-full font-semibold bg-dark text-light p-8 shadow-dark cursor-pointer dark:text-dark dark:bg-light lg:p-6 md:p-4 xs:text-xs xs:p-2"
            whileHover={{ scale: 1.05 }}
          >
            web
          </motion.div>
        </motion.div>

        {skills.map(({ extra, ...skill }) => (
          <Skill
            key={skill.name}
            {...skill}
            wave={wave}
            reduceMotion={reduceMotion}
            className={extra ? "sm:hidden" : ""}
          />
        ))}
      </div>
    </>
  );
};

export default Skills;
