const psn = require("psn-api");
const fs = require('fs');

function writeJsonFile(file, content) {
    let jsonData = JSON.stringify(content)
    fs.writeFileSync(file, jsonData)
}

async function start() {

    // This is the value you copied from the previous step.
    const myNpsso = "3MrAKrwv6W9AMjURdqfnJB8EnLZal4gQMjPEvqnCavRJPXPGiZZzBViUqyL7rx2C";

    // We'll exchange your NPSSO for a special access code.
    const accessCode = await psn.exchangeNpssoForCode(myNpsso);
    // 🚀 We can use the access code to get your access token and refresh token.
    const authorization = await psn.exchangeCodeForAccessToken(accessCode);

    const response = await psn.makeUniversalSearch(
        authorization,
        "PSN USERNAME GOES HERE",
        "SocialAllAccounts"
    );

    const accountId = response.domainResponses[0].results[0].socialMetadata.accountId

    // This returns a list of all the games you've earned trophies for.
    const trophyTitlesResponse = await psn.getUserTitles(
        { accessToken: authorization.accessToken },
        accountId
    );

    writeJsonFile('result.json', trophyTitlesResponse)

    console.log(trophyTitlesResponse);

}

start();
