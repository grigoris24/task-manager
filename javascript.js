document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("task_text").value = "";

    document.getElementById("task_form").addEventListener("submit", function(event) {
        event.preventDefault();
    });

});

const checkAllCheckbox = document.getElementById("checkem");
    if (checkAllCheckbox) {
        checkAllCheckbox.checked = false;
        checkAllCheckbox.addEventListener("change", function() {
            const isChecked = this.checked;
            const taskDivs = document.getElementById("tasks").querySelectorAll("div");

            taskDivs.forEach(taskDiv => {
                const checkbox = taskDiv.querySelector("input[type='checkbox']");
                if (checkbox) {
                    checkbox.checked = isChecked;
                }
            });
        });
    }

document.getElementById("tasks").addEventListener("click", function(event) {
    if (event.target && event.target.closest(".tasks")) {
        const taskDiv = event.target.closest(".tasks");
        if (event.target.tagName === "INPUT" && event.target.type === "checkbox") {
            event.stopPropagation();
            return;
        }
        const checkbox = taskDiv.querySelector("input[type='checkbox']");

        if (checkbox) {
            checkbox.checked = !checkbox.checked;
        }
    }
});
    



document.getElementById("delete_all").addEventListener("click", function() {
    const tasksContainer = document.getElementById("tasks");
    const taskDivs = tasksContainer.querySelectorAll("div");

    taskDivs.forEach(taskDiv => {
        tasksContainer.removeChild(taskDiv);
    })
    taskId = 1;
    document.getElementById("no_tasks_found").style.display = "block";
    document.getElementById("check_all").style.display = "none";
    const checkAllCheckbox = document.getElementById("checkem");
        checkAllCheckbox.checked = false;
    resetSortButtonColors()
});

document.getElementById("delete_selected").addEventListener("click", function () {
    const tasksContainer = document.getElementById("tasks");
    const taskDivs = tasksContainer.querySelectorAll("div"); 

    taskDivs.forEach(taskDiv => {
        const checkbox = taskDiv.querySelector("input[type='checkbox']");
        if (checkbox && checkbox.checked) {
            tasksContainer.removeChild(taskDiv); 
        }
    });

    
    const remainingTasks = tasksContainer.querySelectorAll("div");
    let newTaskId = 1;
    remainingTasks.forEach(taskDiv => {
        const taskText = taskDiv.querySelector("p");
        if (taskText) {
            taskText.textContent = `${newTaskId}. ${taskText.textContent.split('. ')[1]}`;
        }
        taskDiv.id = `task-${newTaskId}`; 
        newTaskId++;
    });

    
    taskId = newTaskId;

    
    if (remainingTasks.length === 0) {
        document.getElementById("no_tasks_found").style.display = "block";
        document.getElementById("check_all").style.display = "none";
        const checkAllCheckbox = document.getElementById("checkem");
        checkAllCheckbox.checked = false;
        resetSortButtonColors()
    }
});



let taskId = 1;

