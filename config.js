// Configurações da aplicação
module.exports = {
    // Porta onde a aplicação web irá rodar
    PORT: 3001,
    
    // URL da API que será consumida
    API_BASE_URL: 'http://localhost:3000',
    
    // Endpoint do Swagger
    SWAGGER_ENDPOINT: '/api-docs',
    
    // Configurações do proxy
    PROXY_TIMEOUT: 30000, // 30 segundos
    
    // Configurações da interface
    MAX_HISTORY_ITEMS: 10,
    
    // Configurações de CORS
    CORS_OPTIONS: {
        origin: true,
        credentials: true
    }
}; 