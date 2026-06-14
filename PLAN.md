# SaaS Portfolio Plan — Top Tech Company Interviews
**Created:** 2026-06-14
**Goal:** Two fully deployed, production-grade SaaS apps demonstrating system design depth, AI integration, and real business thinking for interviews at top product companies (Google, Meta, Amazon, Microsoft, Uber, etc.)

---

## Timeline Overview

| Month | Project | Codename |
|---|---|---|
| Month 1–2 | AI Content Repurposing Tool | RecastAI |
| Month 3–4 | AI Code Review SaaS | PeerBot |

---

# Project 1 — AI Content Repurposing Tool
**Codename:** `RecastAI`
**Timeline:** Month 1–2

## What It Does
User pastes a long-form piece (blog post, YouTube transcript, podcast notes) → app repurposes it into multiple formats: LinkedIn post, Twitter/X thread, email newsletter, YouTube description, and TL;DR summary. Tiered subscription model.

---

## MVP Feature Scope

### Core Features (Must Ship)
- [ ] Auth (sign up / login / Google OAuth)
- [ ] Input: paste text or paste YouTube URL (auto-fetch transcript)
- [ ] Output: 5 formats generated simultaneously via streaming
- [ ] Tone selector (professional / casual / witty)
- [ ] Copy-to-clipboard + download as `.txt`
- [ ] Usage limits per plan (Free: 5/month, Pro: unlimited)
- [ ] Stripe subscription billing (Free / Pro $9/month / Team $29/month)
- [ ] Dashboard: history of all past repurposings
- [ ] Settings: manage subscription, cancel, upgrade

### Deliberately Out of Scope (MVP)
- Team collaboration features
- Custom brand voice training
- Direct posting to LinkedIn/Twitter API
- Chrome extension

---

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Client (Next.js)                  │
│  Landing Page │ Dashboard │ Editor │ Billing Portal  │
└──────────────────────┬──────────────────────────────┘
                       │ HTTPS
┌──────────────────────▼──────────────────────────────┐
│              API Layer (Next.js API Routes)           │
│  /auth  /repurpose  /history  /billing  /webhooks    │
└────┬────────────┬───────────────┬────────────────────┘
     │            │               │
┌────▼───┐  ┌────▼─────┐  ┌──────▼──────┐
│Postgres│  │  Redis   │  │  Anthropic  │
│(users, │  │(rate     │  │  Claude API │
│history,│  │ limiting,│  │ (streaming) │
│plans)  │  │ sessions)│  └─────────────┘
└────────┘  └──────────┘
                       │
              ┌────────▼────────┐
              │  Stripe Webhooks │
              │ (sub lifecycle)  │
              └─────────────────┘
