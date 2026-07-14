/**
 * ─────────────────────────────────────────────────────────────────────────
 *  SITE CONTENT — single source of truth. Populated from Samuel_Resume.pdf.
 *  Remaining [PLACEHOLDER] items are mostly images and project links.
 *  Images: drop files into /public/images/... and set the paths below.
 *  When `image` is null, a styled gradient placeholder renders instead.
 * ─────────────────────────────────────────────────────────────────────────
 */

export const site = {
  name: 'Samuel David', // display name (résumé: Samuel D. David)
  role: 'AI Engineer / Software Developer',
  tagline: 'AI engineer building for governance at scale.',
  location: 'Bhopal, India',
  email: 'samueld.david01@gmail.com',
  phone: '+91 9993393096',
  availability: 'Open to full-time roles · 2026',
  resumeUrl: '/Samuel_David_Resume.pdf',
  socials: {
    github: 'https://github.com/samuelddavid',
    linkedin: 'https://linkedin.com/in/samueld-david',
  },
}

export const about = {
  portrait: '/images/portrait.webp', // from LinkedIn profile — swap for a higher-res original anytime
  portraitAlt: 'Portrait of Samuel David',
  paragraphs: [
    `I work where AI meets government. At MPSeDC I automated departmental
     reporting through the CM Pragati Dashboard — cutting manual consolidation
     effort by ~40% — and co-facilitated the IndiaAI Impact Summit 2026 in
     New Delhi. At Rajya NITI Aayog I turned multi-department datasets into
     governance insights for policy-level decisions.`,
    `Final-year BCA (Hons.) at Jagran Lakecity University (9.1 CGPA, class of
     2026) and Chancellor's Scholar. National winner at Transparify, 2nd at
     Accathon 2.0, and I've directed a 35-member team running a 500+
     participant state hackathon. Toolkit: Python, RAG pipelines,
     LangChain / LangGraph / LlamaIndex, FAISS and Pinecone.`,
  ],
  stats: [
    { value: '9.1', label: 'CGPA · BCA (Hons.), JLU 2026' },
    { value: '2', label: 'National hackathon podiums' },
    { value: '500+', label: 'Participants at Lakecity Hack 2025, led a 35-member team' },
  ],
}

export const experience = [
  {
    org: 'MPSeDC',
    role: 'Technology Intern',
    period: 'Aug – Oct 2025 · Feb 2026 – Present',
    summary:
      'M.P. State Electronics Development Corporation — state digital governance systems.',
    points: [
      'Orchestrated automation of departmental reporting through the CM Pragati Dashboard, reducing manual consolidation effort by ~40%.',
      'Architected WhatsApp-based dissemination workflows, accelerating inter-departmental reporting cycles.',
      'Collaborated on the strategic evaluation of Madhya Pradesh’s space-tech ecosystem alongside EY stakeholders.',
      'Co-facilitated execution of the IndiaAI Impact Summit 2026 (New Delhi), coordinating stakeholders across policy, industry and AI research.',
    ],
  },
  {
    org: 'Rajya NITI Aayog',
    role: 'Policy & Data Analytics Intern',
    period: 'Jun – Jul 2025',
    summary: 'Government of Madhya Pradesh — data-driven policy support.',
    points: [
      'Analysed multi-department datasets to derive governance insights for policy-level decision-making.',
      'Restructured website information architecture to improve accessibility and public usability.',
      'Supported inter-department administrative reporting frameworks.',
    ],
  },
  {
    org: 'IntelliSquare',
    role: 'AI & Technology Consultant',
    period: 'Aug – Nov 2024',
    summary: 'Conversational AI consulting and delivery.',
    points: [
      'Engineered conversational logic improvements for AI chatbot systems, enhancing user engagement.',
      'Streamlined bot validation processes through structured functional testing.',
      'Assisted in campaign analytics and execution strategy.',
    ],
  },
]

