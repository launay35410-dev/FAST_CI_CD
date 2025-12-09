pipeline {

    agent {
        docker {
            image 'cypress/included:13.6.3'
            args '--user 0 --shm-size=2g'
        }
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Récupération du code..."
                checkout scm
                sh "ls -l"
            }
        }

        stage('Install dependencies') {
            steps {
                echo "📦 Installation des dépendances..."
                sh "npm install"
            }
        }

        stage('Run Cypress tests') {
            steps {
                echo "🧪 Exécution des tests Cypress..."
                sh "npx cypress run"
            }
        }
    }

    post {
        always {
            echo "📁 Archivage des artefacts..."
            archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
        }
    }
}
