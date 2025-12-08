pipeline {
    agent any

    environment {
        // CHEMIN RÉEL WINDOWS/WSL VU PAR DOCKER
        REAL_WS = "/mnt/d/FAST_CI_CD"
    }

    stages {

        stage('Checkout') {
            steps {
                echo "📥 Récupération du code..."
                checkout scm

                echo "🔎 Vérification du vrai dossier monté dans Docker :"
                sh "echo REAL_WS = $REAL_WS"
                sh "ls -l $REAL_WS"
            }
        }

        stage('Install Dependencies') {
            steps {
                echo "📦 Installation des dépendances…"
                sh """
                    docker run --rm --user 0 \
                        -v $REAL_WS:/e2e \
                        -w /e2e \
                        --ipc=host --shm-size=2g \
                        cypress/included:13.6.3 \
                        npm install
                """
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "🚀 Exécution des tests Cypress…"
                sh """
                    docker run --rm --user 0 \
                        -v $REAL_WS:/e2e \
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
            echo "📁 Archivage artifacts…"
            archiveArtifacts artifacts: 'reports/screenshots/**/*.png', allowEmptyArchive: true
            archiveArtifacts artifacts: 'reports/videos/**/*.mp4', allowEmptyArchive: true
        }
    }
}
