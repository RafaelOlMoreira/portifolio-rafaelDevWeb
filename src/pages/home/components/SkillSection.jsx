import React, { useState, useRef, useEffect } from 'react';
import { RiCodeBoxLine } from 'react-icons/ri';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function SkillSection() {
    const [expandedIndex, setExpandedIndex] = useState(null);
    const expandableRefs = useRef([]);
    const lineRefs = useRef([]);
    const cardRefs = useRef([]);

    const hexToRgba = (hex, alpha = 0.1) => {
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    useEffect(() => {
        skills.forEach((_, idx) => {
            const expandable = expandableRefs.current[idx];
            const line = lineRefs.current[idx];
            if (!expandable || !line) return;

            if (expandedIndex === idx) {
                gsap.to(expandable, {
                    height: expandable.scrollHeight,
                    duration: 0.8,
                    ease: 'power2.out',
                    overwrite: true,
                });
                gsap.to(line, {
                    width: '100%',
                    duration: 3.5,
                    ease: 'back.out(0.7)',
                    overwrite: true,
                });
            } else {
                gsap.to(expandable, {
                    height: 0,
                    duration: 0.4,
                    ease: 'power2.in',
                    overwrite: true,
                });
                gsap.to(line, {
                    width: '0%',
                    duration: 0.3,
                    ease: 'power2.in',
                    overwrite: true,
                });
            }
        });
    }, [expandedIndex]);

    useEffect(() => {
        const cards = cardRefs.current.filter(Boolean);
        if (cards.length === 0) return;

        gsap.set(cards, { opacity: 0, y: 50 });

        cards.forEach((card) => {
            gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            });
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const toggleExpand = (index) => {
        setExpandedIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const selectedSkill = expandedIndex !== null ? skills[expandedIndex] : null;
    const skillColor = selectedSkill ? `#${selectedSkill.color}` : '#00ff41';

    return (
        <section className='bg-black h-auto pt-10'>
            <div className='flex items-center font-jetbrains'>
                <div className='border text-[#737373]/20 w-full'></div>
                <span className='text-[#737373] text-nowrap px-4 text-xs'>// --- skills matrix ---</span>
                <div className='border text-[#737373]/20 w-full'></div>
            </div>

            <div className='py-16 px-4'>
                <span className='text-[#737373] font-jetbrains text-sm flex gap-2.5'>
                    <span className='text-[#00ff41]'>$</span>cat skills.json
                </span>

                <div className='pt-8 flex flex-col'>
                    <span className='text-[#737373] text-2xl font-semibold'>
                        <span className='text-white'>Core</span>
                        <span className='text-[#F97316]'> Dump</span> / Skills Matrix
                    </span>
                    <span className='text-[#737373] font-jetbrains text-xs pt-4 flex gap-1.5'>
                        <span className='text-[#00ff41]'>const</span>
                        <span className='text-[#F97316]'>skills</span> = [
                        <span className='text-[#22D3EE]'>{skills.length}</span>modules ]
                    </span>
                </div>

                <div className='flex flex-col pt-10 gap-3'>
                    {skills.map((skill, idx) => {
                        const isExpanded = expandedIndex === idx;
                        const skillHex = skill.color;
                        const cardColor = `#${skillHex}`;
                        const bgTransparent = hexToRgba(skillHex, 0.08);

                        return (
                            <div
                                key={skill.number}
                                ref={el => cardRefs.current[idx] = el}
                                className={`p-4 border rounded-md font-jetbrains transition-all duration-300 cursor-pointer
                                    ${isExpanded ? 'shadow-lg' : ''}`}
                                style={{
                                    color: cardColor,
                                    borderColor: cardColor,
                                    backgroundColor: isExpanded ? bgTransparent : 'transparent',
                                }}
                                onClick={() => toggleExpand(idx)}
                            >
                                <div className='flex items-center justify-between'>
                                    <span className='text-sm'>{skill.number}</span>
                                    <RiCodeBoxLine />
                                </div>
                                <p className='pt-2 font-semibold'>{skill.name}</p>
                                <button className="mt-1">
                                    <span className='text-[10px] font-extralight'>{skill.descripition}</span>
                                </button>

                                <div
                                    ref={el => expandableRefs.current[idx] = el}
                                    className="overflow-hidden"
                                    style={{ height: 0 }}
                                >
                                    <div className="mt-4">
                                        <p className="text-xs text-gray-300 leading-relaxed"
                                            style={{ color: cardColor }}>
                                            {skill.textDescripition}
                                        </p>
                                        <div
                                            ref={el => lineRefs.current[idx] = el}
                                            className="h-0.5 bg-current mt-3 rounded-full"
                                            style={{ width: '0%' }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {selectedSkill && (
                    <div className='border rounded-md p-4 border-[#737373] mt-10 font-jetbrains transition-all duration-500'>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm text-[#00ff41]'>$</span>
                            <span className='text-xs text-[#f97316]'>{selectedSkill.descripition}</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <span className='text-sm text-[#22d3ee]'>→ <span className='text-[#737373] text-xs'>{selectedSkill.textDescripition}</span></span>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
}

export default SkillSection;

const skills = [
    {
        color: '00ff41',
        number: '01',
        name: 'React',
        descripition: 'react --version',
        textDescripition: 'Biblioteca UI para construção de interfaces interativas e componentes reutilizáveis.',
    },
    {
        color: '22d3ee',
        number: '02',
        name: 'Tailwind CSS',
        descripition: 'tailwind --build',
        textDescripition: 'Framework CSS utility-first para estilização rápida e responsiva.',
    },
    {
        color: 'F97316',
        number: '03',
        name: 'JavaScript',
        descripition: 'node --eval',
        textDescripition: 'Linguagem principal para lógica de frontend e manipulação de DOM.',
    },
    {
        color: '00ff41',
        number: '04',
        name: 'GSAP',
        descripition: 'gsap.animate()',
        textDescripition: 'Biblioteca de animação profissional para web com performance avançada.',
    },
    {
        color: '22d3ee',
        number: '05',
        name: 'AI Integration',
        descripition: 'ai --prompt',
        textDescripition: 'Integração de APIs de inteligência artificial em aplicações web.',
    },
    {
        color: 'F97316',
        number: '06',
        name: 'Responsividade',
        descripition: 'css --responsive',
        textDescripition: 'Design adaptável para todos os dispositivos e tamanhos de tela.',
    },
    {
        color: '00ff41',
        number: '07',
        name: 'UI/UX',
        descripition: 'design --export',
        textDescripition: 'Criação de interfaces intuitivas com foco na experiência do usuário.',
    },
    {
        color: '22d3ee',
        number: '08',
        name: 'Git',
        descripition: 'git --commit',
        textDescripition: 'Controle de versão e colaboração em projetos de desenvolvimento.',
    },
];