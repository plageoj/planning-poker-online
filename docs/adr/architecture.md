# ADR-001: Planning Poker System Architecture

## Status

**Accepted** - 2025-06-15

## Context

### Business Requirements

We need to develop an online Planning Poker system to improve our current manual workflow. Currently, our team exports CSV files from planning sessions and manually registers issues in Backlog, which creates overhead for Scrum Masters and reduces team efficiency.

### Technical Goals

This project serves dual purposes:

1. **Technology Validation**: Evaluate unfamiliar infrastructure and frontend technologies for potential production use
2. **Agentic Coding Validation**: Assess whether Claude Code can generate production-ready code that meets enterprise quality standards

### Key Requirements

- **Backlog Integration**: OAuth-based API integration for issue search, retrieval, and story point updates
- **Real-time Collaboration**: Multiple users participating in voting sessions simultaneously
- **Cost Efficiency**: Minimal running costs for individual development and operation
- **Production Quality**: Code quality validated through SonarQube Cloud
- **Open Source**: English documentation for OSS publication
- **Operational Efficiency**: Reduce Scrum Master workload through automation

## Decision

### Frontend Framework: **SvelteKit**

**Rationale:**

- **Learning Value**: New technology for validation purposes
- **Performance**: Smallest bundle size and fastest execution among compared frameworks
- **Developer Experience**: Lowest learning curve, intuitive reactive programming
- **TypeScript Integration**: Excellent support for type safety

**Alternatives Considered:**

- Next.js: Familiar but doesn't meet "new technology" criteria
- Angular: Overkill for individual development, steep learning curve
- Nuxt.js: Good balance but smaller ecosystem than React/Svelte

### Backend & Database: **Supabase**

**Rationale:**

- **Integrated Solution**: PostgreSQL + Realtime + Auth + Storage in single platform
- **Cost Efficiency**: Generous free tier (500 concurrent connections, 2GB bandwidth)
- **Real-time Capabilities**: Native PostgreSQL-based real-time subscriptions
- **Row Level Security**: Fine-grained access control for multi-tenant sessions
- **TypeScript Integration**: Auto-generated types from database schema

**Alternatives Considered:**

- Pusher + separate DB: Higher costs after free tier, requires additional infrastructure
- Firebase: Google vendor lock-in, less SQL flexibility
- Custom backend: Higher development and operational overhead

### Hosting Platform: **Cloudflare Pages**

**Rationale:**

- **Cost Efficiency**: Unlimited bandwidth on free tier (critical for scaling)
- **Performance**: Global CDN with superior edge network
- **Learning Opportunity**: New platform for technology validation
- **Integration**: Seamless Workers integration for future API needs
- **Security**: Built-in DDoS protection and security features

**Alternatives Considered:**

- Vercel: Familiar platform, excellent SvelteKit support, but bandwidth costs after 100GB
- Netlify: Good features but inferior performance and cost structure
- AWS/GCP: Over-engineered for individual project scope

### Quality Assurance: **SonarQube Cloud**

**Rationale:**

- **Code Quality**: Industry-standard static analysis for production readiness
- **Security**: Vulnerability detection and security hotspot identification
- **Maintainability**: Technical debt tracking and code smell detection
- **CI/CD Integration**: Automated quality gates in deployment pipeline

### Integration Strategy: **Backlog OAuth API**

**Rationale:**

- **Security**: OAuth 2.0 provides secure, user-consented access
- **Functionality**: Issue search, retrieval, and story point updates
- **User Experience**: Single sign-on workflow reduces friction
- **Compliance**: Meets enterprise security requirements

## Technical Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Cloudflare    │    │    Supabase      │    │    Backlog      │
│     Pages       │◄──►│   (PostgreSQL    │◄──►│      API        │
│   (SvelteKit)   │    │    + Realtime)   │    │   (OAuth)       │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                       │                       │
         ▼                       ▼                       ▼
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│  Static Assets  │    │  Real-time Sync  │    │ Issue Management│
│   CDN Delivery  │    │  Voting Session  │    │ Story Points    │
│                 │    │  Participants    │    │                 │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### Data Flow

1. **Session Creation**: Scrum Master creates session, imports issues from Backlog
2. **Real-time Voting**: Team members join and vote using WebSocket connections
3. **Result Aggregation**: Consensus reached, story points automatically updated in Backlog
4. **Session Archive**: Historical data stored for retrospectives

## Consequences

### Positive

- **Cost Optimization**: Free tier covers expected usage (unlimited bandwidth)
- **Performance**: Edge delivery and real-time capabilities
- **Learning Value**: Hands-on experience with modern stack
- **Operational Efficiency**: Automated Backlog integration reduces manual work
- **Code Quality**: SonarQube ensures production standards
- **Scalability**: Architecture supports team growth

### Negative

- **Learning Curve**: SvelteKit and Cloudflare Pages require initial investment
- **Vendor Dependencies**: Multiple third-party services create integration complexity
- **Limited Ecosystem**: SvelteKit has smaller community compared to React
- **Deployment Complexity**: Cloudflare adapter requires manual configuration

### Risks & Mitigation

- **Risk**: Cloudflare Pages SvelteKit compatibility issues

  - **Mitigation**: Fallback to Vercel deployment option
  - **Risk**: Supabase free tier limitations

    - **Mitigation**: Monitor usage, upgrade plan if needed
    - **Risk**: Backlog API rate limiting

      - **Mitigation**: Implement proper caching and request batching

      ## Implementation Plan

      ### Phase 1: Foundation (Week 1-2)

      - SvelteKit + TypeScript + Tailwind setup
      - Cloudflare Pages deployment pipeline
      - Supabase integration and authentication

      ### Phase 2: Core Features (Week 3-4)

      - Session management and real-time voting
      - Basic UI/UX implementation
      - SonarQube integration

      ### Phase 3: Backlog Integration (Week 5-6)

      - OAuth implementation
      - Issue import/export functionality
      - Story point synchronization

      ### Phase 4: Production Readiness (Week 7-8)

      - Security review and testing
      - Performance optimization
      - Documentation and OSS preparation

      ## Success Metrics

      ### Technology Validation

      - [ ] SvelteKit production deployment successful
      - [ ] Cloudflare Pages performance meets requirements (<2s load time)
      - [ ] Supabase real-time features work reliably

      ### Code Quality (SonarQube)

      - [ ] Maintainability Rating: A
      - [ ] Reliability Rating: A
      - [ ] Security Rating: A
      - [ ] Technical Debt Ratio: <5%

      ### Business Value

      - [ ] Scrum Master setup time reduced by 80%
      - [ ] Manual CSV workflow eliminated
      - [ ] Team adoption rate >90%

      ### Agentic Coding Assessment

      - [ ] Claude Code generates deployable components
      - [ ] Generated code passes SonarQube quality gates
      - [ ] Integration complexity handled effectively

      ## Review Date

      **2025-09-15** - Reassess architecture decisions based on 3-month production usage

      ***

      **Author**: Individual Developer  
      **Reviewers**: To be determined (OSS community)  
      **Last Updated**: 2025-06-15

```

```
