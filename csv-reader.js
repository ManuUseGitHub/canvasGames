const fs = require('fs');
const csv = require('csv-parser');

class CSVAnalyzer {
  constructor(filePath, outputFilePath) {
    this.filePath = filePath;
  }

  streamingFile(rows) {
    return new Promise((resolve, reject) => {
      fs.createReadStream(this.filePath)
        .pipe(csv({ separator: ';' }))
        .on('headers', (h) => console.log(`header read : "${h}"`))
        .on('data', (data) => rows.push(data))
        .on('end', () => resolve())
        .on('error', (error) => reject(error));
    });
  }

  filterEmptyColumn(rows) {
    rows.forEach(r => delete r[""]);
  }

  async toJsonFile(outputFilePath) {
    const rows = [];

    await this.streamingFile(rows);

    this.filterEmptyColumn(rows);
    fs.writeFileSync(outputFilePath, JSON.stringify(rows, null, 2));

    console.log(`Parsed version written to ${outputFilePath}`);
  }
}

const csvAnalyzer = new CSVAnalyzer('./pieces.csv');

csvAnalyzer.toJsonFile('src/resources/pieces.json')
  .catch((error) => console.error('Error:', error));