# Task Collaboration Tool

A simple and responsive web-based task management application designed to help users organize, manage, and track tasks through an interactive dashboard.

## Project Overview

The Task Collaboration Tool provides a centralized dashboard for creating tasks, assigning responsibilities, setting priorities, managing deadlines, and tracking task progress.

The application is developed using HTML, CSS, and JavaScript. It uses browser Local Storage to save tasks, allowing the task list to persist after refreshing the page in the same browser.

## Features

- **Task Creation:** Create new tasks with titles and descriptions.
- **Task Assignment:** Enter the name of the person responsible for a task.
- **Priority Management:** Categorize tasks as Low, Medium, or High.
- **Status Tracking:** Manage tasks using To Do, In Progress, and Completed statuses.
- **Due Date Management:** Set deadlines for individual tasks.
- **Task Editing:** Update existing task information.
- **Task Deletion:** Remove unwanted tasks with confirmation.
- **Search Functionality:** Search tasks by title, description, assignee, priority, or status.
- **Dashboard Statistics:** Display total tasks, pending tasks, in-progress tasks, and completed tasks.
- **Responsive Interface:** Support desktop and mobile screen sizes.
- **Local Data Storage:** Preserve tasks across browser refreshes using Local Storage.

## Technologies Used

| Technology | Purpose |
|---|---|
| HTML5 | Structure of the application |
| CSS3 | Styling and responsive layout |
| JavaScript | Task operations and dashboard interactions |
| Browser Local Storage | Store task information |
| Visual Studio Code | Development environment |
| Git and GitHub | Version control and project hosting |

## Project Structure

```text
Task-Collaboration-Tool/
│
├── index.html      # Main dashboard
├── style.css       # Application styling
├── app.js          # Task management functionality
└── README.md       # Project documentation
```

## Installation and Setup

### Prerequisites

- Visual Studio Code
- Google Chrome or another modern web browser
- Live Server extension for VS Code

### Steps to Run

1. Clone or download this repository.
2. Open the project folder in Visual Studio Code.
3. Install the Live Server extension if it is not already installed.
4. Right-click `index.html`.
5. Select **Open with Live Server**.
6. The application will open in your default browser.

## How to Use

1. Open the Task Collaboration Tool dashboard.
2. Click **New Task** to open the task form.
3. Enter the task title and description.
4. Add an assignee, select priority and status, and choose a due date.
5. Click **Save Task** to add the task to the dashboard.
6. Use **Edit** to update task information.
7. Use **Delete** to remove a task after confirmation.
8. Enter keywords in the search box to find specific tasks.
9. Monitor the dashboard statistics to track overall progress.

## Application Workflow

```text
Open Dashboard
      |
      v
Create a New Task
      |
      v
Enter Task Details
      |
      v
Save Task to Local Storage
      |
      v
Display Task in Dashboard
      |
      v
Search / Edit / Delete
      |
      v
Update Dashboard Statistics
```

## Learning Outcomes

This project demonstrates practical implementation of:

- HTML page structure and form design.
- Responsive web design using CSS.
- JavaScript event handling and DOM manipulation.
- CRUD operations: Create, Read, Update, and Delete.
- Searching and filtering task records.
- Managing task priorities and statuses.
- Browser Local Storage for data persistence.
- Organizing a small web development project for GitHub.

## Current Limitations

- Task information is stored locally in the browser.
- Data is not automatically synchronized across different devices or browsers.
- There is no backend server or centralized database in this version.
- Multiple users cannot collaborate on a shared task list in real time.

## Future Enhancements

- Integrate a Node.js and Express backend.
- Store tasks in a MySQL database.
- Add secure user authentication.
- Implement team-based task assignment and collaboration.
- Add notifications and deadline reminders.
- Introduce role-based access control.
- Deploy the application online.

## Author

**Your Name**

Electronics and Communication Engineering Student  
Interested in Web Development, Digital Design, and VLSI.

## License

This project is intended for educational and learning purposes. A license file can be added to define the terms for reuse and distribution.
