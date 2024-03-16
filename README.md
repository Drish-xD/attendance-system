# RollSync

> Simplify Student Attendance Tracking

## Tech Used

- **_NEXTJS 14_**: A React framework for building modern web applications with server-side rendering and routing.

- **_NEXTUI_**: UI components library for Next.js applications, build over `tailwind.css`.

- **_Tailwind_**: CSS framework that facilitates rapid UI development by providing utility classes for styling.

- **_JSON-server_**: Lightweight REST API server that uses a JSON file as its data source for rapid development and testing.

- **_Axios_**: JavaScript library for making HTTP requests, often used for interacting with APIs and fetching data in web applications.

## Project File Structure

```
  src
  |__ app
  |   |__ (dashboard)
  |   |   |__ /dashboard
  |   |   |__ /profile
  |   |
  |   |__ auth
  |   |   |__ /login
  |   |   |__ /register
  |   |
  |   |__ layout
  |   |
  |   |__ /
  |
  |__ components
  |
  |__ context
  |   |__ AuthContext
  |
  |__ styles
  |
  |__ types
  |
  |__ utils
  |   |__ auth
  |   |__ attendance
  |
  db.json
```

## How to Run application

- Clone Repo:

  `git clone https://github.com/Drish-xD/RollSync`

- Install npm packages

  `pnpm install`

- Run the application

  `pnpm dev`

---

<details>
  <summary><b>Some Test Login Users</b></summary>

You can use the following test login credentials:

- User 1

  ```
  email : jt1234@srmist.edu.in
  pass  : test@123
  ```

- User 2

  ```
  email : rg1234@srmist.edu.in
  pass  : test@123
  ```

- User 3

  ```
  email : cb1234@srmist.edu.in
  pass  : test@123
  ```

</details>
