module.exports = {
  apps: [
    {
      name: 'lifeoffice-tcsg',
      script: 'dist/main.js',
      watch: false,
      ignore_watch: ['upload', 'node_modules'],
      instance_var: 'INSTANCE_ID',
      instances: 1,
      exec_mode: 'fork',

      env: {
        NODE_ENV: 'production',
        URL_NESTJS: 'https://administrator.lifetex.vn:316',
        PORT: 3116,
        JWT_SECRET: '0a6b944d-d2fb-46fc-a85e-0295c986cd9f',


        // MSSQL
        //SQLSERVER_HOST: '192.168.0.92',
        SQLSERVER_HOST: '192.168.10.174',
        SQLSERVER_PORT: '1433',
        SQLSERVER_USER: 'lifetex',
        SQLSERVER_PASSWORD: 'LTLT@2025',
        SQLSERVER_DATABASE: 'camunda',


        // Redirect FE
        REDIRECT_URI_FE: 'https://lifeoffice-tcsg.lifetex.vn',
        //REDIRECT_URI_FE: 'http://localhost:8080',
        // App config
        APP_CONVERT_URL: 'http://192.168.0.197:8080',

        // Office / AI
        URL_OFFICE:'https://vpstc-document.lifetex.vn/',
        COLLABORA_URL:'https://vpstc-document.lifetex.vn',
        TOKEN_OFFICE:'tRbuhheHuCiSupnkJ0qHTwErXS2i8T7Ac',
          
        ENABLE_AI_SYNC_INCOMING: 'true',
        ENABLE_AI_SYNC_OUTGOING: 'false',
        AI_POST_METADATA_URL:
          'https://administrator.lifetex.vn:436/api/post_metadata_chatbot/',
          
        URL_NESTJS: 'https://administrator.lifetex.vn:316',

        // SIGNING TOKEN
        SECRET_SIGN:'6O6VBW2YSdmvmFnUOjsUmjMdgwx64hHrKeVF/XVqhQ0=',
        EXPIRES_IN_TOKEN_SIGN: '24h',
        URL_SIGN_START:'http://192.168.0.59:8080/api/proxy/start',
        
        URL_KY_TAP_TRUNG: 'http://192.168.0.41:8081', 
        PROCESS_KEY_SIGNATURE: 'qtkstt',
        URL_SERVICE_SIGNING: 'https://kysotaptrung-service.lifetex.vn/',
        

        REDIS_HOST: '192.168.0.77',
        REDIS_PORT: '6379',
        REDIS_PASSWORD: 'LTLT@2026',
        REDIS_DB: '0',
      },
    },
  ],
};
