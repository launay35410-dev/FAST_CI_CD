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
                sh "echo WORKSPACE=$WORKSPACE"
                sh "ls -l"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installation des dépendances..."

                sh """
                docker run --rm --user 0 \
                -v ${WORKSPACE}:/work \
                -w /work \
                --ipc=host \
                --shm-size=2g \
                cypress/included:13.6.3 npm install
                """
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "🚀 Exécution des tests Cypress..."

                sh """
                docker run --rm --user 0 \
                -v ${WORKSPACE}:/work \
                -w /work \
                --ipc=host \
                --shm-size=2g \
                cypress/included:13.6.3 npx cypress run
                """
            }
        }
    }

    post {
        always {
            echo "📁 Archivage artifacts Cypress..."
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
        }
        success { echo "✅ Pipeline OK !" }
        failure { echo "❌ Pipeline échouée." }
    }
}
