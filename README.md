# DrawTheYear - Backend

## Setup environment

`.env`

```properties
# Application
PORT=<number>

PLATFORM_WEB_LOGIN_CALLBACK=<string>
PLATFORM_MOBILE_LOGIN_CALLBACK=<string>



# Tasks
CRON_ENABLED=<boolean>
CRON_RESET_USERNAME_CHANGE_COUNT=<cron>



# Database
DATABASE_TYPE=<string>
DATABASE_URL=<string>
DATABASE_PORT=<number>
DATABASE_NAME=<string>
DATABASE_USER=<string>
DATABASE_PASSWORD=<string>



# Authentication
AUTH_GOOGLE_CLIENT_ID=<string>
AUTH_GOOGLE_CLIENT_SECRET=<string>

AUTH_ACCESS_TOKEN_SECRET=<string>
AUTH_ACCESS_TOKEN_EXPIRATION=<number>

AUTH_REFRESH_TOKEN_SECRET=<string>
AUTH_REFRESH_TOKEN_EXPIRATION=<number>
```
