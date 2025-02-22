import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
import CTA from "@/components/cta"
import Footer from "@/components/footer"
import GradientBackground from "@/components/gradient-background"
import ContactUs from "../components/Contact"
import OurMission from "../components/Mission"
import HowItWorks from "../components/HowItWorks"
import OurTeam from "../components/Team"

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Background gradients */}
      <GradientBackground />

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <OurTeam/>
        <OurMission/>
        <HowItWorks/>
        <CTA />
        <ContactUs/>
        <Footer />
      </div>
    </div>
  )
}

