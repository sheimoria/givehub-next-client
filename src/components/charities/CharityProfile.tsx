import {
  GlobeAltIcon,
  LocationMarkerIcon,
  MailIcon,
  PhoneIcon,
  UserGroupIcon
} from '@heroicons/react/outline'

import { CharityProfileFragment } from 'generated/graphql'
import FollowCharity from './FollowCharity'
import Picture from 'components/Picture'
import Transit from 'components/Transit'
import UpdateCharityProfileButton from './UpdateCharityProfileButton'
import { useRouter } from 'next/router'

export default function CharityProfile({
  charity
}: {
  charity: CharityProfileFragment
}) {
  const router = useRouter()

  return (
    <Transit onEveryMount as="article">
      <div className="flex justify-between gap-3">
        <div className="flex items-center gap-3">
          {/* Display Picture */}
          <Picture pictureId={charity.profile?.displayPicture} size={16} />
          <div className="flex flex-col items-start gap-1">
            {/* Name */}
            <h5>{charity.name}</h5>
            <div className="flex flex-wrap gap-2">
              {/* Categories */}
              {charity.categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() =>
                    router.push({
                      pathname: '/home',
                      query: { view: category.id }
                    })
                  }
                  className="px-3 py-1 text-xs button-secondary"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        {charity.adminStatus && (
          <UpdateCharityProfileButton charity={charity} />
        )}
      </div>
      {/* About */}
      <div className="flex items-center gap-2">
        <p>{charity.profile?.about}</p>
      </div>
      <div className="flex flex-wrap gap-3">
        {/* Email */}
        <p>
          <MailIcon />
          {charity.profile?.email}
        </p>
        {/* Contact No */}
        <p>
          <PhoneIcon />
          {charity.profile?.contactNumber}
        </p>
      </div>
      {/* Address */}
      <p>
        <LocationMarkerIcon />
        {charity.physicalAddress}
        {', '}
        {charity.postalCode}
      </p>
      {/* Website */}
      {charity.profile?.links && (
        <div className="flex items-center gap-2">
          <GlobeAltIcon />
          <a
            className=" text-rose-600 hover:text-rose-700"
            href={charity.profile.links}
          >
            {charity.profile.links}
          </a>
        </div>
      )}
      {/* Followers */}
      <p>
        <UserGroupIcon />
        {charity.followNumber} followers
      </p>
      {!charity.adminStatus && (
        <FollowCharity followStatus={charity.followStatus} />
      )}
    </Transit>
  )
}
