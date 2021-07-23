import 'react-datepicker/dist/react-datepicker.css'

import { Control, Controller, FieldValues } from 'react-hook-form'

import DatePicker from 'react-datepicker'
import { ExclamationCircleIcon } from '@heroicons/react/solid'

type DatetimeProps = {
  name: string
  label: string
  errors: any
  control: Control<FieldValues>
  srOnly?: boolean
  className?: string
  placeholder?: string
}

export default function Datetime({
  name,
  label,
  errors,
  control,
  srOnly,
  className,
  placeholder
}: DatetimeProps) {
  return (
    <div className="relative flex flex-col items-stretch flex-1 gap-2">
      <label htmlFor={name} className={srOnly ? 'sr-only' : undefined}>
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <DatePicker
            onChange={(date) => field.onChange(date)}
            selected={field.value}
            showTimeSelect
            timeFormat="HH:mm"
            dateFormat="d MMM yyyy, h:mm aa"
            className={
              'w-full text-sm bg-gray-800 rounded-md focus:ring-2 focus:ring-rose-600 ' +
              className
            }
            placeholderText={placeholder}
          />
        )}
      />
      {errors && (
        <span className="absolute flex gap-1 text-sm inset-1/2 text-rose-600 dark:text-rose-600">
          <ExclamationCircleIcon className="w-5 h-5 text-rose-600 dark:text-rose-600" />
          {errors.message}
        </span>
      )}
    </div>
  )
}
