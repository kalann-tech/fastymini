import ora from 'ora';
import spinners from 'cli-spinners';

export const loading = (text: string) => {
  const spinner = ora({
    text,
    spinner: spinners.material,
    color: 'cyan',
  });

  return {
    start: () => spinner.start(),
    stop: () => spinner.stop(),
    succeed: (message?: string) => spinner.succeed(message),
    fail: (message?: string) => spinner.fail(message),
    warn: (message?: string) => spinner.warn(message),
    info: (message?: string) => spinner.info(message),
  };
};
