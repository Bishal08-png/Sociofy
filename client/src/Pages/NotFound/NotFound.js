import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className="nf-container">

            {/* Starfield background dots */}
            <div className="nf-stars" aria-hidden="true">
                {Array.from({ length: 80 }).map((_, i) => (
                    <span key={i} className="nf-star" style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${(Math.random() * 4).toFixed(2)}s`,
                        width: `${Math.random() * 3 + 1}px`,
                        height: `${Math.random() * 3 + 1}px`,
                        opacity: Math.random() * 0.7 + 0.3,
                    }} />
                ))}
            </div>

            {/* Floating astronaut SVG */}
            <div className="nf-astronaut" aria-hidden="true">
                <svg
                    viewBox="0 0 200 220"
                    xmlns="http://www.w3.org/2000/svg"
                    className="nf-astronaut-svg"
                >
                    {/* Helmet */}
                    <circle cx="100" cy="70" r="45" fill="#1e1e2e" stroke="#a78bfa" strokeWidth="3" />
                    <circle cx="100" cy="70" r="32" fill="#0d0d1a" stroke="#60a5fa" strokeWidth="2" opacity="0.8" />
                    {/* Visor glare */}
                    <ellipse cx="88" cy="58" rx="10" ry="6" fill="white" opacity="0.12" transform="rotate(-20,88,58)" />
                    {/* Body / suit */}
                    <rect x="65" y="108" width="70" height="70" rx="22" ry="22" fill="#1e1e2e" stroke="#a78bfa" strokeWidth="2.5" />
                    {/* Chest badge */}
                    <rect x="84" y="120" width="32" height="20" rx="6" fill="#0d0d1a" stroke="#60a5fa" strokeWidth="1.5" />
                    <rect x="89" y="125" width="22" height="3" rx="2" fill="#a78bfa" opacity="0.7" />
                    <rect x="89" y="132" width="14" height="3" rx="2" fill="#60a5fa" opacity="0.7" />
                    {/* Left arm */}
                    <rect x="30" y="112" width="36" height="22" rx="11" fill="#1e1e2e" stroke="#a78bfa" strokeWidth="2" transform="rotate(20,48,123)" />
                    {/* Right arm */}
                    <rect x="134" y="112" width="36" height="22" rx="11" fill="#1e1e2e" stroke="#a78bfa" strokeWidth="2" transform="rotate(-20,152,123)" />
                    {/* Left glove */}
                    <circle cx="38" cy="136" r="10" fill="#2d2d44" stroke="#60a5fa" strokeWidth="1.5" />
                    {/* Right glove */}
                    <circle cx="162" cy="136" r="10" fill="#2d2d44" stroke="#60a5fa" strokeWidth="1.5" />
                    {/* Left leg */}
                    <rect x="72" y="170" width="24" height="38" rx="12" fill="#1e1e2e" stroke="#a78bfa" strokeWidth="2" />
                    {/* Right leg */}
                    <rect x="104" y="170" width="24" height="38" rx="12" fill="#1e1e2e" stroke="#a78bfa" strokeWidth="2" />
                    {/* Boots */}
                    <ellipse cx="84" cy="208" rx="15" ry="8" fill="#2d2d44" stroke="#60a5fa" strokeWidth="1.5" />
                    <ellipse cx="116" cy="208" rx="15" ry="8" fill="#2d2d44" stroke="#60a5fa" strokeWidth="1.5" />
                    {/* Antenna */}
                    <line x1="100" y1="25" x2="100" y2="10" stroke="#a78bfa" strokeWidth="2.5" strokeLinecap="round" />
                    <circle cx="100" cy="7" r="5" fill="#60a5fa" />
                    {/* Glow on visor */}
                    <circle cx="100" cy="70" r="32" fill="url(#visorGlow)" opacity="0.15" />
                    <defs>
                        <radialGradient id="visorGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            {/* Main content */}
            <div className="nf-content">
                <h1 className="nf-404">404</h1>
                <p className="nf-title">Houston, We Have a Problem</p>
                <p className="nf-sub">
                    You've drifted into the void.<br />
                    There's zero gravity and zero content here.
                </p>
                <Link to="/home" className="nf-btn">
                    <span className="nf-btn-icon">🚀</span>
                    Return to Base
                </Link>
            </div>

        </div>
    );
};

export default NotFound;
