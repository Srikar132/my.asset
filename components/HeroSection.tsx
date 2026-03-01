'use client';

import { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { TextPlugin } from 'gsap/TextPlugin';
import Navbar from './Navbar';
import LeftBrace from './LeftBrace';
import RightBrace from './RightBrace';
import Creative3DText from './Creative3DText';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Register TextPlugin
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {

    // References to DOM elements we'll animate
    const loadingBoxRef = useRef<HTMLDivElement>(null);
    const nameRef = useRef<HTMLHeadingElement>(null);
    const navbarRef = useRef<HTMLDivElement>(null);
    const renderingTextRef = useRef<HTMLHeadingElement>(null);
    const descriptionLinesRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        // Create a GSAP timeline for sequenced animations
        const tl = gsap.timeline();


        tl.fromTo(
            loadingBoxRef.current,
            {
                opacity: 0.5,
                scale: 0.5
            },
            {
                duration: 1.5,
                opacity: 1,
                ease: 'power3.inOut'
            }
        );

        // STEP 2: Wait 2 seconds (the loading phase)
        tl.to({}, { duration: 1 });

        // STEP 3: Move box upward to final position
        tl.to(loadingBoxRef.current, {
            y: -110,
            duration: 1.5,
            scale: 1,
            ease: 'power3.inOut'
        });

        // STEP 3.5: Animate text changes while box is settling using TextPlugin
        // Smoothly change "Rendering.." to "Hello!" character by character
        tl.to(renderingTextRef.current, {
            y: 0,
            ease: 'power3.inOut',
            duration: 0.8,
            fontSize: '0.8rem',
            scrub: true
        }, '-=1.2')

        tl.to(renderingTextRef.current, {
            duration: 0.8,
            text: {
                value: "Hello!",
                delimiter: "" // Character by character
            },
            ease: 'none'
        }, '-=1.2'); // Start during the box movement

        // Fade in the description text line by line with stagger
        tl.fromTo(
            descriptionLinesRef.current?.children || [],
            {
                opacity: 0,
                y: 20
            },
            {
                opacity: 0.8,
                y: 0,
                duration: 0.6,
                ease: 'power2.out',
                stagger: 0.15 // 0.15 second delay between each line
            },
            '-=0.4' // Overlap with text animation
        );

        // STEP 4: Fade in your name (starts slightly before box finishes moving)
        tl.fromTo(
            nameRef.current,
            {
                opacity: 0,
                y: 30 // Start 30px below
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power2.out'
            },
            '-=0.4' // Start 0.4s before previous animation ends (overlap)
        );

        // STEP 5: Slide down navbar
        tl.fromTo(
            navbarRef.current,
            {
                y: -100, // Start above viewport
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out'
            },
            '-=0.8' // Overlap with name animation
        );

        // Cleanup function
        return () => {
            tl.kill(); // Stop animation if component unmounts
        };
    }, []);



    return (
        <div className="relative h-screen overflow-hidden p-5">

            {/* NAVBAR */}
            <Navbar
                ref={navbarRef}
            />

            {/* HERO CONTENT */}
            <div className="flex flex-col items-center justify-center h-[80vh]">

                {/* LOADING BOX - Changes position based on loading state */}
                <div
                    ref={loadingBoxRef}
                    className="relative scale-50"
                >
                    <div className="backdrop-blur-md h-40 max-w-sm rounded-2xl  shadow-2xl flex items-center ">

                        {/* LEFT CURLY BRACE - SMOOTHER */}
                        <LeftBrace />

                        {/* CONTENT */}
                        <div className="space-y-2 text-xs flex-1 py-3 h-full flex flex-col justify-center  items-center text-center ">
                            {/* Changes from Rendering to Hello with fade */}
                            <h1
                                ref={renderingTextRef}
                                className='tracking-wide translate-y-10 text-xl '
                            >
                                Rendering..
                            </h1>

                            {/* Initially hidden content - animates in while settling */}
                            <div
                                ref={descriptionLinesRef}
                                className='text-white font-thin px-2 space-y-0.5 '
                            >
                                <p className='opacity-0 whitespace-nowrap'>I'm Srikar, a passionate software</p>
                                <p className='opacity-0 whitespace-nowrap'>developer specializing in crafting</p>
                                <p className='opacity-0 whitespace-nowrap'>immersive web experiences. With a</p>
                                <p className='opacity-0 whitespace-nowrap'>strong foundation in JavaScript.</p>
                            </div>
                        </div>

                        <RightBrace />

                    </div>
                </div>
            </div>
        </div>
    );
}