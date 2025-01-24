import React from "react";
import Head from "next/head";
import TransitionEffect from "@/components/TransitionEffect";
import Layout from "@/components/layout";
// import DndCharacterGenerator from "@/components/D&DCharacterGenerator"

const fun = () => {
    return (
        <>
            <Head>
                <title>Brian Williams | Fun Things</title>
                <meta name="Fun Things" content="A page of little widgets to play with using various techniques in modern development" />
            </Head>
            <TransitionEffect />
            <main className="w-full pb-16 mb-16 flex flex-col items-center justify-center overflow-hidden">
                <Layout underConstruction={true} className="pt-16 ">
                    <h1 className="text-light">Hello world</h1>
                    {/* <DndCharacterGenerator /> */}
                </Layout>
            </main>
        </>
    );
}

export default fun;