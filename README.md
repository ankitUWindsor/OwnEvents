# OwnEvents

## Table of Contents

1. [Description](#Description)
2. [Getting Started](#Getting-Started)

    * [Technologies and Frameworks Used](#Technologies-and-Frameworks-Used) 
    * [Prerequisites](#Prerequisites)
    * [Installation](#Installation)
    * [How to Run](#How-to-Run)

3. [File System for Angular WebApp](#File-System-for-Angular-WebApp)
4. [File System for NodeJS APIs](#File-System-for-NodeJS-APIs)
5. [Contact/Support](#contact)

<a id="Description"></a>

## Description
Own Events is an application for managing/scheduling activities wherein people can discover and take part in diverse form of activities (workshops, festivals, conferences, concerts, sports, games, conventions etc) conducted by different occasion planners. It can be helpful to collect information about the events around the country in no time, this application will be simple, and meaningful. This project was developed to meet the demands in modern times. Through this project an attempt was made to make everything work easy and quick.

**Organizers** can plan new and different events for audience and **participants** can book their seats for those particular events. Organizers can add the location of their event which uses google maps to set and 3D-Models of their activities with images and event category. There are email reminders for the event timings.


<a id="Getting-Started"></a>
## Getting Started
Show all the technologies and packages used and how to run the whole project locally step by step.

<a id="Technologies-and-Frameworks-Used"></a>

### Technologies and Frameworks Used
* Angular Framework
* NodeJS
* ExpressJS
* MongoDB
* Google APIs
* Microsoft Azure App Services and Storage Account
* XML (Extensible Markup Language) for layout designs

<a id="Prerequisites"></a>

### Prerequisites
**Node:** 14.17.0 or higher

**Angular CLI:** 11.2 or higher

<a id="Installation"></a>

### Installation
1. Clone the repository to your local System using following command
```
git clone https://github.com/ankitUWindsor/OwnEvents.git
```

2. Install node modules for both **WebApp** and **Api** folders using following commands.
```
npm install
```
Run the above command in both the folders of **WebApp** and **Api**


<a id="How-to-Run"></a>

### How to Run

1. To run the **Api app**, you need to setup a **.env** file in Api folder which should contain all the secrets/keys.
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

2. To run the **WebApp** fill in the environment.ts with following fields 
```
api: '<<URL_ON_WHICH_SERVER_IS_RUNNING>>',
publicStorage: '<<PUBLIC_URL_OF_STORAGE_ACCOUNT>>'
```
WebApp is an angular app so run following command to start the app. By default it will run on http://localhost:4200
```
ng serve
```

Now that all the Apps are running you can open the project on the above link.


<a id="File-System-for-Angular-WebApp"></a>

### File System for Angular WebApp

This is the file structure made for the the frontend App.

![alt text](https://owneventspublicstorage.blob.core.windows.net/imagecontainer/ANGULAR_FILE_SYSTEM.png)

In the above app we have created an app with `app.module.js` which serves as the parent module of the complete application. It contains route to components such as login, reset-password, forgot-password, signup and has a module which is `home.module.ts`

This home module contains all the components required for the application like ar-viewer, bookings, booking-editor, event-editor, confirmation-box, interests, main, map, profile etc out of which some of them are opened in using MatDialog.

Other than this, there are multiple services i.e- `authentication.service.ts`,`booking.service.ts` and `event.service.ts` which interact with the API's from the server using `http.service.ts` which contains all the generic methods such as **POST**, **GET**, **PUT**, **DELETE**. 

There is `global-emitter.service.ts` service for emitting eventTasks such as **EventCreated** and **BookingCreated**  
```
emitter: Subject<EmitterTask>;
catcher: any;

  constructor() {
    this.emitter = new Subject();
    this.catcher = this.emitter.asObservable();
  }

Emit(value: EmitterTask): void {
    this.emitter.next(value);
}
```

<a id="File-System-for-NodeJS-APIs"></a>

### File System for NodeJS APIs

This is the file structure made for the the Backend app using nodeJS, ExpressJS and MongoDB.

![alt text](https://owneventspublicstorage.blob.core.windows.net/imagecontainer/APIS_FILE_SYSTEM(1).png)

In the above file system the main file that is to be run is `index.js` which contains all the API routes and base urls.

In **Routes** folder, all the controllers are made such as `auth.js`, `bookingController.js`, `imageController.js` etc which are called in index.js file to be runned. Other than that there are 2 **services** i.e- `mailerService.js` and `scheduleService.js` which contains the functions according to their names.

In case of **Model**, there are three schema's which are ``booking.js``, `event` and `user` for mongoDB.

<a id="contact"></a>

### Contact/Support

**Ankit:** Ankit@uwindsor.ca

**Mehul Kohli:** kohli8@uwindsor.ca

**Mohammed Muzammil Kamal:** kamal21@uwindsor.ca

**Ramkumar Lokanandi:** lokanan@uwindsor.ca

**Satwinder Singh Pal:** pal8@uwindsor.ca

**Rabeya Sultana:** sultanar@uwindsor.ca

**Rushik Santoki:** santokir@uwindsor.ca

**Neha Shujauddin:** shujaud@uwindsor.ca

**Project Link:** https://github.com/ankitUWindsor/OwnEvents
