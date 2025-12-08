pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {

        stage('Install Dependencies') {
            steps {
                echo "📦 Installation des dépendances..."
                sh '''
                    docker run --rm \
                        -v $PWD:/e2e \
                        -w /e2e \
                        --ipc=host \
                        --shm-size=2g \
                        --privileged \
                        cypress/included:13.6.3 \
                        npm install
                '''
            }
        }

        stage('Run Cypress Tests') {
            steps {
                echo "🚀 Exécution des tests Cypress..."
                sh '''
                    docker run --rm \
                        -v $PWD:/e2e \
                        -w /e2e \
                        --ipc=host \
                        --shm-size=2g \
                        --privileged \
                        cypress/included:13.6.3 \
                        npx cypress run --disable-gpu --no-sandbox
                '''
            }
        }
    }

    post {
        always {
            echo "📁 Archivage..."
            archiveArtifacts artifacts: 'cypress/screenshots/**/*.png', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/videos/**/*.mp4', allowEmptyArchive: true
        }
    }
}
