
import checkForUpdate from 'update-check';
import pkg from '../../package.json';
import theme from './theme';


export async function notifyUpdate() {
  try {
    const update = await checkForUpdate(pkg, { interval: 1000 * 60 * 60 }); 
    if (update) {
      console.log(
        theme.info(
          `A new version of ${pkg.name} is available! ` +
          `Current: ${pkg.version}, Latest: ${update.latest}. ` +
          `Run ${theme.primary('npm install -g ' + pkg.name)} to update.`
        )
      );
    }
  } catch (err) {
    console.error(theme.error('Error checking for updates:', err));
  }
}
