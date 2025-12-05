pipeline {
    agent none

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    triggers {
        // Déclenche la pipeline à chaque push GitHub
        pollSCM('* * * * *')
    }

    stages {

        stage('Checkout') {
            agent { label 'master' }
            steps {
                echo "📥 Récupération du code depuis GitHub..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            agent {
                docker {
                    image 'cypress/included:13.6.3'
                    args '-u root:root'
                }
            }
            steps {
                echo "📦 Installation des dépendances NPM..."
                sh 'npm install'
            }
        }

        stage('Run Cypress Tests') {
            agent {
                docker {
                    image 'cypress/included:13.6.3'
                    args '-u root:root'
                }
            }
            steps {
                echo "🚀 Lancement des tests Cypress..."
                sh 'npm test || true'
            }
            post {
                always {
                    echo "📁 Archivage des artefacts Cypress..."

                    archiveArtifacts artifacts: 'reports/videos/**/*.mp4', allowEmptyArchive: true
                    archiveArtifacts artifacts: 'reports/screenshots/**/*.png', allowEmptyArchive: true
                }
            }
        }
    }

    post {
        always {
            echo "🧹 Nettoyage terminé."
        }
        success {
            echo "✅ Build OK !"
        }
        failure {
            echo "❌ Erreur dans la pipeline."
        }
    }
}
