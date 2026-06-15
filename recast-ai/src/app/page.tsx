import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Preloader from '@/components/ui/Preloader'
import Hero from '@/components/sections/Hero'
import EditorialText from '@/components/sections/EditorialText'
import HowItWorks from '@/components/sections/HowItWorks'
import Features from '@/components/sections/Features'
import Marquee from '@/components/sections/Marquee'
import Pricing from '@/components/sections/Pricing'
import FinalCTA from '@/components/sections/FinalCTA'

export default function HomePage() {
  return (
    <SmoothScrollProvider>
      <Preloader />
      <Navbar />
      <main>
        <Hero />
        <EditorialText />
        <HowItWorks />
        <Features />
        <Marquee />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </SmoothScrollProvider>
  )
}
