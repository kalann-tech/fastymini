import figlet from 'figlet';
import theme from './theme';

export function textTittle(text: string) {
return theme.primary(figlet.textSync(text, {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
  }));
}

export function printTitle(text: string) {
  try {
    const title =  textTittle(text);
    console.log(title);
  } catch (error) {
    console.error(theme.error('Error printing title:', error));
  }
}


