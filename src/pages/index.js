import Head from "next/head";
import Layout from "../components/layout";
import Image from "next/image";
import profilePic from "../../public/images/profile/profile-pic-upscaled-removebg.webp";
import AnimatedText from "../components/AnimatedText.js";
import Link from "next/link";
import { LinkArrow } from "@/components/Icons";
import HireMe from "@/components/HireMe";
import TransitionEffect from "@/components/TransitionEffect";

export default function Home() {
  return (
    <>
      <Head>
        <title>Welcome to my Portfolio</title>
        <meta name="description" content="Brian Williams Portfolio" />
      </Head>
      <TransitionEffect />
      <main className="flex items-center text-dark w-full min-h-screen dark:text-light">
        <layout className="pt-0 md:p-16 sm:pt-8">
          <div className="flex items-center justify-between w-full lg:flex-col">
            <div className="w-1/2 md:w-full">
              <Image src={profilePic} alt="Brian" className="w-full h-auto lg:hidden md:inline-block md:w-full " priority sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw" />
            </div>
            <div className="w-1/2 flex flex-col items-center self-center lg:w-full lg:text-center">
              <AnimatedText
                text="Taking what is possible tomorrow and creating it today."
                className="!text-6xl !text-left xl:!text-5xl lg:!text-center lg:!text-6xl md:!text-5xl sm:!text-3xl sm:pt-2"
              />
              <p className="my-4 text-base font-medium md:text-sm sm:text-xs">
                I love making something beautiful and functional with the newest
                development techniques. I look for challenges in the unknown and
                the new. Right now, I am practicing with React. While you are
                here, feel free to check out some of my other recent work or
                read one of my articles.
              </p>
              <div className="flex items-center self-start mt-2 lg:self-center">
                <Link
                  href="/brian-w-resume-2024.pdf"
                  target="_blank"
                  className="flex items-center bg-dark text-light p-2.5 px-6 rounded-lg text-lg font-semibold hover:bg-light hover:text-dark border-2 
                  border-solid border-transparent hover:border-dark dark:bg-light dark:text-dark hover:dark:bg-dark hover:dark:text-light hover:dark:border-light md:p-2 md:px-4 md:text-base"
                  download={true}
                >
                  Resume
                  <LinkArrow className={"w-6 ml-1"} />
                </Link>
                <Link
                  href="mailto:brianw.developer@gmail.com"
                  target="_blank"
                  className="ml-4 text-lg font-medium capitalize text-dark underline dark:text-light md:text-base"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </layout>

        <HireMe />
      </main>
    </>
  );
}
