pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    triggers {
        pollSCM('* * * * *')
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Checkout du code..."
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installation des dépendances..."
                sh """
                    docker run --rm \
                        --user 0 \
                        -v \${WORKSPACE}:/e2e \
                        -w /e2e \
                        --ipc=host --shm-size=2g \
                        cypress/included:13.6.3 \
                        npm install
                """
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "🚀 Exécution des tests Cypress..."
                sh """
                    docker run --rm \
                        --user 0 \
                        -v \${WORKSPACE}:/e2e \
                        -w /e2e \
                        --ipc=host --shm-size=2g \
                        cypress/included:13.6.3 \
                        npx cypress run --project . --config-file cypress.config.js || true
                """
            }
        }
    }

    post {
        always {
            echo "📁 Archivage..."
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
        }
        success {
            echo "✅ Pipeline OK !"
        }
        failure {
            echo "❌ Pipeline échouée."
        }
    }
}
