pipeline {
  agent {
    docker {
      image 'cypress/browsers:node18.12.0-chrome112-ff112-edge'
      args '--entrypoint="" --shm-size=4g --user 0'
    }
  }

  environment {
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
      }
    }

    stage('Install dependencies') {
      steps {
        echo "📦 Installation des dépendances..."
        sh 'npm ci'
      }
    }

    stage('Run Cypress tests - Multi Browsers') {
      parallel {
        stage('Chrome') {
          steps {
            sh 'npx cypress run --browser chrome --headless'
          }
        }
        stage('Edge') {
          steps {
            sh 'npx cypress run --browser edge --headless'
          }
        }
        stage('Firefox') {
          steps {
            sh 'npx cypress run --browser firefox --headless'
          }
        }
      }
    }
  }

  post {
    always {
      echo "📁 Archivage des artefacts..."
      archiveArtifacts artifacts: 'cypress/videos/**, cypress/screenshots/**', allowEmptyArchive: true
    }
    success {
      echo "✅ Build OK !"
    }
    failure {
      echo "❌ Erreur dans la pipeline."
    }
  }
}