```

---

## Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js 15 (App Router) + TypeScript | SSR, streaming support, one repo |
| Styling | Tailwind CSS + shadcn/ui | Fast, professional UI |
| Auth | Clerk | Handles OAuth, session mgmt, webhooks |
| Database | PostgreSQL via Supabase | Managed, free tier, row-level security |
| Caching / Rate Limiting | Upstash Redis | Serverless Redis, free tier |
| AI | Anthropic Claude API (Sonnet 4.6) | Streaming, prompt caching = lower cost |
| Payments | Stripe | Subscriptions + usage-based metering |
| Deployment | Vercel | Zero-config, edge functions |
| YouTube Transcript | `youtube-transcript` npm package | Fetch YT transcripts without API key |

---

## Database Schema (High Level)

```
users          — id, clerk_id, email, plan, created_at
repurposings   — id, user_id, input_text, outputs (jsonb), created_at
usage_logs     — id, user_id, month, count
subscriptions  — id, user_id, stripe_sub_id, status, plan, period_end
```

---

## Build Phases

### Phase 1 — Foundation (Days 1–5)
- Project setup: Next.js + TypeScript + Tailwind + shadcn/ui
- Clerk auth integrated (sign up, login, Google OAuth)
- Supabase PostgreSQL connected
- Basic landing page

### Phase 2 — Core AI Feature (Days 6–10)
- Claude API integration with streaming
- Prompt engineering for all 5 output formats
- Tone selector feeding into system prompt
- Streaming UI (tokens appear in real time)
- YouTube URL → transcript fetcher

### Phase 3 — Business Logic (Days 11–16)
- Usage tracking per user per month
- Redis rate limiting middleware
- Free plan gate (5 uses/month)
- History dashboard (past repurposings)

### Phase 4 — Billing (Days 17–21)
- Stripe products + prices created (Free / Pro / Team)
- Checkout session flow
- Stripe webhooks: subscription created/updated/canceled
- Customer portal for self-serve billing management
- Plan enforcement middleware

### Phase 5 — Polish & Deploy (Days 22–28)
- Landing page: hero, features, pricing table, FAQ
- Error states, loading states, empty states
- SEO metadata
- Deploy to Vercel + custom domain
- Uptime monitoring (BetterUptime free tier)

---

## Resume Talking Points
- "Handles streaming LLM responses with Anthropic Claude API using prompt caching, reducing token costs by ~40%"
- "Built multi-tier subscription system using Stripe webhooks with idempotent event handling"
- "Implemented Redis-based rate limiting at the edge with per-user monthly usage metering"
- "Achieved <200ms TTFB on dashboard via Supabase row-level security + indexed queries"

---

# Project 2 — AI Code Review SaaS
**Codename:** `PeerBot`
**Timeline:** Month 3–4

## What It Does
Developers install a GitHub App on their repo. On every pull request, PeerBot automatically reviews the diff using Claude AI, posts inline comments for bugs/security issues/code smells, and gives an overall score. Teams can configure custom rules and coding standards.

---

## MVP Feature Scope

### Core Features (Must Ship)
- [ ] GitHub App installation flow (OAuth)
- [ ] Webhook receiver: trigger on PR opened/updated
- [ ] Diff parsing: extract changed files + lines
- [ ] Claude AI review: inline comments + summary
- [ ] Post review back to GitHub PR as bot comments
- [ ] Dashboard: all PRs reviewed, scores over time
- [ ] Config per repo: enable/disable, severity levels, ignore patterns
- [ ] Stripe billing (Free: 3 repos, Pro: unlimited repos $19/month)
- [ ] Webhook queue with retry logic (jobs don't drop if AI is slow)

### Deliberately Out of Scope (MVP)
- GitLab / Bitbucket support
- Custom fine-tuned models
- IDE plugin
- Team analytics

---

## System Architecture

```
┌─────────────────────────────────────────────────────┐
│                 GitHub (External)                    │
│  PR Opened/Updated → Webhook POST                   │
└──────────────────────┬──────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────┐
│            Webhook Receiver (Node.js/Fastify)        │
│  Verify signature → validate → enqueue job          │
└──────────────────────┬──────────────────────────────┘
                       │
              ┌────────▼────────┐
              │   BullMQ Queue  │  ← Redis
              │  (review jobs)  │
              └────────┬────────┘
                       │ Worker picks up job
┌──────────────────────▼──────────────────────────────┐
│               Review Worker (Node.js)                │
│  1. Fetch PR diff via GitHub API                    │
│  2. Chunk diff by file                              │
│  3. Send each chunk to Claude API                   │
│  4. Aggregate results                               │
│  5. Post comments back to GitHub PR                 │
└──────────┬──────────────────┬───────────────────────┘
           │                  │
    ┌──────▼───┐       ┌──────▼──────┐
    │PostgreSQL│       │ Anthropic   │
    │(reviews, │       │ Claude API  │
    │ repos,   │       │             │
    │ users)   │       └─────────────┘
    └──────────┘
           │
