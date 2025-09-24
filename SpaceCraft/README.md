# SpaceCraft - Interactive 3D Space Experience

A stunning 3D space exploration experience built with React Three Fiber, featuring scroll-based navigation through a cosmic journey.

## ✨ Features

- **Immersive 3D Space Environment**: Beautiful nebulae, stars, and cosmic effects
- **Interactive Spaceship**: Detailed 3D model with thruster effects and navigation lights
- **Multiple Camera Modes**:
  - Free orbit camera for exploration
  - Follow mode that tracks the spaceship
  - Path mode with scroll-based navigation
- **Scroll Navigation**: Navigate through space using your scroll wheel or keyboard
- **Animated Intro**: Motivational text sequence when starting the experience
- **Progress Tracking**: Visual progress indicator during path navigation
- **Path Visualization**: Optional path display to show your route through space
- **Responsive Design**: Works on desktop and mobile devices

## 🎮 Controls

### Path Navigation Mode

- **Mouse Wheel**: Scroll up/down to navigate forward/backward along the path
- **Keyboard**: Use `W`/`S` or `↑`/`↓` arrow keys for navigation
- **Path Visualizer**: Toggle path visibility with the "Show Path" button

### Camera Modes

- **Free Camera**: Click and drag to orbit around the scene
- **Follow Ship**: Camera automatically follows the spaceship
- **Path Mode**: Camera moves along a predefined path through space

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd spacecraft
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Add your 3D model**

   - Place your spaceship model file at `public/Models/Spaceship.glb`
   - Ensure it's in GLTF/GLB format for best performance

4. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   - Navigate to `http://localhost:5173`
   - Enjoy your space journey! 🚀

## 📁 Project Structure

```
SpaceCraft/
├── public/
│   ├── Models/
│   │   └── Spaceship.glb          # 3D spaceship model
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── CameraUpdater.jsx      # Camera follow logic
│   │   ├── EnhancedSpace.jsx      # Main space scene component
│   │   ├── EnhancedSpaceship.jsx  # Enhanced spaceship with effects
│   │   ├── Glory.jsx              # Glow/bloom effects
│   │   ├── IntroText.jsx          # Animated intro text
│   │   ├── Nebula.jsx             # Nebula cloud effects
│   │   ├── PathVisualizer.jsx     # Path visualization
│   │   ├── ProgressIndicator.jsx  # Journey progress display
│   │   ├── ScrollPathController.jsx # Scroll-based navigation
│   │   └── Star.jsx               # Particle star fields
│   ├── App.jsx                    # Main app component
│   ├── index.css                  # Enhanced styles
│   └── main.jsx                   # React entry point
├── package.json
└── README.md
```

## 🎨 Customization

### Adding New Intro Text

Edit `src/components/IntroText.jsx` and modify the `introTexts` array:

```javascript
const introTexts = [
  "Your Custom Message Here",
  "Another Inspiring Line",
  "Ready to Explore?",
  "Scroll to Begin",
];
```

### Modifying the Navigation Path

In `src/components/ScrollPathController.jsx`, update the curve points:

```javascript
const curve = new THREE.CatmullRomCurve3(
  [
    new THREE.Vector3(0, 0, 8), // Start point
    new THREE.Vector3(15, 5, 0), // Add your points
    new THREE.Vector3(10, -8, -20), // Customize coordinates
    // ... add more points for your desired path
  ],
  false,
  "catmullrom",
  0.1
);
```

### Adjusting Visual Effects

- **Nebulae**: Modify `nebulaConfigs` in `EnhancedSpace.jsx`
- **Stars**: Adjust count, radius, and speed in Star components
- **Spaceship Effects**: Customize thruster and lighting effects in `EnhancedSpaceship.jsx`

## 🛠️ Built With

- **React 18** - UI framework
- **React Three Fiber** - React renderer for Three.js
- **Three.js** - 3D graphics library
- **@react-three/drei** - Useful helpers for R3F
- **Vite** - Fast build tool and dev server
- **Maath** - Math utilities for 3D

## 📱 Browser Support

- Chrome/Chromium 88+
- Firefox 78+
- Safari 14+
- Edge 88+

WebGL 2.0 support required for optimal performance.

## 🎯 Performance Tips

1. **Model Optimization**: Keep your 3D models under 5MB for fast loading
2. **Texture Compression**: Use compressed texture formats when possible
3. **Particle Count**: Adjust star counts based on target devices
4. **Quality Settings**: Consider adding quality presets for different devices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🐛 Troubleshooting

### Common Issues

**3D Model Not Loading**

- Ensure your model is placed in `public/Models/Spaceship.glb`
- Check browser console for loading errors
- Verify the model is a valid GLTF/GLB file

**Performance Issues**

- Reduce particle counts in Star components
- Lower the quality of nebula textures
- Check WebGL support in your browser

**Scroll Navigation Not Working**

- Ensure you're in "Path Mode" (click the camera mode button)
- Check browser console for JavaScript errors
- Try using keyboard controls (W/S keys) as alternative

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Three.js community for amazing 3D web graphics
- React Three Fiber team for excellent React integration
- Space textures and inspiration from NASA imagery
- All contributors who help improve this project

---

**Happy exploring! 🚀✨**
