/**
 * Takes a date and adds/subtracts days from it.
 * @param days Number
 * @param date Date
 * @returns Date
 */
export function addSubtractDays(days: number, date: Date = new Date()) {
	date.setDate(date.getUTCDate() + days);

	return date;
}

export function getStartEndOfDay(date: Date) {
	return {
		startOfDay: new Date(date.setUTCHours(0, 0, 0, 0)),
		endOfDay: new Date(date.setUTCHours(23, 59, 59, 999))
	};
}

/**
 * Checks if a string is a valid date
 * @param dateStr string
 * @returns Boolean
 */
export function isDateValid(dateStr: string) {
	const date = new Date(dateStr);

	if (!date.getTime()) {
		return false;
	}

	return true;
}

export function getStartEndOfMonth(date: Date) {
	const month = date.getUTCMonth();
	const year = date.getUTCFullYear();

	return {
		startOfMonth: new Date(year, month, 1),
		endOfMonth: new Date(year, month + 1, 0)
	};
}

export function getStartEndOfYear(date: Date) {
	const year = date.getUTCFullYear();

	return {
		startOfYear: new Date(year, 11, 31),
		endOfYear: new Date(year, 0, 1)
	};
}

export function getStartEndPastTwelveMonths(date: Date) {
	const initialDate = new Date(date);

	const { startOfMonth, endOfMonth } = getStartEndOfMonth(date);
	const pastTwelveMonths = [
		{
			startOfMonth,
			endOfMonth
		}
	];

	for (let i = 1; i < 12; i++) {
		let tempDate = new Date(initialDate);
		tempDate.setDate(15);

		tempDate.setMonth(tempDate.getUTCMonth() - i);

		pastTwelveMonths.push(getStartEndOfMonth(tempDate));
	}

	return pastTwelveMonths;
}
