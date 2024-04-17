const doc = {
    empsBody: document.querySelector("#empsBody"),
    addButton: document.querySelector('#addButton') 
}

const state = {
    url:  'http://localhost:8000/employees'
}



doc.addButton.addEventListener('click', () => {
    console.log('Mentés...')
    addEmployee()
})

function addEmployee() {
   fetch(state.url, {
    method: 'post',
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        name: "Csoda Ernő",
        city: "Pécs",
        salary: 392
    })
   }) 
}

function getEmployees() {
    fetch(state.url)
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
                <button class="btn btn-primary">
                    Szerkesztés
                </button>
                <button class="btn btn-danger">
                    Törlés
                </button>
            </td>
        `
        doc.empsBody.appendChild(tr)
        console.log(emp.city)
    });
}
getEmployees()
