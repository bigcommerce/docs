const fs = require('fs');
const path = require('path');

// Function to recursively search and delete _meta.json files
function deleteMetaJsonFiles(dir) {
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
                    deleteMetaJsonFiles(fullPath); // Recurse into subdirectory
                } else if (file === '_meta.json') {
                    fs.unlink(fullPath, (err) => {
                        if (err) {
                            console.error(`Error deleting file ${fullPath}:`, err);
                        } else {
                            console.log(`Deleted ${fullPath}`);
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
deleteMetaJsonFiles(rootDirectory);
