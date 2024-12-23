const readline = require('readline');
const { Writable } = require('stream');

function readPassword(promptText) {
    return new Promise((resolve) => {
        const mutableStdout = new Writable({
            write(chunk, encoding, callback) {
                callback();
            },
        });

        const rl = readline.createInterface({
            input: process.stdin,
            output: mutableStdout,
            terminal: true,
        });

        const passwordChars = [];

        // Print our initial prompt
        process.stdout.write(promptText);

        // Listen for raw data from stdin
        process.stdin.on('data', (buffer) => {
            const key = buffer.toString('utf8');

            // Handle Enter (finish input)
            if (key === '\r' || key === '\n') {
                process.stdout.write('\n');
                rl.close();
                resolve(passwordChars.join(''));
                return;
            }

            //Handling backspace here (for deleting one character from the password)
            if (key === '\u0008' || key === '\u007F') {
                if (passwordChars.length > 0) {
                    passwordChars.pop();
                    process.stdout.write('\b \b');
                }
                return;
            }

            passwordChars.push(key);
            process.stdout.write('*');
        });
    });
}

module.exports = {
    readPassword
}