const fs = require('fs');
const path = require('path');

// Function to recursively search and process directories
function processDirectory(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error reading directory ${dir}:`, err);
            return;
        }

        files.forEach(file => {
            const fullPath = path.join(dir, file);

            fs.stat(fullPath, (err, stats) => {
                if (err) {
                    console.error(`Error reading file stats ${fullPath}:`, err);
                    return;
                }

                if (stats.isDirectory()) {
                    processDirectory(fullPath); // Recurse into subdirectory
                } else if (file === 'index.mdx') {
                    const parentDir = path.basename(dir);
                    const newFileName = `${parentDir}.mdx`;
                    const newFullPath = path.join(path.dirname(dir), newFileName);

                    fs.rename(fullPath, newFullPath, (err) => {
                        if (err) {
                            console.error(`Error renaming ${fullPath} to ${newFullPath}:`, err);
                        } else {
                            console.log(`Moved ${fullPath} to ${newFullPath}`);
                        }
                    });
                }
            });
        });
    });
}

// Starting directory (replace with your root directory)
const rootDirectory = path.join(__dirname, 'docs');

// Start processing from the root directory
processDirectory(rootDirectory);
