import { useState } from 'react'
import { Flex, Link, Button } from 'theme-ui'
import { isFirefox, websiteUrl } from 'utils/constants'
import PageHeader from './PageHeader'
import Toggle from './Toggle'
import AndroidModal from './AndroidModal'

const OptionsPage = ({
  sessionAuthToken,
  isPremium,
  spoofGeolocation,
  setSpoofGeolocation,
  disableWebRtc,
  setDisableWebRtc,
  messages,
}) => {
  const [isAndroidModalOpen, setIsAndroidModalOpen] = useState(false)

  const handleSpoofGeolocationToggle = () => {
    chrome.storage.local.set({
      spoofGeolocation: !spoofGeolocation,
    })

    setSpoofGeolocation(!spoofGeolocation)
  }

  const handleDisableWebRtcToggle = () => {
    const disableWebRtcValue = isFirefox
      ? 'proxy_only'
      : 'disable_non_proxied_udp'

    chrome.privacy.network.webRTCIPHandlingPolicy.set({
      value: disableWebRtc ? 'default' : disableWebRtcValue,
    })

    chrome.storage.local.set({
      disableWebRtc: !disableWebRtc,
    })

    setDisableWebRtc(!disableWebRtc)
  }

  return (
    <PageHeader title={messages.options}>
      <AndroidModal
        messages={messages}
        isOpen={isAndroidModalOpen}
        onClose={() => setIsAndroidModalOpen(false)}
      />
      <Flex
        sx={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        {!(sessionAuthToken && isPremium) && (
          <Flex
            sx={{
              gap: '20px',
              py: '20px',
              borderBottom: '1px solid',
              borderColor: 'darkGrey',
            }}
          >
            {sessionAuthToken && !isPremium ? (
              <Link
                href={`${websiteUrl}/select_plan`}
                target="_blank"
                variant="styles.baseButton"
              >
                {messages.upgrade}
              </Link>
            ) : (
              <>
                <Link
                  id="upgradeButton"
                  href={`${websiteUrl}/select_plan`}
                  target="_blank"
                  variant="styles.baseButton"
                >
                  {messages.upgrade}
                </Link>
                <Link
                  id="loginButton"
                  href={`${websiteUrl}/login`}
                  target="_blank"
                  variant="styles.baseButton"
                  sx={{
                    bg: 'transparent',
                    color: 'darkBlue',
                  }}
                >
                  {messages.login}
                </Link>
              </>
            )}
          </Flex>
        )}
        <Flex
          sx={{
            flexDirection: 'column',
            gap: '20px',
            pt: '20px',
          }}
        >
          <Toggle
            title={messages.spoofGeolocation}
            subTitle={messages.spoofGeolocationSubTitle}
            id="spoofGeolocationToggle"
            checked={spoofGeolocation}
            onToggle={() => handleSpoofGeolocationToggle()}
            showBorder
          />
          <Toggle
            title={messages.disableWebRtc}
            subTitle={messages.disableWebRtcSubTitle}
            id="disableWebRtcToggle"
            checked={disableWebRtc}
            onToggle={() => handleDisableWebRtcToggle()}
            showBorder
          />
          <Button
            onClick={() => setIsAndroidModalOpen(true)}
            variant="styles.baseButton"
          >
            Try Our Android App
          </Button>
        </Flex>
      </Flex>
    </PageHeader>
  )
}

export default OptionsPage
