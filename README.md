# CareEco-Technologies
A Near Real-Time/Configurable Data Synchronization System You have a process that is maintaining all its data in a database table on the client machine.

# Tech Stack
1. Node.Js
2. Express.Js
3. MongoDB

# To start the server
```
    npm run dev
```
# To start the MongoDB Server
```
    mongodb://127.0.0.1:27017/CareEco-Technology
```

# API Endpoints
<br>

# Test in Postman
<br>

# Add Data
<br>

1. Insert into Local DB

```
    Method: POST
    URL: http://localhost:5000/api/local

    Body (JSON):
    {
        "name" : "String",
        "value" : "String"
    }
```
<br>

2. Insert into Cloud DB

```
    Method: POST
    URL: http://localhost:5000/api/cloud

    Body (JSON):
     {
        "name" : "String",
        "value" : "String"
    }
```
<br>

# Fetch Data
<br>
1. Fetch Data from Local DB

```
    Method: GET
    URL: http://localhost:5000/api/local
```

2. Fetch Data from Cloud DB

```
    Method: GET
    URL: http://localhost:5000/api/cloud
```
<br>

# Sync Data

```
    Method: GET
    URL: http://localhost:5000/api/sync/both
   
    Method: GET
    URL: http://localhost:5000/api/sync/local-to-cloud

    Method: GET
    URL: http://localhost:5000/api/sync/cloud-to-local
    
    Method: GET
    URL: http://localhost:5000/api/sync/overwrite-local
   
```