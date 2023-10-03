import * as React from "react";

const SvgMock = React.forwardRef(function SvgMock(
    props: React.SVGProps<SVGSVGElement>,
    ref: React.ForwardedRef<SVGSVGElement>,
) {
    return <svg viewBox="0 0 24 24" {...props} ref={ref} />;
});

SvgMock.displayName = "SvgMock";

export default SvgMock;