export const projects = [
  {
    title: 'CM Pragati Dashboard',
    description:
      'Automated departmental reporting for the Chief Minister’s office at MPSeDC — with WhatsApp-based dissemination workflows that sped up inter-departmental reporting cycles.',
    metric: '~40% less manual consolidation · statewide',
    tags: ['Python', 'Dashboards', 'Automation', 'WhatsApp workflows'],
    image: null, // [PLACEHOLDER] '/images/projects/cm-pragati.webp' (16:10)
    imageAlt: 'CM Pragati Dashboard interface',
    live: null, // internal government system — link a case study if you write one
    github: null,
  },
  {
    title: 'Transparify',
    description:
      'National-winning transaction monitoring & audit platform — checksum-based validation for transaction integrity and structured audit-trail logging for fraud detection.',
    metric: 'National Winner',
    tags: ['FinTech', 'Audit Systems', 'Data Integrity'],
    image: null, // [PLACEHOLDER] '/images/projects/transparify.webp'
    imageAlt: 'Transparify transaction monitoring platform',
    live: '#', // [PLACEHOLDER] demo/case-study link
    github: '#', // [PLACEHOLDER]
  },
  {
    title: 'IndiaAI Impact Summit 2026',
    description:
      'Co-facilitated execution of India’s flagship national AI summit in New Delhi — coordinating stakeholders across policy, industry and AI research ecosystems.',
    metric: 'National stage · New Delhi',
    tags: ['AI Policy', 'IndiaAI', 'Stakeholder Ops'],
    image: null, // [PLACEHOLDER] '/images/projects/indiaai.webp'
    imageAlt: 'IndiaAI Impact Summit 2026',
    live: '#', // [PLACEHOLDER] summit / coverage link
    github: null,
  },
  {
    title: 'JLU Orbit',
    description:
      'Campus-wide academic networking & research platform — blog publishing, academic portfolios and a Research Hub simulating real-world academic workflows.',
    metric: 'Deployed · School of Science & Technology',
    tags: ['MERN', 'React', 'MongoDB', 'REST APIs'],
    image: null, // [PLACEHOLDER] '/images/projects/jlu-orbit.webp'
    imageAlt: 'JLU Orbit academic platform',
    live: '#', // [PLACEHOLDER]
    github: '#', // [PLACEHOLDER]
  },
  {
    title: 'Municipal Asset Management',
    description:
      'Centralised municipal inventory & asset management system — role-based access controls, maintenance logs and real-time asset tracking across departments.',
    metric: 'Hackathon Finalist · Acropolis, Indore',
    tags: ['MERN', 'RBAC', 'Real-time Tracking'],
    image: null, // [PLACEHOLDER] '/images/projects/municipal-assets.webp'
    imageAlt: 'Municipal inventory and asset management system',
    live: null,
    github: '#', // [PLACEHOLDER]
  },
  {
    title: 'Training Needs Assessment',
    description:
      'Statewide TNA dashboards mapping skill gaps across government departments to drive training policy.',
    metric: 'Statewide · every department · one view',
    tags: ['Python', 'Data Analytics', 'Dashboards'],
    image: null, // [PLACEHOLDER] '/images/projects/tna.webp'
    imageAlt: 'Training Needs Assessment dashboard',
    live: null,
    github: null,
  },
]

/** Photo strip — drop images in /public/images/photos/ and list them here. */
export const photos = [
  { src: null, alt: '[PLACEHOLDER] At the IndiaAI Impact Summit 2026, New Delhi', caption: 'IndiaAI Summit 2026 · New Delhi' },
  { src: null, alt: '[PLACEHOLDER] Transparify winning moment', caption: 'Transparify — National Winner' },
  { src: null, alt: '[PLACEHOLDER] Accathon 2.0 at Nirma University', caption: 'Accathon 2.0 · 2nd, National' },
  { src: null, alt: '[PLACEHOLDER] Directing Lakecity Hack 2025', caption: 'Lakecity Hack 2025 · 500+ builders' },
  { src: null, alt: '[PLACEHOLDER] Ujjain Mahakumbh National Hackathon operations', caption: 'Mahakumbh Hackathon · Ujjain' },
  { src: null, alt: '[PLACEHOLDER] At MPSeDC, Bhopal', caption: 'MPSeDC · Bhopal' },
  { src: null, alt: '[PLACEHOLDER] Campus shot at Jagran Lakecity University', caption: 'JLU · Bhopal' },
  { src: null, alt: '[PLACEHOLDER] Candid / travel photo', caption: 'Off the clock' },
]

export const skills = [
  {
    group: 'AI / Data',
    items: [
      'RAG Pipelines', 'Prompt Engineering', 'Semantic Search',
      'AI Workflow Automation', 'LLM Integration', 'LangChain', 'LangGraph',
      'LlamaIndex', 'FAISS', 'Pinecone', 'Hugging Face',
    ],
  },
  {
    group: 'Back-end & Data',
    items: ['Python', 'Node.js', 'Express', 'MongoDB', 'SQL', 'REST APIs'],
  },
  {
    group: 'Front-end',
    items: ['React', 'JavaScript', 'HTML/CSS', 'MERN Stack'],
  },
  {
    group: 'Tools & Practice',
    items: ['Git & GitHub', 'Postman', 'Dashboards & Reporting', 'Stakeholder Management'],
  },
]

export const navLinks = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Work', id: 'work' },
  { label: 'Skills', id: 'skills' },
  { label: 'Contact', id: 'contact' },
]
