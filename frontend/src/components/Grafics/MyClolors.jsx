import React from 'react';

export default function MyClolors() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', marginLeft: '-195px', marginBottom: '10px',
    }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          background: 'rgb(166, 15, 242)', width: '10px', height: '10px', borderRadius: '50%', marginRight: '5px',
        }}
        />
        <div style={{ textAlign: 'left' }}>Федеральный бюджет</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          background: 'rgb(73%, 5%, 28%)', width: '10px', height: '10px', borderRadius: '50%', marginRight: '5px',
        }}
        />
        <div style={{ textAlign: 'left' }}>Региональный бюджет</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          background: 'rgb(2%, 51%, 9%)', width: '10px', height: '10px', borderRadius: '50%', marginRight: '5px',
        }}
        />
        <div style={{ textAlign: 'left' }}>Софинансирование</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          background: 'rgb(1%, 56%, 55%)', width: '10px', height: '10px', borderRadius: '50%', marginRight: '5px',
        }}
        />
        <div style={{ textAlign: 'left' }}>Инвестирование</div>
      </div>
    </div>

  );
}
