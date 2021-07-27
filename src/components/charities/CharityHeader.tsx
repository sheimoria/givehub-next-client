import {
  CharityDocument,
  CharityHeaderFragment,
  CharityRecommendationsDocument,
  useFollowCharityMutation
} from 'generated/graphql'

import Link from 'next/link'
import Picture from 'components/Picture'
import { PlusIcon } from '@heroicons/react/outline'
import router from 'next/router'

export default function CharityHeader({
  charity
}: {
  charity: CharityHeaderFragment
}) {
  const [followCharity] = useFollowCharityMutation({
    variables: { charityId: charity.id },
    refetchQueries: [
      {
        query: CharityDocument,
        variables: { charityId: charity.id }
      },
      {
        query: CharityRecommendationsDocument,
        variables: { limit: 4 }
      }
    ]
  })
  return (
    <div
      className="flex items-center justify-between gap-3 py-3"
      onClick={() =>
        router.push({
          pathname: '/charity',
          query: { charityId: charity.id }
        })
      }
    >
      <div className="flex items-center gap-3">
        <Picture pictureId={charity.profile?.displayPicture} size={10} />
        <div className="flex flex-col">
          <h6>{charity.name}</h6>
          <p className="text-xs text-rose-600 dark:text-rose-600">
            {charity.categories[0].name} &hellip;
          </p>
        </div>
      </div>
      {charity.followStatus === 1 ? (
        <button className="px-3 py-1 button-outline">Following</button>
      ) : (
        <button onClick={() => followCharity()} className="gap-1 px-3 py-1">
          <PlusIcon className="text-white dark:text-white" />
          Follow
        </button>
      )}
    </div>
  )
}