document.getElementById("add_task").addEventListener("click", function () {
    let task = document.getElementById("task_text").value;
    let taskDate = document.getElementById("task_date").value;
    if (task == "") {
        const floatingWindow = document.getElementById("floatingWindow");
        floatingWindow.style.display = "block";
        floatingWindow.style.animation = "fadeSlideIn 0.5s forwards";

        setTimeout(() => {
            floatingWindow.style.animation = "fadeSlideOut 0.5s forwards";
            setTimeout(() => {
                floatingWindow.style.display = "none";
                floatingWindow.style.animation = "none";
            }, 500);
        }, 3000);
    }
    if (task !== "") {
        document.getElementById("no_tasks_found").style.display = "none";
        document.getElementById("task_text").value = "";
        document.getElementById("task_date").value = "";

        let newdiv = document.createElement("div");
        newdiv.id = `task-${taskId}`;
        newdiv.dataset.timestamp = Date.now();

        let newp = document.createElement("p");
        newp.textContent = `${taskId}. ${task}`;
        newp.style.maxWidth = "470px";
        newp.style.width = "470px";

        let radio_button = document.createElement("input");
        radio_button.type = "checkbox";
        radio_button.name = "task";

        newdiv.style.display = "flex";
        newdiv.style.flexDirection = "row";
        newdiv.style.gap = "20px";
        newdiv.style.paddingTop = "10px";
        newdiv.style.paddingBottom = "10px";
        newdiv.style.paddingLeft = "5px";
        newdiv.classList.add("tasks");

        if (taskDate) {
            newdiv.dataset.taskdate = taskDate;
        }
        const duedate = document.createElement("p");
        duedate.id = "duedateid";
        if (taskDate) {
            duedate.textContent = `Due by ${taskDate}`;
        } else {
            duedate.textContent = `No due date`;
        }

        const created = document.createElement("p");
        const now = new Date();
        const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
        created.textContent = `Created at ${formattedDate}`;

        const editButton = document.createElement("button");
        editButton.innerHTML = `
        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 121.48 122.88" style="enable-background:new 0 0 121.48 122.88" xml:space="preserve">
        <style type="text/css">
            .st0 { fill-rule:evenodd; clip-rule:evenodd; }
        </style>
        <g>
            <path class="st0" d="M96.84,2.22l22.42,22.42c2.96,2.96,2.96,7.8,0,10.76l-12.4,12.4L73.68,14.62l12.4-12.4 C89.04-0.74,93.88-0.74,96.84,2.22L96.84,2.22z M70.18,52.19L70.18,52.19l0,0.01c0.92,0.92,1.38,2.14,1.38,3.34 c0,1.2-0.46,2.41-1.38,3.34v0.01l-0.01,0.01L40.09,88.99l0,0h-0.01c-0.26,0.26-0.55,0.48-0.84,0.67h-0.01 c-0.3,0.19-0.61,0.34-0.93,0.45c-1.66,0.58-3.59,0.2-4.91-1.12h-0.01l0,0v-0.01c-0.26-0.26-0.48-0.55-0.67-0.84v-0.01 c-0.19-0.3-0.34-0.61-0.45-0.93c-0.58-1.66-0.2-3.59,1.11-4.91v-0.01l30.09-30.09l0,0h0.01c0.92-0.92,2.14-1.38,3.34-1.38 c1.2,0,2.41,0.46,3.34,1.38L70.18,52.19L70.18,52.19L70.18,52.19z M45.48,109.11c-8.98,2.78-17.95,5.55-26.93,8.33 C-2.55,123.97-2.46,128.32,3.3,108l9.07-32v0l-0.03-0.03L67.4,20.9l33.18,33.18l-55.07,55.07L45.48,109.11L45.48,109.11z M18.03,81.66l21.79,21.79c-5.9,1.82-11.8,3.64-17.69,5.45c-13.86,4.27-13.8,7.13-10.03-6.22L18.03,81.66L18.03,81.66z"/>
        </g>
        </svg>`;
        editButton.style.width = "15px";
        editButton.style.height = "15px";
        editButton.style.background = "none";
        editButton.style.border = "none";
        editButton.style.cursor = "pointer";
        editButton.title = "Edit task";
        editButton.classList.add("edit_button");
      
        newdiv.appendChild(radio_button);
        newdiv.appendChild(newp);
         
        document.getElementById("tasks").appendChild(newdiv);
        newdiv.appendChild(created);
        newdiv.appendChild(duedate);
        newdiv.appendChild(editButton);

        taskId++;
        document.getElementById("check_all").style.display = "flex";
    }
});


document.getElementById("mark_completed").addEventListener("click", function() {
    const tasksContainer = document.getElementById("tasks");
    const taskDivs = tasksContainer.querySelectorAll("div");

    taskDivs.forEach(taskDiv => {
        const checkbox = taskDiv.querySelector("input[type='checkbox']");
        const the_task = taskDiv.querySelector("p");
        if (checkbox && checkbox.checked) {
            the_task.style.textDecoration = "line-through";
            the_task.style.color = "green" ;
            
        }
    })
})

document.getElementById("unmark").addEventListener("click", function() {
    const tasksContainer = document.getElementById("tasks");
    const taskDivs = tasksContainer.querySelectorAll("div");

    taskDivs.forEach(taskDiv => {
        const checkbox = taskDiv.querySelector("input[type='checkbox']");
        const the_task = taskDiv.querySelector("p");
        if (checkbox && checkbox.checked) {
            the_task.style.textDecoration = "none";
            the_task.style.color = "black" ;
            
        }
    })
})


let sortByDateAsc = true; 
let sortByNameAsc = true; 
let sortByStatusAsc = true; 
let sortByIdAsc = true;
let sortByDueAsc = true;

document.getElementById("sort_by_date").addEventListener("click", function() {
    const tasksContainer = document.getElementById("tasks");
    const taskDivs = Array.from(tasksContainer.querySelectorAll("div"));

    resetSortButtonColors();

    taskDivs.sort((a, b) => {
        const taskNameA = a.querySelector("p").textContent.split(". ")[1].toLowerCase();
        const taskNameB = b.querySelector("p").textContent.split(". ")[1].toLowerCase();
        
        if (sortByNameAsc) {
            return taskNameA.localeCompare(taskNameB);
        } else {
            return taskNameB.localeCompare(taskNameA);
        }
    });

    taskDivs.forEach(taskDiv => tasksContainer.appendChild(taskDiv));

    if (sortByNameAsc) {
        this.style.backgroundColor = "#E1ECF4";
    } else {
        this.style.backgroundColor = "#3F84F6";
    }

    sortByNameAsc = !sortByNameAsc;
});

