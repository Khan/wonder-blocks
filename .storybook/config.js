import { configure, setAddon } from '@storybook/react';
import JSXAddon from 'storybook-addon-jsx';

function loadStories() {
    const req = require.context('../packages', true, /\.stories\.js$/);
    req.keys().forEach(filename => req(filename));
}

setAddon(JSXAddon);

configure(loadStories, module);
