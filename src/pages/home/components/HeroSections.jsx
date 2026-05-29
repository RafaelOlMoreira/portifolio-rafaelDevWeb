import React, { useState, useEffect } from 'react';

import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

function HeroSections() {

  const [dataHora, setDataHora] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setDataHora(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatarDataHora = (date) => {
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <>
      <section className='bg-linear-to-b from-black to-[#000d04] pt-12 px-5'>
        <div className='flex flex-col text-[#737373] text-[12px] gap-1 font-jetbrains pb-3'>
          <span className='uppercase '>Bios Date {formatarDataHora(dataHora)} Ver 1.0.4</span>
          <span className='text-[#F97316]/70'>CPU: Rafael-Core i9 Extreme @ 4.2Ghz</span>
          <span className=''>Detecting primary master ... OK</span>
          <span className=''>Detecting primary slave ... NONE</span>
          <span className=''>Memory Test: 32768MB OK</span>
          <span className=''>Loading kernel modules ...</span>
          <span><span className='text-[#00ff41]/60'>[</span> [ OK ] Started frontend-dev.service <span className='text-[#00ff41]/60'>]</span></span>
          <span><span className='text-[#00ff41]/60'>[</span> [ OK ] Mounted /portfolio <span className='text-[#00ff41]/60'>]</span></span>
          <span><span className='text-[#00ff41]/60'>[</span> [ OK ] Started creative-engine daemon <span className='text-[#00ff41]/60'>]</span></span>
          <span className='text-[#00ff41]'>&gt; system_loading...</span>
          <span className='text-[#00ff41]'>&gt; user_online</span>
          <span className='text-[#00ff41]'>&gt; identity: Rafael Moreira</span>
          <span className='text-[#00ff41]'>&gt; role: Desenvolvedor Frontend</span>
          <span className='text-[#00ff41]'>&gt; status: READY</span>
        </div>
        <div className='py-2 pb-5 flex items-center text-[#737373]'>
          <div className='border-b text-[#737373]/30 w-full'></div>
          <span className='px-4 text-sm font-jetbrains'>system.ready</span>
          <div className='border-b text-[#737373]/30 w-full'></div>
        </div>
        <div className='flex flex-col items-center'>
          <h1 className='text-4xl font-bold font-jetbrains flex gap-4'><span className='text-white'>Rafael</span><span className='text-[#F97316]'>Moreira</span></h1>
          <span className='text-[#00ff41] font-mono pt-2'>{'<'} Desenvolvedor Frontend {'/>'}</span>
          <div className='pt-8 flex flex-col gap-3'>
            <button className='border border-[#00ff41]/40 p-3 px-6 text-[#737373] flex gap-3 rounded-lg'>
              <span>[</span>
              <span className='text-[#00ff41] font-semibold'>ENTER</span>
              <span>]</span>
            </button>
            <a href="#" className='text-[#00ff41] font-jetbrains'>&gt; <span className='text-[#737373] text-sm'>init_contact</span></a>
          </div>
          <div className='text-[#737373] font-jetbrains text-xs pt-6'>
            <span>scroll_to_continue</span>
          </div>
          <div className='flex gap-4 text-[#737373] py-5'>
            <FaGithub className='size-6 hover:text-white' />
            <FaLinkedinIn className='size-6 hover:text-white' />
            <MdOutlineEmail className='size-6 hover:text-white' />
          </div>
        </div>
      </section>
    </>
  )
}

export default HeroSections
