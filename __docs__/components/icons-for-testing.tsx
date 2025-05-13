import * as React from "react";

export const singleColoredIcon = (
    <svg
        viewBox="0 0 256 256"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path d="M256 77.7348C256 69.003 244.93 65.24 239.609 72.1631L193.306 132.406C189.414 137.467 181.665 137.085 178.293 131.663L135.762 63.3127C132.186 57.5624 123.814 57.5625 120.238 63.3127L77.7083 131.663C74.3356 137.085 66.5871 137.467 62.6964 132.406L16.3919 72.1626C11.0705 65.2396 0 69.0026 0 77.7344V178.837C0 188.936 8.18688 197.122 18.2857 197.122H237.714C247.813 197.122 256 188.936 256 178.837V77.7348Z" />
    </svg>
);

export const multiColoredIcon = (
    <svg
        viewBox="0 0 256 256"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <title>Wonder Blocks logo</title>
        <defs>
            <rect id="path-1" x="0" y="0" width="256" height="256" rx="8" />
        </defs>
        <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <g>
                <g>
                    <mask id="mask-2" fill="white">
                        <use xlinkHref="#path-1" />
                    </mask>
                    <use id="Mask" fill="#1865F2" xlinkHref="#path-1" />
                    <path
                        d="M51,128 L205,128 C205,170.525926 170.525926,205 128,205 C85.4740743,205 51,170.525926 51,128 Z"
                        id="Smile"
                        fill="#FFFFFF"
                        fill-rule="nonzero"
                        mask="url(#mask-2)"
                    />
                    <path
                        d="M128,0 L252,0 C254.209139,-4.05812251e-16 256,1.790861 256,4 L256,128 L128,128 L128,0 Z M192,91 C206.911688,91 219,78.9116882 219,64 C219,49.0883118 206.911688,37 192,37 C177.088312,37 165,49.0883118 165,64 C165,78.9116882 177.088312,91 192,91 Z"
                        id="Right-Eye"
                        fill="#FFD633"
                        mask="url(#mask-2)"
                    />
                    <path
                        d="M4,0 L128,0 L128,128 L0,128 L0,4 C-2.705415e-16,1.790861 1.790861,4.05812251e-16 4,0 Z M64,91 C78.9116882,91 91,78.9116882 91,64 C91,49.0883118 78.9116882,37 64,37 C49.0883118,37 37,49.0883118 37,64 C37,78.9116882 49.0883118,91 64,91 Z"
                        id="Left-Eye"
                        fill="#37C5FD"
                        mask="url(#mask-2)"
                    />
                </g>
            </g>
        </g>
    </svg>
);
