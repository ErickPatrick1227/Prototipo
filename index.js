// Função para alternar a exibição do menu lateral
function toggleSidebar() {
    // Obtém o elemento do menu lateral (sidebar)
    const sidebar = document.getElementById('sidebar');
    // Obtém o elemento que contém o conteúdo principal
    const content = document.querySelector('.content');

    // Verifica se o menu lateral está visível (se a posição do lado esquerdo é 0px)
    const isSidebarVisible = sidebar.style.left === '0px';

    // Se o menu está visível, oculta o menu e redefine a margem do conteúdo
    if (isSidebarVisible) {
        sidebar.style.left = '-250px'; // Esconde o menu lateral
        content.style.marginLeft = '0'; // Ajusta o conteúdo para ocupar toda a largura
    } else {
        // Caso contrário, exibe o menu e ajusta o conteúdo para dar espaço ao menu
        sidebar.style.left = '0'; // Exibe o menu lateral
        content.style.marginLeft = '250px'; // Empurra o conteúdo para a direita para caber o menu
    }
}

// Variáveis globais para controle de login e para armazenar os relatos
let isLoggedIn = false; // Controla o estado de login do usuário (false significa não logado)
let reports = [ // Array de relatos de acidentes armazenados
    { location: "Praia de Boa Viagem", description: "Acidente com tubarão em Praia de boa Viagem.", media: 'img/cachalote-pigmeu-encalhou-na-praia-de-jose-menino-em-santos-sp-1688470881897_v2_750x421.png'  },
    { location: "Praia do Pina", description: "Perigo de ataque, cuidado gente.", media: 'img/tutuba.jpg' },
    { location: "Praia de Piedade", description: "Tubarão avistado no raso, avistado pela manhã", media: 'img/tubarao-saquarema-rj-696x523.jpg' },
    { location: "Praia de Recife", description: "Ataque de tubarão hoje pela manhã", media: 'img/csm-ataque-tubarao-ff5b73a392_binary_320759-1-840x344.jpg' }
];

// Lista de usuários cadastrados (simula um backend, mas pode ser trocado por um banco de dados real)
const users = [
    { email: "1@gmail.com", password: "123456" },
    { email: "usuario2@gmail.com", password: "senha456" },
];
// Função para registrar um novo usuário
function register() {
    const name = document.getElementById('nameRegister').value;
    const email = document.getElementById('emailRegister').value;
    const password = document.getElementById('passwordRegister').value;
    const registerError = document.getElementById('registerError');

    // Verifica se os campos não estão vazios
    if (!email || !password || !name) {
        registerError.textContent = "Por favor, preencha todos os campos.";
        registerError.style.display = 'block';
        return;
    }
    // Verifica se o e-mail já está cadastrado
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        registerError.textContent = "Este e-mail já está cadastrado.";
        registerError.style.display = 'block';
        return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um email válido.");
        return;
    }

    if (password.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }


    // Adiciona o novo usuário à lista de usuários
    users.push({ email, password, name });

    // Exibe uma mensagem de sucesso e retorna para o login
    alert("Cadastro realizado com sucesso! Agora, faça login.");
    toggleToLogin();
}

// Alterna para o formulário de cadastro
function toggleToRegister() {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('registerForm').style.display = 'block';
}

// Alterna para o formulário de login
function toggleToLogin() {
    document.getElementById('registerForm').style.display = 'none';
    document.getElementById('loginForm').style.display = 'block';
}

// Função para exibir o nome e símbolo do perfil no menu lateral
function showUserProfile(user) {
    document.getElementById('profile-name').textContent = user.name;
    document.getElementById('sidebar').style.left = '0'; // Exibe o menu lateral
}

