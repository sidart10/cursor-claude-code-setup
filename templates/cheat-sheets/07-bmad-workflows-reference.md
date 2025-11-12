# BMAD Workflows Reference - Quick Guide

**34 workflows across 4 phases - Your systematic development framework**

---

## How to Use BMAD

### Activation

**In Cursor**:

1. Open agent file: `bmad/core/agents/bmad-master.md` (or any agent)
2. Agent activates, shows menu
3. Select workflow by number or trigger (\*workflow-name)

**In Claude Code**:

```bash
# Via slash command
claude "/bmad:bmm:workflows:workflow-init"
claude "/bmad:bmm:workflows:prd"

# Or load agent first
claude "Load BMad Master agent and run workflow-init"
```

---

## Essential Workflows (Use These Most)

### \*workflow-init (START HERE!)

**Purpose**: Determine your project's planning track

**What It Does**:

- Asks about project scope and complexity
- Analyzes requirements
- Recommends track: Quick Flow | BMad Method | Enterprise

**When**: Beginning of any new project

**Time**: 10-15 minutes

**Output**: Planning track recommendation + next workflow

```bash
claude "Run workflow-init for my blog platform project"
```

---

### \*tech-spec (Quick Flow Track)

**Purpose**: Lightweight specification for small features

**What It Creates**:

- Technical requirements
- Implementation approach
- Success criteria

**When**: Bug fixes, small features, clear scope

**Time**: 15-30 minutes

**Output**: tech-spec.md

---

### \*prd (BMad Method Track)

**Purpose**: Full Product Requirements Document

**What It Creates**:

- Product vision
- User stories
- Functional requirements
- Non-functional requirements
- Success metrics

**When**: Products, platforms, complex features

**Time**: 45-90 minutes

**Output**: prd.md (or sharded PRD/)

---

### \*architecture

**Purpose**: System design and technical architecture

**What It Creates**:

- Architecture decisions
- System structure
- Technology choices
- Implementation patterns

**When**: After PRD, before development

**Time**: 60-120 minutes

**Output**: architecture.md (or sharded Architecture/)

---

### \*dev-story

**Purpose**: Break feature into development stories

**What It Creates**:

- Story breakdown (from epic or feature)
- Acceptance criteria (BDD-style)
- Implementation sequence

**When**: Ready to code (Phase 4)

**Time**: 30-45 minutes per story

**Output**: story-[name].md

---

## Phase 1: Analysis (Optional)

**Workflows**:

- \*brainstorm-project (idea generation)
- \*research-topic (competitive analysis)

**Use When**: Starting from scratch, need ideation

---

## Phase 2: Planning (Required)

**Three Tracks**:

**Quick Flow** (Bug fixes, small features):

- \*workflow-init → determines track
- \*tech-spec → lightweight spec
- → Skip to Phase 4

**BMad Method** (Products, platforms):

- \*workflow-init → determines track
- \*prd → full requirements
- \*create-epics-and-stories → breakdown
- → Phase 3 (Architecture)

**Enterprise Method** (Large scale):

- Same as BMad Method
- - Security planning (coming soon)
- - DevOps strategy (coming soon)
- - Test architecture

---

## Phase 3: Solutioning (Track-Dependent)

**Workflows**:

- \*architecture (system design)
- \*ux-design (user experience)
- \*test-architecture (testing strategy)
- \*solutioning-gate-check (quality gate)

**Use When**: BMad Method or Enterprise track

---

## Phase 4: Implementation (Iterative)

**Story-Centric Development**:

**Workflows**:

- \*dev-story (create implementation story)
- \*develop-story (implement the story)
- \*story-done (mark complete, quality check)
- \*retrospective (learning after sprint)

**Pattern**:

```
1. *dev-story (break down feature)
2. *develop-story (implement)
3. *story-done (verify & commit)
4. Repeat for next story
5. *retrospective (after all stories)
```

---

## Special Workflows

### \*document-project (Brownfield)

**Purpose**: Document existing codebase for AI understanding

**What It Creates**:

- Project overview
- Architecture documentation
- Key components
- Development guide

**When**: Working with existing code (brownfield)

**Time**: 30-60 minutes

**Output**: Comprehensive project docs

---

### \*party-mode (Multi-Agent Collaboration)

**Purpose**: All 12 agents collaborate on problem

**What Happens**:

- Activates all agents in group chat
- Each contributes from their expertise
- Diverse perspectives synthesized

**When**: Complex decisions, strategic planning

**Time**: Variable (discussion-based)

---

## Workflow Execution Modes

### Normal Mode (Default)

**Behavior**:

- Full user interaction
- Pauses at decision points
- Reviews output before proceeding
- Elicitation for missing info

**Use**: Most workflows, especially learning

---

### #yolo Mode

**Behavior**:

- Skip optional sections
- Minimize prompts
- Auto-proceed where possible
- Fast execution

**Use**: Familiar workflows, time-constrained

**Activate**: Add "#yolo" to workflow trigger

```bash
claude "Run prd workflow in yolo mode"
```

---

## Document Sharding (Advanced)

**For Large Projects** (PRD >500 lines):

