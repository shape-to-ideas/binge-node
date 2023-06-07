<div align="center">

</div>

# Main Application

This repository holds the main NodeAPI Service. It compromises of the following tech stack

-   TypeScript
-   Node
-   Mongoose

## Installation:

1. make sure to have `pnpm` installed globally (`npm i -g pnpm`)
2. run `pnpm install`

To update dependencies:

-   run `pnpm up`

To launch the dev environment, use docker - `docker compose build` and `docker compose up`.
Make sure to have an up to date `.env` file in the root of your repository.

Note: `.env` files must be gitignored.

## Commands

### Linting commands:

`pnpm run code:lint` - lint with auto fix using ESLint.
`pnpm run code:check` - lint with only check using ESLint.
`pnpm run code:format` - format all supported files using prettier.

### Deployment commands:

`pnpm run build`
`pnpm run start`

### Docker Compose Commands:

`docker compose up --build` - bring up the service and build the images.
`docker compose up --detach` - runs docker in the background and returns the terminal.
