pipeline {
    agent any

    stages {
        stage('Clonar o repositório') {
            steps {
                git branch: 'main', url: 'https://github.com/daianezardo/testes-automatizados-api.git'
            }
        }
        stage('Subir o servidor') {
            steps {
                sh 'npx serverest'
            }
        }
        stage('Executar testes') {
            steps {
                sh 'npx cypress run'
            }
        }
    }
}