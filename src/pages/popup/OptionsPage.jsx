import { Flex, Link } from 'theme-ui'
import { isFirefox, websiteUrl } from 'utils/constants'
import PageHeader from './PageHeader'
import Toggle from './Toggle'

const OptionsPage = ({
  sessionAuthToken,
  spoofGeolocation,
  setSpoofGeolocation,
  disableWebRtc,
  setDisableWebRtc,
  messages,
}) => {
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
      <Flex
        sx={{
          flexDirection: 'column',
          flex: 1,
          justifyContent: 'space-between',
        }}
      >
        {!sessionAuthToken && (
          <Flex
            sx={{
              gap: '20px',
              py: '20px',
              borderBottom: '1px solid',
              borderColor: 'darkGrey',
            }}
          >
            <Link
              id="signupButton"
              href={`${websiteUrl}/signup`}
              target="_blank"
              variant="styles.baseButton"
            >
              {messages.signUp}
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
          />
        </Flex>
      </Flex>
    </PageHeader>
  )
}

export default OptionsPage
