import LocalData from "./models/localModel.js";
import CloudData from "./models/cloudModel.js";

export const syncData = async (mode = "both") => {
  console.log(`Sync started in mode: ${mode}`);

  let summary = {
    mode,
    localToCloud: 0,
    cloudToLocal: 0,
    overwriteLocal: 0,
    syncedLocalDocs: [],   
    syncedCloudDocs: [],   
    overwrittenLocalDocs: [] 
  };


  const localChanges = await LocalData.find({
    $expr: { $gt: ["$updatedAt", "$lastSyncedAt"] },
  });


  const cloudChanges = await CloudData.find({
    $expr: { $gt: ["$updatedAt", "$lastSyncedAt"] },
  });


  if (mode === "both" || mode === "local-to-cloud") {
    for (let doc of localChanges) {
      const existing = await CloudData.findById(doc._id);
      let syncedDoc;

      if (existing) {
 
        if (doc.updatedAt > existing.updatedAt) {
          syncedDoc = await CloudData.findByIdAndUpdate(
            doc._id,
            { ...doc.toObject(), lastSyncedAt: new Date() },
            { new: true }
          );
        }
      } else {
 
        syncedDoc = await CloudData.create({
          ...doc.toObject(),
          lastSyncedAt: new Date(),
        });
      }

    
      await LocalData.findByIdAndUpdate(doc._id, { lastSyncedAt: new Date() });

      if (syncedDoc) {
        summary.syncedLocalDocs.push(syncedDoc);
        summary.localToCloud++;
      }
    }
  }


  if (mode === "both" || mode === "cloud-to-local") {
    for (let doc of cloudChanges) {
      const existing = await LocalData.findById(doc._id);
      let syncedDoc;

      if (existing) {
      
        if (doc.updatedAt > existing.updatedAt) {
          syncedDoc = await LocalData.findByIdAndUpdate(
            doc._id,
            { ...doc.toObject(), lastSyncedAt: new Date() },
            { new: true }
          );
        }
      } else {
   
        syncedDoc = await LocalData.create({
          ...doc.toObject(),
          lastSyncedAt: new Date(),
        });
      }

  
      await CloudData.findByIdAndUpdate(doc._id, { lastSyncedAt: new Date() });

      if (syncedDoc) {
        summary.syncedCloudDocs.push(syncedDoc);
        summary.cloudToLocal++;
      }
    }
  }

  if (mode === "overwrite-local") {
    const allCloud = await CloudData.find();
    await LocalData.deleteMany({});

    const inserted = await LocalData.insertMany(
      allCloud.map((doc) => ({
        ...doc.toObject(),
        lastSyncedAt: new Date(),
      }))
    );

    summary.overwriteLocal = inserted.length;
    summary.overwrittenLocalDocs = inserted;
  }

  console.log("✅ Sync complete!");
  console.log(summary);
  return summary;
};
