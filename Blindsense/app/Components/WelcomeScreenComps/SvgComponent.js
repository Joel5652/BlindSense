import * as React from "react"
import Svg, { Defs, Path, ClipPath, Use, Circle } from "react-native-svg"


function SvgComponent({ style, slideID }) {

  if (slideID == 1) {
    return (
      <Svg
        id="prefix__Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x={0}
        y={0}
        viewBox="0 0 85 118"
        xmlSpace="preserve"
        {...style}
      >
        <Defs>
          <Path
            id="prefix__SVGID_1_"
            d="M64.8 118H20.35C9.15 118 .07 108.92.07 97.72V20.91C.07 9.71 9.15.63 20.35.63H64.8c11.2 0 20.28 9.08 20.28 20.28v76.81C85.07 108.92 76 118 64.8 118z"
          />
        </Defs>
        <ClipPath id="prefix__SVGID_2_">
          <Use xlinkHref="#prefix__SVGID_1_" overflow="visible" />
        </ClipPath>
        <Path
          d="M64.72 118H20.28C9.08 118 0 108.92 0 97.72V20.28C0 9.08 9.08 0 20.28 0h44.45C75.92 0 85 9.08 85 20.28v77.45C85 108.92 75.92 118 64.72 118z"
          clipPath="url(#prefix__SVGID_2_)"
          fill="#feeddb"
        />
        <Path
          className="prefix__st1"
          d="M0 56.54s8.58 18.78 33.96 19.42v19.29C31.29 69.87 0 74.69 0 74.69V56.54zM33.96 100.01V118h14.32s-14.32 0-14.32-17.99z"
        />
        <Circle
          cx={13.62}
          cy={90.61}
          r={7.71}
          clipPath="url(#prefix__SVGID_2_)"
          fill="#f8b479"
        />
        <Circle
          cx={60.79}
          cy={83.94}
          r={14.37}
          clipPath="url(#prefix__SVGID_2_)"
          fill="#eed7c7"
        />
        <Circle
          cx={50.7}
          cy={91.35}
          r={10.09}
          clipPath="url(#prefix__SVGID_2_)"
          fill="#ec613c"
        />
        <Path
          className="prefix__st1"
          d="M85 118H64.38S61.79 97.44 85 94.97V118z"
        />
      </Svg>
    )
  } else {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 85 118"
        {...style}
      >
        <Defs>
          <Path
            id="prefix__a"
            d="M63.44 117.79H21.71C9.76 117.79.07 108.1.07 96.15V21.43C.07 9.48 9.76-.21 21.71-.21h41.72c11.95 0 21.64 9.69 21.64 21.64v74.72c0 11.95-9.68 21.64-21.63 21.64z"
          />
        </Defs>
        <ClipPath id="prefix__b">
          <Use xlinkHref="#prefix__a" overflow="visible" />
        </ClipPath>
        <Path
          d="M63.36 118H21.64C9.69 118 0 108.31 0 96.36V21.64C0 9.69 9.69 0 21.64 0h41.72C75.31 0 85 9.69 85 21.64v74.72C85 108.31 75.31 118 63.36 118z"
          clipPath="url(#prefix__b)"
          fill="#f3f3f3"
        />
        <Circle
          cx={55.37}
          cy={70.8}
          r={8.61}
          clipPath="url(#prefix__b)"
          fill="#ec613c"
        />
        <Circle
          cx={35.69}
          cy={86.64}
          r={11.06}
          clipPath="url(#prefix__b)"
          fill="#f8b479"
        />
        <Circle
          cx={67.96}
          cy={86.64}
          r={17.39}
          clipPath="url(#prefix__b)"
          fill="#fff"
        />
        <Path
          d="M0 64.94C13.26 102.9 18.66 107.66 56.62 118H0V64.94z"
          clipPath="url(#prefix__b)"
          fill="#292929"
        />
      </Svg>
    )
  }
}

export default SvgComponent