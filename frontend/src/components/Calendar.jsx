import React, { useState } from "react";
import { Calendar as BigCalendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendar = () => {
  const [events] = useState([
    {
      title: "Oil Change - Toyota",
      start: new Date(),
      end: new Date(),
      allDay: true,
      color: "#FF6347",
    },
    {
      title: "Brake Check - Honda",
      start: new Date(new Date().setDate(new Date().getDate() + 2)),
      end: new Date(new Date().setDate(new Date().getDate() + 2)),
      color: "#4682B4",
    },
  ]);

  const eventStyleGetter = (event) => {
    const backgroundColor = event.color || "#3174ad";
    const style = {
      backgroundColor,
      borderRadius: "5px",
      color: "white",
      border: "none",
      padding: "2px 5px",
    };
    return { style };
  };

  return (
    <div className="mt-8 text-sm
      [&_.rbc-toolbar]:flex
      [&_.rbc-toolbar]:justify-between
      [&_.rbc-toolbar]:items-center
      [&_.rbc-btn-group>*]:px-2
      [&_.rbc-btn-group>*]:py-1
      [&_.rbc-toolbar-label]:text-base
      [&_.rbc-toolbar-label]:font-semibold
      [&_.rbc-btn-group]:gap-1
      [&_.rbc-toolbar]:mb-4"
    >
      <BigCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        popup
        eventPropGetter={eventStyleGetter}
      />
    </div>
  );
};

export default Calendar;
