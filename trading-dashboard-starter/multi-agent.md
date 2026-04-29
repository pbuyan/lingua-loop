# AI Agent Development Workflow

## Overview

This document explains a multi-agent workflow for a React + Node.js commercial project using VS Code + GitHub Copilot.

The goal is to use AI agents as structured support, not as a full replacement for the development team.

The workflow should keep humans responsible for:
- product decisions
- architecture choices
- security and compliance
- final reviews and merges

AI agents should help with:
- planning and task breakdown
- implementation assistance
- testing and quality checks
- documentation
- code review support

---

## Recommended Team Structure

Human Product Owner / Tech Lead

        ↓

Orchestrator Agent

        ↓

Specialized Agents:
- Planning / Architecture Agent
- Frontend Implementation Agent
- Backend Implementation Agent
- Testing Agent
- Documentation Agent
- Code Review Agent
- Security / Performance Agent

---

## Agent Roles

### 1. Orchestrator Agent

This agent is the coordinator.

Responsibilities:
- analyze feature requests
- break work into smaller tasks
- identify affected areas (frontend, backend, database, tests, docs)
- create technical plans
- define acceptance criteria
- assign tasks to specialized agents
- prepare GitHub Issue-ready task descriptions

Rules:
- do not write large production code changes unless explicitly asked
- do not skip architecture review for complex features

Expected output:
- feature summary
- technical plan
- task breakdown
- risks and assumptions
- acceptance criteria
- suggested branch name

### 2. Planning / Architecture Agent

This agent reviews technical design before implementation.

Responsibilities:
- propose architecture
- define folder structure and API contracts
- choose state management approach
- define validation strategy
- identify risks and dependencies

Rules:
- do not implement production code unless explicitly asked
- favor simple, maintainable solutions
- avoid unnecessary over-engineering

### 3. Frontend Implementation Agent

This agent builds React UI and frontend integration.

Responsibilities:
- write React components and hooks
- connect UI to APIs
- handle loading, empty, success, and error states
- maintain accessibility and design consistency
- add or update frontend tests when appropriate

Rules:
- follow existing project structure
- use strict TypeScript
- keep components small and reusable
- do not modify backend files without request
- do not introduce new UI libraries without approval

### 4. Backend Implementation Agent

This agent works on Node.js API and server-side logic.

Responsibilities:
- create or update API routes
- implement services and controllers
- validate request input
- handle errors consistently
- add useful logging when needed
- keep business logic out of route handlers
- write or update backend tests

Rules:
- never trust client input
- never hardcode secrets
- never bypass authentication or authorization
- follow existing backend patterns

### 5. Testing Agent

This agent improves test coverage and validation.

Responsibilities:
- review changed code for missing coverage
- add unit tests
- add integration tests
- add frontend component tests
- suggest E2E tests where useful
- cover edge cases and failure states

Rules:
- do not change production logic unless needed for testability
- prefer meaningful tests over snapshots
- cover both success and failure paths

### 6. Documentation Agent

This agent updates product and developer documentation.

Responsibilities:
- update README and docs
- document new features and APIs
- document setup and deployment steps
- add environment variable guidance
- keep examples short and accurate

Rules:
- avoid marketing language in technical docs
- do not document unimplemented behavior

### 7. Code Review Agent

This agent reviews quality, security, and readiness.

Responsibilities:
- check correctness and TypeScript safety
- find bugs and performance issues
- review accessibility and maintainability
- identify missing tests and docs
- verify acceptance criteria

Rules:
- be direct and practical
- separate blockers from suggestions
- do not approve insecure or unsafe code

---

## Autonomy Levels

### Option A � Low Autonomy

Human writes task ? Copilot suggests code ? Human reviews every change.

Best when architecture is still unstable.

Pros:
- high control
- lower risk

Cons:
- slower
- less automation

### Option B � Medium Autonomy

Human creates issue ? Agent plans ? Agent implements ? Human reviews PR.

Recommended starting point for commercial projects.

Pros:
- good balance of speed and control
- works well with PR-based workflows
- reduces repetitive work

Cons:
- requires good task definitions
- still needs strong review discipline

### Option C � High Autonomy

Human gives product goal ? Orchestrator creates plan ? Agents implement ? Human approves.

Pros:
- fast for well-defined, repeatable features

Cons:
- higher risk of architectural inconsistency
- potential hidden bugs
- may generate unnecessary code
- strict CI/CD and review are required

---

## Recommended Start

For a commercial React + Node.js project, begin with Medium Autonomy.

