import * as yup from 'yup'

import {
  useCreateCharityMutation,
  useUpdateCharityProfileMutation
} from 'generated/graphql'

import Checkbox from '../forms/Checkbox'
import Form from '../forms/Form'
import Input from '../forms/Input'
import React from 'react'
import Textarea from '../forms/Textarea'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import { yupResolver } from '@hookform/resolvers/yup'

export default function CreateCharity() {
  const [createCharity] = useCreateCharityMutation()
  const [updateCharityProfile] = useUpdateCharityProfileMutation()
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required('Required'),
        uen: yup.string().required('Required'),
        about: yup.string().required('Required'),
        email: yup.string().email('Email is not valid').required('Required'),
        contactNumber: yup
          .string()
          .length(8, 'Contact number must be 8 digits long')
          .required('Required'),
        links: yup
          .string()
          .url('Website link must be a legitimate URL')
          .required('Required'),
        physicalAddress: yup.string().required('Required'),
        postalCode: yup
          .string()
          .length(6, 'Postal code must be 6 digits')
          .required('Required')
      })
    )
  })
  const router = useRouter()

  interface Checkbox extends Element {
    checked: boolean
    name: string
  }

  async function handleCreateCharity(values) {
    const categories = Array.from(
      document.querySelectorAll('input[type="checkbox"]')
    )
      .filter((checkbox: Checkbox) => checkbox.checked)
      .map((checkbox: Checkbox) => parseInt(checkbox.name))
    const createCharityResponse = await createCharity({
      variables: {
        options: {
          uen: values.uen,
          name: values.name,
          physicalAddress: values.physicalAddress,
          postalCode: values.postalCode
        }
      }
    })
    if (createCharityResponse.data.createCharity.errors) {
      createCharityResponse.data.createCharity.errors.forEach(
        ({ field, message }) =>
          setError(field, { type: 'manual', message: message })
      )
    } else if (createCharityResponse.data.createCharity.success) {
      const updateCharityProfileResponse = await updateCharityProfile({
        variables: {
          charityId: createCharityResponse.data.createCharity.charity.id,
          options: {
            name: createCharityResponse.data.createCharity.charity.name,
            physicalAddress:
              createCharityResponse.data.createCharity.charity.physicalAddress,
            postalCode:
              createCharityResponse.data.createCharity.charity.postalCode,
            about: values.about,
            links: values.links,
            categories: categories
          }
        }
      })
      if (updateCharityProfileResponse.data.updateCharityProfile.errors) {
        updateCharityProfileResponse.data.updateCharityProfile.errors.forEach(
          ({ field, message }) =>
            setError(field, { type: 'manual', message: message })
        )
      } else {
        router.replace({
          pathname: '/charity',
          query: {
            charityId: createCharityResponse.data.createCharity.charity.id
          }
        })
      }
    }
  }

  return (
    <Form handleSubmit={handleSubmit} onSubmit={handleCreateCharity}>
      <h5>Charity Sign Up</h5>
      <div className="flex flex-wrap gap-6">
        <Input
          name="name"
          label="Charity Name"
          register={register}
          errors={errors.name}
        />
        <Input
          name="uen"
          label="Unique Entity Number (UEN)"
          register={register}
          errors={errors.uen}
        />
      </div>
      <h6>Which categories does your charity fall under?</h6>
      <div className="flex flex-wrap justify-between gap-6">
        {categories.map((column) => (
          <div key={column[0].label} className="flex flex-col gap-4">
            {column.map((category) => (
              <Checkbox
                key={category.name}
                name={category.name}
                label={category.label}
                register={register}
                errors={errors[category.name]}
              />
            ))}
          </div>
        ))}
      </div>
      <Textarea
        name="about"
        label="About"
        placeholder="Let others understand what your charity does."
        register={register}
        errors={errors.about}
      />
      <div className="flex flex-wrap gap-6">
        <Input
          name="email"
          label="Email Address"
          register={register}
          errors={errors.email}
        />
        <Input
          name="contactNumber"
          label="Contact Number"
          register={register}
          errors={errors.contactNumber}
        />
      </div>
      <Input
        name="links"
        label="Website"
        register={register}
        errors={errors.links}
      />
      <div className="flex flex-wrap gap-6">
        <Input
          name="physicalAddress"
          label="Address"
          register={register}
          errors={errors.physicalAddress}
        />
        <Input
          name="postalCode"
          label="Postal Code"
          register={register}
          errors={errors.postalCode}
        />
      </div>
      <div />
      <button type="submit">Sign Up</button>
    </Form>
  )
}

const categories = [
  [
    { label: 'Animal Welfare', name: '1' },
    { label: 'Arts and Heritage', name: '2' },
    { label: 'Children and Youth', name: '3' },
    { label: 'Community', name: '4' },
    { label: 'Disability', name: '5' }
  ],
  [
    { label: 'Education', name: '6' },
    { label: 'Elderly', name: '7' },
    { label: 'Environment', name: '8' },
    { label: 'Families', name: '9' },
    { label: 'Health', name: '10' }
  ],
  [
    { label: 'Humanitarian', name: '11' },
    { label: 'Social Service', name: '12' },
    { label: 'Sports', name: '13' },
    { label: 'Women and Girls', name: '14' }
  ]
]
