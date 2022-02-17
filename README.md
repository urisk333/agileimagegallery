# agileimagegallery

AgileImageGallery is a responsive React application which simulates a interaction with the images on the website, and by using the application, you are able to search through images, add the new ones, and leave the comments for each one of them. Each comment can be added, edited and deleted.

# Getting started

## Run the application

1. Clone the repo:

```
git clone https://github.com/urisk333/agileimagegallery
```

## Server side

Follow the next steps to run the server side of the application:

1. Start the PostgreSQL database from your terminal.

2. Run the server side of the application:

```
cd server
npm i
```

3. Create .env file in the models folder, and add the credentials to the file, where your USER and PASSWORD are the ones related to your PostgreSQL database and DATABASE is just a name which you want to give to your database:

```
DATABASE_URL="postgresql://USER:PASSWORD@127.0.0.1:5432/DATABASE"
```

4. In your terminal, inside the models folder, run in the order `npx prisma generate` and `npx prisma migrate dev`, and afterwards delete _node_modules_ from that folder.

5. Run the server:

```
nodemon index.ts
```

## Client side

Follow the next steps to run the client side of the application:

1. Run the application:

```
cd agileimagegallery/imagegallery
npm i
npm start
```

## Notes

1. For password, becuase of validation, you need to populate the database with the password which contains 1 capital letter,

2. For adding the pictures, use Unsplash.com free photo library, where you are adding just the last part of the link (highligthed) in the input.
   Example: https://unsplash.com/photos/ **bn-D2bCvpik**

# Tech stack

- [ReactJS](https://reactjs.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [NodeJS](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- [Prisma](https://www.prisma.io/)

# Author

Ivan Car - [GitHub](https://github.com/urisk333) / [LinkedIn](https://www.linkedin.com/in/ivan-car/)
