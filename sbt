/srv/jre1.8.0_65/bin/java -XX:MaxPermSize=128m -XX:+UseConcMarkSweepGC -XX:+CMSPermGenSweepingEnabled -XX:+CMSClassUnloadingEnabled -Dsbt.boot.directory="./.sbt-boot" -Dsbt.global.home="./.sbt" -Dsbt.home="./.sbt" -Dsbt.ivy.home=%IVY_HOME%\.ivy2\ -Dsbt.global.staging="./.sbt-staging" -Dmetlx.configurationFile="./config/configuration.local.xml" -Dlogback.configurationFile="config/logback.xml" -Drun.mode="development" -jar sbt-launch.jar $1
