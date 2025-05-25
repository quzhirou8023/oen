import { Box, Button, Flex, Image } from 'theme-ui'
import { reviewUrl } from 'utils/constants'
import XIcon from 'assets/x.svg'

const ReviewModal = ({ messages, isOpen, onClose }) => {
  const handleReviewClick = () => {
    chrome.storage.local.set({ reviewed: true }).then(() => {
      onClose()

      const trustpilotUrl = 'https://trustpilot.com/evaluate/1vpn.org'
      const openTrustpilot = Math.random() < 0.2

      window.open(openTrustpilot ? trustpilotUrl : reviewUrl, '_blank')
    })
  }

  return (
    <>
      {isOpen && (
        <Flex
          onClick={onClose}
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            height: '100vh',
            width: '100vw',
            position: 'fixed',
            top: '0',
            left: '0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
            cursor: 'pointer',
          }}
        >
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '220px',
              background: 'white',
              borderRadius: '6px',
              p: '24px',
              textAlign: 'center',
              gap: '8px',
              position: 'relative',
              cursor: 'default',
            }}
          >
            <Image
              src={XIcon}
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
              }}
            />
            <Box
              sx={{
                my: '6px',
              }}
            >
              {messages.reviewModalTitle}
            </Box>
            <Button
              onClick={handleReviewClick}
              variant="styles.baseButton"
              sx={{
                height: '40px',
              }}
            >
              {messages.reviewModalButton}
            </Button>
          </Box>
        </Flex>
      )}
    </>
  )
}

export default ReviewModal
