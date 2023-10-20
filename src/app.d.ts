// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
	// interface Locals {}
	// interface PageData {}
	// interface Error {}
	// interface Platform {}
}

interface StockModelInterface {
	_id: string;
	color: string;
	diameter: number;
	material: string;
	weight: number;
	location: string;
	lastDried: string;
	openingDate: string;
	producer: ProducerModelInterface;
}

interface ProducerModelInterface {
	_id: string;
	producerName: string;
	emptyWeight: number;
	spoolSize: number;
}

interface ApiResponseObject {
	stockItems: StockModelInterface[];
	total: number;
	skip: number;
	limit: number;
}
