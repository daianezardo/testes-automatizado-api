pipeline {
    agent any

    stages {
        stage('Clonar o repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/daianezardo/testes-automatizados-api.git'
            }
        }
        stage('Instalar dependência') {
            steps {
                bat 'npm install'
            }
        }
        stage('Subir o servidor') {
            steps {
                bat 'npx serverest'
            }
        }
        stage('Executar testes') {
            steps {
                bat 'npx cypress run'
            }
        }
    }
}