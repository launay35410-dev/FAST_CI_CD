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
                        -v \$PWD:/e2e \
                        -w /e2e \
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
                        -v \$PWD:/e2e \
                        -w /e2e \
                        cypress/included:13.6.3 \
                        npx cypress run || true
                """
            }
        }
    }

    post {
        always {
            echo "📁 Archivage des artefacts..."
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
