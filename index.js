import fs from "fs"
import core from "@actions/core"
import chromeWebstoreUpload from "chrome-webstore-upload";

let extensionId, clientId, clientSecret, refreshToken, inputFile, doPublish, target;

(async () => {
    try {
        extensionId = core.getInput("extensionId");
        clientId = core.getInput("clientId");
        clientSecret = core.getInput("clientSecret");
        refreshToken = core.getInput("refreshToken");
        inputFile = core.getInput("inputFile");
        doPublish = core.getInput("doPublish") || false;
        target = core.getInput("target") || "default";

        core.info("Preparing to upload " + (doPublish ? "and publish": "") +
            " the following extension: " + extensionId);

        const store = chromeWebstoreUpload({
            extensionId,
            clientId,
            clientSecret,
            refreshToken,
        });
        const token = await store.fetchToken();

        core.info("Starting upload");
        const uploadResource = await uploadExtension(store, token, inputFile);
        if (uploadResource["uploadState"] === "FAILURE") {
            core.setFailed("Upload failed: " + JSON.stringify(uploadResource["itemError"]));
            return;
        }
        core.info("Upload done, got the following result: " + uploadResource["uploadState"]);

        if (doPublish) {
            core.info("Starting publish");
            const publishResource = await publishExtension(store, token, target)
            core.info("Publish done, got the following result: " + publishResource["statusDetail"]);
        }
    } catch (error) {
        core.setFailed(error.message);
    }
})();

/**
 * Upload an extension to the Store
 *
 * @param store
 * @param token
 * @param inputFile
 * @returns Response is a Resource Representation https://developer.chrome.com/webstore/webstore_api/items#resource
 */
async function uploadExtension(store, token, inputFile) {
    return store.uploadExisting(fs.createReadStream(inputFile), token);
}


/**
 * Publish an extension
 *
 * @param store
 * @param token
 * @param target
 * @returns Response is a Resource Representation https://developer.chrome.com/docs/webstore/webstore_api/items/publish/#json-1
 */
async function publishExtension(store, token, target) {
    return store.publish(target, token);
}


