const fs = require('fs');
const path = require('path');

function convertMoldel(filePath, output, variableName) {
    fs.readFile(filePath, (err, data) => {
        if (err) {
            console.error('Erreur lors de la lecture du fichier binaire:', err);
            return;
        }

        // Convertir le contenu en base64
        const base64Content = data.toString('base64');

        // Créer la chaîne de caractères contenant l'exportation de la constante
        const outputContent = `export const ${variableName} = "${base64Content}";`;

        // Chemin vers le fichier de sortie
        const outputFilePath = path.join(__dirname, output);

        // Écrire la chaîne dans le fichier de sortie
        fs.writeFile(outputFilePath, outputContent, (err) => {
            if (err) {
                console.error('Erreur lors de l\'écriture du fichier de sortie:', err);
                return;
            }
            console.log('Fichier de sortie généré avec succès:', outputFilePath);
        });
    });
}

convertMoldel('./test/llama-3.1-tokenizer.model', '../src/llama_3_1_tokeniser_model.ts', 'llama_3_1_tokeniser_b64');
convertMoldel('./test/30k-clean.model', '../src/clean_30k.ts', 'clean_30k_b64');
convertMoldel('./test/smart.model', '../src/smart.ts', 'smart_b64');