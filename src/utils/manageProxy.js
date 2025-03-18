import setBadge from './setBadge'
import { isFirefox } from './constants'

const handleProxyRequest = (details) => {
  return new Promise((resolve, reject) => {
    const url = new URL(details.url)
    const hostname = url.hostname

    const whitelistDomains = ['localhost', '127.0.0.1']

    if (whitelistDomains.includes(hostname)) {
      resolve({ type: 'direct' })
      return
    }

    chrome.storage.local.get(['isConnected', 'currentLocation'], (storage) => {
      if (storage.isConnected) {
        const host = storage.currentLocation.hosts[0]
        resolve({
          type: 'https',
          host: host.hostname,
          port: host.port,
        })
      } else {
        resolve({ type: 'direct' })
      }
    })
  })
}

const getPacScript = (hosts) => {
  const hostNamesString = hosts.reduce(
    (hostsString, host) =>
      (hostsString += `HTTPS ${host.hostname}:${host.port};`),
    ''
  )

  return `
    function FindProxyForURL(url, host) {
      if (dnsDomainIs(host, "1vpn.website" )) {
        return "DIRECT";
      }
      // For all other cases use the specified proxy settings
      return "${hostNamesString}";
    }
  `
}

const connect = async (hosts) => {
  if (!isFirefox) {
    chrome.management.getAll((extensions) => {
      extensions.forEach((extension) => {
        if (extension.permissions && extension.permissions.includes('proxy')) {
          if (extension.id !== chrome.runtime.id) {
            chrome.management.setEnabled(extension.id, false)
          }
        }
      })
    })

    // const randomizedHosts = [...hosts].sort(() => Math.random() - 0.5)

    // const pacScript = getPacScript(randomizedHosts)

    const pacScript = getPacScript(hosts)

    chrome.proxy.settings.set({
      value: {
        mode: 'pac_script',
        pacScript: {
          data: pacScript,
          mandatory: true,
        },
      },
      scope: 'regular',
    })
    await createOffscreenDocument()
  }

  setBadge()
}

const disconnect = () => {
  if (!isFirefox) {
    chrome.proxy.settings.set({
      value: { mode: 'direct', rules: {} },
      scope: 'regular',
    })
  }
  chrome.storage.local.set({
    isConnected: false,
  })
  chrome.action.setBadgeText({ text: '' })
}

const createOffscreenDocument = async () => {
  if (await chrome.offscreen.hasDocument()) {
    await chrome.offscreen.closeDocument()
  }

  await chrome.offscreen.createDocument({
    url: 'offscreen.html',
    reasons: [chrome.offscreen.Reason.WORKERS],
    justification: 'Proxy authentication',
  })
}

export { handleProxyRequest, connect, disconnect }
