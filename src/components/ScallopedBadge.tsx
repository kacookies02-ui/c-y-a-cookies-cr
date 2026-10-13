import React from 'react';

export type BadgeIconType = 'box' | 'hearts' | 'hand' | 'stack' | 'logo' | 'custom';

interface ScallopedBadgeProps {
  type?: BadgeIconType;
  size?: number; // width & height in px
  className?: string;
  isActive?: boolean;
  badgeColor?: string; // default #E2A99D
  borderColor?: string; // default #FBE6A8
  iconColor?: string; // default #4A2C23
  children?: React.ReactNode;
}

export const ScallopedBadge: React.FC<ScallopedBadgeProps> = ({
  type = 'custom',
  size = 64,
  className = '',
  isActive = false,
  badgeColor = '#E2A99D',
  borderColor = '#FBE6A8',
  iconColor = '#4A2C23',
  children,
}) => {
  // SVG path definition for a 12-petaled smooth scalloped circular badge
  // ViewBox: 0 0 100 100 with center at 50,50
  // Generated with smooth cubic beziers for pristine circular symmetry
  const outerScallopPath =
    'M 50 4 C 55 4, 58 7, 62 10 C 66 13, 71 13, 75 16 C 79 19, 81 24, 84 28 C 87 32, 91 35, 93 40 C 95 45, 95 50, 95 50 C 95 55, 93 60, 91 64 C 89 68, 85 71, 82 75 C 79 79, 76 83, 72 86 C 68 89, 63 90, 58 92 C 53 94, 47 94, 42 92 C 37 90, 32 89, 28 86 C 24 83, 21 79, 18 75 C 15 71, 11 68, 9 64 C 7 60, 5 55, 5 50 C 5 45, 7 40, 9 36 C 11 32, 15 29, 18 25 C 21 21, 24 17, 28 14 C 32 11, 37 10, 42 8 C 46 6, 48 4, 50 4 Z';

  // Double inner decorative outlines
  const innerOutline1 =
    'M 50 10 C 54 10, 57 12, 60 15 C 63 18, 67 18, 71 20 C 75 22, 77 26, 79 30 C 81 34, 85 36, 86 40 C 88 45, 88 50, 88 50 C 88 55, 86 60, 84 64 C 82 67, 78 70, 75 73 C 72 76, 70 79, 66 82 C 62 85, 58 85, 54 87 C 50 88, 45 88, 41 87 C 37 85, 33 85, 29 82 C 25 79, 23 76, 20 73 C 17 70, 13 67, 11 64 C 9 60, 7 55, 7 50 C 7 45, 9 40, 11 36 C 13 33, 17 30, 20 27 C 23 24, 25 21, 29 18 C 33 15, 37 15, 41 13 C 45 11, 48 10, 50 10 Z';

  return (
    <div
      className={`relative inline-flex items-center justify-center transition-transform duration-200 select-none ${
        isActive ? 'scale-105' : 'hover:scale-102'
      } ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full drop-shadow-[0_3px_8px_rgba(139,74,40,0.18)]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Soft back shadow layer */}
        <path
          d={outerScallopPath}
          fill={badgeColor}
          stroke={isActive ? '#FBE3A6' : borderColor}
          strokeWidth={isActive ? '2.5' : '1.8'}
        />

        {/* Outer decorative line */}
        <path
          d={innerOutline1}
          fill="none"
          stroke={borderColor}
          strokeWidth="1.2"
          strokeOpacity="0.9"
        />

        {/* Inner circle line for vintage double-border stamp look */}
        <circle
          cx="50"
          cy="50"
          r="34"
          fill="none"
          stroke={borderColor}
          strokeWidth="0.8"
          strokeOpacity="0.75"
        />

        {/* Tiny 4-pointed sparkle stars on badge edge */}
        <path
          d="M 22 28 Q 23 30 25 30 Q 23 30 22 32 Q 21 30 19 30 Q 21 30 22 28 Z"
          fill={borderColor}
        />
        <path
          d="M 78 28 Q 79 30 81 30 Q 79 30 78 32 Q 77 30 75 30 Q 77 30 78 28 Z"
          fill={borderColor}
        />
        <path
          d="M 20 72 Q 21 74 23 74 Q 21 74 20 76 Q 19 74 17 74 Q 19 74 20 72 Z"
          fill={borderColor}
        />
        <path
          d="M 80 72 Q 81 74 83 74 Q 81 74 80 76 Q 79 74 77 74 Q 79 74 80 72 Z"
          fill={borderColor}
        />

        {/* Dynamic Icon depending on type */}
        {type === 'box' && (
          /* Cookie Box with ribbon and cookies inside */
          <g stroke={iconColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Box base */}
            <path d="M30 52 L50 63 L70 52 L70 68 L50 78 L30 68 Z" />
            <path d="M50 63 L50 78" />
            {/* Box flaps open */}
            <path d="M30 52 L26 38 L45 46 L50 63" />
            <path d="M70 52 L74 38 L55 46 L50 63" />
            {/* Cookies peeking out */}
            <circle cx="43" cy="46" r="4.5" fill="#FBE6A8" fillOpacity="0.4" />
            <circle cx="57" cy="46" r="4.5" fill="#FBE6A8" fillOpacity="0.4" />
            <circle cx="50" cy="40" r="4" fill="#FBE6A8" fillOpacity="0.4" />
            {/* Ribbon tie */}
            <path d="M47 62 C43 59 40 61 42 65 C44 67 47 64 47 62" />
            <path d="M53 62 C57 59 60 61 58 65 C56 67 53 64 53 62" />
          </g>
        )}

        {type === 'hearts' && (
          /* Three charming line hearts */
          <g stroke={iconColor} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Top heart */}
            <path d="M 57 32 C 57 28 62 26 65 29 C 68 32 68 36 65 40 L 57 48 L 49 40 C 46 36 46 32 49 29 C 52 26 57 28 57 32 Z" />
            {/* Left heart */}
            <path d="M 37 46 C 37 43 41 41 43 43 C 45 45 45 48 43 51 L 37 57 L 31 51 C 29 48 29 45 31 43 C 33 41 37 43 37 46 Z" />
            {/* Bottom-right heart */}
            <path d="M 55 56 C 55 53 59 51 61 53 C 63 55 63 58 61 61 L 55 67 L 49 61 C 47 58 47 55 49 53 C 51 51 55 53 55 56 Z" />
          </g>
        )}

        {type === 'hand' && (
          /* Hand delicately holding a chocolate chip cookie */
          <g stroke={iconColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Cookie being held */}
            <circle cx="56" cy="38" r="9" fill="#FBE6A8" fillOpacity="0.4" />
            <circle cx="53" cy="36" r="1.2" fill={iconColor} />
            <circle cx="58" cy="35" r="1.2" fill={iconColor} />
            <circle cx="56" cy="41" r="1.2" fill={iconColor} />
            <circle cx="61" cy="39" r="1.2" fill={iconColor} />
            {/* Hand fingers and palm */}
            <path d="M 48 44 C 47 40 49 36 51 34" />
            <path d="M 45 46 C 43 42 45 38 48 37" />
            <path d="M 44 48 C 42 50 42 54 44 57 L 47 62" />
            <path d="M 50 46 C 52 50 52 55 51 60 L 53 74" />
            <path d="M 44 65 L 42 74" />
          </g>
        )}

        {type === 'stack' && (
          /* Stack of 4 thick cookies with chocolate chips */
          <g stroke={iconColor} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none">
            {/* Top cookie */}
            <ellipse cx="50" cy="35" rx="14" ry="6" fill="#FBE6A8" fillOpacity="0.4" />
            <circle cx="46" cy="34" r="1.3" fill={iconColor} />
            <circle cx="53" cy="33" r="1.3" fill={iconColor} />
            <circle cx="51" cy="37" r="1.3" fill={iconColor} />
            {/* Cookie 2 */}
            <path d="M 36 41 C 36 44 42 47 50 47 C 58 47 64 44 64 41" />
            <path d="M 36 36 L 36 41" />
            <path d="M 64 36 L 64 41" />
            <circle cx="44" cy="43" r="1.2" fill={iconColor} />
            <circle cx="54" cy="44" r="1.2" fill={iconColor} />
            {/* Cookie 3 */}
            <path d="M 36 49 C 36 52 42 55 50 55 C 58 55 64 52 64 49" />
            <path d="M 36 44 L 36 49" />
            <path d="M 64 44 L 64 49" />
            <circle cx="48" cy="51" r="1.2" fill={iconColor} />
            {/* Cookie 4 (base) */}
            <path d="M 36 57 C 36 61 42 64 50 64 C 58 64 64 61 64 57" />
            <path d="M 36 52 L 36 57" />
            <path d="M 64 52 L 64 57" />
            <circle cx="45" cy="59" r="1.2" fill={iconColor} />
            <circle cx="55" cy="60" r="1.2" fill={iconColor} />
          </g>
        )}

        {type === 'logo' && (
          /* Vector backup or base for the K&A Cookies logo */
          <g>
            <text
              x="50"
              y="27"
              textAnchor="middle"
              fill="#8B4A28"
              fontFamily="Cinzel, serif"
              fontSize="12"
              fontWeight="800"
              letterSpacing="2"
            >
              K &amp; A
            </text>
            {/* Cookie split in 3 pieces */}
            <circle cx="50" cy="50" r="16" fill="#D98A53" stroke="#8B4A28" strokeWidth="1.5" />
            {/* Cracks */}
            <path d="M 50 34 L 50 50 L 64 58" stroke="#FBE6A8" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M 50 50 L 36 56" stroke="#FBE6A8" strokeWidth="2.2" strokeLinecap="round" />
            {/* Chips */}
            <circle cx="43" cy="44" r="2.2" fill="#4A2C23" />
            <circle cx="55" cy="42" r="2" fill="#4A2C23" />
            <circle cx="47" cy="58" r="2.2" fill="#4A2C23" />
            <circle cx="57" cy="54" r="1.8" fill="#4A2C23" />
            <text
              x="50"
              y="79"
              textAnchor="middle"
              fill="#8B4A28"
              fontFamily="Cinzel, serif"
              fontSize="8.5"
              fontWeight="800"
              letterSpacing="2"
            >
              COOKIES
            </text>
          </g>
        )}
      </svg>

      {/* Optional custom content overlay */}
      {type === 'custom' && children && (
        <div className="absolute inset-0 flex items-center justify-center p-2">
          {children}
        </div>
      )}
    </div>
  );
};
