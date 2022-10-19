# Github Action Chrome Webstore Publish

A Github Action to publish a browser-extension to the Chrome WebStore

## Setup

You will need a Google API `clientId`, `clientSecret` and `refreshToken`. Read [the guide](https://github.com/fregante/chrome-webstore-upload/blob/main/How%20to%20generate%20Google%20API%20keys.md).

## Inputs
- `extensionId`: the ID of the browser-extension
- `clientId`: the Google Client ID
- `clientSecret`: the Google Client Secret
- `refreshToken`: the Google Refresh Token
- `inputFile`: the extension as zip file
- `doPublish`: (optional) Define if the extension should be published after upload (defaults to false)
- `target`: (optional) Publish target (either "default" or "trustedUsers")


## Example usage
```yaml
- uses: levigo/github-action-chrome-webstore-publish@v1.0
  id: publish
  with:
    extensionId: "ndblkfbdgggpmbgflaoajgpmhmlendka"
    clientId: "abc.apps.googleusercontent.com"
    clientSecret: "MYSECRET"
    refreshToken: "1//09ABCDEF"
    inputFile: "./archive.zip"
    doPublish: true
    target: "default"
```

