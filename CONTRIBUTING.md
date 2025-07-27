# Contributing Guidelines - COMP229 Group 3

## 🤝 How to Contribute

### Before You Start
1. Make sure you've completed the setup in [TEAM_SETUP.md](./TEAM_SETUP.md)
2. Check the project board/issues for available tasks
3. Communicate with team members to avoid conflicts

### Development Process

#### 1. Get Latest Changes
```bash
git checkout main
git pull origin main
```

#### 2. Create Feature Branch
```bash
git checkout -b feature/descriptive-name
```

#### 3. Make Your Changes
- Write clean, readable code
- Follow existing code style
- Test your changes locally
- Add comments for complex logic

#### 4. Commit Your Changes
```bash
git add .
git commit -m "Clear, descriptive commit message"
```

#### 5. Push and Create Pull Request
```bash
git push origin feature/descriptive-name
```
Then create a Pull Request on GitHub.

## 📝 Code Style Guidelines

### React/JavaScript
- Use functional components with hooks
- Use meaningful variable and function names
- Add PropTypes for component props (if using)
- Keep components small and focused
- Use consistent indentation (2 spaces)

```javascript
// Good
const TaskCard = ({ task, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(task.id);
  };

  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
};

// Avoid
const TaskCard = (props) => {
  return <div><h3>{props.task.title}</h3><p>{props.task.description}</p><button onClick={() => props.onEdit(props.task.id)}>Edit</button></div>;
};
```

### Node.js/Express
- Use async/await instead of callbacks
- Implement proper error handling
- Follow MVC pattern
- Add input validation
- Use meaningful HTTP status codes

```javascript
// Good
const createTask = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const task = new Task({ ...req.body, userId: req.user._id });
    await task.save();

    res.status(201).json({
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    console.error('Create task error:', error);
    res.status(500).json({
      message: 'Server error creating task'
    });
  }
};
```

## 🏗️ Project Structure Rules

### Frontend (rapid-tasks-client/src/)
```
src/
├── components/          # Reusable components
│   ├── common/         # Generic components (Button, Modal, etc.)
│   ├── layout/         # Layout components (Header, Sidebar, etc.)
│   └── task/           # Task-specific components
├── pages/              # Page components (Routes)
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── services/           # API calls
└── styles/             # CSS/styling files
```

### Backend (rapid-tasks-server/)
```
├── config/             # Configuration files
├── controllers/        # Route handlers
├── middleware/         # Custom middleware
├── models/             # Database models
├── routes/             # Route definitions
├── utils/              # Utility functions
└── validators/         # Input validation rules
```

## 🐛 Testing Guidelines

### Before Submitting PR
1. **Test your changes:**
   - Frontend: Test in browser, check console for errors
   - Backend: Test API endpoints with Postman/Thunder Client
   
2. **Check for breaking changes:**
   - Existing functionality still works
   - No console errors
   - All forms submit correctly

3. **Test edge cases:**
   - Invalid inputs
   - Network errors
   - Empty states

## 📋 Pull Request Guidelines

### PR Title Format
- `Feature: Add task editing functionality`
- `Fix: Resolve login error handling`
- `Docs: Update setup instructions`

### PR Description Template
```markdown
## What does this PR do?
Brief description of changes

## How to test?
1. Step by step testing instructions
2. What to look for
3. Expected behavior

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Changes tested locally
- [ ] No breaking changes
- [ ] Documentation updated (if needed)
```

### Review Process
1. At least one team member should review
2. Address all review comments
3. Ensure CI checks pass (if set up)
4. Squash commits if needed

## 🚫 What NOT to do

### Code
- Don't commit debugging console.logs
- Don't push broken/incomplete code to main
- Don't ignore errors or warnings
- Don't hardcode sensitive data

### Git
- Don't force push to main branch
- Don't commit large files
- Don't commit node_modules or build folders
- Don't rewrite history on shared branches

### Collaboration
- Don't work on same file simultaneously without communication
- Don't merge your own PRs without review
- Don't ignore team coding standards

## 🎯 Task Assignment

### How to Claim Tasks
1. Check GitHub Issues or project board
2. Comment on issue to claim it
3. Create branch with issue number: `feature/issue-15-edit-task`
4. Link PR to issue when ready

### Task Categories
- **Frontend**: UI components, pages, styling
- **Backend**: API endpoints, database models, middleware
- **Integration**: Connecting frontend and backend
- **Testing**: Writing tests, bug fixes
- **Documentation**: README updates, code comments

## 🆘 Getting Help

### When you're stuck:
1. Check documentation and existing code
2. Search online (Stack Overflow, documentation)
3. Ask team members in group chat
4. Create detailed issue on GitHub with:
   - What you're trying to do
   - What you've tried
   - Error messages
   - Screenshots

### Code Review Help
- Be constructive and respectful
- Explain suggestions clearly
- Focus on code quality and functionality
- Learn from others' feedback

## 📅 Team Meetings

### Weekly Check-ins
- Progress updates
- Blocker discussions
- Task assignments
- Code review sessions

### Before Major Deadlines
- Integration testing
- Final testing
- Documentation review
- Presentation preparation

---

**Remember: We're all learning together! Don't hesitate to ask questions and help each other out.** 🚀
