const fs = require("fs");
const path = require("path");
const JSZip = require("jszip-sync");
const { execSync } = require("child_process");

function zipDirectory(directoryPath, zipFilePath) {
    // Créer une nouvelle instance de JSZip
    const zip = new JSZip();

    try {
        execSync("rm " + zipFilePath);
    } catch {}
    execSync("cp manifest-firefox.json public/manifest.json");
    execSync("pnpm run build");

    // // Fonction récursive pour ajouter les fichiers et dossiers au zip
    // function addFilesToZip(folderPath, relativePath) {
    //     const files = fs.readdirSync(folderPath);
    //     for (const file of files) {
    //         const filePath = path.join(folderPath, file);
    //         const stats = fs.statSync(filePath);
    //         if (stats.isFile()) {
    //             const data = fs.readFileSync(filePath);
    //             zip.file(path.join(relativePath, file), data);
    //         } else if (stats.isDirectory()) {
    //             const newFolder = zip.folder(path.join(relativePath, file));
    //             addFilesToZip(filePath, path.join(relativePath, file));
    //         }
    //     }
    // }

    // // Ajouter les fichiers et dossiers du répertoire au zip
    // addFilesToZip(directoryPath, "");

    // // Générer le zip asynchrone et écrire sur le disque
    // zip.generateAsync({ type: "nodebuffer" })
    //     .then(function (content) {
    //         fs.writeFileSync(zipFilePath, content);
    //     })
    //     .catch(function (err) {
    //         console.error(err);
    //     });
}

// Utilisation
const directoryPath = "build";
const zipFilePath = "versions/Firefox-Discord-Bacon.xpi";
zipDirectory(directoryPath, zipFilePath);
