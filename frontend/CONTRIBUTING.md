# Contributing to LA Healthcare Access Dashboard

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## 🎯 Ways to Contribute

### 1. Reporting Bugs
- Use GitHub Issues
- Include detailed reproduction steps
- Provide browser/OS information
- Include screenshots if applicable
- Check if issue already exists

### 2. Suggesting Features
- Open a GitHub Discussion first
- Explain the use case
- Provide mockups if possible
- Consider backward compatibility
- Align with project goals

### 3. Improving Documentation
- Fix typos and grammar
- Add code examples
- Improve clarity
- Add screenshots/diagrams
- Update outdated information

### 4. Contributing Code
- Fork the repository
- Create a feature branch
- Write clean, documented code
- Add tests if applicable
- Submit a pull request

---

## 🚀 Getting Started

### Prerequisites
```bash
Node.js >= 20.0.0
npm >= 10.0.0
Git >= 2.40.0
```

### Setup Development Environment
```bash
# Clone the repository
git clone https://github.com/calebnewtonusc/LA-Healthcare-Access-Mapping.git
cd LA-Healthcare-Access-Mapping/frontend

# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

### Project Structure
```
frontend/
├── app/              # Next.js App Router pages
├── components/       # React components
│   ├── ui/          # Reusable UI components
│   ├── charts/      # Data visualization components
│   └── ...
├── lib/             # Utility functions and animations
├── public/          # Static assets
└── styles/          # Global styles
```

---

## 📝 Code Style Guidelines

### TypeScript
```typescript
// ✅ Good - Explicit types
interface User {
  id: string
  name: string
  email: string
}

function getUser(id: string): Promise<User> {
  // Implementation
}

// ❌ Bad - Implicit any
function getUser(id) {
  // Implementation
}
```

### React Components
```typescript
// ✅ Good - Functional component with TypeScript
interface ButtonProps {
  label: string
  onClick: () => void
  variant?: 'primary' | 'secondary'
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps) {
  return (
    <button onClick={onClick} className={`btn-${variant}`}>
      {label}
    </button>
  )
}

// ❌ Bad - No types, unclear prop names
export function Button({ l, o, v }) {
  return <button onClick={o}>{l}</button>
}
```

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Hooks: `use-hook-name.ts`
- Constants: `UPPER_SNAKE_CASE.ts`

### Component Organization
```typescript
'use client' // If client component

import { ... } // External imports
import { ... } // Internal imports

interface Props { ... } // Type definitions

export function Component({ props }: Props) {
  // Hooks
  const [state, setState] = useState()

  // Event handlers
  const handleClick = () => { ... }

  // Effects
  useEffect(() => { ... }, [])

  // Render
  return (
    <div>
      {/* JSX */}
    </div>
  )
}
```

---

## 🎨 Design Guidelines

### Colors
- Follow the established color palette
- Use Tailwind CSS classes
- Maintain dark mode support
- Ensure WCAG AA contrast

### Animations
- Use framer-motion for complex animations
- Keep animations < 300ms for micro-interactions
- Respect `prefers-reduced-motion`
- Use physics-based springs

### Accessibility
- All interactive elements need focus states
- Use semantic HTML
- Include ARIA labels where needed
- Test with keyboard navigation
- Verify with screen readers

---

## ✅ Pull Request Process

### 1. Before Submitting
- [ ] Code follows style guidelines
- [ ] TypeScript compiles without errors
- [ ] No console errors/warnings
- [ ] Tested in Chrome, Firefox, Safari
- [ ] Mobile responsive verified
- [ ] Dark mode works correctly
- [ ] Accessibility checked
- [ ] Documentation updated

### 2. Pull Request Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings
```

### 3. Review Process
1. Automated checks must pass
2. Code review by maintainer
3. Testing verification
4. Merge approval

---

## 🧪 Testing Guidelines

### Manual Testing
```bash
# Build for production
npm run build

# Check for errors
npm run lint

# Visual regression testing
- Test all pages
- Toggle dark mode
- Resize viewport
- Test keyboard navigation
```

### Testing Checklist
- [ ] All pages load correctly
- [ ] Dark mode toggle works
- [ ] Charts render properly
- [ ] Maps display correctly
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] No console errors
- [ ] Performance acceptable

---

## 📚 Documentation Standards

### Code Comments
```typescript
// ✅ Good - Explain why, not what
// Using spring physics for natural motion feel
const animation = { type: 'spring', stiffness: 300 }

// ❌ Bad - States the obvious
// Set animation to spring
const animation = { type: 'spring' }
```

### Component Documentation
```typescript
/**
 * LoadingState component displays an animated loading spinner
 *
 * @param message - Custom loading message
 * @param fullscreen - Whether to render fullscreen
 *
 * @example
 * ```tsx
 * <LoadingState message="Loading data..." fullscreen />
 * ```
 */
export function LoadingState({ message, fullscreen }: LoadingStateProps) {
  // ...
}
```

---

## 🐛 Bug Reports

### Good Bug Report Template
```markdown
**Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Screenshots**
If applicable

**Environment**
- Browser: Chrome 120
- OS: macOS 14.1
- Screen size: 1920x1080
- Dark mode: Yes/No
```

---

## 💡 Feature Requests

### Good Feature Request Template
```markdown
**Problem**
What problem does this solve?

**Proposed Solution**
How should it work?

**Alternatives**
Other solutions considered

**Additional Context**
Mockups, examples, etc.
```

---

## 🏗️ Architecture Decisions

### When Adding New Features
1. **Consider Performance**: Will it impact load time?
2. **Think Accessibility**: Can all users access it?
3. **Check Consistency**: Does it match existing patterns?
4. **Plan for Scale**: Will it work with more data?
5. **Document Changes**: Update relevant docs

### Technology Choices
- **Next.js**: For SSR and routing
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **Framer Motion**: For animations
- **Recharts**: For data visualization

---

## 📦 Release Process

### Version Bumping
```bash
# Patch (bug fixes)
npm version patch

# Minor (new features)
npm version minor

# Major (breaking changes)
npm version major
```

### Release Checklist
- [ ] Update CHANGELOG.md
- [ ] Bump version in package.json
- [ ] Create git tag
- [ ] Push to GitHub
- [ ] Deploy to production
- [ ] Verify deployment
- [ ] Announce release

---

## 🤝 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Welcome newcomers
- Accept constructive criticism
- Focus on what's best for the project
- Show empathy towards others

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Other unethical or unprofessional conduct

---

## 📞 Getting Help

### Resources
- **Documentation**: See README.md
- **Issues**: GitHub Issues
- **Discussions**: GitHub Discussions
- **Email**: [Your contact email]

### Response Times
- Bug reports: 1-2 business days
- Feature requests: 1 week
- Pull requests: 2-3 business days
- Questions: Best effort

---

## 🎓 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn](https://nextjs.org/learn)

### TypeScript
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TypeScript Deep Dive](https://basarat.gitbook.io/typescript/)

### Accessibility
- [WCAG Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)

### Animations
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Principles](https://web.dev/animations/)

---

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

**Thank you for contributing!** 🙏

Every contribution, no matter how small, helps make this project better for everyone.
