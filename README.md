# K-Rite-Social-Task-v1

This project is a simple social app ( work in progress ).

## Features

- Landing Page
- User Management ( Register, Login, Logout )
- Cloud Storage ( Profile Pictures, Post Covers )
- JWT & Local Storage User Sessions
- Post New Feed ( Home Page )
- Comment on Posts

### Upcoming Features

- Friendship Management ( Add New Friend, Remove Friend )
- Profile Dashboard
- Chat ( Chat with friends in Realtime )
- Notifications ( Chat Message, New Friend Request )

## Tech Stack

**Client:** React, MaterialUI

**Server:** Node, Express

**Cloud Storage:** Cloudinary

**Database:** MongoDB

## Run Locally

Clone the project


Install dependencies server

```bash
  npm install 
```

Install dependencies client

```bash
  cd frontend
  npm install
```

Add `.env` file in the `root` with required environment variables.

**Start the server**

```bash
  npm run server
```

**Start the client**

```bash
  npm run client
```

## Environment Variables


`PORT` `NODE_ENV` `MONGO_URI` `JWT_SECRET` `SALT_ROUNDS`

`CLOUD_NAME` `API_KEY` `API_SECRET`
