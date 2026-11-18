# The Dog House

Dog breed encyclopedia that combines [The Dog API](https://www.thedogapi.com/) with breeds stored in a local database. Bootcamp project, 2021.

## Features

- Browse breeds from The Dog API, from the local database, or both, with pagination
- Search by name
- Filter by temperament
- Sort alphabetically (ascending or descending) and by weight
- Breed detail
- Add your own breed through a validated form

## Stack

| Layer    | Technology                             |
| -------- | -------------------------------------- |
| Client   | React 17, Redux, React Router          |
| API      | Node.js, Express, Sequelize            |
| Database | PostgreSQL                             |
| Tests    | Jest, Supertest, React Testing Library |

## Getting started

Requirements: Node.js 16, a PostgreSQL database named `dogs` and a free [Dog API key](https://thedogapi.com/signup).

```bash
cd api
cp .env.example .env
npm install
npm start
```

```bash
cd client
cp .env.example .env
npm install
npm start
```

The API listens on `http://localhost:3001` and the client on `http://localhost:3000`. Set `API_KEY` and the database credentials in `api/.env`.

## Scripts

| Where    | Command         | What it does          |
| -------- | --------------- | --------------------- |
| `api`    | `npm test`      | Runs the API tests    |
| `api`    | `npm run lint`  | Lints the API         |
| `client` | `npm test`      | Runs the client tests |
| `client` | `npm run build` | Builds the client     |

## API

| Method | Path           | Description                                      |
| ------ | -------------- | ------------------------------------------------ |
| GET    | `/dogs`        | Breeds from The Dog API, or `?name=` to search   |
| GET    | `/dogs/:id`    | Detail of a breed                                |
| GET    | `/dogsDB`      | Breeds stored in the local database              |
| GET    | `/temperament` | Temperaments, loaded from The Dog API the first time |
| POST   | `/dog`         | Stores a new breed                               |
