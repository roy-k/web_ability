import React from "react"
import { createFromIconfontCN } from '@ant-design/icons';

export const Icon = createFromIconfontCN({
  scriptUrl: 'assets/fonts/iconfont.js',
});

// export type IconProps = {
//     type: string
//     className?: string
// }

// export function Icon(props: IconProps) {
//     const { type, className } = props
//     return (
//         <i className={className}>
//             <svg className="icon" aria-hidden="true">
//                 <use xlinkHref={`#${type}`} />
//             </svg>
//         </i>
//     )
// }