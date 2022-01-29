export enum SizeVariants {
  ExtraSmall = "xs",
  Small = "sm",
  Medium = "md",
  Large = "lg",
  ExtraLarge = "xl",
  ExtraExtraLarge = "xxl",
}

export enum BootstrapVariants {
  Primary = "primary",
  Secondary = "secondary",
  Success = "success",
  Danger = "danger",
  Warning = "warning",
  Info = "info",
  Light = "light",
  Dark = "dark",
}

export const kebabToPascalCase = (value: string) =>
  value
    .replace(/^./g, (c) => c.toUpperCase())
    .replace(/-./g, (c) => c.toUpperCase()[1]);

export const cssClassPrefix = (value: string) => `${value}-`;

export const tagName = (className: string, prefix: string | null = null) => {
  const TAG_PREFIX = (prefix && prefix.trim()) || "Ui";
  return `${TAG_PREFIX}${kebabToPascalCase(className)}`;
};

interface EnumInterface {
  [key: string]: string | number;
}

export const enumEntries = (enumType: EnumInterface) =>
  Object.entries(enumType).map(([name, value]) => ({
    name,
    value,
  }));

export const enumToObjectByValue = (enumType: EnumInterface) => {
  return enumEntries(enumType)
    .map(({ name, value }) => ({ [value]: name }))
    .reduce((acum, entry) => ({ ...acum, ...entry }), {});
};

export const generateId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).substring(2);

const baseClass = "btn";
const classPrefix = cssClassPrefix(baseClass);
const getPrefixedClass = (value: string) => `${classPrefix}${value}`;
const variantClasses = enumToObjectByValue(BootstrapVariants);
Object.keys(variantClasses).forEach(
  (value) => (variantClasses[value] = getPrefixedClass(value))
);
const getOtlinePrefixedClass = (value: string) =>
  `${classPrefix}outline-${value}`;
const outlineVariantClasses = enumToObjectByValue(BootstrapVariants);
Object.keys(outlineVariantClasses).forEach(
  (value) => (outlineVariantClasses[value] = getOtlinePrefixedClass(value))
);

const darkVariantClasses = enumToObjectByValue(BootstrapVariants);
Object.keys(darkVariantClasses).forEach(
  (value) =>
    (darkVariantClasses[value] = getPrefixedClass(value) + " ui-dark-mode")
);
const darkOutlineVariantClasses = enumToObjectByValue(BootstrapVariants);
Object.keys(darkOutlineVariantClasses).forEach(
  (value) =>
    (darkOutlineVariantClasses[value] =
      getOtlinePrefixedClass(value) + " ui-dark-mode")
);

export const uiButtonThemeConfigDefaults = {
  cssClass: {
    main: baseClass,
    active: "active",
    outline: "",
    variants: {
      ...variantClasses,
    },
    outlineVariants: {
      ...outlineVariantClasses,
    },
    sizes: {
      [SizeVariants.Large]: getPrefixedClass(SizeVariants.Large),
      [SizeVariants.Medium]: getPrefixedClass(SizeVariants.Medium),
      [SizeVariants.Small]: getPrefixedClass(SizeVariants.Small),
    },
  },
  cssDark: {
    variants: {
      ...darkVariantClasses,
    },
    outlineVariants: {
      ...darkOutlineVariantClasses,
    },
  },
};
