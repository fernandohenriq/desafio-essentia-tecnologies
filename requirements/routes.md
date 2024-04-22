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

- Method: `PATCH`
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
