
import * as GoldenLayout from 'golden-layout';

const mainLayoutConfig: GoldenLayout.Config = {
    content: [{
        type: 'row',
        content: [{
            title: 'A',
            type: 'react-component',
            component: 'test-component',
            props: { label: 'A' }
        }, {
            type: 'column',
            content: [{
                title: 'B',
                type: 'react-component',
                component: 'test-component',
                props: { label: 'B' }
            }, {
                title: 'C',
                type: 'react-component',
                component: 'test-component',
                props: { label: 'C' }
            }]
        }]
    }]
};

export default mainLayoutConfig;
