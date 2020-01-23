#!/usr/bin/env node

/*
 * Original source is found here.
 *   https://developer.apple.com/documentation/snapshots/generating_a_url_and_signature_to_create_a_maps_web_snapshot
 *
*/

const { readFileSync } = require("fs");
const { sign } = require("jwa")("ES256");  // https://www.npmjs.com/package/jwa
//const opn = require('better-opn'); // https://www.npmjs.com/package/better-opn

/* Read your private key from the file system. (Never add your private key
 * in code or in source control. Always keep it secure.)
 */
 const privateKey = readFileSync("AuthKey_QNBKAKXD7Z.p8");
 // Replace the team ID and key ID values with your actual values.
 const teamId = "LWRLKKP8WA";
 const keyId = "QNBKAKXD7Z";

// Creates the signature string and returns the full Snapshot request URL including the signature.
function signIt(params) {
    const mapkitServer = `https://snapshot.apple-mapkit.com`
    const snapshotPath = `/api/v1/snapshot?${params}`;
    var completePath = `${snapshotPath}&teamId=${teamId}&keyId=${keyId}`;

    const signature = sign(completePath, privateKey);

    // Append the signature to the end of the request URL, and return.
    url = `${mapkitServer}${completePath}&signature=${signature}`

    // Optionally open the result in the default browser using `opn`
    // opn(url);
    //console.log(url);

    return url;
}

console.log(signIt(process.argv[2] + "&" + process.argv[3]))



