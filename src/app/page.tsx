"use client"

import React, { useState } from "react";
import Image from "next/image";
import { FirstSection } from "@/components/sections/FirstSection";
import { SecondSection } from "@/components/sections/SecondSection";
import { ThirdSection } from "@/components/sections/ThirdSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Drill3 } from "@/components/Drill3";
import CustomizerScreen from "@/components/CustomizerScreen";

export default function Home() {
  const [onCustomizerScreen, setOnCustomizerScreen] = useState(false);
  const [selectedColor, setSelectedColor] = useState("default");

  return (
    <div className="relative min-h-screen">
      <Drill3 color={selectedColor} />
      {!onCustomizerScreen && (
        <>
        <Header />
          <FirstSection />
          <SecondSection />
          <ThirdSection setOnCustomizerScreen={setOnCustomizerScreen} />
          <Footer />
        </>
      )}

      {onCustomizerScreen && (
        <CustomizerScreen
          onRequestClose={() => {
            window.dispatchEvent(new Event('animateBackToAnim2'));
            setTimeout(() => setOnCustomizerScreen(false), 700);
          }}
          onColorChange={setSelectedColor}
        />
      )}
    </div>
  );
}
