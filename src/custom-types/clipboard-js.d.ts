

declare module 'clipboard-js' {
  export function copy(plainText: string): Promise<any>;
  export function copy(richData: {'text/html': string, 'text/plain': string}): Promise<any>;
  export function copy(element: Node): Promise<any>;

  export function paste(): Promise<any>;
}
