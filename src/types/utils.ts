// Generic utility types for better type safety and reusability

// Async state management
export interface AsyncState<T, E = Error> {
  data: T | null;
  loading: boolean;
  error: E | null;
}

// API response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
  offset?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Generic sort configuration
export interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

// Generic filter configuration
export interface FilterConfig<T> {
  field: keyof T;
  operator:
    | 'equals'
    | 'contains'
    | 'startsWith'
    | 'endsWith'
    | 'in'
    | 'between';
  value: unknown;
}

// Component props helpers
export type WithClassName<T = Record<string, never>> = T & {
  className?: string;
};

export type WithChildren<T = Record<string, never>> = T & {
  children: React.ReactNode;
};

export type WithOptionalChildren<T = Record<string, never>> = T & {
  children?: React.ReactNode;
};

// Event handler types
export type ClickHandler<T = HTMLElement> = (
  event: React.MouseEvent<T>
) => void;
export type ChangeHandler<T = HTMLInputElement> = (
  event: React.ChangeEvent<T>
) => void;
export type SubmitHandler<T = HTMLFormElement> = (
  event: React.FormEvent<T>
) => void;

// Form types
export interface FormField<T = string> {
  name: string;
  value: T;
  error?: string;
  touched?: boolean;
  required?: boolean;
}

export interface FormState<T extends Record<string, unknown>> {
  fields: { [K in keyof T]: FormField<T[K]> };
  isValid: boolean;
  isDirty: boolean;
  isSubmitting: boolean;
}

// Date range utility
export interface DateRange {
  start: Date;
  end: Date;
}

export interface DateRangeString {
  start: string;
  end: string;
}

// Locale-aware types
export type LocaleAware<T, L extends string = 'id' | 'en'> = {
  [K in L]: T;
};

// Deep partial for complex objects
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Strict omit that prevents typos
export type StrictOmit<T, K extends keyof T> = Omit<T, K>;

// Strict pick that prevents typos
export type StrictPick<T, K extends keyof T> = Pick<T, K>;

// Union of all keys
export type AllKeys<T> = T extends unknown ? keyof T : never;

// Merge two types
export type Merge<A, B> = Omit<A, keyof B> & B;

// Optional properties
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Required properties
export type RequiredKeys<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Non-nullable
export type NonNullable<T> = T extends null | undefined ? never : T;
