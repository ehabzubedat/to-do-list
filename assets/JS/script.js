$(function () {
    // Variables
    if (localStorage.getItem('tasks') == null) {
        var tasks = [];
    } else {
        var tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    // flatpickr - Date & Time
    $('#date').flatpickr({
        async: false,
        dateFormat: 'd/m/y'
    });

    $('#time').flatpickr({
        enableTime: true,
        noCalendar: true,
        dateFormat: "H:i",
        time_24hr: true
    });

    // Retrieve all tasks data on load
    retrieveData();

    // Event That Checks a tasks as done
    $('#tasks').on('click', '.checkbox', function () {
        var curIndex = $(this).parent().index();
        $(this).next().toggleClass('line-through');

        if (this.checked) {
            tasks[curIndex].checked = true;
        } else {
            tasks[curIndex].checked = false;
        }

        localStorage.setItem('tasks', JSON.stringify(tasks));
    });

    // Add task button
    $('#add_btn').click(() => {
        if (checkInput()) {
            add_task();
            emptyInput();
        } else {
            alert('Error.. Please Fill All Input Fields!');
        }
    });

    // Reset input button
    $('#reset_btn').click(emptyInput);

    // Function that empty form input fields
    function emptyInput() {
        $('#task,#date,#time').val('');
    }

    // Delete button that deletes a task
    $('#tasks').on('click', '.delete', function () {
        let selectedTask = $(this).parent().parent();
        let sure = confirm(`Are you sure you want to delete this task?`);

        if(sure) {
            tasks.splice(selectedTask.index(), 1);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            selectedTask.fadeOut(500, function() {
                selectedTask.remove();
            });
        }
    })

    // Function that retrieve's all tasks data from local storage
    function retrieveData() {
        $.each(tasks, function (i, task) {
            let is_checked = '';
            let txt_decoration = '';

            if (task.checked) {
                is_checked = 'checked';
                txt_decoration = 'line-through';
            }

            new_task = `<li class="task">
                            <input class="checkbox" type="checkbox" ${is_checked}>
                            <span class="task-title ${txt_decoration}">${task.task}</span>
                            <span class="datetime">
                                ${task.date} ${task.time}
                                <span class="delete">
                                    <i class="fa fa-times" aria-hidden="true"></i>
                                </span>
                            </span>
                        </li>`;

            $('#tasks').append(new_task);
        });
    }

    // Function that adds a new task
    function add_task() {
        let task = $('#task').val();
        let date = $('#date').val();
        let time = $('#time').val();

        tasks.unshift({
            task: $('#task').val(),
            date: $('#date').val(),
            time: $('#time').val(),
            checked: false
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));

        new_task = `<li class="task">
                        <input class="checkbox" type="checkbox">
                        <span class="task-title">${task}</span>
                        <span class="datetime">
                            ${date} ${time}
                            <span class="delete">
                                <i class="fa fa-times" aria-hidden="true"></i>
                            </span>
                        </span>
                    </li>`;

        $('#tasks').prepend(new_task);
    }

    // Function that validate input 
    function checkInput() {
        let task = $('#task').val();
        let date = $('#date').val();
        let time = $('#time').val();

        if (task = '' || date == '' || time == '') {
            return false
        }
        return true;
    }
});