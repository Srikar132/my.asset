export interface Project {
    title: string;
    description: string;
    category: string;
    type: "website" | "app";
    images: string[];
    urls: {
        github: string;
        live: string;
    };
    techStack: string[];
    bgImage : string;
    achievement : string;
}

const projects : Project[] = [
  {
    title: "LockIn",
    description: "AI-powered digital wellness platform with system-level app blocking, real-time usage tracking, and intelligent productivity assistance.",
    category: "AI + ANDROID SYSTEM",
    type: "app",
    images: [
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773937858/IMG_20260319_163850_bxelfz.jpg",
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773937857/IMG_20260319_163913_a2p9l1.jpg",
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773937856/IMG_20260319_210532_lh2kcp.jpg",
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773937857/IMG_20260319_163820_gbutp8.jpg"
    ],
    urls: {
      github: "https://github.com/Srikar132/lockin.git",
      live: ""
    },
    techStack: ["Flutter" , "Kotlin" , "Firebase"],
    bgImage : "https://res.cloudinary.com/diyxlznar/image/upload/v1773937858/IMG_20260319_163850_bxelfz.jpg",
    achievement : "🏆 Hackoverflow 2k25 Winner"
  },
  {
    title: "NEXUS AI",
    description: "LLM-driven agent platform that converts high-level ideas into structured codebases using multi-agent workflows and async task execution.",
    category: "AI AGENT PLATFORM",
    type: "website",
    images: [
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773937858/IMG-20260319-WA0011_sagnkq.jpg",
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773937857/IMG-20260319-WA0012_ytuqrb.jpg",
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773937855/IMG-20260319-WA0016_yopd78.jpg",
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773937855/IMG-20260319-WA0015_oavrxc.jpg",
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773937856/IMG-20260319-WA0018_d0nuiz.jpg",

    ],
    urls: {
      github: "",
      live: ""
    },
    techStack: ["Next.js" , "FastAPI" , "LangGraph"],
    bgImage : "https://res.cloudinary.com/diyxlznar/image/upload/v1773937855/IMG-20260319-WA0016_yopd78.jpg",
    achievement : "🎖️ Hackathon Consolation Prize"
  },
  {
    title: "HEAL VERSE",
    description: "AI-driven healthcare app for medication tracking, diet planning, and wellness routines with scalable backend APIs.",
    category: "HEALTHCARE AI",
    type: "app",
    images: [
        "https://res.cloudinary.com/diyxlznar/image/upload/v1773937869/IMG-20260319-WA0019_puxfk9.jpg",
        "https://res.cloudinary.com/diyxlznar/image/upload/v1773937869/IMG-20260319-WA0024_l4ihp6.jpg",
        "https://res.cloudinary.com/diyxlznar/image/upload/v1773937869/IMG-20260319-WA0025_qaukoo.jpg",
        "https://res.cloudinary.com/diyxlznar/image/upload/v1773937856/image-4_b3047o.png"
    ],
    urls: {
      github: "",
      live: ""
    },
    techStack: ["React Native" , "Spring Boot" , "AI"],
    bgImage : "",
    achievement : "🏆 Vedic Vision Hackathon Winner"
  },
];

export default projects;