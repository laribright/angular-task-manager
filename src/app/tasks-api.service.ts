import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_BASE_URL } from './api.config';
import type { TaskPage, Task, LoginResult, ApiResponse } from './api.models';

@Injectable({
  providedIn: 'root',
})
export class TasksApiService {
  private http = inject(HttpClient);
  private accessToken = '';

  login(email: string, password: string) {
    return this.http.post<ApiResponse<LoginResult>>(`${API_BASE_URL}/auth/login`, {
      email,
      password,
    });
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }

  listTasks() {
    return this.http.get<ApiResponse<TaskPage>>(`${API_BASE_URL}/v1/tasks`, {
      params: {
        page: 1,
        limit: 20,
        sortBy: 'id',
        sortOrder: 'desc',
      },
      headers: this.authHeaders(),
    });
  }

  createTask(title: string) {
    return this.http.post<ApiResponse<Task>>(
      `${API_BASE_URL}/v1/tasks`,
      { title },
      {
        headers: this.authHeaders(),
      },
    );
  }

  private authHeaders() {
    return {
      Authorization: `Bearer ${this.accessToken}`,
    };
  }
}
