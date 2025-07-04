import { Button, Box } from 'theme-ui'
import Modal from './Modal'
import { reviewUrl } from 'utils/constants'

const ReviewModal = ({ messages, isOpen, onClose }) => {
  const handleReviewClick = () => {
    chrome.storage.local.set({ reviewed: true }).then(() => {
      onClose()
      const trustpilotUrl = 'https://trustpilot.com/evaluate/1vpn.org'
      const openTrustpilot = Math.random() < 0.01
      window.open(openTrustpilot ? trustpilotUrl : reviewUrl, '_blank')
    })
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Box
        sx={{
          mb: '8px',
        }}
      >
        {messages.reviewModalTitle}
      </Box>
      <Button
        onClick={handleReviewClick}
        variant="styles.baseButton"
        sx={{ height: '40px' }}
      >
        {messages.reviewModalButton}
      </Button>
    </Modal>
  )
}

export default ReviewModal
