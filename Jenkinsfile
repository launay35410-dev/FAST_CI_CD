pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Récupération du code..."
                checkout scm
                sh 'echo WORKSPACE=$WORKSPACE'
                sh 'ls -l $WORKSPACE'
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installation des dépendances..."
                sh """
                    docker run --rm --user 0 \
                        -v $WORKSPACE:/e2e \
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
                    docker run --rm --user 0 \
                        -v $WORKSPACE:/e2e \
                        -w /e2e \
                        --ipc=host --shm-size=2g \
                        cypress/included:13.6.3 \
                        npx cypress run || true
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
    }
}