// Função de login
function login() {
    // Obtém os valores dos campos de email e senha do formulário de login
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;

    // Verifica se os campos de login não estão vazios
    if (!email || !password) {
        alert("Por favor, preencha todos os campos."); // Alerta o usuário para preencher os campos
        return; // Encerra a execução da função
    }

    // Verifica se o e-mail e senha correspondem a um usuário cadastrado
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        isLoggedIn = true; // Marca o usuário como logado
        document.getElementById('loginForm').style.display = 'none'; // Esconde o formulário de login
        document.getElementById('reportForm').style.display = 'block'; // Exibe o formulário para envio de relato
        alert("Login bem-sucedido!"); // Mensagem de sucesso no login
    } else {
        document.getElementById('loginError').style.display = 'block'; // Exibe uma mensagem de erro caso os dados estejam incorretos
    }
}

// Função para submeter o relato de acidente
function submitReport() {
    if (!isLoggedIn) {
        alert("Você precisa estar logado para enviar um relato.");
        return;
    }

    const location = document.getElementById('locationInput').value;
    const description = document.getElementById('descriptionInput').value;
    const mediaInput = document.getElementById('mediaInput').files[0];

    if (location && description) {
        const media = mediaInput ? URL.createObjectURL(mediaInput) : null;
        const reportItem = { location, description, media };
        reports.push(reportItem);
        displayReports();

        document.getElementById('locationInput').value = '';
        document.getElementById('descriptionInput').value = '';
        document.getElementById('mediaInput').value = '';
    } else {
        alert('Por favor, preencha todos os campos.');
    }
}

// Função para exibir os relatos na página
function displayReports() {
    const reportList = document.getElementById('report-list');
    reportList.innerHTML = '';

    reports.forEach(reportItem => {
        const newReport = document.createElement('div');
        newReport.classList.add('report-item');
        newReport.innerHTML = `
            <strong>Local:</strong> ${reportItem.location}<br>
            <strong>Descrição:</strong> ${reportItem.description}<br>
        `;
        if (reportItem.media) {
            const mediaElement = document.createElement(reportItem.media.includes('video') ? 'video' : 'img');
            mediaElement.src = reportItem.media;
            mediaElement.controls = true;
            mediaElement.style.maxWidth = '100%';
            newReport.appendChild(mediaElement);
        }

        reportList.appendChild(newReport);
    });
}

// Função para buscar os dados da tábua de marés
function fetchTideTable() {
    const location = document.getElementById('locationTide').value;
    const month = document.getElementById('datePicker').value.split('-')[1];
    const year = document.getElementById('datePicker').value.split('-')[0];
    const daysInMonth = getDaysInMonth(month, year);

    const tideData = {
        recife: generateRandomTides(daysInMonth),
        olinda: generateRandomTides(daysInMonth),
        jaboatao: generateRandomTides(daysInMonth),
        piedade: generateRandomTides(daysInMonth),
        'porto-galinhas': generateRandomTides(daysInMonth),
    };

    const tideList = tideData[location] || [];

    let tideTableHTML = '<table border="1"><tr><th>Dia</th><th>Maré Alta</th><th>Maré Baixa</th></tr>';

    tideList.forEach(tideDay => {
        tideTableHTML += `
            <tr>
                <td>${tideDay.day}</td>
                <td>${tideDay.tideHigh}</td>
                <td>${tideDay.tideLow}</td>
            </tr>
        `;
    });

    tideTableHTML += '</table>';

    document.getElementById('tide-table').innerHTML = tideTableHTML;
}

// Função para gerar marés aleatórias
function generateRandomTides(days) {
    const tides = [];
    for (let i = 1; i <= days; i++) {
        const highTideHour = String(Math.floor(Math.random() * 12) + 5).padStart(2, '0') + ":" + String(Math.floor(Math.random() * 60)).padStart(2, '0');
        const lowTideHour = String(Math.floor(Math.random() * 12) + 5).padStart(2, '0') + ":" + String(Math.floor(Math.random() * 60)).padStart(2, '0');

        tides.push({
            day: i,
            tideHigh: highTideHour,
            tideLow: lowTideHour
        });
    }
    return tides;
}

// Função para determinar o número de dias em um mês
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

window.onload = function () {
    displayReports();
    fetchTideTable();
}
