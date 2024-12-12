# Star Wars API GraphQL Service

This project provides a GraphQL API to interact with resources from the Star Wars universe, including films, species, vehicles, starships, and planets. The API integrates with the SWAPI (Star Wars API) and includes features like caching, pagination, and filtering.

## Features

- **GraphQL Endpoints**:
  - Fetch all resources with pagination and filtering.
  - Fetch specific resources by ID.
- **Caching**:
  - Cached responses for 24 hours to reduce API calls to SWAPI.
- **Analyze Films**:
  - Word frequency and character mentions in film opening crawls.
- **Modular Design**:
  - Easy to extend with new endpoints and services.

## Prerequisites

Before running the application, ensure you have the following installed:

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jakubgatarski/GraphQL-NestJS-star-wars.git
   cd GraphQL-NestJS-star-wars
   ```

2. Build and run the application with Docker Compose:
   ```bash
   docker-compose up --build
   ```

   This will start:
   - **Node.js Application**: Running on `http://localhost:3000`.
   - **Redis**: Running for caching on `localhost:6379`.

3. To stop the application:
   ```bash
   docker-compose down
   ```

## API Endpoints

### GraphQL Playground

Access the GraphQL Playground at:
```
http://localhost:3000/graphql
```

### Example Queries

#### Fetch all films
```graphql
query {
  films {
    title
    director
  }
}
```

#### Fetch all films with pagination and filter
```graphql
query {
  films(page: 1, filter: "hope") {
    title
    director
  }
}
```

#### Fetch a film by ID
```graphql
query {
  film(id: 1) {
    title
    openingCrawl
  }
}
```

## Development

### Running Locally Without Docker

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the application in development mode:
   ```bash
   npm run start:dev
   ```

3. Ensure a Redis instance is running locally or update the `app.consts.ts` file with the correct configuration.

### Environment Variables

The application uses the following environment variables. Update these in your `app.consts.ts` file as needed:

```app.consts.ts
SWAPI_BASE_URL=https://swapi.dev/api
REDIS_HOST=redis
REDIS_PORT=6379
CACHE_TTL=86400
```

## Testing

Run unit tests with:
```bash
npm run test
```

## File Structure

```
src/
├── app.module.ts         # Main application module
├── cache/                # Caching service
├── films/                # Films service and resolver
├── species/              # Species service and resolver
├── vehicles/             # Vehicles service and resolver
├── starships/            # Starships service and resolver
├── planets/              # Planets service and resolver
└── common/               # Base service with shared utilities
```

## Troubleshooting

- **Docker Container Fails to Start**:
  Ensure Docker and Docker Compose are installed and running.
  
- **Redis Connection Issues**:
  Check the `REDIS_HOST` and `REDIS_PORT` values in the `app.consts.ts` file.

## Contributions

Contributions are welcome! Fork the repository and create a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).

