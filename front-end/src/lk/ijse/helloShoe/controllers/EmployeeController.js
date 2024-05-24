// document.addEventListener("DOMContentLoaded", () => {
//     bindClickEvents();
//     loadEmployees();
//     generateEmployeeID();
// });
//
// async function generateEmployeeID() {
//     try {
//         const response = await fetch("http://localhost:8080/app/api/v1/employees/nextid");
//         const employeeCode = await response.text();
//         document.getElementById("employeeCode").value = employeeCode;
//     } catch (error) {
//         console.error('Error generating employee ID:', error);
//     }
// }
//
// async function saveEmployee() {
//     if (!employeeValidations()) return;
//
//     const formData = new FormData();
//     formData.append("data", JSON.stringify(getEmployeeData()));
//     formData.append("profilepic", document.getElementById("employeeProfilePic").files[0]);
//
//     try {
//         const response = await fetch("http://localhost:8080/app/api/v1/employees", {
//             method: 'POST',
//             body: formData
//         });
//
//         if (response.status === 201) {
//             alert('Employee saved successfully!');
//             loadEmployees();
//         } else {
//             alert('Error saving employee');
//         }
//     } catch (error) {
//         console.error('Error saving employee:', error);
//     }
// }
//
// async function updateEmployee() {
//     if (!employeeValidations()) return;
//
//     const formData = new FormData();
//     formData.append("data", JSON.stringify(getEmployeeData()));
//     formData.append("profilepic", document.getElementById("employeeProfilePic").files[0]);
//
//     try {
//         const response = await fetch("http://localhost:8080/app/api/v1/employees", {
//             method: 'PUT',
//             body: formData
//         });
//
//         if (response.status === 202) {
//             alert('Employee updated successfully!');
//             loadEmployees();
//         } else {
//             alert('Error updating employee');
//         }
//     } catch (error) {
//         console.error('Error updating employee:', error);
//     }
// }
//
// async function deleteEmployee() {
//     const employeeCode = document.getElementById("employeeCode").value;
//
//     try {
//         const response = await fetch(`http://localhost:8080/app/api/v1/employees/${employeeCode}`, {
//             method: 'DELETE',
//         });
//
//         if (response.status === 202) {
//             alert('Employee deleted successfully!');
//             loadEmployees();
//         } else {
//             alert('Error deleting employee');
//         }
//     } catch (error) {
//         console.error('Error deleting employee:', error);
//     }
// }
//
// async function loadEmployees() {
//     try {
//         const response = await fetch("http://localhost:8080/app/api/v1/employees");
//         const employees = await response.json();
//         displayEmployees(employees);
//     } catch (error) {
//         console.error('Error loading employees:', error);
//     }
// }
//
// function displayEmployees(employees) {
//     const employeeTable = document.getElementById("customerTable");
//     employeeTable.innerHTML = "";
//
//     employees.forEach(employee => {
//         const row = document.createElement("tr");
//
//         row.innerHTML = `
//             <td>${employee.employeeCode}</td>
//             <td>${employee.employeeName}</td>
//             <td><img src="data:image/jpeg;base64,${employee.employeeProfilePic}" height="50"></td>
//             <td>${employee.gender}</td>
//             <td>${employee.status}</td>
//             <td>${employee.designation}</td>
//             <td>${employee.accessRole}</td>
//             <td>${new Date(employee.dob).toLocaleDateString()}</td>
//             <td>${new Date(employee.dateOfJoin).toLocaleDateString()}</td>
//             <td>${employee.attachedBranch}</td>
//             <td>${employee.addressLine01}</td>
//             <td>${employee.addressLine02}</td>
//             <td>${employee.addressLine03}</td>
//             <td>${employee.addressLine04}</td>
//             <td>${employee.addressLine05}</td>
//             <td>${employee.contactNo}</td>
//             <td>${employee.email}</td>
//             <td>${employee.emergencyContact}</td>
//             <td>${employee.emergencyContactPerson}</td>
//         `;
//
//         row.addEventListener("click", () => setTextFieldValues(employee));
//         employeeTable.appendChild(row);
//     });
// }
//
// function setTextFieldValues(employee) {
//     document.getElementById("employeeCode").value = employee.employeeCode;
//     document.getElementById("employeeName").value = employee.employeeName;
//     document.getElementById("status").value = employee.status;
//     document.getElementById("contactNo").value = employee.contactNo;
//     document.getElementById("dob").value = new Date(employee.dob).toISOString().split('T')[0];
//     document.getElementById("designation").value = employee.designation;
//     document.getElementById("attachedBranch").value = employee.attachedBranch;
//     document.getElementById("accessRole").value = employee.accessRole;
//     document.getElementById("email").value = employee.email;
//     document.getElementById("gender").value = employee.gender;
//     document.getElementById("emergencyContactPerson").value = employee.emergencyContactPerson;
//     document.getElementById("dateOfJoin").value = new Date(employee.dateOfJoin).toISOString().split('T')[0];
//     document.getElementById("emergencyContact").value = employee.emergencyContact;
//     document.getElementById("addressLine01").value = employee.addressLine01;
//     document.getElementById("addressLine02").value = employee.addressLine02;
//     document.getElementById("addressLine03").value = employee.addressLine03;
//     document.getElementById("addressLine04").value = employee.addressLine04;
//     document.getElementById("addressLine05").value = employee.addressLine05;
// }
//
// function bindClickEvents() {
//     document.getElementById("btnSaveEmployee").addEventListener("click", saveEmployee);
//     document.getElementById("btnUpdateEmployee").addEventListener("click", updateEmployee);
//     document.getElementById("btnDeleteEmployee").addEventListener("click", deleteEmployee);
//     document.getElementById("searchEmployee").addEventListener("input", searchEmployee);
// }
//
// function searchEmployee() {
//     const searchTerm = document.getElementById("searchEmployee").value.toLowerCase();
//     const rows = document.querySelectorAll("#customerTable tr");
//
//     rows.forEach(row => {
//         const cells = row.querySelectorAll("td");
//         let match = false;
//
//         cells.forEach(cell => {
//             if (cell.innerText.toLowerCase().includes(searchTerm)) {
//                 match = true;
//             }
//         });
//
//         row.style.display = match ? "" : "none";
//     });
// }
//
// function getEmployeeData() {
//     return {
//         employeeCode: document.getElementById("employeeCode").value,
//         employeeName: document.getElementById("employeeName").value,
//         status: document.getElementById("status").value,
//         contactNo: document.getElementById("contactNo").value,
//         dob: new Date(document.getElementById("dob").value).toISOString(),
//         designation: document.getElementById("designation").value,
//         attachedBranch: document.getElementById("attachedBranch").value,
//         accessRole: document.getElementById("accessRole").value,
//         email: document.getElementById("email").value,
//         gender: document.getElementById("gender").value,
//         emergencyContactPerson: document.getElementById("emergencyContactPerson").value,
//         dateOfJoin: new Date(document.getElementById("dateOfJoin").value).toISOString(),
//         emergencyContact: document.getElementById("emergencyContact").value,
//         addressLine01: document.getElementById("addressLine01").value,
//         addressLine02: document.getElementById("addressLine02").value,
//         addressLine03: document.getElementById("addressLine03").value,
//         addressLine04: document.getElementById("addressLine04").value,
//         addressLine05: document.getElementById("addressLine05").value
//     };
// }
//
// function employeeValidations() {
//     // Implement the necessary validation checks here and return false if any validation fails
//     return true;
// }
document.addEventListener("DOMContentLoaded", () => {
    bindClickEvents();
    loadEmployees();
    generateEmployeeID();
});

