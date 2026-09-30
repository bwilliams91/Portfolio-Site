import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { GithubIcon } from "@/components/Icons";

const FramerImage = motion.create(Image);

const Tags = ({ tags }) =>
  tags?.length ? (
    <ul className="mt-2 flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-full border border-solid border-dark/60 px-3 py-0.5 text-sm font-medium dark:border-light/60 xs:text-xs"
        >
          {tag}
        </li>
      ))}
    </ul>
  ) : null;

// The image only links out when there is a live demo to open.
const Media = ({ link, className = "", children }) =>
  link ? (
    <Link href={link} target="_blank" rel="noopener noreferrer" className={`cursor-pointer ${className}`}>
      {children}
    </Link>
  ) : (
    <div className={className}>{children}</div>
  );

const ProjectImage = ({ img, title, link, className = "", sizes, preload = false }) => (
  <FramerImage
    src={img}
    alt={title}
    sizes={sizes}
    preload={preload}
    className={`w-full h-auto rounded-xl ${className}`}
    whileHover={link ? { scale: 1.05 } : undefined}
    transition={{ duration: 0.2 }}
  />
);

const ProjectTitle = ({ link, className = "", children }) =>
  link ? (
    <Link href={link} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
      <h2 className={className}>{children}</h2>
    </Link>
  ) : (
    <h2 className={className}>{children}</h2>
  );

export const FeaturedProject = ({ type, title, summary, img, link, github, tags, note, preload }) => {
  return (
    <article className="w-full flex items-center justify-between relative rounded-3xl rounded-br-2xl border border-solid border-dark bg-light shadow-2xl p-12 dark:bg-dark dark:border-light
    lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4">
      <div className="absolute top-0 -right-3 -z-10 w-[100%] h-[103%] rounded-[2.5rem] bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]" />
      <Media link={link} className="w-1/2 overflow-hidden rounded-lg lg:w-full">
        <ProjectImage
          img={img}
          title={title}
          link={link}
          preload={preload}
          sizes="(max-width: 1023px) 100vw, 50vw"
        />
      </Media>

      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">{type}</span>
        <ProjectTitle link={link} className="my-2 w-full text-left text-4xl font-bold dark:text-light lg:text-3xl sm:text-2xl">
          {title}
        </ProjectTitle>
        <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">{summary}</p>
        <Tags tags={tags} />
        <div className="mt-4 flex items-center">
          {github && (
            <Link href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} on GitHub`} className="w-10">
              <GithubIcon />
            </Link>
          )}
          {link && (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={`${github ? "ml-4 " : ""}rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base`}
            >
              Visit Project
            </Link>
          )}
          {!link && note && (
            <span className="text-lg font-semibold text-dark/75 dark:text-light/75 sm:text-base">{note}</span>
          )}
        </div>
      </div>
    </article>
  );
};

export const Project = ({ title, type, summary, img, link, github, tags, note }) => {
  return (
    <article className="w-full h-full flex flex-col items-center justify-center rounded-2xl border border-solid border-dark bg-light p-6 relative dark:bg-dark dark:border-light
      xs:p-4">
      <div className="absolute top-0 -right-3 -z-10 w-[100%] h-[103%] rounded-[2rem] bg-dark rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]" />
      <Media link={link} className="w-full overflow-hidden rounded-lg">
        <ProjectImage img={img} title={title} link={link} sizes="(max-width: 639px) 100vw, 50vw" />
      </Media>

      <div className="w-full flex flex-1 flex-col items-start mt-4">
        <span className="text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base">{type}</span>
        <ProjectTitle link={link} className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">
          {title}
        </ProjectTitle>
        {summary && <p className="my-1 font-medium text-dark dark:text-light md:text-sm">{summary}</p>}
        <Tags tags={tags} />

        <div className="w-full mt-auto pt-4 flex items-center justify-between">
          {link ? (
            <Link
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 text-lg font-semibold underline md:text-base"
            >
              Visit
            </Link>
          ) : (
            <span className="text-base font-semibold text-dark/75 dark:text-light/75">{note}</span>
          )}
          {github && (
            <Link href={github} target="_blank" rel="noopener noreferrer" aria-label={`${title} on GitHub`} className="w-8 md:w-6">
              <GithubIcon />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};
