
## Prerequisites

```sh
node --version
#> v12.18.3

nvm ls-remote

nvm install 14.16.1
```

## Installation

Install package dependencies:

```sh
npm install
```

## Config

```sh
# .env file:
ALPHAVANTAGE_API_KEY="______"
```

## Usage

Run a local web server:

```sh
DEBUG=my_app:* npm start
```
