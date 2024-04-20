### **Routes for todos (todos):**

### 1. **List all todos:**

- Method: `GET`
- Route: `/todos`
- Query Parameters:
  - page (optional): Specifies the page number for pagination.
  - limit (optional): Specifies the number of todos per page.
  - sort (optional): Sort order (asc or desc).
  - orderBy (optional): Specifies the field to order by.
  - where (optional): Filters todos based on specified criteria.

### 2. **Create a new todo:**

- Method: `POST`
- Route: `/todos`
- Request body:

  ```json
  {
    "title": "Todo-list Name"
  }
  ```

### 3. **Get details of a specific todo:**

- Method: `GET`
- Route: `/todos/:todoId`
- Example: `/todos/123`

### 4. **Update an existing todo:**

- Method: `PUT`
- Route: `/todos/:todoId`
- Example: `/todos/123`
- Request body:

  ```json
  {
    "title": "New Todo-list Name"
  }
  ```

### 5. **Delete a todo:**

- Method: `DELETE`
- Route: `/todos/:todoId`
- Example: `/todos/123`

## **Routes for tasks:**

### 1. **List all tasks of a specific todo:**

- Method: `GET`
- Route: `/todos/:todoId/tasks`
- Example: `/todos/123/tasks`
- Query Parameters:
  - page (optional): Specifies the page number for pagination.
  - limit (optional): Specifies the number of todos per page.
  - sort (optional): Sort order (asc or desc).
  - orderBy (optional): Specifies the field to order by.
  - where (optional): Filters todos based on specified criteria.

### 2. **Create a new task in a specific todo:**

- Method: `POST`
- Route: `/todos/:todoId/tasks`
- Example: `/todos/123/tasks`
- Request body:

  ```json
  {
    "title": "Task Name",
    "description": "Task Description",
    "completed": false
  }
  ```

- Example: `/todos/123/tasks`

### 3. **Get details of a specific task in a todo:**

- Method: `GET`
- Route: `/todos/:todoId/tasks/:taskId`
- Example: `/todos/123/tasks/456`

### 4. **Update an existing task in a todo:**

- Method: `PUT`
- Route: `/todos/:todoId/tasks/:taskId`
- Example: `/todos/123/tasks/456`
- Request body:

  ```json
  {
    "title": "New Task Name",
    "description": "New Task Description",
    "completed": true
  }
  ```

### 5. **Delete a task from a todo:**

- Method: `DELETE`
- Route: `/todos/:todoId/tasks/:taskId`
- Example: `/todos/123/tasks/456`
