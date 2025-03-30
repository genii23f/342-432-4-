// User Profile Management
class UserProfile {
    constructor() {
        this.loadProfile();
        this.initializeProfileHandlers();
    }

    loadProfile() {
        const savedProfile = localStorage.getItem('userProfile');
        if (savedProfile) {
            const profile = JSON.parse(savedProfile);
            document.querySelector('.avatar').src = profile.avatar || 'https://i.pravatar.cc/150';
            document.querySelector('.user-profile h3').textContent = profile.name || 'VIP Player';
        }
    }

    initializeProfileHandlers() {
        const avatar = document.querySelector('.avatar');
        const username = document.querySelector('.user-profile h3');
        const editIcon = document.querySelector('.edit-icon');

        // Обработка изменения аватара
        avatar.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = (event) => {
                    avatar.src = event.target.result;
                    this.saveProfile();
                };
                reader.readAsDataURL(file);
            };
            input.click();
        });

        // Обработка изменения имени
        username.addEventListener('click', () => this.promptForName(username));
        editIcon.addEventListener('click', () => this.promptForName(username));
    }

    promptForName(username) {
        let newName = '';
        while (!newName.trim()) {
            newName = prompt('Введите ваше имя (обязательно):', username.textContent);
            if (!newName.trim()) {
                alert('Имя не может быть пустым. Пожалуйста, введите имя.');
            }
        }
        username.textContent = newName;
        this.saveProfile();
    }

    saveProfile() {
        const profile = {
            avatar: document.querySelector('.avatar').src,
            name: document.querySelector('.user-profile h3').textContent
        };
        localStorage.setItem('userProfile', JSON.stringify(profile));
    }

    isNameChanged() {
        const username = document.querySelector('.user-profile h3').textContent;
        return username !== 'VIP Player';
    }
}

// Game Categories Management
class GameCategories {
    constructor(userProfile) {
        this.userProfile = userProfile;
        this.initializeMenuHandlers();
        this.initializeGameCards();
    }

    initializeMenuHandlers() {
        const menuItems = document.querySelectorAll('.menu-item');
        
        menuItems.forEach(item => {
            item.addEventListener('click', () => {
                if (!this.userProfile.isNameChanged()) {
                    alert('Пожалуйста, измените имя для возможности взаимодействия с сайтом.');
                    return;
                }

                menuItems.forEach(i => i.classList.remove('active'));
                item.classList.add('active');

                const category = this.getCategoryFromMenuItem(item);
                this.filterGames(category);
            });
        });
    }

    getCategoryFromMenuItem(item) {
        const icon = item.querySelector('span').textContent.trim().split(' ')[0];
        const categories = {
            '🎲': 'all',
            '♠️': 'poker',
            '🎰': 'slots',
            '🎯': 'roulette',
            '♣️': 'blackjack',
            '🏆': 'tournament'
        };
        return categories[icon] || 'all';
    }

    initializeGameCards() {
        const cards = document.querySelectorAll('.game-card');
        cards.forEach(card => {
            card.addEventListener('mouseenter', this.handleGameCardHover);
            card.addEventListener('mouseleave', this.handleGameCardLeave);
        });
    }

    handleGameCardHover(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        card.addEventListener('mousemove', (e) => {
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const angleX = (y - centerY) / 10;
            const angleY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale(1.1)`;
        });
    }

    handleGameCardLeave(e) {
        const card = e.currentTarget;
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    }

    filterGames(category) {
        const gameCards = document.querySelectorAll('.game-card');
        gameCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 500);
            }
        });
    }
}

// Live Player Count Update
class LivePlayerCount {
    constructor(userProfile) {
        this.userProfile = userProfile;
        this.count = 1337;
        this.updateInterval = setInterval(() => this.updateCount(), 5000);
    }

    updateCount() {
        if (!this.userProfile.isNameChanged()) {
            alert('Пожалуйста, измените имя для возможности взаимодействия с сайтом.');
            return;
        }

        const change = Math.floor(Math.random() * 21) - 10;
        this.count += change;
        document.querySelector('.live-games').textContent = `🔴 Онлайн: ${this.count}`;
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    const userProfile = new UserProfile();
    new GameCategories(userProfile);
    new LivePlayerCount(userProfile);

    // Логика для кнопки "Пополнить"
    const rechargeButton = document.getElementById('recharge-btn');

    rechargeButton.addEventListener('click', () => {
        window.open('https://t.me/gwsdgsgsdgBOT', '_blank');
    });
});
