"use client";
import { useGSAP } from '@gsap/react'
import React from 'react'
import { gsap } from 'gsap';

const AboutMe = () => {

  useGSAP(() => {
    // Animation logic here
    gsap.to('.about-line', {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.about-line',
        start: 'top bottom',
        end: 'bottom top',
      }
    });
  })

  return (
    <section className='w-full common-padding h-[80vh]'>
      <div className='max-w-4xl text-lg md:text-2xl lg:text-3xl font-light mx-auto capitalize py-10 lg:py-30'>
        
        <span className='about-line translate-y-20 opacity-0'>
          full stack developer specializing in scalable architectures
        </span>
        <span className='about-line translate-y-20 opacity-0'>
          ai driven systems and production grade applications
        </span>
        <span className='about-line translate-y-20 opacity-0'>
          with deep focus on performance automation and
        </span>
        <span className='about-line translate-y-20 opacity-0'>
          intelligent workflows experienced in building end to end solutions from backend systems to user interfaces
        </span>
        <span className='about-line translate-y-20 opacity-0'>
          focused on writing clean maintainable code and efficient system design
        </span>
      </div>
    </section>
  )
}

export default AboutMe