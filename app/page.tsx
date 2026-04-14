
import Navbar from '@/components/sections/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Services from '@/components/sections/Services'
import WhyMe from '@/components/sections/WhyMe'
import Projects from '@/components/sections/Projects'
import Timeline from '@/components/sections/Timeline'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <WhyMe />
        <Projects />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
