# Progress Tracker API

API for Progress Tracker.

Made using

-  Node.js
-  Express
-  MongoDB

## Endpoints

### Users

| Endpoint                        | Description |
| ------------------------------- | ----------- |
| **POST** /api/users             |             |
| **GET** /api/users/{user-id}    |             |
| **PUT** /api/users/{user-id}    |             |
| **DELETE** /api/users/{user-id} |             |

### Metrics

| Endpoint                                                 | Description |
| -------------------------------------------------------- | ----------- |
| **POST** /api/users/{user-id}/metrics?name={metric-name} |             |
| **GET** /api/users/{user-id}/metrics                     |             |
| **GET** /api/users/{user-id}/metrics/{metric-name}       |             |
| **PUT** /api/users/{user-id}/metrics/{metric-name}       |             |
| **DELETE** /api/users/{user-id}/metrics/{metric-name}    |             |

### Entries

| Endpoint                                                                      | Description |
| ----------------------------------------------------------------------------- | ----------- |
| **POST** /api/users/{user-id}/metrics?name={metric-name}/entries/{entry-date} |             |
| **GET** /api/users/{user-id}/metrics/{metric-name}/entries                    |             |
| **GET** /api/users/{user-id}/metrics/{metric-name}/entries/{entry-date}       |             |
| **PUT** /api/users/{user-id}/metrics/{metric-name}/entries/{entry-date}       |             |
| **DELETE** /api/users/{user-id}/metrics/{metric-name}/entries/{entry-date}    |             |
