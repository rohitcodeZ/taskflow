# TaskFlow - Full Stack Task Management App

TaskFlow is a full-stack task management application built with **React.js, Node.js, Express.js, and MongoDB**. It allows users to create, update, manage, filter, and track their daily tasks through a modern and interactive interface.

The project started as a basic CRUD Todo application and has been enhanced with productivity-focused features such as task status, priorities, categories, due dates, search, filtering, sorting, and task progress tracking.

## 🚀 Features

### Task Management

* Create new tasks
* View all tasks
* Update existing tasks
* Delete tasks
* Complete and reopen tasks
* Change task status

### Task Organization

* 🔴 High priority
* 🟡 Medium priority
* 🟢 Low priority
* Task categories
* Due dates
* Pending, In Progress, and Completed statuses

### User Experience

* Modern responsive interface
* Dark-themed UI
* Loading states
* Success notifications
* Error messages
* Delete confirmation
* Interactive task controls
* Responsive design for different screen sizes

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* JavaScript
* HTML5
* CSS3

### Backend

* Node.js
* Express.js
* REST API
* MongoDB
* MongoDB Node.js Driver
* CORS

### Development Tools

* VS Code
* Git
* GitHub
* npm

## 📂 Project Structure

```text
TaskFlow/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── index.js
│   ├── dbconfig.js
│   ├── package.json
│   └── ...
│
└── README.md
```

## 🔄 Task Flow

```text
Create Task
     ↓
Set Priority
     ↓
Select Category
     ↓
Set Due Date
     ↓
Pending
     ↓
In Progress
     ↓
Completed
```

Tasks can also be edited, reopened, searched, filtered, sorted, or deleted.

## 🔌 API Endpoints

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/add-task`          | Create a new task   |
| GET    | `/tasks`             | Get all tasks       |
| GET    | `/task/:id`          | Get a specific task |
| PUT    | `/update-task`       | Update task details |
| PUT    | `/update-status/:id` | Update task status  |
| DELETE | `/delete/:id`        | Delete a task       |

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
```

### 2. Go to the project directory

```bash
cd TaskFlow
```

### 3. Install frontend dependencies

```bash
cd frontend
npm install
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 5. Configure MongoDB

Create your MongoDB connection configuration in the backend.

Do not upload your MongoDB username, password, API keys, or other secrets to GitHub.

### 6. Start the backend

```bash
npm start
```

The backend runs on:

```text
http://localhost:3200
```

### 7. Start the frontend

```bash
npm run dev
```

## 🔐 Environment Variables

If your project uses environment variables, create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

Add `.env` to `.gitignore`:

```text
.env
node_modules
```

Never commit passwords or database credentials to GitHub.

## 📸 Application

### Dashboard

The dashboard provides an overview of:

* Total tasks
* Completed tasks
* Pending tasks
* Overdue tasks
* Overall progress

### Task Management

Users can:

* Create tasks
* Edit tasks
* Change priority
* Set categories
* Set deadlines
* Change status
* Delete tasks

## 🎯 Future Improvements

Planned features include:

* User authentication
* JWT-based authorization
* User-specific tasks
* Drag and drop task ordering
* Favorite tasks
* Dark/light mode
* Browser reminders
* Activity history
* Productivity charts
* Email notifications
* Cloud deployment

## 👨‍💻 Author

**Rohit Kumar**

Full Stack Web Developer

### Technologies

React.js • Node.js • Express.js • MongoDB • JavaScript • REST APIs

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

```

### One important recommendation

Since you're still **actively adding features**, don't claim features like authentication, drag-and-drop, reminders, or charts as completed. I listed them under **Future Improvements** so your README stays accurate.

For the GitHub repository, I would name it something like:

**`taskflow-fullstack`**

or

**`mern-task-management-app`**

I'd choose **`taskflow-fullstack`** because it sounds more like a real portfolio project than `todo-app`.
```
