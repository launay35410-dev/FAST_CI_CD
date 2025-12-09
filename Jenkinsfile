pipeline {
    agent {
        docker {
            // Image qui inclut Chrome, Edge et Firefox
            image 'cypress/browsers:node18.16.0-chrome113-ff113-edge'
            args '--entrypoint="" --shm-size=4g --user 0'
        }
    }

    environment {
        // Fix pour Chrome/Edge/Firefox dans les conteneurs
        XDG_RUNTIME_DIR = '/tmp/runtime-dir'
    }

    stages {
        stage('Prepare runtime') {
            steps {
                sh 'mkdir -p /tmp/runtime-dir'
            }
        }

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
                sh "npm ci"
            }
        }

        stage('Run Cypress tests - Multi Browsers') {
            parallel {
                stage('Chrome') {
                    steps {
                        echo "🚀 Tests sur Chrome..."
                        sh 'npx cypress run --browser chrome --headless --reporter junit --reporter-options "mochaFile=reports/junit/test-results-chrome.xml,toConsole=true"'
                    }
                }
                stage('Edge') {
                    steps {
                        echo "🚀 Tests sur Edge..."
                        sh 'npx cypress run --browser edge --headless --reporter junit --reporter-options "mochaFile=reports/junit/test-results-edge.xml,toConsole=true"'
                    }
                }
                stage('Firefox') {
                    steps {
                        echo "🚀 Tests sur Firefox..."
                        sh 'npx cypress run --browser firefox --headless --reporter junit --reporter-options "mochaFile=reports/junit/test-results-firefox.xml,toConsole=true"'
                    }
                }
            }
        }
    }

    post {
        always {
            echo "📁 Archivage des artefacts..."
            archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**, reports/junit/*.xml, mochawesome-report/*', allowEmptyArchive: true
            junit 'reports/junit/*.xml'
        }
        success {
            echo "✅ Build OK !"
        }
        failure {
            echo "❌ Erreur dans la pipeline."
        }
    }
}
