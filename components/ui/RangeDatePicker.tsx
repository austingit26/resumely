'use client';

import * as React from 'react';
import { format, parseISO, isValid } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import { type DateRange } from 'react-day-picker';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Field, FieldLabel } from '@/components/ui/field';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

type RangeValue =
  | DateRange
  | {
      startDate?: string;
      endDate?: string;
    }
  | null
  | undefined;

type Props = {
  label?: string;
  value?: RangeValue;
  onChange: (value: {
    startDate?: string;
    endDate?: string;
  }) => void;
  placeholder?: string;

  minDate?: Date;
  maxDate?: Date;
};

export function RangeDatePicker({
  label = 'Date Range',
  value,
  onChange,
  placeholder = 'Pick a date range',
  minDate,
  maxDate,
}: Props) {
  const parsedValue: DateRange | undefined = React.useMemo(() => {
    if (!value) return undefined;

    if ('from' in value || 'to' in value) {
      return value as DateRange;
    }

    const from = value.startDate ? parseISO(value.startDate) : undefined;
    const to = value.endDate ? parseISO(value.endDate) : undefined;

    return {
      from: from && isValid(from) ? from : undefined,
      to: to && isValid(to) ? to : undefined,
    };
  }, [value]);

  const handleSelect = (range: DateRange | undefined) => {
    onChange({
      startDate: range?.from ? format(range.from, 'yyyy-MM-dd') : undefined,
      endDate: range?.to ? format(range.to, 'yyyy-MM-dd') : undefined,
    });
  };

  const disabled = React.useMemo(() => {
    if (minDate && maxDate) {
      return {
        before: minDate,
        after: maxDate,
      };
    }

    if (minDate) {
      return {
        before: minDate,
      };
    }

    if (maxDate) {
      return {
        after: maxDate,
      };
    }

    return undefined;
  }, [minDate, maxDate]);

  return (
    <Field className="w-full">
      <FieldLabel>{label}</FieldLabel>

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className="justify-start px-3 font-normal w-full"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />

            {parsedValue?.from && isValid(parsedValue.from) ? (
              parsedValue.to && isValid(parsedValue.to) ? (
                <>
                  {format(parsedValue.from, 'LLL dd, yyyy')} -{' '}
                  {format(parsedValue.to, 'LLL dd, yyyy')}
                </>
              ) : (
                format(parsedValue.from, 'LLL dd, yyyy')
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0 bg-white" align="start">
          <Calendar
            mode="range"
            numberOfMonths={2}
            selected={parsedValue}
            onSelect={handleSelect}
            defaultMonth={parsedValue?.from}
            disabled={disabled}
          />
        </PopoverContent>
      </Popover>
    </Field>
  );
}