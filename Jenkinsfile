pipeline {
  agent any
  environment {
    TOMCAT_HOME = 'D:\\Program Files\\Apache Software Foundation\\Tomcat 9.0'
    SERVICE_NAME = 'Tomcat9'
    FRONTEND_CTX = 'reactweatherfrontend'
    BACKEND_WAR  = 'springbootweatherapi.war'
  }

  stages {
    stage('Build Frontend') {
      steps {
        dir('weather-frontend') {
          bat 'npm ci'
          bat 'npm run build'
        }
      }
    }

    stage('Stop Tomcat9 (only if running)') {
      steps {
        bat """
        sc query "%SERVICE_NAME%" | find /I "RUNNING" >nul
        if %ERRORLEVEL%==0 (
          echo Stopping %SERVICE_NAME%...
          net stop "%SERVICE_NAME%" /y
        ) else (
          echo %SERVICE_NAME% is already stopped.
        )
        """
      }
    }

    stage('Deploy Frontend to Tomcat9') {
      steps {
        bat """
        if exist "%TOMCAT_HOME%\\webapps\\%FRONTEND_CTX%" (
            rmdir /S /Q "%TOMCAT_HOME%\\webapps\\%FRONTEND_CTX%"
        )
        mkdir "%TOMCAT_HOME%\\webapps\\%FRONTEND_CTX%"
        xcopy /E /I /Y "weather-frontend\\dist\\*" "%TOMCAT_HOME%\\webapps\\%FRONTEND_CTX%"

        echo === WEBAPPS AFTER FRONTEND ===
        dir "%TOMCAT_HOME%\\webapps"
        """
      }
    }

    stage('Build Backend (WAR)') {
      steps {
        dir('weather-backend') {
          bat 'mvn -B -DskipTests clean package'
          bat 'echo === TARGET CONTENTS === & dir target'
        }
      }
    }

    stage('Deploy Backend to Tomcat9') {
      steps {
        bat """
        if exist "%TOMCAT_HOME%\\webapps\\%BACKEND_WAR%" del /Q "%TOMCAT_HOME%\\webapps\\%BACKEND_WAR%"
        if exist "%TOMCAT_HOME%\\webapps\\springbootweatherapi" rmdir /S /Q "%TOMCAT_HOME%\\webapps\\springbootweatherapi"
        copy "weather-backend\\target\\%BACKEND_WAR%" "%TOMCAT_HOME%\\webapps\\"

        echo === WEBAPPS AFTER BACKEND COPY ===
        dir "%TOMCAT_HOME%\\webapps"
        """
      }
    }

    stage('Start Tomcat9 (only if stopped)') {
      steps {
        bat """
        sc query "%SERVICE_NAME%" | find /I "RUNNING" >nul
        if %ERRORLEVEL%==0 (
          echo %SERVICE_NAME% already running.
        ) else (
          echo Starting %SERVICE_NAME%...
          net start "%SERVICE_NAME%" || (echo Ignoring non-zero code from net start & ver >nul)
        )
        """
      }
    }

    stage('Wait for WAR to explode') {
      steps {
        bat """
        set CTX=%TOMCAT_HOME%\\webapps\\springbootweatherapi
        for /L %%i in (1,1,30) do (
          if exist "%%CTX%%\\WEB-INF" (
            echo App exploded. Proceeding.
            goto :done
          )
          timeout /t 2 >nul
        )
        :done
        """
      }
    }
  }

  post {
    success { echo 'Deployment Successful!' }
    failure { echo 'Pipeline Failed.' }
  }
}
