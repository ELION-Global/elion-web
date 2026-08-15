import { ImageResponse } from 'next/og'

export const size = { width: 512, height: 512 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 512,
          height: 512,
          background: '#0B1320',
          borderRadius: 96,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          fontSize: 320,
          fontWeight: 700,
          color: '#E8EEF7',
          letterSpacing: '-16px',
        }}
      >
        E
      </div>
    ),
    { ...size }
  )
}
