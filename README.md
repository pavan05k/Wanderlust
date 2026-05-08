# Wanderlust

Wanderlust is a full-stack travel listing web application built with Node.js, Express, MongoDB, and EJS.
Users can create accounts, add listings with images, edit/delete their own listings, and post reviews.

## Features

- User authentication (signup, login, logout) with Passport
- Create, read, update, and delete listings
- Image upload support via Cloudinary + Multer
- Review system with rating and comments
- Mapbox geocoding for listing location coordinates
- Flash messages and session management with MongoDB-backed session store

## Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Templating:** EJS, ejs-mate
- **Auth:** Passport, passport-local, passport-local-mongoose
- **Uploads:** Multer, Cloudinary
- **Validation:** Joi

## Prerequisites

- Node.js `22.15.0` (as specified in `package.json`)
- MongoDB Atlas connection string
- Cloudinary account
- Mapbox token

## Installation

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the project root with:

```env
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_session_secret
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_token
NODE_ENV=development
```

## Run the Application

```bash
node app.js
```

The app runs on:

- `http://localhost:8081`

## Project Structure

- `app.js` – application entry point
- `routes/` – route definitions (listings, reviews, users)
- `controllers/` – controller logic
- `models/` – Mongoose models
- `views/` – EJS templates
- `public/` – static assets
- `middleware.js` – auth and validation middleware
- `cloudConfig.js` – Cloudinary storage configuration

## Available Scripts

- `npm test` – currently a placeholder script and not an actual test suite

## Notes

- In production, set secure and strong environment variable values.
- Ensure your Cloudinary and Mapbox credentials are valid before creating listings.
