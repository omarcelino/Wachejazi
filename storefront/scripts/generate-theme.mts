import {
  Hct,
  SchemeTonalSpot,
  MaterialDynamicColors,
  argbFromHex,
  hexFromArgb,
} from '@material/material-color-utilities';

const SEED = '#2E6F47'; // turf green

const roles: [string, string][] = [
  ['background', 'background'],
  ['error', 'error'],
  ['errorContainer', 'error-container'],
  ['inverseOnSurface', 'inverse-on-surface'],
  ['inversePrimary', 'inverse-primary'],
  ['inverseSurface', 'inverse-surface'],
  ['onBackground', 'on-background'],
  ['onError', 'on-error'],
  ['onErrorContainer', 'on-error-container'],
  ['onPrimary', 'on-primary'],
  ['onPrimaryContainer', 'on-primary-container'],
  ['onPrimaryFixed', 'on-primary-fixed'],
  ['onPrimaryFixedVariant', 'on-primary-fixed-variant'],
  ['onSecondary', 'on-secondary'],
  ['onSecondaryContainer', 'on-secondary-container'],
  ['onSecondaryFixed', 'on-secondary-fixed'],
  ['onSecondaryFixedVariant', 'on-secondary-fixed-variant'],
  ['onSurface', 'on-surface'],
  ['onSurfaceVariant', 'on-surface-variant'],
  ['onTertiary', 'on-tertiary'],
  ['onTertiaryContainer', 'on-tertiary-container'],
  ['onTertiaryFixed', 'on-tertiary-fixed'],
  ['onTertiaryFixedVariant', 'on-tertiary-fixed-variant'],
  ['outline', 'outline'],
  ['outlineVariant', 'outline-variant'],
  ['primary', 'primary'],
  ['primaryContainer', 'primary-container'],
  ['primaryFixed', 'primary-fixed'],
  ['primaryFixedDim', 'primary-fixed-dim'],
  ['scrim', 'scrim'],
  ['secondary', 'secondary'],
  ['secondaryContainer', 'secondary-container'],
  ['secondaryFixed', 'secondary-fixed'],
  ['secondaryFixedDim', 'secondary-fixed-dim'],
  ['shadow', 'shadow'],
  ['surface', 'surface'],
  ['surfaceBright', 'surface-bright'],
  ['surfaceContainer', 'surface-container'],
  ['surfaceContainerHigh', 'surface-container-high'],
  ['surfaceContainerHighest', 'surface-container-highest'],
  ['surfaceContainerLow', 'surface-container-low'],
  ['surfaceContainerLowest', 'surface-container-lowest'],
  ['surfaceDim', 'surface-dim'],
  ['surfaceTint', 'surface-tint'],
  ['surfaceVariant', 'surface-variant'],
  ['tertiary', 'tertiary'],
  ['tertiaryContainer', 'tertiary-container'],
  ['tertiaryFixed', 'tertiary-fixed'],
  ['tertiaryFixedDim', 'tertiary-fixed-dim'],
];

const mdc = new MaterialDynamicColors();
const seedHct = Hct.fromInt(argbFromHex(SEED));

function render(scheme: InstanceType<typeof SchemeTonalSpot>): string {
  return roles
    .map(([prop, cssName]) => {
      const dynamicColor = (mdc as unknown as Record<string, () => { getArgb: (s: typeof scheme) => number }>)[prop]();
      const hex = hexFromArgb(dynamicColor.getArgb(scheme));
      return `  --md-sys-color-${cssName}: ${hex};`;
    })
    .join('\n');
}

const light = new SchemeTonalSpot(seedHct, false, 0.0);
const dark = new SchemeTonalSpot(seedHct, true, 0.0);

console.log('/* LIGHT */');
console.log(render(light));
console.log('\n/* DARK */');
console.log(render(dark));
