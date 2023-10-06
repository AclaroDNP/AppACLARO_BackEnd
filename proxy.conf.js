const PROXY_CONFIG = [
    {
        context: [
            "/simplificador/",
            "/corrector/",
            "/lexrank/",
            "/predict-mT5/",
            "/metricas/",
            "/palabrasComplejas/"
        ],
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        externalResolver: true,
        bodyParser: false
    }
]

module.exports = PROXY_CONFIG;