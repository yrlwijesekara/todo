 // Task data
        let tasks = [
            {
                id: 1,
                title: "Conduct user feedback session",
                dueDate: "2023-11-09",
                priority: "high",
                completed: false
            },
            {
                id: 2,
                title: "Draft social media content for November",
                dueDate: "2023-11-07",
                priority: "medium",
                completed: false
            },
            {
                id: 3,
                title: "Order new office supplies",
                dueDate: "2023-11-07",
                priority: "low",
                completed: true
            },
            {
                id: 4,
                title: "Plan next sprint meeting agenda",
                dueDate: "2023-11-07",
                priority: "high",
                completed: false
            },
            {
                id: 5,
                title: "Update expense report",
                dueDate: "2023-11-30",
                priority: "medium",
                completed: false
            },
            {
                id: 6,
                title: "Research competitive landscape",
                dueDate: "2023-10-30",
                priority: "high",
                completed: false
            },
            {
                id: 7,
                title: "Follow up on pending invoices",
                dueDate: "2023-10-20",
                priority: "low",
                completed: true
            },
            {
                id: 8,
                title: "Review project proposal for client A",
                dueDate: "2023-10-27",
                priority: "medium",
                completed: false
            },
            {
                id: 9,
                title: "Outline blog post on new feature releases",
                dueDate: "2025-07-31",
                priority: "high",
                completed: false
            },
            {
                id: 10,
                title: "Schedule 1-on-1 with John Doe",
                dueDate: "2025-07-29",
                priority: "low",
                completed: true
            },
            {
                id: 11,
                title: "Respond to team emails and slack messages",
                dueDate: "2025-07-30",
                priority: "medium",
                completed: false
            },
            {
                id: 12,
                title: "Prepare presentation for Q3 review",
                dueDate: "2025-07-30",
                priority: "high",
                completed: false
            }
        ];
        
        let currentFilter = 'all';
        let nextId = 13;

        // DOM Elements
        const taskList = document.getElementById('taskList');
        const modalOverlay = document.getElementById('modalOverlay');
        const taskForm = document.getElementById('taskForm');
        const searchInput = document.getElementById('searchInput');
        const filterButtons = document.querySelectorAll('.filter-btn');

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            renderTasks();
            setupEventListeners();
        });

        function setupEventListeners() {
            // Filter buttons
            filterButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    filterButtons.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentFilter = this.dataset.filter;
                    renderTasks();
                });
            });

            // Search
            searchInput.addEventListener('input', function() {
                renderTasks();
            });

            // Form submission
            taskForm.addEventListener('submit', function(e) {
                e.preventDefault();
                addTask();
            });
        }

        function renderTasks() {
            const searchTerm = searchInput.value.toLowerCase();
            let filteredTasks = tasks;

            // Apply search filter
            if (searchTerm) {
                filteredTasks = filteredTasks.filter(task => 
                    task.title.toLowerCase().includes(searchTerm)
                );
            }

            // Apply status filter
            if (currentFilter === 'active') {
                filteredTasks = filteredTasks.filter(task => !task.completed);
            } else if (currentFilter === 'completed') {
                filteredTasks = filteredTasks.filter(task => task.completed);
            }

            // Render tasks
            taskList.innerHTML = filteredTasks.map(task => `
                <div class="task-item ${task.completed ? 'completed' : ''}">
                    <div class="task-checkbox ${task.completed ? 'checked' : ''}" 
                         onclick="toggleTask(${task.id})"></div>
                    <div class="task-content">
                        <div class="task-title">${task.title}</div>
                        <div class="task-meta">
                            <div class="task-due">Due: ${formatDate(task.dueDate)}</div>
                            <div class="priority-indicator">
                                <div class="priority-dot ${task.priority}"></div>
                                <span>${capitalizeFirst(task.priority)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
            }
        }

        function addTask() {
            const taskName = document.getElementById('taskName').value;
            const taskDate = document.getElementById('taskDate').value;
            const taskPriority = document.getElementById('taskPriority').value;

            const newTask = {
                id: nextId++,
                title: taskName,
                dueDate: taskDate,
                priority: taskPriority,
                completed: false
            };

            tasks.unshift(newTask);
            renderTasks();
            closeModal();
            taskForm.reset();
        }

        function openModal() {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

        function closeModal(event) {
            if (!event || event.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = 'auto';
                taskForm.reset();
            }
        }

        function clearCompleted() {
            tasks = tasks.filter(task => !task.completed);
            renderTasks();
        }

        function formatDate(dateString) {
            const date = new Date(dateString);
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            return `${months[date.getMonth()]} ${String(date.getDate()).padStart(2, '0')}, ${date.getFullYear()}`;
        }

        function capitalizeFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
                closeModal();
            }
        });
