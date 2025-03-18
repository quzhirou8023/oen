import { ThemeProvider } from 'theme-ui'
import { theme } from 'theme'
import { createRoot } from 'react-dom/client'
import { Flex, Box } from 'theme-ui'
import { localeMessageKeys } from 'utils/constants'
import useLocalization from 'hooks/useLocalization'
import InstallVideo from 'assets/install.mp4'
import 'assets/index.css'

const App = () => {
  const messages = useLocalization(localeMessageKeys)

  return (
    <ThemeProvider theme={theme}>
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          gap: '24px',
          mx: '24px',
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            fontSize: '32px',
            color: 'black',
            lineHeight: '1.2',
          }}
        >
          {messages.installSuccess}
        </Box>
        <Box
          sx={{
            fontSize: '16px',
            color: 'gray',
            mb: '16px',
          }}
        >
          {messages.installInstructions}
        </Box>
        <video
          style={{
            border: '1px solid #c4cbd3',
            borderRadius: '6px',
            maxWidth: '854px',
            width: '100%',
          }}
          loop
          autoPlay
        >
          <source src={InstallVideo} type="video/mp4" />
        </video>
      </Flex>
    </ThemeProvider>
  )
}

const container = document.getElementById('app-container')
const root = createRoot(container)
root.render(<App />)
