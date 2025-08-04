module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    process.env.NODE_ENV === 'production' && [
      'transform-remove-console',
      {
        exclude: ['error', 'warn'],
      },
    ],
  ].filter(Boolean),
}; 