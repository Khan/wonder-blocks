import { configure } from '@storybook/react';

function loadStories() {
    const req = require.context('../', true, /\_stories\.js$/);
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
