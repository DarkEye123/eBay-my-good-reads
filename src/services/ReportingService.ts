import Rollbar from 'rollbar';

interface ReportService {
  logInfo: (info: string) => void;
  logError: (error: string) => void;
}

class Reporter implements ReportService {
  private client: Rollbar;
  constructor() {
    this.client = new Rollbar({
      accessToken: process.env.REACT_APP_ROLLBAR_TOKEN,
      captureUncaught: true,
      captureUnhandledRejections: true,
      payload: {
        environment: 'production',
      },
    });
  }

  logInfo(info: string) {
    this.client.info(info);
  }

  logError(error: string) {
    this.client.error(error);
  }
}

const client: ReportService = new Reporter();

export { client };
