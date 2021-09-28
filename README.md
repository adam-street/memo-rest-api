- Install dependencies:
  - npm install
- Install nodemon globally
  - npm install -g nodemon
- Run:
  - npm run dev
- Create your user account:
  - In postman:
    - Use 'POST' verb
    - URL: localhost:3000/api/user/create
    - Body:
      - raw
      - JSON
      - '{
        "username": "user",
        "password": "password"
        }'
    - Send
- Login:
  - From Postman
  - Use 'POST' verb
  - URL: localhost:3000/api/user/login
  - Body:
    - raw
    - JSON
    - '{
      "username": "user",
      "password": "password"
      }'
  - Send: copy token for later
- Get all memos:
  - Postman
    - 'GET' verb
    - URL: localhost:3000/api/memo
    - Authorization:
      - Type: Bearer Token
      - Token: <copied from login response>
    - Send
- Create a memo:
  - Postman
    - Verb: 'POST'
    - URL: localhost:3000/api/memo
    - Authorization:
      - Type: Bearer Token
      - Token: <copied from login response>
    - Body:
      - raw
      - JSON
      - '{
        "content": "new memo",
        "tags": ["tag1", "tag2"]
        }'
    - Send
- Get all memos:
    - Postman
        - 'GET' verb
        - URL: localhost:3000/api/memo
        - Authorization:
            - Type: Bearer Token
            - Token: <copied from login response>
        - Send