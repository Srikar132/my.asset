export interface Project {
    title: string;
    description: string;
    category: string;
    type: string;
    images: string[];
    urls: {
        github: string;
        live: string;
    };
    techStack: string[];
}

export default [
  {
    title: "LockIn",
    description: "AI-powered digital wellness platform with system-level app blocking, real-time usage tracking, and intelligent productivity assistance.",
    category: "AI + ANDROID SYSTEM",
    type: "app",
    images: [
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773846569/Screenshot_2026-03-18_203734_idiscu.png",
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773846583/Screenshot_2026-03-18_203831_cvngrm.png"
    ],
    urls: {
      github: "https://github.com/Srikar132/lockin.git",
      live: ""
    },
    techStack: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    title: "NEXUS AI",
    description: "LLM-driven agent platform that converts high-level ideas into structured codebases using multi-agent workflows and async task execution.",
    category: "AI AGENT PLATFORM",
    type: "website",
    images: [
      "https://res.cloudinary.com/diyxlznar/image/upload/v1773846569/Screenshot_2026-03-18_203734_idiscu.png",
    ],
    urls: {
      github: "",
      live: ""
    },
    techStack: ["React", "Node.js", "Express", "MongoDB"]
  },
  {
    title: "HEAL VERSE",
    description: "AI-driven healthcare app for medication tracking, diet planning, and wellness routines with scalable backend APIs.",
    category: "HEALTHCARE AI",
    type: "mobile app",
    images: [
        "https://res.cloudinary.com/diyxlznar/image/upload/v1773846569/Screenshot_2026-03-18_203734_idiscu.png",
    ],
    urls: {
      github: "",
      live: ""
    }
  },
  // {
  //   title: "DEEPFAKE DETECTION",
  //   description: "Deep learning-based system for detecting manipulated media with real-time Chrome extension integration.",
  //   category: "COMPUTER VISION",
  //   type: "web + extension",
  //   images: [],
  //   urls: {
  //     github: "",
  //     live: ""
  //   }
  // },
  // {
  //   title: "FASHION E-COMMERCE PLATFORM",
  //   description: "Full-stack e-commerce system with authentication, product management, order workflows, and Razorpay integration.",
  //   category: "E-COMMERCE",
  //   type: "website",
  //   images: [],
  //   urls: {
  //     github: "",
  //     live: ""
  //   }
  // },
] as Project[];