**Instead of**: One massive prd.md file (loads all 50k tokens)

**Use**: Sharded structure

```
PRD/
├── 01-vision.md (3k tokens)
├── 02-users.md (5k tokens)
├── 03-functional-requirements.md (8k tokens)
├── 04-technical-requirements.md (7k tokens)
└── index.md (navigation)
```

**Benefit**: Phase 4 workflows load ONLY needed sections (90% token reduction)

**Tool**: shard-doc (built into BMAD)

---

## BMAD + Other Tools Integration

### BMAD + Cursor

**Pattern**:

```
1. Load BMAD agent in Cursor
2. Run workflow (generates specs)
3. Use Cursor multi-agent to implement
4. BMAD agents guide, Cursor executes
```

---

### BMAD + Claude Code

**Pattern**:

```bash
# Run workflow from terminal
claude "/bmad:bmm:workflows:prd"

# Automate development
claude "Load Developer agent, implement feature from PRD"
```

---


**Pattern**:

```
1. BMAD workflow asks for research
2. Agent uses RAG automatically
3. Retrieves best practices from knowledge base
4. Incorporates into output
```

**Example**: Architecture workflow searches for design patterns

---

### BMAD + Serena

**Pattern**:

```
1. BMAD Developer agent needs to refactor code
2. Uses Serena for symbol-level operations
3. Surgical edits (no full file reads)
4. 90% token reduction
```

---

## Quick Workflow Selection Guide

**"Which workflow should I run?"**

```
Starting new project?
  → *workflow-init (determines your track)

Small feature/bug fix?
  → *tech-spec (Quick Flow)

Building product/platform?
  → *prd (BMad Method)

Ready to design system?
  → *architecture

Need to break into tasks?
  → *create-epics-and-stories OR *dev-story

Implementing code?
  → *develop-story

Feature complete?
  → *story-done

Sprint finished?
  → *retrospective

Working with existing code?
  → *document-project

Need team discussion?
  → *party-mode
```

---

## Workflow Variables

**BMAD uses variables in workflows**:

```
{project-root} → Your project directory
{user_name} → Your name (from config)
{communication_language} → Your language preference
{output_folder} → Where files save
{{date}} → Current date (auto-generated)
{{project_name}} → Asked at runtime
```

**Resolved**: Automatically during workflow execution

---

## Common Workflow Patterns

### Pattern 1: Quick Flow (Fast Development)

```
*workflow-init
  ↓
*tech-spec (lightweight planning)
  ↓
*dev-story (implementation story)
  ↓
*develop-story (code it)
  ↓
*story-done (verify & commit)

Time: 1-2 hours total
Use: Bug fixes, small features
```

---

### Pattern 2: BMad Method (Full Planning)

```
*workflow-init
  ↓
*prd (complete requirements)
  ↓
*architecture (system design)
  ↓
*create-epics-and-stories (breakdown)
  ↓
For each story:
  *develop-story → *story-done
  ↓
*retrospective (learning)

Time: 10-20 hours (complex features)
Use: Products, platforms
```

---

### Pattern 3: Brownfield (Existing Code)

```
*document-project (understand what exists)
  ↓
*workflow-init (plan improvements)
  ↓
Follow Quick Flow or BMad Method
```

---

## Agent Specialization

**Which agent for which workflow**:

- **PM**: *prd, *workflow-init, vision work
- **Analyst**: \*research-topic, competitive analysis
- **Architect**: \*architecture, technical design
- **Scrum Master**: *create-epics-and-stories, *dev-story
- **Developer**: \*develop-story, implementation
- **Test Architect (TEA)**: \*test-architecture, quality
- **UX Designer**: \*ux-design, user experience
- **Technical Writer**: Documentation workflows

**BMad Master**: Orchestrates all, runs \*party-mode

---

## Troubleshooting

**Workflow not found**:

```bash
# List all workflows
claude "Load BMad Master and run *list-workflows"

# Check workflow file exists
ls bmad/modules/bmm/workflows/
```

**Workflow fails to load**:

- Check: workflow.yaml exists
- Check: instructions.md or template exists
- Verify: config_source path is correct

**Workflow skips steps**:

- Using #yolo mode? (remove for full interaction)
- Check: workflow.xml loaded (should auto-load)

**Output not saving**:

- Check: output_folder configured in config.yaml
- Verify: Directory exists and writable
- Check: File path variables resolved correctly

---

## Quick Command Reference

**Most Used Workflows**:

```
*workflow-init (start any project)
*prd (full planning)
*tech-spec (quick planning)
*architecture (system design)
*dev-story (create implementation story)
*develop-story (implement code)
*party-mode (team collaboration)
```

**Via Claude Code**:

```bash
claude "/bmad:bmm:workflows:workflow-init"
claude "/bmad:core:workflows:party-mode"
```

---

**Course**: Context Engineering Mastery
**Module**: 1-3 (use throughout), 4 (deep-dive)
**BMAD Version**: v6.0.0-alpha.6+
**Workflows**: 34 total (12 most common shown)
**Print**: 1-2 pages
**Updated**: November 2025
