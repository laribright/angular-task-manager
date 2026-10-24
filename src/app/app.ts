import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { RouterOutlet } from '@angular/router';

import { TasksApiService } from './tasks-api.service';
import { Task } from './api.models';

@Component({
  // imports: [RouterOutlet],
  imports: [FormsModule],
  standalone: true,
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  readonly heading = 'My Tasks';
  private readonly api = inject(TasksApiService);
  email = '';
  password = '';
  readonly signedId = signal(false);
  readonly signingIn = signal(false);
  readonly error = signal('');

  readonly tasks = signal<Task[]>([]);
  readonly loading = signal(false);
  readonly total = signal(0);

  protected taskTitle = '';
  private readonly saving = signal(false);

  createTask() {
    const title = this.taskTitle.trim();
    if (!title || this.saving()) return;

    this.error.set('');
    this.saving.set(true);

    this.api.createTask(title).subscribe({
      next: () => {
        this.taskTitle = '';
        this.saving.set(false);
        this.loadTasks();
      },
      error: () => {
        this.saving.set(false);
        this.error.set('Failed to create task');
      },
    });
  }

  signIn() {
    if (this.signingIn()) return;
    this.signingIn.set(true);
    this.error.set('');

    this.api.login(this.email.trim(), this.password).subscribe({
      next: (response) => {
        this.api.setAccessToken(response.data.accessToken);
        this.password = '';
        this.signingIn.set(false);
        this.signedId.set(true);
      },
      error: () => {
        this.signingIn.set(false);
        this.error.set('Invalid email or password');
      },
    });
  }

  signOut() {
    this.api.setAccessToken('');
    this.signedId.set(false);
    this.error.set('');
    this.tasks.set([]);
    this.total.set(0);
  }

  loadTasks() {
    if (this.loading()) return;
    this.loading.set(true);
    this.error.set('');
    this.api.listTasks().subscribe({
      next: (response) => {
        this.tasks.set(response.data.items);
        this.total.set(response.data.meta.total);
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        if (error.status === 401) {
          this.signOut();
          this.error.set('Session expired');
        } else {
          this.error.set('Failed to load tasks');
        }
      },
    });
  }
}
