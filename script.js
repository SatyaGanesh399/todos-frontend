const url = "http://localhost:8000";

const signUp = (event) => {
  event.preventDefault();
  const userId = document.getElementById("userId-signup").value;
  const password = document.getElementById("password-signup").value;
  const emailId = document.getElementById("email-signup").value;

  axios
    .post(url + "/user/addUser", {
      userId,
      password,
      emailId,
    })
    .then((res) => {
      if (res.status == 200) {
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const signIn = (event) => {
  event.preventDefault();
  const emailId = document.getElementById("email-signin").value;
  const password = document.getElementById("password-signin").value;
  console.log("data", emailId, password);
  axios
    .post(url + "/user/loginUser", {
      emailId,
      password,
    })
    .then((res) => {
      if (res.status == 200) {
        localStorage.setItem("emailid", emailId);
        window.location.href = "todos.html";
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const getAllTodos = (emailId) => {
  axios
    .get(url + "/todo/alltodos", {
      emailId: emailId,
    })
    .then((res) => {
      console.log("todos", res);
      if (res.status == 200) {
        if (res.data.todos.length != 0) {
          const todos = res.data.todos;
          all_todos = "";
          for (let i = 0; i < todos.length; i++) {
            let todo = `<li
            class="list-group-item d-flex justify-content-between align-items-start"
          >
            <div class="ms-2 me-auto">
              <div class="fw-bold ${
                todos[i].completed ? "text-decoration-line-through" : ""
              }">${todos[i].todo}</div>
              <div class="btn-group m-2" role="group" aria-label="Basic mixed styles example">
              <button type="button" class="btn btn-danger btn-sm" onclick="deleteTodo('${
                todos[i].todoId
              }')">Delete</button>
              <button type="button" class="btn btn-success btn-sm" onclick="markAsComplete('${
                todos[i].todoId
              }')">Mark as complete</button>
            </div>
            </div>
          </li>`;
            all_todos += todo;
          }
          document.getElementById("todos-list").innerHTML = all_todos;
        } else {
          document.getElementById("todos-list").innerHTML =
            '<div class="text-center bg-light">No todos</div>';
        }
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const addTodo = () => {
  const todo = document.getElementById("todo-input").value;
  const emailid = localStorage.getItem("emailid");
  axios
    .post(url + "/todo/addTodo", {
      emailId: emailid,
      todo: todo,
      completed: false,
    })
    .then((res) => {
      console.log("todos", res);
      if (res.status == 200) {
        getAllTodos(emailid);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const deleteTodo = (id) => {
  const emailid = localStorage.getItem("emailid");
  axios
    .post(url + "/todo/deleteTodo", {
      emailId: emailid,
      todoId: id,
    })
    .then((res) => {
      console.log("todos", res);
      if (res.status == 200) {
        getAllTodos(emailid);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};

const markAsComplete = (id) => {
  const emailid = localStorage.getItem("emailid");
  console.log(id, emailid);
  axios
    .post(url + "/todo/updateTodo", {
      todoId: id,
      updatedData: {
        completed: true,
      },
    })
    .then((res) => {
      console.log("todos", res);
      if (res.status == 200) {
        getAllTodos(emailid);
      }
    })
    .catch((error) => {
      console.log("error", error);
    });
};
