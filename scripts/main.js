particlesJS('particles-js', {
    particles: {
        number: { value: 80 },
        color: { value: '#ffd700' },
        shape: { type: 'circle' },
        opacity: { value: 0.5 },
        size: { value: 3 },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out'
        }
    }
});

// 3D card effect
document.querySelectorAll('.game-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const angleX = (y - centerY) / 20;
        const angleY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll to bonus banner
document.querySelector('.scroll-down-btn').addEventListener('click', () => {
    document.querySelector('#bonus-banner').scrollIntoView({
        behavior: 'smooth'
    });
});

// Redirect to login page
document.getElementById('login-btn').addEventListener('click', () => {
    alert('Вход в систему');
});

// Login user
document.getElementById('login-btn').addEventListener('click', () => {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const error = document.getElementById('login-error');

    // Загружаем существующих пользователей
    fetch('data/users.json')
        .then(response => response.json())
        .then(users => {
            // Проверяем, существует ли пользователь с такими данными
            const user = users.find(user => user.email === email && user.password === password);

            if (!user) {
                error.textContent = 'Неверный email или пароль';
                error.style.display = 'block';
                return;
            }

            error.style.display = 'none';
            alert(`Добро пожаловать, ${user.name}`);
        })
        .catch(() => alert('Ошибка при загрузке данных'));
});

// Переход на страницу игры
document.getElementById('start-game-btn').addEventListener('click', () => {
    window.location.href = 'game.html';
});
