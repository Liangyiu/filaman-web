/**
 * Takes a date and adds/subtracts days from it.
 * @param days Number
 * @param date Date
 * @returns Date
 */
export function addSubtractDays(days: number, date: Date = new Date()) {
	const tempDate = new Date(date);

	tempDate.setDate(tempDate.getUTCDate() + days);

	return tempDate;
}

export function getStartEndOfDay(date: Date) {
	const tempDate = new Date(date);
	return {
		startOfDay: new Date(tempDate.setUTCHours(0, 0, 0, 0)),
		endOfDay: new Date(tempDate.setUTCHours(23, 59, 59, 999))
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
		startOfYear: new Date(year - 1, 11, 31),
		endOfYear: new Date(year + 1, 0, 0)
	};
}

export function getStartEndPastXMonths(date: Date, months: number) {
	const initialDate = new Date(date);

	const { startOfMonth, endOfMonth } = getStartEndOfMonth(date);
	const pastTwelveMonths = [
		{
			startOfMonth,
			endOfMonth
		}
	];

	for (let i = 1; i < months; i++) {
		let tempDate = new Date(initialDate);
		tempDate.setDate(15);

		tempDate.setMonth(tempDate.getUTCMonth() - i);

		pastTwelveMonths.push(getStartEndOfMonth(tempDate));
	}

	return pastTwelveMonths;
}

export function getDate24HoursBefore(date: Date) {
	return new Date(date.getTime() - 24 * 60 * 60 * 1000);
}

/**
 *
 * @param date Date
 * @param days Number
 * @returns Dates & date string & start/end of days as string of last x days
 */

export function getLastXDaysDates(date: Date, days: number) {
	const result = [];

	if (days != 0) {
		for (let i = 0; i < days; i++) {
			if (i === 0) {
				const { endOfDay, startOfDay } = getStartEndOfDay(date);

				result.push({
					date: date,
					dateString: date.toLocaleString('en-us', {
						day: '2-digit',
						month: 'short',
						year: 'numeric'
					}),
					startOfDay,
					endOfDay
				});
				continue;
			}
			const startDate = new Date(date);

			const temp = new Date(startDate.setUTCHours(startDate.getUTCHours() - i * 24));
			const { endOfDay, startOfDay } = getStartEndOfDay(temp);

			result.push({
				date: new Date(temp),
				dateString: temp.toLocaleString('en-us', {
					day: '2-digit',
					month: 'short',
					year: 'numeric'
				}),
				startOfDay,
				endOfDay
			});
		}
	} else {
		const { endOfDay, startOfDay } = getStartEndOfDay(date);

		result.push({
			date: date,
			dateString: date.toLocaleString('en-us', {
				day: '2-digit',
				month: 'short',
				year: 'numeric'
			}),
			startOfDay,
			endOfDay
		});
	}

	return result.reverse();
}