document.getElementById("sort_by_status").addEventListener("click", function() {
    const tasksContainer = document.getElementById("tasks");
    const taskDivs = Array.from(tasksContainer.querySelectorAll("div"));

    resetSortButtonColors();

    taskDivs.sort((a, b) => {
        const isCompletedA = a.querySelector("p").style.color === "green";
        const isCompletedB = b.querySelector("p").style.color === "green";
        
        if (sortByStatusAsc) {
            return isCompletedA - isCompletedB; 
        } else {
            return isCompletedB - isCompletedA; 
        }
    });

    taskDivs.forEach(taskDiv => tasksContainer.appendChild(taskDiv));

    if (sortByStatusAsc) {
        this.style.backgroundColor = "#E1ECF4";
    } else {
        this.style.backgroundColor = "#3F84F6";
    }

    sortByStatusAsc = !sortByStatusAsc;
});

document.getElementById("sort_by_id").addEventListener("click", function() {
    const tasksContainer = document.getElementById("tasks");
    const taskDivs = Array.from(tasksContainer.querySelectorAll("div"));

    resetSortButtonColors();

    taskDivs.sort((a, b) => {
        const taskIdA = parseInt(a.id.replace("task-", ""));
        const taskIdB = parseInt(b.id.replace("task-", ""));
        
        if (sortByIdAsc) {
            return taskIdA - taskIdB;
        } else {
            return taskIdB - taskIdA;
        }
    });

    taskDivs.forEach(taskDiv => tasksContainer.appendChild(taskDiv));

    if (sortByIdAsc) {
        this.style.backgroundColor = "#E1ECF4";
    } else {
        this.style.backgroundColor = "#3F84F6";  
    }

    sortByIdAsc = !sortByIdAsc;
});

document.getElementById("sort_by_due").addEventListener("click", function() {
    const tasksContainer = document.getElementById("tasks");
    const taskDivs = Array.from(tasksContainer.querySelectorAll("div"));

    resetSortButtonColors();

    taskDivs.sort((a, b) => {
        const taskDateA = new Date(a.dataset.taskdate);
        const taskDateB = new Date(b.dataset.taskdate);

        if (isNaN(taskDateA) || isNaN(taskDateB)) {
            return 0;  
        }

        if (sortByDueAsc) {
            return taskDateA - taskDateB; 
        } else {
            return taskDateB - taskDateA; 
        }
    });

    taskDivs.forEach(taskDiv => tasksContainer.appendChild(taskDiv));

    
    if (sortByDueAsc) {
        this.style.backgroundColor = "#E1ECF4";  
    } else {
        this.style.backgroundColor = "#3F84F6";  
    }

    sortByDueAsc = !sortByDueAsc;
});


function resetSortButtonColors() {
    const sortButtons = document.querySelectorAll("#sort_by_date, #sort_by_status, #sort_by_id, #sort_by_due");
    sortButtons.forEach(button => {
        button.style.backgroundColor = ""; 
    });
}

document.getElementById("tasks").addEventListener("click", function(event) {
    if (event.target && event.target.closest(".edit_button")) {
        const taskDiv = event.target.closest(".tasks");

        const taskText = taskDiv.querySelector("p").textContent.split(". ")[1];
        const taskDate = taskDiv.dataset.taskdate;

        document.getElementById("newTaskName").value = taskText;
        document.getElementById("newDueDate").value = taskDate;

        document.getElementById("editModal").style.display = "flex";

        document.getElementById("editForm").onsubmit = function(event) {
            event.preventDefault();

            const newTaskName = document.getElementById("newTaskName").value;
            const newDueDate = document.getElementById("newDueDate").value;

            taskDiv.querySelector("p").textContent = `${taskDiv.id.replace("task-", "")}. ${newTaskName}`;
            
            const dueDateElement = taskDiv.querySelector("#duedateid"); 
            if (newDueDate) {
                taskDiv.dataset.taskdate = newDueDate;
                dueDateElement.textContent = `Due by ${newDueDate}`;
            } else {
                dueDateElement.textContent = `No due date`;
            }

            document.getElementById("editModal").style.display = "none";
        };

        document.getElementById("closeModal").addEventListener("click", function() {
            document.getElementById("editModal").style.display = "none";
        });
    }
});




