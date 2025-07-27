# Task Backlog for COMP229 Group 3

## 🎯 Part B Requirements - ✅ COMPLETED
- [x] Express backend with MVC structure
- [x] MongoDB database setup
- [x] User authentication and authorization
- [x] CRUD operations for tasks (Create, Read)
- [x] API testing setup
- [x] Password hashing and JWT security

## 🚀 Part 3 Requirements - 🚧 IN PROGRESS

### High Priority (Core CRUD Operations)

#### Frontend Tasks
1. **Edit Task Functionality** 
   - Create EditTask page/component
   - Add edit button to task cards
   - Form validation for edit
   - API integration for PUT /api/tasks/:id

2. **Delete Task Functionality**
   - Add delete button to task cards
   - Confirmation dialog before delete
   - API integration for DELETE /api/tasks/:id
   - Update task list after deletion

3. **Home/Landing Page**
   - Welcome page design
   - Task statistics dashboard (total, pending, completed)
   - Quick action buttons
   - Recent tasks preview

4. **Enhanced Navigation**
   - Improve navbar design
   - Add user menu dropdown
   - Active page highlighting
   - Breadcrumb navigation

#### Backend Tasks
5. **Enhanced Task APIs**
   - Task filtering by status/priority
   - Task search functionality
   - Pagination improvements
   - Sort by due date/priority

6. **User Profile Management**
   - Update profile endpoint
   - Change password endpoint
   - User preferences

### Medium Priority (User Experience)

7. **Task Filtering & Search**
   - Filter tasks by status
   - Filter by due date
   - Search tasks by title/description
   - Sort options

8. **Task Categories/Tags**
   - Add categories to tasks
   - Tag functionality
   - Filter by categories

9. **Better Error Handling**
   - User-friendly error messages
   - Loading states
   - Network error handling

10. **Responsive Design**
    - Mobile-friendly layout
    - Tablet optimization
    - Better CSS organization

### Low Priority (Nice to Have)

11. **Task Due Date Notifications**
    - Overdue task highlighting
    - Due soon warnings
    - Dashboard alerts

12. **Task Statistics**
    - Completion rate charts
    - Monthly task summary
    - Productivity insights

13. **User Settings**
    - Theme preferences
    - Notification settings
    - Display options

## 📝 Assignment Suggestions

### For Frontend-focused members:
- Tasks 1, 2, 3, 4, 7, 10

### For Backend-focused members:
- Tasks 5, 6, 9, 11

### For Full-stack members:
- Any combination of the above

## 🎯 Sprint Planning

### Week 1 (Priority 1)
- [ ] Edit Task Functionality (Frontend + Backend integration)
- [ ] Delete Task Functionality (Frontend + Backend integration)
- [ ] Home/Landing Page

### Week 2 (Priority 2)
- [ ] Enhanced Navigation
- [ ] Task Filtering & Search
- [ ] Better Error Handling

### Week 3 (Polish & Testing)
- [ ] Responsive Design
- [ ] Task Statistics
- [ ] Final testing and bug fixes

## 📋 Done Definition
For each task to be considered complete:
- [ ] Code implementation finished
- [ ] Tested locally
- [ ] No console errors
- [ ] Pull request created and reviewed
- [ ] Merged to main branch
- [ ] Feature works with existing functionality

## 🔗 Useful Resources

### API Endpoints (Already Built)
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task (ready to use)
- `DELETE /api/tasks/:id` - Delete task (ready to use)
- `POST /api/register` - User registration
- `POST /api/login` - User login

### Frontend Components Structure
```
src/
├── components/
│   ├── TaskCard.jsx (to be created)
│   ├── TaskForm.jsx (to be created)
│   ├── EditTaskModal.jsx (to be created)
│   └── DeleteConfirmation.jsx (to be created)
├── pages/
│   ├── Home.jsx (to be created)
│   ├── EditTask.jsx (to be created)
│   └── ...existing pages
```

---

**Note:** Team members can create GitHub issues for each task and assign themselves. Use the issue templates we've set up!
