/**
 * Multi-Event Registry & Certificate Template Catalog
 */
export const EVENT_CATALOG = {
  'automate-india-2026': {
    id: 'automate-india-2026',
    name: 'Automate India Hackathon 2026',
    shortName: 'Automate India 2026',
    track: 'Notion Track & AI Agents',
    organization: 'Automate India Innovation Labs',
    signatory: 'Dr. Vikramaditya Roy',
    signatoryTitle: 'Lead Convener & Hackathon Director',
    theme: {
      primaryColor: '#FFD700', // Gold
      accentColor: '#00E5FF',  // Cyber Cyan
      borderColor: '#FFB300',
      bgGradient: 'radial-gradient(circle at 50% 0%, #10141D 0%, #0A0C10 100%)',
      badgeBg: 'rgba(0, 229, 255, 0.1)',
      badgeBorder: 'rgba(0, 229, 255, 0.3)',
      badgeText: '#00E5FF',
      badgeLabel: 'AUTODESK ENGINE • VERIFIED CREDENTIAL',
      verifiedColor: '#00E676',
    },
    description: 'For outstanding participation, verified project submission, and autonomous workflow execution in the official Notion Track.',
  },
  'ai-masterclass': {
    id: 'ai-masterclass',
    name: 'Next.js AI & Agentic Systems Masterclass',
    shortName: 'AI Agent Masterclass',
    track: 'Full-Stack GenAI & Multi-Agent Architecture',
    organization: 'DevGuild AI Academy',
    signatory: 'Sarah Jenkins, PhD',
    signatoryTitle: 'Head of Applied AI & Agentic Systems',
    theme: {
      primaryColor: '#C084FC', // Purple / Lavender
      accentColor: '#818CF8',  // Indigo
      borderColor: '#A855F7',
      bgGradient: 'radial-gradient(circle at 50% 0%, #170F28 0%, #0D0917 100%)',
      badgeBg: 'rgba(192, 132, 252, 0.12)',
      badgeBorder: 'rgba(192, 132, 252, 0.35)',
      badgeText: '#C084FC',
      badgeLabel: 'DEVGUILD ACADEMY • CERTIFIED AI PRACTITIONER',
      verifiedColor: '#A855F7',
    },
    description: 'For completing rigorous coursework, hands-on architectural labs, and deploying production-grade Gemini agentic pipelines.',
  },
  'cloud-devops': {
    id: 'cloud-devops',
    name: 'Cloud Architecture & DevOps Summit 2026',
    shortName: 'Cloud DevOps Summit',
    track: 'Serverless, Kubernetes & CI/CD Pipelines',
    organization: 'CloudNative Engineering Council',
    signatory: 'Arjun Nambiar',
    signatoryTitle: 'Chief Cloud Architect & Program Chair',
    theme: {
      primaryColor: '#34D399', // Emerald
      accentColor: '#2DD4BF',  // Teal
      borderColor: '#10B981',
      bgGradient: 'radial-gradient(circle at 50% 0%, #0B1D19 0%, #06100D 100%)',
      badgeBg: 'rgba(52, 211, 153, 0.12)',
      badgeBorder: 'rgba(52, 211, 153, 0.35)',
      badgeText: '#34D399',
      badgeLabel: 'CLOUDNATIVE COUNCIL • CERTIFIED SPECIALIST',
      verifiedColor: '#10B981',
    },
    description: 'For demonstrated mastery in container orchestration, infrastructure-as-code automation, and cloud resilience practices.',
  },
  'web3-builders': {
    id: 'web3-builders',
    name: 'Web3 Builders & Smart Contract Bootcamp',
    shortName: 'Web3 Builders Bootcamp',
    track: 'Decentralized Protocols & Smart Contracts',
    organization: 'Global Web3 Fellowship',
    signatory: 'Elena Rostova',
    signatoryTitle: 'Founding Fellow & Protocol Lead',
    theme: {
      primaryColor: '#FB923C', // Warm Orange
      accentColor: '#F87171',  // Coral / Red
      borderColor: '#EA580C',
      bgGradient: 'radial-gradient(circle at 50% 0%, #210F0A 0%, #110705 100%)',
      badgeBg: 'rgba(251, 146, 60, 0.12)',
      badgeBorder: 'rgba(251, 146, 60, 0.35)',
      badgeText: '#FB923C',
      badgeLabel: 'GLOBAL WEB3 FELLOWSHIP • VERIFIED BUILDER',
      verifiedColor: '#FB923C',
    },
    description: 'For architecting secure smart contract protocols and contributing to open-source decentralized infrastructure.',
  },
};

export const DEFAULT_EVENT_ID = 'automate-india-2026';

/**
 * Resolves an event profile by ID or name fallback.
 */
export function getEventProfile(eventIdOrName) {
  if (!eventIdOrName) return EVENT_CATALOG[DEFAULT_EVENT_ID];

  // Check direct key match
  if (EVENT_CATALOG[eventIdOrName]) {
    return EVENT_CATALOG[eventIdOrName];
  }

  // Case-insensitive lookup or partial matching
  const normalized = String(eventIdOrName).toLowerCase().trim();
  for (const [key, event] of Object.entries(EVENT_CATALOG)) {
    if (
      key.toLowerCase() === normalized ||
      event.name.toLowerCase().includes(normalized) ||
      event.shortName.toLowerCase().includes(normalized)
    ) {
      return event;
    }
  }

  // Custom fallback event if not found
  return {
    id: 'custom-event',
    name: eventIdOrName,
    shortName: eventIdOrName,
    track: 'Automated Certification Track',
    organization: 'AutoDesk Autonomous Certification Authority',
    signatory: 'AutoDesk Verification Authority',
    signatoryTitle: 'Automated HITL Governance',
    theme: EVENT_CATALOG[DEFAULT_EVENT_ID].theme,
    description: `For verified participation and completion of ${eventIdOrName}.`,
  };
}

/**
 * Returns a list of all active event profiles for UI dropdowns.
 */
export function getAllEvents() {
  return Object.values(EVENT_CATALOG);
}
