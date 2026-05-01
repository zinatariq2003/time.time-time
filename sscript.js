let timer;
let timeLeft;
let tasks = [];

function addTask() {
    const name = document.getElementById('taskName').value;
    const duration = document.getElementById('taskDuration').value;

    if (name && duration) {
        const task = { name, duration: duration * 60 };
        tasks.push(task);
        updateTaskList();
        
        // مسح المدخلات
        document.getElementById('taskName').value = '';
        document.getElementById('taskDuration').value = '';
    }
}

function updateTaskList() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${task.name} (${task.duration / 60} دقيقة)</span>
            <button onclick="selectTask(${index})">اختيار</button>
        `;
        list.appendChild(li);
    });
}

function selectTask(index) {
    const task = tasks[index];
    document.getElementById('current-task-title').innerText = task.name;
    timeLeft = task.duration;
    updateDisplay();
    document.getElementById('start-btn').disabled = false;
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById('time-left').innerText = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
    clearInterval(timer);
    document.getElementById('start-btn').disabled = true;

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();

        if (timeLeft <= 0) {
            clearInterval(timer);
            playAlarm();
            alert("انتهى الوقت! حان وقت الراحة أو المهمة التالية.");
        }
    }, 1000);
}

function playAlarm() {
    const alarm = document.getElementById('alarm-sound');
    alarm.play();
}