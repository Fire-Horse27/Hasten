export {}

declare global {
  interface Window {
    api: {
      getAppStatus: () => Promise<{
        appName: string
        dbReady: boolean
      }>
    }
  }
}
