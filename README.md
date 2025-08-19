# CareEco-Technologies
A Near Real-Time/Configurable Data Synchronization System You have a process that is maintaining all its data in a database table on the client machine.

# Introduction

This project is a Near Real-Time & Configurable Data Synchronization System that ensures data consistency between a Local (Client) database and a Cloud (Server) database.

Instead of performing a heavy full data dump, the system intelligently syncs only the modified records based on timestamps, ensuring scalability and efficiency even as the dataset grows.

# Approach for Data Synchronization System

1. Local & Cloud Simulation

I created two separate MongoDB collections (Local and Cloud) to simulate a multi-tenant environment.

This allows syncing client-side and server-side data without setting up an actual distributed system.

2. Change Detection

Each document contains updatedAt and lastSyncedAt fields.

During sync, the system checks updatedAt > lastSyncedAt to identify only new or modified data.

This avoids unnecessary data transfers and improves performance.

3. Two-Way Synchronization

The system supports both directions:

Local → Cloud: New or updated client-side documents are pushed to the cloud.

Cloud → Local: New or updated server-side documents are synced back to local machines.

Conflict resolution is handled using a “latest update wins” strategy.

4. Configurable Sync

Synchronization can be triggered in two ways:

Manual Trigger: Using API endpoints for on-demand sync.

Automated Scheduling (Cron Jobs): For example, * * * * * to sync every 1 minute.

This provides a near real-time sync while remaining fully configurable.

5. Conflict Handling

If the same document is modified on both local and cloud, the system checks updatedAt to determine the latest version.

Both databases are then updated to maintain data consistency.


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

# Testing

Test on Postman and check the data synchronization result on local MongoDB server

# API Endpoints
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