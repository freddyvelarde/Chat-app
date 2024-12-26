# Chat App

Requirements:

1. This chat app in it's first version needs to allow users to send messages each other in `one-to-one` relation.
2. The servers needs to authenticate users
   - User: (username, password).
3. for now everyone can send messages to anyone, no needs to ask or request permissions
4. for noew there's no group messages

Design: https://cdn.dribbble.com/userupload/11772649/file/original-94db32f5ed2ee264c046116fe2273152.png?resize=1024x768&vertical=center

## `Todo:`

this proyect is not completed

- [ ] REACT: the conversations list don't update when when we send a new message to new users
- [ ] REACT: When a user delete a conversation don't update the conversation list and also the client don't ask to confirm the chat deletation
- [ ] REACT: Enhace the UI for the login and sign up

- [ ] The code is a mess, needs to be refactored.

## Run the project

To run the project you need a DB (postgres)

using docker:

```docker
version: "3.8"

services:
  db:
    image: postgres:17.2-alpine3.21
    container_name: postgres_container
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: todo_app
    ports:
      - "5432:5432"
    volumes:
      - postgres_db_data:/var/lib/postgresql/data

volumes:
  postgres_db_data:

```

And fill the `.env` file in the `./server` directory, notice that there's a `run_app` in the project, that's to run the server, the client and docker with postgres
