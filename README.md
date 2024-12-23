# Encrypt Seed CLI Tool

A simple and secure command-line interface (CLI) tool to encrypt and decrypt seed phrases or private keys using a password. This tool is written in JavaScript.

---

## Features

- **Encrypt seed phrases or private keys**: Protect your sensitive data with a user-provided password.
- **Decrypt encrypted data**: Retrieve your seed phrase or private key when needed by providing the correct password.
- **Strong encryption**: Uses AES-256-GCM for encryption and Scrypt for password-based key derivation.
---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Installation](#installation)
3. [Usage](#usage)
   - [Encrypt a Seed Phrase](#encrypt-a-seed-phrase)
   - [Decrypt a Seed Phrase](#decrypt-a-seed-phrase)
4. [How It Works](#how-it-works)
5. [Developer Notes](#developer-notes)
6. [Security Considerations](#security-considerations)
7. [Contributing](#contributing)

---

## Getting Started

This CLI tool requires Node.js (version 14 or higher) to run. If you don't have Node.js installed, download it from [Node.js](https://nodejs.org).

---

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/egeaybars123/encrypt-seed-cli.git
   cd encrypt-seed-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the code:
   ```bash
   node index.js
   ```

---

## Usage

### Encrypt a Seed Phrase

1. Run the CLI tool:
   ```bash
   node index.js
   ```

2. Select the encryption option by typing `e`.

3. Follow the prompts:
   - Enter your seed phrase or private key.
   - Provide a strong password (input is masked with `*`).
   - Specify the output file name to save the encrypted data.

4. The encrypted data will be saved to the specified file.

### Decrypt a Seed Phrase

1. Run the CLI tool:
   ```bash
   ./encrypt-seed-cli.js
   ```

2. Select the decryption option by typing `d`.

3. Follow the prompts:
   - Provide the path to the file containing the encrypted data.
   - Enter the password used during encryption.

4. If the password is correct, the tool will display your decrypted seed phrase or private key.

---

## How It Works

### Encryption Process
1. **Password Input**: The user provides a password to secure the seed phrase.
2. **Key Derivation**: The password is converted into a cryptographic key using Scrypt (Memory-hard Password-Based Key Derivation Function 2)
3. **Encryption**: The seed phrase is encrypted using AES-256-GCM, a secure and authenticated encryption algorithm.
4. **Output**: The encrypted data, salt, and other metadata are saved to a file in JSON format.

### Decryption Process
1. **Password Input**: The user provides the password used during encryption.
2. **Key Derivation**: The tool derives the cryptographic key using the same salt and Scrypt parameters.
3. **Decryption**: The seed phrase is decrypted using AES-256-GCM and the derived key.
4. **Output**: The decrypted seed phrase is displayed.

---

## Developer Notes

### Project Structure
- **`index.js`**: Main CLI script.
- **`crypto.js`**: Crypto functions for encryption & decryption.
- **`utils.js`**: Utility functions for cryptographic and CLI functions
- **Dependencies**:
  - `crypto`: Node.js built-in module for cryptographic operations.
  - `readline`: For interactive user input.

### Key Functions
- **`deriveKey(password, salt)`**: Generates a cryptographic key from the password and salt using PBKDF2.
- **`encryptSeed(seed, password)`**: Encrypts the seed phrase with AES-256-GCM.
- **`decryptSeed(encryptedData, password)`**: Decrypts the encrypted seed phrase with the provided password.

---

## Security Considerations

- **Password Strength**: Always use a strong, unique password to protect your seed phrase.
- **Data Handling**: The tool performs all encryption and decryption locally. Sensitive data is not transmitted over the network.
- **Output File**: The encrypted data file should be stored securely to prevent unauthorized access.
- **Auto-Logout**: Sensitive data is cleared from memory immediately after processing.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bug fix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to your fork:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request on the main repository.

---