┌──────────▼──────────────────────────────────────────┐
│              Next.js Dashboard (Frontend)            │
│  Repo list │ PR history │ Review detail │ Config    │
└─────────────────────────────────────────────────────┘
```

---

## Tech Stack

| Layer | Technology | Reason |
|---|---|---|
| Frontend | Next.js 15 + TypeScript + Tailwind | Same stack as Project 1 |
| Backend API | Node.js + Fastify | Fast, low overhead for webhook handling |
| Job Queue | BullMQ + Upstash Redis | Async processing, retries, concurrency control |
| Database | PostgreSQL (Railway) | Structured relational data, easy querying |
| GitHub Integration | Octokit.js + GitHub App | Official SDK, handles auth + webhooks |
| AI | Anthropic Claude API | Large context window for big diffs |
| Payments | Stripe | Same as Project 1 |
| Deployment | Vercel (frontend) + Railway (worker) | Worker needs always-on process |

---

## Database Schema (High Level)

```
users            — id, github_id, email, plan, created_at
installations    — id, user_id, github_install_id, account_name
repositories     — id, install_id, repo_name, enabled, config (jsonb)
pull_requests    — id, repo_id, pr_number, sha, status, score, created_at
review_comments  — id, pr_id, file_path, line, body, severity, created_at
subscriptions    — id, user_id, stripe_sub_id, plan, status
```

---

## Key Engineering Challenges (= Interview Gold)

| Challenge | Solution | Interview Talking Point |
|---|---|---|
| Large diffs exceed context window | Chunk by file, parallel Claude calls, then aggregate | "How do you handle PRs with 50+ files changed?" |
| GitHub webhooks can arrive out of order | Idempotent job processing keyed on `pr_number + sha` | "What if the same webhook fires twice?" |
| Worker crashes mid-review | BullMQ auto-retry with exponential backoff | "How do you guarantee delivery?" |
| Review posted to wrong commit | Lock review to the SHA received in webhook | "How do you handle force pushes?" |
| Slow AI response blocks webhook 200 | Enqueue immediately, return 202, process async | "Why not process synchronously?" |

---

## Build Phases

### Phase 1 — GitHub App Setup (Days 1–5)
- Register GitHub App (webhook URL, permissions: PR read + write)
- GitHub OAuth login flow
- Installation callback handler
- Fetch and store user's repos

### Phase 2 — Webhook + Queue (Days 6–10)
- Fastify webhook receiver with signature verification
- BullMQ job queue setup on Upstash Redis
- PR diff fetcher via Octokit
- Worker scaffold (process job → log output)

### Phase 3 — AI Review Engine (Days 11–17)
- Diff parser: chunk by file
- Claude prompt engineering: structured JSON output (comments array)
- Parallel API calls per file chunk
- Result aggregation + deduplication
- Post comments to GitHub PR via Octokit

### Phase 4 — Dashboard + Config (Days 18–23)
- Repo list with enable/disable toggle
- PR history with scores + review detail view
- Per-repo config: severity filter, ignore paths
- Real-time job status (polling or SSE)

### Phase 5 — Billing + Deploy (Days 24–30)
- Stripe: Free (3 repos) / Pro ($19/month unlimited)
- Repo limit enforcement in worker
- Deploy: Vercel (frontend) + Railway (Fastify + BullMQ worker)
- GitHub App submission for public listing

---

## Resume Talking Points
- "Built async job pipeline processing 500+ PR reviews/day with BullMQ, Redis, and idempotent deduplication"
- "Designed chunked diff processing strategy to handle PRs exceeding 100K token LLM context limits"
- "Implemented GitHub App with webhook signature verification and exponential backoff retry queuing"
- "System handles concurrent reviews across multi-tenant repos with per-installation GitHub auth tokens"

---

# Combined Resume Architecture

```
Project 1 (RecastAI)          Project 2 (PeerBot)
─────────────────────         ──────────────────────────
Next.js + Clerk               Next.js + GitHub OAuth
Supabase PostgreSQL           PostgreSQL (Railway)
Upstash Redis (rate limit)    Upstash Redis (BullMQ)
Anthropic API (streaming)     Anthropic API (structured)
Stripe (subscriptions)        Stripe (subscriptions)
Vercel                        Vercel + Railway worker
```

**Together they cover:** Auth, billing, async queues, AI integration, third-party API (GitHub), rate limiting, multi-tenancy, streaming, background workers — essentially every topic that comes up in system design and engineering interviews.

---

# Pre-Start Checklist

- [ ] Confirm TypeScript + Next.js + Node.js stack is comfortable (or flag Python preference)
- [ ] Confirm starting with Project 1 (RecastAI)
- [ ] Set up Stripe account (test mode is fine initially)
- [ ] Have a domain ready or use Vercel free subdomain
- [ ] GitHub account ready for Project 2 GitHub App registration
