/*
Wenura September 2024



format - dd/MM/yyyy [dd-Day MM-Month yyyy-Year] | MMM yyyy [MMM-Month yyyy-Year] - for month only calender--- doesnt work properly
showOneCalendar - true|false
label
character- " - "

disableFuture - true|false  default: false
disablePast - true|false    default: false
disableDates - []
weekStart - 0 | 1 | 2 | 3 | 4 | 5 | 6
dateChange - function(date) [start,end] - pass it as props
rangeType - "month" | "week" | empty
ranges - [{label: "Today", value: [new Date(), new Date()]}, {label: "Yesterday", value: [new Date(), new Date()]}]
size	'lg' | 'md' | 'sm' | 'xs' - default ('md')

*/

import { DatePicker, Stack } from "rsuite";
import { DateRangePicker } from "rsuite";
// import "rsuite/DateRangePicker/styles/index.css";
import "rsuite/dist/rsuite-no-reset.min.css";
import dayjs from "dayjs";
import React, { useState } from "react";
import { CustomProvider } from "rsuite";

export default function RSuiteDateRangePicker(props) {
  const format = props.format || "dd/MM/yyyy";
  const showOneCalendar = props.showOneCalendar || false;
  const label = props.label || "Date Range";
  const character = props.character || " - ";
  const disableFuture = props.disableFuture || false;
  const disablePast = props.disablePast || false;
  const disableDates = props.disableDates || [];
  const weekStart = props.weekStart || 1;
  const rangeType = props.rangeType || null;
  const ranges = props.ranges || [];
  const showHeader = props.showHeader || false;
  const open = props.open || false;
  const size = props.size || "md";

  const [value, setValue] = useState([
    dayjs(props.startDate).isValid() ? dayjs(props.startDate).$d : null,
    dayjs(props.endDate).isValid() ? dayjs(props.endDate).$d : null,
  ]);

  const disableDatesF = (date) => {
    const isFutureDate = disableFuture && dayjs(date).isAfter(dayjs());
    const isPastDate = disablePast && dayjs(date).isBefore(dayjs());

    const isDisabledSpecificDate = disableDates.some((disabledDate) =>
      dayjs(date).isSame(dayjs(disabledDate), "day")
    );

    return isFutureDate || isPastDate || isDisabledSpecificDate;
  };

  return (
    <DateRangePicker
      defaultOpen={open}
      ranges={ranges}
      size={size}
      showHeader={showHeader}
      hoverRange={rangeType}
      value={value}
      format={format}
      showOneCalendar={showOneCalendar}
      label={label}
      character={character}
      weekStart={weekStart}
      shouldDisableDate={disableDatesF}
      onOk={(date, event) => {
        setValue(date);
        if (props.dateChange) {
          props.dateChange(date);
        }
      }}
      onClean={() => {
        setValue([]);
        if (props.dateChange) {
          props.dateChange([]);
        }
      }}
    />
  );
}
