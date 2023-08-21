import * as React from "react";

import PopoverContent from "../popover-content";

<PopoverContent title="Title" content="Content" />;

<PopoverContent title="Title" content="Content" icon="close" />;

<PopoverContent
    title="Title"
    content="Content"
    image={<img src="domokun.jpg" alt="domokun" />}
/>;

<PopoverContent
    title="Title"
    content="Content"
    icon="close"
    image={<img src="domokun.jpg" alt="domokun" />}
/>;

<PopoverContent title="Title" content="Content" emphasized={true} />;

// @ts-expect-error `emphasized` cannot be used with `icon`
<PopoverContent
    title="Title"
    content="Content"
    icon="close"
    emphasized={true}
/>;

// @ts-expect-error `emphasized` cannot be used with `img`
<PopoverContent
    title="Title"
    content="Content"
    image={<img src="domokun.jpg" alt="domokun" />}
    emphasized={true}
/>;
