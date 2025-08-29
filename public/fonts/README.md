# Fonts Directory

## Avenir Next Installation

To use Avenir Next font:

1. Purchase Avenir Next font files from a licensed provider
2. Place the font files (.woff, .woff2, .ttf) in this directory
3. Update the CSS in `globals.css` to include the font-face declarations

Example CSS for Avenir Next:
```css
@font-face {
  font-family: 'Avenir Next';
  src: url('/fonts/AvenirNext-Regular.woff2') format('woff2'),
       url('/fonts/AvenirNext-Regular.woff') format('woff');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Avenir Next';
  src: url('/fonts/AvenirNext-Medium.woff2') format('woff2'),
       url('/fonts/AvenirNext-Medium.woff') format('woff');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}
```

Then add to Tailwind config:
```js
fontFamily: {
  'avenir': ['Avenir Next', 'system-ui', 'sans-serif'],
}
```