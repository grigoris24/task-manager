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

document.getElementById("add_task").addEventListener("click", function() {

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
    };
    if (task !== "") {
        document.getElementById("no_tasks_found").style.display = "none";
        document.getElementById("task_text").value = "";
        document.getElementById("task_date").value = ""; 

        let newdiv = document.createElement("div");
        newdiv.id = `task-${taskId}`;
        newdiv.dataset.timestamp = Date.now(); 
        let newp = document.createElement("p");
        
        newp.textContent = `${taskId}. ${task}`;
        newp.style.maxWidth = "500px";
        newp.style.width = "500px";

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
        if (taskDate) {
            duedate.textContent = `Due by ${taskDate}`;
        } else {
            duedate.textContent = `No due date`;
        }
        const created = document.createElement("p");
        const now = new Date();
        const formattedDate = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;
        created.textContent=`Created at ${formattedDate}`;

        newdiv.appendChild(radio_button);
        newdiv.appendChild(newp);
        document.getElementById("tasks").appendChild(newdiv);
        newdiv.appendChild(created);
        newdiv.appendChild(duedate);
        taskId++;
        document.getElementById("check_all").style.display = "flex";
    }

    
})

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
