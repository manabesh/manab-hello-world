def v_bitBucketUrl = 'https://ManabeshRay@gitserver.fairisaac.com:8443/scm/ompto/omdm.git'
def v_bitbucketBranchName = 'feature/OMM5-181-create-and-delete-ruleset'
def v_bitBucketCredentials = 'BitBucket'
def v_pomFilePath = 'com.fico.om.dm/pom.xml'
def v_dmpInstanceUrl = 'http://localhost:8090/smw-5.0.0'

pipeline {

  agent any

  tools {
    maven 'Maven352'
  }

  stages {
    stage('BDD Tests XML BOM - Design') {
      when {
        expression {
          return true
        }
      }
      steps {
        echo "Removing all integration test report files"
        bat "IF exist com.fico.om.dm\\springBoot_SMW5.0\\src\\test\\resources\\integrationtests\\cucumberReport (del /q com.fico.om.dm\\springBoot_SMW5.0\\src\\test\\resources\\integrationtests\\cucumberReport\\*) ELSE (mkdir com.fico.om.dm\\springBoot_SMW5.0\\src\\test\\resources\\integrationtests\\cucumberReport)"
        echo "Start ZAP Server"
        bat "zap-cli --zap-path C:\\Users\\ManabeshRay\\DevApplications\\OWASP\\ZAP start"
        bat "mvn -f ${v_pomFilePath} post-integration-test -Dmaven.test.skip=false -DskipTests=false -Dskip.surefire.tests=true -Dskip.zap=true -Dskip.integration.tests=false -DenvType=onprem -DdmpInstanceRootUrl=${v_dmpInstanceUrl} -DjsonReportPath=cucumberReport/dmCucumberReportXmlBOMDesign.json -DbomType.name=XML -DhtmlReportPath=cucumberReport/xmlbom/dmCucumberReportXmlBOMDesign.html -Dstage=XML_BOM"
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: "${v_bddReportDir}\\xmlbom", reportFiles: 'dmCucumberReportXmlBOMDesign.html', reportName: 'BDD Report XML BOM Design', reportTitles:'BDD Report XML BOM Design'])
        bat "IF exist com.fico.om.dm\\springBoot_SMW5.0\\src\\test\\resources\\integrationtests\\zapReport (del /q com.fico.om.dm\\springBoot_SMW5.0\\src\\test\\resources\\integrationtests\\zapReport\\*) ELSE (mkdir com.fico.om.dm\\springBoot_SMW5.0\\src\\test\\resources\\integrationtests\\zapReport)"
        bat "zap-cli --port 9999 report -o com.fico.om.dm\\springBoot_SMW5.0\\src\\test\\resources\\integrationtests\\zapReport\\omDmSmwZapReport.html -f html"
        publishHTML([allowMissing: false, alwaysLinkToLastBuild: true, keepAll: true, reportDir: 'zapReport', reportFiles: 'omDmSmwZapReport.html', reportName: 'Dynamic Scan Reports', reportTitles:'Dynamic Scan Reports'])
      }
    }

  }
}
