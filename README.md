# Angular Task Manager

Companion frontend for the **NestJS Complete Course** — a task-manager interface built with Angular, TypeScript, standalone components, signals, template-driven forms and HttpClient.

Learn Angular from scratch, then connect the interface to our NestJS API to log in, view personal tasks and create new ones.

## Course on Udemy

- **[Purchase with love](https://www.udemy.com/course/nestjs-complete-course/?couponCode=CODEWITHLARI)** — 50% off while the coupon is active
- Or the [full course here](https://www.udemy.com/course/nestjs-complete-course/?referralCode=2164FFED884D2E1A4CE3)

The complete course includes the NestJS backend lessons and project source code.

## What you will learn

- Angular project structure and application bootstrap
- Standalone components, templates and CSS
- Reactive state with signals
- Conditional rendering with `@if` and `@else`
- Rendering lists with `@for` and `track`
- Two-way binding with `ngModel`
- Template-driven forms and validation
- Injectable services and HttpClient
- JWT bearer authentication
- Fetching and creating tasks through a REST API
- Loading states and error handling
- Development and production API configuration

## Prerequisites

- Node.js supported by the Angular version in `package.json`
- npm
- Basic HTML, CSS, JavaScript and TypeScript knowledge
- The NestJS backend running locally or deployed, for the login and task features

No previous Angular experience is required. PostgreSQL and Redis are backend dependencies; they are not installed or configured in this frontend project.

## Branches

| Branch | Content                    |
| ------ | -------------------------- |
| `main` | Completed Angular frontend |

## 1. Clone

```bash
git clone https://github.com/laribright/angular-task-manager.git
cd angular-task-manager
```

## 2. Install

From the frontend project directory:

```bash
npm install
```

Keep the Angular frontend and NestJS backend in separate project folders.

## 3. Configure the API URL

The course's initial setup uses `src/app/api.config.ts`:

```ts
export const API_BASE_URL = 'http://localhost:3000';
```

Set this to your backend's base URL. Do not include `/auth/login` or `/v1/tasks`; the API service appends those paths.

If you followed the environment-file setup instead, configure the URL in:

- `src/environments/environment.development.ts` for local development
- `src/environments/environment.ts` for production

```ts
export const environment = {
  apiUrl: 'http://localhost:3000',
};
```

The service must use the configuration approach present in your project. With Angular environment file replacements configured, a production build uses the production URL.

**Frontend configuration is public.** API URLs can be committed. Database passwords, JWT signing secrets and private API keys belong in the backend. Adding a frontend file to `.gitignore` does not hide values included in the browser build.

## 4. Start the backend

Follow the backend README to install its dependencies, configure its environment variables and apply database migrations.

From the backend project:

```bash
npm run start:dev
```

Default addresses:

- API: `http://localhost:3000`
- Swagger documentation: `http://localhost:3000/docs`

The frontend expects these endpoints and response fields:

| Method | Endpoint      | Purpose                                                 |
| ------ | ------------- | ------------------------------------------------------- |
| `POST` | `/auth/login` | Log in and receive `data.accessToken`                   |
| `GET`  | `/v1/tasks`   | Get a task page containing `data.items` and `data.meta` |
| `POST` | `/v1/tasks`   | Create a task using a `{ "title": "..." }` body         |

Both task endpoints require an `Authorization: Bearer <accessToken>` header. Match the service URLs and response types to the backend version you are running.

## 5. Enable backend CORS

In the NestJS backend's `src/main.ts`, before `app.listen()`:

```ts
app.enableCors({
  origin: 'http://localhost:4200',
});
```

Restart the backend after changing this. When deploying, allow your deployed frontend's origin too.

## 6. Run the frontend

In a separate terminal, from the Angular project:

```bash
npm start
```

Open `http://localhost:4200`, or the address printed in the terminal.

## 7. Try the application

1. Create an account using the backend's registration endpoint if you do not have one.
2. Log in through the Angular interface.
3. View your personal tasks.
4. Enter a task title and create a task.
5. Confirm that the list updates.

The tutorial stores the access token in service memory. Reloading the page clears it. Log in again after reloading or when the token expires; this frontend lesson does not implement automatic refresh-token handling.

## Production build

Configure the production API URL before building:

```bash
npx ng build --configuration production
```

Build output is written under `dist/`. Use the browser output directory generated by your Angular build when configuring static hosting. The frontend build does not deploy the NestJS backend.

## Troubleshooting

| Problem                                            | Check                                                                           |
| -------------------------------------------------- | ------------------------------------------------------------------------------- |
| Angular CLI reports an unsupported Node version    | Use a Node release supported by the installed Angular CLI.                      |
| Login or tasks return `401 Unauthorized`           | Check credentials, token expiration and the bearer header on task requests.     |
| Swagger works but the browser reports CORS errors  | Allow the exact frontend origin in the NestJS CORS configuration.               |
| Requests fail to connect                           | Confirm the backend is running and the API base URL is correct.                 |
| Requests return `404 Not Found`                    | Check route prefixes and API versioning in the backend.                         |
| `No provider for HttpClient`                       | Add `provideHttpClient()` to the existing providers in `src/app/app.config.ts`. |
| `ngModel` is not recognized                        | Import `FormsModule` in the component using it.                                 |
| Tasks are not displayed after a successful request | Match the response types and access paths to the backend's `data` wrapper.      |

## Support Code with Lari

If this tutorial helps you, consider purchasing the [complete NestJS course](https://www.udemy.com/course/nestjs-complete-course/?couponCode=CODEWITHLARI). Your support helps me keep creating practical programming tutorials.

- [YouTube](https://www.youtube.com/@codewithlari)
- [GitHub](https://github.com/laribright)
