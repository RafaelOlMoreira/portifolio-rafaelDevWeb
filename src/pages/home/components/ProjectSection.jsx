import React, { useState, useEffect, useRef } from 'react';
import { IoMdArrowForward } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import project1 from '../../../assets/project1.png';
import project2 from '../../../assets/project2.png';
import project3 from '../../../assets/project3.png';

gsap.registerPlugin(ScrollTrigger);

function ProjectSection() {
    const [selectedProject, setSelectedProject] = useState(null);
    const cardRefs = useRef([]);
    const modalRef = useRef(null);
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        const cards = cardRefs.current.filter(Boolean);
        if (cards.length === 0) return;

        gsap.set(cards, { opacity: 0, x: -60 });

        cards.forEach((card) => {
            gsap.to(card, {
                opacity: 1,
                x: 0,
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

    useEffect(() => {
        if (selectedProject && !isClosing && modalRef.current) {
            gsap.fromTo(modalRef.current,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
            );
        }
    }, [selectedProject, isClosing]);

    const openModal = (project) => {
        setSelectedProject(project);
        setIsClosing(false);
        document.body.style.overflow = 'hidden';
    };

    const handleClose = () => {
        if (!modalRef.current) return;
        setIsClosing(true);
        gsap.to(modalRef.current, {
            opacity: 0,
            y: 30,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                setSelectedProject(null);
                setIsClosing(false);
                document.body.style.overflow = 'auto';
            },
        });
    };

    return (
        <>
            <section className='bg-black h-auto pt-2'>
                <div className='flex items-center font-jetbrains'>
                    <div className='border text-[#737373]/20 w-full'></div>
                    <span className='text-[#737373] text-nowrap px-4 text-xs'>// --- projects logs ---</span>
                    <div className='border text-[#737373]/20 w-full'></div>
                </div>
                <div className='pt-24 px-4'>
                    <span className='text-[#737373] font-jetbrains text-sm flex items-center gap-2.5'>
                        <span className='text-[#00ff41] text-xs'>$</span>tail -f /var/log/projects.log
                    </span>

                    <div className='pt-2 flex flex-col'>
                        <span className='text-[#737373] text-2xl font-semibold'>
                            <span className='text-white'>Data</span>
                            <span className='text-[#F97316]'> Stream</span> / Projects Logs
                        </span>
                    </div>
                    <div className='pb-20 pt-10 flex flex-col gap-4'>
                        {card.map((project, idx) => (
                            <div
                                key={idx}
                                ref={el => cardRefs.current[idx] = el}
                                className='p-4 border border-[#737373]/20 hover:border-[#00ff41]/20 transition-all duration-300 rounded-md font-jetbrains text-sm hover:cursor-pointer'
                            >
                                <span className='text-[#737373] text-xs'>[{project.date}]</span>
                                <h1 className='pt-2 text-white'>
                                    <span className='text-[#00ff41]'>{'>'} Projeto:</span> {project.nameProject}{' '}
                                    <span className='border text-[10px] p-0.5 px-2 rounded-sm uppercase text-nowrap' style={{ color: project.color }}>
                                        {project.situation}
                                    </span>
                                </h1>
                                <div className='text-xs flex items-center gap-2'>
                                    <div className='flex flex-wrap items-center gap-2'>
                                        <span className='flex items-center gap-2 text-[#737373] pt-4'>
                                            Tech:
                                            {project.skill.map((item, i) => (
                                                <span className='bg-[#737373]/20 rounded-sm px-2 py-0.5 text-[#22d3ee] text-nowrap' key={i}>
                                                    {item}
                                                </span>
                                            ))}
                                        </span>
                                    </div>
                                </div>
                                <p className='text-[#737373] text-xs py-2'>{project.description}</p>
                                <button
                                    onClick={() => openModal(project)}
                                    className='group text-[#f97316] flex items-center gap-2 text-xs pt-3 hover:cursor-pointer hover:text-[#00ff41]'
                                >
                                    [ver artefato] <IoMdArrowForward className='size-3 group-hover:translate-x-0.5 duration-300' />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {selectedProject && !isClosing && (
                <div className='fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/60 transition-all duration-300'>
                    <div ref={modalRef} className='bg-black border border-[#00ff41]/40 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fadeInUp'>
                        {/* Header */}
                        <div className='flex items-center justify-between p-4 border-b border-[#00ff41]/20 bg-[#00ff41]/5'>
                            <h2 className='text-[#00ff41]/75 font-jetbrains text-xs'>
                                <span className=''>artifact_viewer - </span>
                                {selectedProject.nameProject}
                            </h2>
                            <button
                                onClick={handleClose}
                                className='text-[#737373] hover:text-white transition-colors duration-200'
                            >
                                <IoClose className='size-4' />
                            </button>
                        </div>

                        <div className='p-6'>
                            <div
                                style={{
                                    backgroundImage: `url(${selectedProject.image})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                className='w-full h-40 md:h-80 rounded-lg border border-[#737373]/20'
                            />
                        </div>

                        {/* Skills do projeto */}
                        <div className='px-6 pb-4'>
                            <div className='flex flex-wrap gap-2'>
                                {selectedProject.skill.map((tech, i) => (
                                    <span key={i} className='bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30 rounded-sm px-2.5 py-0.5 text-xs font-jetbrains'>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className='px-6 pb-8 space-y-6'>
                            <div>
                                <p className='text-[#737373] font-jetbrains text-sm leading-relaxed'>
                                    {selectedProject.description}
                                </p>
                            </div>

                            <div>
                                <h3 className='text-[#F97316] font-jetbrains text-sm font-semibold mb-3'>features:</h3>
                                <ul className='space-y-2'>
                                    {selectedProject.features.map((feature, i) => (
                                        <li key={i} className='text-gray-300 font-jetbrains text-xs flex items-start gap-2'>
                                            <span className='text-[#00ff41] font-bold'>+</span>
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default ProjectSection;

const card = [
    {
        date: '12-05-2026',
        nameProject: 'Hyzor',
        situation: 'ATIVO',
        color: '#00ff41',
        skill: ['React', 'Tailwind CSS', 'JavaScript'],
        description: 'Website institucional completo para empresa Hyzor com foco em performance, SEO e experiência do usuário. Design moderno com identidade visual forte.',
        image: project1,
        features: [
            'Design responsivo e mobile-first',
            'Otimização SEO com meta tags dinâmicas',
            'Integração com API de conteúdo',
            'Animações suaves com GSAP',
            'Modo noturno automático'
        ]
    },
    {
        date: '17-03-2026',
        nameProject: 'E-commerce',
        situation: 'Em Desenvolvimento',
        color: '#f97316',
        skill: ['React', 'Node.js', 'NoSQL'],
        description: 'Plataforma de e-commerce completa com carrinho de compras, pagamentos integrados, painel administrativo e gestão de produtos em tempo real.',
        image: project2,
        features: [
            'Carrinho de compras com persistência local',
            'Integração com gateway de pagamento',
            'Painel administrativo para produtos e pedidos',
            'Sistema de avaliações e comentários',
            'Relatórios de vendas em tempo real'
        ]
    },
    {
        date: '07-04-2026',
        nameProject: 'Landing Page',
        situation: 'Ativo',
        color: '#22d3ee',
        skill: ['React', 'Tailwind', 'JavaScript', 'AOS'],
        description: 'Landing page moderna e acolhedora para psicóloga clínica, com foco em experiência do usuário, identidade visual sofisticada e conversão de agendamentos.',
        image: project3,
        features: [
            'Formulário de contato integrado',
            'Design com cores suaves e tipografia elegante',
            'Seção de depoimentos animada',
            'CTA para agendamento online',
            'Totalmente responsivo'
        ]
    }
];