export interface ApiResponse<T> {
  data: T; // Our nestjs response interceptor will populate this with the data from the response
}

export interface Task {
  id: number;
  title: string;
  status: 'tode' | 'done';
}

export interface TaskPage {
  items: Task[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface LoginResult {
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}
