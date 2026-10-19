
const $ = (id) => document.getElementById(id);

const STORAGE_KEY = "taskflow_tasks_v1";
let tasks = [];
let storageAvailable = true;

function loadSavedTasks() {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        tasks = saved ? JSON.parse(saved) : [];

        if (!Array.isArray(tasks)) {
            tasks = [];
        }
    } catch (error) {
        storageAvailable = false;
        tasks = [];
        showMessage("pageMessage", "Browser storage is unavailable.");
    }
}

function saveTasks() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
        return true;
    } catch (error) {
        showMessage("pageMessage", "Could not save tasks in browser storage.");
        return false;
    }
}

function showMessage(id, message = "") {
    $(id).textContent = message;
}

function openForm(task = null) {
    $("taskForm").reset();

    $("taskId").value = task ? task.id : "";
    $("formHeading").textContent = task ? "Edit Task" : "Create New Task";
    $("saveBtn").textContent = task ? "Update Task" : "Save Task";

    $("title").value = task ? task.title : "";
    $("assignedTo").value = task ? task.assignedTo : "";
    $("description").value = task ? task.description : "";
    $("priority").value = task ? task.priority : "Medium";
    $("status").value = task ? task.status : "To Do";
    $("dueDate").value = task ? task.dueDate : "";

    showMessage("formMessage");
    $("formPanel").hidden = false;

    $("formPanel").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    $("title").focus();
}

function closeForm() {
    $("formPanel").hidden = true;
    $("taskForm").reset();
    $("taskId").value = "";
    showMessage("formMessage");
}

function updateStats() {
    $("totalTasks").textContent = tasks.length;
    $("pendingTasks").textContent =
        tasks.filter(task => task.status === "To Do").length;
    $("progressTasks").textContent =
        tasks.filter(task => task.status === "In Progress").length;
    $("completedTasks").textContent =
        tasks.filter(task => task.status === "Completed").length;
}

function addCell(row, text) {
    const cell = document.createElement("td");
    cell.textContent = text || "—";
    row.appendChild(cell);
    return cell;
}

function addBadge(cell, text, className) {
    const badge = document.createElement("span");
    badge.className = `badge ${className}`;
    badge.textContent = text;
    cell.replaceChildren(badge);
}

function renderTasks() {
    const query = $("search").value.trim().toLowerCase();

    const filtered = tasks.filter(task => {
        const text = [
            task.title,
            task.description,
            task.assignedTo,
            task.priority,
            task.status
        ].join(" ").toLowerCase();

        return text.includes(query);
    });

    const tbody = $("taskList");
    tbody.replaceChildren();

    if (filtered.length === 0) {
        const row = document.createElement("tr");
        const cell = document.createElement("td");

        cell.colSpan = 6;
        cell.className = "empty-state";
        cell.textContent = query
            ? "No matching tasks found."
            : "No tasks yet. Select + New Task to create one.";

        row.appendChild(cell);
        tbody.appendChild(row);
        updateStats();
        return;
    }

    filtered.forEach(task => {
        const row = document.createElement("tr");

        const titleCell = document.createElement("td");
        const title = document.createElement("strong");
        title.textContent = task.title;
        titleCell.appendChild(title);

        if (task.description) {
            const description = document.createElement("p");
            description.textContent = task.description;
            description.style.color = "#64748b";
            description.style.marginTop = "5px";
            titleCell.appendChild(description);
        }

        row.appendChild(titleCell);
        addCell(row, task.assignedTo || "Unassigned");

        const priorityCell = addCell(row, "");
        addBadge(
            priorityCell,
            task.priority,
            `priority-${task.priority.toLowerCase()}`
        );

        const statusCell = addCell(row, "");
        const statusClass = task.status.toLowerCase().replaceAll(" ", "-");
        addBadge(statusCell, task.status, `status-${statusClass}`);

        addCell(row, task.dueDate || "—");

        const actionsCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "action-btn edit-btn";
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => openForm(task));

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "action-btn delete-btn";
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteTask(task.id));

        actionsCell.append(editButton, deleteButton);
        row.appendChild(actionsCell);
        tbody.appendChild(row);
    });

    updateStats();
}

$("addTaskBtn").addEventListener("click", () => openForm());

$("cancelBtn").addEventListener("click", closeForm);

$("search").addEventListener("input", renderTasks);

$("taskForm").addEventListener("submit", event => {
    event.preventDefault();

    const title = $("title").value.trim();

    if (!title) {
        showMessage("formMessage", "Please enter a task title.");
        return;
    }

    const taskId = $("taskId").value;

    const taskData = {
        title,
        assignedTo: $("assignedTo").value.trim(),
        description: $("description").value.trim(),
        priority: $("priority").value,
        status: $("status").value,
        dueDate: $("dueDate").value
    };

    if (taskId) {
        tasks = tasks.map(task =>
            task.id === taskId ? { ...task, ...taskData } : task
        );
    } else {
        tasks.unshift({
            id: crypto.randomUUID(),
            ...taskData,
            createdAt: new Date().toISOString()
        });
    }

    if (!saveTasks()) {
        loadSavedTasks();
        renderTasks();
        return;
    }

    closeForm();
    showMessage("pageMessage", "Task saved successfully.");
    renderTasks();
});

function deleteTask(id) {
    if (!window.confirm("Are you sure you want to delete this task?")) {
        return;
    }

    const previousTasks = tasks;
    tasks = tasks.filter(task => task.id !== id);

    if (!saveTasks()) {
        tasks = previousTasks;
        renderTasks();
        return;
    }

    showMessage("pageMessage", "Task deleted successfully.");
    renderTasks();
}

// Start the application.
loadSavedTasks();
renderTasks();

if (!storageAvailable) {
    showMessage("pageMessage", "Storage is unavailable. Changes may not persist.");
}
