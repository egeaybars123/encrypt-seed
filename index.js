const readline = require("readline-sync");
const fs = require("fs");
const { encryptSeed, decryptSeed } = require("./crypto");
const { readPassword } = require("./utils");

async function main() {
    console.log("\x1b[1m\x1b[36mWelcome to the Seed Phrase / Private Key Encryption Tool!\x1b[0m");
    console.log("\n\x1b[2mEncrypt your seed phrases or private keys with a password.\n" +
        "Store it more securely in the cloud or on your devices.\x1b[0m\n");

    console.log("\x1b[33m\x1b[1mIMPORTANT:\x1b[0m");
    console.log("\x1b[33m - Choose a strong password.\x1b[0m");
    console.log("\x1b[33m - Do NOT forget it. If you lose it, \x1b[31myour funds will be lost forever.\x1b[0m");
    console.log("\x1b[33m - Storing seed phrases or private keys \x1b[1mdigitally is NOT recommended.\x1b[0m");
    console.log("\x1b[33m - The safest method is often writing them down on paper.\x1b[0m\n");

    const action = readline.question("Press 'e' for encrypting or 'd' for decrypting your seed phrase: ").toLowerCase();

    if (action === "e") {
        const seed = readline.question("Enter your seed phrase: ");
        const password = await readPassword("Enter your password: ");
        const encrypted = encryptSeed(seed, password);

        const outputPath = readline.question("Enter output file name to save encrypted data: ");
        fs.writeFileSync(outputPath, JSON.stringify(encrypted, null, 2));
        console.log(`Encrypted data saved to ${outputPath}`);
    } else if (action === "d") {
        const filePath = readline.question("Enter the path to the encrypted file: ");
        const encryptedData = JSON.parse(fs.readFileSync(filePath, "utf8"));

        const password = await readPassword("Enter your password: ");
        try {
            const decrypted = decryptSeed(encryptedData, password);
            console.log("Decrypted seed phrase:", decrypted);
        } catch (err) {
            console.error("Failed to decrypt. Check your password and input data.");
        }
    } else {
        console.log("Invalid option. Please use (e)ncrypt or (d)ecrypt.");
    }
}

main()
