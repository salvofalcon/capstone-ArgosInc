import { useState } from "react";
import { rem } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { DatePickerInput } from "@mantine/dates";
import "@mantine/dates/styles.css";

export function DatePicker() {
  const [value, setValue] = useState<Date | null>(null);
  const icon = (
    <IconCalendar style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
  );
  return (
    <DatePickerInput
      leftSection={icon}
      leftSectionPointerEvents="none"
      label="Pick date"
      placeholder="Pick date"
      value={value}
      onChange={setValue}
    />
  );
}
