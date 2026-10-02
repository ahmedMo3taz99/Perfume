import Navbar from './components/Navbar'
import HeroScene from './components/HeroScene'
import HeroContent from './components/HeroContent'
import ScentSection from './components/ScentSection'
import Footer from './components/Footer'
import Loader from './components/Loader'

export default function App() {
  return (
    <>
      {/* Canvas suspends inside its own reconciler, so the loader is driven by useProgress */}
      <Loader />
      <Navbar />
      {/* 3D canvas fixed — transparent where no bottle, sits between bg and text */}
      <HeroScene />
      <section id="hero" className="relative w-full h-screen bg-[#F5F0E8]">
        <div className="relative z-10 h-full">
          <HeroContent />
        </div>
      </section>
      <ScentSection />
      <Footer />
    </>
  )
}
