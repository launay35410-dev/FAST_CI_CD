pipeline {
    agent {
        docker {
            image 'cypress/browsers:node-20.9.0-chrome-118.0.5993.70-firefox-118.0.2'
            args '--shm-size=2g'
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
                sh "npm ci"
            }
        }

        stage('Run Cypress tests - Multi Browsers') {
            parallel {

                stage('Chrome') {
                    steps {
                        echo "🌐 Tests Chrome"
                        sh '''
                            npx cypress run \
                                --browser chrome \
                                --reporter junit \
                                --reporter-options "mochaFile=reports/junit/test-results-chrome.xml,toConsole=true"
                        '''
                    }
                }

                stage('Firefox') {
                    steps {
                        echo "🦊 Tests Firefox"
                        sh '''
                            npx cypress run \
                                --browser firefox \
                                --reporter junit \
                                --reporter-options "mochaFile=reports/junit/test-results-firefox.xml,toConsole=true"
                        '''
                    }
                }

            }
        }
    }

    post {
        always {
            echo "📁 Archivage des artefacts..."

            archiveArtifacts artifacts: 'cypress/videos/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'reports/junit/*.xml', allowEmptyArchive: true

            junit 'reports/junit/*.xml'
        }
    }
}
