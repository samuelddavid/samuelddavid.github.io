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
    image: '/images/projects/indiaai.jpg',
    imageAlt: 'Madhya Pradesh delegation at the IndiaAI Impact Summit 2026',
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
    metric: 'Finalist · top 80 of 1,700 · Municipal Corporation of Indore',
    tags: ['MERN', 'RBAC', 'Real-time Tracking'],
    image: '/images/projects/municipal-assets.jpg',
    imageAlt: 'Municipal inventory and asset management system — Indore Municipal Corporation site',
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

/** Photo strip — images pulled from LinkedIn posts, in /public/images/photos/. */
export const photos = [
  { src: '/images/photos/indiaai-summit.jpg', alt: 'MP pavilion at the IndiaAI Impact Summit 2026, New Delhi', caption: 'IndiaAI Summit 2026 · New Delhi' },
  { src: '/images/photos/mahakumbh.jpg', alt: 'Core organiser badge at the Ujjain Mahakumbh National Hackathon', caption: 'Mahakumbh Hackathon · Ujjain · Core Organiser' },
  { src: '/images/photos/roundtable.jpg', alt: 'Roundtable Conference on State Statistical & Data Management Systems, AIGGPA Bhopal', caption: 'Policy Roundtable · AIGGPA, Bhopal · Jul 2025' },
  { src: '/images/photos/lakecity-hack.jpg', alt: 'Organising team at Lakecity Hack 2025', caption: 'Lakecity Hack 2025 · 500+ builders' },
  { src: '/images/photos/accathon.jpg', alt: 'Receiving 2nd place at Accathon 2.0, Nirma University', caption: 'Accathon 2.0 · 2nd, National · Nirma University' },
  { src: '/images/photos/iciaset.jpg', alt: 'Presenting research paper at ICIASET-2024, Bhopal', caption: 'ICIASET-2024 · Research paper presented' },
  { src: '/images/photos/enventure.jpg', alt: 'Case Quest AI consulting challenge at Enventure ’25, St. Xavier’s Mumbai', caption: 'Enventure ’25 · AI Case Quest · Mumbai' },
  { src: '/images/photos/ficticorp.jpg', alt: 'Finalist certificate, Ficti Corp Challenge at BECon, eDC IIT Delhi', caption: 'Ficti Corp Challenge · Finalist · IIT Delhi' },
  { src: '/images/photos/mpsedc-booth.jpg', alt: 'MPSeDC innovation lab booth', caption: 'MPSeDC · State IT Centre' },
  { src: '/images/photos/jlu-podium.jpg', alt: 'Speaking at the podium, Jagran Lakecity University', caption: 'JLU · Bhopal' },
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
