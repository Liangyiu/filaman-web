export async function getStock() {
	const res = await fetch('/api/stock');
	const data = await res.json();
	return data;
}
