const contractAddress = "ВАШ_АДРЕС_КОНТРАКТА"; // Вставь сюда адрес после деплоя
const contractABI = [ /* ВСТАВЬ СЮДА ABI ИЗ REMIX */ ];

let provider, signer, contract;

// Пороги кругов для уровней 1, 2, 3, 4, 5
const thresholds = [0, 2, 6, 14, 30, 62];

async function init() {
    if (window.ethereum) {
        provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        signer = provider.getSigner();
        contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        updateUI();
    } else {
        alert("Установите MetaMask!");
    }
}

async function updateUI() {
    const userAddr = await signer.getAddress();
    const user = await contract.users(userAddr);
    
    const level = user.level.toNumber();
    const internalBalance = ethers.utils.formatEther(user.internalBalance);
    const referralsInLevel = user.referralsInLevel.toNumber();

    const statsSection = document.getElementById('statsSection');
    const balanceText = document.getElementById('balance');
    const container = document.getElementById('circlesContainer');

    // ЛОГИКА: Если уровень выше 5 или равен 0 (не зарегистрирован), скрываем всё
    if (level > 5 || level === 0) {
        statsSection.style.display = 'none';
        return;
    }

    // Иначе показываем и обновляем данные
    statsSection.style.display = 'block';
    balanceText.innerText = internalBalance;

    // Рисуем круги
    container.innerHTML = ''; // Очищаем старые
    const totalCircles = thresholds[level];

    for (let i = 0; i < totalCircles; i++) {
        const div = document.createElement('div');
        div.classList.add('circle');
        
        // Если индекс меньше количества рефералов — затемняем
        if (i < referralsInLevel) {
            div.classList.add('dark');
        }
        
        container.appendChild(div);
    }
}

// Запуск при загрузке или по нажатию кнопки
document.addEventListener('DOMContentLoaded', () => {
    // Если у тебя есть кнопка с id="connectBtn"
    const btn = document.getElementById('connectBtn');
    if(btn) btn.onclick = init;
});
