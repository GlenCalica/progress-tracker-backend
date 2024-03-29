# Progress Tracker API

This is the back-end for [Progress Tracker](https://jovial-jalebi-d5c41c.netlify.app/). This repo only contains the back-end because I deployed the front-end and back-end on different sites. You can check out the front-end [here](https://github.com/GlenCalica/progress-tracker-frontend).

## Endpoints

### Users

| Endpoint                        |
| ------------------------------- |
| **POST** /api/users             |
| **POST** /api/users/login       |
| **GET** /api/users/me           |
| **PUT** /api/users/{user-id}    |
| **DELETE** /api/users/{user-id} |

### Metrics

| Endpoint                            |
| ----------------------------------- |
| **POST** /api/metrics               |
| **GET** /api/metrics                |
| **PUT** /api/metrics/{metric-id}    |
| **DELETE** /api/metrics/{metric-id} |

### Entries

| Endpoint                           |
| ---------------------------------- |
| **POST** /api/entries              |
| **GET** /api/entries               |
| **PUT** /api/entries/{entry-id}    |
| **DELETE** /api/entries/{entry-id} |
