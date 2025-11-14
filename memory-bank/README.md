# Memory Bank - CosmiBit Project

## Overview
This Memory Bank system helps track project context, decisions, and progress across sessions. Since AI assistants have no memory between sessions, these files serve as the complete project knowledge base.

## Purpose
- **Context Preservation**: Maintain full project context between sessions
- **Decision Tracking**: Document why choices were made
- **Progress Monitoring**: Track what's done and what's next
- **Knowledge Transfer**: Enable any developer or AI to quickly understand the project

## File Structure

### Core Files
```
memory-bank/
├── projectbrief.md       # Foundation: Goals, scope, requirements
├── productContext.md     # Why this exists, problems it solves
├── techContext.md        # Technologies, setup, dependencies
├── systemPatterns.md     # Architecture, patterns, decisions
├── activeContext.md      # Current work, recent changes, next steps
├── progress.md           # What's done, what's left, status
└── README.md             # This file
```

### File Relationships
```
projectbrief.md → Defines the project
        ↓
productContext.md → Explains the purpose
techContext.md → Lists the technologies
systemPatterns.md → Documents the architecture
        ↓
activeContext.md → Tracks current work
        ↓
progress.md → Monitors completion
```

## When to Update

### Start of Each Session
1. Read ALL memory bank files
2. Understand current context from `activeContext.md`
3. Check what's pending in `progress.md`

### During Work
- **activeContext.md**: Update when making significant changes
- **progress.md**: Update when completing features or discovering issues
- **systemPatterns.md**: Update when making architectural decisions

### End of Session
1. Update `activeContext.md` with latest work
2. Update `progress.md` with completed tasks
3. Document any new patterns or decisions

### On User Request
When user says **"update memory bank"**:
1. Review ALL files
2. Update relevant sections
3. Ensure accuracy and completeness

## File Descriptions

### 1. projectbrief.md
**Foundation document** - The "source of truth" for project scope
- Core goals and objectives
- Project type and target audience
- Key features
- Success criteria
- Technical foundation

**Update When**: Project scope changes, new requirements added

### 2. productContext.md
**Purpose and problems** - Why this project exists
- Business justification
- Problems it solves
- How it should work
- User experience goals
- User journeys

**Update When**: Understanding of user needs changes, new use cases emerge

### 3. techContext.md
**Technical environment** - All technical details
- Technology stack
- Development setup
- Environment variables
- Dependencies
- Build & deployment processes

**Update When**: Technologies added/changed, setup process changes

### 4. systemPatterns.md
**Architecture and patterns** - How the system is built
- System architecture diagrams
- Technical decisions and reasoning
- Design patterns used
- Component relationships
- Critical implementation paths

**Update When**: Architecture changes, new patterns introduced, technical decisions made

### 5. activeContext.md
**Current state** - What's happening right now
- Latest changes (with dates)
- Current work focus
- Next steps
- Active decisions
- Important patterns
- Recent learnings

**Update When**: Significant work completed, new session started, context shifts

### 6. progress.md
**Status tracking** - What's done and what's left
- Completed features
- Pending tasks (prioritized)
- Known issues
- Evolution of decisions
- Development metrics

**Update When**: Features completed, new tasks identified, issues discovered

## Usage Guidelines

### For AI Assistants
1. **Always Read First**: Read ALL memory bank files at session start
2. **Update Regularly**: Keep activeContext.md and progress.md current
3. **Be Specific**: Include dates, file paths, line numbers
4. **Track Decisions**: Document why, not just what
5. **Maintain Accuracy**: Review and correct outdated information

### For Developers
1. **Onboarding**: Read files in order (projectbrief → progress)
2. **Daily Work**: Check activeContext.md for latest state
3. **Feature Work**: Update progress.md when completing features
4. **Architecture Changes**: Update systemPatterns.md immediately
5. **Setup Changes**: Update techContext.md when modifying setup

## Update Frequency

### High Frequency (Multiple times per session)
- `activeContext.md` - Every significant change
- `progress.md` - When tasks complete or issues found

### Medium Frequency (Once per session or when needed)
- `systemPatterns.md` - When architecture or patterns change
- `techContext.md` - When setup or dependencies change

### Low Frequency (Rarely)
- `projectbrief.md` - Only when scope fundamentally changes
- `productContext.md` - Only when purpose or users change

## Best Practices

### Writing Style
- **Clear and Concise**: Get to the point quickly
- **Specific**: Include concrete details (dates, files, values)
- **Actionable**: Make it easy to act on the information
- **Organized**: Use headers, lists, and formatting
- **Current**: Remove outdated information promptly

### Content Guidelines
- **Include Why**: Always document reasoning behind decisions
- **Include Context**: Provide enough background to understand
- **Include Examples**: Code snippets, commands, screenshots
- **Include Status**: Make current state obvious
- **Include Next Steps**: What should happen next

### Maintenance
- Review for accuracy regularly
- Remove outdated information
- Update dates on changes
- Keep format consistent
- Preserve important history

## Examples

### Good Entry (activeContext.md)
```markdown
### Latest Changes (Session: 2025-11-13)
1. **Glass Theme Transparency Adjustment**
   - Reduced opacity values by 50% for subtler effect
   - Modified `tailwind.config.js` glass colors
   - Updated `.glass-card` class in `index.css:16-29`
   - Added custom opacity (8, 15) to Tailwind config
   - Reason: User requested more transparent glass effects
```

### Good Entry (progress.md)
```markdown
#### ✅ Styling System
- [x] Custom glassmorphism utilities
- [x] Glass card components (opacity 0.05, was 0.1)
- [x] Custom opacity values (8, 15) added to Tailwind
- [x] Responsive design utilities

#### 🔴 Testing & Validation (High Priority)
- [ ] Test contact form submission end-to-end
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (various screen sizes)
```

## Memory Bank Workflow

```
Session Start
    ↓
Read ALL Memory Bank Files
    ↓
Understand Current Context
    ↓
Perform Work
    ↓
Document Changes in activeContext.md
    ↓
Update progress.md
    ↓
Update Other Files (if needed)
    ↓
Session End
```

## Benefits

### For AI Assistants
- Complete context immediately available
- No need to explore codebase from scratch
- Understand reasoning behind decisions
- Know exactly what's been done and what's next

### For Developers
- Instant project understanding
- Clear documentation of decisions
- Easy onboarding for new team members
- Historical record of evolution

### For Project
- Consistent knowledge base
- Reduced context-switching cost
- Better decision tracking
- Improved continuity

## Maintenance Commands

```bash
# View all memory bank files
ls memory-bank/

# Read a specific file
cat memory-bank/activeContext.md

# Update a file
# Use your editor to modify the file

# Check file sizes (ensure they're reasonable)
du -h memory-bank/
```

## Notes

- This system is inspired by Cline's Memory Bank approach
- Adapt the structure to fit project needs
- Don't be afraid to add new files for complex features
- Keep files focused and well-organized
- Regular maintenance is key to usefulness

---

**Last Updated**: 2025-11-13
**Version**: 1.0
**Status**: Active and in use
