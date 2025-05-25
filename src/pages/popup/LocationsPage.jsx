import { useState } from 'react'
import { Flex } from 'theme-ui'
import { isFirefox, websiteUrl } from 'utils/constants'
import flags from 'utils/flags'
import PageHeader from './PageHeader'
import Toggle from './Toggle'
import ReviewModal from './ReviewModal'

const LocationsPage = ({
  locations,
  currentLocation,
  handleLocationToggle,
  installDate,
  messages,
}) => {
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)

  return (
    <PageHeader
      title={messages.locations}
      styles={{
        p: '0 0 0 24px',
      }}
    >
      <ReviewModal
        messages={messages}
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
      />
      <Flex
        sx={{
          position: 'relative',
          flexDirection: 'column',
          maxHeight: '525px',
          overflowY: 'auto',
          p: isFirefox ? '0 24px 24px 0' : '0 18px 24px 0',
        }}
      >
        <Flex sx={{ pt: '24px', gap: '24px', flexDirection: 'column' }}>
          {locations.map((location) => {
            if (
              location.ratingLocked &&
              installDate &&
              Date.now() - new Date(installDate).getTime() < 24 * 60 * 60 * 1000
            ) {
              return null
            }
            return (
              <Toggle
                title={messages[location.countryCode]}
                id={location.countryCode}
                checked={currentLocation.country === location.country}
                onToggle={async () => {
                  if (location.isPremium) {
                    chrome.tabs.create({
                      url: `${websiteUrl}/select_plan`,
                    })
                  } else if (location.ratingLocked) {
                    chrome.storage.local.get(['reviewed'], (result) => {
                      if (result.reviewed === true) {
                        handleLocationToggle(location)
                      } else {
                        setIsReviewModalOpen(true)
                      }
                    })
                  } else {
                    handleLocationToggle(location)
                  }
                }}
                icon={flags[location.countryCode]}
                hideToggle={location.isPremium}
                messages={messages}
                key={location.countryCode}
              />
            )
          })}
        </Flex>
      </Flex>
    </PageHeader>
  )
}

export default LocationsPage
