document.addEventListener('DOMContentLoaded', () => {

    requireAuth();

    const loginForm = document.getElementById('loginForm');
    const loginDiv = document.getElementById('login');
    const registroPontosDiv = document.getElementById('registroPonto');

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        fetch('http://127.0.0.1:5000/login/', {
            method: 'POST',
            headers: {
                'Access-Control-Allow-Origin':'*',
                'Access-Control-Allow-Methods':'POST',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                localStorage.setItem('accessToken', data.accessToken);
                window.location.href = '/index.html';
            } else {
                console.log(data);
                alert('Email e/ou senha inválidos');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Email e/ou senha inválidos');
        });
    });
});