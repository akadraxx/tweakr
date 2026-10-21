# Tweakr

A small Windows desktop tool to optimize common gaming and latency tweaks without digging through `regedit` and PowerShell manually YET.

Built with Electron, React, and Tailwind.

## What it does

- **Mouse Acceleration**: Forces 1:1 raw pointer input by clearing Windows mouse thresholds and speed curves.
- **Nagle's Algorithm**: Sets `TcpAckFrequency` and `TCPNoDelay` to 1 across active network interfaces to cut down on packet buffering/ping latency in games.
- **Fullscreen Optimization & Game DVR**: Disables Windows background recording, Xbox Game Bar capture, and DWM composition delays.
- **Power Scheme**: Switches the active power plan to High Performance (and duplicates the hidden plan if Windows 11 removed it).
- **GPU Stats**: Quick hardware readout and status bar in the bottom panel.

All tweaks can be toggled on and off directly in the UI.

## Download & Install

Head over to the [Releases](https://github.com/AkaDraxx/tweakr/releases) page and download `Tweakr-Setup-1.0.2.exe` (or grab the portable `.zip`).

> **Note**: Tweakr needs administrator rights to change network registry values and adjust power schemes. It will prompt for UAC when you start it.

## Building from Source

If you want to build or run the project locally:

```bash
# Clone the repo
git clone [https://github.com/AkaDraxx/tweakr.git](https://github.com/AkaDraxx/tweakr.git)
cd tweakr

# Install packages
npm install

# Run dev mode
npm start

# Build production installer
npx electron-vite build
npx electron-builder --win
