# MERN Application (Mongo, Express, React, Node)

## Technology Overview:

### React
JS library for building UI's

### Node
Node is a runtime environment that incorporates server-side tools in JS

### Express
Express is a popular Node Web framework.  
- Writes handlers for requests with different HTTP verbs at different URL paths (routes).

### Axios
JS library that streamlines error handling in HTTP requests.

### Mongo ( Cluster in Cloud thanks to AWS, max 1 GB ):
MongoDB is a schema-less NoSQL document database.
- Means you can store JSON documents in it, and the structure of these documents can vary as it is not enforced like SQL databases. 
- This is one of the advantages of using NoSQL as it speeds up application development and reduces the complexity of deployments.

### Mongoose for MongoDB:
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It manages relationships between data, provides schema validation, and is used to translate between objects in code and the representation of those objects in MongoDB.

### Victory
Popular 3rd party visualization JS library that has simple API
https://formidable.com/open-source/victory/
-- Attempted to use CanvasJS 4/7 though had difficulty with import/export statements.  Further research showed compatibility issues addmitted by vendor, so I ditched it.




### Design Goals
- Implement raw data schema for DB ## DONE 4/5 
- Establish HTTP cycle between backend and frontend ## DONE 4/5
- Create polling mechanism for updating state ## DONE 4/7 
- "Hello World" concurrently between front and backend. ## DONE 4/7
- Implement A form Schema and CRUD ## In progress
- Implement A graph w/ dummy data ## DONE 4/10
- Implement data from forms into graph ## DONE 4/10
- Implement animations for graph
- Implement theme for graph ## DONE 4/10
- Implement 2nd graph of same data
- Create styles of forms ## started 4/10 ** CURRENT GOAL **
-- Proposed Flow: 
     High-Level: Forms Container
     Forms container initially contains: Form styles rendered, button to create new form
     "onClick" of formStyle -> Render form in container
     "onClick" of createForm -> Render formCreation in container

- Implement metric selector next to graphs.
- Implement axis change next to graph




### Author: Jerry Evarts
