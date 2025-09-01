# Driving Classic - Webflow Website

This repository contains the JavaScript functionality for the Driving Classic Webflow website.

## Project Structure

- `driving-classic.js` - Main JavaScript file containing all website functionality
- `README.md` - This setup guide

## Setup Instructions

### 1. GitHub Repository Setup

1. Create a new GitHub repository named `driving-classic` or similar
2. Push this code to the repository
3. Get the raw GitHub link for the JavaScript file

### 2. Webflow Integration

1. In your Webflow project, go to **Site Settings**
2. Navigate to **Custom Code**
3. Add the GitHub raw link to the **Head Code** section
4. The link format should be: `https://raw.githubusercontent.com/[username]/[repository]/main/driving-classic.js`

### 3. Development Workflow

1. **Edit in Cursor**: Make changes to `driving-classic.js` in this Cursor workspace
2. **Test locally**: You can test the JavaScript in your browser console
3. **Deploy**: Push changes to GitHub - they will automatically be available on your website

## JavaScript Features

The current setup includes:

- **Smooth Scrolling**: Automatically adds smooth scrolling to navigation links
- **Utility Functions**: Helper functions for common tasks
- **Modular Structure**: Easy to add new functionality
- **Global Access**: Functions available via `window.DrivingClassic`

## Adding New Features

To add new functionality:

1. Create new functions in the `initDrivingClassic()` function
2. Add any necessary event listeners
3. Test locally before pushing to GitHub
4. Push changes to deploy

## Example Usage

```javascript
// Access utility functions globally
DrivingClassic.utils.isElementInViewport(element);
DrivingClassic.utils.debounce(function, 300);

// Re-initialize if needed
DrivingClassic.init();
```

## Notes

- No CSS file is needed - all styling is handled through Webflow site settings
- The JavaScript is wrapped in an IIFE to avoid global scope pollution
- All functionality is automatically initialized when the DOM loads
- Console logging is included for debugging

## Version History

- **v1.0.0** - Initial setup with basic functionality and utilities
