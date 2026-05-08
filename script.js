let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function showLogin(){

  document.getElementById("signupPage").classList.add("hidden");

  document.getElementById("loginPage").classList.remove("hidden");
}

function showSignup(){

  document.getElementById("loginPage").classList.add("hidden");

  document.getElementById("signupPage").classList.remove("hidden");
}

function signup(){

  let name =
    document.getElementById("signupName").value;

  let email =
    document.getElementById("signupEmail").value;

  let password =
    document.getElementById("signupPassword").value;

  if(name==="" || email==="" || password===""){
    alert("Fill all fields");
    return;
  }

  let user = {
    name:name,
    email:email,
    password:password
  };

  localStorage.setItem(
    "user",
    JSON.stringify(user)
  );

  alert("Signup Successful");

  showLogin();
}

function login(){

  let email =
    document.getElementById("loginEmail").value;

  let password =
    document.getElementById("loginPassword").value;

  let storedUser =
    JSON.parse(localStorage.getItem("user"));

  if(
    email === storedUser.email &&
    password === storedUser.password
  ){

    document.getElementById("loginPage")
      .classList.add("hidden");

    document.getElementById("dashboardPage")
      .classList.remove("hidden");

    document.getElementById("welcomeText")
      .innerText =
      "Hello " + storedUser.name + " 👋";

    document.getElementById("profileLetter")
      .innerText =
      storedUser.name.charAt(0).toUpperCase();

    renderTasks();
  }
  else{
    alert("Invalid Credentials");
  }
}

function addTask(){

  let input =
    document.getElementById("taskInput");

  if(input.value === ""){
    return;
  }

  let task = {
    text:input.value,
    completed:false
  };

  tasks.push(task);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  renderTasks();

  input.value = "";
}

function renderTasks(){

  let list =
    document.getElementById("taskList");

  list.innerHTML = "";

  let completedCount = 0;

  tasks.forEach((task,index)=>{

    if(task.completed){
      completedCount++;
    }

    let li = document.createElement("li");

    li.innerHTML = `
      <div class="taskLeft">
        <input type="checkbox"
          ${task.completed ? "checked" : ""}
          onchange="toggleTask(${index})">

        <span class="${
          task.completed ? "completed" : ""
        }">
          ${task.text}
        </span>
      </div>

      <button class="deleteBtn"
        onclick="deleteTask(${index})">
        Delete
      </button>
    `;

    list.appendChild(li);
  });

  document.getElementById("totalTasks")
    .innerText = tasks.length;

  document.getElementById("completedTasks")
    .innerText = completedCount;
}

function toggleTask(index){

  tasks[index].completed =
    !tasks[index].completed;

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  renderTasks();
}

function deleteTask(index){

  tasks.splice(index,1);

  localStorage.setItem(
    "tasks",
    JSON.stringify(tasks)
  );

  renderTasks();
}

function logout(){

  document.getElementById("dashboardPage")
    .classList.add("hidden");

  document.getElementById("loginPage")
    .classList.remove("hidden");
}

document.addEventListener("keypress",function(e){

  if(e.key==="Enter"){

    if(
      !document.getElementById("dashboardPage")
      .classList.contains("hidden")
    ){
      addTask();
    }
  }
});
