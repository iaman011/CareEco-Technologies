# CareEco-Technologies
A Near Real-Time/Configurable Data Synchronization System You have a process that is maintaining all its data in a database table on the client machine.

# Introduction

This project is a Near Real-Time & Configurable Data Synchronization System that ensures data consistency between a Local (Client) database and a Cloud (Server) database.

Instead of performing a heavy full data dump, the system intelligently syncs only the modified records based on timestamps, ensuring scalability and efficiency even as the dataset grows.

# updatedAt and lastSyncedAt Features

To make the synchronization system efficient and reliable, each document in both Local and Cloud databases includes two key timestamps:

1. updatedAt

This field stores the last time the document was modified (either locally or on the cloud).

Whenever a user updates or creates a record, the updatedAt field is automatically refreshed to the current time.

It helps the system detect which documents have changed since the last synchronization.

2. lastSyncedAt

This field tracks the last time the document was successfully synchronized between local and cloud databases.

During the sync process, once a document is copied/updated on both sides, its lastSyncedAt value is updated to the sync time.

This prevents re-syncing the same unchanged documents repeatedly, making the process lightweight and faster.

# Key highlights of this project:

1. Bi-Directional Synchronization

Local ➝ Cloud: Updates from client machines are pushed to the cloud.

Cloud ➝ Local: Cloud-side changes are pulled back to local machines.

2. Incremental Updates

Only changed or newly created records are synchronized.

Uses fields like updatedAt and lastSyncedAt for tracking changes.

3. Conflict Resolution

When the same document is modified both locally and on the cloud, the system smartly resolves conflicts (e.g., latest update wins).

4. Configurable Scheduling with Cron Jobs

Sync can be triggered manually or scheduled using cron-like syntax.
.

5. Flexible Sync Modes

Local ➝ Cloud only

Cloud ➝ Local only

Full two-way synchronization


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

Scalability Ready

Designed to support multiple clients syncing with a central cloud database.

Reduces load on the system by avoiding repeated full exports.