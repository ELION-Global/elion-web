import { ImageResponse } from 'next/og'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          background: '#050810',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        {/* Subtle radial glow */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(74,127,165,0.12) 0%, transparent 70%)',
          }}
        />

        {/* Phase badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            marginBottom: 40,
            padding: '6px 14px',
            border: '1px solid rgba(183,194,207,0.2)',
            borderRadius: 100,
            background: 'rgba(17,29,48,0.8)',
          }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#E0B85F' }} />
          <span style={{ fontSize: 13, color: '#9AA7B5', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Phase 0 — Public Platform
          </span>
        </div>

        {/* Route fallback; social metadata uses the official logo asset directly. */}
        <div style={{ fontSize: 96, fontWeight: 700, color: '#E8EEF7', letterSpacing: '-3px', marginBottom: 24, lineHeight: 1 }}>
          ELION
        </div>

        {/* Tagline */}
        <div style={{ fontSize: 32, color: '#E0B85F', fontWeight: 600, marginBottom: 20 }}>
          Engineering for Humanity.
        </div>

        {/* Description */}
        <div style={{ fontSize: 20, color: '#7A8A99', maxWidth: 700, lineHeight: 1.5 }}>
          A global organization building peaceful technologies that improve human life.
        </div>

        {/* URL */}
        <div style={{ position: 'absolute', bottom: 60, right: 80, fontSize: 16, color: '#4a7fa5', fontFamily: 'monospace' }}>
          ELION
        </div>
      </div>
    ),
    { ...size }
  )
}
