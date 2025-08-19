let habits = JSON.parse(localStorage.getItem("habits")) || [];

// Render habits on page load
document.addEventListener("DOMContentLoaded", renderHabits);

function addHabit() {
    const input = document.getElementById("habit-input");
    const habitName = input.value.trim();
    if (habitName === "") {
        alert("Please enter a habit!");
        return;
    }

    const habit = { name: habitName, done: false };
    habits.push(habit);
    localStorage.setItem("habits", JSON.stringify(habits));
    input.value = "";
    renderHabits();
}

function toggleHabit(index) {
    habits[index].done = !habits[index].done;
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

function deleteHabit(index) {
    habits.splice(index, 1);
    localStorage.setItem("habits", JSON.stringify(habits));
    renderHabits();
}

function renderHabits() {
    const list = document.getElementById("habit-list");
    list.innerHTML = "";

    habits.forEach((habit, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item " + (habit.done ? "done" : "");
        li.innerHTML = `
            ${habit.name}
            <div>
                <button class="btn btn-sm btn-primary mr-2" onclick="toggleHabit(${index})">
                    ${habit.done ? "Undo" : "Done"}
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteHabit(${index})">Delete</button>
            </div>
        `;
        list.appendChild(li);
    });
}