Let AI help with:
- task breakdown
- feature implementation
- boilerplate generation
- test creation
- documentation updates
- code review support

Keep humans responsible for:
- product decisions
- architecture choices
- security decisions
- payment/authentication logic
- production deployment
- final PR approval

---

## Suggested Repository Setup

Create project-level guidance for Copilot and custom agents:

.github/
  copilot-instructions.md
  agents/
    orchestrator.agent.md
    architect.agent.md
    frontend.agent.md
    backend.agent.md
    testing.agent.md
    documentation.agent.md
    code-review.agent.md

docs/
  product/
    vision.md
    roadmap.md
    requirements.md
  architecture/
    overview.md
    api-guidelines.md
    frontend-guidelines.md
    backend-guidelines.md
  decisions/
    ADR-001-project-architecture.md

---

## Custom Instructions for Copilot

Use `.github/copilot-instructions.md` as the global project rulebook.

Example structure:

# Project Instructions

## Project Context
This is a commercial web application built with React, Node.js, and TypeScript.

## Tech Stack
- Frontend: React + TypeScript
- Backend: Node.js + TypeScript
- API: REST unless otherwise specified
- Testing: Vitest/Jest, React Testing Library, Playwright if available
- Package manager: npm unless the project uses something else

## General Rules
- Always use TypeScript.
- Follow the existing folder structure.
- Do not introduce new dependencies without explaining why.
- Keep components, functions, and services small.
- Prefer clear code over clever code.
- Add loading, empty, success, and error states on the frontend.
- Validate all backend inputs.
- Never hardcode secrets.
- Never bypass authentication or authorization.
- Add or update tests for meaningful logic changes.
- Update documentation when behavior changes.

## Pull Request Expectations
- Summary of changes
- Files changed
- How to test
- Risks or assumptions

---

## Practical Workflow Example

### Ideal workflow
1. Product owner defines the feature.
2. Orchestrator Agent makes the plan.
3. Architect Agent reviews the design.
4. Frontend / Backend Agents implement the feature.
5. Testing Agent adds or improves tests.
6. Documentation Agent updates docs.
7. Code Review Agent checks quality.
8. Human reviews the PR.
9. CI/CD validates the code.
10. Merge to `main` via PR only.

### Example feature breakdown
For authentication:
- Task 1: define auth flow and API contract
- Task 2: implement backend auth endpoints
- Task 3: implement frontend login/register forms
- Task 4: add protected routes
- Task 5: add tests
- Task 6: update documentation
- Task 7: review security risks

---

## Key Rules for Commercial Projects

AI-generated work should follow strict rules:
- require PR review
- run tests before merge
- enforce lint/typecheck in CI
- block direct pushes to `main`
- split large features into small tasks
- document architecture decisions
- get human approval for auth, payments, security

Pay special attention to:
- authentication
- payments
- user data
- database migrations
- permissions
- production deployment
- environment variables
- security-sensitive code

---

## How to Create Specialized Agents

### 1. Start with global instructions
Create `.github/copilot-instructions.md` and define the project rules.

### 2. Add specialized agent files
Each agent file should contain:
- role description
- responsibilities
- rules
- expected output format
- allowed tools

Example filenames:
- `.github/agents/orchestrator.agent.md`
- `.github/agents/architect.agent.md`
- `.github/agents/frontend.agent.md`
- `.github/agents/backend.agent.md`
- `.github/agents/testing.agent.md`
- `.github/agents/documentation.agent.md`
- `.github/agents/code-review.agent.md`

### 3. Use the files in Copilot Chat
- open Copilot Chat in VS Code
- choose the agent from the dropdown
- provide the task prompt

### 4. Keep the agents focused
Examples of agent prompts:
- Orchestrator: analyze feature request and create tasks
- Frontend: implement UI with TypeScript and tests
- Backend: add API route with validation
- Testing: review coverage and add tests
- Documentation: update README and API docs
- Code Review: inspect changes for production readiness

---

## Recommended First Agent Set

Start with four agents:
- orchestrator.agent.md
- frontend.agent.md
- backend.agent.md
- code-review.agent.md

Then add:
- testing.agent.md
- documentation.agent.md
- architect.agent.md
- security.agent.md
- performance.agent.md

This avoids overcomplicating the workflow too early.

---

## Final Recommendation

A multi-agent AI workflow is useful, but it should be adopted gradually.

Start with Medium Autonomy.

Keep humans in control of architecture, security, and final approval.

Use AI to speed up planning, implementation, testing, and documentation.

This provides a practical balance between productivity and quality.
