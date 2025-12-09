pipeline {
    agent any

    environment {
        GITHUB_CREDENTIALS = credentials('github')
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Récupération du code…"
                checkout scm
                sh "ls -l"
            }
        }

        stage('Install Node & Dependencies') {
            steps {
                echo "📦 Installation des dépendances…"

                sh '''
                    if ! command -v node >/dev/null 2>&1; then
                        echo "➡ Installation Node.js…"
                        curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
                        apt-get install -y nodejs
                    fi
                '''

                sh "npm install"
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "🧪 Lancement des tests Cypress…"
                sh "npx cypress run"
            }
        }
    }

    post {
        always {
            echo "📁 Archivage des artefacts Cypress…"
            archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
        }
    }
}
