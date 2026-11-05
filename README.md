# AI Dev Classwork

## Student grade reporting

This example has two separate projects:

- `student-grade-reporting/backend` is the Express JSON API.
- `student-grade-reporting/frontend` is a plain HTML and JavaScript page that calls the API.

Run each project in its own terminal:

```sh
cd student-grade-reporting/backend
npm install
npm start
```

```sh
cd student-grade-reporting/frontend
npm start
```

Open [http://localhost:5173](http://localhost:5173). The frontend sends requests to the API at [http://localhost:3000](http://localhost:3000), for example `GET http://localhost:3000/api/reports`. The API allows requests from the frontend's local development address.