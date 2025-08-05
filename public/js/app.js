// Sistema de Login - Main JavaScript
class LoginSystem {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.initializeMaterialize();
        this.bindEvents();
        this.checkAPIStatus();
        this.checkLoginStatus();
    }

    initializeMaterialize() {
        // Inicializar componentes do MaterializeCSS
        M.AutoInit();
        
        // Inicializar inputs
        const inputs = document.querySelectorAll('input');
        M.updateTextFields();
    }

    bindEvents() {
        // Login form
        document.getElementById('login-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Forgot password form
        document.getElementById('forgot-password-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleForgotPassword();
        });

        // Code validation form
        document.getElementById('code-validation-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleCodeValidation();
        });

        // New password form
        document.getElementById('new-password-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleNewPassword();
        });

        // Form toggles
        document.getElementById('show-forgot-password').addEventListener('click', (e) => {
            e.preventDefault();
            this.showForgotPasswordForm();
        });

        document.getElementById('show-esqueci-senha').addEventListener('click', (e) => {
            e.preventDefault();
            this.showEsqueciSenhaForm();
        });

        document.getElementById('show-login-from-reset').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });

        document.getElementById('show-login-from-code').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });

        document.getElementById('show-login-from-password').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });

        document.getElementById('show-login-from-esqueci').addEventListener('click', (e) => {
            e.preventDefault();
            this.showLoginForm();
        });

        // Esqueci senha form
        document.getElementById('esqueci-senha-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleEsqueciSenha();
        });

        // Logout
        document.getElementById('logout-btn').addEventListener('click', () => {
            this.handleLogout();
        });

        // Refresh status
        document.getElementById('refresh-status').addEventListener('click', (e) => {
            e.preventDefault();
            this.checkAPIStatus();
        });

        // Password confirmation validation
        document.getElementById('confirm-new-password').addEventListener('input', () => {
            this.validatePasswordConfirmation();
        });
    }

    showForgotPasswordForm() {
        document.querySelector('.row:nth-child(2)').style.display = 'none';
        document.getElementById('forgot-password-section').style.display = 'block';
        document.getElementById('code-validation-section').style.display = 'none';
        document.getElementById('new-password-section').style.display = 'none';
        document.getElementById('esqueci-senha-section').style.display = 'none';
        document.getElementById('user-info').style.display = 'none';
        this.hideResponse();
    }

    showEsqueciSenhaForm() {
        document.querySelector('.row:nth-child(2)').style.display = 'none';
        document.getElementById('forgot-password-section').style.display = 'none';
        document.getElementById('code-validation-section').style.display = 'none';
        document.getElementById('new-password-section').style.display = 'none';
        document.getElementById('esqueci-senha-section').style.display = 'block';
        document.getElementById('user-info').style.display = 'none';
        this.hideResponse();
    }

    showCodeValidationForm() {
        document.querySelector('.row:nth-child(2)').style.display = 'none';
        document.getElementById('forgot-password-section').style.display = 'none';
        document.getElementById('code-validation-section').style.display = 'block';
        document.getElementById('new-password-section').style.display = 'none';
        document.getElementById('esqueci-senha-section').style.display = 'none';
        document.getElementById('user-info').style.display = 'none';
        this.hideResponse();
    }

    showNewPasswordForm() {
        document.querySelector('.row:nth-child(2)').style.display = 'none';
        document.getElementById('forgot-password-section').style.display = 'none';
        document.getElementById('code-validation-section').style.display = 'none';
        document.getElementById('new-password-section').style.display = 'block';
        document.getElementById('esqueci-senha-section').style.display = 'none';
        document.getElementById('user-info').style.display = 'none';
        this.hideResponse();
    }

    showLoginForm() {
        document.querySelector('.row:nth-child(2)').style.display = 'block';
        document.getElementById('forgot-password-section').style.display = 'none';
        document.getElementById('code-validation-section').style.display = 'none';
        document.getElementById('new-password-section').style.display = 'none';
        document.getElementById('esqueci-senha-section').style.display = 'none';
        document.getElementById('user-info').style.display = 'none';
        this.hideResponse();
    }

    showUserInfo() {
        document.querySelector('.row:nth-child(2)').style.display = 'none';
        document.getElementById('forgot-password-section').style.display = 'none';
        document.getElementById('code-validation-section').style.display = 'none';
        document.getElementById('new-password-section').style.display = 'none';
        document.getElementById('esqueci-senha-section').style.display = 'none';
        document.getElementById('user-info').style.display = 'block';
        this.hideResponse();
    }

    async checkAPIStatus() {
        const statusIndicator = document.getElementById('status-indicator');
        
        try {
            const response = await fetch('/api/info');
            if (response.ok) {
                statusIndicator.innerHTML = `
                    <i class="material-icons green-text">check_circle</i>
                    <span class="green-text">API Conectada</span>
                `;
                statusIndicator.className = 'status-indicator connected';
            } else {
                throw new Error('API não respondeu corretamente');
            }
        } catch (error) {
            statusIndicator.innerHTML = `
                <i class="material-icons red-text">error</i>
                <span class="red-text">API Desconectada</span>
            `;
            statusIndicator.className = 'status-indicator disconnected';
        }
    }

    checkLoginStatus() {
        // Verificar se há dados de usuário salvos no localStorage
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            try {
                this.currentUser = JSON.parse(savedUser);
                this.showUserInfo();
                this.displayUserDetails();
            } catch (error) {
                localStorage.removeItem('currentUser');
            }
        }
    }

    async handleLogin() {
        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;

        if (!username || !password) {
            this.showMessage('Por favor, preencha todos os campos', 'error');
            return;
        }

        const loginBtn = document.getElementById('login-btn');
        loginBtn.classList.add('loading');
        loginBtn.innerHTML = '<i class="material-icons left">hourglass_empty</i>Entrando...';

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    password: password
                })
            });

            const data = await response.json();
            
            // Debug: mostrar a resposta da API no console
            console.log('Resposta da API (login):', data);
            console.log('Status da resposta:', response.status);

            // Usar o sistema de configuração para tratar a resposta
            const isSuccess = this.handleApiResponse('/login', response, data, username);
            
            if (isSuccess) {
                // Se a API retorna apenas mensagem, criar um objeto de usuário padrão
                if (data.mensagem && !data.user && !data.id) {
                    this.currentUser = {
                        username: username,
                        name: username,
                        email: 'N/A',
                        loginTime: new Date().toLocaleString('pt-BR')
                    };
                } else {
                    this.currentUser = data.user || data;
                }
                localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
                this.showUserInfo();
                this.displayUserDetails();
            }
        } catch (error) {
            this.showMessage('Erro de conexão com a API', 'error');
        } finally {
            loginBtn.classList.remove('loading');
            loginBtn.innerHTML = '<i class="material-icons left">login</i>Entrar';
        }
    }

    async handleForgotPassword() {
        const email = document.getElementById('reset-email').value.trim();

        if (!email) {
            this.showMessage('Por favor, insira seu email', 'error');
            return;
        }

        const resetBtn = document.getElementById('reset-btn');
        resetBtn.classList.add('loading');
        resetBtn.innerHTML = '<i class="material-icons left">hourglass_empty</i>Enviando...';

        try {
            const response = await fetch('/api/solicitar-redefinicao', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email
                })
            });

            const data = await response.json();
            
            // Debug: mostrar a resposta da API no console
            console.log('Resposta da API (solicitar-redefinicao):', data);

            // Usar o sistema de configuração para tratar a resposta
            this.handleApiResponse('/solicitar-redefinicao', response, data);
        } catch (error) {
            this.showMessage('Erro de conexão com a API', 'error');
        } finally {
            resetBtn.classList.remove('loading');
            resetBtn.innerHTML = '<i class="material-icons left">send</i>Solicitar Redefinição';
        }
    }

    async handleCodeValidation() {
        const code = document.getElementById('validation-code').value.trim();

        if (!code) {
            this.showMessage('Por favor, insira o código de verificação', 'error');
            return;
        }

        const validateBtn = document.getElementById('validate-code-btn');
        validateBtn.classList.add('loading');
        validateBtn.innerHTML = '<i class="material-icons left">hourglass_empty</i>Validando...';

        try {
            const response = await fetch('/api/validar-codigo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    codigo: code
                })
            });

            const data = await response.json();
            
            // Debug: mostrar a resposta da API no console
            console.log('Resposta da API (validar-codigo):', data);

            // Usar o sistema de configuração para tratar a resposta
            this.handleApiResponse('/validar-codigo', response, data);
        } catch (error) {
            this.showMessage('Erro de conexão com a API', 'error');
        } finally {
            validateBtn.classList.remove('loading');
            validateBtn.innerHTML = '<i class="material-icons left">check_circle</i>Validar Código';
        }
    }

    async handleNewPassword() {
        const newPassword = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-new-password').value;

        if (!newPassword || !confirmPassword) {
            this.showMessage('Por favor, preencha todos os campos', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showMessage('As senhas não coincidem', 'error');
            return;
        }

        if (newPassword.length < 6) {
            this.showMessage('A senha deve ter pelo menos 6 caracteres', 'error');
            return;
        }

        const saveBtn = document.getElementById('save-password-btn');
        saveBtn.classList.add('loading');
        saveBtn.innerHTML = '<i class="material-icons left">hourglass_empty</i>Salvando...';

        try {
            const response = await fetch('/api/redefinir-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    novaSenha: newPassword
                })
            });

            const data = await response.json();
            
            // Debug: mostrar a resposta da API no console
            console.log('Resposta da API (redefinir-senha):', data);

            // Usar o sistema de configuração para tratar a resposta
            this.handleApiResponse('/redefinir-senha', response, data);
        } catch (error) {
            this.showMessage('Erro de conexão com a API', 'error');
        } finally {
            saveBtn.classList.remove('loading');
            saveBtn.innerHTML = '<i class="material-icons left">save</i>Salvar Nova Senha';
        }
    }

    async handleEsqueciSenha() {
        const username = document.getElementById('esqueci-username').value.trim();
        const email = document.getElementById('esqueci-email').value.trim();

        if (!username || !email) {
            this.showMessage('Por favor, preencha todos os campos', 'error');
            return;
        }

        const esqueciBtn = document.getElementById('esqueci-senha-btn');
        esqueciBtn.classList.add('loading');
        esqueciBtn.innerHTML = '<i class="material-icons left">hourglass_empty</i>Processando...';

        try {
            const response = await fetch('/api/esqueci-senha', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: username,
                    email: email
                })
            });

            const data = await response.json();
            
            // Debug: mostrar a resposta da API no console
            console.log('Resposta da API (esqueci-senha):', data);

            // Usar o sistema de configuração para tratar a resposta
            this.handleApiResponse('/esqueci-senha', response, data);
        } catch (error) {
            this.showMessage('Erro de conexão com a API', 'error');
        } finally {
            esqueciBtn.classList.remove('loading');
            esqueciBtn.innerHTML = '<i class="material-icons left">help_outline</i>Recuperar Senha';
        }
    }

    async handleLogout() {
        // Limpar dados locais (não há endpoint de logout na API)
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        
        this.showLoginForm();
        this.clearLoginForm();
        this.showMessage('Logout realizado com sucesso!', 'success');
    }

    displayUserDetails() {
        const userDetails = document.getElementById('user-details');
        
        if (this.currentUser) {
            userDetails.innerHTML = `
                <div class="user-detail">
                    <i class="material-icons">person</i>
                    <span><strong>Nome:</strong> ${this.currentUser.name || this.currentUser.username}</span>
                </div>
                <div class="user-detail">
                    <i class="material-icons">email</i>
                    <span><strong>Email:</strong> ${this.currentUser.email || 'N/A'}</span>
                </div>
                <div class="user-detail">
                    <i class="material-icons">account_circle</i>
                    <span><strong>Username:</strong> ${this.currentUser.username}</span>
                </div>
                <div class="user-detail">
                    <i class="material-icons">schedule</i>
                    <span><strong>Login em:</strong> ${this.currentUser.loginTime || new Date().toLocaleString('pt-BR')}</span>
                </div>
            `;
        }
    }

    validatePasswordConfirmation() {
        const password = document.getElementById('new-password').value;
        const confirmPassword = document.getElementById('confirm-new-password').value;
        const confirmField = document.getElementById('confirm-new-password');

        if (confirmPassword && password !== confirmPassword) {
            confirmField.classList.add('invalid');
            confirmField.classList.remove('valid');
        } else if (confirmPassword && password === confirmPassword) {
            confirmField.classList.add('valid');
            confirmField.classList.remove('invalid');
        } else {
            confirmField.classList.remove('valid', 'invalid');
        }
    }

    clearLoginForm() {
        document.getElementById('login-form').reset();
        M.updateTextFields();
    }

    clearForgotPasswordForm() {
        document.getElementById('forgot-password-form').reset();
        M.updateTextFields();
    }

    clearCodeValidationForm() {
        document.getElementById('code-validation-form').reset();
        M.updateTextFields();
    }

    clearNewPasswordForm() {
        document.getElementById('new-password-form').reset();
        M.updateTextFields();
    }

    clearEsqueciSenhaForm() {
        document.getElementById('esqueci-senha-form').reset();
        M.updateTextFields();
    }

    showMessage(message, type = 'info') {
        const responseContainer = document.getElementById('response-container');
        const icon = type === 'success' ? 'check_circle' : type === 'error' ? 'error' : 'info';
        
        responseContainer.innerHTML = `
            <div class="message ${type}">
                <i class="material-icons">${icon}</i>
                ${message}
            </div>
        `;
        responseContainer.style.display = 'block';

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideResponse();
        }, 5000);
    }

    hideResponse() {
        const responseContainer = document.getElementById('response-container');
        responseContainer.style.display = 'none';
    }

    // Método principal para tratar respostas da API usando configuração
    handleApiResponse(endpoint, response, data, username = null) {
        // Configuração das respostas da API
        const apiConfig = {
            '/login': {
                success: {
                    statusCodes: [200, 201],
                    indicators: ['mensagem', 'success', 'token', 'accessToken', 'user', 'id'],
                    defaultMessage: 'Login realizado com sucesso!',
                    action: 'showUserInfo'
                },
                error: {
                    statusCodes: [400, 401, 403, 404, 500],
                    indicators: ['mensagem', 'message', 'error', 'erro'],
                    defaultMessage: 'Erro no login'
                }
            },
            '/solicitar-redefinicao': {
                success: {
                    statusCodes: [200, 201],
                    indicators: ['mensagem', 'success', 'message'],
                    defaultMessage: 'Código de verificação enviado para seu email!',
                    action: 'showCodeValidationForm'
                },
                error: {
                    statusCodes: [400, 404, 500],
                    indicators: ['mensagem', 'message', 'error', 'erro'],
                    defaultMessage: 'Erro ao solicitar redefinição'
                }
            },
            '/validar-codigo': {
                success: {
                    statusCodes: [200, 201],
                    indicators: ['mensagem', 'success', 'message'],
                    defaultMessage: 'Código validado com sucesso! Defina sua nova senha.',
                    action: 'showNewPasswordForm'
                },
                error: {
                    statusCodes: [400, 404, 500],
                    indicators: ['mensagem', 'message', 'error', 'erro'],
                    defaultMessage: 'Código inválido'
                }
            },
            '/redefinir-senha': {
                success: {
                    statusCodes: [200, 201],
                    indicators: ['mensagem', 'success', 'message'],
                    defaultMessage: 'Senha redefinida com sucesso! Faça login com sua nova senha.',
                    action: 'showLoginForm'
                },
                error: {
                    statusCodes: [400, 404, 500],
                    indicators: ['mensagem', 'message', 'error', 'erro'],
                    defaultMessage: 'Erro ao redefinir senha'
                }
            },
            '/esqueci-senha': {
                success: {
                    statusCodes: [200, 201],
                    indicators: ['mensagem', 'success', 'message'],
                    defaultMessage: 'Processo de recuperação iniciado com sucesso!',
                    action: 'showLoginForm'
                },
                error: {
                    statusCodes: [400, 404, 500],
                    indicators: ['mensagem', 'message', 'error', 'erro'],
                    defaultMessage: 'Erro ao processar solicitação'
                }
            }
        };

        const config = apiConfig[endpoint];
        if (!config) {
            this.showMessage('Endpoint não configurado', 'error');
            return false;
        }

        // Verificar se é uma resposta de sucesso
        const isSuccess = this.isSuccessResponse(endpoint, response, data, config);
        const messageType = isSuccess ? 'success' : 'error';
        
        // Extrair mensagem da resposta
        const message = this.extractMessage(endpoint, data, isSuccess, config);
        
        // Mostrar mensagem
        this.showMessage(message, messageType);
        
        // Executar ação de sucesso se necessário
        if (isSuccess && config.success.action) {
            this.executeSuccessAction(config.success.action);
        }
        
        return isSuccess;
    }

    // Verificar se uma resposta é de sucesso
    isSuccessResponse(endpoint, response, data, config) {
        // Verificar status code
        const validStatus = config.success.statusCodes.includes(response.status);
        if (!validStatus) return false;

        // Verificar indicadores de sucesso
        return config.success.indicators.some(indicator => {
            return data && data[indicator] !== undefined && data[indicator] !== null;
        });
    }

    // Extrair mensagem da resposta
    extractMessage(endpoint, data, isSuccess, config) {
        const responseConfig = isSuccess ? config.success : config.error;
        
        // Tentar extrair mensagem dos indicadores
        for (const indicator of responseConfig.indicators) {
            if (data && data[indicator]) {
                return data[indicator];
            }
        }

        // Se não encontrou nos indicadores, tentar outras possibilidades
        if (!isSuccess) {
            // Para erros, tentar extrair de diferentes formatos
            if (data && data.details && data.details.mensagem) {
                return data.details.mensagem;
            }
            if (data && data.error) {
                return data.error;
            }
            if (data && typeof data === 'string') {
                return data;
            }
        }

        return responseConfig.defaultMessage;
    }

    // Executar ação de sucesso
    executeSuccessAction(action) {
        switch (action) {
            case 'showUserInfo':
                // Ação já executada no handleLogin
                break;
            case 'showCodeValidationForm':
                this.showCodeValidationForm();
                break;
            case 'showNewPasswordForm':
                this.showNewPasswordForm();
                break;
            case 'showLoginForm':
                this.showLoginForm();
                this.clearNewPasswordForm();
                break;
            case 'showForgotPasswordForm':
                this.showForgotPasswordForm();
                break;
            case 'showEsqueciSenhaForm':
                this.showEsqueciSenhaForm();
                break;
        }
    }

    // Método para testar diferentes endpoints de login
    async testLoginEndpoint(endpoint, data) {
        try {
            const response = await fetch(`/api${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            return { success: response.ok, data: responseData, status: response.status };
        } catch (error) {
            return { success: false, error: error.message };
        }
    }
}

// Inicializar a aplicação quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    window.loginSystem = new LoginSystem();
});

// Função global para testes (pode ser chamada no console)
window.testLogin = async (username, password) => {
    if (!window.loginSystem) return;
    
    const result = await window.loginSystem.testLoginEndpoint('/login', {
        username: username,
        password: password
    });
    
    console.log('Teste de Login:', result);
    return result;
}; 