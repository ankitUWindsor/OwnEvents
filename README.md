# OwnEvents

## Description
Own Events is an application for managing/scheduling activities wherein people can discover and take part in diverse form of activities (workshops, festivals, conferences, concerts, sports, games, conventions etc) conducted by different occasion planners. It can be helpful to collect information about the events around the country in no time, this application will be simple, and meaningful. This project was developed to meet the demands in modern times. Through this project an attempt was made to make everything work easy and quick.

**Organizers** can plan new and different events for audience and **participants** can book their seats for those particular events. Organizers can add the location of their event which uses google maps to set and 3D-Models of their activities with images and event category. There are email reminders for the event timings.

## Getting Started
Show all the technologies and packages used and how to run the whole project locally step by step.
### Technologies and Frameworks Used
* Angular Framework
* NodeJS
* ExpressJS
* MongoDB
* Google APIs
* Microsoft Azure App Services and Storage Account

### Prerequisites
**Node:** 14.17.0 or higher

**Angular CLI:** 11.2 or higher

### Installation and How to Run
1. Clone the repository to your local System using following command
```
git clone https://github.com/ankitUWindsor/OwnEvents.git
```

2. Install node modules for both **WebApp** and **Api** folders using following commands.
```
npm install
```
Run the above command in both the folders of **WebApp** and **Api**

3. To run the **Api app**, you need to setup a **.env** file in Api folder which should contain all the secrets/keys.
```
DB_CONNECT=<<MONGODB_ACCOUNT_CREDENTIALS>>
TOKEN_SECRET=<<TOKEN_SECRET_FOR_APIS>>
TOKEN_SECRET_RESET_PASSWORD=<<TOKEN_SECRET_FOR_RESET_PASSWORD>>
STORAGE_NAME=<<AZURE_PUBLIC_STORAGE_ACCOUNT_NAME>>
ACCESS_KEY=<<ACCESS_KEY_FOR_AZURE_ACCOUNT>>
STORAGE_CONTAINER_NAME=<<CONTAINER_NAME_TO_STORE_IMAGES_AND_MODELS>>
EMAIL_ID=<<ID_FROM_WHICH_EMAILS_WILL_BE_SENT>>
EMAIL_PASSWORD=<<PASSWORD_FOR_ABOVE_ID>>
EMAIL_SERVICE_NAME=<<SERVICE_PROVIDER_FOR_EMAIL>>
BASE_URL=<<BASE_URL_FOR_BACKEND_SERVER>>
FRONTEND_BASE_URL=<<BASE_URL_OF_WEBSITE>>

PORT=<<PORT_NUMBER_YOU_WANT_TO_RUN_THE_SERVER>>
```
After this command you need to run following command to start the server at the given above PORT number

```
npm start
```

4. To run the **WebApp** fill in the environment.ts with following fields 
```
api: '<<URL_ON_WHICH_SERVER_IS_RUNNING>>',
publicStorage: '<<PUBLIC_URL_OF_STORAGE_ACCOUNT>>'
```
WebApp is an angular app so run following command to start the app. By default it will run on http://localhost:4200
```
ng serve
```

Now that all the Apps are running you can open the project on the above link.

### File System for Angular WebApp

This is the file structure made for the the frontend App.

![alt text](https://owneventspublicstorage.blob.core.windows.net/imagecontainer/ANGULAR_FILE_SYSTEM.png)

In the above app we have created an app with `app.module.js` which serves as the parent module of the complete application. It contains route to components such as login, reset-password, forgot-password, signup and has a module which is `home.module.ts`

This home module contains all the components required for the application like ar-viewer, bookings, booking-editor, event-editor, confirmation-box, interests, main, map, profile etc out of which some of them are opened in using MatDialog.
### Contact/Support
Ankit- Ankit@uwindsor.ca

Project Link- https://github.com/ankitUWindsor/OwnEvents
