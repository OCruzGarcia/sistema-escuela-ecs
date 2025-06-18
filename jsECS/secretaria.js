document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const mainContent = document.getElementById('main-content');
    const attendanceForm = document.getElementById('attendance-form');
    const studentSelect = document.getElementById('student-select');
    const yearSelect = document.getElementById('year-select');
    const dateInput = document.getElementById('date-input');
    const statusSelect = document.getElementById('estado');

    loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const password = document.getElementById('password').value;
    if (password === 'secretaria123') {
        loginForm.style.display = 'none';
        mainContent.style.display = 'block';
        loadStudents();
        loadYears();
    } else {
        alert('Contraseña incorrecta');
    }
    });

    async function loadStudents() {
    try {
        const response = await fetch('http://localhost:3001/api/estudiantes');
        const students = await response.json();
        studentSelect.innerHTML = '<option value="">Seleccione un estudiante</option>';
        students.forEach(student => {
        const option = document.createElement('option');
        option.value = student.ID_Estudiante;
        option.textContent = `${student.Nombre} ${student.Apellido}`;
        studentSelect.appendChild(option);
        });
    } catch (err) {
        console.error('Error al cargar estudiantes:', err);
    }
    }

    async function loadYears() {
    try {
        const response = await fetch('http://localhost:3001/api/anios-escolares');
        const years = await response.json();
        yearSelect.innerHTML = '<option value="">Seleccione un año escolar</option>';
        years.forEach(year => {
        const option = document.createElement('option');
        option.value = year.ID_AnioEscolar;
        option.textContent = year.Anio;
        yearSelect.appendChild(option);
        });
    } catch (err) {
        console.error('Error al cargar años escolares:', err);
    }
    }

    attendanceForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const attendanceData = {
        ID_Estudiante: parseInt(studentSelect.value),
        ID_AnioEscolar: parseInt(yearSelect.value) || null,
        Fecha: dateInput.value,
        Estado: statusSelect.value
    };

    try {
        const response = await fetch('http://localhost:3001/api/asistencias', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(attendanceData)
        });
        const result = await response.json();
        alert('Asistencia registrada: ' + result.message);
        attendanceForm.reset();
    } catch (err) {
        console.error('Error al registrar asistencia:', err);
        alert('Error al registrar asistencia');
    }
    });
});
