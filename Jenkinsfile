pipeline {

    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Récupération du code..."
                checkout scm

                echo "📝 Vérification de la config Cypress :"
                sh "ls -l cypress.config.cjs || true"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installation des dépendances..."
                sh """
                    docker run --rm \
                        --user 0 \
                        -v \$(pwd):/e2e \
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
                        -v \$(pwd):/e2e \
                        -w /e2e \
                        --ipc=host --shm-size=2g \
                        cypress/included:13.6.3 \
                        npx cypress run --config-file cypress.config.cjs || true
                """
            }
        }
    }

    post {
        always {
            echo "📁 Archivage artifacts Cypress..."
            archiveArtifacts artifacts: 'reports/screenshots/**/*.png', allowEmptyArchive: true
            archiveArtifacts artifacts: 'reports/videos/**/*.mp4', allowEmptyArchive: true
        }
        success {
            echo "✅ Pipeline OK !"
        }
        failure {
            echo "❌ Pipeline échouée."
        }
    }
}
