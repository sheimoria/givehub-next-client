import * as yup from 'yup'

import Form from 'components/forms/Form'
import Input from 'components/forms/Input'
import SearchPreview from './SearchPreview'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { SearchIcon } from '@heroicons/react/outline'

export default function Search() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm({ resolver: yupResolver(yup.object({ search: yup.string() })) })
  const searchValue = watch('search')
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative w-2/3">
      <Form
        handleSubmit={handleSubmit}
        onSubmit={console.log}
        className="p-0 bg-transparent border-none rounded-full"
      >
        <Input
          name="search"
          register={register}
          errors={errors.search}
          onFocus={() => setIsOpen(true)}
          onBlur={() => setIsOpen(false)}
          className="px-12 py-2 bg-white rounded-full dark:bg-gray-800"
        />
        <SearchIcon className="absolute pointer-events-none inset-y-2.5 inset-x-4" />
      </Form>
      {searchValue != '' && (
        <SearchPreview isOpen={isOpen} searchValue={searchValue} />
      )}
    </div>
  )
}
