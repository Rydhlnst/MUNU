"use client";

import Image from "next/image";
import React from "react";

const UnderConstructionPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-16 bg-background text-foreground">
      <Image
        src="/onBuild.svg"
        alt="Page Under Construction"
        height={400}
        width={400}
        className="mb-8"
      />
      <h1 className="text-3xl md:text-4xl font-bold mb-4">
        This Page is Still Under Construction
      </h1>
      <p className="text-muted-foreground max-w-xl text-base md:text-lg">
        We&apos;re currently working hard to build something amazing for you.
        <br />
        Stay tuned — this section will be available very soon as part of the full <span className="text-primary">MUNU</span> experience.
      </p>
    </div>
  );
};

export default UnderConstructionPage;