async function generateEmployeeID() {
    try {
        const response = await fetch("http://localhost:8080/app/api/v1/employees/nextid");
        const employeeCode = await response.text();
        document.getElementById("employeeCode").value = employeeCode;
    } catch (error) {
        console.error('Error generating employee ID:', error);
    }
}

async function saveEmployee() {
    if (!employeeValidations()) return;

    const formData = new FormData();
    formData.append("data", JSON.stringify(getEmployeeData()));
    const profilePic = document.getElementById("employeeProfilePic").files[0];
    if (profilePic) {
        formData.append("profilepic", profilePic);
    }

    try {
        const response = await fetch("http://localhost:8080/app/api/v1/employees", {
            method: 'POST',
            body: formData
        });

        if (response.status === 201) {
            alert('Employee saved successfully!');
            loadEmployees();
        } else {
            alert('Error saving employee');
        }
    } catch (error) {
        console.error('Error saving employee:', error);
    }
}

async function updateEmployee() {
    if (!employeeValidations()) return;

    const formData = new FormData();
    formData.append("data", JSON.stringify(getEmployeeData()));
    const profilePic = document.getElementById("employeeProfilePic").files[0];
    if (profilePic) {
        formData.append("profilepic", profilePic);
    }

    try {
        const response = await fetch("http://localhost:8080/app/api/v1/employees", {
            method: 'PUT',
            body: formData
        });

        if (response.status === 202) {
            alert('Employee updated successfully!');
            loadEmployees();
        } else {
            alert('Error updating employee');
        }
    } catch (error) {
        console.error('Error updating employee:', error);
    }
}

async function deleteEmployee() {
    const employeeCode = document.getElementById("employeeCode").value;

    try {
        const response = await fetch(`http://localhost:8080/app/api/v1/employees/${employeeCode}`, {
            method: 'DELETE',
        });

        if (response.status === 202) {
            alert('Employee deleted successfully!');
            loadEmployees();
        } else {
            alert('Error deleting employee');
        }
    } catch (error) {
        console.error('Error deleting employee:', error);
    }
}

