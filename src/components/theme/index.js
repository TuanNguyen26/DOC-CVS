const baseTheme = {
  fonts: {
    mono: '"SF Mono", "Roboto Mono", Menlo, monospace',
  },
};

const lightTheme = {
  ...baseTheme,
  colors: {
    background: '#fff',
    heading: '#000',
    text: '#3B454E',
    preFormattedText: 'rgb(245, 247, 249)',
    link: '#1000EE',
  },
  bgColors: {
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
  },

  bgActive: {
    backgroundColor: '#e6f4ff',
    color: '#1677ff',
  },
};

const darkTheme = {
  ...baseTheme,
  colors: {
    background: '#001933',
    heading: '#fff',
    // text: '#ccc',
    text: 'rgba(255, 255, 255, 0.65)',
    preFormattedText: '#000',
    link: '#1ED3C6',
  },

  bgColors: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },

  bgActive: {
    backgroundColor: '#1668dc',
    color: '#fff',
  },
};

export { lightTheme, darkTheme };
