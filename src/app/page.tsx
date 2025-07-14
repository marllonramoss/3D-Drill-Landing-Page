import Image from "next/image";
import {FirstSection} from "@/components/sections/FirstSection";
import {SecondSection} from "@/components/sections/SecondSection";
import {ThirdSection} from "@/components/sections/ThirdSection";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Drill3 } from "@/components/Drill3";

export default function Home() {
  return (
    <div className="relative">
      <Header/>
      <Drill3/>
      <FirstSection />
      <SecondSection />
      <ThirdSection />
      <Footer/>

    </div>
  );
}
