pipeline {
    agent {
        kubernetes {
            yaml """
            apiVersion: v1
            kind: Pod
            spec:
              hostAliases:
              - ip: "192.168.1.254"
                hostnames:
                - "nexus.juliaosistem-server.in"
              securityContext:
                runAsUser: 0
              containers:
              - name: nodejs
                image: node:20-alpine
                command: ['cat']
                tty: true
                volumeMounts:
                - name: node-cache
                  mountPath: /root/.npm
                resources:
                  limits: { memory: "6Gi", cpu: "3000m" }
                  requests: { memory: "3Gi", cpu: "1500m" }
              - name: docker
                image: docker:24-cli
                command: ['cat']
                tty: true
                volumeMounts:
                - name: dockersock
                  mountPath: /var/run/docker.sock
              volumes:
              - name: dockersock
                hostPath: { path: /var/run/docker.sock }
              - name: node-cache
                persistentVolumeClaim:
                  claimName: node-pvc
            """
        }
    }

    environment {
        NEXUS_DOMAIN = 'nexus.juliaosistem-server.in'
        NEXUS_DOCKER_REGISTRY = "${env.NEXUS_DOMAIN}:30500"
        NEXUS_NPM_REGISTRY = "http://${env.NEXUS_DOMAIN}/repository/npm-private/"

        GIT_CREDS_ID   = 'credencialesgit'
        NEXUS_CREDS_ID = 'nexus-credentials'
        RANCHER_CREDS_ID = 'rancher-api-credentials'

        // Despliegue (ajusta según tus nombres reales)
        K8S_NAMESPACE   = 'develop'
        K8S_DEPLOYMENT  = 'zigma-frontend'
        K8S_CONTAINER   = 'web'
        DOCKER_IMAGE_NAME = 'zigma-front'

        // Uso de colores en consola
        FORCE_COLOR = '1'
        NPM_CONFIG_COLOR = 'always'

        // Fallback si Jenkins no expone GIT_URL (ajústalo si es distinto)
        REPO_URL_FALLBACK = 'https://github.com/juliaosistem/zigmaFront.git'
    }

    options {
        skipDefaultCheckout()
        timeout(time: 1, unit: 'HOURS')
    }

    stages {
        stage('Checkout & Tagging') {
            steps {
                script {
                    sh "rm -rf ./* ./.* 2>/dev/null || true"
                    withCredentials([usernamePassword(credentialsId: "${GIT_CREDS_ID}", usernameVariable: 'U', passwordVariable: 'P')]) {
                        sh '''
                            set -e
                            URL="${GIT_URL:-$REPO_URL_FALLBACK}"
                            echo "📥 Clonando repo: $URL (branch: ${BRANCH_NAME})"
                            git clone --depth 1 --branch "${BRANCH_NAME}" "https://${U}:${P}@${URL#https://}" .
                        '''
                    }
                    container('nodejs') {
                        env.PACKAGE_VERSION = sh(script: "node -p \"require('./package.json').version\"", returnStdout: true).trim()
                    }
                    def commitId = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.CUSTOM_TAG = "${env.PACKAGE_VERSION}-${BRANCH_NAME}-${BUILD_ID}-${commitId}"
                    echo "🏷️ Tag generado: ${env.CUSTOM_TAG}"
                }
            }
        }

                stage('Build App (Nexus deps)') {
            steps {
                container('nodejs') {
                                        withCredentials([usernamePassword(credentialsId: "${NEXUS_CREDS_ID}", usernameVariable: 'NEXUS_USER', passwordVariable: 'NEXUS_PASS')]) {
                                        sh '''
                        set -e
                        apk add --no-cache git bash jq

                                                echo "🔐 Configurando .npmrc para Nexus (${NEXUS_NPM_REGISTRY})"
                                                hostpath=$(echo "${NEXUS_NPM_REGISTRY}" | sed -E 's|https?://||; s|/$||')
                                                printf "registry=%s\n//%s/:_auth=%s\n//%s/:always-auth=true\n" \
                                                    "${NEXUS_NPM_REGISTRY}" \
                                                    "$hostpath" \
                                                    "$(printf "%s:%s" "$NEXUS_USER" "$NEXUS_PASS" | base64)" \
                                                    "$hostpath" > .npmrc

                                                echo "🔎 Resolviendo versión de lib-common-angular en Nexus"
                                                RESOLVED_VER=$(npm view lib-common-angular version --registry "${NEXUS_NPM_REGISTRY}" 2>/dev/null || true)
                                                if [ -n "$RESOLVED_VER" ]; then
                                                    echo "✅ Versión encontrada en Nexus: $RESOLVED_VER"
                                                    node -e "let fs=require('fs');let p=JSON.parse(fs.readFileSync('package.json','utf8'));p.dependencies=p.dependencies||{};p.dependencies['lib-common-angular']=process.env.V||p.dependencies['lib-common-angular'];if((p.dependencies['lib-common-angular']||'').startsWith('file:')||!p.dependencies['lib-common-angular']){p.dependencies['lib-common-angular']='^'+process.env.V};fs.writeFileSync('package.json',JSON.stringify(p,null,2));" V="$RESOLVED_VER"
                                                else
                                                    echo "⚠️ No se pudo resolver versión en Nexus; se usará lo declarado en package.json"
                                                fi

                                                echo "📦 Instalando dependencias app desde Nexus"
                                                npm config set color always || true
                                                npm ci --no-audit || npm install --prefer-offline --no-audit

                        echo "🔄 Generando DTOs"
                                                npm run update:dtos || npm run generate:dtos || true

                        echo "🏗️  Build de producción"
                        npm run build
                                        '''
                                        }
                }
            }
        }

        stage('Docker Build & Push') {
            when { anyOf { branch 'develop'; branch 'desplieges'; branch 'master' } }
            steps {
                container('docker') {
                    withCredentials([usernamePassword(credentialsId: "${NEXUS_CREDS_ID}", usernameVariable: 'USER', passwordVariable: 'PASS')]) {
                        sh '''
                            set -e
                            IMAGE_TAGGED="${NEXUS_DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${CUSTOM_TAG}"

                            echo "🔐 Login en registry ${NEXUS_DOCKER_REGISTRY}"
                            echo "$PASS" | docker login --username "$USER" --password-stdin "${NEXUS_DOCKER_REGISTRY}"

                            echo "🐳 Construyendo imagen $IMAGE_TAGGED"
                            docker build -t "$IMAGE_TAGGED" .

                            echo "📤 Pushing $IMAGE_TAGGED"
                            docker push "$IMAGE_TAGGED"
                        '''
                    }
                }
            }
        }

        stage('Deploy to K8s') {
            when { anyOf { branch 'develop'; branch 'desplieges'; branch 'master' } }
            steps {
                container('docker') {
                    withCredentials([file(credentialsId: "${RANCHER_CREDS_ID}", variable: 'KUBECONFIG')]) {
                        sh '''
                            set -e
                            export KUBECONFIG="${KUBECONFIG}"
                            IMAGE_TAGGED="${NEXUS_DOCKER_REGISTRY}/${DOCKER_IMAGE_NAME}:${CUSTOM_TAG}"

                            echo "🚀 Actualizando deployment ${K8S_DEPLOYMENT} (${K8S_CONTAINER}) en ns ${K8S_NAMESPACE}"
                            kubectl set image deployment/${K8S_DEPLOYMENT} ${K8S_CONTAINER}=${IMAGE_TAGGED} -n ${K8S_NAMESPACE}
                            kubectl rollout status deployment/${K8S_DEPLOYMENT} -n ${K8S_NAMESPACE}
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            cleanWs()
            echo "🏁 Proceso terminado: ${env.CUSTOM_TAG}"
        }
    }
}
