📘 Twinara Documentation

A Personalized Cognitive Companion for Dementia Support

1. Overview
What is Twinara?

Twinara is a gamified, AI-powered cognitive feature designed to gently support individuals living with dementia by helping them practice memory, routine awareness, and identity recall using their own life information. They can also interact with Twinara via voice or text as caregiver, it knows who you are and you past life information.

Unlike traditional brain games, Twinara does not use abstract puzzles or generic trivia. Instead, it generates personalized questions and tasks based on:

The user’s personal history

Their family and relationships

Their hobbies and work background

Their daily and weekly routines

Uploaded documents (Word files)

Twinara is powered by the Memory Twin AI agent, which adapts to the user’s cognitive level, emotional state, and comfort.

2. Core Philosophy

Twinara is built on four core principles:

1. Person-Centered Memory

Twinara reinforces memory using real-life context, not artificial challenges.

Remembering your daughter’s name matters more than remembering random numbers.

2. Dignity & Emotional Safety

Twinara:

Never says “wrong”

Never highlights failure

Never pressures the user

Always reassures and supports

3. Adaptive Cognition

Twinara automatically adjusts:

Question type

Difficulty level

Language simplicity

Hint frequency

Based on how the user responds over time.

4. Transparency

Twinara is always clearly identified as an AI assistant.
It never pretends to be a real person.

3. Target Users
Primary User

Individuals with:

Early-stage dementia

Mild cognitive impairment (MCI)

Memory challenges due to aging

Secondary Users

Family members

Caregivers

Healthcare providers (future scope)

4. What Problem Does Twinara Solve?
Problem	How Twinara Helps
Users forget personal information	Uses personalized recall & recognition tasks
Users feel anxious when tested	Uses gentle, game-like interactions
Generic brain games feel meaningless	Uses real-life data
Caregivers struggle to engage users	Twinara initiates engagement
Users lose sense of routine	Reinforces daily activities
Users feel isolated	Encourages interaction & conversation
5. Twinara Feature Set
5.1 Personalized Cognitive Tasks

All Twinara tasks are generated from user-specific data stored in the system.

Data Sources:

Dementia Profile

Weekly Activities

Uploaded Word Documents

Conversation history

Caregiver notes

5.2 Cognitive Task Categories
A. Identity & Self Recall

Purpose: Reinforce sense of self

Examples:

“What is your name?”

“What kind of work did you used to do?”

“What city do you live in?”

B. People & Relationships

Purpose: Reinforce family and social bonds

Examples:

“Who is Sarah to you?”

“Which of these people is your granddaughter?”

“Do you live with your wife or alone?”

C. Routine & Daily Awareness

Purpose: Reduce confusion about time and plans

Examples:

“What do you usually do on Monday mornings?”

“What is your next activity today?”

“Do you usually go for a walk before or after breakfast?”

D. Recognition-Based Tasks (Low Stress)

Purpose: Increase success rate

Examples:

Multiple choice questions

Image-based recognition (future)

Yes / No confirmations

E. Story & Memory Reinforcement

Purpose: Strengthen narrative memory

Examples:

“You enjoy gardening. What do you like most about it?”

“Tell me something you enjoy doing with your family.”

F. Gentle Behavioral Prompts

Purpose: Encourage healthy habits

Examples:

“Would you like to take a short walk now?”

“Do you want me to remind you to drink some water?”

6. Gamification Model (Dementia-Safe)
What Twinara Uses ✅

Daily participation streaks

Encouragement messages

Soft badges (non-competitive)

Positive reinforcement language

What Twinara Avoids ❌

Timers

Scores like 6/10

Failure indicators

Leaderboards

Comparisons to others

Example Feedback Language

✅ “You’re doing great today.”
✅ “Nice job remembering that.”
✅ “That’s okay — let me help you.”

❌ “Wrong answer”
❌ “You forgot”
❌ “Try harder”

7. Adaptive Difficulty System

Twinara continuously adjusts difficulty based on:

Response time

Need for hints

Emotional signals (e.g., confusion, frustration)

Repetition frequency

Difficulty Progression Example:
Level	Task Type
Easy	Yes/No questions
Medium	Multiple choice
Hard	Open-ended recall

If the user struggles → Twinara automatically switches to recognition-based prompts.

8. Twinara Interaction Flow
Step 1 – Task Initiation

Twinara may:

Start a session automatically (daily memory moment)

Be triggered by user

Be prompted by caregiver

Step 2 – Question or Task

Twinara presents one task at a time using simple language.

Step 3 – User Response

User responds via:

Text

(Future) Voice

Step 4 – Evaluation

Twinara:

Assesses correctness loosely

Prioritizes confidence and comfort

Avoids explicit scoring

Step 5 – Response

Twinara:

Encourages

Provides gentle correction if needed

Reinforces memory with context

9. Example Twinara Session

Twinara:

“Let’s do a quick memory moment 🌱
Who do you usually walk with in the morning?”

User:

“I don’t remember.”

Twinara:

“That’s okay 💙
You usually walk with Sarah, your daughter.
Would you like me to remind you again tomorrow?”

10. Technical Architecture Overview
Frontend (React + TypeScript)

Twinara Mode UI

Card-based interaction

Large text & buttons

Optional voice input (future)

Backend (Nest.js)

TwinaraModule

TwinaraService

MemoryModule

ActivitiesModule

ProfileModule

AI (OpenAI API)

Chat completion for interaction

Embeddings for memory retrieval (RAG)

Prompt-driven task generation

11. Core Backend Services
generateTwinaraTask(userId)

Uses profile, activities, and documents

Chooses task type & difficulty

Returns task payload

evaluateTwinaraResponse(taskId, response)

Evaluates response gently

Stores interaction outcome

Adjusts difficulty model

adjustTwinaraDifficulty(userId)

Updates user’s cognitive profile

Controls future task complexity

12. Data & Privacy Considerations

All personal data encrypted at rest

Role-based access control

Caregiver approval required for edits

Audit logs for all changes

Compliance-ready architecture (HIPAA / PIPEDA-friendly)

13. Ethical & Safety Guidelines

Twinara will never:

Pretend to be a real person

Replace human care

Give medical advice

Diagnose conditions

Encourage unsafe actions

Twinara will always:

Encourage contacting caregivers when confused

Be honest and transparent

Respect emotional boundaries

14. Product Positioning

Twinara is not a game.
It is a personalized cognitive companion.

Positioning options:

Dementia support tool

Memory reinforcement system

Caregiver-assisted cognitive training

Identity-preserving AI assistant

15. Why Twinara Matters

Twinara helps users:

Maintain identity

Strengthen relationships

Feel supported, not tested

Stay engaged with life

It helps caregivers:

Reduce emotional burden

Improve engagement

Gain insight into user needs

16. Future Enhancements (Optional)

Voice-first Twinara sessions

Photo-based recognition tasks

Caregiver-custom tasks

Cognitive trend analytics

Clinical research partnerships

✅ Final Summary


It combines:

AI

Human empathy

Personal memory

Ethical design

Into a system that supports the person — not just the condition.