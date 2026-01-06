import {
    FiUsers,
    FiHeart,
    FiEye,
    FiShield,
    FiCpu,
    FiClock,
    FiBook,
    FiMessageCircle,
    FiCheckCircle,
} from "react-icons/fi";

export const coreValues = [
    {
        icon: FiHeart,
        title: "Person-Centered Memory",
        description:
            "Twinara reinforces memory using real-life context, not artificial challenges. Remembering your daughter's name matters more than remembering random numbers.",
    },
    {
        icon: FiShield,
        title: "Dignity & Emotional Safety",
        description:
            "Twinara never says 'wrong', never highlights failure, and never pressures users. It always reassures and supports with gentle, encouraging interactions.",
    },
    {
        icon: FiCpu,
        title: "Adaptive Cognition",
        description:
            "Twinara automatically adjusts question type, difficulty level, language simplicity, and hint frequency based on how users respond over time.",
    },
    {
        icon: FiEye,
        title: "Transparency",
        description:
            "Twinara is always clearly identified as an AI assistant. It never pretends to be a real person and maintains honest, transparent communication.",
    },
];

export const cognitiveTasks = [
    {
        icon: FiUsers,
        title: "Identity & Self Recall",
        purpose: "Reinforce sense of self",
        examples: [
            "What is your name?",
            "What kind of work did you used to do?",
            "What city do you live in?",
        ],
    },
    {
        icon: FiHeart,
        title: "People & Relationships",
        purpose: "Reinforce family and social bonds",
        examples: [
            "Who is Sarah to you?",
            "Which of these people is your granddaughter?",
            "Do you live with your wife or alone?",
        ],
    },
    {
        icon: FiClock,
        title: "Routine & Daily Awareness",
        purpose: "Reduce confusion about time and plans",
        examples: [
            "What do you usually do on Monday mornings?",
            "What is your next activity today?",
            "Do you usually go for a walk before or after breakfast?",
        ],
    },
    {
        icon: FiCheckCircle,
        title: "Recognition-Based Tasks",
        purpose: "Increase success rate with low-stress interactions",
        examples: [
            "Multiple choice questions",
            "Yes / No confirmations",
            "Image-based recognition (future)",
        ],
    },
    {
        icon: FiBook,
        title: "Story & Memory Reinforcement",
        purpose: "Strengthen narrative memory",
        examples: [
            "You enjoy gardening. What do you like most about it?",
            "Tell me something you enjoy doing with your family.",
        ],
    },
    {
        icon: FiMessageCircle,
        title: "Gentle Behavioral Prompts",
        purpose: "Encourage healthy habits",
        examples: [
            "Would you like to take a short walk now?",
            "Do you want me to remind you to drink some water?",
        ],
    },
];

export const problemsSolved = [
    {
        problem: "Users forget personal information",
        solution: "Uses personalized recall & recognition tasks based on their own life data",
    },
    {
        problem: "Users feel anxious when tested",
        solution: "Uses gentle, game-like interactions that never highlight failure",
    },
    {
        problem: "Generic brain games feel meaningless",
        solution: "Uses real-life data from personal history, family, and routines",
    },
    {
        problem: "Caregivers struggle to engage users",
        solution: "Twinara initiates engagement and adapts to user's comfort level",
    },
    {
        problem: "Users lose sense of routine",
        solution: "Reinforces daily activities and helps maintain awareness of time",
    },
    {
        problem: "Users feel isolated",
        solution: "Encourages interaction & conversation in a supportive, non-judgmental way",
    },
];

