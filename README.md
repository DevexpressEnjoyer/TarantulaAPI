__TarantulaAPI__

TarantulaAPI to proste REST API do zarządzania kolekcją tarantuli. Zostało stworzone w ASP.NET Core z użyciem Entity Framework Core i SQLite jako bazy danych.

__Technologie__

ASP.NET Core 8

Entity Framework Core

SQLite

Swagger (Swashbuckle)

__Endpointy API__

GET

/api/tarantulas

Pobiera wszystkie tarantule

GET

/api/tarantulas/{id}

Pobiera tarantulę po ID

POST

/api/tarantulas

Dodaje nową tarantulę

PUT

/api/tarantulas/{id}

Aktualizuje dane tarantuli

DELETE

/api/tarantulas/{id}

Usuwa tarantulę

__Przykładowy request i response__

- Dodanie nowej tarantuli (POST /api/tarantulas)

Request:

{
    "name": "Zosia",
    "species": "Grammostola pulchra",
    "isVenomous": false
}

Response:

{
    "id": 1,
    "name": "Zosia",
    "species": "Grammostola pulchra",
    "isVenomous": false
}
