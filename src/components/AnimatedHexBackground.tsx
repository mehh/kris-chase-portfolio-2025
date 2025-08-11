'use client';
import { motion } from 'framer-motion';

export default function AnimatedHexBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Main animated SVG background */}
      <motion.div
        className="absolute inset-0 opacity-100 dark:opacity-80"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: [0.8, 1.0, 0.9, 1.0, 0.85, 0.95],
          scale: [1, 1.05, 0.95, 1.03, 0.97, 1]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
        ease: "easeInOut",
          times: [0, 0.2, 0.4, 0.6, 0.8, 1]
        }}
      >
        <svg 
          className="w-full h-full min-w-full min-h-full"
          viewBox="0 0 1600 1000" 
          preserveAspectRatio="xMidYMid slice"
          style={{
            filter: 'blur(0.5px)',
            transform: 'scale(1.5)', // Scale up to ensure full coverage
          }}
        >
          {/* Background rect - make it transparent since we want the pattern only */}
          <rect width="100%" height="100%" fill="transparent"/>
          
          {/* Hex pattern elements with individual subtle animations */}
          <motion.g
            animate={{
              opacity: [0.4, 0.8, 0.5, 0.7, 0.4],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0
            }}
          >
            <path d="M 118.819,36.400 118.819,103.600 60.622,137.200 2.425,103.600 2.425,36.400 60.622,2.800 Z" fill="none" stroke="rgb(0 0 0)" strokeWidth="2.5" className="dark:stroke-white stroke-black"/>
            <path d="M 108.343,42.448 L 108.343,97.552 L 60.622,125.104 L 12.900,97.552 L 12.900,42.448 L 60.622,14.896 Z M 60.622,28.336 L 24.540,49.168 L 24.540,90.832 L 60.622,111.664 L 96.704,90.832 L 96.704,49.168 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            <path d="M 87.392,54.544 L 87.392,85.456 L 60.622,100.912 L 33.851,85.456 L 33.851,54.544 L 60.622,39.088 Z M 60.622,48.496 L 41.999,59.248 L 41.999,80.752 L 60.622,91.504 L 79.245,80.752 L 79.245,59.248 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
          </motion.g>

          <motion.g
            animate={{
              opacity: [0.5, 0.3, 0.6, 0.4, 0.5],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          >
            <path d="M 240.062,36.400 240.062,103.600 181.865,137.200 123.668,103.600 123.668,36.400 181.865,2.800 Z" fill="none" stroke="rgb(0 0 0)" strokeWidth="2.5" className="dark:stroke-white stroke-black"/>
            <path d="M 229.587,42.448 L 229.587,97.552 L 181.865,125.104 L 134.144,97.552 L 134.144,42.448 L 181.865,14.896 Z M 181.865,28.336 L 145.783,49.168 L 145.783,90.832 L 181.865,111.664 L 217.947,90.832 L 217.947,49.168 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            <path d="M 208.636,54.544 L 208.636,85.456 L 181.865,100.912 L 155.095,85.456 L 155.095,54.544 L 181.865,39.088 Z M 181.865,48.496 L 163.242,59.248 L 163.242,80.752 L 181.865,91.504 L 200.488,80.752 L 200.488,59.248 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
          </motion.g>

          <motion.g
            animate={{
              opacity: [0.3, 0.6, 0.4, 0.7, 0.3],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            <path d="M 361.306,36.400 361.306,103.600 303.109,137.200 244.912,103.600 244.912,36.400 303.109,2.800 Z" fill="none" stroke="rgb(0 0 0)" strokeWidth="2.5" className="dark:stroke-white stroke-black"/>
            <path d="M 350.830,42.448 L 350.830,97.552 L 303.109,125.104 L 255.387,97.552 L 255.387,42.448 L 303.109,14.896 Z M 303.109,28.336 L 267.027,49.168 L 267.027,90.832 L 303.109,111.664 L 339.191,90.832 L 339.191,49.168 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            <path d="M 329.879,54.544 L 329.879,85.456 L 303.109,100.912 L 276.338,85.456 L 276.338,54.544 L 303.109,39.088 Z M 303.109,48.496 L 284.486,59.248 L 284.486,80.752 L 303.109,91.504 L 321.732,80.752 L 321.732,59.248 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
          </motion.g>

          {/* Continue with more hex groups with varying delays and durations */}
          <motion.g
            animate={{
              opacity: [0.6, 0.2, 0.5, 0.3, 0.6],
            }}
            transition={{
              duration: 5.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
          >
            <path d="M 482.549,36.400 482.549,103.600 424.352,137.200 366.156,103.600 366.156,36.400 424.352,2.800 Z" fill="none" stroke="rgb(0 0 0)" strokeWidth="2.5" className="dark:stroke-white stroke-black"/>
            <path d="M 472.074,42.448 L 472.074,97.552 L 424.352,125.104 L 376.631,97.552 L 376.631,42.448 L 424.352,14.896 Z M 424.352,28.336 L 388.270,49.168 L 388.270,90.832 L 424.352,111.664 L 460.435,90.832 L 460.435,49.168 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            <path d="M 451.123,54.544 L 451.123,85.456 L 424.352,100.912 L 397.582,85.456 L 397.582,54.544 L 424.352,39.088 Z M 424.352,48.496 L 405.729,59.248 L 405.729,80.752 L 424.352,91.504 L 442.975,80.752 L 442.975,59.248 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
          </motion.g>

          {/* Add remaining hex patterns with similar grouping and animation */}
          <motion.g
            animate={{
              opacity: [0.4, 0.7, 0.3, 0.5, 0.4],
            }}
            transition={{
              duration: 6.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            {/* Rest of the hex patterns */}
            <path d="M 603.793,36.400 603.793,103.600 545.596,137.200 487.399,103.600 487.399,36.400 545.596,2.800 Z" fill="none" stroke="rgb(0 0 0)" strokeWidth="2.5" className="dark:stroke-white stroke-black"/>
            <path d="M 593.317,42.448 L 593.317,97.552 L 545.596,125.104 L 497.875,97.552 L 497.875,42.448 L 545.596,14.896 Z M 545.596,28.336 L 509.514,49.168 L 509.514,90.832 L 545.596,111.664 L 581.678,90.832 L 581.678,49.168 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            <path d="M 572.367,54.544 L 572.367,85.456 L 545.596,100.912 L 518.825,85.456 L 518.825,54.544 L 545.596,39.088 Z M 545.596,48.496 L 526.973,59.248 L 526.973,80.752 L 545.596,91.504 L 564.219,80.752 L 564.219,59.248 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            
            <path d="M 725.036,36.400 725.036,103.600 666.840,137.200 608.643,103.600 608.643,36.400 666.840,2.800 Z" fill="none" stroke="rgb(0 0 0)" strokeWidth="2.5" className="dark:stroke-white stroke-black"/>
            <path d="M 714.561,42.448 L 714.561,97.552 L 666.840,125.104 L 619.118,97.552 L 619.118,42.448 L 666.840,14.896 Z M 666.840,28.336 L 630.757,49.168 L 630.757,90.832 L 666.840,111.664 L 702.922,90.832 L 702.922,49.168 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            <path d="M 693.610,54.544 L 693.610,85.456 L 666.840,100.912 L 640.069,85.456 L 640.069,54.544 L 666.840,39.088 Z M 666.840,48.496 L 648.217,59.248 L 648.217,80.752 L 666.840,91.504 L 685.463,80.752 L 685.463,59.248 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            
            <path d="M 846.280,36.400 846.280,103.600 788.083,137.200 729.886,103.600 729.886,36.400 788.083,2.800 Z" fill="none" stroke="rgb(0 0 0)" strokeWidth="2.5" className="dark:stroke-white stroke-black"/>
            <path d="M 835.805,42.448 L 835.805,97.552 L 788.083,125.104 L 740.362,97.552 L 740.362,42.448 L 788.083,14.896 Z M 788.083,28.336 L 752.001,49.168 L 752.001,90.832 L 788.083,111.664 L 824.165,90.832 L 824.165,49.168 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            <path d="M 814.854,54.544 L 814.854,85.456 L 788.083,100.912 L 761.313,85.456 L 761.313,54.544 L 788.083,39.088 Z M 788.083,48.496 L 769.460,59.248 L 769.460,80.752 L 788.083,91.504 L 806.706,80.752 L 806.706,59.248 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            
            <path d="M 967.524,36.400 967.524,103.600 909.327,137.200 851.130,103.600 851.130,36.400 909.327,2.800 Z" fill="none" stroke="rgb(0 0 0)" strokeWidth="2.5" className="dark:stroke-white stroke-black"/>
            <path d="M 957.048,42.448 L 957.048,97.552 L 909.327,125.104 L 861.605,97.552 L 861.605,42.448 L 909.327,14.896 Z M 909.327,28.336 L 873.245,49.168 L 873.245,90.832 L 909.327,111.664 L 945.409,90.832 L 945.409,49.168 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            <path d="M 936.097,54.544 L 936.097,85.456 L 909.327,100.912 L 882.556,85.456 L 882.556,54.544 L 909.327,39.088 Z M 909.327,48.496 L 890.704,59.248 L 890.704,80.752 L 909.327,91.504 L 927.950,80.752 L 927.950,59.248 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            
            <path d="M 1088.767,36.400 1088.767,103.600 1030.570,137.200 972.373,103.600 972.373,36.400 1030.570,2.800 Z" fill="none" stroke="rgb(0 0 0)" strokeWidth="2.5" className="dark:stroke-white stroke-black"/>
            <path d="M 1078.292,42.448 L 1078.292,97.552 L 1030.570,125.104 L 982.849,97.552 L 982.849,42.448 L 1030.570,14.896 Z M 1030.570,28.336 L 994.488,49.168 L 994.488,90.832 L 1030.570,111.664 L 1066.652,90.832 L 1066.652,49.168 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            <path d="M 1057.341,54.544 L 1057.341,85.456 L 1030.570,100.912 L 1003.800,85.456 L 1003.800,54.544 L 1030.570,39.088 Z M 1030.570,48.496 L 1011.947,59.248 L 1011.947,80.752 L 1030.570,91.504 L 1049.193,80.752 L 1049.193,59.248 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            
            <path d="M 1210.011,36.400 1210.011,103.600 1151.814,137.200 1093.617,103.600 1093.617,36.400 1151.814,2.800 Z" fill="none" stroke="rgb(0 0 0)" strokeWidth="2.5" className="dark:stroke-white stroke-black"/>
            <path d="M 1199.535,42.448 L 1199.535,97.552 L 1151.814,125.104 L 1104.092,97.552 L 1104.092,42.448 L 1151.814,14.896 Z M 1151.814,28.336 L 1115.732,49.168 L 1115.732,90.832 L 1151.814,111.664 L 1187.896,90.832 L 1187.896,49.168 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
            <path d="M 1178.584,54.544 L 1178.584,85.456 L 1151.814,100.912 L 1125.043,85.456 L 1125.043,54.544 L 1151.814,39.088 Z M 1151.814,48.496 L 1133.191,59.248 L 1133.191,80.752 L 1151.814,91.504 L 1170.437,80.752 L 1170.437,59.248 Z" fill="rgb(0 0 0)" fillRule="evenodd" className="dark:fill-white fill-black"/>
          </motion.g>
        </svg>
      </motion.div>


    </div>
  );
}