async function loadEmployees() {
    try {
        const response = await fetch("http://localhost:8080/app/api/v1/employees");
        const employees = await response.json();
        displayEmployees(employees);
    } catch (error) {
        console.error('Error loading employees:', error);
    }
}

function displayEmployees(employees) {
    const employeeTable = document.getElementById("customerTable");
    employeeTable.innerHTML = "";

    employees.forEach(employee => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${employee.employeeCode}</td>
            <td>${employee.employeeName}</td>
            <td><img src="data:image/jpeg;base64,${employee.employeeProfilePic}" height="50"></td>
            <td>${employee.gender}</td>
            <td>${employee.status}</td>
            <td>${employee.designation}</td>
            <td>${employee.accessRole}</td>
            <td>${new Date(employee.dob).toLocaleDateString()}</td>
            <td>${new Date(employee.dateOfJoin).toLocaleDateString()}</td>
            <td>${employee.attachedBranch}</td>
            <td>${employee.addressLine01}</td>
            <td>${employee.addressLine02}</td>
            <td>${employee.addressLine03}</td>
            <td>${employee.addressLine04}</td>
            <td>${employee.addressLine05}</td>
            <td>${employee.contactNo}</td>
            <td>${employee.email}</td>
            <td>${employee.emergencyContact}</td>
            <td>${employee.emergencyContactPerson}</td>
        `;

        row.addEventListener("click", () => setTextFieldValues(employee));
        employeeTable.appendChild(row);
    });
}

function setTextFieldValues(employee) {
    document.getElementById("employeeCode").value = employee.employeeCode;
    document.getElementById("employeeName").value = employee.employeeName;
    document.getElementById("status").value = employee.status;
    document.getElementById("contactNo").value = employee.contactNo;
    document.getElementById("dob").value = new Date(employee.dob).toISOString().split('T')[0];
    document.getElementById("designation").value = employee.designation;
    document.getElementById("attachedBranch").value = employee.attachedBranch;
    document.getElementById("accessRole").value = employee.accessRole;
    document.getElementById("email").value = employee.email;
    document.getElementById("gender").value = employee.gender;
    document.getElementById("emergencyContactPerson").value = employee.emergencyContactPerson;
    document.getElementById("dateOfJoin").value = new Date(employee.dateOfJoin).toISOString().split('T')[0];
    document.getElementById("emergencyContact").value = employee.emergencyContact;
    document.getElementById("addressLine01").value = employee.addressLine01;
    document.getElementById("addressLine02").value = employee.addressLine02;
    document.getElementById("addressLine03").value = employee.addressLine03;
    document.getElementById("addressLine04").value = employee.addressLine04;
    document.getElementById("addressLine05").value = employee.addressLine05;
}

function bindClickEvents() {
    document.getElementById("btnSaveEmployee").addEventListener("click", saveEmployee);
    document.getElementById("btnUpdateEmployee").addEventListener("click", updateEmployee);
    document.getElementById("btnDeleteEmployee").addEventListener("click", deleteEmployee);
    document.getElementById("searchEmployee").addEventListener("input", searchEmployee);
}

function searchEmployee() {
    const searchTerm = document.getElementById("searchEmployee").value.toLowerCase();
    const rows = document.querySelectorAll("#customerTable tr");

    rows.forEach(row => {
        const cells = row.querySelectorAll("td");
        let match = false;

        cells.forEach(cell => {
            if (cell.innerText.toLowerCase().includes(searchTerm)) {
                match = true;
            }
        });

        row.style.display = match ? "" : "none";
    });
}

function getEmployeeData() {
    return {
        employeeCode: document.getElementById("employeeCode").value,
        employeeName: document.getElementById("employeeName").value,
        status: document.getElementById("status").value,
        contactNo: document.getElementById("contactNo").value,
        dob: new Date(document.getElementById("dob").value).toISOString(),
        designation: document.getElementById("designation").value,
        attachedBranch: document.getElementById("attachedBranch").value,
        accessRole: document.getElementById("accessRole").value,
        email: document.getElementById("email").value,
        gender: document.getElementById("gender").value,
        emergencyContactPerson: document.getElementById("emergencyContactPerson").value,
        dateOfJoin: new Date(document.getElementById("dateOfJoin").value).toISOString(),
        emergencyContact: document.getElementById("emergencyContact").value,
        addressLine01: document.getElementById("addressLine01").value,
        addressLine02: document.getElementById("addressLine02").value,
        addressLine03: document.getElementById("addressLine03").value,
        addressLine04: document.getElementById("addressLine04").value,
        addressLine05: document.getElementById("addressLine05").value
    };
}

function employeeValidations() {
    // Implement the necessary validation checks here and return false if any validation fails
    return true;
}
