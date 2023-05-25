"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface CalendarProps {
	value: Range;
	onChange: (value: RangeKeyDict) => void;
	disabledDates?: Date[];
}

const Calendar: React.FC<CalendarProps> = ({
	value,
	onChange,
	disabledDates,
}) => {
	return (
		<div className="flex flex-col items-center justify-center">
			<DateRange
				rangeColors={["#8285f4"]}
				ranges={[value]}
				date={new Date()}
				onChange={onChange}
				direction="vertical"
				showDateDisplay={false}
				minDate={new Date()}
				disabledDates={disabledDates}
			/>
		</div>
	);
};

export default Calendar;
