// ДАННЫЕ ДЛЯ ОТОБРАЖЕНИЯ (Меняй их здесь)
const userData = {
    level: 2,           // Текущий уровень (1-5)
    balance: "0.45",    // Баланс пользователя
    referrals: 5        // Сколько человек уже в уровне
};

const thresholds = [0, 2, 6, 14, 30, 62];

window.onload = function() {
    render();
    
    const btn = document.getElementById('connectBtn');
    if(btn) {
        btn.onclick = () => {
            btn.innerText = "Подключено";
            render();
        };
    }
};

function render() {
    const statsSection = document.getElementById('statsSection');
    const balanceEl = document.getElementById('balance');
    const levelEl = document.getElementById('userLevel');
    const container = document.getElementById('circlesContainer');

    // 1. Условие: если уровень выше 5, скрываем всё
    if (userData.level > 5 || userData.level === 0) {
        if(statsSection) statsSection.style.display = 'none';
        return;
    }

    // 2. Обновляем текст
    if(balanceEl) balanceEl.innerText = userData.balance;
    if(levelEl) levelEl.innerText = userData.level;

    // 3. Рисуем сетку кругов
    if(container) {
        container.innerHTML = '';
        const total = thresholds[userData.level];

        for (let i = 0; i < total; i++) {
            const div = document.createElement('div');
            div.className = 'circle';
            if (i < userData.referrals) {
                div.classList.add('dark');
            }
            container.appendChild(div);
        }
    }
}
