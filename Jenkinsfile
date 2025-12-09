pipeline {
  agent {
    docker {
      image 'cypress/included:13.6.3'
      args '--entrypoint="" --shm-size=2g'
    }
  }

  stages {
    stage('Checkout') {
      steps {
        echo "📥 Récupération du code..."
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        echo "📦 Installation des dépendances..."
        sh 'npm ci'
      }
    }

    stage('Run Cypress Tests - Multi Browsers') {
      parallel {
        stage('Chrome') {
          steps {
            echo "🚀 Tests sur Chrome..."
            sh 'npx cypress run --browser chrome'
          }
        }
        stage('Edge') {
          steps {
            echo "🚀 Tests sur Edge..."
            sh 'npx cypress run --browser edge'
          }
        }
        stage('Firefox') {
          steps {
            echo "🚀 Tests sur Firefox..."
            sh 'npx cypress run --browser firefox'
          }
        }
      }
    }

    stage('Archive Results') {
      steps {
        echo "📁 Archivage des artefacts Cypress..."
        archiveArtifacts artifacts: 'cypress/videos/**/*, cypress/screenshots/**/*', allowEmptyArchive: true
      }
    }
  }

  post {
    always {
      echo "🧹 Nettoyage terminé."
    }
    success {
      echo "✅ Build OK !"
    }
    failure {
      echo "❌ Erreur dans la pipeline."
    }
  }
}
