/**
 * Verbatim portfolio content for Syed Muaviz ur Rehman.
 * All texts, quotes, highlights, and credentials are kept exactly as supplied.
 */

export interface PlanetProject {
  id: string;
  serial: string;
  name: string;
  colorName: string;
  colorHex: string;
  glowHex: string;
  hasRing?: boolean;
  orbitRadiusX: number;
  orbitRadiusZ: number;
  orbitSpeed: number;
  size: number;
  tiltAngle: number;
  date: string;
  type: string;
  tagline: string;
  overview: string;
  highlights: string[];
  tech: string[];
  links: {
    label: string;
    url?: string;
    isPlaceholder?: boolean;
    note?: string;
  }[];
}

export interface ResearchInterest {
  title: string;
  description: string;
}

export interface TimelineItem {
  when: string;
  what: string;
  institution?: string;
  details?: string;
}

export interface SkillConstellation {
  category: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
}

export const PORTFOLIO_CONTENT = {
  meta: {
    title: "Syed Muaviz ur Rehman | AI Safety & ML Theory Researcher",
    description:
      "Portfolio of Syed Muaviz ur Rehman, a computer science graduate researching LLM agent alignment, AI evaluation and the geometry of generalization.",
    wordmark: "Syed Muaviz ur Rehman",
    nav: [
      { id: "hero", label: "Home" },
      { id: "projects", label: "Projects" },
      { id: "about", label: "About" },
      { id: "skills", label: "Skills" },
      { id: "contact", label: "Contact" },
    ],
  },
  hero: {
    eyebrow: "AI SAFETY, ALIGNMENT & ML THEORY",
    headlineLine1: "I research",
    headlineLine2: "safer AI",
    subCopy:
      "From group-theoretic studies of generalization to cloud ML pipelines and robotics digital twins, I work on how AI systems learn, fail and stay steerable.",
    primaryCTA: "Explore my work",
    secondaryCTA: "More about me",
    footerTags: [
      "LLM AGENT ALIGNMENT",
      "RED-TEAMING & EVALUATION",
      "ML THEORY",
    ],
    scrollHint: "Scroll to explore",
  },
  hud: {
    solarSystemHint: "Choose a planet to explore the project",
    returnToHero: "Return to hero",
    classicViewToggle: "Classic view",
    cosmosViewToggle: "Cosmic 3D view",
    soundOn: "Cosmic audio on",
    soundOff: "Cosmic audio muted",
  },
  planets: [
    {
      id: "rubiks-cayley",
      serial: "01",
      name: "Rubik's AI & Cayley Graph Visualizer",
      colorName: "cosmic purple",
      colorHex: "#5C4B8A",
      glowHex: "#8B72D4",
      orbitRadiusX: 5.6,
      orbitRadiusZ: 4.8,
      orbitSpeed: 0.22,
      size: 0.65,
      tiltAngle: 0.12,
      date: "September 2026",
      type: "Independent theoretical AI research",
      tagline:
        "The Rubik's Cube is secretly the same math problem your AI model solves every day.",
      overview:
        "An independent study of combinatorial state-space optimization through group theory. The cube's permutation group is modelled as a Cayley graph to examine how learning systems move through discrete, non-Euclidean search spaces, motivated by open questions about how deep networks generalize.",
      highlights: [
        "Modelled the Rubik's Cube permutation group G as a Cayley graph.",
        "Implemented A*, BFS and heuristic neural-network search in Python.",
        "Built interactive visualizations of symmetry-aware representations and optimization convergence trajectories.",
      ],
      tech: [
        "Python",
        "NetworkX",
        "PyTorch",
        "Matplotlib",
        "Group Theory",
      ],
      links: [
        { label: "GitHub repo", isPlaceholder: true, note: "[GitHub repo]" },
        { label: "Live visualizer", isPlaceholder: true, note: "[Live visualizer]" },
      ],
    },
    {
      id: "azure-ml-pipeline",
      serial: "02",
      name: "Azure AI Cloud ML Pipeline",
      colorName: "cool tech blue with bright gold ring",
      colorHex: "#4A7BB0",
      glowHex: "#6CA4E8",
      hasRing: true,
      orbitRadiusX: 7.8,
      orbitRadiusZ: 6.8,
      orbitSpeed: 0.18,
      size: 0.75,
      tiltAngle: -0.15,
      date: "Govt. Technical College Kohati Bazar, Rawalpindi",
      type: "Applied dataset research",
      tagline: "Benchmarking models in the cloud, end to end.",
      overview:
        "Dataset research using Microsoft Azure AI Services during intensive training under National-Level Master Trainer Touseef Ahmad Abbasi, covering predictive modelling and result analysis on benchmark datasets including Titanic survival.",
      highlights: [
        "Used Azure Automated ML and custom scikit-learn pipelines.",
        "Analyzed hyperparameter sensitivity, feature importance and evaluation metrics.",
        "Applied cloud-native pipelines for preprocessing, classification validation and automated benchmarking.",
      ],
      tech: [
        "Azure ML Studio",
        "Automated ML",
        "scikit-learn",
        "Pandas",
        "AI-900/AI-901",
      ],
      links: [
        {
          label: "Notebook or write-up",
          isPlaceholder: true,
          note: "[Notebook or write-up]",
        },
      ],
    },
    {
      id: "catch-vr",
      serial: "03",
      name: "CATCH-VR Digital Twin",
      colorName: "warm amber",
      colorHex: "#E58F42",
      glowHex: "#FFA858",
      orbitRadiusX: 10.2,
      orbitRadiusZ: 8.8,
      orbitSpeed: 0.14,
      size: 0.7,
      tiltAngle: 0.18,
      date: "Erasmus+ CATCH-VR Summer School 2026, GIK Institute",
      type: "Specialized research project",
      tagline: "A digital twin for robots that learn to navigate.",
      overview:
        "A digital twin framework that simulates robotic navigation in complex environments with AI-driven adaptive control, combined with IoT sensing and immersive human-robot interaction.",
      highlights: [
        "Built a Digital Twin framework for robotic navigation.",
        "Designed IoT-enabled sensing for real-time feedback and closed-loop control.",
        "Applied VR/AR to create immersive HRI environments.",
        "Explored sensing, simulation and adaptive control for medical robotics and embodied intelligence.",
      ],
      tech: [
        "Digital Twin",
        "IoT",
        "VR/AR",
        "Adaptive Control",
      ],
      links: [
        {
          label: "Project page or poster",
          isPlaceholder: true,
          note: "[Project page or poster]",
        },
      ],
    },
    {
      id: "peer-reviewed-paper",
      serial: "04",
      name: "Peer-Reviewed Publication",
      colorName: "ivory marble with gold accents",
      colorHex: "#EAE5D9",
      glowHex: "#D9B45A",
      orbitRadiusX: 12.6,
      orbitRadiusZ: 10.8,
      orbitSpeed: 0.11,
      size: 0.8,
      tiltAngle: -0.08,
      date: "March 2026",
      type: "Journal of Management Science Research Review",
      tagline: "AI for better decisions in business.",
      overview:
        '"Leveraging Artificial Intelligence in Business Management: Optimizing Decision-Making and Operational Efficiency through Advanced Computer Science Techniques." Syed Muaviz ur Rehman, et al.',
      highlights: [
        "Authored peer-reviewed paper published in Journal of Management Science Research Review.",
        "Investigated algorithmic decision pipelines and operational efficiency optimizations.",
        "Permanent archival and citation indexing under registered DOI 10.5281/zenodo.18829960.",
      ],
      tech: [
        "Decision Science",
        "Operational ML",
        "Empirical Validation",
        "Optimization",
      ],
      links: [
        {
          label: "Read the paper (DOI 10.5281/zenodo.18829960)",
          url: "https://doi.org/10.5281/zenodo.18829960",
          isPlaceholder: false,
        },
        {
          label: "Google Scholar profile",
          isPlaceholder: true,
          note: "[Google Scholar profile]",
        },
      ],
    },
    {
      id: "bank-analytics",
      serial: "05",
      name: "Bank-Transaction Analytics",
      colorName: "frosted silver-white",
      colorHex: "#CBD5E1",
      glowHex: "#F1F5F9",
      orbitRadiusX: 14.8,
      orbitRadiusZ: 12.6,
      orbitSpeed: 0.085,
      size: 0.65,
      tiltAngle: 0.22,
      date: "Jul to Oct 2024",
      type: "Python Development Trainee, NUTECH / NAVTTC, Islamabad",
      tagline: "Finding the irregular in everyday spending.",
      overview:
        "Capstone of a three-month Advanced Python Programming and Applications program (Grade A+): statistical modelling on a real bank-transaction dataset to detect spending patterns and irregularities.",
      highlights: [
        "Analyzed large-scale banking transactions for anomaly and irregularity detection.",
        "Built statistical distribution models for consumer spending profiles.",
        "Awarded Grade A+ at NUTECH / NAVTTC capstone presentation.",
      ],
      tech: [
        "Python",
        "Pandas",
        "NumPy",
        "Matplotlib",
      ],
      links: [
        {
          label: "GitHub repo",
          isPlaceholder: true,
          note: "[GitHub repo]",
        },
      ],
    },
    {
      id: "tourism-data",
      serial: "06",
      name: "Tourism Data Consolidation",
      colorName: "terracotta earthy marble",
      colorHex: "#C86D51",
      glowHex: "#E5876B",
      orbitRadiusX: 17.0,
      orbitRadiusZ: 14.4,
      orbitSpeed: 0.065,
      size: 0.7,
      tiltAngle: -0.18,
      date: "Jul 2026 to present",
      type: "IT & Data Support, Tourism Development Corporation of Punjab, Rawalpindi",
      tagline: "Turning scattered records into one clean dataset.",
      overview:
        "Cleaned and consolidated tourism data from multiple sources into a new structured dataset, alongside IT support and digital-records work for the regional office.",
      highlights: [
        "Unified heterogeneous regional tourism data silos into consolidated relational formats.",
        "Engineered verification rules and automated cleaning scripts.",
        "Maintained digital infrastructure and data integrity across Punjab tourism records.",
      ],
      tech: [
        "Data Cleaning",
        "Python",
        "Digital Records",
      ],
      links: [],
    },
  ] as PlanetProject[],

  about: {
    heading: "The person at the centre",
    bio: "I'm a Computer Science graduate (BSCS, CGPA 3.90/4.00) from Thal University and a Honhaar Scholar, with a quantitative foundation in optimization, group theory and applied machine learning. I'm Microsoft Certified in Azure AI (AI-900/AI-901) and author of a peer-reviewed AI paper. I'm now looking to move directly into doctoral research, focused on making increasingly capable AI systems safe, measurable and steerable.",
    honhaarBadge: "Honhaar Scholar · Fully Funded Merit Scholarship",
    cgpaBadge: "CGPA 3.90 / 4.00 · Thal University",
    interests: [
      {
        title: "LLM Agent Alignment & Safety",
        description:
          "Alignment of autonomous LLM agents, scalable oversight, and emerging risks from agentic systems.",
      },
      {
        title: "AI Evaluation & Red-Teaming",
        description:
          "Jailbreak defenses, adversarial robustness and rigorous benchmarking of frontier model capability and safety.",
      },
      {
        title: "Generalization & ML Theory",
        description:
          "Loss-landscape geometry, mode connectivity, sharpness-aware minimization, and group-theoretic views of how models generalize and stay steerable.",
      },
      {
        title: "Computer Vision & Robustness",
        description:
          "Adversarial attacks, certified defenses and robust representations under distribution shift.",
      },
    ] as ResearchInterest[],
    timeline: [
      {
        when: "Sep 2022 to Jun 2026",
        what: "BSCS, Thal University, Bhakkar. CGPA 3.90/4.00. Coursework: Machine Learning, Probability & Statistics, Algebra, Discrete Math, Data Structures & Algorithms, Software Testing & Verification",
      },
      {
        when: "2026",
        what: "Honhaar Scholar: fully funded, merit-based scholarship (PHEC & Government of Pakistan)",
      },
      {
        when: "Phase IV",
        what: "Prime Minister's Youth Laptop Scheme awardee, for academic excellence",
      },
      {
        when: "30 Jun 2026",
        what: "Participant, international workshop on Research Methodology, Data Analysis and Publication (Maryam Abacha American University of Nigeria)",
      },
      {
        when: "Ongoing",
        what: "Technical Event Coordinator, Thal University IT Club: workshops and seminars on Data Science and AI",
      },
    ] as TimelineItem[],
  },

  skills: {
    heading: "Skills & Constellations",
    subheading:
      "A map of theoretical foundations, engineering tools, and verified proficiencies.",
    constellations: [
      {
        category: "Languages & tools",
        skills: [
          "Python (Advanced)",
          "C++",
          "JavaScript",
          "PyTest",
          "Git",
          "GitHub",
          "Linux/Bash",
        ],
      },
      {
        category: "AI / ML",
        skills: [
          "PyTorch",
          "scikit-learn",
          "NumPy",
          "Pandas",
          "Matplotlib",
          "SciPy",
          "NetworkX",
          "LLM evaluation frameworks",
        ],
      },
      {
        category: "Cloud & AI platforms",
        skills: [
          "Microsoft Azure AI",
          "Azure ML Studio",
          "Automated ML workflows",
        ],
      },
      {
        category: "Theory & methods",
        skills: [
          "Mathematical modelling",
          "Optimization",
          "Probability & statistics",
          "Group theory",
          "Graph search",
          "Empirical benchmarking",
        ],
      },
    ] as SkillConstellation[],
    certifications: [
      {
        title: "Microsoft Certified: Azure AI Fundamentals",
        issuer: "AI-900 / AI-901",
        date: "Certified",
      },
      {
        title: "IT Specialist: Python",
        issuer: "Pearson VUE / Certiport",
        date: "Jan 2025",
      },
      {
        title: "Advanced Python Programming & Applications",
        issuer: "NUTECH / NAVTTC (Grade A+)",
        date: "2024",
      },
      {
        title: "Python Essentials 1",
        issuer: "Cisco Networking Academy",
        date: "Jul 2026",
      },
      {
        title: "Python for Data Science 101",
        issuer: "IBM / Cognitive Class",
        date: "Jul 2026",
      },
      {
        title: "Introduction to Databases",
        issuer: "Meta via Coursera",
        date: "Apr 2024",
      },
    ] as Certification[],
  },

  contact: {
    heading: "Let's talk research",
    copy: "I'm open to PhD opportunities, research collaborations and internships in AI safety, evaluation and ML theory.",
    email: "syedmuavizurrehman0198@gmail.com",
    location: "Bhakkar, Punjab, Pakistan",
    links: [
      { label: "LinkedIn", isPlaceholder: true, note: "[LinkedIn URL]" },
      { label: "GitHub", isPlaceholder: true, note: "[GitHub URL]" },
      { label: "Google Scholar", isPlaceholder: true, note: "[Google Scholar URL]" },
      { label: "Download CV (PDF)", isPlaceholder: true, note: "[Download CV (PDF)]" },
    ],
    footer: "© 2026 Syed Muaviz ur Rehman. Built as a small universe.",
    note: "Phone number and academic referees are available on request for academic and research opportunities.",
  },
};
