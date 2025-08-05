const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');
const config = require('./config');

const app = express();
const PORT = config.PORT;

// Middleware
app.use(cors(config.CORS_OPTIONS));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Configuração da API base
const API_BASE_URL = config.API_BASE_URL;

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Endpoint para obter informações da API
app.get('/api/info', async (req, res) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${config.SWAGGER_ENDPOINT}`, {
            timeout: config.PROXY_TIMEOUT
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao conectar com a API', details: error.message });
    }
});

// Endpoint proxy para todas as chamadas da API
app.all('/api/*', async (req, res) => {
    try {
        const apiPath = req.path.replace('/api', '');
        const method = req.method.toLowerCase();
        const url = `${API_BASE_URL}${apiPath}`;
        
        const axiosConfig = {
            method: method,
            url: url,
            timeout: config.PROXY_TIMEOUT,
            headers: {
                'Content-Type': 'application/json'
            }
        };

        if (method === 'post' || method === 'put' || method === 'patch') {
            axiosConfig.data = req.body;
        }

        if (Object.keys(req.query).length > 0) {
            axiosConfig.params = req.query;
        }

        const response = await axios(axiosConfig);
        res.json(response.data);
    } catch (error) {
        console.error('Erro na chamada da API:', error.message);
        
        // Se a API retornou uma resposta com dados, preservar o formato original
        if (error.response && error.response.data) {
            res.status(error.response.status).json(error.response.data);
        } else {
            // Se não há resposta da API, retornar erro genérico
            res.status(500).json({
                error: 'Erro na comunicação com a API',
                details: error.message
            });
        }
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
    console.log(`📚 Swagger UI disponível em ${API_BASE_URL}${config.SWAGGER_ENDPOINT}`);
    console.log(`🌐 Aplicação web disponível em http://localhost:${PORT}`);
    console.log(`⚙️  Configurações carregadas do arquivo config.js`);
}); 