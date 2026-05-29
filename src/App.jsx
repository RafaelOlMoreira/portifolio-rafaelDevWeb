import React from 'react'
import Navbar from './pages/home/components/Navbar'
import HeroSections from './pages/home/components/HeroSections'
import SkillSection from './pages/home/components/SkillSection'
import ProjectSection from './pages/home/components/ProjectSection'

function App() {
    return (
        <>
            <Navbar />

            <HeroSections />
            <SkillSection />
            <ProjectSection />
        </>
    )
}

export default App
