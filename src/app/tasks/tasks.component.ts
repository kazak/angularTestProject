import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})

export class TasksComponent {

    objectKeys   = Object.keys;
    tasks:   any = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : {};
    newTask: any = {name: ''};
    currentTask  = '';
    newComment   = '';
    // mock user
    user = {name: 'User', avatar: '/assets/avatars/1.png'};

    // Listan keydown to save comment
    onKeyDown(event) {
        if (event.ctrlKey && event.keyCode === 13) {
            this.saveComment();
        }
    }

    // Create new task
    addTask() {
        const name = this.newTask.name;
        this.tasks[name] = this.tasks[name] ?
            this.tasks[name] : { name: this.newTask.name };

        this.saveTasks();
        this.setCurrentTask(name);
    }

    // Get activ task
    getCurrentTask() {
        return this.currentTask ? this.tasks[this.currentTask] : this.newTask;
    }

    // Remove task
    deleteTask(task) {
        delete(this.tasks[task]);
        this.saveTasks();
    }

    // Change activ task
    setCurrentTask(taskName) {
        this.currentTask = taskName;
    }

    // Save changes in local storage
    saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // Create new comment
    saveComment() {
        if (this.newComment === '') { return; }

        const curTask: string = this.currentTask;

        if (!this.tasks[curTask]['comments']) {
            this.tasks[curTask]['comments'] = [];
        }

        this.tasks[curTask]['comments'].push(
            {
                avatar: this.user.avatar,
                text: this.newComment
            }
        );

        this.saveTasks();
        this.newComment = '';
    }
}
