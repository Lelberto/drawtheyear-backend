/** Application configuration */

export type AppConfig = {
  days: {
    startYear: number;
  };
}

export default (): { app: AppConfig } => ({
  app: {
    days: {
      startYear: 2017
    }
  }
})
