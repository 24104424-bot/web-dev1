
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tabName).classList.add('active');
      });
    });

    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMsg');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let isValid = true;
      
      const fullName = document.getElementById('fullName');
      const nameError = document.getElementById('nameError');
      if (fullName.value.trim() === '') {
        fullName.classList.add('error');
        nameError.classList.add('show');
        isValid = false;
      } else {
        fullName.classList.remove('error');
        nameError.classList.remove('show');
      }
      
      const email = document.getElementById('email');
      const emailError = document.getElementById('emailError');
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.value.trim())) {
        email.classList.add('error');
        emailError.classList.add('show');
        isValid = false;
      } else {
        email.classList.remove('error');
        emailError.classList.remove('show');
      }
      
      const phone = document.getElementById('phone');
      const phoneError = document.getElementById('phoneError');
      const phonePattern = /^\d{3}-?\d{3}-?\d{4}$/;
      if (!phonePattern.test(phone.value.trim())) {
        phone.classList.add('error');
        phoneError.classList.add('show');
        isValid = false;
      } else {
        phone.classList.remove('error');
        phoneError.classList.remove('show');
      }
      
      const subject = document.getElementById('subject');
      const subjectError = document.getElementById('subjectError');
      if (subject.value === '') {
        subject.classList.add('error');
        subjectError.classList.add('show');
        isValid = false;
      } else {
        subject.classList.remove('error');
        subjectError.classList.remove('show');
      }
      
      const message = document.getElementById('message');
      const messageError = document.getElementById('messageError');
      if (message.value.trim().length < 10) {
        message.classList.add('error');
        messageError.classList.add('show');
        isValid = false;
      } else {
        message.classList.remove('error');
        messageError.classList.remove('show');
      }
      
      if (isValid) {
        successMsg.classList.add('show');
        form.reset();
        
        setTimeout(() => {
          successMsg.classList.remove('show');
        }, 3000);
      }
    });

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('error');
        const errorId = input.id + 'Error';
        const errorMsg = document.getElementById(errorId);
        if (errorMsg) {
          errorMsg.classList.remove('show');
        }
      });
    });

    let currentValue = '0';
    let previousValue = '';
    let operator = '';
    let waitingForOperand = false;

    const display = document.getElementById('calcDisplay');
    const calcBtns = document.querySelectorAll('.calc-btn');

    calcBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const value = btn.getAttribute('data-value');

        if (action === 'number') {
          if (waitingForOperand) {
            currentValue = value;
            waitingForOperand = false;
          } else {
            currentValue = currentValue === '0' ? value : currentValue + value;
          }
          display.textContent = currentValue;
        }

        if (action === 'operator') {
          if (previousValue && operator && !waitingForOperand) {
            calculate();
          }
          operator = value;
          previousValue = currentValue;
          waitingForOperand = true;
        }

        if (action === 'equals') {
          calculate();
          operator = '';
          previousValue = '';
        }

        if (action === 'clear') {
          currentValue = '0';
          previousValue = '';
          operator = '';
          waitingForOperand = false;
          display.textContent = currentValue;
        }

        if (action === 'backspace') {
          currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
          display.textContent = currentValue;
        }
      });
    });

    function calculate() {
      const prev = parseFloat(previousValue);
      const current = parseFloat(currentValue);
      let result = 0;

      switch (operator) {
        case '+':
          result = prev + current;
          break;
        case '-':
          result = prev - current;
          break;
        case '*':
          result = prev * current;
          break;
        case '/':
          result = current !== 0 ? prev / current : 'Error';
          break;
      }

      currentValue = result.toString();
      display.textContent = currentValue;
      waitingForOperand = true;
    }

    
    const todoInput = document.getElementById('todoInput');
    const addTodoBtn = document.getElementById('addTodoBtn');
    const todoList = document.getElementById('todoList');
    let todos = [];

    function renderTodos() {
      if (todos.length === 0) {
        todoList.innerHTML = `
          <div class="empty-state">
            <div class="empty-state-icon">📝</div>
            <p>No tasks yet. Add your first task above!</p>
          </div>
        `;
        return;
      }

      todoList.innerHTML = todos.map((todo, index) => `
        <li class="todo-item ${todo.completed ? 'completed' : ''}">
          <div class="todo-left">
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleTodo(${index})">
            <span class="todo-text">${todo.text}</span>
          </div>
          <div class="todo-actions">
            <button class="todo-delete" onclick="deleteTodo(${index})">Delete</button>
          </div>
        </li>
      `).join('');
    }

    function addTodo() {
      const text = todoInput.value.trim();
      if (text === '') return;

      todos.push({
        text: text,
        completed: false
      });

      todoInput.value = '';
      renderTodos();
    }

    function toggleTodo(index) {
      todos[index].completed = !todos[index].completed;
      renderTodos();
    }

    function deleteTodo(index) {
      todos.splice(index, 1);
      renderTodos();
    }

    addTodoBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        addTodo();
      }
    });

    // Make functions globally accessible
    window.toggleTodo = toggleTodo;
    window.deleteTodo = deleteTodo;