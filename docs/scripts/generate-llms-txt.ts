import fs from 'node:fs';
import { glob } from 'node:fs/promises';
import path from 'node:path';

const docsDir = path.resolve('docs');

async function generateLLMsTXT() {
	// sort input files
	let inputFiles = [];
	for await (const file of glob('**/*.md', { cwd: docsDir, exclude: ['**/node_modules/**'] })) {
		inputFiles.push(file);
	}

	inputFiles = inputFiles.sort((a, b) => {
		if (a === 'index.md') return -1;
		if (b === 'index.md') return 1;
		return a.localeCompare(b);
	});

	// open output file
	const outputPath = path.resolve(docsDir, 'public', 'llms-full.txt');
	const outfileStream = fs.createWriteStream(outputPath, { encoding: 'utf-8' });
	outfileStream.write(
		'<SYSTEM>This is the full documentation for Kula Quest.</SYSTEM>\n\n# Start of Kula Quest documentation\n\n'
	);

	// catalog documentation
	for (const inputFile of inputFiles) {
		const fileContent = fs.readFileSync(path.resolve(docsDir, inputFile), 'utf-8');
		const fileUrl = path.normalize(inputFile).replace(/\\/g, '/');
		outfileStream.write(`---\nurl: /${fileUrl}\n---\n${fileContent}\n\n---\n\n`);
	}

	outfileStream.end();
}

generateLLMsTXT().catch((e) => console.error(e));
