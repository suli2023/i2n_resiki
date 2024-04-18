const doc = {
    empsBody: document.querySelector("#empsBody"),
    multiButton: document.querySelector('#multiButton'),
    idInput: document.querySelector('#id'),
    nameInput: document.querySelector('#name'),
    cityInput: document.querySelector('#city'),
    salaryInput: document.querySelector('#salary'),
    operatorModalLabel: document.querySelector('#operatorModalLabel')
}

const state = {
    host:  'http://localhost:8000',
    endpoint: 'employees',
    id: 0,
    name: 'névtelen',
    city: 'ismeretlen',
    salary: 0,
    mode: 'add'
}

doc.multiButton.addEventListener('click', () => {
    console.log('Mentés...')
    setEmployeeState()
    addEmployee()
})

getEmployees()

function setEmployeeState() {
    state.id = doc.idInput.value
    state.name = doc.nameInput.value
    state.city = doc.cityInput.value
    state.salary = doc.salaryInput.value
    deleteOperatorContent()
}

function addEmployee() {
    doc.operatorModalLabel.textContent = 'Hozzáadás'
    let url = state.host + '/' + state.endpoint
    fetch(url, {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: state.name,
         city: state.city,
            salary: state.salary
        })
   }) 
}

function getEmployees() {
    let url = state.host + '/' + state.endpoint
    fetch(url)
    .then(response => response.json())
    .then(result => {
        console.log(result)
        renderEmployees(result)
    })
}

function renderEmployees(empList) {    
    empList.forEach(emp => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${emp.id}</td>
            <td>${emp.name}</td>
            <td>${emp.city}</td>
            <td>${emp.salary}</td>
            <td>
                <button class="btn btn-primary"
                data-id="${emp.id}"
                data-name="${emp.name}"
                data-city="${emp.city}"
                data-salary="${emp.salary}"
                onclick="updateEmployee(this)"
                data-bs-toggle="modal"
                data-bs-target="#operatorModal"
                >
                    Szerkesztés
                </button>
                <button class="btn btn-danger"
                onclick="deleteEmployee(${emp.id})"
                >
                    Törlés
                </button>
            </td>
        `
        doc.empsBody.appendChild(tr)
        console.log(emp.city)
    });
}

function deleteEmployee(id) {
    const url = state.host + '/' + 
        state.endpoint +
        '/' + id
    console.log(url)
    fetch(url, {method: 'delete'})
}

function updateEmployee(source) {
    doc.operatorModalLabel.textContent = 'Szerkesztés'
    const url = state.host + '/' + 
        state.endpoint +
        '/' + id
        console.log(source.dataset.id)
        doc.idInput.value = source.dataset.id
        doc.nameInput.value = source.dataset.name
        doc.cityInput.value = source.dataset.city
        doc.salaryInput.value = source.dataset.salary
}

function showAddModal() {
    doc.operatorModalLabel.textContent = "Hozzáadás"
    deleteOperatorContent()
}

function deleteOperatorContent() {
    doc.idInput.value = ''
    doc.nameInput.value = ''
    doc.cityInput.value = ''
    doc.salaryInput.value = ''
}