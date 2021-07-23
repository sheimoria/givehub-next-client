import {
  EventCardFragment,
  EventHeaderFragmentDoc,
  EventInfoFragmentDoc,
  EventLikesFragmentDoc,
  EventRequestsFragmentDoc
} from 'generated/graphql'

import EventHeader from './EventHeader'
import LikeEvent from 'components/events/LikeEvent'
import RequestEvent from './RequestEvent'
import ShareEvent from './ShareEvent'
import Transit from 'components/Transit'
import { filter } from 'graphql-anywhere'

type EventProps = {
  event: EventCardFragment
  lineclamp?: boolean
}

export default function Event({ event, lineclamp }: EventProps) {
  return (
    <Transit onEveryMount>
      <article>
        <div className="flex flex-wrap justify-between gap-3">
          <EventHeader event={filter(EventHeaderFragmentDoc, event)} />
          {/*  <EditEvent event={event} /> */}
          <ShareEvent eventInfo={filter(EventInfoFragmentDoc, event)} />
        </div>

        <p className={lineclamp ? 'line-clamp-3' : ''}>{event.description}</p>
        <div className="flex items-center gap-4">
          <LikeEvent likeEvent={filter(EventLikesFragmentDoc, event)} />
          <RequestEvent
            requestEvent={filter(EventRequestsFragmentDoc, event)}
          />
        </div>
      </article>
    </Transit>
  )
}
